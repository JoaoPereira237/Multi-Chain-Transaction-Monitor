import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { redis } from "../config/redis";

const repo = new TransactionRepository();

export class TransactionController {
  static async getAll(req: Request, res: Response) {
    const cacheKey = "transactions:all";

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const data = await repo.findAll();
    await redis.setEx(cacheKey, 30, JSON.stringify(data));

    res.json(data);
  }

  static async getByHash(req: Request, res: Response) {
    const { hash } = req.params;
    const cacheKey = `transactions:${hash}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const tx = await repo.findByHash(hash);
    if (!tx) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await redis.setEx(cacheKey, 60, JSON.stringify(tx));
    res.json(tx);
  }
}
