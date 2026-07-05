import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const { items, locale } = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/${locale}/checkout/success`,
      cancel_url: `${origin}/${locale}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ["GR", "CY", "DE", "GB", "US"],
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
