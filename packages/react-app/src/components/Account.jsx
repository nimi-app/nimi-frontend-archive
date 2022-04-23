import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";
import styled from "styled-components";
import { ReactComponent as ConnectLogo } from "../images/wallet-connect.svg";

/** 
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    useBurner={boolean}
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
    isContract={boolean}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
**/
const ConnectButton = styled.button`
  width: 195px;
  height: 48px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 25px;
  /* left: 1143px;
  top: 27px; */
  font-family: "Baloo 2";
  font-size: 18px;
  color: #ffffff;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  display: flex;
  border: transparent;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 30px;
`;
const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export default function Account({
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
}) {
  const { currentTheme } = useThemeSwitcher();

  const modalButtons = [];
  if (web3Modal) {
    if (!web3Modal.cachedProvider) {
      // modalButtons.push(
      //   <ConnectButton
      //     key="logoutbutton"
      //     style={{ width: "100px;" }}
      //     shape="round"
      //     size="large"
      //     onClick={logoutOfWeb3Modal}
      //   >
      //     Logout
      //   </ConnectButton>,
      modalButtons.push(
        <ConnectButton
          key="loginbutton"
          shape="round"
          size="large"
          /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
          onClick={loadWeb3Modal}
        >
          <ConnectLogo /> Connect Wallet
        </ConnectButton>,
      );
    }
  }
  const display = minimized ? (
    ""
  ) : (
    <div>
      {web3Modal && web3Modal.cachedProvider ? (
        <>{address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}</>
      ) : useBurner ? (
        ""
      ) : isContract ? (
        <>
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}

          <Balance address={address} provider={localProvider} price={price} />
        </>
      ) : (
        ""
      )}
      {useBurner && web3Modal && !web3Modal.cachedProvider ? (
        <>
          <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />

          <Balance address={address} provider={localProvider} price={price} />
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <AccountWrapper>
      {display}
      {modalButtons}
    </AccountWrapper>
  );
}
