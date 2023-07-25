import { Decimal } from '@animeswap.org/v1-sdk'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ThemedText } from '../../theme'
import { RowBetween, RowFixed } from '../Row'
import SettingsTab from '../Settings'

const StyledSwapHeader = styled.div`
  padding: 1.4rem 1.25rem 1rem 1.25rem;
  width: 100%;
  color: ${({ theme }) => theme.deprecated_text2};
`
const StyledHr = styled.hr`
  background-color: #edecec;
  height: 1px;
  border: none;
`

export default function SwapHeader({ allowedSlippage }: { allowedSlippage: number }) {
  return (
    <>
    <StyledSwapHeader>
      <RowBetween>
        <RowFixed>
          <ThemedText.DeprecatedBlack fontWeight={500} fontSize={16} style={{ marginRight: '8px' }}>
            <Trans>Swap Tokens</Trans>
          </ThemedText.DeprecatedBlack>
        </RowFixed>
        <RowFixed>
          <SettingsTab placeholderSlippage={allowedSlippage} />
        </RowFixed>
      </RowBetween>
    </StyledSwapHeader>
    <StyledHr/>
    </>
  )
}
