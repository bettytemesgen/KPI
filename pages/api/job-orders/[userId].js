// pages/api/job-orders/[userId].js

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const jobOrders = await prisma.jobOrder.findMany({
        where: { recruiterId: parseInt(userId) },
        include: { candidates: true },
      });
      res.status(200).json(jobOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch job orders' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
