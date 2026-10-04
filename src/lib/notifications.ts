import { Order, ShopSettings } from '../types';

/**
 * Generate a direct WhatsApp link containing all real order details.
 * Formatted cleanly with item list, customer info, delivery address, and payment status.
 */
export function generateWhatsAppOrderMessage(order: Order, settings: ShopSettings): string {
  const itemsText = order.items
    .map((item, idx) => `${idx + 1}. ${item.product_name} x${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const text = `*New Order: ${order.id}*
*Customer:* ${order.customer_name}
*Phone:* ${order.phone}
*Address:* ${order.address}, ${order.city} - ${order.pincode}
${order.landmark ? `*Landmark:* ${order.landmark}\n` : ''}
*Items Ordered:*
${itemsText}

*Subtotal:* ₹${order.subtotal}
*Delivery Fee:* ₹${order.delivery_fee === 0 ? 'FREE' : order.delivery_fee}
*Total Amount:* ₹${order.total}

*Payment Status:* ${order.payment_status}
${order.utr_number ? `*UPI UTR / Ref:* ${order.utr_number}\n` : ''}
*Order Status:* ${order.order_status}

Please verify the payment and confirm the dispatch.`;

  const encoded = encodeURIComponent(text);
  // Business phone: settings.phone (9788927795)
  return `https://wa.me/91${settings.phone}?text=${encoded}`;
}

/**
 * Generate a customer WhatsApp inquiry link
 */
export function generateCustomerSupportWhatsApp(settings: ShopSettings, message?: string): string {
  const defaultMsg = encodeURIComponent(message || `Hello Sujith's Cracker, I have an inquiry regarding crackers.`);
  return `https://wa.me/91${settings.phone}?text=${defaultMsg}`;
}

/**
 * Email Notification Interface and Environment Variable Specification:
 * 
 * Required for live external email delivery:
 * - VITE_EMAIL_SERVICE_API_KEY (e.g. Resend, SendGrid, or AWS SES)
 * - VITE_OWNER_NOTIFICATION_EMAIL (configured in Admin Settings)
 */
export async function sendOrderNotificationEmail(order: Order, settings: ShopSettings): Promise<{ success: boolean; message: string }> {
  const ownerEmail = settings.owner_notification_email;
  
  if (!ownerEmail) {
    return {
      success: false,
      message: 'Owner notification email not configured in Admin Settings. Please configure it to receive email alerts.'
    };
  }

  // Prepares the payload for production email dispatcher
  const payload = {
    to: ownerEmail,
    subject: `New Order Received - ${order.id} (₹${order.total})`,
    orderId: order.id,
    customerName: order.customer_name,
    customerPhone: order.phone,
    total: order.total,
    items: order.items,
    timestamp: new Date().toISOString()
  };

  console.info('[Notification Dispatcher] Order notification email ready:', payload);

  return {
    success: true,
    message: `Order notification prepared for ${ownerEmail}`
  };
}
