import { getConnection } from "@/jobs/queues";

async function main() {
	const conn = getConnection();
	await conn.flushall();
	console.log("Redis flushed");
}

main().catch((e) => { console.error(e); process.exit(1); });