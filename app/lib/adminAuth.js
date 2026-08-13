import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SEL = "boris-berenice-2026-admin-sel";

function jeton() {
  const motDePasse = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(motDePasse + SEL).digest("hex");
}

export function verifierMotDePasse(candidat) {
  const motDePasse = process.env.ADMIN_PASSWORD;
  return Boolean(motDePasse) && candidat === motDePasse;
}

export function tokenSession() {
  return jeton();
}

export async function estConnecte() {
  const magasin = await cookies();
  const valeur = magasin.get(COOKIE_NAME)?.value;
  return Boolean(valeur) && valeur === jeton();
}

export const NOM_COOKIE = COOKIE_NAME;
