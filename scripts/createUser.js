const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
  try {
    const saltRounds = 10;
    const password = '0912495124';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = await prisma.user.create({
      data: {
        email: 'ytest2750@gmail.com',
        password: hashedPassword,
        role: 'RECRUITER', // or whatever role you want
      },
    });
    
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
