import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import { BlockSyncService } from "./services/block-sync.service";

const service = new BlockSyncService();

const INTERVAL_MS = 10_000;

async function start() {
  try {
    await service.sync();
  } catch (error) {
    console.error("Sync error:", error);
  } finally {
    setTimeout(start, INTERVAL_MS);
  }
}

start();
