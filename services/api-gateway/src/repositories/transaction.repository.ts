import { db } from "../config/database";

export class TransactionRepository {
  async findAll() {
    const result = await db.query(
      "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 100"
    );
    return result.rows;
  }

  async findByHash(hash: string) {
    const result = await db.query(
      "SELECT * FROM transactions WHERE hash = $1",
      [hash]
    );
    return result.rows[0];
  }
}
