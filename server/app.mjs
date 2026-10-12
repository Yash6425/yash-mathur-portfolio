import express from 'express';
import { createMessage, getHealth, listCertificates, listProjects } from './handlers.mjs';

/**
 * Express REST API.
 *   GET  /api/health        → database status and record counts
 *   GET  /api/projects      → projects from MongoDB
 *   GET  /api/certificates  → certificates from MongoDB
 *   POST /api/contact       → validates and saves a contact message in MongoDB, then emails it to you
 */
export function createApp(store, notify) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '20kb' }));

  const router = express.Router();
  const send = (res, result) => res.status(result.status).json(result.body);
  const wrap = (fn) => async (req, res) => {
    try {
      send(res, await fn(req));
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, error: 'Server error. Please try again later.' });
    }
  };

  router.get('/health', wrap(() => getHealth(store)));
  router.get('/projects', wrap(() => listProjects(store)));
  router.get('/certificates', wrap(() => listCertificates(store)));
  router.post('/contact', wrap((req) => createMessage(store, req.body, { userAgent: req.get('user-agent') }, notify)));
  router.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

  // Netlify may pass either the public path (/api/...) or the function path.
  app.use('/api', router);
  app.use('/.netlify/functions/api', router);

  // Malformed JSON bodies
  app.use((err, _req, res, _next) => {
    res.status(err.status || 400).json({ ok: false, error: 'Invalid request body.' });
  });
  return app;
}
