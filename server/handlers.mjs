/**
 * API logic, kept independent of Express so it is easy to test.
 * Each handler receives a `store` (MongoDB in production) and returns { status, body }.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 80, email: 120, subject: 150, message: 3000 };

const clean = (v) => (typeof v === 'string' ? v.trim() : '');

/** Validates a contact form submission. Returns { errors, data }. */
export function validateMessage(input) {
  const body = input && typeof input === 'object' ? input : {};
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    subject: clean(body.subject),
    message: clean(body.message),
  };
  const errors = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.subject.length < 3) errors.subject = 'Please add a short subject.';
  if (data.message.length < 10) errors.message = 'Message should be at least 10 characters.';
  for (const [key, max] of Object.entries(LIMITS)) {
    if (data[key].length > max) errors[key] = `Must be ${max} characters or fewer.`;
  }
  return { errors, data };
}

export async function getHealth(store) {
  try {
    const counts = await store.counts();
    return { status: 200, body: { ok: true, database: 'connected', ...counts } };
  } catch (err) {
    return { status: 503, body: { ok: false, database: 'unavailable', error: String(err?.message || err) } };
  }
}

export async function listProjects(store) {
  const projects = await store.listProjects();
  return { status: 200, body: { ok: true, count: projects.length, projects } };
}

export async function listCertificates(store) {
  const certificates = await store.listCertificates();
  return { status: 200, body: { ok: true, count: certificates.length, certificates } };
}

/**
 * Saves a contact message. `notify` (optional) emails it; email problems never block the save.
 */
export async function createMessage(store, input, meta = {}, notify) {
  // Honeypot: real visitors never fill the hidden "company" field; bots usually do.
  if (input && typeof input === 'object' && clean(input.company)) {
    return { status: 200, body: { ok: true } };
  }
  const { errors, data } = validateMessage(input);
  if (Object.keys(errors).length) {
    return { status: 400, body: { ok: false, errors } };
  }
  const id = await store.saveMessage({
    ...data,
    createdAt: new Date(),
    userAgent: clean(meta.userAgent).slice(0, 300),
  });
  if (notify) {
    try {
      await notify(data);
    } catch (err) {
      console.error('notify failed', err);
    }
  }
  return { status: 201, body: { ok: true, id: String(id) } };
}
