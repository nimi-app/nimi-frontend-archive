import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NimiLogo } from "../images/nimi-logo.svg";
import LandingPage from "../views/Landing";
import Account from "./Account";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 62px;
`;
// const LeftSide = styled.div`
//   display: flex;
//   gap: 25px;
//   align-items: center;
// `;
const LandingPageWrapper = styled.div`
  display: flex;
  padding: 27px 90px;
  justify-content: space-between;
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
  location,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
}) {
  const isLanding = location.pathname === "/";
  return isLanding ? (
    <HeaderWrapper>
      {/* <LeftSide> */}

      {/* <NavigationText>Overview</NavigationText>
    <NavigationText>Features</NavigationText> */}
      {/* </LeftSide> */}
      <NimiLogo />
    </HeaderWrapper>
  ) : (
    <LandingPageWrapper>
      <NimiLogo />

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
    </LandingPageWrapper>
  );
}
