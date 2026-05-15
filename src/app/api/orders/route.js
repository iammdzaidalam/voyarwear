import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'xxxxxxxxxxxxxxxxxxxx',
});

export async function POST(req) {
  try {
    const { items, customerInfo } = await req.json();

    // Server-side price calculation (never trust client prices)
    const amount = calculateTotal(items);

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        customer_name: customerInfo?.name || '',
        customer_email: customerInfo?.email || '',
        items: JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity }))),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx',
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

function calculateTotal(items) {
  // Import products data and validate prices server-side
  // This prevents price tampering from the client
  const { products } = require('../../data/products');
  return items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) throw new Error(`Unknown product: ${item.id}`);
    return sum + product.price * item.quantity;
  }, 0);
}
