import { Coin } from 'hooks/common/Coin'

export const APTOS_CoinInfo: { [address: string]: Coin } = {
  '0x1::aptos_coin::AptosCoin': {
    address: '0x1::aptos_coin::AptosCoin',
    decimals: 8,
    symbol: 'APT',
    name: 'Aptos',
    logoURL: ['https://coinlist.animeswap.org/icons/APT.svg'],
    projectURL: 'https://aptoslabs.com/',
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI',
    decimals: 8,
    symbol: 'ANI',
    name: 'AnimeSwap Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/ANI.png'],
    projectURL: 'http://animeswap.org/',
  },
  '0x777821c78442e17d82c3d7a371f42de7189e4248e529fe6eee6bca40ddbb::apcoin::ApCoin': {
    address: '0x777821c78442e17d82c3d7a371f42de7189e4248e529fe6eee6bca40ddbb::apcoin::ApCoin',
    decimals: 8,
    symbol: 'APC',
    name: 'Apass Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/APC.png'],
    projectURL: 'https://aptpp.com/',
  },
  '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC': {
    address: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
    decimals: 6,
    symbol: 'zUSDC',
    name: 'LayerZero USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
  },
  '0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T': {
    address: '0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T',
    decimals: 6,
    symbol: 'whUSDC',
    name: 'Wormhole USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
  },
  '0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin': {
    address: '0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin',
    decimals: 8,
    symbol: 'tAPT',
    name: 'Tortuga Staked APT',
    logoURL: ['https://coinlist.animeswap.org/icons/tAPT.svg'],
    projectURL: 'https://tortuga.finance/',
  },
  '0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos': {
    address: '0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos',
    decimals: 8,
    symbol: 'stAPT',
    name: 'Ditto Staked Aptos',
    logoURL: ['https://coinlist.animeswap.org/icons/DittoStakedAptos.svg'],
    projectURL: 'https://www.dittofinance.io/',
  },
  '0x07fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL': {
    address: '0x07fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL',
    decimals: 8,
    symbol: 'THL',
    name: 'Thala Token',
    logoURL: ['https://coinlist.animeswap.org/icons/THL.svg'],
    projectURL: 'https://www.thala.fi/',
  },
  '0x6f986d146e4a90b828d8c12c14b6f4e003fdff11a8eecceceb63744363eaac01::mod_coin::MOD': {
    address: '0x6f986d146e4a90b828d8c12c14b6f4e003fdff11a8eecceceb63744363eaac01::mod_coin::MOD',
    decimals: 8,
    symbol: 'MOD',
    name: 'Move Dollar',
    logoURL: ['https://coinlist.animeswap.org/icons/MOD.svg'],
    projectURL: 'https://www.thala.fi/',
  },
  '0xcc78307c77f1c2c0fdfee17269bfca7876a0b35438c3442417480c0d5c370fbc::AptopadCoin::APD': {
    address: '0xcc78307c77f1c2c0fdfee17269bfca7876a0b35438c3442417480c0d5c370fbc::AptopadCoin::APD',
    decimals: 8,
    symbol: 'APD',
    name: 'Aptopad Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/aptopad.png'],
    projectURL: 'https://aptopad.io',
  },
  '0xd6d6372c8bde72a7ab825c00b9edd35e643fb94a61c55d9d94a9db3010098548::USDC::Coin': {
    address: '0xd6d6372c8bde72a7ab825c00b9edd35e643fb94a61c55d9d94a9db3010098548::USDC::Coin',
    decimals: 6,
    symbol: 'mUSDC',
    name: 'USD Coin (Multichain)',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
    projectURL: 'https://gari.network',
  },
  '0x4def3d3dee27308886f0a3611dd161ce34f977a9a5de4e80b237225923492a2a::coin::T': {
    address: '0x4def3d3dee27308886f0a3611dd161ce34f977a9a5de4e80b237225923492a2a::coin::T',
    decimals: 8,
    symbol: 'GARI',
    name: 'Gari',
    logoURL: ['https://coinlist.animeswap.org/icons/GARI.svg'],
    projectURL: 'https://gari.network',
  },
  '0x14b0ef0ec69f346bea3dfa0c5a8c3942fb05c08760059948f9f24c02cd0d4fd8::mover_token::Mover': {
    address: '0x14b0ef0ec69f346bea3dfa0c5a8c3942fb05c08760059948f9f24c02cd0d4fd8::mover_token::Mover',
    decimals: 8,
    symbol: 'MOVER',
    name: 'Mover',
    logoURL: ['https://coinlist.animeswap.org/icons/MOVER.svg'],
    projectURL: 'https://mov3r.xyz/',
  },
  '0x27975005fd8b836a905dc7f81c51f89e76091a4d0c4d694265f6eae0c05cb400::proton_a5d::PROTON_E54': {
    address: '0x27975005fd8b836a905dc7f81c51f89e76091a4d0c4d694265f6eae0c05cb400::proton_a5d::PROTON_E54',
    decimals: 6,
    symbol: 'ALI',
    name: 'Eternal Token',
    logoURL: ['https://coinlist.animeswap.org/icons/ALI.svg'],
    projectURL: 'https://twitter.com/AlpacaINU',
  },
  '0x25a64579760a4c64be0d692327786a6375ec80740152851490cfd0b53604cf95::coin::ETERN': {
    address: '0x25a64579760a4c64be0d692327786a6375ec80740152851490cfd0b53604cf95::coin::ETERN',
    decimals: 8,
    symbol: 'ETERN',
    name: 'Eternal Token',
    logoURL: ['https://coinlist.animeswap.org/icons/ETERN.svg'],
    projectURL: 'https://eternalfinance.io',
  },
  '0x27fafcc4e39daac97556af8a803dbb52bcb03f0821898dc845ac54225b9793eb::move_coin::MoveCoin': {
    address: '0x27fafcc4e39daac97556af8a803dbb52bcb03f0821898dc845ac54225b9793eb::move_coin::MoveCoin',
    decimals: 8,
    symbol: 'MOVE',
    name: 'BlueMove',
    logoURL: ['https://coinlist.animeswap.org/icons/MOVE.svg'],
    projectURL: 'https://bluemove.net/',
  },
  '0x5a1e84cdd217034d764abb91bf20aa0536c5a8c900831a37b393fe3af98c3f55::thepeoplecoin::The_People': {
    address: '0x5a1e84cdd217034d764abb91bf20aa0536c5a8c900831a37b393fe3af98c3f55::thepeoplecoin::The_People',
    decimals: 6,
    symbol: 'People',
    name: 'The People',
    logoURL: ['https://coinlist.animeswap.org/icons/People.png'],
    projectURL: 'https://thepeopleapt.xyz/',
  },
  '0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf::AptSwap::AptSwapGovernance': {
    address: '0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf::AptSwap::AptSwapGovernance',
    decimals: 8,
    symbol: 'APTSWAP',
    name: 'AptSwap Governance Token',
    logoURL: ['https://coinlist.animeswap.org/icons/AptSwap.svg'],
    projectURL: 'http://aptswap.io',
  },
  '0xd1fe830dd863890ead995cbed2e1584da1558df1de184f31c8d0adf95fe19bc::proton_d69::PROTON_75C': {
    address: '0xd1fe830dd863890ead995cbed2e1584da1558df1de184f31c8d0adf95fe19bc::proton_d69::PROTON_75C',
    decimals: 6,
    symbol: 'BOFA',
    name: 'Bofa Chiku',
    logoURL: ['https://coinlist.animeswap.org/icons/BOFA.png'],
    projectURL: 'https://bofachiku.com/',
  },
  '0x7bdeaba6f037caf06bb5b2d57df9ee03a07e2a9df45b338ef3deb44d16c01d10::spring_coin::Spring_Coin': {
    address: '0x7bdeaba6f037caf06bb5b2d57df9ee03a07e2a9df45b338ef3deb44d16c01d10::spring_coin::Spring_Coin',
    decimals: 9,
    symbol: 'SPRING',
    name: 'SPRING',
    logoURL: ['https://coinlist.animeswap.org/icons/SPRING.webp'],
    projectURL: 'https://springers.co.in/',
  },
  '0xd0b4efb4be7c3508d9a26a9b5405cf9f860d0b9e5fe2f498b90e68b8d2cedd3e::aptos_launch_token::AptosLaunchToken': {
    address: '0xd0b4efb4be7c3508d9a26a9b5405cf9f860d0b9e5fe2f498b90e68b8d2cedd3e::aptos_launch_token::AptosLaunchToken',
    decimals: 8,
    symbol: 'ALT',
    name: 'ALT',
    logoURL: ['https://coinlist.animeswap.org/icons/Aptoslaunchlogob.svg'],
    projectURL: 'https://aptoslaunch.io/',
  },
  '0x389dbbc6884a1d5b1ab4e1df2913a8c1b01251e50aed377554372b2842c5e3ef::EONcoin::EONCoin': {
    address: '0x389dbbc6884a1d5b1ab4e1df2913a8c1b01251e50aed377554372b2842c5e3ef::EONcoin::EONCoin',
    decimals: 8,
    symbol: 'EON',
    name: 'EON',
    logoURL: ['https://coinlist.animeswap.org/icons/EON.svg'],
    projectURL: 'https://eonlabz.com/',
  },
  '0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT': {
    address: '0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT',
    decimals: 8,
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    logoURL: ['https://coinlist.animeswap.org/icons/CAKE.svg'],
    projectURL: 'https://pancakeswap.finance/',
  },
  '0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::ditto_discount_coin::DittoDiscountCoin': {
    address:
      '0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::ditto_discount_coin::DittoDiscountCoin',
    decimals: 8,
    symbol: 'DTO',
    name: 'Ditto Discount Token',
    logoURL: ['https://coinlist.animeswap.org/icons/DTO.svg'],
    projectURL: 'https://www.dittofinance.io/',
  },
  '0x7c0322595a73b3fc53bb166f5783470afeb1ed9f46d1176db62139991505dc61::abel_coin::AbelCoin': {
    address: '0x7c0322595a73b3fc53bb166f5783470afeb1ed9f46d1176db62139991505dc61::abel_coin::AbelCoin',
    decimals: 8,
    symbol: 'ABEL',
    name: 'Abel Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/ABEL.svg'],
    projectURL: 'https://www.abelfinance.xyz/',
  },
  '0xc81caa7cd37c4adf61764b3e47dfa8d9a94fbeb96ca9e5fbf88befde4cff3c12::Apsocoin::Apsocoin': {
    address: '0xc81caa7cd37c4adf61764b3e47dfa8d9a94fbeb96ca9e5fbf88befde4cff3c12::Apsocoin::Apsocoin',
    decimals: 6,
    symbol: 'APSO',
    name: 'Apso Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/APSO.png'],
    projectURL: 'https://apsocoin.com/',
  },
  '0x8b633e663f6c78177f4cfe5761395cf9f78fd18ab81d456ee58a5d03e9af93c1::proton_ba3::PROTON_49D': {
    address: '0x8b633e663f6c78177f4cfe5761395cf9f78fd18ab81d456ee58a5d03e9af93c1::proton_ba3::PROTON_49D',
    decimals: 6,
    symbol: 'CUCHI',
    name: 'CUTECHICKS',
    logoURL: ['https://coinlist.animeswap.org/icons/CUCHI.png'],
    projectURL: 'http://www.cutechicks.xyz/',
  },
  '0x84edd115c901709ef28f3cb66a82264ba91bfd24789500b6fd34ab9e8888e272::coin::DLC': {
    address: '0x84edd115c901709ef28f3cb66a82264ba91bfd24789500b6fd34ab9e8888e272::coin::DLC',
    decimals: 8,
    symbol: 'DLC',
    name: 'Doglaika Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/DLC.svg'],
    projectURL: 'https://doglaikacoin.xyz',
  },
  '0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9::mee_coin::MeeCoin': {
    address: '0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9::mee_coin::MeeCoin',
    decimals: 6,
    symbol: 'MEE',
    name: 'Meeiro',
    logoURL: ['https://coinlist.animeswap.org/icons/MEE.svg'],
    projectURL: 'https://meeiro.xyz',
  },
  '0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf::Aptoge::Aptoge': {
    address: '0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf::Aptoge::Aptoge',
    decimals: 6,
    symbol: 'APTOGE',
    name: 'Aptoge',
    logoURL: ['https://coinlist.animeswap.org/icons/APTOGE.svg'],
  },
  '0x881ac202b1f1e6ad4efcff7a1d0579411533f2502417a19211cfc49751ddb5f4::coin::MOJO': {
    address: '0x881ac202b1f1e6ad4efcff7a1d0579411533f2502417a19211cfc49751ddb5f4::coin::MOJO',
    decimals: 8,
    symbol: 'MOJO',
    name: 'Mojito',
    logoURL: ['https://coinlist.animeswap.org/icons/MOJO.svg'],
    projectURL: 'https://www.mojito.markets/',
  },
  '0x1000000fa32d122c18a6a31c009ce5e71674f22d06a581bb0a15575e6addadcc::usda::USDA': {
    address: '0x1000000fa32d122c18a6a31c009ce5e71674f22d06a581bb0a15575e6addadcc::usda::USDA',
    decimals: 6,
    symbol: 'USDA',
    name: 'Argo USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDA.svg'],
    projectURL: 'https://argo.fi/',
  },
  '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT': {
    address: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT',
    decimals: 6,
    symbol: 'zUSDT',
    name: 'LayerZero Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH': {
    address: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH',
    decimals: 6,
    symbol: 'zWETH',
    name: 'LayerZero Wrapped Ethereum',
    logoURL: ['https://coinlist.animeswap.org/icons/WETH.png'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BnbCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BnbCoin',
    decimals: 8,
    symbol: 'ceBNB',
    name: 'Celer Binance Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/BNB.png'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BusdCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BusdCoin',
    decimals: 8,
    symbol: 'ceBUSD',
    name: 'Celer Binance USD',
    logoURL: ['https://coinlist.animeswap.org/icons/BUSD.png'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdcCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdcCoin',
    decimals: 6,
    symbol: 'ceUSDC',
    name: 'Celer USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin',
    decimals: 6,
    symbol: 'ceUSDT',
    name: 'Celer Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::DaiCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::DaiCoin',
    decimals: 8,
    symbol: 'ceDAI',
    name: 'Celer Dai Stablecoin',
    logoURL: ['https://coinlist.animeswap.org/icons/DAI.webp'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WethCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WethCoin',
    decimals: 6,
    symbol: 'ceWETH',
    name: 'Celer Wrapped Ethereum',
    logoURL: ['https://coinlist.animeswap.org/icons/WETH.png'],
  },
  '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WbtcCoin': {
    address: '0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WbtcCoin',
    decimals: 8,
    symbol: 'ceWBTC',
    name: 'Celer Wrapped BTC',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
  },
  '0xae478ff7d83ed072dbc5e264250e67ef58f57c99d89b447efd8a0a2e8b2be76e::coin::T': {
    address: '0xae478ff7d83ed072dbc5e264250e67ef58f57c99d89b447efd8a0a2e8b2be76e::coin::T',
    decimals: 8,
    symbol: 'whWBTC',
    name: 'Wormhole Wrapped BTC',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
  },
  '0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb::coin::T': {
    address: '0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb::coin::T',
    decimals: 8,
    symbol: 'whWETH',
    name: 'Wormhole Wrapped Ether',
    logoURL: ['https://coinlist.animeswap.org/icons/WETH.png'],
  },
  '0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852::coin::T': {
    address: '0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852::coin::T',
    decimals: 6,
    symbol: 'whUSDT',
    name: 'Wormhole Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13::coin::T': {
    address: '0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13::coin::T',
    decimals: 8,
    symbol: 'whSOL',
    name: 'Wormhole Solana',
    logoURL: ['https://coinlist.animeswap.org/icons/SOL.svg'],
  },
}

export const APTOS_TESTNET_CoinInfo: { [address: string]: Coin } = {
  '0x1::aptos_coin::AptosCoin': {
    address: '0x1::aptos_coin::AptosCoin',
    decimals: 8,
    symbol: 'APT',
    name: 'Aptos',
    logoURL: ['https://coinlist.animeswap.org/icons/APT.svg'],
    projectURL: 'https://aptoslabs.com/',
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI',
    decimals: 8,
    symbol: 'ANI',
    name: 'AnimeSwap Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/ANI.png'],
    projectURL: 'http://animeswap.org/',
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT',
    decimals: 8,
    symbol: 'USDT',
    name: 'Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC',
    decimals: 8,
    symbol: 'BTC',
    name: 'Bitcoin',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
  },
  '0xc7aef22455c9e3744d98d6dc024d0ed898dc6d307def82abd563653ecbb1e022::koiz_coin::KoizCoin': {
    address: '0xc7aef22455c9e3744d98d6dc024d0ed898dc6d307def82abd563653ecbb1e022::koiz_coin::KoizCoin',
    decimals: 6,
    symbol: 'KOIZ',
    name: 'Koiz Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/KOIZ.png'],
  },
  '0x2a2ad97dfdbe4e34cdc9321c63592dda455f18bc25c9bb1f28260312159eae27::staked_aptos_coin::StakedAptosCoin': {
    address: '0x2a2ad97dfdbe4e34cdc9321c63592dda455f18bc25c9bb1f28260312159eae27::staked_aptos_coin::StakedAptosCoin',
    decimals: 8,
    symbol: 'tAPT',
    name: 'Tortuga Staked APT',
    logoURL: ['https://coinlist.animeswap.org/icons/tAPT.svg'],
    projectURL: 'https://tortuga.finance/',
  },
  '0xe4497a32bf4a9fd5601b27661aa0b933a923191bf403bd08669ab2468d43b379::move_coin::MoveCoin': {
    address: '0xe4497a32bf4a9fd5601b27661aa0b933a923191bf403bd08669ab2468d43b379::move_coin::MoveCoin',
    decimals: 8,
    symbol: 'MOVE',
    name: 'BlueMove Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/MOVE.svg'],
    projectURL: 'https://bluemove.net/',
  },
  '0x5c341dec2396029a7713cb59decee89635a6f851a5fe528fc39761ec2ddbf99a::celer_coin_manager::UsdcCoin': {
    address: '0x5c341dec2396029a7713cb59decee89635a6f851a5fe528fc39761ec2ddbf99a::celer_coin_manager::UsdcCoin',
    decimals: 8,
    symbol: 'ceUSDC',
    name: 'Celer USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
  },
}

export const APTOS_DEVNET_CoinInfo: { [address: string]: Coin } = {
  '0x1::aptos_coin::AptosCoin': {
    address: '0x1::aptos_coin::AptosCoin',
    decimals: 8,
    symbol: 'APT',
    name: 'Aptos',
    logoURL: ['https://coinlist.animeswap.org/icons/APT.svg'],
    projectURL: 'https://aptoslabs.com/',
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI',
    decimals: 8,
    symbol: 'ANI',
    name: 'AnimeSwap Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/ANI.png'],
    projectURL: 'http://animeswap.org/',
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::USDT',
    decimals: 8,
    symbol: 'USDT',
    name: 'Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC': {
    address: '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC',
    decimals: 8,
    symbol: 'BTC',
    name: 'Bitcoin',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
  },
  '0xfa8c09437aa00eef18849eb9bfabf2be0dac73f03da91f46218cd1647278931b::staked_aptos_coin::StakedAptosCoin': {
    address: '0xfa8c09437aa00eef18849eb9bfabf2be0dac73f03da91f46218cd1647278931b::staked_aptos_coin::StakedAptosCoin',
    decimals: 8,
    symbol: 'tAPT',
    name: 'Tortuga Staked APT',
    logoURL: ['https://coinlist.animeswap.org/icons/tAPT.svg'],
    projectURL: 'https://tortuga.finance/',
  },
  '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_dai_coin::TestMintCoin': {
    address: '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_dai_coin::TestMintCoin',
    decimals: 8,
    symbol: 'ceDAI',
    name: 'Celer Dai Stablecoin',
    logoURL: ['https://coinlist.animeswap.org/icons/DAI.webp'],
  },
  '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_usdc_coin::TestMintCoin': {
    address: '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_usdc_coin::TestMintCoin',
    decimals: 8,
    symbol: 'ceUSDC',
    name: 'Celer USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
  },
  '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_usdt_coin::TestMintCoin': {
    address: '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_usdt_coin::TestMintCoin',
    decimals: 8,
    symbol: 'ceUSDT',
    name: 'Celer Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
  },
  '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_wbtc_coin::TestMintCoin': {
    address: '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_wbtc_coin::TestMintCoin',
    decimals: 8,
    symbol: 'ceWBTC',
    name: 'Celer Wrapped Bitcoin',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
  },
  '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_weth_coin::TestMintCoin': {
    address: '0xbc954a7df993344c9fec9aaccdf96673a897025119fc38a8e0f637598496b47a::test_mint_weth_coin::TestMintCoin',
    decimals: 8,
    symbol: 'ceWETH',
    name: 'Celer Wrapped Ethereum',
    logoURL: ['https://coinlist.animeswap.org/icons/WETH.png'],
  },
}

export const SUI_CoinInfo: { [address: string]: Coin } = {
  '0x2::sui::SUI': {
    address: '0x2::sui::SUI',
    decimals: 9,
    symbol: 'SUI',
    name: 'SUI',
    logoURL: ['https://coinlist.animeswap.org/icons/SUI.svg'],
    projectURL: 'https://sui.io/',
  },
  '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN': {
    address: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    decimals: 6,
    symbol: 'USDT',
    name: 'Wormhole Tether USD',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN': {
    address: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
    decimals: 6,
    symbol: 'USDC',
    name: 'Wormhole USD Coin',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037::coin::COIN': {
    address: '0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037::coin::COIN',
    decimals: 6,
    symbol: 'USDCsol',
    name: 'Wormhole USD Coin (Solana)',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN': {
    address: '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
    decimals: 8,
    symbol: 'WETH',
    name: 'Wormhole Wrapped Ether',
    logoURL: ['https://coinlist.animeswap.org/icons/WETH.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN': {
    address: '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wormhole Wrapped BTC',
    logoURL: ['https://coinlist.animeswap.org/icons/BTC.webp'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xd9f9b0b4f35276eecd1eea6985bfabe2a2bbd5575f9adb9162ccbdb4ddebde7f::smove::SMOVE': {
    address: '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN',
    decimals: 9,
    symbol: 'MOVE',
    name: 'MOVE',
    logoURL: ['https://coinlist.animeswap.org/icons/MOVE.svg'],
    projectURL: 'https://dex.bluemove.net/',
  },
  '0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f::coin::COIN': {
    address: '0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f::coin::COIN',
    decimals: 8,
    symbol: 'WBNB',
    name: 'Wormhole Wrapped BNB',
    logoURL: ['https://coinlist.animeswap.org/icons/BNB.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xdbe380b13a6d0f5cdedd58de8f04625263f113b3f9db32b3e1983f49e2841676::coin::COIN': {
    address: '0xdbe380b13a6d0f5cdedd58de8f04625263f113b3f9db32b3e1983f49e2841676::coin::COIN',
    decimals: 8,
    symbol: 'WMATIC',
    name: 'Wormhole Wrapped Matic',
    logoURL: ['https://coinlist.animeswap.org/icons/MATIC.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN': {
    address: '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN',
    decimals: 8,
    symbol: 'SOL',
    name: 'Wormhole Wrapped SOL',
    logoURL: ['https://coinlist.animeswap.org/icons/SOL.svg'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0x6081300950a4f1e2081580e919c210436a1bed49080502834950d31ee55a2396::coin::COIN': {
    address: '0x6081300950a4f1e2081580e919c210436a1bed49080502834950d31ee55a2396::coin::COIN',
    decimals: 8,
    symbol: 'WGLMR',
    name: 'Wormhole Wrapped GLMR',
    logoURL: ['https://coinlist.animeswap.org/icons/GLMR.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN': {
    address: '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN',
    decimals: 8,
    symbol: 'WAVAX',
    name: 'Wormhole Wrapped AVAX',
    logoURL: ['https://coinlist.animeswap.org/icons/AVAX.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
  '0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f::coin::COIN': {
    address: '0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f::coin::COIN',
    decimals: 8,
    symbol: 'CELO',
    name: 'Wormhole Celo native asset',
    logoURL: ['https://coinlist.animeswap.org/icons/CELO.png'],
    projectURL: 'https://www.portalbridge.com/sui',
  },
}

export const SUI_TESTNET_CoinInfo: { [address: string]: Coin } = {
  '0x2::sui::SUI': {
    address: '0x2::sui::SUI',
    decimals: 9,
    symbol: 'SUI',
    name: 'SUI',
    logoURL: ['https://coinlist.animeswap.org/icons/SUI.svg'],
    projectURL: 'https://sui.io/',
  },
  '0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdc::USDC': {
    address: '0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdc::USDC',
    decimals: 8,
    symbol: 'USDC',
    name: 'USDC',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
    projectURL: 'https://sui.io/',
  },
  '0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdt::USDT': {
    address: '0x702a609dc22a429a14618c86147e99c711b00d15653083fe17cf16861cd3b97b::usdt::USDT',
    decimals: 8,
    symbol: 'USDT',
    name: 'USDT',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
    projectURL: 'https://sui.io/',
  },
}

export const SUI_DEVNET_CoinInfo: { [address: string]: Coin } = {
  '0x2::sui::SUI': {
    address: '0x2::sui::SUI',
    decimals: 9,
    symbol: 'SUI',
    name: 'SUI',
    logoURL: ['https://coinlist.animeswap.org/icons/SUI.svg'],
    projectURL: 'https://sui.io/',
  },
  '0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdc::USDC': {
    address: '0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdc::USDC',
    decimals: 8,
    symbol: 'USDC',
    name: 'USDC',
    logoURL: ['https://coinlist.animeswap.org/icons/USDC.webp'],
    projectURL: 'https://sui.io/',
  },
  '0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdt::USDT': {
    address: '0x36c3caa66233e1aa2fde07e584c7825f351a579bca79d2af85ffbd4050b22e7a::usdt::USDT',
    decimals: 8,
    symbol: 'USDT',
    name: 'USDT',
    logoURL: ['https://coinlist.animeswap.org/icons/USDT.webp'],
    projectURL: 'https://sui.io/',
  },
}
