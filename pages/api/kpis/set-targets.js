// pages/api/kpis/set-targets.js

import { checkRole } from '../../../lib/rbac';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Allow only MANAGER role to set KPI targets
  await checkRole(['MANAGER'])(req, res, async () => {
    if (req.method === 'POST') {
      const { userId, period, targetData } = req.body;

      try {
        const updatedKPI = await prisma.kPI.upsert({
          where: {
            userId_period: {
              userId: parseInt(userId),
              period,
            },
          },
          update: targetData,
          create: {
            userId: parseInt(userId),
            period,
            ...targetData,
          },
        });
        res.status(200).json(updatedKPI);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to set KPI targets' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
