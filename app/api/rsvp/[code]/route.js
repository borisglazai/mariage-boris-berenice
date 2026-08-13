import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(request, { params }) {
  const { code } = await params;
  const codeNormalise = String(code || "").trim().toUpperCase();
  if (!codeNormalise) {
    return NextResponse.json({ erreur: "Code manquant." }, { status: 400 });
  }

  try {
    const result = await query(
      `SELECT code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes, updated_at
       FROM reponses WHERE code=$1`,
      [codeNormalise]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ erreur: "Aucune réponse trouvée pour ce code." }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("Erreur lookup RSVP:", err);
    return NextResponse.json({ erreur: "Un problème est survenu côté serveur." }, { status: 500 });
  }
}
