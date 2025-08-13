import { google } from "googleapis";
import { env } from "@/config/env";

export async function listRecentGmailMessages(accessToken: string) {
	if (!env.GOOGLE_CLIENT_ID) return [];
	const auth = new google.auth.OAuth2();
	auth.setCredentials({ access_token: accessToken });
	const gmail = google.gmail({ version: "v1", auth });
	const res = await gmail.users.messages.list({ userId: "me", q: "has:attachment newer_than:7d" });
	return res.data.messages ?? [];
}