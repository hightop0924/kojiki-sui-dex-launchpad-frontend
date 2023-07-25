import { Pair, pairKey, useNativePrice } from 'hooks/common/Pair'
import { useContext, useEffect, useState } from 'react'
import { useChainId } from 'state/user/hooks'
import { useAccount, useAllLpBalance } from 'state/wallets/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import Row, { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import IcoCoffee from '../../assets/ico-coffee.png'
import CoffeeBackground from '../../assets/coffee-background.png'
import { Text } from 'rebass'

export const PageWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  max-width: 800px;
  min-height: 500px;
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
  overflow: hidden;
`;

export const TitleDiv = styled.div`
  padding: 10px 20px 0px 20px;
`;

export const PageContent = styled.div`
  padding: 10px 20px;
`;

export const PageContentHeader = styled.div`
  background: ${({ theme }) => theme.deprecated_bg1};
  padding: 10px 15px;
  border-radius: 15px;
  width: 100%;
  font-size: 14px;
`;

export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`

export const PageContentBody = styled.div`
  padding: 10px 0px;
`;

export const SummaryInfo = styled.div`
  padding: 20px 80px;
  
  @media screen and (max-width: 700px) {
    padding: 20px 0px;
  }
`
export const SummaryTextHeader = styled(Text)`
  width: 25%;
  text-align: center;
  font-size: 13px;
`

const StyledHr = styled.hr`
  background-color: #edecec;
  height: 1px;
  border: none;
`
export const StyledBackImg = styled.img`
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 250px;
  height: 200px;
  opacity: 0.4;
`

export default function XSake() {
  const theme = useContext(ThemeContext)
  const account = useAccount()
  const chainId = useChainId()
  const nativePrice = useNativePrice()
  const allLpBalances = useAllLpBalance()

  const [pairTasksLoading, setPairTasksLoading] = useState<boolean>(true)
  const [pairs, setPairs] = useState<Pair[]>([])

  return (
    <>
      <PageWrapper>
        <TitleDiv> xSake </TitleDiv>
        <StyledHr/>
        <PageContent>
          <PageContentHeader>
            <Row>
              <StyledImg src={IcoCoffee}></StyledImg>
              <Text fontWeight={300} fontSize={13} style={{marginLeft: "20px"}}>
                Convert your SAKE, redeem your xSake and manage <br/>
                your xSake plugins allocations
              </Text>
            </Row>
          </PageContentHeader>
          <PageContentBody>
            <SummaryInfo>
              <AutoRow>
                <SummaryTextHeader> Total xSake </SummaryTextHeader>
                <SummaryTextHeader> Available xSake </SummaryTextHeader>
                <SummaryTextHeader> Allocated xSake </SummaryTextHeader>
                <SummaryTextHeader> Redeeming xSake </SummaryTextHeader>
              </AutoRow>
              <AutoRow style={{marginTop: "5px"}}>
                <SummaryTextHeader> 0 </SummaryTextHeader>
                <SummaryTextHeader> 0 </SummaryTextHeader>
                <SummaryTextHeader> 0 </SummaryTextHeader>
                <SummaryTextHeader> 0 </SummaryTextHeader>
              </AutoRow>
            </SummaryInfo>
          </PageContentBody>
        </PageContent>
        <StyledBackImg src={CoffeeBackground}/>
      </PageWrapper>
    </>
  )
}
