import express from 'express';
import { z } from 'zod';
import { prisma } from '../index.js';

const router = express.Router();

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

router.post('/', async (req, res) => {
  try {
    const data = metricSchema.parse(req.body);
    await prisma.metric.create({
      data: {
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

export default router;