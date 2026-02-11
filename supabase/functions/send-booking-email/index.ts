import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();

    // Input validation
    if (!bookingData.booking_id || typeof bookingData.booking_id !== 'string' || bookingData.booking_id.length > 20) {
      return new Response(JSON.stringify({ error: "Invalid booking_id" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!bookingData.customer_name || bookingData.customer_name.length < 2 || bookingData.customer_name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid customer_name" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!bookingData.customer_phone || bookingData.customer_phone.length < 10 || bookingData.customer_phone.length > 15) {
      return new Response(JSON.stringify({ error: "Invalid customer_phone" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Verify this booking actually exists in the database using service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: booking, error: dbError } = await supabaseAdmin
      .from("bookings")
      .select("id, booking_id")
      .eq("booking_id", bookingData.booking_id)
      .eq("customer_phone", bookingData.customer_phone)
      .single();

    if (dbError || !booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Escape all user input for HTML
    const safeName = escapeHtml(bookingData.customer_name);
    const safePhone = escapeHtml(bookingData.customer_phone);
    const safeEmail = bookingData.customer_email ? escapeHtml(bookingData.customer_email) : "";
    const safeDate = escapeHtml(bookingData.booking_date);
    const safeTime = escapeHtml(bookingData.booking_time);
    const safePurpose = escapeHtml(bookingData.purpose);
    const safeMessage = bookingData.message ? escapeHtml(bookingData.message) : "";
    const safeBookingId = escapeHtml(bookingData.booking_id);

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
            <div class="booking-id">${safeBookingId}</div>
            <div class="detail-row"><span class="label">Customer:</span><span class="value">${safeName}</span></div>
            <div class="detail-row"><span class="label">Phone:</span><span class="value">${safePhone}</span></div>
            ${safeEmail ? `<div class="detail-row"><span class="label">Email:</span><span class="value">${safeEmail}</span></div>` : ''}
            <div class="detail-row"><span class="label">Date:</span><span class="value">${safeDate}</span></div>
            <div class="detail-row"><span class="label">Time:</span><span class="value">${safeTime}</span></div>
            <div class="detail-row"><span class="label">Purpose:</span><span class="value">${safePurpose}</span></div>
            ${safeMessage ? `<div class="detail-row"><span class="label">Message:</span><span class="value">${safeMessage}</span></div>` : ''}
          </div>
          <div class="footer">
            AARTI ENTERPRISE - SS &amp; Aluminium Products<br>
            Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara - 390004
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailResponse = await sendEmail(
      ["sunilbishnoi6530@gmail.com"],
      `New Booking: ${safeBookingId} - ${safeName}`,
      adminEmailHtml
    );

    console.log("Admin email sent successfully");

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
              <p>Dear <strong>${safeName}</strong>,</p>
              <p>Your appointment has been successfully scheduled. Here are your booking details:</p>
              <div class="booking-id">
                <div class="booking-id-label">Your Booking ID</div>
                <div class="booking-id-value">${safeBookingId}</div>
              </div>
              <div class="appointment">
                <strong>📅 ${safeDate}</strong><br>
                <strong>🕐 ${safeTime}</strong>
              </div>
              <div class="detail-row"><span class="label">Purpose:</span> ${safePurpose}</div>
              <p style="margin-top: 20px;">We will contact you at <strong>${safePhone}</strong> to confirm your appointment.</p>
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

      customerEmailResponse = await sendEmail(
        [bookingData.customer_email],
        `Booking Confirmed - ${safeBookingId} | AARTI ENTERPRISE`,
        customerEmailHtml
      );
      console.log("Customer email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
