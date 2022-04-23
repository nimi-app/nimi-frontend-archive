import React, { useState } from "react";
import styled from "styled-components";
import { Address, Balance, Events } from "../components";

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Baloo 2';
  font-style: normal;
  font-size: 72px;
  height: 800px;
  background: linear-gradient(154.32deg, #4368EA 0.48%, #C490DD 85.86%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  justify-content: center;
`;

const PreHero = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 117.7%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #556DE7;  
`;

const HeroLead = styled.div `
  font-weight: 400;
`;

const HeroSub = styled.div`
  font-weight: 600;
`;



export default function ExampleUI({ link, title}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  return (
    <HeroText>
      <PreHero>
        This is a smaller title. It can be longer.
      </PreHero>
      <HeroLead>
        Your ENS deserves better.
      </HeroLead>
      <HeroSub>
        Nimi, new me.
      </HeroSub>
    </HeroText>
  );
}