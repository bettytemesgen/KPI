// pages/api/kpis/[userId].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const kpis = await prisma.kPI.findMany({
        where: { userId: parseInt(userId) },
      });
      res.status(200).json(kpis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch KPIs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
