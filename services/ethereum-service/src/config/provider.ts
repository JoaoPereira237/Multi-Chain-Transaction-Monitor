import { ethers } from "ethers";

const rpcUrl = process.env.ETH_RPC_URL;

if (!rpcUrl) {
  throw new Error("ETH_RPC_URL is not defined");
}

export const provider = new ethers.JsonRpcProvider(rpcUrl);