import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { asyncHandler } from "../middlewares/error.middleware";

const router = Router();

router.get("/transactions", asyncHandler(TransactionController.getAll));
router.get("/transactions/:hash", asyncHandler(TransactionController.getByHash));

export default router;
