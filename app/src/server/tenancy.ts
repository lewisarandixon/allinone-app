import { getServerSession } from "next-auth";
import { authOptions } from "./auth/options";
import { prisma } from "./db";

type SessionUser = { orgId?: string } & Record<string, unknown>;

export async function requireOrg() {
	const session = await getServerSession(authOptions);
	const orgId = (session?.user as SessionUser | undefined)?.orgId;
	if (!session || !orgId) {
		throw new Error("Org required");
	}
	return orgId;
}

export function whereOrg<T extends object>(orgId: string, where?: T): T & { orgId: string } {
	return Object.assign({}, (where ?? {}) as T, { orgId }) as T & { orgId: string };
}

export async function findOrg(orgId: string) {
	return prisma.org.findUnique({ where: { id: orgId } });
}