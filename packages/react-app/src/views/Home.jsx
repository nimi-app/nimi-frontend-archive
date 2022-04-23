import { Button } from "antd";
import nameHash from "@ensdomains/eth-ens-namehash";
import { ethers } from "ethers";
import React from "react";
import contentHash from "content-hash";

import useEnsDomains from "../hooks/useEnsDomains";

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
      <h1>Home</h1>
      <div>{!loadingState && domains[0].labelName}</div>
      <Button onClick={asyncFunc}>Deploy to ipfs</Button>
    </div>
  );
}

export default Home;
