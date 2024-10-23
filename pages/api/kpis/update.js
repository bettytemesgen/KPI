// pages/api/kpis/update.js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, period, kpiData } = req.body;

    try {
      const updatedKPI = await prisma.kPI.upsert({
        where: {
          userId_period: {
            userId: parseInt(userId),
            period,
          },
        },
        update: kpiData,
        create: {
          userId: parseInt(userId),
          period,
          ...kpiData,
        },
      });
      res.status(200).json(updatedKPI);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update KPI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
