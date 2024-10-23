import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'MANAGER') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'POST') {
    const { userId, period, targets } = req.body;
    try {
      const kpiTarget = await prisma.kPITarget.create({
        data: {
          userId,
          period,
          ...targets, // Spread the target KPIs
        },
      });
      res.status(201).json(kpiTarget);
    } catch (error) {
      console.error('Error setting KPI targets:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
