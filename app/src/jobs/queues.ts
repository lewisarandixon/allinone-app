import { Queue } from "bullmq";
import IORedis, { type Redis } from "ioredis";
import { env } from "@/config/env";

let connectionInstance: Redis | null = null;
export function getConnection() {
	if (!connectionInstance) connectionInstance = new IORedis(env.REDIS_URL) as unknown as Redis;
	return connectionInstance;
}

export function sanitizeQueueName(name: string) {
	return name.replace(/:/g, "-");
}

let queuesCache: {
	emailPoll: Queue;
	emailReply: Queue;
	parseInvoice: Queue;
	postXero: Queue;
	postQbo: Queue;
	notify: Queue;
} | null = null;

export function getQueues() {
	if (queuesCache) return queuesCache;
	const connection = getConnection() as unknown as IORedis;
	function makeQueue(name: string) {
		return new Queue(sanitizeQueueName(name), {
			connection,
			defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 2000 }, removeOnComplete: 1000, removeOnFail: 1000 },
		});
	}
	queuesCache = {
		emailPoll: makeQueue("email:poll"),
		emailReply: makeQueue("email:reply"),
		parseInvoice: makeQueue("parse:invoice"),
		postXero: makeQueue("post:xero"),
		postQbo: makeQueue("post:qbo"),
		notify: makeQueue("notify"),
	};
	return queuesCache;
}