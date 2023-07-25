import { Pair, pairKey, useNativePrice } from 'hooks/common/Pair'
import { useContext, useEffect, useState } from 'react'
import { useChainId } from 'state/user/hooks'
import { useAccount, useAllLpBalance } from 'state/wallets/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import Row, { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import CheckMarkImg from '../../assets/icons8-checkmark.svg'
import CloseMarkImg from '../../assets/icons8-close.svg'
import { Text } from 'rebass'
import Column from 'components/Column'
import { formatAmount } from 'utils/formatDollarAmt'
import { useNavigate } from 'react-router-dom'

export const CoinLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  padding: 2px;
`

export const IconImg = styled.img`
  width: 20px;
  height: 20px;
`

export const SummaryTextHeader = styled(Text)`
  text-align: center;
  font-size: 13px;
`

export const Wrapper = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  
  @media screen and (max-width: 700px) {
    width: 0px !important;
  }
`

export const ProgressBarBack = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
`
export const ProgressBarMain = styled.div<{ width: number }>`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #cedff1;
  width: ${({ width }) => width + '%'};
  height: 100%;
`
const RedSpan = styled.span` color: red `;
const BlueSpan = styled.span` color: green `;

export default function ProgressBar({
  percent = 0
}: { percent?: number }) {

  return (
    <>
      <Wrapper>
        <ProgressBarBack/>
        <ProgressBarMain width = {percent}/>
      </Wrapper>
    </>
  )
}
