// pages/api/users/index.js

import prisma from '../../../lib/prisma'; // Prisma client initialization
import bcrypt from 'bcryptjs'; // For hashing passwords

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create a new user
    const { email, password, role } = req.body;

    try {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Only allow managers to create new users
      const userRole = req.headers['user-role']; // Assuming the role is passed in headers
      if (userRole !== 'MANAGER') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Create the new user in the database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });

      res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  } else if (req.method === 'GET') {
    // Retrieve all users (for managers)
    const userRole = req.headers['user-role']; // Assuming role is passed in headers
    if (userRole !== 'MANAGER') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
