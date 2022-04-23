import { Button, Input } from "antd";
import nameHash from "@ensdomains/eth-ens-namehash";
import { ethers } from "ethers";
import React, { useState } from "react";
import contentHash from "content-hash";

import useEnsDomains from "../hooks/useEnsDomains";
import styled from "styled-components";
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 19px;
  justify-content: center;
`;
const StyledDomainText = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  /* or 32px */

  display: flex;
  align-items: center;
  text-align: center;

  /* gradient */

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const StyledCard = styled.div`
  display: flex;
  /* height: 347px;

  width: 337px; */
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */
  flex-direction: column;
  border-radius: 25px;
  border-radius: 25px;
  padding: 64px;
`;
const SetupButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  margin-top: 42px;
  margin-bottom: 26px;
  position: static;
  width: 209px;
  height: 48px;

  /* gradient */

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 30px;
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  /* white */

  color: #ffffff;
`;
const GoToText = styled.div`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  /* gradient */

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
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
function Home({ address, userSigner }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract

  console.log("address in home", address);
  const { domains, loadingState } = useEnsDomains(address);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const handleClick = ens => {
    window.open(`https://${ens}.link`);
  };
  const [twitter, setTwitter] = useState("");
  console.log(domains, loadingState);
  console.log("yourLocalBalance", ethers);
  const asyncFunc = async () => {
    console.log("user signer", userSigner);

    const contract = new ethers.Contract("0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41", abi, userSigner);
    // console.log("hash", nameHash.hash(domains[1].name));
    const node = nameHash.hash(domains[1].name);
    const ipfsContentHash = contentHash.fromIpfs("QmPcKYS1r1BW1PLg6vDFsY9qYm9Xw21cj3ykzFWydCrAft");
    console.log("ipfscontentHash", ipfsContentHash);
    await contract.setContenthash(node, "0x" + ipfsContentHash);
  };
  return (
    <div>
      <FlexWrapper>
        {!loadingState &&
          domains.map(item => {
            return (
              <StyledCard onClick={() => setSelectedDomain(item.name)}>
                <StyledDomainText>{item.name}</StyledDomainText>
                <SetupButton>Set up a Nimi Profile</SetupButton>
                <GoToText onClick={() => handleClick(item.name)}>Go to {item.name}</GoToText>
              </StyledCard>
            );
          })}
      </FlexWrapper>
      <div>SelectedDomain:{selectedDomain}</div>
      <Input.TextArea onChange={event => setTwitter(event)}>Twitter</Input.TextArea>
      <div>Twiter name: {twitter}</div>
      <Button onClick={asyncFunc}>Deploy to ipfs</Button>
    </div>
  );
}

export default Home;
