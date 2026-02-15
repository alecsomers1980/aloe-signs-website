import nodemailer from 'nodemailer';
import { Order } from './orders';
import { formatPrice } from './utils';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Create reusable transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('Email credentials not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport(emailConfig);
};

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const emailHtml = generateOrderConfirmationHTML(order);
  const emailText = generateOrderConfirmationText(order);

  try {
    await transporter.sendMail({
      from: `"Aloe Signs" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      text: emailText,
      html: emailHtml,
    });

    console.log(`Order confirmation email sent to ${order.customerEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return false;
  }
}

/**
 * Send order status update email to customer
 */
export async function sendOrderStatusUpdateEmail(
  order: Order,
  previousStatus: string
): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const emailHtml = generateStatusUpdateHTML(order, previousStatus);
  const emailText = generateStatusUpdateText(order, previousStatus);

  try {
    await transporter.sendMail({
      from: `"Aloe Signs" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: order.customerEmail,
      subject: `Order Update - ${order.orderNumber}`,
      text: emailText,
      html: emailHtml,
    });

    console.log(`Status update email sent to ${order.customerEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send status update email:', error);
    return false;
  }
}

/**
 * Send order notification to admin
 */
export async function sendAdminOrderNotification(order: Order): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return false;

  const emailHtml = generateAdminNotificationHTML(order);
  const emailText = generateAdminNotificationText(order);

  try {
    await transporter.sendMail({
      from: `"Aloe Signs Website" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Order Received - ${order.orderNumber}`,
      text: emailText,
      html: emailHtml,
    });

    console.log(`Admin notification email sent to ${adminEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

/**
 * Generate HTML for order confirmation email
 */
function generateOrderConfirmationHTML(order: Order): string {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.name}</strong><br>
        <span style="color: #6b7280; font-size: 14px;">${item.size}</span><br>
        <span style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        R${formatPrice(item.price * item.quantity)}
      </td>
    </tr>
  `
    )
    .join('');

  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/order/track?q=${order.orderNumber}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2d2d2d; color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 32px;">Aloe Signs</h1>
    <p style="margin: 10px 0 0 0; color: #d1d5db;">Thank you for your order!</p>
  </div>
  
  <div style="background-color: #f9fafb; padding: 30px; margin-top: 20px;">
    <h2 style="color: #2d2d2d; margin-top: 0;">Order Confirmation</h2>
    <p>Hi ${order.customerName},</p>
    <p>Thank you for your order! We've received your payment and will start processing your order shortly.</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p style="margin: 10px 0 0 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}</p>
      <p style="margin: 10px 0 0 0;"><strong>Payment Status:</strong> <span style="color: #10b981;">Completed</span></p>
    </div>
    
    <h3 style="color: #2d2d2d;">Order Items</h3>
    <table style="width: 100%; background-color: white; border-radius: 8px; overflow: hidden;">
      ${itemsHTML}
      <tr>
        <td style="padding: 12px; border-top: 2px solid #2d2d2d;"><strong>Subtotal</strong></td>
        <td style="padding: 12px; border-top: 2px solid #2d2d2d; text-align: right;">R${formatPrice(order.subtotal)}</td>
      </tr>
      <tr>
        <td style="padding: 12px;"><strong>Shipping</strong></td>
        <td style="padding: 12px; text-align: right;">${order.shipping === 0 ? 'FREE' : `R${formatPrice(order.shipping)}`}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-top: 2px solid #2d2d2d;"><strong style="font-size: 18px;">Total</strong></td>
        <td style="padding: 12px; border-top: 2px solid #2d2d2d; text-align: right;"><strong style="font-size: 18px;">R${formatPrice(order.total)}</strong></td>
      </tr>
    </table>
    
    <h3 style="color: #2d2d2d; margin-top: 30px;">Delivery Address</h3>
    <div style="background-color: white; padding: 20px; border-radius: 8px;">
      <p style="margin: 0;">${order.customerAddress.street}</p>
      <p style="margin: 5px 0 0 0;">${order.customerAddress.city}, ${order.customerAddress.province}</p>
      <p style="margin: 5px 0 0 0;">${order.customerAddress.postalCode}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${trackingUrl}" style="display: inline-block; background-color: #84cc16; color: #2d2d2d; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Track Your Order</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
      If you have any questions about your order, please contact us at 
      <a href="mailto:team@aloesigns.co.za" style="color: #84cc16;">team@aloesigns.co.za</a> 
      or call <a href="tel:0116932600" style="color: #84cc16;">011 693 2600</a>.
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>© ${new Date().getFullYear()} Aloe Signs. All rights reserved.</p>
    <p>This email was sent to ${order.customerEmail}</p>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text for order confirmation email
 */
function generateOrderConfirmationText(order: Order): string {
  const itemsText = order.items
    .map((item) => `${item.name} (${item.size}) x ${item.quantity} - R${formatPrice(item.price * item.quantity)}`)
    .join('\n');

  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/order/track?q=${order.orderNumber}`;

  return `
ALOE SIGNS - ORDER CONFIRMATION

Hi ${order.customerName},

Thank you for your order! We've received your payment and will start processing your order shortly.

ORDER DETAILS:
Order Number: ${order.orderNumber}
Order Date: ${new Date(order.createdAt).toLocaleDateString('en-ZA')}
Payment Status: Completed

ORDER ITEMS:
${itemsText}

Subtotal: R${formatPrice(order.subtotal)}
Shipping: ${order.shipping === 0 ? 'FREE' : `R${formatPrice(order.shipping)}`}
Total: R${formatPrice(order.total)}

DELIVERY ADDRESS:
${order.customerAddress.street}
${order.customerAddress.city}, ${order.customerAddress.province}
${order.customerAddress.postalCode}

TRACK YOUR ORDER:
${trackingUrl}

If you have any questions, contact us at:
Email: team@aloesigns.co.za
Phone: 011 693 2600

© ${new Date().getFullYear()} Aloe Signs. All rights reserved.
  `.trim();
}

/**
 * Generate HTML for status update email
 */
function generateStatusUpdateHTML(order: Order, previousStatus: string): string {
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    paid: {
      title: 'Payment Confirmed',
      message: 'Your payment has been confirmed and your order is being prepared.',
      color: '#3b82f6',
    },
    processing: {
      title: 'Order Being Processed',
      message: 'We are currently preparing your order for shipment.',
      color: '#8b5cf6',
    },
    shipped: {
      title: 'Order Shipped',
      message: 'Great news! Your order has been shipped and is on its way to you.',
      color: '#10b981',
    },
    cancelled: {
      title: 'Order Cancelled',
      message: 'Your order has been cancelled. If you have any questions, please contact us.',
      color: '#ef4444',
    },
  };

  const statusInfo = statusMessages[order.status] || {
    title: 'Order Status Updated',
    message: `Your order status has been updated to: ${order.status}`,
    color: '#6b7280',
  };

  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/order/track?q=${order.orderNumber}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Status Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2d2d2d; color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 32px;">Aloe Signs</h1>
    <p style="margin: 10px 0 0 0; color: #d1d5db;">Order Status Update</p>
  </div>
  
  <div style="background-color: #f9fafb; padding: 30px; margin-top: 20px;">
    <div style="background-color: ${statusInfo.color}; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 24px;">${statusInfo.title}</h2>
    </div>
    
    <p>Hi ${order.customerName},</p>
    <p>${statusInfo.message}</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p style="margin: 10px 0 0 0;"><strong>Current Status:</strong> <span style="color: ${statusInfo.color}; text-transform: capitalize;">${order.status}</span></p>
      <p style="margin: 10px 0 0 0;"><strong>Updated:</strong> ${new Date(order.updatedAt).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${trackingUrl}" style="display: inline-block; background-color: #84cc16; color: #2d2d2d; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Order Details</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
      If you have any questions, please contact us at 
      <a href="mailto:team@aloesigns.co.za" style="color: #84cc16;">team@aloesigns.co.za</a> 
      or call <a href="tel:0116932600" style="color: #84cc16;">011 693 2600</a>.
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>© ${new Date().getFullYear()} Aloe Signs. All rights reserved.</p>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text for status update email
 */
function generateStatusUpdateText(order: Order, previousStatus: string): string {
  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/order/track?q=${order.orderNumber}`;

  return `
ALOE SIGNS - ORDER STATUS UPDATE

Hi ${order.customerName},

Your order status has been updated.

ORDER DETAILS:
Order Number: ${order.orderNumber}
Current Status: ${order.status.toUpperCase()}
Updated: ${new Date(order.updatedAt).toLocaleDateString('en-ZA')}

VIEW ORDER DETAILS:
${trackingUrl}

If you have any questions, contact us at:
Email: team@aloesigns.co.za
Phone: 011 693 2600

© ${new Date().getFullYear()} Aloe Signs. All rights reserved.
  `.trim();
}

/**
 * Generate HTML for admin notification email
 */
function generateAdminNotificationHTML(order: Order): string {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name} (${item.size})</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${formatPrice(item.price * item.quantity)}</td>
    </tr>
  `
    )
    .join('');

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/orders/${order.id}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2d2d2d; color: white; padding: 20px;">
    <h1 style="margin: 0; font-size: 24px;">🎉 New Order Received!</h1>
  </div>
  
  <div style="background-color: #f9fafb; padding: 20px; margin-top: 20px;">
    <h2 style="color: #2d2d2d; margin-top: 0;">Order #${order.orderNumber}</h2>
    
    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin: 0 0 10px 0; color: #2d2d2d;">Customer Details</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${order.customerName}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>
      <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${order.customerPhone}">${order.customerPhone}</a></p>
      <p style="margin: 5px 0;"><strong>Address:</strong> ${order.customerAddress.street}, ${order.customerAddress.city}, ${order.customerAddress.province} ${order.customerAddress.postalCode}</p>
    </div>
    
    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin: 0 0 10px 0; color: #2d2d2d;">Order Items</h3>
      <table style="width: 100%;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 8px; border-top: 2px solid #2d2d2d;"><strong>Total</strong></td>
            <td style="padding: 8px; border-top: 2px solid #2d2d2d; text-align: right;"><strong>R${formatPrice(order.total)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <p style="margin: 5px 0;"><strong>Payment Status:</strong> <span style="color: #10b981;">${order.paymentStatus}</span></p>
      <p style="margin: 5px 0;"><strong>Order Status:</strong> ${order.status}</p>
      <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString('en-ZA')}</p>
    </div>
    
    <div style="text-align: center; margin: 20px 0;">
      <a href="${adminUrl}" style="display: inline-block; background-color: #84cc16; color: #2d2d2d; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Admin Panel</a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text for admin notification email
 */
function generateAdminNotificationText(order: Order): string {
  const itemsText = order.items
    .map((item) => `${item.name} (${item.size}) x ${item.quantity} - R${formatPrice(item.price * item.quantity)}`)
    .join('\n');

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/orders/${order.id}`;

  return `
NEW ORDER RECEIVED - Order #${order.orderNumber}

CUSTOMER DETAILS:
Name: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}
Address: ${order.customerAddress.street}, ${order.customerAddress.city}, ${order.customerAddress.province} ${order.customerAddress.postalCode}

ORDER ITEMS:
${itemsText}

Total: R${formatPrice(order.total)}

PAYMENT STATUS: ${order.paymentStatus}
ORDER STATUS: ${order.status}
ORDER DATE: ${new Date(order.createdAt).toLocaleString('en-ZA')}

VIEW IN ADMIN PANEL:
${adminUrl}
  `.trim();
}
