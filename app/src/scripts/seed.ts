import { prisma } from "@/server/db";

async function main() {
	const org = await prisma.org.upsert({
		where: { id: "demo" },
		update: {},
		create: { id: "demo", name: "Demo Org", plan: "free" },
	});
	await prisma.supplierOverride.upsert({
		where: { id: "demo-override-1" },
		update: { orgId: org.id, supplier: "amazon", accountCode: "311", taxCode: "20% S" },
		create: { id: "demo-override-1", orgId: org.id, supplier: "amazon", accountCode: "311", taxCode: "20% S" },
	});
	console.log("Seeded", org.id);
}

main().catch((e) => { console.error(e); process.exit(1); });