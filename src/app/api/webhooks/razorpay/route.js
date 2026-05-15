import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('RAZORPAY_WEBHOOK_SECRET is not defined. Skipping verification in dev, but this is DANGEROUS in production.');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const expected = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expected !== signature) {
      console.error('Invalid Razorpay webhook signature detected.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    switch (event.event) {
      case 'payment.captured':
        console.log(`Payment captured successfully for order: ${event.payload.payment.entity.order_id}`);
        // TODO: Mark order as paid in DB
        break;
      case 'payment.failed':
        console.warn(`Payment failed for order: ${event.payload.payment.entity.order_id}`);
        // TODO: Mark order as failed, notify customer
        break;
      case 'refund.processed':
        console.log(`Refund processed for payment: ${event.payload.payment.entity.id}`);
        // TODO: Update order status
        break;
      default:
        console.log(`Unhandled Razorpay event: ${event.event}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
