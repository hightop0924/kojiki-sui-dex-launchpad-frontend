import { Trans } from '@lingui/macro'
import useScrollPosition from '@react-hook/window-scroll'
import { ReactComponent as Discord } from 'assets/discord.svg'
import { getChainInfoOrDefault } from 'constants/chainInfo'
import { isAptosChain, isSuiChain, SupportedChainId } from 'constants/chains'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { darken, lighten } from 'polished'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Text } from 'rebass'
import { useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { switchChain, useConnection } from 'state/connection/hooks'
import ConnectionInstance from 'state/connection/instance'
import { useChainId } from 'state/user/hooks'
import { AutoConnectAptosWallets, AutoConnectSuiWallets, useAccount, useCoinAmount } from 'state/wallets/hooks'
import styled from 'styled-components/macro'
import { ExternalLink } from 'theme'
import { replaceURLParam } from 'utils'
import { isDevelopmentEnv } from 'utils/env'

import Logo from '../../assets/logo.png'
import { ButtonPrimary } from '../Button'
import Menu from '../Menu'
import Row from '../Row'
import HeaderStatus from './HeaderStatus'
import NetworkSelector, { getChainNameFromId, getParsedChainId } from './NetworkSelector'
import { CHAIN_INFO } from "../../constants/chainInfo";
const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.deprecated_bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.deprecated_bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  ${({ theme }) => theme.mediaWidth.upToLarge`
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 36px 1fr;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.25em;
  }

  /* addresses safaris lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 4px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const HeaderLinks = styled(Row)`
  justify-self: center;
  background-color: transparent;${({ theme }) => theme.deprecated_bg0};
  width: fit-content;
  padding: 2px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 20px; 
    grid-gap: 5px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.deprecated_bg0};
    opacity: 0.8;
    border: 1px solid ${({ theme }) => theme.deprecated_bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
  
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 95%;
  `};
  
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.deprecated_bg0 : theme.deprecated_bg0)};
  border-radius: 16px;
  white-space: nowrap;
  width: 100%;
  height: 40px;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const AnimeIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }

  position: relative;
`

// can't be customized under react-router-dom v6
// so we have to persist to the default one, i.e., .active
const activeClassName = 'active'

const StyledNavLink = styled(NavLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.deprecated_text2};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    border-radius: 14px;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => lighten(0.1, theme.deprecated_primary1)};
    background-color: ${({ theme }) => theme.deprecated_bg1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => lighten(0.1, theme.deprecated_primary1)};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 8px 6px;
  `};
`

const StyledExternalLink = styled(ExternalLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.deprecated_text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.deprecated_text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.deprecated_text1)};
    text-decoration: none;
  }
`

const ANIbutton = styled(ButtonPrimary)`
  background-color: ${({ theme }) => theme.deprecated_bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
  border: none;
`

export default function Header() {
  const account = useAccount()
  const chainId = useChainId()
  const connection = useConnection()
  const navigate = useNavigate()
  const { nativeCoin, stableCoin, aniCoin } = getChainInfoOrDefault(chainId)
  const nativeCoinAmount = useCoinAmount(nativeCoin.address)
  const { search } = useLocation()

  const [defaultPoolLink, setDefaultPoolLink] = useState("/pool");

  // wallet
  useEffect(() => {
    if (isAptosChain(chainId)) {
      AutoConnectAptosWallets()
    } else if (isSuiChain(chainId)) {
      // AutoConnectSuiWallets()
    }
    // console.log("useEffect =", '/add/' + CHAIN_INFO[chainId].nativeCoin.address + "/" + CHAIN_INFO[chainId].stableCoin.address);
    setDefaultPoolLink('/add/' + CHAIN_INFO[chainId].nativeCoin.address + "/" + CHAIN_INFO[chainId].stableCoin.address);
  }, [chainId])

  useEffect(() => {
    if (isAptosChain(chainId)) {
      ConnectionInstance.getPair(chainId, nativeCoin.address, stableCoin.address)
      ConnectionInstance.getPair(chainId, nativeCoin.address, aniCoin.address)
      if (account) {
        ConnectionInstance.syncAccountResources(account, chainId, false)
      }
    } else if (isSuiChain(chainId)) {
      if (account) {
        ConnectionInstance.syncAccountResources(account, chainId, false)
      }
    }
  }, [account, chainId])

  const scrollY = useScrollPosition()
  const { pathname } = useLocation()

  // work around https://github.com/remix-run/react-router/issues/8161
  // as we can't pass function `({isActive}) => ''` to className with styled-components
  const isPoolActive =
    pathname.startsWith('/pool') ||
    pathname.startsWith('/add') ||
    pathname.startsWith('/remove') ||
    pathname.startsWith('/increase') ||
    pathname.startsWith('/find')

  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  // const openBindModal = useToggleModal(ApplicationModal.BIND_DISCORD)
  const openAirdropClaimModal = useToggleModal(ApplicationModal.ANI_AIRDROP_CLAIM)

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <Title href=".">
        <AnimeIcon>
          <img
            src={Logo}
            alt="ANI"
            style={{ width: '60px', height: '100%', marginLeft: '50px' }}
          />
        </AnimeIcon>
      </Title>
      <HeaderLinks>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          <Trans>Swap</Trans>
        </StyledNavLink>
        <StyledNavLink
          data-cy="pool-nav-link"
          id={`pool-nav-link`}
          to={defaultPoolLink}
          className={isPoolActive ? activeClassName : undefined}
        >
          <Trans>Liquidity</Trans>
        </StyledNavLink>
        <StyledNavLink
          data-cy="earn-nav-link"
          id={`earn-nav-link`}
          to={'/earn'}
        >
          <Trans>Earn</Trans>
        </StyledNavLink>
        <StyledNavLink
          data-cy="xsake-nav-link"
          id={`xsake-nav-link`}
          to={'/xsake'}
        >
          <Trans>xSake</Trans>
        </StyledNavLink>
        <StyledNavLink
          data-cy="launchpad-nav-link"
          id={`launchpad-nav-link`}
          to={'/launchpad'}
        >
          <Trans>Launchpad</Trans>
        </StyledNavLink>
        {/* {chainId === SupportedChainId.APTOS && (
          <StyledExternalLink id={`bridge-nav-link`} href={'https://cbridge.celer.network'}>
            <Trans>Bridge</Trans>
            <sup>↗</sup>
          </StyledExternalLink>
        )} */}
        {/*<StyledNavLink id={`explore-nav-link`} to={'/charts'}>
          <Trans>Charts</Trans>
      </StyledNavLink>*/}
      </HeaderLinks>

      <HeaderControls>
        <HeaderElement>
          {[SupportedChainId.APTOS_TESTNET, SupportedChainId.APTOS_DEVNET].includes(chainId) && (
            <ANIbutton
              style={{display: 'none'}}
              onClick={() => {
                openClaimModal()
              }}
              padding="8px 12px"
              width="100%"
              $borderRadius="12px"
            >
              <Trans>Faucet</Trans>
            </ANIbutton>
          )}
          {chainId !== SupportedChainId.SUI && (
            <ANIbutton
              style={{display: 'none'}}
              onClick={() => {
                switchChain(connection, SupportedChainId.SUI)
                navigate(
                  { search: replaceURLParam(search, 'chain', getChainNameFromId(SupportedChainId.SUI)) },
                  { replace: true }
                )
              }}
              padding="8px 12px"
              width="100%"
              $borderRadius="12px"
            >
              <Trans>{'>Sui'}</Trans>
            </ANIbutton>
          )}
          {/* {[SupportedChainId.APTOS].includes(chainId) && (
            <ANIbutton
              onClick={() => {
                openBindModal()
              }}
              padding="4px 8px"
              width="100%"
              $borderRadius="12px"
            >
              Bind
              <Discord width="28px" height="28px" fill="#EEE" style={{ paddingLeft: '4px' }}></Discord>
            </ANIbutton>
          )} */}
          {/* {[SupportedChainId.APTOS_DEVNET, SupportedChainId.APTOS_TESTNET, SupportedChainId.APTOS].includes(
            chainId
          ) && (
            <ANIbutton
              onClick={() => {
                openAirdropClaimModal()
              }}
              padding="8px 12px"
              width="100%"
              $borderRadius="12px"
            >
              Claim
            </ANIbutton>
          )} */}
        </HeaderElement>
        <HeaderElement>
          <NetworkSelector />
        </HeaderElement>
        <HeaderElement>
          <AccountElement active={!!account}>
            {account && nativeCoinAmount ? (
              <BalanceText style={{ flexShrink: 0, userSelect: 'none' }} pl="0.75rem" pr=".4rem" fontWeight={500}>
                {nativeCoinAmount.pretty(4)} {nativeCoin.symbol}
              </BalanceText>
            ) : null}
            <HeaderStatus/>
          </AccountElement>
        </HeaderElement>
        <HeaderElement>
          {/*<Menu />*/}
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
