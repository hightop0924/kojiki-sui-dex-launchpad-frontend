import { Trans } from '@lingui/macro'
import { ButtonPrimary } from "components/Button";
import CoinInputPanel from "components/CoinInputPanel";
import Column from "components/Column";
import Input from "components/NumericalInput";
import Row, { RowBetween } from "components/Row";
import { FC, Fragment, useState } from "react";
import { Text } from "rebass";
import { useToggleWalletModal } from 'state/application/hooks';
import ConnectionInstance from 'state/connection/instance';
import { useAccount } from "state/wallets/hooks";
import { amountPretty, CoinAmount, useCoin } from 'hooks/common/Coin'
import { Utils as SuiUtils } from '@animeswap.org/sui-v1-sdk'
import { SignAndSubmitSuiTransaction } from 'state/wallets/hooks'
import { useChainId } from 'state/user/hooks';
import { useWalletKit } from '@mysten/wallet-kit'

type RedeemProps = {
  xsakes: number;
};

const TabRedeem: FC<RedeemProps> = ({
  xsakes = 0
}) => {
  const account = useAccount();
  const toggleWalletModal = useToggleWalletModal()
  const chainId = useChainId()

  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [inputValue, setInputValue] = useState('');
  const [{ error, message }, setInputError] = useState<{
    error: boolean,
    message: string | undefined
  }>({
    error: false,
    message: ''
  });

  function HandleInputValue(value) {
    setInputError({ error: false, message: '' });
    setInputValue(value);
  }

  const openInput = async () => {
    if (!account) {
      toggleWalletModal()
      return;
    }

    if ((inputValue == '') || (parseFloat(inputValue) == 0)) {
      setInputError({ error: true, message: 'Invalid value!' });
      return;
    }

    if (parseFloat(inputValue) > xsakes) {
      setInputError({ error: true, message: 'Too much xSAKE requested!' });
      return;
    }
    let payload = await ConnectionInstance.Convert2SakePayload(SuiUtils.d(inputValue).mul(SuiUtils.pow10(9)), account);
    console.log("HHW redeem payload:", payload);
    let _txId = await SignAndSubmitSuiTransaction(chainId, payload, signAndExecuteTransactionBlock)
  }

  return (
    <Fragment>
      <h3>Redeem xGRAIL</h3>
      <p>
        Redeem your xGRAIL back into GRAIL over a vesting period of 15 days (1 0.5 ratio) to 6 months (1 1 ratio).
      </p>
      <Column style={{ width: "100%", padding: '10px 20px' }}>
        <Input
          value={inputValue}
          onUserInput={(value) => { HandleInputValue(value) }}
          style={{ width: "100%", padding: '10px', borderRadius: '15px' }}
        >
        </Input>

        <Row style={{ marginTop: "10px", marginBottom: "15px", justifyContent: "flex-end" }}>
          {/* {isError ? <Text fontSize={14}  style={{ paddingRight: "10px", cursor: 'pointer' }}> } */}
          <Text fontSize={14} style={{ paddingRight: "10px", cursor: 'pointer' }}> Balance:  &nbsp;
            <span onClick={() => setInputValue((xsakes.toString()))}>
              {(xsakes.toString())}
            </span>
          </Text>
        </Row>
        {error ?
          <Row style={{ marginTop: "10px", marginBottom: "15px", justifyContent: "flex-end" }}>
            <Text fontSize={14} style={{ paddingRight: "10px", cursor: 'pointer', color: 'red' }}>
              {message}
            </Text>
          </Row> : ""}

        <RowBetween width="100%" style={{ padding: '10px 0px' }}>
          <ButtonPrimary
            padding="8px"
            $borderRadius="8px"
            onClick={() => openInput()}
            width="30%"
          >
            <Trans>
              {account ? "Redeem" : "Connect Wallet"}</Trans>
          </ButtonPrimary>

        </RowBetween>
      </Column>
    </Fragment>
  );
};
export default TabRedeem;