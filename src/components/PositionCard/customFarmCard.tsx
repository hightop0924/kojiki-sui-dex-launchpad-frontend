import { Decimal, Utils } from '@animeswap.org/v1-sdk'
import { Trans } from '@lingui/macro'
import { getChainInfoOrDefault } from 'constants/chainInfo'
import { amountPretty, CoinAmount, useCoin } from 'hooks/common/Coin'
import { Pair, pairKey, PairState, useNativePrice, usePair } from 'hooks/common/Pair'
import { transparentize } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import { useChainId } from 'state/user/hooks'
import { useLpBalance } from 'state/wallets/hooks'
import { useAccount } from 'state/wallets/hooks'
import styled from 'styled-components/macro'
import { formatDollarAmount } from 'utils/formatDollarAmt'

import { useColor } from '../../hooks/useColor'
import { ThemedText } from '../../theme'
import { ButtonEmpty, ButtonPrimary, ButtonSecondary, ButtonYellow, ButtonLight } from '../Button'
import { GreyCard, LightCard } from '../Card'
import CoinLogo from '../CoinLogo'
import Column, { AutoColumn } from '../Column'
import DoubleCoinLogo from '../DoubleLogo'
import { CardNoise } from '../earn/styled'
import Row, { AutoRow, RowBetween, RowFixed } from '../Row'
import Modal from 'components/Modal'
import Input from 'components/NumericalInput'
import { useToggleWalletModal } from 'state/application/hooks'
import { isStatement } from 'typescript'
import ConnectionInstance from 'state/connection/instance'
import { useWalletKit } from '@mysten/wallet-kit'
import { SignAndSubmitSuiTransaction } from 'state/wallets/hooks'
import { Utils as SuiUtils } from '@animeswap.org/sui-v1-sdk'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

const StyledPositionCard = styled(LightCard) <{ bgColor: any }>`
  border: 0px;
  padding: 20px 30px;
  border-bottom: 2px solid #f0f0f0;
  border-radius: 0px;
  background: white;
  position: relative;
  overflow: hidden;
`
export const ResponsiveRow = styled(Row)`
  @media screen and (max-width: 700px) {
    display: none
  }
`

interface PositionCardProps {
  pair: Pair
  border?: string
  nativePrice: Decimal
}

export default function CustomFarmCard({ pair, border, nativePrice }: PositionCardProps) {

  const [tvlUSD, setTvlUSD] = useState<number>(0)
  const chainId = useChainId()
  const account = useAccount()
  const toggleWalletModal = useToggleWalletModal()
  const { nativeCoin, stableCoin } = getChainInfoOrDefault(chainId)
  const coinX = useCoin(pair.coinX)
  const coinY = useCoin(pair.coinY)
  let lpBalance = Utils.d(useLpBalance(pairKey(pair.coinX, pair.coinY)));
  const poolLpPercentage = pair.lpTotal ? lpBalance.div(Utils.d(pair.lpTotal)) : Utils.d("0");
  const coinXAmount = new CoinAmount(coinX, Utils.d(pair.coinXReserve))
  const coinYAmount = new CoinAmount(coinY, Utils.d(pair.coinYReserve))
  const nativeCoinXPair = usePair(nativeCoin.address, pair.coinX)
  const nativeCoinYPair = usePair(nativeCoin.address, pair.coinY)
  const [showMore, setShowMore] = useState(false)
  const { signAndExecuteTransactionBlock } = useWalletKit();


  const backgroundColor = useColor(coinX)

  const [showInputModal, setShowInputModal] = useState(false);
  const [inputLpBalance, setInputLpBalance] = useState('0');
  const [isStake, setIsStake] = useState(true);

  const openInput = (v: number) => {
    if (!account) {
      toggleWalletModal()
      return;
    }
    if (v) {
      setIsStake(false);
    } else {
      setIsStake(true);
    }
    setShowInputModal(true);
  }

  async function EarnHandler(isStake) {
    try {
      if (isStake) {
        // Stake
        console.log("HHW farming LP:", inputLpBalance);
        const payload = await ConnectionInstance.StakePayload(
          pair,
          SuiUtils.d(inputLpBalance).mul(Utils.pow10(8)),
          account
        );
        const CoinLP = `${ConnectionInstance.getSuiSDK().networkOptions.modules.SwapPackage}::${ConnectionInstance.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pair.coinX},${pair.coinY}>`;
        const REFRESH_TIMEOUT = 1000
        const txId = await SignAndSubmitSuiTransaction(chainId, payload, signAndExecuteTransactionBlock)
        setTimeout(() => {
          ConnectionInstance.getCoinBalance(chainId, account, CoinLP)
          setTimeout(() => {
            ConnectionInstance.getCoinBalance(chainId, account, CoinLP)
          }, REFRESH_TIMEOUT * 2)
        }, REFRESH_TIMEOUT)
      } else {
        // Unstake
        console.log("HHW unstaking LP:", inputLpBalance);
        const payload = await ConnectionInstance.UnstakePayload(
          pair, 
          SuiUtils.d(inputLpBalance).mul(Utils.pow10(8)), 
          account
        );
        const REFRESH_TIMEOUT = 1000
        const CoinLP = `${ConnectionInstance.getSuiSDK().networkOptions.modules.SwapPackage}::${ConnectionInstance.getSuiSDK().networkOptions.modules.SwapModule}::LPCoin<${pair.coinX},${pair.coinY}>`;
        let txId = await SignAndSubmitSuiTransaction(chainId, payload, signAndExecuteTransactionBlock)
        setTimeout(() => {
          ConnectionInstance.getCoinBalance(chainId, account, CoinLP)
          setTimeout(() => {
            ConnectionInstance.getCoinBalance(chainId, account, CoinLP)
          }, REFRESH_TIMEOUT * 2)
        }, REFRESH_TIMEOUT)
      }
    } catch (e) {
      console.error("Farming Error : ", e.toString())
      throw e
    }
  };

  function HandleLpBalance(value) {
      setInputLpBalance(value);
  }

  useEffect(() => {
    let usdAmount = Utils.d(0)
    if (coinX?.address === nativeCoin.address) {
      usdAmount = coinXAmount.amount.mul(nativePrice).mul(2)
    } else if (coinY?.address === nativeCoin.address) {
      usdAmount = coinYAmount.amount.mul(nativePrice).mul(2)
    } else if (nativeCoinXPair[0] === PairState.EXISTS) {
      const pair = nativeCoinXPair[1]
      usdAmount = Utils.d(pair.coinXReserve)
        .div(Utils.d(pair.coinYReserve))
        .mul(coinXAmount.amount)
        .mul(nativePrice)
        .mul(2)
    } else if (nativeCoinYPair[0] === PairState.EXISTS) {
      const pair = nativeCoinYPair[1]
      usdAmount = Utils.d(pair.coinXReserve)
        .div(Utils.d(pair.coinYReserve))
        .mul(coinYAmount.amount)
        .mul(nativePrice)
        .mul(2)
    }
    setTvlUSD(usdAmount.div(Utils.pow10(stableCoin.decimals)).toNumber())
  }, [pair, coinX, coinY, nativePrice])

  return (
    <StyledPositionCard
      border={border}
      bgColor={backgroundColor}
    // maxWidth={'500px'}
    // marginLeft="auto"
    // marginRight="auto"
    >
      <CardNoise />
      <AutoColumn gap="12px">
        <RowBetween>
          <Row style={{ width: "25%" }}>
            <DoubleCoinLogo coinX={coinX} coinY={coinY} size={20} />
            <Text fontWeight={500} fontSize={16} style={{ marginLeft: "5px" }}>
              {`${coinX?.symbol}/${coinY?.symbol}`}
            </Text>
          </Row>
          <ResponsiveRow style={{ width: "10%" }}>
            <Text fontWeight={500} fontSize={16}>
              {formatDollarAmount(tvlUSD)}
            </Text>
          </ResponsiveRow>
          <Row style={{ width: "12%" }}>
            <Text fontWeight={500} fontSize={16}>
              {"25.5%"}
            </Text>
          </Row>
          <ResponsiveRow style={{ width: "13%" }}>
            <Text fontWeight={500} fontSize={16}>
              {"50%"}
            </Text>
          </ResponsiveRow>
          <ResponsiveRow style={{ width: "16%" }}>
            <Text fontWeight={500} fontSize={16}>
              {amountPretty(Utils.d(pair.deposit), 8)}
            </Text>
          </ResponsiveRow>
          <ResponsiveRow style={{ width: "14%" }}>
            <Text fontWeight={500} fontSize={16}>
              {amountPretty(Utils.d(pair.pendingReward), 8)}
            </Text>
          </ResponsiveRow>
          <RowFixed gap="8px" style={{ marginRight: '4px', width: "5%" }}>
            <ButtonEmpty
              color={'#FFF'}
              padding="20px 20px"
              $borderRadius="12px"
              width="100%"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? (
                <ChevronUp size="20" style={{ marginLeft: '8px', height: '24px', minWidth: '60px' }} />
              ) : (
                <ChevronDown size="20" style={{ marginLeft: '8px', height: '24px', minWidth: '60px' }} />
              )}
            </ButtonEmpty>
          </RowFixed>
        </RowBetween>

        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Trans>TVL in farm:</Trans>
              </Text>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  {amountPretty(lpBalance, 8)}
                </Text>
                {tvlUSD > 0 && <ThemedText.DeprecatedMain>~{formatDollarAmount(tvlUSD)}</ThemedText.DeprecatedMain>}
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  <Trans>Pooled {coinX?.symbol}:</Trans>
                </Text>
              </RowFixed>
              {coinXAmount ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    {coinXAmount.pretty()}
                  </Text>
                  <CoinLogo size="20px" style={{ marginLeft: '8px' }} coin={coinX} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  <Trans>Pooled {coinY?.symbol}:</Trans>
                </Text>
              </RowFixed>
              {coinYAmount ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    {coinYAmount.pretty()}
                  </Text>
                  <CoinLogo size="20px" style={{ marginLeft: '8px' }} coin={coinY} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Trans>Your pool share:</Trans>
              </Text>
              <Text fontSize={16} fontWeight={500}>
                <Trans>
                  {poolLpPercentage.mul(100).toFixed(2) === '0.00' ? '<0.01' : poolLpPercentage.mul(100).toFixed(2)} %
                </Trans>
              </Text>
            </FixedHeightRow>

            {/* <ButtonSecondary padding="8px" $borderRadius="8px">
              <ExternalLink
                style={{ width: '100%', textAlign: 'center' }}
                href={`https://v2.info.uniswap.org/account/${account}`}
              >
                <Trans>
                  View accrued fees and analytics<span style={{ fontSize: '11px' }}>↗</span>
                </Trans>
              </ExternalLink>
            </ButtonSecondary> */}

            <RowBetween marginTop="10px">
              <ButtonPrimary
                padding="8px"
                $borderRadius="8px"
                onClick={() => openInput(0)}
                width="30%"
              >
                <Trans>{account ? "Stake" : "Connect Wallet"}</Trans>
              </ButtonPrimary>
              <ButtonYellow
                disabled={pair.deposit == 0}
                padding="8px"
                $borderRadius="8px"
                width="30%"
                onClick={() => openInput(1)}
              >
                <Trans>Unstake</Trans>
              </ButtonYellow>
              <ButtonLight
                disabled={pair.pendingReward == 0}
                padding="8px"
                $borderRadius="8px"
                width="30%"
              >
                <Trans>Harvest</Trans>
              </ButtonLight>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>

      <Modal
        isOpen={showInputModal}
        onDismiss={() => setShowInputModal(false)}
      >
        <Column style={{ width: "100%", padding: '10px 20px' }}>
          <Text fontSize={20} fontWeight={500} style={{ padding: '10px 0px' }}>{isStake ? "Stake " : "Unstake "} LP</Text>
          <Input
            value={inputLpBalance}
            onUserInput={(value) => { HandleLpBalance(value) }}
            style={{ width: "100%", padding: '10px', borderRadius: '15px' }}
          >
          </Input>

          <Row style={{ marginTop: "10px", marginBottom: "15px", justifyContent: "flex-end" }}>
            {/* {isError ? <Text fontSize={14}  style={{ paddingRight: "10px", cursor: 'pointer' }}> } */}
            <Text fontSize={14} style={{ paddingRight: "10px", cursor: 'pointer' }}>{isStake ? "Wallet " : "Farm "} Balance:  &nbsp;
            { isStake ? 
              <span onClick={() => setInputLpBalance(amountPretty((lpBalance), 8))}>
                {amountPretty(lpBalance, 8)}
              </span>
              : 
              <span onClick={() => setInputLpBalance(amountPretty((Utils.d(pair.deposit)), 8))}>
                {amountPretty((Utils.d(pair.deposit)), 8)}
              </span>
             
            }
            </Text>
            <DoubleCoinLogo coinX={coinX} coinY={coinY} size={16} />
            <Text fontWeight={500} fontSize={14} style={{ marginLeft: "3px" }}>
              {`${coinX?.symbol}/${coinY?.symbol}`}
            </Text>
          </Row>

          <RowBetween width="100%" style={{ padding: '10px 0px' }}>
            <ButtonPrimary
              padding="8px"
              $borderRadius="8px"
              onClick={() => EarnHandler(isStake)}
              width="49%"
            >
              <Trans>{isStake ? "Stake " : "Unstake "}</Trans>
            </ButtonPrimary>
            <ButtonLight
              padding="8px"
              $borderRadius="8px"
              width="49%"
              onClick={() => setShowInputModal(false)}
            >
              <Trans>Cancel</Trans>
            </ButtonLight>
          </RowBetween>
        </Column>
      </Modal>
    </StyledPositionCard>
  )
}
