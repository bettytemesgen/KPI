// pages/api/peer-comparison.js
import prisma from '../../lib/prisma';
import { authorize } from '../../lib/rbac';

export default async function handler(req, res) {
  const user = await authorize(req, res, 'RECRUITER');
  if (!user) return;

  // Fetch anonymized KPIs from other users
  const kpis = await prisma.kPI.findMany({
    where: { userId: { not: user.id } }, // Exclude the logged-in user
    select: { metric: true, value: true },
  });

  res.status(200).json(kpis);
}
