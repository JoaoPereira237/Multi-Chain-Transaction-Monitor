import { db } from '../config/database';

export class TransactionRepository {
    async save(tx: {
        hash: string;
        from: string;
        to: string | null;
        amount: string;
        blockNumber: number;
    }) {
    await db.query(
      `
      INSERT INTO transactions (hash, chain, from_address, to_address, amount, status, block_number)
      VALUES ($1, 'ethereum', $2, $3, $4, 'confirmed', $5)
      ON CONFLICT (hash) DO NOTHING
      `,
      [tx.hash, tx.from, tx.to, tx.amount, tx.blockNumber]
    );
    }   
}