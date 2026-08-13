"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);
  const router = useRouter();

  async function envoyer(e) {
    e.preventDefault();
    setEnCours(true);
    setErreur("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motDePasse }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErreur(data.erreur || "Mot de passe incorrect.");
        setEnCours(false);
        return;
      }
      router.refresh();
    } catch {
      setErreur("Un problème est survenu. Réessayez.");
      setEnCours(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5ead8",
        padding: 24,
      }}
    >
      <form
        onSubmit={envoyer}
        style={{
          background: "#fbf5ea",
          border: "1px solid #e0cfb4",
          borderRadius: 24,
          padding: 40,
          display: "grid",
          gap: 18,
          maxWidth: 380,
          width: "100%",
        }}
      >
        <p style={{ margin: 0, fontSize: 12.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a8a5e", fontWeight: 700 }}>
          Espace des mariés
        </p>
        <h1 style={{ margin: 0, fontFamily: "var(--font-caprasimo), serif", fontWeight: 400, fontSize: 32, color: "#201e1d" }}>
          Tableau de bord RSVP
        </h1>
        <label style={{ display: "grid", gap: 7, fontSize: 14.5, fontWeight: 600, color: "#201e1d" }}>
          Mot de passe
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            autoFocus
            style={{
              border: "1px solid #d8c6aa",
              background: "#ffffff",
              borderRadius: 999,
              padding: "12px 18px",
              fontSize: 16,
              color: "#201e1d",
            }}
          />
        </label>
        {erreur && <p style={{ margin: 0, fontSize: 14, color: "#a05426" }}>{erreur}</p>}
        <button
          type="submit"
          disabled={enCours}
          style={{
            background: "#c67139",
            color: "#fbf5ea",
            border: "none",
            padding: "13px 20px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
            cursor: enCours ? "default" : "pointer",
            opacity: enCours ? 0.7 : 1,
          }}
        >
          {enCours ? "Connexion…" : "Entrer"}
        </button>
      </form>
    </div>
  );
}
