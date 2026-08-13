import { NextResponse } from "next/server";
import { query, genererCode } from "@/app/lib/db";

function normaliser(body) {
  return {
    nom: String(body.nom || "").trim(),
    email: String(body.email || "").trim(),
    tel: String(body.tel || "").trim(),
    presence: body.presence === "oui" ? "oui" : "non",
    nombre: body.presence === "oui" ? Math.max(1, Math.min(8, Number(body.nombre) || 1)) : 0,
    enfants: String(body.enfants || "Aucun enfant"),
    allergies: String(body.allergies || ""),
    message: String(body.message || ""),
    personnes: body.presence === "oui" && Array.isArray(body.personnes) ? body.personnes : [],
  };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const donnees = normaliser(body);
  if (!donnees.nom || !donnees.email || !donnees.tel) {
    return NextResponse.json({ erreur: "Nom, courriel et téléphone sont requis." }, { status: 400 });
  }

  const codeExistant = typeof body.code === "string" ? body.code.trim().toUpperCase() : "";

  try {
    if (codeExistant) {
      const result = await query(
        `UPDATE reponses
         SET nom=$1, email=$2, tel=$3, presence=$4, nombre=$5, enfants=$6, allergies=$7, message=$8, personnes=$9, updated_at=now()
         WHERE code=$10
         RETURNING code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes, updated_at`,
        [
          donnees.nom,
          donnees.email,
          donnees.tel,
          donnees.presence,
          donnees.nombre,
          donnees.enfants,
          donnees.allergies,
          donnees.message,
          JSON.stringify(donnees.personnes),
          codeExistant,
        ]
      );
      if (result.rowCount === 0) {
        return NextResponse.json({ erreur: "Code introuvable. Vérifiez votre code personnel." }, { status: 404 });
      }
      return NextResponse.json(result.rows[0], { status: 200 });
    }

    for (let tentative = 0; tentative < 5; tentative++) {
      const code = genererCode();
      try {
        const result = await query(
          `INSERT INTO reponses (code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
           RETURNING code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes, updated_at`,
          [
            code,
            donnees.nom,
            donnees.email,
            donnees.tel,
            donnees.presence,
            donnees.nombre,
            donnees.enfants,
            donnees.allergies,
            donnees.message,
            JSON.stringify(donnees.personnes),
          ]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
      } catch (err) {
        if (err && err.code === "23505") continue; // collision de code, on retente
        throw err;
      }
    }
    return NextResponse.json({ erreur: "Impossible de générer un code unique, réessayez." }, { status: 500 });
  } catch (err) {
    console.error("Erreur RSVP:", err);
    return NextResponse.json(
      { erreur: "Un problème est survenu côté serveur. Merci de réessayer dans un instant." },
      { status: 500 }
    );
  }
}
