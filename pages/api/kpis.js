import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userId, period } = req.query;

  if (!session) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const fetchUserId = userId === 'me' ? session.user.id : parseInt(userId);

  // Recruiters can only fetch their own data
  if (session.user.role === 'RECRUITER' && fetchUserId !== session.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    // Fetch KPI data
    const kpis = await prisma.kPI.findMany({
      where: {
        userId: fetchUserId,
        period,
      },
    });

    // Fetch KPI targets
    const kpiTargets = await prisma.kPITarget.findMany({
      where: {
        userId: fetchUserId,
        period,
      },
    });

    res.status(200).json({ kpis, kpiTargets });
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
