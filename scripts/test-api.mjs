/**
 * API tests with an in-memory store (no database or internet needed).
 *   npm run test:api
 * Part 1 tests the handlers directly. Part 2 starts the real Express app on a local port
 * and calls it over HTTP (runs when the dependencies are installed).
 */
import assert from 'node:assert/strict';
import { createMessage, getHealth, listCertificates, listProjects, validateMessage } from '../server/handlers.mjs';
import { seedCertificates, seedProjects } from '../server/seed-data.mjs';
import { buildEmail, createNotifier } from '../server/notify.mjs';

function memoryStore() {
  const messages = [];
  return {
    messages,
    async counts() {
      return { projects: seedProjects.length, certificates: seedCertificates.length, messages: messages.length };
    },
    async listProjects() {
      return [...seedProjects].sort((a, b) => a.order - b.order);
    },
    async listCertificates() {
      return [...seedCertificates].sort((a, b) => b.date.localeCompare(a.date));
    },
    async saveMessage(doc) {
      messages.push(doc);
      return `mem-${messages.length}`;
    },
  };
}

let passed = 0;
const test = async (name, fn) => {
  await fn();
  passed += 1;
  console.log(`  ✓ ${name}`);
};

const good = { name: 'Recruiter', email: 'HR@Example.com', subject: 'Internship', message: 'We would like to talk to you.' };

console.log('Handlers');
const store = memoryStore();
await test('health reports counts', async () => {
  const r = await getHealth(store);
  assert.equal(r.status, 200);
  assert.equal(r.body.projects, 5);
  assert.equal(r.body.certificates, 19);
});
await test('health reports 503 when the database fails', async () => {
  const r = await getHealth({ counts: async () => { throw new Error('down'); } });
  assert.equal(r.status, 503);
  assert.equal(r.body.ok, false);
});
await test('projects are ordered', async () => {
  const r = await listProjects(store);
  assert.deepEqual(r.body.projects.map((p) => p.order), [-2, -1, 1, 2, 3]);
});
await test('certificates newest first', async () => {
  const r = await listCertificates(store);
  assert.equal(r.body.count, 19);
  assert.equal(r.body.certificates[0].date, '2026-09-14');
  assert.equal(r.body.certificates.at(-1).date, '2022-03-17');
});
await test('valid message is saved (trimmed, email lowercased)', async () => {
  const r = await createMessage(store, { ...good, name: '  Recruiter  ' }, { userAgent: 'test' });
  assert.equal(r.status, 201);
  assert.equal(store.messages.length, 1);
  assert.equal(store.messages[0].name, 'Recruiter');
  assert.equal(store.messages[0].email, 'hr@example.com');
  assert.ok(store.messages[0].createdAt instanceof Date);
});
await test('invalid message is rejected with field errors', async () => {
  const r = await createMessage(store, { name: 'A', email: 'nope', subject: '', message: 'short' });
  assert.equal(r.status, 400);
  assert.deepEqual(Object.keys(r.body.errors).sort(), ['email', 'message', 'name', 'subject']);
  assert.equal(store.messages.length, 1);
});
await test('non-object body is rejected', async () => {
  assert.equal((await createMessage(store, null)).status, 400);
  assert.equal((await createMessage(store, 'text')).status, 400);
});
await test('over-long message is rejected', async () => {
  assert.ok(validateMessage({ ...good, message: 'x'.repeat(3001) }).errors.message);
});
await test('honeypot submissions are ignored but look successful', async () => {
  const r = await createMessage(store, { ...good, company: 'spam inc' });
  assert.equal(r.status, 200);
  assert.equal(store.messages.length, 1);
});

console.log('\nEmail notification');
await test('saves and emails a valid message', async () => {
  const st = memoryStore(); const sent = [];
  const r = await createMessage(st, good, {}, async (m) => sent.push(m));
  assert.equal(r.status, 201);
  assert.equal(st.messages.length, 1);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].email, 'hr@example.com');
});
await test('message is still saved when email fails', async () => {
  const st = memoryStore();
  const r = await createMessage(st, good, {}, async () => { throw new Error('mail down'); });
  assert.equal(r.status, 201);
  assert.equal(st.messages.length, 1);
});
await test('no email for invalid or spam messages', async () => {
  const sent = [];
  await createMessage(memoryStore(), { name: 'A' }, {}, async (m) => sent.push(m));
  await createMessage(memoryStore(), { ...good, company: 'bot' }, {}, async (m) => sent.push(m));
  assert.equal(sent.length, 0);
});
await test('notifier skips when not configured', async () => {
  const r = await createNotifier({}, async () => { throw new Error('should not call'); })(good);
  assert.equal(r.reason, 'not-configured');
});
await test('notifier calls Resend with reply-to and escapes HTML', async () => {
  let call;
  const fake = async (url, init) => { call = { url, body: JSON.parse(init.body), auth: init.headers.Authorization }; return { ok: true }; };
  const r = await createNotifier({ RESEND_API_KEY: 'k', NOTIFY_EMAIL: 'me@x.com' }, fake)({ ...good, message: '<b>hi</b> there friend' });
  assert.equal(r.sent, true);
  assert.equal(call.url, 'https://api.resend.com/emails');
  assert.equal(call.auth, 'Bearer k');
  assert.deepEqual(call.body.to, ['me@x.com']);
  assert.equal(call.body.reply_to, good.email);
  assert.ok(call.body.html.includes('&lt;b&gt;hi&lt;/b&gt;'));
  assert.ok(buildEmail(good).subject.startsWith('New portfolio message'));
});
await test('notifier reports HTTP errors without throwing', async () => {
  const r = await createNotifier({ RESEND_API_KEY: 'k', NOTIFY_EMAIL: 'me@x.com' }, async () => ({ ok: false, status: 403, text: async () => 'nope' }))(good);
  assert.equal(r.sent, false);
});

let express = null;
try {
  await import('express');
  express = true;
} catch {
  console.log('\n(Express not installed here, skipping HTTP tests. Run "npm install" first.)');
}

if (express) {
  console.log('\nExpress HTTP');
  const { createApp } = await import('../server/app.mjs');
  const httpStore = memoryStore();
  const server = createApp(httpStore).listen(0);
  await new Promise((r) => server.once('listening', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await test('GET /api/health', async () => {
      const r = await fetch(`${base}/api/health`);
      assert.equal(r.status, 200);
      assert.equal((await r.json()).database, 'connected');
    });
    await test('GET /api/projects and the Netlify function path', async () => {
      for (const path of ['/api/projects', '/.netlify/functions/api/projects']) {
        const r = await fetch(base + path);
        assert.equal(r.status, 200);
        assert.equal((await r.json()).count, 5);
      }
    });
    await test('GET /api/certificates', async () => {
      const r = await fetch(`${base}/api/certificates`);
      assert.equal((await r.json()).count, 19);
    });
    await test('POST /api/contact saves', async () => {
      const r = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(good),
      });
      assert.equal(r.status, 201);
      assert.equal(httpStore.messages.length, 1);
    });
    await test('POST /api/contact with bad JSON → 400', async () => {
      const r = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' });
      assert.equal(r.status, 400);
    });
    await test('unknown route → 404 JSON', async () => {
      const r = await fetch(`${base}/api/nope`);
      assert.equal(r.status, 404);
      assert.equal((await r.json()).ok, false);
    });
  } finally {
    server.close();
  }
}

console.log(`\nAll ${passed} tests passed.`);
