"use client";

import { useEffect, useState } from "react";

const STOCKAGE_CLE = "rsvp-boris-berenice-code";

const MENU_OPTIONS = [
  "Riz gras au poulet",
  "Riz gras à la chèvre",
  "Pommes de terre et poulet façon fassi",
  "Attiéké au porc",
  "Alloco au porc",
];

const inputStyle = {
  border: "1px solid #d8c6aa",
  background: "#ffffff",
  borderRadius: 999,
  padding: "12px 18px",
  fontSize: 16,
  fontWeight: 400,
  color: "#201e1d",
};

const selectStyle = { ...inputStyle };

const textareaStyle = {
  ...inputStyle,
  borderRadius: 18,
  resize: "vertical",
};

const labelStyle = {
  display: "grid",
  gap: 7,
  fontSize: 14.5,
  fontWeight: 600,
};

const personCardStyle = {
  background: "#f5ead8",
  border: "1px solid #e0cfb4",
  borderRadius: 18,
  padding: "18px 20px",
  display: "grid",
  gap: 14,
};

function presenceBtnStyle(actif) {
  return actif
    ? {
        background: "#7a8a5e",
        color: "#fbf5ea",
        border: "1.5px solid #7a8a5e",
        padding: "12px 24px",
        borderRadius: 999,
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
      }
    : {
        background: "transparent",
        color: "#201e1d",
        border: "1.5px solid #d8c6aa",
        padding: "12px 24px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
      };
}

function resizePersonnes(personnes, nombre) {
  const next = personnes.slice(0, nombre);
  while (next.length < nombre) next.push({ nom: "", plat: "" });
  return next;
}

function appliquerReponse(donnees, setters) {
  setters.setCode(donnees.code || "");
  setters.setNom(donnees.nom || "");
  setters.setEmail(donnees.email || "");
  setters.setTel(donnees.tel || "");
  setters.setPresence(donnees.presence || "");
  const n = donnees.nombre || 1;
  setters.setNombre(n);
  setters.setEnfants(donnees.enfants || "Aucun enfant");
  setters.setAllergies(donnees.allergies || "");
  setters.setMessage(donnees.message || "");
  setters.setPersonnes(resizePersonnes(donnees.personnes || [], donnees.presence === "oui" ? n : n));
  setters.setPersonne1Touchee(true);
  setters.setDejaRepondu(true);
}

export default function RsvpForm() {
  const [code, setCode] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [presence, setPresence] = useState("");
  const [nombre, setNombre] = useState(2);
  const [enfants, setEnfants] = useState("Aucun enfant");
  const [allergies, setAllergies] = useState("");
  const [message, setMessage] = useState("");
  const [personnes, setPersonnes] = useState(() => resizePersonnes([], 2));
  const [personne1Touchee, setPersonne1Touchee] = useState(false);
  const [dejaRepondu, setDejaRepondu] = useState(false);

  const [codeSaisi, setCodeSaisi] = useState("");
  const [rechercheEnCours, setRechercheEnCours] = useState(false);
  const [rechercheErreur, setRechercheErreur] = useState("");
  const [boiteRechercheOuverte, setBoiteRechercheOuverte] = useState(false);

  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [envoiErreur, setEnvoiErreur] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [codeCopie, setCodeCopie] = useState(false);

  const setters = {
    setCode, setNom, setEmail, setTel, setPresence, setNombre, setEnfants,
    setAllergies, setMessage, setPersonnes, setPersonne1Touchee, setDejaRepondu,
  };

  useEffect(() => {
    const codeSauvegarde = localStorage.getItem(STOCKAGE_CLE);
    if (!codeSauvegarde) return;
    fetch(`/api/rsvp/${codeSauvegarde}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((donnees) => {
        if (donnees) {
          appliquerReponse(donnees, setters);
        } else {
          localStorage.removeItem(STOCKAGE_CLE);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changerNombre(e) {
    const n = Number(e.target.value);
    setNombre(n);
    setPersonnes((prev) => resizePersonnes(prev, n));
  }

  function changerPersonneNom(index, valeur) {
    setPersonnes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], nom: valeur };
      return next;
    });
    if (index === 0) setPersonne1Touchee(true);
  }

  function changerPersonnePlat(index, valeur) {
    setPersonnes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], plat: valeur };
      return next;
    });
  }

  async function rechercherParCode(e) {
    e.preventDefault();
    const c = codeSaisi.trim().toUpperCase();
    if (!c) return;
    setRechercheEnCours(true);
    setRechercheErreur("");
    try {
      const res = await fetch(`/api/rsvp/${c}`);
      if (!res.ok) {
        setRechercheErreur("Aucune réponse trouvée pour ce code.");
        setRechercheEnCours(false);
        return;
      }
      const donnees = await res.json();
      appliquerReponse(donnees, setters);
      localStorage.setItem(STOCKAGE_CLE, donnees.code);
      setBoiteRechercheOuverte(false);
    } catch {
      setRechercheErreur("Un problème est survenu. Réessayez.");
    } finally {
      setRechercheEnCours(false);
    }
  }

  function modifierReponse() {
    setEnvoye(false);
    setCodeCopie(false);
  }

  function copierCode() {
    navigator.clipboard?.writeText(code).then(() => {
      setCodeCopie(true);
      setTimeout(() => setCodeCopie(false), 2000);
    });
  }

  async function envoyer(e) {
    e.preventDefault();
    if (!presence) {
      setEnvoiErreur("Merci d'indiquer si vous serez des nôtres.");
      return;
    }
    setEnvoiErreur("");
    setEnvoiEnCours(true);
    try {
      const personnesAEnvoyer = personnes.map((p, i) =>
        i === 0 && !personne1Touchee ? { ...p, nom } : p
      );
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code || undefined,
          nom, email, tel, presence, nombre, enfants, allergies, message,
          personnes: personnesAEnvoyer,
        }),
      });
      const donnees = await res.json();
      if (!res.ok) {
        setEnvoiErreur(donnees.erreur || "Un problème est survenu. Merci de réessayer.");
        setEnvoiEnCours(false);
        return;
      }
      setCode(donnees.code);
      localStorage.setItem(STOCKAGE_CLE, donnees.code);
      setDejaRepondu(true);
      setEnvoye(true);
    } catch {
      setEnvoiErreur("Un problème est survenu. Merci de réessayer ou de nous écrire directement.");
    } finally {
      setEnvoiEnCours(false);
    }
  }

  if (envoye) {
    return (
      <div style={{ background: "#fbf5ea", borderRadius: 24, padding: "40px 36px", maxWidth: 620 }}>
        <p style={{ fontFamily: "var(--font-caprasimo), serif", fontSize: 30, margin: "0 0 12px", color: "#201e1d" }}>
          Merci !
        </p>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
          Votre réponse a bien été enregistrée. Nous avons hâte de vous retrouver le 3 octobre.
        </p>

        <div style={{ background: "#f5ead8", border: "1px solid #e0cfb4", borderRadius: 18, padding: "20px 22px", margin: "22px 0" }}>
          <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#7a8a5e", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Votre code personnel
          </p>
          <p style={{ margin: 0, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 24, fontWeight: 700, color: "#201e1d", letterSpacing: "0.05em" }}>
            {code}
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "#6b5f52" }}>
            Conservez-le : il permet de retrouver et modifier votre réponse plus tard, depuis n&apos;importe quel appareil.
          </p>
          <button
            type="button"
            onClick={copierCode}
            className="btn-outline"
            style={{ marginTop: 12, border: "1.5px solid #201e1d", color: "#201e1d", padding: "8px 16px", borderRadius: 999, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}
          >
            {codeCopie ? "Copié !" : "Copier le code"}
          </button>
        </div>

        <button
          type="button"
          onClick={modifierReponse}
          className="btn-outline"
          style={{ border: "1.5px solid #201e1d", color: "#201e1d", padding: "11px 22px", borderRadius: 999, fontWeight: 600, cursor: "pointer" }}
        >
          Modifier ma réponse
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 860 }}>
      {!dejaRepondu && (
        <div style={{ background: "#f5ead8", border: "1px solid #e0cfb4", borderRadius: 18, padding: "16px 20px" }}>
          {boiteRechercheOuverte ? (
            <form onSubmit={rechercherParCode} style={{ display: "grid", gap: 10 }}>
              <span style={{ fontSize: 14.5, fontWeight: 700 }}>J&apos;ai déjà répondu — retrouver ma réponse</span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  name="codePersonnel"
                  value={codeSaisi}
                  onChange={(e) => setCodeSaisi(e.target.value)}
                  placeholder="Code personnel"
                  style={{ ...inputStyle, flex: "1 1 200px" }}
                />
                <button
                  type="submit"
                  disabled={rechercheEnCours}
                  className="btn-outline"
                  style={{ border: "1.5px solid #201e1d", color: "#201e1d", padding: "12px 20px", borderRadius: 999, fontWeight: 600, cursor: "pointer" }}
                >
                  {rechercheEnCours ? "Recherche…" : "Retrouver ma réponse"}
                </button>
              </div>
              {rechercheErreur && <span style={{ fontSize: 13.5, color: "#a05426" }}>{rechercheErreur}</span>}
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setBoiteRechercheOuverte(true)}
              style={{ background: "none", border: "none", padding: 0, fontSize: 14.5, fontWeight: 700, color: "#201e1d", textDecoration: "underline", cursor: "pointer" }}
            >
              J&apos;ai déjà répondu — modifier ma réponse
            </button>
          )}
        </div>
      )}

      <form
        onSubmit={envoyer}
        style={{ background: "#fbf5ea", borderRadius: 24, padding: 36, display: "grid", gap: 22 }}
      >
        {dejaRepondu && (
          <p style={{ margin: 0, fontSize: 14, color: "#7a8a5e", fontWeight: 600 }}>
            Nous avons retrouvé votre réponse — modifiez ce qu&apos;il faut, l&apos;envoi remplacera votre réponse précédente.
          </p>
        )}

        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <label style={labelStyle}>
            Nom et prénom
            <input name="nom" autoComplete="name" required placeholder="Votre nom complet" value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Courriel
            <input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Téléphone
            <input name="tel" type="tel" autoComplete="tel" required placeholder="613 000-0000" value={tel} onChange={(e) => setTel(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={{ display: "grid", gap: 9 }}>
          <span style={{ fontSize: 14.5, fontWeight: 600 }}>Serez-vous des nôtres ?</span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" onClick={() => setPresence("oui")} style={presenceBtnStyle(presence === "oui")}>
              Oui, avec joie
            </button>
            <button type="button" onClick={() => setPresence("non")} style={presenceBtnStyle(presence === "non")}>
              Malheureusement non
            </button>
          </div>
        </div>

        {presence === "oui" && (
          <div style={{ display: "grid", gap: 22 }}>
            <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <label style={labelStyle}>
                Nombre de personnes
                <select name="nombre" value={nombre} onChange={changerNombre} style={selectStyle}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label style={labelStyle}>
                Enfants
                <select name="enfants" value={enfants} onChange={(e) => setEnfants(e.target.value)} style={selectStyle}>
                  <option>Aucun enfant</option>
                  <option>1 enfant</option>
                  <option>2 enfants</option>
                  <option>3 enfants ou plus</option>
                </select>
              </label>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <span style={{ fontSize: 14.5, fontWeight: 600 }}>Choix du plat, par personne</span>
              {personnes.map((personne, index) => (
                <div key={index} style={personCardStyle}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#a05426", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Personne {index + 1}
                  </span>
                  <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <label style={labelStyle}>
                      Nom complet
                      <input
                        name={`personne_${index + 1}_nom`}
                        required
                        placeholder="Nom complet"
                        value={index === 0 && !personne1Touchee ? nom : personne.nom}
                        onChange={(e) => changerPersonneNom(index, e.target.value)}
                        style={inputStyle}
                      />
                    </label>
                    <label style={labelStyle}>
                      Plat
                      <select
                        name={`personne_${index + 1}_plat`}
                        required
                        value={personne.plat}
                        onChange={(e) => changerPersonnePlat(index, e.target.value)}
                        style={selectStyle}
                      >
                        <option value="" disabled>Choisir un plat…</option>
                        {MENU_OPTIONS.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <label style={labelStyle}>
              Allergies ou restrictions alimentaires
              <input name="allergies" placeholder="Facultatif" value={allergies} onChange={(e) => setAllergies(e.target.value)} style={inputStyle} />
            </label>
          </div>
        )}

        <label style={labelStyle}>
          Un mot pour les mariés
          <textarea name="message" rows={4} placeholder="Facultatif" value={message} onChange={(e) => setMessage(e.target.value)} style={textareaStyle} />
        </label>

        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={envoiEnCours}
            className="btn-fill"
            style={{
              color: "#fbf5ea", border: "none", padding: "14px 30px", borderRadius: 999,
              fontWeight: 700, fontSize: 16, cursor: envoiEnCours ? "default" : "pointer", opacity: envoiEnCours ? 0.7 : 1,
            }}
          >
            {envoiEnCours ? "Envoi…" : dejaRepondu ? "Renvoyer ma réponse" : "Envoyer ma réponse"}
          </button>
          <span style={{ fontSize: 14.5, color: envoiErreur ? "#a05426" : "#6b5f52" }}>
            {envoiErreur || "Réponse à envoyer avant le 1er septembre 2026."}
          </span>
        </div>
      </form>
    </div>
  );
}
