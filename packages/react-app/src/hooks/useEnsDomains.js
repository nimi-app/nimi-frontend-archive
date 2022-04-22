import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const GET_DOMAINS_SUBGRAPH = gql`
  query getDomains($id: ID!, $first: Int, $skip: Int, $orderBy: Domain_orderBy) {
    account(id: $id) {
      domains(first: $first, skip: $skip, orderBy: $orderBy) {
        labelName
        labelhash
        name
        isMigrated
        parent {
          name
        }
      }
    }
  }
`;

export default function useEnsDomains(address = "") {
  const [loadingState, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const { data, loading } = useQuery(GET_DOMAINS_SUBGRAPH, {
    variables: {
      id: address.toLowerCase(),
      first: 100,
    },

    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (loading || !data.account) {
      setLoading(true);
    } else {
      setDomains(data.account.domains);
      setLoading(false);
    }
  }, [address, data, loading]);
  return { domains, loadingState };
}
