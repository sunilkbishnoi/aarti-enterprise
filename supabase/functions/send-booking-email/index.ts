import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  booking_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  booking_date: string;
  booking_time: string;
  purpose: string;
  message?: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "AARTI ENTERPRISE <onboarding@resend.dev>",
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();

    // Admin email HTML
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b8860b, #daa520); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .booking-id { background: #b8860b; color: white; padding: 10px 20px; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; display: inline-block; width: 120px; }
          .value { color: #333; }
          .footer { background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗓️ New Booking Request</h1>
          </div>
          <div class="content">
            <div class="booking-id">${bookingData.booking_id}</div>
            
            <div class="detail-row">
              <span class="label">Customer:</span>
              <span class="value">${bookingData.customer_name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${bookingData.customer_phone}</span>
            </div>
            ${bookingData.customer_email ? `
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${bookingData.customer_email}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${bookingData.booking_date}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${bookingData.booking_time}</span>
            </div>
            <div class="detail-row">
              <span class="label">Purpose:</span>
              <span class="value">${bookingData.purpose}</span>
            </div>
            ${bookingData.message ? `
            <div class="detail-row">
              <span class="label">Message:</span>
              <span class="value">${bookingData.message}</span>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            AARTI ENTERPRISE - SS & Aluminium Products<br>
            Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara - 390004
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin
    const adminEmailResponse = await sendEmail(
      ["aartienterprise05@gmail.com"],
      `New Booking: ${bookingData.booking_id} - ${bookingData.customer_name}`,
      adminEmailHtml
    );

    console.log("Admin email sent successfully:", adminEmailResponse);

    // If customer provided email, send confirmation to them too
    let customerEmailResponse = null;
    if (bookingData.customer_email) {
      const customerEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b8860b, #daa520); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; }
            .booking-id { background: #f5f5f5; border: 2px solid #b8860b; color: #b8860b; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 25px; }
            .booking-id-label { font-size: 12px; color: #666; margin-bottom: 5px; }
            .booking-id-value { font-size: 24px; font-weight: bold; font-family: monospace; }
            .appointment { background: #fff9e6; border-left: 4px solid #b8860b; padding: 15px; margin-bottom: 20px; }
            .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .cta { text-align: center; margin: 25px 0; }
            .cta a { background: #25d366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Booking Confirmed!</h1>
              <p>Thank you for choosing AARTI ENTERPRISE</p>
            </div>
            <div class="content">
              <p>Dear <strong>${bookingData.customer_name}</strong>,</p>
              <p>Your appointment has been successfully scheduled. Here are your booking details:</p>
              
              <div class="booking-id">
                <div class="booking-id-label">Your Booking ID</div>
                <div class="booking-id-value">${bookingData.booking_id}</div>
              </div>
              
              <div class="appointment">
                <strong>📅 ${bookingData.booking_date}</strong><br>
                <strong>🕐 ${bookingData.booking_time}</strong>
              </div>
              
              <div class="detail-row">
                <span class="label">Purpose:</span> ${bookingData.purpose}
              </div>
              
              <p style="margin-top: 20px;">We will contact you at <strong>${bookingData.customer_phone}</strong> to confirm your appointment.</p>
              
              <div class="cta">
                <a href="https://wa.me/919427055205">💬 Contact us on WhatsApp</a>
              </div>
              
              <p><strong>Visit Us At:</strong><br>
              Shop No.7, Yamuna Mill Complex,<br>
              Pratapnagar - Dabhoi Road,<br>
              Vadodara - 390004</p>
            </div>
            <div class="footer">
              AARTI ENTERPRISE - Premium SS & Aluminium Products<br>
              📞 +91 94270 55205 | 📧 aartienterprise05@gmail.com
            </div>
          </div>
        </body>
        </html>
      `;

      customerEmailResponse = await sendEmail(
        [bookingData.customer_email],
        `Booking Confirmed - ${bookingData.booking_id} | AARTI ENTERPRISE`,
        customerEmailHtml
      );
      console.log("Customer email sent successfully:", customerEmailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
