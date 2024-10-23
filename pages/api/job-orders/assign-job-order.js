// pages/api/assign-job-order.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { job_title, client_id, role_level, status, created_by } = req.body;

    try {
      const jobOrder = await prisma.jobOrders.create({
        data: {
          job_title,
          client_id: parseInt(client_id, 10), // convert client_id to integer
          job_posting_date: new Date(),
          offer_acceptance_date: null, // can be null initially
          status,
          role_level,
          created_by,
          modified_by: null,
        },
      });

      res.status(201).json({ message: 'Job order created successfully', jobOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create job order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
