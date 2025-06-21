import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function insertSampleData() {
  try {
    const contacts = await prisma.contact.createMany({
      data: [
        {
          email: 'doc1@time.com',
          phoneNumber: '1234567890',
          linkPrecedence: 'primary',
        },
        {
          email: 'doc2@time.com',
          phoneNumber: '1234567890',
          linkPrecedence: 'secondary',
          linkedId: 1,
        },
        {
          email: 'doc3@time.com',
          phoneNumber: '9876543210',
          linkPrecedence: 'secondary',
          linkedId: 1,
        },
      ],
    });

    console.log('✅ Sample contacts inserted');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

insertSampleData();
