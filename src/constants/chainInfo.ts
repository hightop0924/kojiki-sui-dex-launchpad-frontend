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
    aniCoin: SUI_DEVNET_CoinInfo['0x2a103227aa10cd45f3f7c8a2c03370ef9c7b6b707d30e1bfab8b9e1f4d655d1d::usdt::USDT'],
    defaultBuyCoin:
      SUI_DEVNET_CoinInfo['0x2a103227aa10cd45f3f7c8a2c03370ef9c7b6b707d30e1bfab8b9e1f4d655d1d::usdt::USDT'],
    stableCoin: SUI_DEVNET_CoinInfo['0x2a103227aa10cd45f3f7c8a2c03370ef9c7b6b707d30e1bfab8b9e1f4d655d1d::usdt::USDT'],
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
    XSakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
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
    XSakeStorage: '0x0000000000000000000000000000000000000000000000000000000000000006',
    ClockModule: '0x0000000000000000000000000000000000000000000000000000000000000006',
  },
  [SupportedChainId.SUI_DEVNET] : {
    SwapPackage: '0x58dd46e6cbcf5daf98536e5a1838ccfa205eab747eb6d08ba8ff672c1694b7b9',
    MasterchefModule: 'master_chef',
    AccountStorage: '0x4a15795a8d6194cb394ef64fbb70db1b864734ed1a20516206f103775c4d32b6',
    MasterchefStorage: '0x41b9a7682d5cf744d872c81887a8b715732641b8b6b3699bee71f19f3f2f4c90',
    SakePackage: '0xa8a8ca7d5f9a396a8c25e1c1643d9dd20381deb381cc9d6e39d345c3793da94f',
    SakeModule: 'sake',
    XSakeModule: 'xsake',
    SakeStorage: '0x81466270382295085a0f9e499124d7b3e2f1f886a597b1acfebe396f773c0874',
    XSakeStorage: '0xdc2a79db0ff7c7d7fb11c8bfb0b8d341e519226976412ddcf6166b13eb9ab05d',
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
