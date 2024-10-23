import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password, startDate } = req.body;

  // Basic validation
  if (!email || !password || !startDate) {
    return res.status(400).json({ message: 'Email, password, and start date are required' });
  }

  try {
    // Use the correct model name: "recruiters"
    const existingRecruiter = await prisma.recruiters.findUnique({
      where: { email },
    });

    if (existingRecruiter) {
      return res.status(400).json({ message: 'Recruiter already exists with this email' });
    }

    // Create a new recruiter
    const newRecruiter = await prisma.recruiters.create({
      data: {
        name, // Can be nullable
        email,
        password, // In production, always hash the password before storing it
        start_date: new Date(startDate),
      },
    });

    res.status(201).json({ message: 'Recruiter created successfully', recruiter: newRecruiter });
  } catch (error) {
    console.error('Error creating recruiter:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
