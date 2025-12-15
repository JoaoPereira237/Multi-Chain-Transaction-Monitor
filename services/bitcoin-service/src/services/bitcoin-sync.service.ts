import { bitcoinApi } from "../config/bitcoin-api";
import { SyncStateRepository } from "../repositories/sync-state.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

export class BitcoinSyncService {
  private syncRepo = new SyncStateRepository();
  private txRepo = new TransactionRepository();
  private chain = "bitcoin";

  async sync() {
    const lastBlock = await this.syncRepo.getLastBlock(this.chain);

    const tipResponse = await bitcoinApi.get("/blocks/tip/height");
    const currentHeight = tipResponse.data;

    for (let height = lastBlock + 1; height <= currentHeight; height++) {
      const blockHashRes = await bitcoinApi.get(`/block-height/${height}`);
      const blockHash = blockHashRes.data;

      const txsRes = await bitcoinApi.get(`/block/${blockHash}/txs`);
      const txs = txsRes.data;

      for (const tx of txs) {
        const outputSum = tx.vout.reduce(
          (sum: number, vout: any) => sum + vout.value,
          0
        );

        await this.txRepo.save({
          hash: tx.txid,
          amount: outputSum,
          blockHeight: height,
          status: "confirmed",
        });
      }

      await this.syncRepo.updateLastBlock(this.chain, height);
      console.log(`Synced Bitcoin block ${height}`);
    }
  }
}
