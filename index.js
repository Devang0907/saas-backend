import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import { verifyApiKey } from './middleware/auth.js';
import { PrismaClient } from './generated/prisma/index.js';
import { sanitizeBigInt } from './utils/sanitizeBigInt.js';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const metricSchema = z.object({
  hostname: z.string(),
  cpuLoad: z.number(),
  memoryUsed: z.number(),
  memoryTotal: z.number(),
  diskUsed: z.number(),
  diskTotal: z.number(),
  netRx: z.number(),
  netTx: z.number()
});

app.post('/api/metrics', verifyApiKey, async (req, res) => {
  try {
    const data = metricSchema.parse(req.body);
    await prisma.metric.upsert({
      where: { hostname: data.hostname },
      update: {
        cpu_load: data.cpuLoad,
        memory_used: data.memoryUsed,
        memory_total: data.memoryTotal,
        disk_used: data.diskUsed,
        disk_total: data.diskTotal,
        net_rx: data.netRx,
        net_tx: data.netTx,
      },
      create: {
        hostname: data.hostname,
        cpu_load: data.cpuLoad,
        memory_used: data.memoryUsed,
        memory_total: data.memoryTotal,
        disk_used: data.diskUsed,
        disk_total: data.diskTotal,
        net_rx: data.netRx,
        net_tx: data.netTx,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/metrics/:hostname', verifyApiKey, async (req, res) => {
  try {
    const { hostname } = req.params;
    const metric = await prisma.metric.findFirst({
      where: { hostname }
    });
    if (!metric) {
      return res.status(404).json({ error: 'Metric not found' });
    }
    res.status(200).json({ data : sanitizeBigInt(metric) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});