import { Pair, pairKey, useNativePrice } from 'hooks/common/Pair'
import { useContext, useEffect, useState } from 'react'
import { useChainId } from 'state/user/hooks'
import { useAccount, useAllLpBalance, useProjects } from 'state/wallets/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import Row, { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import IcoCoffee from '../../assets/ico-coffee.png'
import CoffeeBackground from '../../assets/coffee-background.png'
import { Text } from 'rebass'
import ProjectItem, { ProjectItemProps, Status } from './ProjectItem'
import ConnectionInstance, { ProjectData } from 'state/connection/instance'
import { EmptyProposals } from 'pages/Earn'
import { ThemedText } from 'theme'
import { Dots } from 'components/swap/styleds'
import { Trans } from '@lingui/macro'

export const ROUND_SEED = 1;
export const ROUND_PRIVATE = 2;
export const ROUND_PUBLIC = 3;

export const ROUND_STATE_INIT = 1;
export const ROUND_STATE_PREPARE = 2;
export const ROUND_STATE_RASING = 3;
export const ROUND_STATE_REFUNDING = 4;
//complete & start refunding
export const ROUND_STATE_CLAIMING = 6;
//complete & ready to claim token
export const ROUND_STATE_END = 7; //close project

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
  overflow: hidden;
`;

export const BeforePageWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: white;
  padding: 15px 5px;
  border-radius: 20px;
`;
export const TitleDiv = styled.div`
  padding: 10px 20px 0px 20px;
`;

export const PageHead = styled.div`
`;

export const PageSearchBar = styled.input`
  background: #f0f0f0;
  width: 100%;
  height: 20px;
  font-size: 16px;
  padding: 15px;
  border-radius: 10px;
  border: 0px;
`;

export const SearchBarWrapper = styled.div`
  padding: 15px 20px;
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
export const ResponsiveSummary = styled(SummaryTextHeader)`
  @media screen and (max-width: 700px) {
    display: none
  }
`
export const ResponsiveRowBetween = styled(RowBetween)`
  @media screen and (max-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`

export default function Launchpad() {
  const theme = useContext(ThemeContext)
  const account = useAccount()
  const chainId = useChainId()
  const nativePrice = useNativePrice()
  const allLpBalances = useAllLpBalance()
  const projectDatas = useProjects()

  const [pairTasksLoading, setPairTasksLoading] = useState<boolean>(true)
  const [projects, setProjects] = useState<ProjectItemProps[]>([])

  let totalRaised = 0;
  useEffect(() => {
    const fetchProjectTasks = async () => {
      // get project datas
      await ConnectionInstance.GetLaunchpadProjects();
      let projects: ProjectItemProps[] = [];
      Object.keys(projectDatas).forEach(key => {
        // console.log("HHW projects:", key, projectDatas[key]);
        projects.push({
          iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/25051.png",
          projectCoin: projectDatas[key].token_name,
          projectCoinAddress: projectDatas[key].token_addr,
          paymentCoin: projectDatas[key].coin_name,
          isHardcapReached: projectDatas[key].launch_state.fields.coin_raised.fields.balance >= projectDatas[key].launch_state.fields.hard_cap ,
          isWLStage: projectDatas[key].launch_state.fields.round == ROUND_PRIVATE,
          status: projectDatas[key].launch_state.fields.state,
          raisedAmount: projectDatas[key].launch_state.fields.coin_raised.fields.balance
        });
        totalRaised = totalRaised + projectDatas[key].launch_state.fields.coin_raised.fields.balance;
      });
      setProjects(projects);
      setPairTasksLoading(false)
    }
    fetchProjectTasks()
  }, [account])

  return (
    <>
      <BeforePageWrapper>
        <AutoRow>
          <SummaryTextHeader> Total Rasied </SummaryTextHeader>
          <SummaryTextHeader> Sake Price </SummaryTextHeader>
          <SummaryTextHeader> Circulation Market Cap </SummaryTextHeader>
          <SummaryTextHeader> Fully Diluted Market Cap </SummaryTextHeader>
        </AutoRow>
        <AutoRow style={{marginTop: "5px"}}>
          <SummaryTextHeader> $ {totalRaised} </SummaryTextHeader>
          <SummaryTextHeader> $ 3.00 SUI </SummaryTextHeader>
          <SummaryTextHeader> $ 0 </SummaryTextHeader>
          <SummaryTextHeader> $ 0 </SummaryTextHeader>
        </AutoRow>
      </BeforePageWrapper>
      <PageWrapper>
        <PageHead>
          <SearchBarWrapper>
            <PageSearchBar type='text' placeholder='Search...'></PageSearchBar>
          </SearchBarWrapper>
          <ResponsiveRowBetween style={{marginTop: "5px"}}>
            <SummaryTextHeader style={{width: "16.6%"}}> Name </SummaryTextHeader>
            <ResponsiveSummary style={{width: "16.6%"}}> Hardcap </ResponsiveSummary>
            <ResponsiveSummary style={{width: "14%"}}> WL Stage </ResponsiveSummary>
            <SummaryTextHeader style={{width: "14%"}}> Status </SummaryTextHeader>
            <SummaryTextHeader style={{width: "16%"}}> Total raised </SummaryTextHeader>
            <ResponsiveSummary style={{width: "16%"}}> Your allocation </ResponsiveSummary>
          </ResponsiveRowBetween>
          <StyledHr/>
        </PageHead>

        <PageContent>
           {pairTasksLoading ? (
                  <EmptyProposals>
                    <ThemedText.DeprecatedBody color={theme.deprecated_text3} textAlign="center">
                      <Dots>
                        <Trans>Loading</Trans>
                      </Dots>
                    </ThemedText.DeprecatedBody>
                  </EmptyProposals>
                ) :
            projects.map(project => (
              <ProjectItem {...project}/>
            ))
          }
        </PageContent>
        {/*<StyledBackImg src={CoffeeBackground}/>*/}
      </PageWrapper>
    </>
  )
}
