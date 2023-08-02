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

export enum Status {
  STARTED = 1,
  ENDED = 7
};

export interface ProjectItemProps {
  iconUrl: string;
  projectCoin: string;
  projectCoinAddress: string;
  paymentCoin: string;
  isHardcapReached?: boolean;
  isWLStage?: boolean;
  status?: Status;
  raisedAmount?: number;
}

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

export const ItemWrapper = styled(Row)`
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 10px;
  justify-content: space-between;
  :hover {
    background: #f0f0f0
  }
`
export const ResponsiveRow = styled(Row)`
  @media screen and (max-width: 700px) {
    display: none
  }
`
const RedSpan = styled.span` color: red `;
const BlueSpan = styled.span` color: green `;
export default function ProjectItem({
  iconUrl,
  projectCoin,
  projectCoinAddress,
  paymentCoin,
  isHardcapReached = false,
  isWLStage = false,
  status = Status.STARTED,
  raisedAmount = 0
}: ProjectItemProps) {

  const theme = useContext(ThemeContext)
  const navigate = useNavigate()
  const account = useAccount()
  const chainId = useChainId()
  const nativePrice = useNativePrice()
  const allLpBalances = useAllLpBalance()

  const [pairTasksLoading, setPairTasksLoading] = useState<boolean>(true)
  const [pairs, setPairs] = useState<Pair[]>([])

  const onClickProjectItem = () => {
    navigate('/launchpad/' + projectCoin);
  }

  return (
    <>
      <ItemWrapper onClick={onClickProjectItem}>
        <Row style={{ width: "16.6%" }}>
          <CoinLogo src={iconUrl} />
          <Column>
            <Text fontWeight={500} fontSize={16} style={{ marginLeft: "5px" }}>
              {projectCoin}
            </Text>
            <Text fontWeight={300} fontSize={13} style={{ marginLeft: "5px" }}>
              Raising {paymentCoin}
            </Text>
          </Column>
        </Row>
        <ResponsiveRow style={{ width: "16.6%", justifyContent: "center" }}>
          <Text fontWeight={400} fontSize={14}>
            {isHardcapReached ? <IconImg src={CheckMarkImg}/> : <IconImg src={CloseMarkImg}/>}
          </Text>
        </ResponsiveRow>
        <ResponsiveRow style={{ width: "16.6%", justifyContent: "center" }}>
          <Text fontWeight={400} fontSize={14}>
            {isWLStage ? <IconImg src={CheckMarkImg}/> : <IconImg src={CloseMarkImg}/>}
          </Text>
        </ResponsiveRow>
        <Row style={{ width: "16.6%", justifyContent: "center" }}>
          <Text fontWeight={400} fontSize={14}>
            {status == Status.ENDED ? <RedSpan>ENDED</RedSpan> : (status >= Status.STARTED ? <BlueSpan>STARTED</BlueSpan> : <BlueSpan>UNKNOWN</BlueSpan>)}
          </Text>
        </Row>
        <Row style={{ width: "16.6%", justifyContent: "center" }}>
          <Text fontWeight={400} fontSize={14}>
            {raisedAmount} {paymentCoin}
          </Text>
        </Row>
        <ResponsiveRow style={{ width: "16.6%", justifyContent: "center" }}>
          <Text fontWeight={400} fontSize={14}>
            {0}
          </Text>
        </ResponsiveRow>
      </ItemWrapper>
    </>
  )
}
