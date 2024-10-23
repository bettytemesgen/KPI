// pages/api/login.js
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Fetch the user by email
      const user = await prisma.recruiters.findUnique({
        where: { email },
      });

      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // If password matches, return success
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
