import { db } from '../config/database';

export class SyncStateRepository {
  async getLastBlock(chain: string): Promise<number> {
    const result = await db.query(
      "SELECT last_block FROM sync_states WHERE chain = $1",
      [chain]
    );

    if (result.rowCount === 0) {
      await db.query(
        "INSERT INTO sync_states (chain, last_block) VALUES ($1, $2)",
        [chain, 0]
      );
      return 0;
    }

    return Number(result.rows[0].last_block);
  }

  async updateLastBlock(chain: string, block: number): Promise<void> {
    await db.query(
      "UPDATE sync_states SET last_block = $1, updated_at = NOW() WHERE chain = $2",
      [block, chain]
    );
  }
}
