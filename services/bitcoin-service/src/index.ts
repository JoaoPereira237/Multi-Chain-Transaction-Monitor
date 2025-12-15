import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import { BitcoinSyncService } from "./services/bitcoin-sync.service";

const service = new BitcoinSyncService();
const INTERVAL_MS = 15_000;

async function start() {
  try {
    await service.sync();
  } catch (err) {
    console.error("Bitcoin sync error:", err);
  } finally {
    setTimeout(start, INTERVAL_MS);
  }
}

start();