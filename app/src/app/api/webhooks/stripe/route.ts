export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@/config/env";
import { prisma } from "@/server/db";

export async function POST(req: NextRequest) {
	const body = await req.text();
	let event: Stripe.Event;
	if (env.STRIPE_WEBHOOK_SECRET && env.STRIPE_SECRET_KEY) {
		const stripe = new Stripe(env.STRIPE_SECRET_KEY);
		const signature = req.headers.get("stripe-signature")!;
		try {
			event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
		} catch (err) {
			return NextResponse.json({ error: `Webhook Error: ${(err as any).message}` }, { status: 400 });
		}
	} else {
		// Unverified in dev
		event = JSON.parse(body);
	}

	switch (event.type) {
		case "customer.subscription.updated":
		case "customer.subscription.created": {
			// TODO: look up org by stripe customer id and set plan based on price
			break;
		}
	}

	await prisma.auditLog.create({ data: { orgId: "unknown", action: "STRIPE_EVENT", meta: { type: event.type } } }).catch(() => null);
	return NextResponse.json({ received: true });
}