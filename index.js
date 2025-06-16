import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyApiKey } from './middleware/auth.js';
import metricsRouter from './routes/metrics.js';
import { PrismaClient } from "./generated/prisma/index.js";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.use('/api/metrics', verifyApiKey, metricsRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});
