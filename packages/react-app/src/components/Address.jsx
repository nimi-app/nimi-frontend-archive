import { Skeleton, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import Blockies from "react-blockies";
import { useLookupAddress } from "eth-hooks/dapps/ens";

// changed value={address} to address={address}

const Avatar = styled.div`
  /* height: 32;
  width: 32; */
  border-radius: "50%";
  /* margin-right: 6;
  margin-left: -14; */
  background-color: white;
  background-size: cover;
  background-image: url("../images/nimi-small.svg");
`;

const StyledAddress = styled.div`
  align-items: center;
  justify-content: space-around;
  height: 42px;

  font-family: "Baloo 2";
  font-size: 12px;
  a {
    color: white;
    font-family: Baloo 2;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0em;
    /* text-align: left; */
  }
  padding: 11px;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 50px;

  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  display: flex;
  border: transparent;
`;
/** 
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
**/

const blockExplorerLink = (address, blockExplorer) => `${blockExplorer || "https://etherscan.io/"}address/${address}`;

export default function Address(props) {
  const address = props.value || props.address;
  const ens = useLookupAddress(props.ensProvider, address);
  console.log("sdhshdhsdhsdhsdhhds", ens);
  const ensSplit = ens && ens.split(".");
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === "eth";
  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);

  if (validEnsCheck) {
    displayAddress = ens;
  } else if (props.size === "short") {
    displayAddress += "..." + address.substr(-4);
  } else if (props.size === "long") {
    displayAddress = address;
  }

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  if (props.minimized) {
    return (
      <span style={{ verticalAlign: "middle" }}>
        <a target="_blank" href={etherscanLink} rel="noopener noreferrer">
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    );
  }

  return (
    <>
      {props.onChange ? (
        <StyledAddress editable={{ onChange: props.onChange }} copyable={{ text: address }}>
          <a target="_blank" href={etherscanLink} rel="noopener noreferrer">
            {displayAddress}
          </a>
        </StyledAddress>
      ) : (
        <StyledAddress copyable={{ text: address }}>
          <a target="_blank" href={etherscanLink} rel="noopener noreferrer">
            {displayAddress}
          </a>
        </StyledAddress>
      )}
    </>
  );
}
