import axios from "axios";

import { useState } from "react";

export default function useTwitterData(userId) {
  const [twitterData, setTwitterData] = useState();

  const loadGasPrice = async () => {
    await axios
      .get(`https://api.nimi.dev/twitter-info?username=${userId}`)
      .then(response => {
        setTwitterData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  loadGasPrice();
  return twitterData;
}
