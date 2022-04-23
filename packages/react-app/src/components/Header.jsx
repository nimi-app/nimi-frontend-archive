import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NimiLogo } from "../images/nimi-logo.svg";
import Account from "./Account";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 27px;
`;
const LeftSide = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;
const NavigationText = styled.div`
  background: linear-gradient(154.32deg, #4368ea 0.48%, #c490dd 85.86%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

// displays a page header

export default function Header({
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
  return (
    <HeaderWrapper>
      <LeftSide>
        <NimiLogo />
        <NavigationText>Overview</NavigationText>
        <NavigationText>Features</NavigationText>
      </LeftSide>

      <Account
        address={address}
        localProvider={localProvider}
        userSigner={userSigner}
        mainnetProvider={mainnetProvider}
        price={price}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        blockExplorer={blockExplorer}
      />
    </HeaderWrapper>
  );
}
