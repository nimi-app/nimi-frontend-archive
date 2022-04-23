import axios from "axios";

import { useState } from "react";

export default function useTwitterData(userId) {
  const [twitterData, setTwitterData] = useState();
  const [loading, setLoading] = useState(false);
  const loadTwitterData = async () => {
    setLoading(true);

    await axios
      .get(`https://api.nimi.dev/twitter-info?username=${userId}`)
      .then(response => {
        setTwitterData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.log(error);
      });
  };

  return { loadTwitterData, twitterData, loading };
}
