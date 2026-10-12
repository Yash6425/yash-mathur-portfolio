/**
 * Email notification for new contact messages, sent through Resend (https://resend.com).
 * Needs two Netlify environment variables:
 *   RESEND_API_KEY  – API key from resend.com
 *   NOTIFY_EMAIL    – where to send it (must be the email of your Resend account
 *                     while using the free onboarding@resend.dev sender)
 * If they are missing, or sending fails, the message is still saved in MongoDB.
 */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function buildEmail(msg) {
  const subject = `New portfolio message: ${msg.subject}`.slice(0, 180);
  const text = [
    `Name: ${msg.name}`,
    `Email: ${msg.email}`,
    `Subject: ${msg.subject}`,
    '',
    msg.message,
    '',
    '— Sent from the contact form on yashmathur6425.netlify.app',
  ].join('\n');
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <p><b>Name:</b> ${escapeHtml(msg.name)}<br>
         <b>Email:</b> <a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a><br>
         <b>Subject:</b> ${escapeHtml(msg.subject)}</p>
      <p style="white-space:pre-wrap;background:#f1f5f9;padding:12px;border-radius:8px">${escapeHtml(msg.message)}</p>
      <p style="color:#64748b;font-size:13px">Reply to this email to answer ${escapeHtml(msg.name)} directly.</p>
    </div>`;
  return { subject, text, html };
}

export function createNotifier(env = process.env, fetchImpl = globalThis.fetch) {
  return async function notify(msg) {
    const key = env.RESEND_API_KEY;
    const to = env.NOTIFY_EMAIL;
    if (!key || !to) return { sent: false, reason: 'not-configured' };
    const { subject, text, html } = buildEmail(msg);
    try {
      const res = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.NOTIFY_FROM || 'Portfolio Contact <onboarding@resend.dev>',
          to: [to],
          reply_to: msg.email,
          subject,
          text,
          html,
        }),
      });
      if (!res.ok) {
        console.error('Email notification failed', res.status, await res.text().catch(() => ''));
        return { sent: false, reason: `http-${res.status}` };
      }
      return { sent: true };
    } catch (err) {
      console.error('Email notification error', err);
      return { sent: false, reason: 'network' };
    }
  };
}
