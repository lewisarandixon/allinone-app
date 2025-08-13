import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions, type Session, type User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { prisma } from "../db";
import { env } from "@/config/env";

type TokenWithOrg = { email?: string | null; orgId?: string };

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as unknown as NextAuthOptions["adapter"],
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID || "",
			clientSecret: env.GOOGLE_CLIENT_SECRET || "",
		}),
		AzureADProvider({
			clientId: env.AZURE_AD_CLIENT_ID || "",
			tenantId: env.AZURE_AD_TENANT_ID || "common",
			clientSecret: env.AZURE_AD_CLIENT_SECRET || "",
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async signIn({ user }) {
			const nextUser = user as NextAuthUser;
			if (!(nextUser as any).orgId) {
				const existing = await prisma.user.findUnique({ where: { email: nextUser.email! } }).catch(() => null);
				if (!existing) {
					const org = await prisma.org.create({ data: { name: nextUser.name || nextUser.email || "New Org" } });
					await prisma.user.create({ data: { email: nextUser.email!, name: nextUser.name ?? null, orgId: org.id } });
				}
			}
			return true;
		},
		async jwt({ token }) {
			const t = token as TokenWithOrg;
			if (t.email) {
				const u = await prisma.user.findUnique({ where: { email: t.email } });
				if (u) t.orgId = u.orgId;
			}
			return token;
		},
		async session({ session, token }) {
			const t = token as TokenWithOrg;
			(session.user as any).orgId = t.orgId;
			return session as Session;
		},
	},
	secret: env.NEXTAUTH_SECRET,
};