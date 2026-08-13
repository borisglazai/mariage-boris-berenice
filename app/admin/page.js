import { estConnecte } from "@/app/lib/adminAuth";
import { query } from "@/app/lib/db";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

const th = {
  textAlign: "left",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7a8a5e",
  fontWeight: 700,
  padding: "0 0 10px",
  borderBottom: "1px solid #e0cfb4",
};

const td = {
  fontSize: 15,
  color: "#4a423a",
  padding: "14px 0",
  borderBottom: "1px solid #ede1cb",
  verticalAlign: "top",
};

function formaterDate(iso) {
  try {
    return new Date(iso).toLocaleString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

async function chargerReponses() {
  const result = await query(
    `SELECT code, nom, email, tel, presence, nombre, enfants, allergies, message, personnes, created_at, updated_at
     FROM reponses ORDER BY updated_at DESC`
  );
  return result.rows;
}

export default async function AdminPage() {
  const connecte = await estConnecte();
  if (!connecte) {
    return <LoginForm />;
  }

  let reponses = [];
  let erreurChargement = "";
  try {
    reponses = await chargerReponses();
  } catch (err) {
    console.error("Erreur chargement admin:", err);
    erreurChargement =
      "Impossible de charger les réponses depuis la base de données. Vérifiez que la base Postgres est bien connectée au projet Vercel.";
  }

  const foyersRepondu = reponses.length;
  const invitesPresents = reponses
    .filter((r) => r.presence === "oui")
    .reduce((somme, r) => somme + (r.nombre || 0), 0);
  const reponsesNegatives = reponses.filter((r) => r.presence === "non").length;
  const restrictionsAVerifier = reponses.filter((r) => (r.allergies || "").trim().length > 0).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f5ead8", padding: "40px 40px 80px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 12.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a8a5e", fontWeight: 700 }}>
              Espace des mariés
            </p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-caprasimo), serif", fontWeight: 400, fontSize: 40, color: "#201e1d" }}>
              Tableau de bord RSVP
            </h1>
          </div>
          <LogoutButton />
        </div>

        {erreurChargement && (
          <p style={{ background: "#fbe9dd", border: "1px solid #e0cfb4", borderRadius: 16, padding: 18, color: "#a05426", marginBottom: 24 }}>
            {erreurChargement}
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, marginBottom: 36 }}>
          {[
            { chiffre: foyersRepondu, label: "foyers répondus" },
            { chiffre: invitesPresents, label: "invités présents" },
            { chiffre: reponsesNegatives, label: "réponses négatives" },
            { chiffre: restrictionsAVerifier, label: "restrictions à vérifier" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fbf5ea", border: "1px solid #e0cfb4", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ fontFamily: "var(--font-caprasimo), serif", fontSize: 38, color: "#c67139", lineHeight: 1 }}>{stat.chiffre}</div>
              <div style={{ marginTop: 8, fontSize: 14.5, color: "#6b5f52" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fbf5ea", border: "1px solid #e0cfb4", borderRadius: 24, padding: 28, overflowX: "auto" }}>
          <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-caprasimo), serif", fontWeight: 400, fontSize: 26, color: "#201e1d" }}>
            Réponses reçues
          </h2>
          {reponses.length === 0 ? (
            <p style={{ color: "#6b5f52" }}>Aucune réponse pour le moment.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr>
                  <th style={th}>Foyer</th>
                  <th style={th}>Présence</th>
                  <th style={th}>Invités &amp; repas</th>
                  <th style={th}>Restrictions</th>
                  <th style={th}>Contact</th>
                  <th style={th}>Code</th>
                  <th style={th}>Mis à jour</th>
                </tr>
              </thead>
              <tbody>
                {reponses.map((r) => (
                  <tr key={r.code}>
                    <td style={{ ...td, fontWeight: 700, color: "#201e1d" }}>{r.nom}</td>
                    <td style={td}>{r.presence === "oui" ? "Oui" : "Non"}</td>
                    <td style={td}>
                      {r.presence === "oui" && Array.isArray(r.personnes) && r.personnes.length > 0 ? (
                        <div style={{ display: "grid", gap: 4 }}>
                          {r.personnes.map((p, i) => (
                            <div key={i}>
                              {p.nom || "—"} · {p.plat || "—"}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td style={td}>{r.allergies || "—"}</td>
                    <td style={td}>
                      <div>{r.email}</div>
                      <div>{r.tel}</div>
                    </td>
                    <td style={{ ...td, fontFamily: "ui-monospace, Menlo, monospace" }}>{r.code}</td>
                    <td style={td}>{formaterDate(r.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
