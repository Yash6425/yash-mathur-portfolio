import { MongoClient } from 'mongodb';
import { seedCertificates, seedProjects } from './seed-data.mjs';

/**
 * MongoDB data layer.
 * Connection string comes from the MONGODB_URI environment variable (set in Netlify, never in code).
 * Database: "portfolio" · Collections: projects, certificates, messages
 */

let clientPromise;
let seeded = false;

function getClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!clientPromise) {
    // Reused across function invocations while the server stays warm.
    clientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 6000 }).connect().catch((err) => {
      clientPromise = undefined;
      throw err;
    });
  }
  return clientPromise;
}

async function getDb() {
  const client = await getClient();
  const db = client.db(process.env.MONGODB_DB || 'portfolio');
  if (!seeded) {
    // Add any seed records that are not in the database yet (matched by id).
    // Existing records are never overwritten, so edits made in Atlas are kept.
    for (const [name, records] of [['projects', seedProjects], ['certificates', seedCertificates]]) {
      const ops = records.map((r) => ({ updateOne: { filter: { id: r.id }, update: { $setOnInsert: { ...r } }, upsert: true } }));
      if (ops.length) await db.collection(name).bulkWrite(ops, { ordered: false });
    }
    await db.collection('projects').createIndex({ id: 1 }, { unique: true });
    await db.collection('certificates').createIndex({ id: 1 }, { unique: true });
    seeded = true;
  }
  return db;
}

const hideMongoId = { projection: { _id: 0 } };

export const mongoStore = {
  async counts() {
    const db = await getDb();
    const [projects, certificates, messages] = await Promise.all([
      db.collection('projects').countDocuments(),
      db.collection('certificates').countDocuments(),
      db.collection('messages').countDocuments(),
    ]);
    return { projects, certificates, messages };
  },
  async listProjects() {
    const db = await getDb();
    return db.collection('projects').find({}, hideMongoId).sort({ order: 1 }).toArray();
  },
  async listCertificates() {
    const db = await getDb();
    return db.collection('certificates').find({}, hideMongoId).sort({ date: -1 }).toArray();
  },
  async saveMessage(doc) {
    const db = await getDb();
    const result = await db.collection('messages').insertOne(doc);
    return result.insertedId;
  },
};
