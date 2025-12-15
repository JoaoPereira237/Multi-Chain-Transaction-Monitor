import { provider } from "../config/provider";
import { SyncStateRepository } from "../repositories/sync-state.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

export class BlockSyncService {
  private syncRepo = new SyncStateRepository();
  private txRepo = new TransactionRepository();
  private chain = "ethereum";

  async sync() {
    const lastBlock = Number(await this.syncRepo.getLastBlock(this.chain));
    const currentBlock = await provider.getBlockNumber();

    for (
      let blockNumber = lastBlock + 1;
      blockNumber <= currentBlock;
      blockNumber++
    ) {
      const hexTag = "0x" + blockNumber.toString(16);
      const block: any = await provider.send("eth_getBlockByNumber", [hexTag, true]);
      if (!block) continue;

      for (const tx of block.transactions as any[]) {
        await this.txRepo.save({
          hash: tx.hash,
          from: tx.from,
          to: tx.to ?? null,
          amount: (tx.value ? BigInt(tx.value).toString() : "0"),
          blockNumber,
        });
      }

      await this.syncRepo.updateLastBlock(this.chain, blockNumber);
      console.log(`Synced Ethereum block ${blockNumber}`);
    }
  }
}
