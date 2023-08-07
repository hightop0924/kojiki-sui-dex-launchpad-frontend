import SuiSDK, { NetworkType as SuiNetworkType } from '@animeswap.org/sui-v1-sdk'
import { Utils as SuiUtils } from '@animeswap.org/sui-v1-sdk'
import { head, isEmpty, pathOr, propOr } from 'ramda';
import { bcs, ObjectContentFields, SuiMoveObject, SuiObjectData, SuiObjectDataOptions, SuiObjectDataWithContent, SuiObjectResponse } from '@mysten/sui.js';
import SDK, {
  AptosCoinInfoResource,
  AptosCoinStoreResource,
  AptosLedgerInfo,
  AptosResource,
  AptosTransaction,
  Decimal,
  NetworkType,
  SwapPoolResource,
  Utils,
} from '@animeswap.org/v1-sdk'
import { Connection, DevInspectResults, JsonRpcProvider } from '@mysten/sui.js'
import { AptosClient } from 'aptos'
import { CHAIN_INFO, MasterChef_Info } from 'constants/chainInfo'
import {
  CHAIN_IDS_TO_SDK_NETWORK,
  isAptosChain,
  isSuiChain,
  SUI_CHAIN_IDS_TO_SDK_NETWORK,
  SupportedChainId,
} from 'constants/chains'
import { Pair } from 'hooks/common/Pair'
import store from 'state'
import { addCoin, addTempCoin, setAllPairs, updatePair } from 'state/user/reducer'
import { resetCoinBalances, resetLpBalances, setCoinBalances, setProjects } from 'state/wallets/reducer'

import { ConnectionType, getRPCURL } from './reducer'
import { TransactionBlock } from '@mysten/sui.js'
import { DynamicFieldPage } from '@mysten/sui.js/dist/types/dynamic_fields';

import {
  boolean,
  define,
  Infer,
  literal,
  nullable,
  number,
  object,
  record,
  string,
  union,
} from 'superstruct';

import { ROUND_PRIVATE } from 'pages/Launchpad';

export type ProjectDataWrapper = {
  type: string,
  fields: {
    tokenIconUrl: string,
    tokenName: string,
    tokenAddress: string,
    coinName: string,
    coinAddress: string,
    isHardcapReached: boolean,
    isWLStage: boolean,
    status: number,
    raisedAmount: number,
    allocation: number
  }
};

export type ProjectData = {
  id: string,
  tokenIconUrl: string,
  tokenName: string,
  tokenAddress: string,
  coinName: string,
  coinAddress: string,
  isHardcapReached: boolean,
  isWLStage: boolean,
  status: number,
  raisedAmount: number,
  allocation: number
}

export type SuiStructTag = {
  full_address: string
  source_address: string
  address: string
  module: string
  name: string
  type_arguments: string[]
}

export const ObjectId = string();
export type ObjectId = Infer<typeof ObjectId>;
export const GAS_TYPE_ARG = '0x2::sui::SUI';

export const SuiAddress = string();
export type SuiAddress = Infer<typeof SuiAddress>;

const SUI_ADDRESS_LENGTH = 32;
class ConnectionInstance {
  private static aptosClient: AptosClient
  private static sdk: SDK
  private static suiClient: JsonRpcProvider
  private static suiSDK: SuiSDK



  public static getAptosClient(): AptosClient {
    if (!ConnectionInstance.aptosClient) {
      const state = store.getState()
      ConnectionInstance.aptosClient = new AptosClient(
        getRPCURL(state.connection.currentConnection, state.user.chainId)
      )
    }
    return ConnectionInstance.aptosClient
  }

  public static renewAptosClient(connection: ConnectionType, chainId: SupportedChainId) {
    ConnectionInstance.aptosClient = new AptosClient(getRPCURL(connection, chainId))
  }

  public static getSDK(): SDK {
    if (!ConnectionInstance.sdk) {
      const state = store.getState()
      const networkType: NetworkType = CHAIN_IDS_TO_SDK_NETWORK[state.user.chainId]
      ConnectionInstance.sdk = new SDK(getRPCURL(state.connection.currentConnection, state.user.chainId), networkType)
    }
    return ConnectionInstance.sdk
  }

  public static renewSDK(connection: ConnectionType, chainId: SupportedChainId) {
    const networkType: NetworkType = CHAIN_IDS_TO_SDK_NETWORK[chainId]
    ConnectionInstance.sdk = new SDK(getRPCURL(connection, chainId), networkType)
  }

  public static async syncAccountResources(account: string, chainId: SupportedChainId, poolPair = false) {
    if (isSuiChain(chainId)) {
      return this.syncSuiAccountResources(account, chainId, poolPair)
    }
    try {
      if (!account) return undefined
      const aptosClient = ConnectionInstance.getAptosClient()
      const res: AptosResource<any>[] = await aptosClient.getAccountResources(account)
      const coinStore = this.getSDK().networkOptions.modules.CoinStore
      const lpCoinNamespace = Utils.composeLPCoinType(this.getSDK().networkOptions.modules.ResourceAccountAddress)
      const coinBalances = {}
      const lpBalances = {}
      for (const resource of res) {
        const type = resource.type
        // coin balance filter
        if (type.startsWith(`${coinStore}<`)) {
          const coinType = type.substring(coinStore.length + 1, type.length - 1)
          coinBalances[coinType] = resource.data.coin.value
          // LP balance filter
          if (coinType.startsWith(`${lpCoinNamespace}<`)) {
            const lpCoinType = coinType.substring(lpCoinNamespace.length + 1, coinType.length - 1)
            lpBalances[lpCoinType] = resource.data.coin.value
            if (poolPair) {
              const [coinX, coinY] = lpCoinType.split(', ')
              this.getPair(chainId, coinX, coinY)
            }
          }
        }
      }
      store.dispatch(resetCoinBalances({ coinBalances }))
      store.dispatch(resetLpBalances({ lpBalances }))
      return res
    } catch (error) {
      console.error(error)
      store.dispatch(resetCoinBalances({ coinBalances: {} }))
      store.dispatch(resetLpBalances({ lpBalances: {} }))
      return undefined
    }
  }

  public static async getAccountResource(account: string, type: string) {
    try {
      if (!account || !type) {
        return undefined
      }
      const aptosClient = ConnectionInstance.getAptosClient()
      const res: AptosResource<any> = await aptosClient.getAccountResource(account, type)
      const data = res.data
      return data
    } catch (error) {
      return undefined
    }
  }

  public static async getCoinBalance(chainId: SupportedChainId, account: string, type: string) {
    if (isSuiChain(chainId)) {
      return this.getSuiCoinBalance(chainId, account, type)
    }
    try {
      if (!account || !type) {
        return undefined
      }
      console.log(`getCoinBalance ${account} ${type}`)
      const coinStore = this.getSDK().networkOptions.modules.CoinStoref
      const res: AptosCoinStoreResource = await ConnectionInstance.getAccountResource(
        account,
        Utils.composeCoinStore(coinStore, type)
      )
      console.log(`getCoinBalance return`, res)
      const amount = res.coin.value
      store.dispatch(setCoinBalances({ coinBalances: { [type]: amount } }))
      return amount
    } catch (error) {
      return undefined
    }
  }

  // sync from pool pair
  public static async getPair(chainId: SupportedChainId, coinX: string, coinY: string): Promise<Pair> {
    if (isSuiChain(chainId)) {
      return this.getSuiPair(chainId, coinX, coinY)
    }
    try {
      if (!coinX || !coinY) return undefined
      const modules = this.getSDK().networkOptions.modules
      const lpCoin = Utils.composeLPCoin(modules.ResourceAccountAddress, coinX, coinY)
      const lpType = Utils.composeLP(modules.Scripts, coinX, coinY)
      const getLPCoinInfo: AptosCoinInfoResource = await ConnectionInstance.getAccountResource(
        modules.ResourceAccountAddress,
        Utils.composeType(modules.CoinInfo, [lpCoin])
      )
      const getLPPool: SwapPoolResource = await ConnectionInstance.getAccountResource(
        modules.ResourceAccountAddress,
        lpType
      )
      const [lpCoinInfo, lpPool] = await Promise.all([getLPCoinInfo, getLPPool])
      // pair not exist
      if (lpCoinInfo == undefined || lpPool == undefined) {
        return null
      }
      const lpTotal = lpCoinInfo.supply.vec[0].integer.vec[0].value
      const coinXReserve = lpPool.coin_x_reserve.value
      const coinYReserve = lpPool.coin_y_reserve.value
      const pair: Pair = {
        coinX,
        coinY,
        lpTotal,
        coinXReserve,
        coinYReserve,
      }
      store.dispatch(updatePair({ pair }))
      return pair
    } catch (error) {
      console.error(error)
      store.dispatch(updatePair({ pair: undefined }))
      return undefined
    }
  }

  public static async getAllPair(): Promise<{ [pairKey: string]: Pair }> {
    try {
      const sdk = this.getSDK()
      const pairs: { [pairKey: string]: Pair } = {}
      const aptosClient = ConnectionInstance.getAptosClient()
      const modules = sdk.networkOptions.modules
      const ledgerInfo = await sdk.resources.fetchLedgerInfo<AptosLedgerInfo>()
      // APR code
      const timestampNow = ledgerInfo.ledger_timestamp
      const currentLedgerVersion = ledgerInfo.ledger_version
      const oldestLedgerVersion = ledgerInfo.oldest_ledger_version
      const queryDeltaVersion = Utils.d(1e6) // APR window
      const queryLedgerVersion = Utils.d(currentLedgerVersion).sub(queryDeltaVersion).gte(Utils.d(oldestLedgerVersion))
        ? Utils.d(currentLedgerVersion).sub(queryDeltaVersion)
        : Utils.d(oldestLedgerVersion)

      // const poolResources: AptosResource<any>[]
      const task1: Promise<AptosResource<any>[]> = aptosClient.getAccountResources(modules.ResourceAccountAddress)
      // const poolResourcesLedger: AptosResource<any>[]
      const task2: Promise<AptosResource<any>[]> = this.sdk.resources.fetchAccountResources<unknown>(
        modules.ResourceAccountAddress,
        BigInt(queryLedgerVersion.toString())
      )
      // txn
      const task3: Promise<AptosTransaction> = this.sdk.resources.fetchTransactionByVersion<AptosTransaction>(
        BigInt(queryLedgerVersion.toString())
      )
      const [poolResources, poolResourcesLedger, txn] = await Promise.all([task1, task2, task3])

      // pass second params, this call has no network call
      const coinX2coinY2DecimalCurrent = await sdk.swap.getPricePerLPCoinBatch(undefined, poolResources)
      // pass second params, this call has no network call
      const coinX2coinY2DecimalPast = await sdk.swap.getPricePerLPCoinBatch(
        BigInt(queryLedgerVersion.toString()),
        poolResourcesLedger
      )
      const deltaTimestamp = Utils.d(timestampNow).sub(Utils.d(txn.timestamp))

      // parse coinX, coinY, LP, reserve
      for (const resource of poolResources) {
        const coinInfoPrefix = `${modules.CoinInfo}<${modules.ResourceAccountAddress}::LPCoinV1::LPCoin<`
        const poolPrefix = `${modules.Scripts}::LiquidityPool<`
        if (resource.type.startsWith(coinInfoPrefix)) {
          const pairKey = resource.type.substring(coinInfoPrefix.length, resource.type.length - 2)
          const [coinX, coinY] = pairKey.split(', ')
          if (pairs[pairKey]) {
            pairs[pairKey].lpTotal = resource.data.supply.vec[0].integer.vec[0].value
          } else {
            pairs[pairKey] = {
              coinX,
              coinY,
              coinXReserve: '0',
              coinYReserve: '0',
              lpTotal: resource.data.supply.vec[0].integer.vec[0].value,
            }
          }
          continue
        }
        if (resource.type.startsWith(poolPrefix)) {
          const pairKey = resource.type.substring(poolPrefix.length, resource.type.length - 1)
          if (pairs[pairKey]) {
            pairs[pairKey].coinXReserve = resource.data.coin_x_reserve.value
            pairs[pairKey].coinYReserve = resource.data.coin_y_reserve.value
          } else {
            const [coinX, coinY] = pairKey.split(', ')
            pairs[pairKey] = {
              coinX,
              coinY,
              lpTotal: '0',
              coinXReserve: resource.data.coin_x_reserve.value,
              coinYReserve: resource.data.coin_y_reserve.value,
            }
          }
          continue
        }
      }

      // write APR
      for (const key of Object.keys(coinX2coinY2DecimalCurrent)) {
        const base = coinX2coinY2DecimalPast[key]
        if (base) {
          pairs[key].APR = coinX2coinY2DecimalCurrent[key]
            .sub(base)
            .div(base)
            .mul(Utils.YEAR_NS)
            .div(deltaTimestamp)
            .toNumber()
        } else {
          pairs[key].APR = NaN
        }
      }
      return pairs
    } catch (error) {
      return {}
    }
  }

  public static async addCoin(address: string, chainId: SupportedChainId) {
    try {
      if (address === 'undefined' || address === undefined) return
      // sidecase: bypass default coin when SUI
      if (isSuiChain(chainId)) {
        if (
          CHAIN_INFO[SupportedChainId.APTOS].nativeCoin.address === address ||
          CHAIN_INFO[SupportedChainId.APTOS].defaultBuyCoin.address === address
        ) {
          return
        }
        console.log(address)
        try {
          const coin = await this.getSuiClient().getCoinMetadata({ coinType: address })
          if (coin) {
            store.dispatch(
              addCoin({
                coin: {
                  address,
                  decimals: coin.decimals,
                  symbol: coin.symbol,
                  name: coin.name,
                },
              })
            )
          } else {
            const splits = address.split('::')
            const objectId = splits[0]
            const tokenName = splits.length > 2 ? splits[2] : splits[1]
            const res = await this.getSuiClient().getObject({ id: objectId })
            if (res) {
              store.dispatch(
                addTempCoin({
                  tempCoin: {
                    address,
                    decimals: 1,
                    symbol: tokenName,
                    name: tokenName,
                  },
                })
              )
            }
          }
        } catch (error) {
          console.log(error)
          const splits = address.split('::')
          const objectId = splits[0]
          const tokenName = splits.length > 2 ? splits[2] : splits[1]
          // const res = await this.getSuiClient().getObject({ id: objectId })
          // if (res) {
          store.dispatch(
            addCoin({
              coin: {
                address,
                decimals: 1,
                symbol: tokenName,
                name: tokenName,
              },
            })
          )
          // }
        }
      }
      if (isAptosChain(chainId)) {
        // Aptos add coin
        const splits = address.split('::')
        const account = splits[0]
        const coin: AptosCoinInfoResource = await this.getAccountResource(account, `0x1::coin::CoinInfo<${address}>`)
        if (coin) {
          store.dispatch(
            addCoin({
              coin: {
                address,
                decimals: coin.decimals,
                symbol: coin.symbol,
                name: coin.name,
              },
            })
          )
        }
      }
    } catch (error) {
      console.error('addCoin', error)
    }
  }

  public static async addTempCoin(address: string, chainId: SupportedChainId) {
    try {
      if (address === 'undefined' || address === undefined) return
      // sidecase: bypass default coin when SUI
      if (isSuiChain(chainId)) {
        if (
          CHAIN_INFO[SupportedChainId.APTOS].nativeCoin.address === address ||
          CHAIN_INFO[SupportedChainId.APTOS].defaultBuyCoin.address === address
        ) {
          return
        }
        console.log(address)
        try {
          const coin = await this.getSuiClient().getCoinMetadata({ coinType: address })
          if (coin) {
            store.dispatch(
              addTempCoin({
                tempCoin: {
                  address,
                  decimals: coin.decimals,
                  symbol: coin.symbol,
                  name: coin.name,
                },
              })
            )
          } else {
            const splits = address.split('::')
            const objectId = splits[0]
            const tokenName = splits.length > 2 ? splits[2] : splits[1]
            const res = await this.getSuiClient().getObject({ id: objectId })
            if (res) {
              store.dispatch(
                addTempCoin({
                  tempCoin: {
                    address,
                    decimals: 1,
                    symbol: tokenName,
                    name: tokenName,
                  },
                })
              )
            }
          }
        } catch (error) {
          console.log(error)
          const splits = address.split('::')
          const objectId = splits[0]
          const tokenName = splits.length > 2 ? splits[2] : splits[1]
          // const res = await this.getSuiClient().getObject({ id: objectId })
          // if (res) {
          store.dispatch(
            addTempCoin({
              tempCoin: {
                address,
                decimals: 1,
                symbol: tokenName,
                name: tokenName,
              },
            })
          )
        }
        // }
      }
      if (isAptosChain(chainId)) {
        // Aptos add coin
        const splits = address.split('::')
        const account = splits[0]
        const coin: AptosCoinInfoResource = await this.getAccountResource(account, `0x1::coin::CoinInfo<${address}>`)
        if (coin) {
          store.dispatch(
            addTempCoin({
              tempCoin: {
                address,
                decimals: coin.decimals,
                symbol: coin.symbol,
                name: coin.name,
              },
            })
          )
        }
      }
    } catch (error) {
      console.error('addTempCoin', error)
    }
  }

  public static getSuiClient(): JsonRpcProvider {
    if (!ConnectionInstance.suiClient) {
      const state = store.getState()
      const suiConnection = new Connection({
        fullnode: getRPCURL(state.connection.currentConnection, state.user.chainId),
      })
      ConnectionInstance.suiClient = new JsonRpcProvider(suiConnection)
    }
    return ConnectionInstance.suiClient
  }

  public static renewSuiClient(connection: ConnectionType, chainId: SupportedChainId) {
    const suiConnection = new Connection({
      fullnode: getRPCURL(connection, chainId),
    })
    ConnectionInstance.suiClient = new JsonRpcProvider(suiConnection)
  }

  public static getSuiSDK() {
    if (!ConnectionInstance.suiSDK) {
      const state = store.getState()
      const networkType: SuiNetworkType = SUI_CHAIN_IDS_TO_SDK_NETWORK[state.user.chainId]
      ConnectionInstance.suiSDK = new SuiSDK(networkType)
    }
    return ConnectionInstance.suiSDK
  }

  public static renewSuiSDK(connection: ConnectionType, chainId: SupportedChainId) {
    const networkType: SuiNetworkType = SUI_CHAIN_IDS_TO_SDK_NETWORK[chainId]
    ConnectionInstance.suiSDK = new SuiSDK(networkType)
  }

  public static async syncSuiAccountResources(account: string, chainId: SupportedChainId, poolPair = false) {
    try {
      if (!account) return undefined
      const suiClient = ConnectionInstance.getSuiClient()
      const res = await suiClient.getAllBalances({ owner: account })
      const coinBalances = {}
      const lpBalances = {}
      const xBalances = {}

      console.log("syncSuiAccountResources res =", res);

      for (const resource of res) {
        const type = resource.coinType
        coinBalances[type] = resource.totalBalance
        // LP balance filter
        if (type.includes(`${this.suiSDK.networkOptions.modules.SwapPackage}::kojikiswap::LPCoin<`)) {
          const parts = type.split('::kojikiswap::LPCoin<')
          const [coinX, coinY] = parts[1].substring(0, parts[1].length - 1).split(', ')
          // console.log("HHW Balance Coins:", coinX, coinY);
          lpBalances[`${coinX}, ${coinY}`] = resource.totalBalance
          if (poolPair) {
            this.getPair(chainId, coinX, coinY)
          }
        }
      }
      // console.log("HHW LpBalances:", lpBalances);
      store.dispatch(resetCoinBalances({ coinBalances }))
      store.dispatch(resetLpBalances({ lpBalances }))
      return undefined
    } catch (error) {
      store.dispatch(resetCoinBalances({ coinBalances: {} }))
      store.dispatch(resetLpBalances({ lpBalances: {} }))
      return undefined
    }
  }

  public static async getSuiCoinBalance(chainId: SupportedChainId, account: string, type: string) {
    try {
      if (!account || !type) {
        return undefined
      }
      // console.log(`HHW getSuiCoinBalance ${account} ${type}`)
      const suiClient = ConnectionInstance.getSuiClient()
      const res = await suiClient.getBalance({ owner: account, coinType: type })
      // console.log(`HHW getSuiCoinBalance return`, res)
      const amount = res.totalBalance
      store.dispatch(setCoinBalances({ coinBalances: { [type]: amount.toString() } }))
      return amount
    } catch (error) {
      return undefined
    }
  }

  public static async getSuiPair(chainId: SupportedChainId, coinX: string, coinY: string): Promise<Pair> {
    try {
      if (!coinX || !coinY) return undefined
      const res = await this.getSuiSDK().swap.getLiquidityPool(coinX, coinY)
      // console.log("HHW getSuiPair:", res);
      const pair: Pair = {
        coinX,
        coinY,
        lpTotal: res.lp_supply.fields.value,
        coinXReserve: res.coin_x_reserve,
        coinYReserve: res.coin_y_reserve,
      }
      store.dispatch(updatePair({ pair }))
      return pair
    } catch (error) {
      console.error(error)
      store.dispatch(updatePair({ pair: undefined }))
      return undefined
    }
  }

  public static async getSuiAllPair(): Promise<{ [pairKey: string]: Pair }> {
    try {
      const pairs: { [pairKey: string]: Pair } = {}
      const poolResources = await ConnectionInstance.getSuiSDK().swap.getAllLPCoinResourcesWithAdmin()
      // parse coinX, coinY, LP, reserve
      for (const resource of poolResources) {
        if (resource.coinX === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
          resource.coinX = '0x2::sui::SUI'
        }
        const pairKey = `${resource.coinX}, ${resource.coinY}`
        pairs[pairKey] = {
          coinX: resource.coinX,
          coinY: resource.coinY,
          lpTotal: '0',
          coinXReserve: resource.coinXReserve,
          coinYReserve: resource.coinYReserve,
        }
      }
      console.log("HHW getAllSuiPairs:", pairs);
      return pairs
    } catch (error) {
      return {}
    }
  }

  public static async StakePayload(
    pool: Pair,
    amount: Decimal,
    account: string
  ): Promise<TransactionBlock> {
    // Stack 
    const state = store.getState();
    const master_chef = MasterChef_Info[state.user.chainId];
    const txb = new TransactionBlock();
    console.log("HHW farming amount: ", amount);
    // Get Lp coin address
    const CoinLP = `${this.getSuiSDK().networkOptions.modules.SwapPackage}::${this.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pool.coinX},${pool.coinY}>`;

    const coinLPIn = await (async () => {
      if (SuiUtils.isCoinEqual(CoinLP, this.getSuiSDK().networkOptions.coins.nativeCoin)) {
        return txb.splitCoins(
          txb.gas,
          [txb.pure(amount)],
        )
      } else {
        const CoinLPIdList = await this.suiSDK.swap.getCoinsObjectIdList(account, CoinLP, amount)
        if (CoinLPIdList.length == 0) {
          // tx should fail
          return txb.pure(0)
        } else if (CoinLPIdList.length == 1) {
          return txb.object(CoinLPIdList[0])
        } else {
          txb.mergeCoins(
            txb.object(CoinLPIdList[0]),
            CoinLPIdList.splice(1).map(coinId => txb.object(coinId)),
          )
          return txb.object(CoinLPIdList[0])
        }
      }
    })()

    txb.moveCall({
      target: `${master_chef.SwapPackage}::${master_chef.MasterchefModule}::stake`,
      arguments: [
        txb.object(master_chef.MasterchefStorage),
        txb.object(master_chef.AccountStorage),
        txb.object(master_chef.SakeStorage),
        txb.object(master_chef.ClockModule),
        coinLPIn,
        txb.pure(amount)
      ],
      typeArguments: [
        CoinLP
      ]
    });
    txb.setGasBudget(500000000)
    return txb
  }

  public static async UnstakePayload(
    pool: Pair,
    amount: Decimal,
    account: string
  ): Promise<TransactionBlock> {
    // Stack 
    const state = store.getState();
    const master_chef = MasterChef_Info[state.user.chainId];
    const txb = new TransactionBlock();
    // Get LPCoin
    console.log("HHW unstaking amount: ", amount);
    const CoinLP = `${this.getSuiSDK().networkOptions.modules.SwapPackage}::${this.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pool.coinX},${pool.coinY}>`;

    txb.moveCall({
      target: `${master_chef.SwapPackage}::${master_chef.MasterchefModule}::unstake`,
      arguments: [
        txb.object(master_chef.MasterchefStorage),
        txb.object(master_chef.AccountStorage),
        txb.object(master_chef.SakeStorage),
        txb.object(master_chef.ClockModule),
        txb.pure(amount)
      ],
      typeArguments: [
        CoinLP
      ]
    });
    txb.setGasBudget(500000000)
    return txb
  }

  public static async GetAccountDeposit(pool: Pair, account: string) {
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];
      const txb = new TransactionBlock();
      // Get LPCoin
      const CoinLP = `${this.getSuiSDK().networkOptions.modules.SwapPackage}::${this.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pool.coinX},${pool.coinY}>`;

      txb.moveCall({
        target: `${master_chef.SwapPackage}::${master_chef.MasterchefModule}::get_account_info`,
        arguments: [
          txb.object(master_chef.MasterchefStorage),
          txb.object(master_chef.AccountStorage),
          txb.pure(account),
        ],
        typeArguments: [
          CoinLP
        ]
      });
      // txb.setGasBudget(100000000)
      const result = await this.getSuiClient().devInspectTransactionBlock({
        transactionBlock: txb,
        sender: account || '0x0000000000000000000000000000000000000000000000000000000000000000',
      });

      const returnValues = getReturnValuesFromInspectResults(result);

      if (!returnValues || !returnValues.length) return 0;

      return bcs.de(returnValues[0][1], Uint8Array.from(returnValues[0][0]));
    } catch (error) {
      console.error("GetAccountDeposit error:", error);
      return 0;
    }
  }

  public static async GetAccountPendingReward(pool: Pair, account: string) {
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];
      const txb = new TransactionBlock();
      // Get LPCoin
      const CoinLP = `${this.getSuiSDK().networkOptions.modules.SwapPackage}::${this.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pool.coinX},${pool.coinY}>`;

      txb.moveCall({
        target: `${master_chef.SwapPackage}::${master_chef.MasterchefModule}::get_pending_rewards`,
        arguments: [
          txb.object(master_chef.MasterchefStorage),
          txb.object(master_chef.AccountStorage),
          txb.object(master_chef.ClockModule),
          txb.pure(account),
        ],
        typeArguments: [
          CoinLP
        ]
      });

      const result = await this.getSuiClient().devInspectTransactionBlock({
        transactionBlock: txb,
        sender: account || '0x0000000000000000000000000000000000000000000000000000000000000000',
      });

      const returnValues = getReturnValuesFromInspectResults(result);

      if (!returnValues || !returnValues.length) return 0;
      return bcs.de(returnValues[0][1], Uint8Array.from(returnValues[0][0]));
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  public static async GetXSakeValue(account: string,) {
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];
      const txb = new TransactionBlock();

      txb.moveCall({
        target: `${master_chef.SakePackage}::${master_chef.XSakeModule}::total_supply`,
        arguments: [
          txb.object(master_chef.XSakeStorage),
        ]
      });

      const result = await this.getSuiClient().devInspectTransactionBlock({
        transactionBlock: txb,
        sender: account || '0x0000000000000000000000000000000000000000000000000000000000000000',
      });

      const returnValues = getReturnValuesFromInspectResults(result);

      if (!returnValues || !returnValues.length) return [];
      return bcs.de(returnValues[0][1], Uint8Array.from(returnValues[0][0]));
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  public static GetXSakeTokenName() {
    const state = store.getState();
    const master_chef = MasterChef_Info[state.user.chainId];
    return `${master_chef.SakePackage}::${master_chef.XSakeModule}::XSAKE`;
  }

  public static GetSakeTokenName() {
    const state = store.getState();
    const master_chef = MasterChef_Info[state.user.chainId];
    return `${master_chef.SakePackage}::${master_chef.SakeModule}::SAKE`;
  }

  
  public static async BuyTokenPayload(amount: Decimal, account: string, tokenaddr: string, projectId: string): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];

      const coinSui = this.getSuiSDK().networkOptions.coins.nativeCoin;

      const coinSuiIn = await (async () => {
        if (SuiUtils.isCoinEqual(coinSui, this.getSuiSDK().networkOptions.coins.nativeCoin)) {
          return txb.splitCoins(
            txb.gas,
            [txb.pure(amount)],
          )
        } else {
          const coinSakeIdList = await this.suiSDK.swap.getCoinsObjectIdList(account, coinSui, amount)
          if (coinSakeIdList.length == 0) {
            // tx should fail
            return txb.pure(0)
          } else if (coinSakeIdList.length == 1) {
            return txb.object(coinSakeIdList[0])
          } else {
            txb.mergeCoins(
              txb.object(coinSakeIdList[0]),
              coinSakeIdList.splice(1).map(coinId => txb.object(coinId)),
            )
            return txb.object(coinSakeIdList[0])
          }
        }
      })()

    console.log("HHW BuyTokenPayload:", amount, master_chef.LaunchpadProjectBank, master_chef.ClockModule,
    master_chef.LaunchpadKyc, master_chef.LaunchpadVersion);
    txb.moveCall({
        target: `${master_chef.LaunchpadPackage}::${master_chef.LaunchpadModule}::buy`,
        arguments: [
          coinSuiIn,
          txb.pure(amount),
          txb.object(master_chef.LaunchpadProjectBank),
          txb.object(master_chef.ClockModule),
          txb.object(master_chef.LaunchpadKyc),
          txb.object(master_chef.LaunchpadVersion)
      ],
        typeArguments: [
          this.getSuiSDK().networkOptions.coins.nativeCoin,
          tokenaddr
        ]
      });
    } catch (error) {
      console.error(error);
    }
    return txb;
  }

  public static async ClaimTokenPayload(tokenaddr: string, projectId: string): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];

      const coinSui = this.getSuiSDK().networkOptions.coins.nativeCoin;

      txb.moveCall({
        target: `${master_chef.LaunchpadPackage}::${master_chef.LaunchpadModule}::buy`,
        arguments: [
          txb.object(projectId),
          txb.object(master_chef.ClockModule),
          txb.object(master_chef.LaunchpadVersion)
      ],
        typeArguments: [
          this.getSuiSDK().networkOptions.coins.nativeCoin,
          tokenaddr
        ]
      });
    } catch (error) {
      console.error(error);
    }
    return txb;
  }  

  public static async Convert2XSakePayload(amount: Decimal, account: string): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];

      const coinXSake = this.GetSakeTokenName();

      const coinXSakeIn = await (async () => {
        if (SuiUtils.isCoinEqual(coinXSake, this.getSuiSDK().networkOptions.coins.nativeCoin)) {
          return txb.splitCoins(
            txb.gas,
            [txb.pure(amount)],
          )
        } else {
          const coinSakeIdList = await this.suiSDK.swap.getCoinsObjectIdList(account, coinXSake, amount)
          if (coinSakeIdList.length == 0) {
            // tx should fail
            return txb.pure(0)
          } else if (coinSakeIdList.length == 1) {
            return txb.object(coinSakeIdList[0])
          } else {
            txb.mergeCoins(
              txb.object(coinSakeIdList[0]),
              coinSakeIdList.splice(1).map(coinId => txb.object(coinId)),
            )
            return txb.object(coinSakeIdList[0])
          }
        }
      })()

      txb.moveCall({
        target: `${master_chef.SakePackage}::${master_chef.XSakeModule}::convert_from_sake`,
        arguments: [
          txb.object(master_chef.XSakeStorage),
          coinXSakeIn,
          txb.pure(amount),
        ]
      });
    } catch (error) {
      console.error(error);
    }
    return txb;
  }

  public static async Convert2SakePayload(amount: Decimal, account: string): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    try {
      // Stack 
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];

      const coinXSake = this.GetXSakeTokenName();

      const coinXSakeIn = await (async () => {
        if (SuiUtils.isCoinEqual(coinXSake, this.getSuiSDK().networkOptions.coins.nativeCoin)) {
          return txb.splitCoins(
            txb.gas,
            [txb.pure(amount)],
          )
        } else {
          const coinSakeIdList = await this.suiSDK.swap.getCoinsObjectIdList(account, coinXSake, amount)
          if (coinSakeIdList.length == 0) {
            // tx should fail
            return txb.pure(0)
          } else if (coinSakeIdList.length == 1) {
            return txb.object(coinSakeIdList[0])
          } else {
            txb.mergeCoins(
              txb.object(coinSakeIdList[0]),
              coinSakeIdList.splice(1).map(coinId => txb.object(coinId)),
            )
            return txb.object(coinSakeIdList[0])
          }
        }
      })()

      txb.moveCall({
        target: `${master_chef.SakePackage}::${master_chef.XSakeModule}::convert_to_sake`,
        arguments: [
          txb.object(master_chef.XSakeStorage),
          coinXSakeIn,
          txb.pure(amount),
        ]
      });
    } catch (error) {
      console.error(error);
    }
    return txb;
  }

  public static async CreateProjectPayload(account: string): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    try {
      // Stack 
      // const state = store.getState();
      // const master_chef = MasterChef_Info[state.user.chainId];

      // txb.moveCall({
      //   target: `${master_chef.LaunchpadPackage}::${master_chef.LaunchpadModule}::create_project`,
      //   arguments: [
      //     txb.object(master_chef.XSakeStorage),
      //     coinXSakeIn,
      //     txb.pure(amount),
      //   ]
      // });
    } catch (error) {
      console.error(error);
    }
    return txb;
  }

  public static async GetLaunchpadProjectDatas() {
    try {
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];
      const objectDataResponse = await this.getSuiSDK().client.getObject({
        id: master_chef.LaunchpadProjectBank,
        options: {
          showContent: true,
        },
      })
      const details = objectDataResponse.data?.content as unknown as any
      const ProjectDataWrappers: Array<ProjectDataWrapper> = details.fields.projects
      const projects: Array<ProjectData> = ProjectDataWrappers.map(data => {
        return {
          id: "",
          tokenIconUrl: data.fields.tokenIconUrl,
          tokenName: data.fields.tokenName,
          tokenAddress: data.fields.tokenAddress,
          coinName: data.fields.coinName,
          coinAddress: data.fields.coinAddress,
          isHardcapReached: data.fields.isHardcapReached,
          isWLStage: data.fields.isWLStage,
          status: data.fields.status,
          raisedAmount: data.fields.raisedAmount,
          allocation: data.fields.allocation
        }
      })
      return projects
    } catch (error) {
      console.error("GetLaunchpadProjects Error:", error);
      return []
    }
  }

  public static async multiGetObjects(ids: string[], options?: SuiObjectDataOptions, limit = 50): Promise<any[]> {
    let objectDataResponses: any[] = []

    try {
      for (let i = 0; i < Math.ceil(ids.length / limit); i++) {
        const res = await this.getSuiSDK().client.multiGetObjects({
          ids: ids.slice(i * limit, limit * (i + 1)),
          options,
        })
        objectDataResponses = [...objectDataResponses, ...res]
      }
    } catch (error) {
      console.log(error)
    }

    return objectDataResponses
  }

  public static getSuiObjectData(resp: SuiObjectResponse): SuiObjectData | undefined {
    return resp.data;
  }

  public static isSuiObjectDataWithContent(data: SuiObjectData): data is SuiObjectDataWithContent {
    return data.content !== undefined;
  }

  public static getMoveObject(data: SuiObjectResponse | SuiObjectData): SuiMoveObject | undefined {
    const suiObject = 'data' in data ? this.getSuiObjectData(data) : (data as SuiObjectData);

    if (
      !suiObject ||
      !this.isSuiObjectDataWithContent(suiObject) ||
      suiObject.content.dataType !== 'moveObject'
    ) {
      return undefined;
    }

    return suiObject.content as SuiMoveObject;
  }

  public static getObjectFields(
    resp: SuiObjectResponse | SuiMoveObject | SuiObjectData,
  ): ObjectContentFields | undefined {
    if ('fields' in resp) {
      return resp.fields;
    }
    return this.getMoveObject(resp)?.fields;
  }

  public static async GetLaunchpadProjects() {
    try {
      const state = store.getState();
      const master_chef = MasterChef_Info[state.user.chainId];

      let hasNextPage = true
      let result: any = []
      let nextCursor = null

      do {
        const res: DynamicFieldPage = await this.getSuiSDK().client.getDynamicFields({
          parentId: master_chef.LaunchpadProjectBank,
          cursor: nextCursor,
          limit: null,
        })

        if (res.data) {
          result = [...result, ...res.data]
          hasNextPage = res.hasNextPage
          nextCursor = res.nextCursor
        } else {
          hasNextPage = false
        }
      } while (hasNextPage)

      const projectIds = result.map((item) => {
        return item.objectId
      })

      const objects = await this.multiGetObjects(projectIds, { showContent: true })
      const projects: {[token: string]: any} = {};
      objects.forEach((object) => {
        let fields = this.getObjectFields(object) as ObjectContentFields
        // const project: ProjectData = { 
        //   id: fields.id,
        //   tokenIconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/25051.png",
        //   tokenName: fields.token_name,
        //   tokenAddress: fields.token_addr,
        //   coinName: fields.coin_name,
        //   coinAddress: fields.coin_addr,
        //   isHardcapReached: false,
        //   isWLStage: fields.launch_state.fields.round == ROUND_PRIVATE,
        //   status: fields.launch_state.fields.state,
        //   raisedAmount: fields.launch_state.fields.coin_raised.fields.balance,
        //   allocation: fields.allocation
        // }
        projects[fields.token_name] = fields;
      })

      console.log("HHW Projects:", projects);
      store.dispatch(setProjects({projects}));
      return projects;
    } catch (error) {
      console.error("GetLaunchpadProjects Error:", error);
      return {}
    }
  }
}

const getReturnValuesFromInspectResults = (
  x: DevInspectResults,
): Array<[number[], string]> | null => {
  const results = propOr([], 'results', x) as DevInspectResults['results'];

  if (!results?.length) return null;

  const firstElem = head(results);

  if (!firstElem) return null;

  const returnValues = firstElem?.returnValues;

  return returnValues ? returnValues : null;
};

export default ConnectionInstance
