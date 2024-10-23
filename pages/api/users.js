// import { getSession } from 'next-auth/react'; // Import session handling
// import prisma from '../../lib/prisma';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const session = await getSession({ req });

//   // Check if there is a valid session
//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const { email, password, role } = req.body;

//   // Only allow Managers to create new users
//   if (session.user.role !== 'MANAGER') {
//     return res.status(403).json({ message: 'Forbidden: Only managers can create users.' });
//   }

//   try {
//     // Hash the user's password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user in the database with Prisma
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         role, // role should be passed in as 'MANAGER' or 'RECRUITER'
//       },
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// }
// pages/api/users.js
import prisma from '../../lib/prisma'; // Import Prisma client or your data-fetching logic

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
