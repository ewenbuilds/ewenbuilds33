/**
 * Cloudflare Pages Function: /api/contact
 * Handles form submissions natively on Cloudflare Pages without an external backend.
 * 
 * To use this instead of Formspree:
 * 1. Set up Resend, Mailgun, or SendGrid API key in Cloudflare Pages Environment Variables:
 *    - Cloudflare Dashboard > Workers & Pages > EWENBUILDS > Settings > Environment variables
 *    - Add `RESEND_API_KEY` or `MAIL_API_KEY`
 * 2. Update your frontend form to submit with fetch('/api/contact', { method: 'POST', body: JSON.stringify(...) })
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const contentType = request.headers.get('content-type') || '';
    
    let data;
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = Object.fromEntries(formData);
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported Content-Type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, subject, message, inquiryType } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields: name, email, or message.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    /*
    // Example: Forward message via Resend (uncomment and supply RESEND_API_KEY in Cloudflare env):
    const resendApiKey = env.RESEND_API_KEY || '[INSERT RESEND API KEY]';
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <noreply@ewenbuilds.xyz>',
        to: ['[INSERT DESTINATION EMAIL]'],
        subject: `[EWENBUILDS.xyz Inquiry] ${subject || inquiryType || 'New Message'} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${inquiryType}\n\nMessage:\n${message}`,
      }),
    });
    
    if (!emailResponse.ok) {
      throw new Error('Failed to dispatch email notification via provider.');
    }
    */

    // Success response returned to client
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message received successfully by EWENBUILDS.xyz endpoint.',
        received: { name, email, subject, inquiryType, timestamp: new Date().toISOString() }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
