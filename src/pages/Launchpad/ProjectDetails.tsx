import { Pair, pairKey, useNativePrice } from 'hooks/common/Pair'
import { useContext, useEffect, useState } from 'react'
import { useChainId } from 'state/user/hooks'
import { useAccount, useAllLpBalance } from 'state/wallets/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import Row, { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import IcoCoffee from '../../assets/ico-coffee.png'
import CoffeeBackground from '../../assets/coffee-background.png'
import { Text } from 'rebass'
import { useParams } from 'react-router-dom'
import { Status } from './ProjectItem'
import Column, { AutoColumn } from 'components/Column'
import ProgressBar from './ProgressBar'
import { ButtonError, ButtonLight } from 'components/Button'
import { Trans } from '@lingui/macro'
import { useToggleWalletModal } from 'state/application/hooks'
import { CustomAutoRow } from '../../components/Row'

export const PageWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  max-width: 80%;
  width: 100%;
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  margin-top: -30px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none
  };
  scrollbar-width: none;
  padding-bottom: 100px;
  @media screen and (max-width: 700px) {
    max-width: 95%;
    margin-top: 0px;
  }

`;

export const Card = styled.div`
  background: white;
  border-radius: 24px;
  margin-bottom: 10px;
  
  @media screen and (max-width: 700px) {
    width: auto !important
  }
`;
export const CardHeader = styled.div`
`;
export const CardHeaderContent = styled.div`
  padding: 20px 0px 0px 20px;
`;
export const CardBody = styled.div`
  padding: 5px 20px;
`;

export const TitleDiv = styled.div`
  padding: 10px 20px 0px 20px;
`;

export const WhitelistHeader = styled.div`
  padding: 20px 20px 0px 30px;
`;

export const WhitelistHeaderItem = styled.div`
  font-ize: 13px;
  text-align: center;
`;
export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`
export const ProjectLogoImg = styled.img`
  max-width: 100%;
  max-height: 200px;
  padding: 15px;
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
export const SummaryTextHeader = styled(Text)`
  width: 25%;
  text-align: center;
  font-size: 13px;
`

export default function ProjectDetails() {
  const { coinAddr } = useParams<{ coinAddr: string}>()
  const projectData = {
    '0x333': {
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/25051.png",
      desc: "SuiPepe aims to be the first meme token on sui network. SuiPepe is a multichain token that enables owners to instantly transfer their $SuiPepe between the sui network and the Ethereum network (1:1 basis). A strong team of crypto specialists established this community-driven cryptocurrency project with the goal of introducing new, ground-breaking concepts that are sustainable over the long run. We also put a lot of effort into creating a robust group of long-term investors.",
      logoUrl: "https://v2.cimg.co/news/110742/268053/pepe-coin-price-predictio.jpg",
      projectCoin: "SuiPepe",
      paymentCoin: "SUI",
      isHardcapReached: true,
      isWLStage: true,
      status: Status.ENDED,
      raisedAmount: 1000000
    },
    '0x444': {
      iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/25398.png",
      desc: "SuiShiba is a Gem token project on the Sui network. The project aims to offer users a unique investment opportunity with its innovative and exciting tokenomics.SuiShiba’s focus is on creating a sustainable and decentralized ecosystem that allows for a secure and reliable way to transact on the blockchain. With the growing popularity of Gem token projects, SuiShiba’s innovative tokenomics and commitment to decentralization set it apart from the rest.\
      The team behind SuiShiba is dedicated to ensuring the project’s success and creating a vibrant community of token holders.\
      As the Sui network continues to grow, SuiShiba will be at the forefront of the ecosystem, providing users with a unique and exciting way to participate in the blockchain revolution.",
      logoUrl: "https://suishiba.com/wp-content/uploads/2023/05/shibasa.png",
      projectCoin: "SuiShiba",
      paymentCoin: "SUI",
      isHardcapReached: false,
      isWLStage: false,
      status: Status.STARTED,
      raisedAmount: 0
    }
  };

  const projectInfo = projectData[coinAddr];

  const theme = useContext(ThemeContext)
  const account = useAccount()
  const chainId = useChainId()
  const nativePrice = useNativePrice()
  const allLpBalances = useAllLpBalance()
  const toggleWalletModal = useToggleWalletModal()

  const [pairTasksLoading, setPairTasksLoading] = useState<boolean>(true)
  const [pairs, setPairs] = useState<Pair[]>([])

  return (
    <>
      <PageWrapper>
        <Column>
          <Card>
            <CardHeader>
              <TitleDiv> {projectInfo.projectCoin} Auction</TitleDiv>
              <StyledHr/>
            </CardHeader>
            <CardBody>
              <Column style={{alignItems: 'center'}}>
                <Text>{projectInfo.desc}</Text>
                <ProjectLogoImg src={projectInfo.logoUrl}/>
              </Column>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <WhitelistHeader>
                <Row>
                  <WhitelistHeaderItem style={{ width: '5%' }}><ProgressBar percent={100}/></WhitelistHeaderItem>

                  <WhitelistHeaderItem style={{ width: '15%' }}>Whitelist Stage</WhitelistHeaderItem>
                  <WhitelistHeaderItem style={{ width: '13%' }}><ProgressBar percent={100}/></WhitelistHeaderItem>

                  <WhitelistHeaderItem style={{ width: '13%' }}>Public Stage</WhitelistHeaderItem>
                  <WhitelistHeaderItem style={{ width: '17%' }}><ProgressBar percent={100}/></WhitelistHeaderItem>

                  <WhitelistHeaderItem style={{ width: '5%', color: 'green', fontWeight: "800" }}>End</WhitelistHeaderItem>
                  <WhitelistHeaderItem style={{ width: '15%' }}><ProgressBar percent={70}/></WhitelistHeaderItem>

                  <WhitelistHeaderItem style={{ width: '7%' }}>Claims</WhitelistHeaderItem>
                  <WhitelistHeaderItem style={{ width: '10%' }}><ProgressBar percent={0}/></WhitelistHeaderItem>
                </Row>
              </WhitelistHeader>
              <StyledHr/>
            </CardHeader>
            <CardBody>
              <Row style={{alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
                <Text>Public sale has ended - Contributions are now claimable</Text>
              </Row>
            </CardBody>
          </Card>
          <CustomAutoRow justify={'space-between'}>
            <Card style={{ width: '40%' }}>
              <CardBody>
                <div style={{ minHeight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!account ? (
                  <ButtonLight onClick={toggleWalletModal} style={{ height: '20px', width: '200px' }}>
                    <Text fontSize={14} fontWeight={500}>
                      <Trans>Connect Wallet</Trans>
                    </Text>
                  </ButtonLight>
                ) : (
                  <ButtonError style={{ height: '20px', width: '200px' }}>
                    <Text fontSize={14} fontWeight={500}>
                      {<Trans>Claim</Trans>}
                    </Text>
                  </ButtonError>
                )}
              </div>
              </CardBody>
            </Card>
            <Card style={{ width: '58%' }}>
              <CardBody style={{ minHeight: '90px', paddingTop: '25px' }}>
                <AutoRow>
                  <SummaryTextHeader> Total Rasied / Hardcap </SummaryTextHeader>
                  <SummaryTextHeader> ${projectInfo.projectCoin} Price </SummaryTextHeader>
                  <SummaryTextHeader> Circ. Market Cap </SummaryTextHeader>
                  <SummaryTextHeader> FDV </SummaryTextHeader>
                </AutoRow>
                <AutoRow style={{marginTop: "5px"}}>
                  <SummaryTextHeader> $ 1M </SummaryTextHeader>
                  <SummaryTextHeader> $ 3.00 SUI </SummaryTextHeader>
                  <SummaryTextHeader> $ 6,707,980 </SummaryTextHeader>
                  <SummaryTextHeader> $ 25,000,000 </SummaryTextHeader>
                </AutoRow>
              </CardBody>
            </Card>
          </CustomAutoRow>
          <CustomAutoRow justify={'space-between'} align={'top'}>
            <Card style={{width: '32%'}}>
              <CardHeader>
                <CardHeaderContent>
                  <Text>How price is determined</Text>
                </CardHeaderContent>
                <StyledHr/>
              </CardHeader>
              <CardBody style={{minHeight: '300px'}}>
                <p>
                  You can contribute with USDC in exchange for WINR and vWINR tokens, which are to be claimed 24h after the end of the sale.
                </p>
                <p>
                  The tokens you will receive will have the exact same $ value than your contribution.
                </p>
                <p>
                  50,000,000 WINR and 50,000,000 vWINR (out of a 1,000,000,000 total supply) will be allocated to the sale.
                </p>
                <p>
                    The final price will therefore be:
                </p>
                <p style={{background: '#f0f0f0', textAlign: 'center', padding: '3px', borderRadius: '5px'}}>
                  Total $ raised / 100,000,000
                </p>
              </CardBody>
            </Card>
            <Card style={{width: '32%'}}>
              <CardHeader>
                <CardHeaderContent>
                  <Text>Two-stages sale</Text>
                </CardHeaderContent>
                <StyledHr/>
              </CardHeader>
              <CardBody style={{minHeight: '300px'}}>
                <p>This sale will take place in two different stages.</p>
                <p>STAGE 1: During the first 48h, only whitelisted addresses can participate.</p>
                <p>STAGE 2: Starting Mar 11 @ 5pm UTC, other participants can purchase the remaining tokens on a first-come, first-served basis. This stage will last for 24 hours.</p>
              </CardBody>
            </Card>
            <Card style={{width: '32%'}}>
              <CardHeader>
                <CardHeaderContent>
                  <Text>Claiming process</Text>
                </CardHeaderContent>
                <StyledHr/>
              </CardHeader>
              <CardBody style={{minHeight: '300px'}}>
                <p>The public sale will last until Mar 12th @ 5pm UTC.</p>
                <p>Starting Mar 16th @ 3pm UTC, the purchased tokens will be entirely and directly claimable from this same page, at the exact same time as trading starts.</p>
                <p>In order to align the long-term objectives of the protocol, half of the sale will be distributed in vWINR, with the other half in WINR.</p>
              </CardBody>
            </Card>
          </CustomAutoRow>
        </Column>
      </PageWrapper>
    </>
  )
}
