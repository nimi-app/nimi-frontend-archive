import { Skeleton, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import Blockies from "react-blockies";
import { useLookupAddress } from "eth-hooks/dapps/ens";

// changed value={address} to address={address}

const StyledAddress = styled.div`
  align-items: center;
  justify-content: space-around;

  /* left: 1143px;
  top: 27px; */
  font-family: "Baloo 2";
  font-size: 12px;
  a {
    background: linear-gradient(154.32deg, #4368ea 0.48%, #c490dd 85.86%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

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
