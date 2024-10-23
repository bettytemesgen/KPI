// pages/api/signup.js
import prisma from '../../lib/prisma'; // Ensure this path is correct
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { full_name, email, password, start_date } = req.body; // Adjust according to your form inputs

    // Validate input
    if (!email || !password || !full_name || !start_date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the recruiter already exists
      const existingRecruiter = await prisma.recruiters.findUnique({
        where: { email },
      });

      if (existingRecruiter) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new recruiter in the database
      const newRecruiter = await prisma.recruiters.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
          start_date: new Date(start_date), // Ensure correct date format
        },
      });

      return res.status(201).json({ message: 'Recruiter created successfully', recruiter: newRecruiter });
    } catch (error) {
      console.error('Error creating recruiter:', error); // Log the error for debugging
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
