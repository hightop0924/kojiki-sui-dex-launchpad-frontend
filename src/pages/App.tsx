import Footer from 'components/Footer'
import Loader from 'components/Loader'
import TopLevelModals from 'components/TopLevelModals'
import { useFeatureFlagsIsLoaded } from 'featureFlags'
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useAnalyticsReporter } from '../components/analytics'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Popups from '../components/Popups'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import { RedirectDuplicateTokenIds } from './AddLiquidity/redirects'
import Chart from './Chart'
import Pool from './Pool'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import Farming from './Earn'
import XSake from './Xsake'
import Launchpad from './Launchpad'
import LaunchpadDetails from './Launchpad/ProjectDetails'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100vh;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4rem 8px 16px 8px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const FooterWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  right: 0px;
  justify-content: right;
  position: fixed;
  bottom: 30px;
  padding: 0px 0px 0px 0px;
  margin-right: 50px;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    left: 50%;
    transform: translate(-50%, 0);
    justify-content: center;
    padding: 60px 0px 80px 0px;
    position: relative;
  `};
`

const BottomRightLogo = styled.div`
  background: url('images/left_char.png');
  width: 220px;
  height: 220px;
  position: fixed;
  right: 0px;
  bottom: 0px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  ${({ theme }) => theme.mediaWidth.upToMedium`
    scale: 0.8;
    right: -22px;
    bottom: -22px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    scale: 0.5;
    right: -56px;
    bottom: -54px;
  `};
`

const BottomLeftLogo = styled.div`
  background: url('images/left_char.png');
  width: 220px;
  height: 220px;
  position: fixed;
  left: 0px;
  bottom: 0px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    scale: 0.8;
    left: -22px;
    bottom: -22px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    scale: 0.5;
    left: -56px;
    bottom: -54px;
  `};
`

export default function App() {
  const isLoaded = useFeatureFlagsIsLoaded()
  const { pathname } = useLocation()

  useAnalyticsReporter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ErrorBoundary>
      <DarkModeQueryParamReader />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <TopLevelModals />
          <Suspense fallback={<Loader />}>
            {isLoaded ? (
              <Routes>
                <Route path="swap/:toCoin" element={<RedirectToSwap />} />
                <Route path="swap" element={<Swap />} />
                <Route path="pool" element={<Pool />} />
                <Route path="add" element={<Pool />}>
                  <Route path=":coinIdA" element={<Pool />} />
                  <Route path=":coinIdA/:coinIdB" element={<Pool />} />
                </Route>
                <Route path="earn" element={<Farming />}/>
                <Route path="xsake" element={<XSake />}/>
                <Route path="launchpad" element={<Launchpad />}/>
                <Route path="launchpad/:coinAddr" element={<LaunchpadDetails />}/>
                <Route path="remove/:coinIdA/:coinIdB" element={<RemoveLiquidity />} />
                <Route path="charts" element={<Chart />} />
                <Route path="*" element={<RedirectPathToSwapOnly />} />
              </Routes>
            ) : (
              <Loader />
            )}
          </Suspense>
        </BodyWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
        {/* <BottomRightLogo /> */}
        {/*<BottomLeftLogo />*/}
      </AppWrapper>
    </ErrorBoundary>
  )
}
