"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const inputStyle = {
  border: "1px solid #d8c6aa",
  background: "#ffffff",
  borderRadius: 999,
  padding: "12px 18px",
  fontSize: 16,
  fontWeight: 400,
  color: "#201e1d",
};

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

export default function RsvpForm() {
  const [presence, setPresence] = useState("oui");
  const [nombre, setNombre] = useState(2);
  const [configErreur, setConfigErreur] = useState("");
  const [state, handleSubmit, reset] = useForm(FORMSPREE_ID || "");

  function envoyer(e) {
    if (!FORMSPREE_ID) {
      e.preventDefault();
      setConfigErreur(
        "Le formulaire n'est pas encore configuré (identifiant Formspree manquant). Voir le README du site."
      );
      return;
    }
    setConfigErreur("");
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
          Merci, c&apos;est noté !
        </p>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
          Votre réponse est enregistrée. Vous recevrez un courriel de confirmation, puis le plan
          détaillé en septembre.
        </p>
        <p style={{ margin: "10px 0 22px", fontSize: 15.5, color: "#6b5f52", fontStyle: "italic" }}>
          Your reply is in. A confirmation email is on its way.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-outline"
          style={{
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
    configErreur || (state.errors && !state.submitting
      ? "Un problème est survenu. Merci de réessayer ou de nous écrire directement."
      : "");

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
      <input type="hidden" name="presence" value={presence === "oui" ? "Présent(e)" : "Absent(e)"} />

      <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={labelStyle}>
          Nom et prénom · Full name
          <input name="nom" required placeholder="Aïcha Diallo" style={inputStyle} />
          <ValidationError prefix="Nom" field="nom" errors={state.errors} style={errorTextStyle} />
        </label>
        <label style={labelStyle}>
          Courriel · Email
          <input name="email" type="email" required placeholder="aicha@exemple.ca" style={inputStyle} />
          <ValidationError prefix="Courriel" field="email" errors={state.errors} style={errorTextStyle} />
        </label>
        <label style={labelStyle}>
          Téléphone · Phone
          <input name="tel" type="tel" placeholder="+1 613 555 0142" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Nombre de personnes · Party size
          <input
            name="nombre"
            type="number"
            min="1"
            max="8"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>Serez-vous là ? · Will you join us?</span>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button type="button" onClick={() => setPresence("oui")} style={presenceBtnStyle(presence === "oui")}>
            Oui, avec joie
          </button>
          <button type="button" onClick={() => setPresence("non")} style={presenceBtnStyle(presence === "non")}>
            Malheureusement non
          </button>
        </div>
      </div>

      <label style={labelStyle}>
        Noms des accompagnants · Names of your guests
        <input name="accompagnants" placeholder="Marc Diallo, Lina Diallo" style={inputStyle} />
      </label>

      <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <label style={labelStyle}>
          Enfants · Children
          <select name="enfants" style={inputStyle} defaultValue="Aucun enfant">
            <option>Aucun enfant</option>
            <option>1 enfant</option>
            <option>2 enfants</option>
            <option>3 enfants ou plus</option>
          </select>
        </label>
        <label style={labelStyle}>
          Navette souhaitée · Shuttle
          <select name="navette" style={inputStyle} defaultValue="Je viens en voiture">
            <option>Je viens en voiture</option>
            <option>Navette aller-retour</option>
            <option>Retour seulement</option>
          </select>
        </label>
      </div>

      <label style={labelStyle}>
        Régime alimentaire, allergies · Dietary needs
        <input name="regime" placeholder="Végétarien, sans arachides…" style={inputStyle} />
      </label>

      <label style={labelStyle}>
        Un mot pour les mariés · A note for us
        <textarea name="message" rows={4} placeholder="On a hâte…" style={textareaStyle} />
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
          {state.submitting ? "Envoi…" : "Envoyer ma réponse"}
        </button>
        <span style={{ fontSize: 14.5, color: erreurGenerale ? "#a05426" : "#6b5f52" }}>
          {erreurGenerale ||
            (presence === "non"
              ? "Vous nous manquerez — merci de nous prévenir."
              : "Réponse à envoyer avant le 1er août 2026.")}
        </span>
      </div>
    </form>
  );
}
