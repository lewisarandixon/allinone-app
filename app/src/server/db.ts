import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: [{ emit: "event", level: "query" }, "error", "warn"],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}