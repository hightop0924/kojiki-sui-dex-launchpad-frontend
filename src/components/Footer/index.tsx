
import { ReactComponent as Discord } from 'assets/discord.svg'
import { ReactComponent as GitHub } from 'assets/github.svg'
import { ReactComponent as Telegram } from 'assets/telegram.svg'
import { ReactComponent as Medium } from 'assets/medium.svg'
import { ReactComponent as Blog } from 'assets/blog.svg'
import styled from 'styled-components/macro'

const FooterItem = styled.a`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  fill: ${({ theme }) => theme.deprecated_bg1};
  :hover {
    fill: ${({ theme }) => theme.deprecated_text3};
  }
  ${/*({ theme }) => theme.mediaWidth.upToMedium`
    fill: ${({ theme }) => theme.deprecated_text3};
    :hover {
      fill: ${({ theme }) => theme.deprecated_text2};
    }
  `*/''};
`

const FooterWrapper = styled.div`
    background-color: #66b1ff;
    padding: 5px 15px;
    border-radius: 25px;
`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterItem target="_blank" href="https://discord.com/invite/kojikidex" rel="noreferrer">
        <Discord width="28px" height="28px"></Discord>
      </FooterItem>
      <FooterItem target="_blank" href="https://t.me/kojikidex" rel="noreferrer">
        <Telegram width="28px" height="28px"></Telegram>
      </FooterItem>
      <FooterItem target="_blank" href="https://github.com/kojikidex" rel="noreferrer">
        <GitHub width="28px" height="28px"></GitHub>
      </FooterItem>
      <FooterItem target="_blank" href="https://medium.com/kojikidex" rel="noreferrer">
        <Medium width="28px" height="28px"></Medium>
      </FooterItem>
      <FooterItem target="_blank" href="https://kojikidex.github.io" rel="noreferrer">
        <Blog width="28px" height="28px"></Blog>
      </FooterItem>
    </FooterWrapper>
  )
}
