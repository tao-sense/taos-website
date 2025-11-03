import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
try {
  const u = new URL(process.env.DATABASE_URL || '');
  console.log('Prisma runtime DB host:', u.host, 'user:', u.username);
} catch (e) {
  console.log('No DATABASE_URL visible to app');
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
