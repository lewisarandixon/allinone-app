import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

export async function listRecentGraphMessages(accessToken: string) {
	const client = Client.init({ authProvider: (done) => done(null, accessToken) });
	const res = await client.api("/me/messages").filter("hasAttachments eq true").top(25).get();
	return res.value ?? [];
}