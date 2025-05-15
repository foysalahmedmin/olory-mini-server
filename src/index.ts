import { Server } from 'http';
import app from './app';
import config from './app/config';
import prisma from './prisma/client';

let server: Server;

async function main() {
  try {
    // Optional: test database connection
    await prisma.$connect();
    console.log('🟢 Connected to MySQL via Prisma');

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }

  // Gracefully handle shutdown signals
  process.on('SIGINT', async () => {
    console.log('👋 Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('🛑 Termination signal received...');
    await prisma.$disconnect();
    process.exit(0);
  });
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('❗Unhandled Rejection:', reason);
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❗Uncaught Exception:', err);
  process.exit(1);
});
