import axios from "axios";
import { usePoller } from "eth-hooks";
import { useState } from "react";

export default function async fetchTwitterData(userId) {
    await axios
      .get(`https://api.nimi.dev/twitter-info?uesrname=${userID}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        return error
      });
}
