import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  // Gunakan satu instance Prisma di produksi
  prisma = new PrismaClient();
} else {
  // Hindari membuat banyak instance Prisma di pengembangan
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
