import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import express from "express";
import rateLimit from "express-rate-limit";
import transactionRoutes from "./routes/transaction.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  })
);

app.use(transactionRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
