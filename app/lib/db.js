import { Pool } from "pg";

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

let pool;

function getPool() {
  if (!connectionString) {
    throw new Error(
      "Aucune variable d'environnement de connexion à la base de données n'est configurée (POSTGRES_URL / DATABASE_URL)."
    );
  }
  if (!pool) {
    const estLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    pool = new Pool({
      connectionString,
      ssl: estLocal ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let schemaReady = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getPool().query(`
      CREATE TABLE IF NOT EXISTS reponses (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        nom TEXT NOT NULL,
        email TEXT NOT NULL,
        tel TEXT NOT NULL,
        presence TEXT NOT NULL,
        nombre INTEGER,
        enfants TEXT,
        allergies TEXT,
        message TEXT,
        personnes JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
  }
  await schemaReady;
}

export async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sans caractères ambigus (0/O, 1/I/L)

export function genererCode(longueur = 8) {
  let code = "";
  for (let i = 0; i < longueur; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}
