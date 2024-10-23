import prisma from '../../../lib/prisma'; // Assuming Prisma client is initialized in lib/prisma.js
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // Hash the new password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Update user profile in the database
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        email,
        ...(hashedPassword && { password: hashedPassword }), // Only update the password if provided
      },
    });

    res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}
