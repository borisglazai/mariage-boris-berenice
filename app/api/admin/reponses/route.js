import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";
import { estConnecte } from "@/app/lib/adminAuth";

export async function GET() {
  if (!(await estConnecte())) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  try {
    const result = await query(
      `SELECT code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes, created_at, updated_at
       FROM reponses ORDER BY updated_at DESC`
    );
    return NextResponse.json({ reponses: result.rows }, { status: 200 });
  } catch (err) {
    console.error("Erreur admin reponses:", err);
    return NextResponse.json({ erreur: "Un problème est survenu côté serveur." }, { status: 500 });
  }
}
