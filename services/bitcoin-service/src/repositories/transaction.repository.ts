import { db } from '../config/database';

export class TransactionRepository {
  async save(tx: {
    hash: string;
    amount: number;
    blockHeight: number;
    status: string;
  }) {
    await db.query(
      `
      INSERT INTO transactions (hash, chain, amount, status, block_number)
      VALUES ($1, 'bitcoin', $2, $3, $4)
      ON CONFLICT (hash) DO NOTHING
      `,
      [tx.hash, tx.amount, tx.status, tx.blockHeight]
    );
  }
}
