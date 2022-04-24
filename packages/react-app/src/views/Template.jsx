import React, { useState } from "react";
import styled from "styled-components";
import nameHash from "@ensdomains/eth-ens-namehash";
import { ethers } from "ethers";
import contentHash from "content-hash";

import { ReactComponent as TwitterLogo } from "../images/twitter-icon.svg";
import { ReactComponent as SmallTwitterLogo } from "../images/small-twitter.svg";
import { ReactComponent as EmailLogo } from "../images/email-icon.svg";
import useTwitterData from "../hooks/useTwitterData";

const abi = [
  {
    constant: false,
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "bytes", name: "hash", type: "bytes" },
    ],
    name: "setContenthash",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 375px;
  background-color: white;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 25px;
`;

const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 325px;
  width: 375px;
  align-items: center;
`;

const PicBackgroundTop = styled.div`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 0px 0px 200px 200px;
  height: 188px;
  width: 375px;
`;

const ProfilePic = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 250px;
  width: 250px;
  margin-top: -140px;
  z-index: 1;
`;

const ProfileName = styled.div`
  display: flex;
  font-family: "Baloo 2";
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
  font-family: "Baloo 2";
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
  color: #2f80ed;
`;

const ProfileDesc = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 165%;
  display: flex;
  align-items: left;
  margin: 25px 37px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 36px;
`;
const ContentListTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 8px;
  padding: 38px 36px;
  background: #ffffff;
  box-shadow: 0px 8px 35px #e9e0ff;
  border-radius: 25px;
  width: 300px;
  margin-bottom: 40px;
`;

const TitleElement = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  text-align: start;
  line-height: 100%;
`;

const TwitterElement = styled.div`
  display: flex;
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 400;
  gap: 8px;
  font-size: 18px;
  line-height: 100%;
  align-items: center;
  color: #2f80ed;
`;
const EmailElement = styled.div`
  display: flex;
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 400;
  gap: 8px;
  font-size: 18px;
  line-height: 100%;
  align-items: center;
  color: #2f80ed;
`;

const Footer = styled.div`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 0px 0px 200px 200px;
  transform: rotate(-180deg);
  width: 375px;
  height: 75px;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;

  position: static;
  width: 413px;
  height: 292px;
  left: 0px;
  top: 0px;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 25px;
`;
const TwitterArea = styled.div`
  display: flex;
`;
const TwitterText = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 130%;
  margin-left: 18px;
  /* or 29px */
  text-align: left;
  display: flex;
  align-items: center;

  /* gradient */

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const StyledInput = styled.input`
  width: 100%;
  margin-top: 32px;
  margin-bottom: 32px;
  box-shadow: 0px 12px 23px rgba(55, 125, 255, 0.06);
  border-radius: 15px;
  border: 1.5px solid;
  height: 58px;
  padding: 20px;
  border-image-source: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
`;
const StyledButton = styled.button`
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

  /* gradient */

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 30px;
`;

export default function Template({ userSigner, address }) {
  const [input, setInput] = useState("");
  const { loadTwitterData, twitterData, loading } = useTwitterData(input);
  console.log(twitterData);
  const asyncFunc = async () => {
    console.log("user signer", userSigner);

    const contract = new ethers.Contract("0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41", abi, userSigner);
    // console.log("hash", nameHash.hash(domains[1].name));
    let urlSearchParams = window.location.search.substring(1);

    console.log(urlSearchParams);
    const node = nameHash.hash(urlSearchParams);
    console.log("mode", node);

    const ipfsContentHash = contentHash.fromIpfs("QmPcKYS1r1BW1PLg6vDFsY9qYm9Xw21cj3ykzFWydCrAft");
    console.log(ipfsContentHash);
    console.log("ipfscontentHash", ipfsContentHash);
    await contract.setContenthash(node, "0x" + ipfsContentHash);
  };
  let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);
  return (
    <Wrapper>
      <LeftSide>
        <TwitterArea>
          <TwitterLogo />
          <TwitterText>
            Import Data from <br /> Twitter Profile
          </TwitterText>
        </TwitterArea>
        <StyledInput type="text" placeholder="@ Your Twitter" value={input} onInput={e => setInput(e.target.value)} />
        {twitterData === undefined && <StyledButton onClick={loadTwitterData}>Import from Twitter</StyledButton>}
        {!loading && twitterData !== undefined && <StyledButton onClick={asyncFunc}>Deploy to ipfs</StyledButton>}
      </LeftSide>
      <OuterContainer>
        {twitterData !== undefined && (
          <ProfileContainer>
            <ProfilePicContainer>
              <PicBackgroundTop />
              <ProfilePic src={twitterData.profileImageUrl} />
            </ProfilePicContainer>
            <ProfileName>{twitterData.name}</ProfileName>
            <AddressBar>
              {twitterData.username}
              <VerticalSeparator>|</VerticalSeparator>
              <ETHAddress>{displayAddress}</ETHAddress>
            </AddressBar>
            <ProfileDesc>{twitterData.description}</ProfileDesc>
            <ContentListTile>
              <TitleElement>Socials</TitleElement>
              <TwitterElement>
                <SmallTwitterLogo />
                {twitterData.username}
              </TwitterElement>
              <EmailElement>
                <EmailLogo />
              </EmailElement>
            </ContentListTile>
            <ContentListTile>
              <TitleElement>Addresses</TitleElement>
              {/* <LineItemElement>0x477d239...ba36917649</LineItemElement> */}
            </ContentListTile>
            <Footer />
          </ProfileContainer>
        )}
      </OuterContainer>
    </Wrapper>
  );
}
