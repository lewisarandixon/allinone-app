export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@/config/env";

export async function GET() {
	if (!env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
	const stripe = new Stripe(env.STRIPE_SECRET_KEY);
	// In a real app we would look up the org's stripe customer ID
	const portal = await stripe.billingPortal.sessions.create({
		customer: "cus_placeholder",
		return_url: `${env.NEXTAUTH_URL}/billing`,
	});
	return NextResponse.redirect(portal.url, { status: 303 });
}