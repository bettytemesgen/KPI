// pages/api/user/updateProfileImage.js

import prisma from '../../../lib/prisma'; // Adjust the import based on your project structure

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, image } = req.body;

    try {
      // Update the user's profile image in the database
      const user = await prisma.user.update({
        where: { id: userId },
        data: { profileImage: image },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update profile image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
