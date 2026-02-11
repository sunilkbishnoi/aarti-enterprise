import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface InquiryItem {
  productName: string;
  grade: string;
  size: string;
  thickness: string;
  quantity: number;
  price: number;
}

interface InquiryEmailRequest {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  items: InquiryItem[];
  total_value: number;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "AARTI ENTERPRISE <info@aartienterprise.site>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await res.json();
}

function buildItemRows(items: InquiryItem[]): string {
  return items.map((item, i) => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 12px 8px; font-weight: 500;">${i + 1}. ${escapeHtml(item.productName)}</td>
      <td style="padding: 12px 8px; color: #666;">${escapeHtml(item.grade)}</td>
      <td style="padding: 12px 8px; color: #666;">${escapeHtml(item.size)}</td>
      <td style="padding: 12px 8px; color: #666;">${escapeHtml(item.thickness)}</td>
      <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #b8860b;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryEmailRequest = await req.json();

    // Validation
    if (!data.customer_name || data.customer_name.length < 2 || data.customer_name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!data.customer_phone || data.customer_phone.length < 10 || data.customer_phone.length > 15) {
      return new Response(JSON.stringify({ error: "Invalid phone" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!data.customer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customer_email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!data.items || data.items.length === 0 || data.items.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid items" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const safeName = escapeHtml(data.customer_name);
    const safePhone = escapeHtml(data.customer_phone);
    const safeEmail = escapeHtml(data.customer_email);
    const itemRows = buildItemRows(data.items);
    const totalFormatted = `₹${data.total_value.toLocaleString('en-IN')}`;
    const inquiryId = `INQ-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Admin email
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b8860b, #daa520); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 22px; }
          .content { background: #f9f9f9; padding: 25px; border: 1px solid #ddd; }
          .inquiry-id { background: #b8860b; color: white; padding: 8px 16px; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; display: inline-block; width: 100px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #f0f0f0; padding: 10px 8px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; }
          .total-row { background: #fff9e6; font-size: 16px; }
          .footer { background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Product Inquiry</h1>
          </div>
          <div class="content">
            <div class="inquiry-id">${inquiryId}</div>
            <div class="detail-row"><span class="label">Customer:</span> ${safeName}</div>
            <div class="detail-row"><span class="label">Phone:</span> ${safePhone}</div>
            <div class="detail-row"><span class="label">Email:</span> ${safeEmail}</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Grade</th>
                  <th>Size</th>
                  <th>Thickness</th>
                  <th>Qty</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows}
                <tr class="total-row">
                  <td colspan="5" style="padding: 12px 8px; font-weight: bold;">Estimated Total</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #b8860b; font-size: 18px;">${totalFormatted}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
            AARTI ENTERPRISE - SS &amp; Aluminium Products<br>
            Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara - 390004
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(
      ["sunilbishnoi6530@gmail.com"],
      `New Inquiry: ${inquiryId} - ${safeName} (${data.items.length} items)`,
      adminHtml
    );
    console.log("Admin inquiry email sent");

    // Customer confirmation email
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b8860b, #daa520); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 22px; }
          .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; }
          .content { background: #ffffff; padding: 25px; border: 1px solid #ddd; }
          .inquiry-id { background: #f5f5f5; border: 2px solid #b8860b; color: #b8860b; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .inquiry-id-label { font-size: 12px; color: #666; margin-bottom: 4px; }
          .inquiry-id-value { font-size: 22px; font-weight: bold; font-family: monospace; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background: #f0f0f0; padding: 10px 8px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; }
          .total-row { background: #fff9e6; }
          .cta { text-align: center; margin: 25px 0; }
          .cta a { background: #25d366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Inquiry Received!</h1>
            <p>Thank you for choosing AARTI ENTERPRISE</p>
          </div>
          <div class="content">
            <p>Dear <strong>${safeName}</strong>,</p>
            <p>We have received your product inquiry. Our team will review it and get back to you with the best quotation shortly.</p>
            <div class="inquiry-id">
              <div class="inquiry-id-label">Your Inquiry ID</div>
              <div class="inquiry-id-value">${inquiryId}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Grade</th>
                  <th>Size</th>
                  <th>Thickness</th>
                  <th>Qty</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows}
                <tr class="total-row">
                  <td colspan="5" style="padding: 12px 8px; font-weight: bold;">Estimated Total</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #b8860b; font-size: 18px;">${totalFormatted}</td>
                </tr>
              </tbody>
            </table>
            <p style="color: #666; font-size: 13px;">* Final quotation may vary based on quantity and current market rates.</p>
            <div class="cta">
              <a href="https://wa.me/919427055205">💬 Contact us on WhatsApp</a>
            </div>
            <p><strong>Visit Us At:</strong><br>
            Shop No.7, Yamuna Mill Complex,<br>
            Pratapnagar - Dabhoi Road,<br>
            Vadodara - 390004</p>
          </div>
          <div class="footer">
            AARTI ENTERPRISE - Premium SS &amp; Aluminium Products<br>
            📞 +91 94270 55205 | 📧 aartienterprise05@gmail.com
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(
      [data.customer_email],
      `Inquiry Received - ${inquiryId} | AARTI ENTERPRISE`,
      customerHtml
    );
    console.log("Customer inquiry email sent");

    return new Response(
      JSON.stringify({ success: true, inquiry_id: inquiryId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-email:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
