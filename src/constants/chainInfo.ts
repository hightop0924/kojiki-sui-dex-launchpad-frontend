import aptosLogo from 'assets/aptos_logo.svg'
import suiLogo from 'assets/sui_logo.svg'
import { Coin } from 'hooks/common/Coin'

import { SupportedChainId } from './chains'
import {
  APTOS_CoinInfo,
  APTOS_DEVNET_CoinInfo,
  APTOS_TESTNET_CoinInfo,
  SUI_CoinInfo,
  SUI_DEVNET_CoinInfo,
  SUI_TESTNET_CoinInfo,
} from './coinInfo'

interface BaseChainInfo {
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCoin: Coin
  readonly aniCoin?: Coin
  readonly defaultBuyCoin?: Coin
  readonly stableCoin: Coin
  readonly zUSDC?: Coin
  readonly color?: string
  readonly backgroundColor?: string
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.APTOS]: {
    docs: 'https://aptoslabs.com/',
    explorer: 'https://explorer.aptoslabs.com/?network=mainnet',
    label: 'Aptos',
    logoUrl: aptosLogo,
    nativeCoin: APTOS_CoinInfo['0x1::aptos_coin::AptosCoin'],
    aniCoin: APTOS_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    defaultBuyCoin:
      APTOS_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    stableCoin: APTOS_CoinInfo['0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC'],
    zUSDC: APTOS_CoinInfo['0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC'],
  },
  [SupportedChainId.APTOS_TESTNET]: {
    bridge: 'https://dev-cbridge-v2.netlify.app/5/12360002/USDC',
    docs: 'https://aptoslabs.com/',
    explorer: 'https://explorer.aptoslabs.com/?network=testnet',
    label: 'AptosTest',
    logoUrl: aptosLogo,
    nativeCoin: APTOS_TESTNET_CoinInfo['0x1::aptos_coin::AptosCoin'],
    aniCoin:
      APTOS_TESTNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    defaultBuyCoin:
      APTOS_TESTNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    stableCoin:
      APTOS_TESTNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT'],
  },
  [SupportedChainId.APTOS_DEVNET]: {
    docs: 'https://aptoslabs.com/',
    explorer: 'https://explorer.aptoslabs.com/?network=devnet',
    label: 'AptosDev',
    logoUrl: aptosLogo,
    nativeCoin: APTOS_DEVNET_CoinInfo['0x1::aptos_coin::AptosCoin'],
    aniCoin:
      APTOS_DEVNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    defaultBuyCoin:
      APTOS_DEVNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI'],
    stableCoin:
      APTOS_DEVNET_CoinInfo['0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT'],
  },
  [SupportedChainId.SUI]: {
    docs: 'https://sui.io/',
    explorer: 'https://explorer.sui.io/?network=mainnet',
    label: 'Sui',
    logoUrl: suiLogo,
    nativeCoin: SUI_CoinInfo['0x2::sui::SUI'],
    aniCoin: SUI_CoinInfo['0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'],
    defaultBuyCoin: SUI_CoinInfo['0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'],
    stableCoin: SUI_CoinInfo['0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'],
  },
  [SupportedChainId.SUI_TESTNET]: {
    docs: 'https://sui.io/',
    explorer: 'https://explorer.sui.io/?network=testnet',
    label: 'SuiTest',
    logoUrl: suiLogo,
    nativeCoin: SUI_TESTNET_CoinInfo['0x2::sui::SUI'],
    aniCoin: SUI_TESTNET_CoinInfo['0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdt::USDT'],
    defaultBuyCoin:
      SUI_TESTNET_CoinInfo['0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdt::USDT'],
    stableCoin: SUI_TESTNET_CoinInfo['0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdt::USDT'],
  },
  [SupportedChainId.SUI_DEVNET]: {
    docs: 'https://sui.io/',
    explorer: 'https://explorer.sui.io/?network=devnet',
    label: 'SuiDev',
    logoUrl: suiLogo,
    nativeCoin: SUI_DEVNET_CoinInfo['0x2::sui::SUI'],
    aniCoin: SUI_DEVNET_CoinInfo['0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdt::USDT'],
    defaultBuyCoin:
      SUI_DEVNET_CoinInfo['0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdt::USDT'],
    stableCoin: SUI_DEVNET_CoinInfo['0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdt::USDT'],
  },
}

interface MasterChefInfo {
  SwapPackage: string,
  SakePackage: string,
  MasterchefModule: string,
  SakeModule: string,
  XSakeModule: string,
  MasterchefStorage: string,
  AccountStorage: string,
  SakeStorage: string,
  XSakeStorage: string,
  LaunchpadPackage: string,
  LaunchpadModule: string,
  LaunchpadProjectBank: string,
  LaunchpadAdminCap: string,
  LaunchpadVersion: string,
  LaunchpadKyc: string,
  SakeAdminCap: string,
  ClockModule: string,
}

export type MasterChefInfoMap = { [chainId: number]: MasterChefInfo }

export const MasterChef_Info : MasterChefInfoMap = {
  [SupportedChainId.SUI] : {
    SwapPackage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    MasterchefModule: 'master_chef',
    MasterchefStorage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    AccountStorage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    SakePackage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    SakeModule: 'sake',
    XSakeModule: 'xsake',
    SakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    SakeAdminCap: '0x843c461eed7a4a5b589aaaf4985ba8cc25c1ea258912f582ea76c5bea97ce139',
    XSakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
    LaunchpadPackage: '',
    LaunchpadModule: 'project_entries',
    LaunchpadProjectBank: '',
    LaunchpadAdminCap: '0xc031274dc7ad5c9c67e834592f08b9117f2b9211738cac0ff49b5ddafda578da',
    LaunchpadVersion: '0x24ad4a36aa731361d5064cb0c270d2ea1caa7d8cecfcb922d18997fe341cc522',
    LaunchpadKyc: '0x4d994078e2825940bed6555877a9bd5a46f4dc0386c91885e11976f968677668',
    ClockModule: '0x0000000000000000000000000000000000000000000000000000000000000006',
  },
  [SupportedChainId.SUI_TESTNET] : {
    SwapPackage: '',
    SakePackage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    MasterchefModule: 'master_chef',
    SakeModule: 'sake',
    XSakeModule: 'xsake',
    MasterchefStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
    AccountStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
    SakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000000',
    SakeAdminCap: '0x843c461eed7a4a5b589aaaf4985ba8cc25c1ea258912f582ea76c5bea97ce139',
    XSakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
    LaunchpadPackage: '',
    LaunchpadModule: 'project_entries',
    LaunchpadProjectBank: '',
    LaunchpadAdminCap: '0xc031274dc7ad5c9c67e834592f08b9117f2b9211738cac0ff49b5ddafda578da',
    LaunchpadVersion: '0x24ad4a36aa731361d5064cb0c270d2ea1caa7d8cecfcb922d18997fe341cc522',
    LaunchpadKyc: '0x4d994078e2825940bed6555877a9bd5a46f4dc0386c91885e11976f968677668',
    ClockModule: '0x0000000000000000000000000000000000000000000000000000000000000006',
  },
  [SupportedChainId.SUI_DEVNET] : {
    SwapPackage: '0x4ff5d043a3589c268b88235bb6e46032e5eab89c8e0d5832f185da5cda7e721a',
    
    MasterchefModule: 'master_chef',
    AccountStorage: '0x4cc1f1d2a60d867995f8501f8a3abd7c8ea2b231d9a49fdab9541abb036cc0f5',
    MasterchefStorage: '0x03ad1609283ac347ec43d84628fa63728a41e62182001e6e031221458325bd8c',
    
    SakePackage: '0x3a54b8ac4470704aab5feef0b74b774753235bfbf5456458610085dfbb413f99',
    SakeModule: 'sake',
    XSakeModule: 'xsake',
    SakeStorage: '0xdfddba8c15bb1a110b9cd72db7e4c8ed7b99c54c3b95884a12ad40cb1220fdee',
    SakeAdminCap: '0x843c461eed7a4a5b589aaaf4985ba8cc25c1ea258912f582ea76c5bea97ce139',
    XSakeStorage: '0x77e09a5724b75d1f96a0715a0d4441289b8a1a3b3c696b7f58a3fb67f55a70ef',

    LaunchpadPackage: '0x4179b2aaa87021e20841eddd09b23ec165d3473b9766f2efc87a781a8715d461',
    LaunchpadModule: 'project_entries',
    LaunchpadProjectBank: '0x08f98bbfe243fed09c333811c9cdf0c916a0a7d864ca1d50dd59ef17af368d6e',
    LaunchpadAdminCap: '0x99e7e3cdcb3eb5382daf8f9db81715341fab8857bce022c678e8e1534a54fbb6',
    LaunchpadVersion: '0x93a5a243d88f12a7c89a2327c5c109175227a8544e03e1f7fc776dba6ef4cfab',
    LaunchpadKyc: '0xd4f1b76ce331336bc73e3a6356cada33bb7355a79e4b40b64ffa7c0ce3de10f4',
    ClockModule: '0x0000000000000000000000000000000000000000000000000000000000000006',
  },
}

export function getChainInfo(chainId: SupportedChainId): BaseChainInfo {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? CHAIN_INFO[SupportedChainId.SUI_TESTNET]
}

export function getMasterchefInfo(chainId: number) {
  return MasterChef_Info[chainId] ?? undefined;
}
