"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const STOCKAGE_CLE = "rsvp-boris-berenice";

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

const errorTextStyle = {
  margin: 0,
  fontSize: 13,
  color: "#a05426",
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

const ETAT_INITIAL = {
  nom: "",
  email: "",
  tel: "",
  presence: "",
  nombre: 2,
  enfants: "Aucun enfant",
  allergies: "",
  message: "",
  personnes: resizePersonnes([], 2),
};

export default function RsvpForm() {
  const [nom, setNom] = useState(ETAT_INITIAL.nom);
  const [email, setEmail] = useState(ETAT_INITIAL.email);
  const [tel, setTel] = useState(ETAT_INITIAL.tel);
  const [presence, setPresence] = useState(ETAT_INITIAL.presence);
  const [nombre, setNombre] = useState(ETAT_INITIAL.nombre);
  const [enfants, setEnfants] = useState(ETAT_INITIAL.enfants);
  const [allergies, setAllergies] = useState(ETAT_INITIAL.allergies);
  const [message, setMessage] = useState(ETAT_INITIAL.message);
  const [personnes, setPersonnes] = useState(ETAT_INITIAL.personnes);
  const [personne1Touchee, setPersonne1Touchee] = useState(false);
  const [dejaRepondu, setDejaRepondu] = useState(false);
  const [configErreur, setConfigErreur] = useState("");
  const [state, handleSubmit, reset] = useForm(FORMSPREE_ID || "");

  useEffect(() => {
    let sauvegarde = null;
    try {
      sauvegarde = JSON.parse(localStorage.getItem(STOCKAGE_CLE) || "null");
    } catch {
      sauvegarde = null;
    }
    if (!sauvegarde) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage, client-only by nature
    setNom(sauvegarde.nom || "");
    setEmail(sauvegarde.email || "");
    setTel(sauvegarde.tel || "");
    setPresence(sauvegarde.presence || "");
    setNombre(sauvegarde.nombre || 2);
    setEnfants(sauvegarde.enfants || "Aucun enfant");
    setAllergies(sauvegarde.allergies || "");
    setMessage(sauvegarde.message || "");
    setPersonnes(resizePersonnes(sauvegarde.personnes || [], sauvegarde.nombre || 2));
    setPersonne1Touchee(true);
    setDejaRepondu(true);
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

  function modifierReponse() {
    reset();
  }

  function envoyer(e) {
    if (!FORMSPREE_ID) {
      e.preventDefault();
      setConfigErreur(
        "Le formulaire n'est pas encore configuré (identifiant Formspree manquant)."
      );
      return;
    }
    if (!presence) {
      e.preventDefault();
      setConfigErreur("Merci d'indiquer si vous serez des nôtres.");
      return;
    }
    setConfigErreur("");
    try {
      localStorage.setItem(
        STOCKAGE_CLE,
        JSON.stringify({ nom, email, tel, presence, nombre, enfants, allergies, message, personnes })
      );
    } catch {
      // stockage indisponible (navigation privée, etc.) — l'envoi continue normalement
    }
    handleSubmit(e);
  }

  if (state.succeeded) {
    return (
      <div
        style={{
          background: "#fbf5ea",
          borderRadius: 24,
          padding: "40px 36px",
          maxWidth: 620,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-caprasimo), serif",
            fontSize: 30,
            margin: "0 0 12px",
            color: "#201e1d",
          }}
        >
          Merci !
        </p>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
          Votre réponse a bien été enregistrée. Nous avons hâte de vous retrouver le 3 octobre.
        </p>
        <button
          type="button"
          onClick={modifierReponse}
          className="btn-outline"
          style={{
            marginTop: 22,
            border: "1.5px solid #201e1d",
            color: "#201e1d",
            padding: "11px 22px",
            borderRadius: 999,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Modifier ma réponse
        </button>
      </div>
    );
  }

  const erreurGenerale =
    configErreur ||
    (state.errors && !state.submitting
      ? "Un problème est survenu. Merci de réessayer ou de nous écrire directement."
      : "");

  const nomEffectifPersonne1 = personne1Touchee ? personnes[0]?.nom ?? "" : nom;

  return (
    <form
      onSubmit={envoyer}
      style={{
        background: "#fbf5ea",
        borderRadius: 24,
        padding: 36,
        display: "grid",
        gap: 22,
        maxWidth: 860,
      }}
    >
      {dejaRepondu && (
        <p style={{ margin: 0, fontSize: 14, color: "#7a8a5e", fontWeight: 600 }}>
          Nous avons retrouvé votre réponse précédente sur cet appareil — modifiez ce qu&apos;il faut,
          l&apos;envoi remplacera votre réponse dans notre suivi.
        </p>
      )}

      <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={labelStyle}>
          Nom et prénom
          <input
            name="nom"
            required
            placeholder="Votre nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={inputStyle}
          />
          <ValidationError prefix="Nom" field="nom" errors={state.errors} style={errorTextStyle} />
        </label>
        <label style={labelStyle}>
          Courriel
          <input
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <ValidationError prefix="Courriel" field="email" errors={state.errors} style={errorTextStyle} />
        </label>
        <label style={labelStyle}>
          Téléphone
          <input
            name="tel"
            type="tel"
            required
            placeholder="613 000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>Serez-vous des nôtres ?</span>
        <input type="hidden" name="presence" value={presence === "oui" ? "Présent(e)" : presence === "non" ? "Absent(e)" : ""} />
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
                  <option key={n} value={n}>
                    {n}
                  </option>
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
                      value={index === 0 ? nomEffectifPersonne1 : personne.nom}
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
                      <option value="" disabled>
                        Choisir un plat…
                      </option>
                      {MENU_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <label style={labelStyle}>
            Allergies ou restrictions alimentaires
            <input
              name="allergies"
              placeholder="Facultatif"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              style={inputStyle}
            />
          </label>
        </div>
      )}

      <label style={labelStyle}>
        Un mot pour les mariés
        <textarea
          name="message"
          rows={4}
          placeholder="Facultatif"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textareaStyle}
        />
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={state.submitting}
          className="btn-fill"
          style={{
            color: "#fbf5ea",
            border: "none",
            padding: "14px 30px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 16,
            cursor: state.submitting ? "default" : "pointer",
            opacity: state.submitting ? 0.7 : 1,
          }}
        >
          {state.submitting ? "Envoi…" : dejaRepondu ? "Renvoyer ma réponse" : "Envoyer ma réponse"}
        </button>
        <span style={{ fontSize: 14.5, color: erreurGenerale ? "#a05426" : "#6b5f52" }}>
          {erreurGenerale || "Réponse à envoyer avant le 1er septembre 2026."}
        </span>
      </div>
    </form>
  );
}
