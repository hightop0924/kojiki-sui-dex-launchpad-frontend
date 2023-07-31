import { Decimal, Utils } from '@animeswap.org/v1-sdk'
import { StakedLPInfo, UserInfoReturn } from '@animeswap.org/v1-sdk/dist/tsc/modules/MasterChefModule'
import { Trans } from '@lingui/macro'
import FarmCard, { FarmCardProps, FarmCardType } from 'components/PositionCard/farmCard'
import CustomFarmCard from 'components/PositionCard/customFarmCard'
import { CHAIN_INFO, getChainInfoOrDefault } from 'constants/chainInfo'
import { isAptosChain, isSuiChain, SupportedChainId } from 'constants/chains'
import { REFRESH_TIMEOUT } from 'constants/misc'
import { useCoin } from 'hooks/common/Coin'
import { Pair, pairKey, useNativePrice } from 'hooks/common/Pair'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import ConnectionInstance from 'state/connection/instance'
import { useChainId } from 'state/user/hooks'
import { SignAndSubmitTransaction, useAccount, useAllLpBalance } from 'state/wallets/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import { isDevelopmentEnv } from 'utils/env'

import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import Card from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import { CardBGImage, CardNoise, CardSection, DataCard } from '../../components/earn/styled'
import { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import { Dots } from '../../components/swap/styleds'
import { ExternalLink, HideSmall, ThemedText } from '../../theme'

import AddLiquidity from '../AddLiquidity';

export const PageWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  max-width: 800px;
  min-height: 400px;
  width: 100%;
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  background: ${({ theme }) => theme.deprecated_bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

export const TitleDiv = styled.div`
  padding: 10px 20px 0px 20px;
`;

export const PageContent = styled.div`
  padding: 10px;
`;

export const PageContentHeader = styled.div`
  background: ${({ theme }) => theme.deprecated_bg1};
  padding: 5px 30px;
  border-radius: 35px;
  width: 100%;
  font-size: 14px;
`;

export const PageContentBody = styled.div`
  padding: 10px 0px;
`;

export const ResponsiveSpan = styled.span`
  @media screen and (max-width: 700px) {
    display: none
  }
`

const StyledHr = styled.hr`
  background-color: #edecec;
  height: 1px;
  border: none;
`

export const EmptyProposals = styled.div`
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Farming() {
  const theme = useContext(ThemeContext)
  const account = useAccount()
  const chainId = useChainId()
  const nativePrice = useNativePrice()
  const allLpBalances = useAllLpBalance()

  const [pairTasksLoading, setPairTasksLoading] = useState<boolean>(true)
  const [pairs, setPairs] = useState<Pair[]>([])

  const pairKeyNotZero: string[] = []
  for (const pairKey in allLpBalances) {
    if (allLpBalances[pairKey] !== '0') {
      pairKeyNotZero.push(pairKey)
    }
  }

  // your LP
  useEffect(() => {
    const fetchPairTasks = async () => {
      const pairTasksPromise: Promise<Pair>[] = []
      for (const pairKey of pairKeyNotZero) {
        const [coinX, coinY] = pairKey.split(', ')
        if (!coinX || !coinY) continue
        pairTasksPromise.push(ConnectionInstance.getPair(chainId, coinX, coinY))
      }
      let allPairs = await ConnectionInstance.getSuiAllPair();
      const pairResults = await Promise.all(pairTasksPromise)
      
      let results = Object.values(allPairs).map((v) => ({
        ...v,
        lpTotal: pairResults.find(p => p !== undefined && p.coinX == v.coinX && p.coinY == v.coinY)?.lpTotal ?? 0,
      }));
      // console.log("HHW pool pairs =", results);
      for (let i = 0; i < results.length; i++ ){
        results[i].deposit = await ConnectionInstance.GetAccountDeposit(results[i] as Pair, account);
        results[i].pendingReward = await ConnectionInstance.GetAccountPendingReward(results[i] as Pair, account);
      };
      setPairTasksLoading(false)
      setPairs(results as any)
    }
    fetchPairTasks()
  }, [account, allLpBalances])
  const [count, setCount] = useState(0)

  // Farm data interval
  useEffect(() => {
    if (!isAptosChain(chainId)) return
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <PageWrapper>
        <TitleDiv> Yield Farming </TitleDiv>
        <StyledHr/>
        <PageContent>
          <PageContentHeader>
            <RowBetween>
              <span style={{width: '26%'}}> Name </span>
              <ResponsiveSpan style={{width: '11%'}}> TVL </ResponsiveSpan>
              <span style={{width: '12%'}}> APR </span>
              <ResponsiveSpan style={{width: '13%'}}> Allocation </ResponsiveSpan>
              <ResponsiveSpan style={{width: '18%'}}> Total Deposit </ResponsiveSpan>
              <ResponsiveSpan style={{width: '19%'}}> Pending Rewards </ResponsiveSpan>
              <span style={{width: '1%'}}> </span>
            </RowBetween>
          </PageContentHeader>
          <PageContentBody>
            <AutoColumn gap="lg" justify="center">
              <AutoColumn gap="md" style={{ width: '100%', paddingBottom: '20px' }}>
                {pairTasksLoading ? (
                  <EmptyProposals>
                    <ThemedText.DeprecatedBody color={theme.deprecated_text3} textAlign="center">
                      <Dots>
                        <Trans>Loading</Trans>
                      </Dots>
                    </ThemedText.DeprecatedBody>
                  </EmptyProposals>
                ) : pairs.length > 0 ? (
                  <>
                    {/* <ButtonSecondary>
                      <RowBetween>
                        <Trans>
                          <ExternalLink href={'https://v2.info.uniswap.org/account/' + account}>
                            Account analytics and accrued fees
                          </ExternalLink>
                          <span> ↗ </span>
                        </Trans>
                      </RowBetween>
                    </ButtonSecondary> */}
                    {pairs.map(
                      (pair) =>
                        pair && (
                          <CustomFarmCard key={pairKey(pair.coinX, pair.coinY)} pair={pair} nativePrice={nativePrice} />
                        )
                    )}
                  </>
                ) : (
                  <EmptyProposals>
                    <ThemedText.DeprecatedBody color={theme.deprecated_text3} textAlign="center">
                      <Trans>No Farm found.</Trans>
                    </ThemedText.DeprecatedBody>
                  </EmptyProposals>
                )}
              </AutoColumn>
            </AutoColumn>
          </PageContentBody>
        </PageContent>
      </PageWrapper>
    </>
  )
}
