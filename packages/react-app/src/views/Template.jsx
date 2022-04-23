import React, { useState } from "react";
import styled from "styled-components";
import { Address, Balance, Events } from "../components";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 1000px;
  width: 375px;
  background-color: white;
  align-items: center;
`;

const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 325px;
  width: 375px;
  align-items: center;
`;

const PicBackgroundTop = styled.div`
  background: linear-gradient(111.35deg, #4368EA -25.85%, #C490DD 73.38%);
  opacity: 0.8;
  border-radius: 0px 0px 200px 200px;
  height: 188px;
  width: 375px;
`;

const ProfilePic = styled.div`
  background-image: url("stani-test.png");
  background-position: center, center;
  background-size: cover;
  border: 8px solid #FFFFFF;
  border-radius: 200px;
  height: 250px;
  width: 250px;
  margin-top: -140px;
  z-index: 1;
`;

const ProfileName = styled.div`
  display: flex;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  /* or 32px */
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`;

const AddressBar = styled.div`
  margin-top: 26px;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;
  /* identical to box height, or 22px */

  display: flex;
  align-items: center;
  text-align: center;
`;

const VerticalSeparator = styled.div`
  margin-right: 30px;
  margin-left: 30px;
`;

const ETHAddress = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: 400;
  /* Blue 1 */
  color: #2F80ED;
`;

const ProfileDesc = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 165%;
  display: flex;
  align-items: left;
  margin: 25px 37px;
`;

const ContentListTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 38px 36px;
  background: #FFFFFF;
  box-shadow: 0px 8px 35px #E9E0FF;
  border-radius: 25px;
  width: 300px;
  margin-bottom: 40px;
`;

const TitleElement = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 100%;
`;

const LineItemElement = styled.div`
  display: flex;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  align-items: center;
  color: #2F80ED;
`;

const Footer = styled.div`
  background: linear-gradient(111.35deg, #4368EA -25.85%, #C490DD 73.38%);
  opacity: 0.8;
  border-radius: 0px 0px 200px 200px;
  transform: rotate(-180deg);
  width: 375px;
  height: 75px;
`;

export default function ExampleUI({ link, title}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  return (
    <OuterContainer>
      <ProfileContainer>
        <ProfilePicContainer>
          <PicBackgroundTop/>
          <ProfilePic/>
        </ProfilePicContainer>
        <ProfileName>
          Stani.eth (3,3)
        </ProfileName>
        <AddressBar>
          stani.eth
          <VerticalSeparator>|</VerticalSeparator>
          <ETHAddress>0x52...D4D4</ETHAddress>
        </AddressBar>
        <ProfileDesc>
          Founder @LensProtocol @AaveAaave web3 
          investoooorrr - Contributor to @PleasrDAO
          @FlamingoDAO @VENTURE_DAO - Opinions my own - Google 1998 vibes
        </ProfileDesc>
        <ContentListTile>
          <TitleElement>
            Socials
          </TitleElement>
          <LineItemElement>
            Stani Kuchelov
          </LineItemElement>
        </ContentListTile>
        <ContentListTile>
          <TitleElement>
            Addresses
          </TitleElement>
          <LineItemElement>
            0x477d239...ba36917649
          </LineItemElement>
        </ContentListTile>
        <Footer/>
      </ProfileContainer>
    </OuterContainer>
  );
}