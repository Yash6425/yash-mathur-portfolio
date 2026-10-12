// Netlify Function that runs the Express API (Node.js serverless).
import serverless from 'serverless-http';
import { createApp } from '../../server/app.mjs';
import { mongoStore } from '../../server/mongo-store.mjs';
import { createNotifier } from '../../server/notify.mjs';

export const handler = serverless(createApp(mongoStore, createNotifier()));
