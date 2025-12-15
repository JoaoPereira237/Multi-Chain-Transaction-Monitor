import axios from "axios";

const baseURL = process.env.BTC_RPC_URL;

if (!baseURL) {
  throw new Error("BTC_RPC_URL is not defined");
}

export const bitcoinApi = axios.create({
  baseURL,
  timeout: 10_000,
});
