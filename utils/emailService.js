import nodemailer from 'nodemailer';

// Create a test account for development
// In production, use your actual SMTP credentials
const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
};

// Create production transporter (configure with your SMTP settings)
const createProductionTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const getTransporter = async () => {
  if (process.env.NODE_ENV === 'production') {
    return createProductionTransporter();
  } else {
    return await createTestAccount();
  }
};

export const sendOrderConfirmation = async (orderData) => {
  console.log('🔄 Starting order confirmation email...');
  console.log('📧 Order data:', orderData);
  
  try {
    const transporter = await getTransporter();
    
    if (!transporter) {
      console.error('❌ Failed to create email transporter');
      return false;
    }
    
    console.log('✅ Email transporter created successfully');

    const { customer, items, orderId, total } = orderData;

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Your Store" <noreply@yourstore.com>',
      to: customer.email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E5A27;">Order Confirmation</h2>
          <p>Dear ${customer.name},</p>
          <p>Thank you for your order! We've received your payment and are processing your order.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${(total.total / 100).toFixed(2)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Items Ordered</h3>
            ${items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} | Price: $${(item.price / 100).toFixed(2)}</p>
              </div>
            `).join('')}
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Shipping Address</h3>
            <p>${customer.address}</p>
            <p>${customer.city}, ${customer.state} ${customer.zipCode}</p>
            <p>${customer.country}</p>
          </div>
          
          <p>We'll send you a shipping confirmation with tracking information once your order ships.</p>
          <p>If you have any questions, please contact our customer service team.</p>
          
          <p>Best regards,<br>Your Store Team</p>
        </div>
      `,
    };

    console.log('📤 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    
    if (process.env.NODE_ENV !== 'production') {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('🔗 Preview URL:', previewUrl);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};

export const sendShippingNotification = async (orderData, trackingNumber) => {
  try {
    const transporter = await getTransporter();
    
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const { customer, orderId } = orderData;

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Your Store" <noreply@yourstore.com>',
      to: customer.email,
      subject: `Your Order Has Shipped - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E5A27;">Your Order Has Shipped!</h2>
          <p>Dear ${customer.name},</p>
          <p>Great news! Your order has been shipped and is on its way to you.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Shipping Information</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Carrier:</strong> USPS</p>
          </div>
          
          <p>You can track your package using the tracking number above on the carrier's website.</p>
          <p>Expected delivery: 5-7 business days</p>
          
          <p>Thank you for choosing us!</p>
          <p>Best regards,<br>Your Store Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    console.log('Shipping notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending shipping notification email:', error);
    return false;
  }
};
