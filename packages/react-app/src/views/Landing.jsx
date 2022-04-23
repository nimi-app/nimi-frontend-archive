import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Address, Balance, Events } from "../components";
import { ReactComponent as ConnectLogo } from "../images/wallet-connect.svg";

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Baloo 2";
  font-style: normal;
  font-size: 72px;
  height: 800px;
  align-items: center;
  background: linear-gradient(154.32deg, #4368ea 0.48%, #c490dd 85.86%);
  -webkit-background-clip: text;

  background-clip: text;
  text-fill-color: transparent;
  justify-content: start;
  margin-top: 160px;
`;

const PreHero = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 700;
  -webkit-text-fill-color: transparent;
  font-size: 15px;
  line-height: 117.7%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #556de7;
`;

const HeroLead = styled.div`
  font-weight: 400;
  -webkit-text-fill-color: transparent;
`;

const HeroSub = styled.div`
  font-weight: 600;
  -webkit-text-fill-color: transparent;
`;
const ConnectButton = styled.button`
  width: 195px;
  height: 48px;
  margin-top: 41px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 25px;
  /* left: 1143px;
  top: 27px; */
  font-family: "Baloo 2";
  font-size: 18px;
  color: #ffffff !important;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  display: flex;
  border: transparent;

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 30px;
`;
const SmallText = styled.div`
  color: white;
`;

export default function LandingPage({ link, title }) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  return (
    <HeroText>
      <PreHero>This is a smaller title. It can be longer.</PreHero>
      <HeroLead>Your ENS deserves better.</HeroLead>
      <HeroSub>Nimi, new me.</HeroSub>
      <Link to="/app">
        <ConnectButton>
          <ConnectLogo />

          <SmallText>Go to Nimi</SmallText>
        </ConnectButton>
      </Link>
    </HeroText>
  );
}
