export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@/config/env";

export async function GET() {
	if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_PRO) {
		return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
	}
	const stripe = new Stripe(env.STRIPE_SECRET_KEY);
	const session = await stripe.checkout.sessions.create({
		mode: "subscription",
		line_items: [{ price: env.STRIPE_PRICE_PRO, quantity: 1 }],
		success_url: `${env.NEXTAUTH_URL}/billing?success=1`,
		cancel_url: `${env.NEXTAUTH_URL}/billing?canceled=1`,
	});
	return NextResponse.redirect(session.url!, { status: 303 });
}