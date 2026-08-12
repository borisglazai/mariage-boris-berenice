"use client";

import { useEffect, useState } from "react";

const CIBLE = new Date("2026-10-03T15:00:00-04:00").getTime();

function computeParts() {
  let d = Math.max(0, CIBLE - Date.now());
  const jours = Math.floor(d / 86400000);
  d -= jours * 86400000;
  const heures = Math.floor(d / 3600000);
  d -= heures * 3600000;
  const minutes = Math.floor(d / 60000);
  d -= minutes * 60000;
  const secondes = Math.floor(d / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    jours: String(jours),
    heures: pad(heures),
    minutes: pad(minutes),
    secondes: pad(secondes),
  };
}

const unitStyle = {
  minWidth: 92,
  textAlign: "center",
  background: "#f5ead8",
  borderRadius: 20,
  padding: "14px 18px",
};

const numberStyle = {
  fontFamily: "var(--font-caprasimo), serif",
  fontSize: 34,
  lineHeight: 1,
  color: "#a05426",
};

const labelStyle = {
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#6b5f52",
  marginTop: 6,
  fontWeight: 600,
};

export default function Countdown() {
  const [parts, setParts] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock, avoids SSR/client time mismatch
    setParts(computeParts());
    const timer = setInterval(() => setParts(computeParts()), 1000);
    return () => clearInterval(timer);
  }, []);

  const display = parts ?? { jours: "—", heures: "—", minutes: "—", secondes: "—" };

  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <div style={unitStyle}>
        <div style={numberStyle}>{display.jours}</div>
        <div style={labelStyle}>Jours</div>
      </div>
      <div style={unitStyle}>
        <div style={numberStyle}>{display.heures}</div>
        <div style={labelStyle}>Heures</div>
      </div>
      <div style={unitStyle}>
        <div style={numberStyle}>{display.minutes}</div>
        <div style={labelStyle}>Minutes</div>
      </div>
      <div style={unitStyle}>
        <div style={numberStyle}>{display.secondes}</div>
        <div style={labelStyle}>Secondes</div>
      </div>
    </div>
  );
}
