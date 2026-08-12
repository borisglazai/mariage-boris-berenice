import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";

const eyebrow = {
  margin: "0 0 12px",
  fontSize: 12.5,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#7a8a5e",
  fontWeight: 700,
};

const h2 = {
  fontFamily: "var(--font-caprasimo), serif",
  fontWeight: 400,
  fontSize: "clamp(34px, 4vw, 54px)",
  lineHeight: 1.02,
  margin: "0 0 12px",
  letterSpacing: "-0.015em",
};

const placeholderBox = {
  borderRadius: 24,
  background: "repeating-linear-gradient(135deg, #f0e2cb 0 10px, #fbf5ea 10px 20px)",
  border: "1px solid #e0cfb4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const placeholderLabel = {
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: 12,
  color: "#6b5f52",
};

const photoFilter = { filter: "saturate(0.72) contrast(0.94) sepia(0.12)" };

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "var(--font-figtree), system-ui, sans-serif",
        color: "#201e1d",
        background: "#f5ead8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <nav
        className="pad"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "14px 40px",
          background: "rgba(245,234,216,0.88)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e0cfb4",
        }}
      >
        <a
          href="#accueil"
          style={{
            fontFamily: "var(--font-caprasimo), serif",
            fontSize: 20,
            color: "#201e1d",
            letterSpacing: "-0.01em",
          }}
        >
          B<span style={{ color: "#c67139" }}>&amp;</span>B
        </a>
        <div
          className="navLinks"
          style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 14.5, fontWeight: 500 }}
        >
          <a href="#histoire" style={{ color: "#201e1d" }}>Notre histoire</a>
          <a href="#programme" style={{ color: "#201e1d" }}>Programme</a>
          <a href="#lieu" style={{ color: "#201e1d" }}>Lieu</a>
          <a href="#dresscode" style={{ color: "#201e1d" }}>Dress code</a>
          <a href="#cadeaux" style={{ color: "#201e1d" }}>Cadeaux</a>
          <a href="#faq" style={{ color: "#201e1d" }}>FAQ</a>
        </div>
        <a
          href="#rsvp"
          className="btn-fill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#fbf5ea",
            padding: "10px 20px",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 14.5,
          }}
        >
          Répondre · RSVP
        </a>
      </nav>

      <header id="accueil" className="pad" style={{ padding: "72px 40px 88px" }}>
        <div
          className="heroGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 56,
            alignItems: "end",
            maxWidth: 1240,
          }}
        >
          <div>
            <p style={eyebrow}>Nous nous marions · We&apos;re getting married</p>
            <h1
              className="bigName"
              style={{
                fontFamily: "var(--font-caprasimo), serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 8.4vw, 132px)",
                lineHeight: 0.92,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Boris<br /><span style={{ color: "#c67139" }}>&amp;</span> Bérénice
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "32px 0 0" }}>
              <span
                style={{
                  background: "#fbf5ea",
                  border: "1px solid #e0cfb4",
                  borderRadius: 999,
                  padding: "9px 18px",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Samedi 3 octobre 2026
              </span>
              <span
                style={{
                  background: "#fbf5ea",
                  border: "1px solid #e0cfb4",
                  borderRadius: 999,
                  padding: "9px 18px",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Ottawa, Ontario
              </span>
            </div>
            <p style={{ maxWidth: "46ch", fontSize: 18, lineHeight: 1.65, color: "#4a423a", margin: "28px 0 0" }}>
              Après dix ans à construire notre vie côte à côte, nous vous invitons à célébrer avec
              nous, une journée entière, au bord de la rivière.
            </p>
            <p
              style={{
                maxWidth: "50ch",
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "#6b5f52",
                fontStyle: "italic",
                margin: "10px 0 0",
              }}
            >
              After ten years side by side, we would love you with us for one full day by the
              river.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: -60,
                top: -40,
                width: 180,
                height: 180,
                borderRadius: 999,
                background: "#eccfae",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 18px 40px -22px rgba(32,30,29,0.35)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/boris-berenice-hero.jpeg"
                alt="Boris et Bérénice"
                style={{ display: "block", width: "100%", height: 520, objectFit: "cover", ...photoFilter }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1240,
            margin: "64px 0 0",
            background: "#fbf5ea",
            border: "1px solid #e0cfb4",
            borderRadius: 24,
            padding: "30px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 12.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a8a5e", fontWeight: 700 }}>
              Il reste · Counting down
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "#6b5f52" }}>Jusqu&apos;au 3 octobre 2026, 12 h 00</p>
          </div>
          <Countdown />
        </div>
      </header>

      <section id="histoire" className="pad" style={{ padding: "24px 40px 96px" }}>
        <div
          className="row2"
          style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, maxWidth: 1240, alignItems: "start" }}
        >
          <div style={{ borderRadius: 24, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/boris-berenice-histoire.jpeg"
              alt="Boris et Bérénice"
              style={{ display: "block", width: "100%", height: 480, objectFit: "cover", ...photoFilter }}
            />
          </div>
          <div>
            <p style={eyebrow}>Notre histoire · Our story</p>
            <h2 style={h2}>Dix ans, trois villes, une seule évidence</h2>
            <div style={{ display: "grid", gap: 22, maxWidth: "58ch" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#a05426" }}>2016 — La rencontre</p>
                <p style={{ margin: "6px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
                  Un anniversaire d&apos;ami, une playlist discutable, une conversation qui a duré
                  jusqu&apos;au petit matin.
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#a05426" }}>2019 — Le grand départ</p>
                <p style={{ margin: "6px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
                  Deux valises, un appartement trop petit à Ottawa et la certitude que c&apos;était le
                  bon.
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#a05426" }}>2025 — La demande</p>
                <p style={{ margin: "6px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
                  Une promenade au canal Rideau, un genou à terre dans le froid, et un oui
                  immédiat.
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#7a8a5e" }}>3 octobre 2026 — Vous</p>
                <p style={{ margin: "6px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4a423a" }}>
                  Il ne manque plus que les gens qu&apos;on aime. C&apos;est là que vous entrez en
                  scène.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="programme"
        className="pad"
        style={{ background: "#fbf5ea", borderTop: "1px solid #e0cfb4", borderBottom: "1px solid #e0cfb4", padding: "88px 40px" }}
      >
        <div style={{ maxWidth: 1240 }}>
          <p style={eyebrow}>Le jour J · The day</p>
          <h2 style={{ ...h2, margin: "0 0 12px" }}>Samedi 3 octobre, heure par heure</h2>
          <p style={{ margin: "0 0 44px", fontSize: 16, color: "#6b5f52", fontStyle: "italic" }}>
            One day, one place — everything happens on the same estate.
          </p>
          <div className="row3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {[
              {
                heure: "11 h 30",
                titre: "Accueil des invités",
                texte: "Arrivée des invités a l'église Vases d'Honneur d'Ottawa. Merci d'être assis à 12 h 00.",
                en: "Guest arrival — please be seated",
                color: "#c67139",
              },
              {
                heure: "12 h 00 - 12 h 30",
                titre: "Mariage civil",
                texte: "Un célébrant officiel sera sur place pour procéder au mariage civil.",
                en: "Outdoor ceremony under the maples.",
                color: "#c67139",
              },
              {
                heure: "12 h 30 - 14 h 00",
                titre: "Bénédiction nuptiale",
                texte: "Notre union sera bénie devant Dieu et devant les hommes.",
                en: "Cocktail hour and photo booth.",
                color: "#c67139",
              },
              {
                heure: "15 h 30 - 16 h 00",
                titre: "Cocktail de bienvenue",
                texte: "Un cocktail vous sera servi en attendant l'arrivée des mariés",
                en: "Seated dinner, three courses, speeches in between.",
                color: "#7a8a5e",
              },
              {
                heure: "16 h 00 - 22 h 00",
                titre: "Réception",
                texte: "Un souper vous sera servie suivie d'une fête pour célébrer l'union",
                en: "First dance, then dancing until 2 am.",
                color: "#7a8a5e",
              },
              {
                heure: "00 h 30",
                titre: "Soupe à l'oignon",
                texte: "La tradition. Puis navettes vers le centre-ville à 1 h et 2 h.",
                en: "Late-night soup, shuttles at 1 and 2 am.",
                color: "#7a8a5e",
              },
            ].map((item) => (
              <div key={item.heure + item.titre} style={{ background: "#f5ead8", borderRadius: 24, padding: 28 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-caprasimo), serif", fontSize: 30, color: item.color }}>
                  {item.heure}
                </p>
                <p style={{ margin: "10px 0 0", fontWeight: 700, fontSize: 18 }}>{item.titre}</p>
                <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>{item.texte}</p>
                <p style={{ margin: "8px 0 0", fontSize: 14.5, color: "#6b5f52", fontStyle: "italic" }}>{item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lieu" className="pad" style={{ padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1240, alignItems: "start" }}>
          <div>
            <p style={eyebrow}>Lieu &amp; itinéraire · Getting there</p>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>Centre récréatif de Bourget</h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#4a423a", maxWidth: "46ch" }}>
              19 Lavigne Street, Bourget, ON, K0A 1E0
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "26px 0 34px" }}>
              <a
                href="https://maps.google.com/?q=19+Lavigne+Street+Bourget+ON"
                className="btn-fill"
                style={{ color: "#fbf5ea", padding: "12px 22px", borderRadius: 999, fontWeight: 600 }}
              >
                Ouvrir dans Maps
              </a>
              <a
                href="#rsvp"
                className="btn-outline"
                style={{ border: "1.5px solid #201e1d", color: "#201e1d", padding: "12px 22px", borderRadius: 999, fontWeight: 600 }}
              >
                Confirmer ma présence
              </a>
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>En voiture · By car</p>
                <p style={{ margin: "5px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                  Stationnement gratuit sur place, 120 places.
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Depuis le centre d&apos;Ottawa · From downtown</p>
                <p style={{ margin: "5px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                  Taxi ou Uber, environ 20$ CAD.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              ...placeholderBox,
              border: "1px solid #e0cfb4",
              minHeight: 480,
              padding: 32,
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13, color: "#6b5f52", lineHeight: 1.7, margin: 0 }}>
              carte du domaine
              <br />
              ou capture Google Maps
              <br />
              (1200 × 900)
            </p>
          </div>
        </div>
      </section>

      <section id="dresscode" className="pad" style={{ background: "#201e1d", color: "#f5ead8", padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1240, alignItems: "center" }}>
          <div>
            <p style={{ ...eyebrow, color: "#9db07a" }}>Dress code</p>
            <h2 style={{ ...h2, margin: "0 0 20px", color: "#f5ead8" }}>Tenue de ville, tons d&apos;automne</h2>
            <p style={{ margin: "0 0 14px", fontSize: 18, lineHeight: 1.6, color: "#ded1bb", maxWidth: "48ch" }}>
              Élégant sans être guindé. Pensez terracotta, sauge, crème, brun chaud.
            </p>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#b6ad9b", fontStyle: "italic", maxWidth: "52ch" }}>
              Smart attire in autumn tones. Ceremony and cocktails are on grass — kind shoes
              recommended. Please, no white or ivory.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {["#c67139", "#7a8a5e", "#eccfae", "#6b5f52", "#a05426", "#5d6b45"].map((c) => (
              <div key={c} style={{ width: 108, height: 108, borderRadius: 999, background: c }} />
            ))}
          </div>
        </div>
      </section>

      <section id="cortege" className="pad" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 1240 }}>
          <p style={eyebrow}>Témoins &amp; cortège · The wedding party</p>
          <h2 style={{ ...h2, margin: "0 0 12px" }}>Les gens sur qui on compte</h2>
          <p style={{ margin: "0 0 40px", fontSize: 16, color: "#6b5f52", maxWidth: "52ch" }}>
            En cas de question le jour même, adressez-vous à eux plutôt qu&apos;aux mariés ils
            savent tout.
          </p>
          <div className="row3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {[
              { nom: "Aïcha D.", role: "Témoin de Bérénice", roleColor: "#a05426", texte: "Amie depuis la première année de fac. Responsable du discours qu'on redoute." },
              { nom: "Marc T.", role: "Témoin de Boris", roleColor: "#a05426", texte: "Frère et co-conspirateur. Gère les navettes et les imprévus." },
              { nom: "Lina & Noé", role: "Enfants d'honneur", roleColor: "#7a8a5e", texte: "6 et 8 ans. Chargés des pétales, avec une marge d'improvisation." },
              { nom: "Claire M.", role: "Maîtresse de cérémonie", roleColor: "#7a8a5e", texte: "Le contact du jour J : +1 613 555 0142." },
            ].map((p) => (
              <div key={p.nom}>
                <div style={{ ...placeholderBox, height: 230 }}>
                  <span style={placeholderLabel}>portrait</span>
                </div>
                <p style={{ margin: "14px 0 0", fontWeight: 700, fontSize: 17 }}>{p.nom}</p>
                <p style={{ margin: "3px 0 0", fontSize: 15, color: p.roleColor, fontWeight: 600 }}>{p.role}</p>
                <p style={{ margin: "6px 0 0", fontSize: 15, color: "#4a423a", lineHeight: 1.5 }}>{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="galerie"
        className="pad"
        style={{ background: "#fbf5ea", borderTop: "1px solid #e0cfb4", borderBottom: "1px solid #e0cfb4", padding: "88px 40px" }}
      >
        <div style={{ maxWidth: 1240 }}>
          <p style={eyebrow}>Galerie · Gallery</p>
          <h2 style={{ ...h2, margin: "0 0 12px" }}>Avant, et bientôt après</h2>
          <p style={{ margin: "0 0 40px", fontSize: 16, color: "#6b5f52", maxWidth: "54ch" }}>
            Les photos du mariage seront ajoutées ici quelques semaines après le 3 octobre.{" "}
            <span style={{ fontStyle: "italic" }}>Wedding photos will appear here a few weeks after the day.</span>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            <div style={{ borderRadius: 24, overflow: "hidden", gridRow: "span 2" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/boris-berenice-hero.jpeg"
                alt=""
                style={{ display: "block", width: "100%", height: "100%", minHeight: 420, objectFit: "cover", ...photoFilter }}
              />
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/boris-berenice-histoire.jpeg"
                alt=""
                style={{ display: "block", width: "100%", height: 200, objectFit: "cover", objectPosition: "50% 20%", ...photoFilter }}
              />
            </div>
            {["photo fiançailles", "le domaine", "Ottawa, automne"].map((label) => (
              <div key={label} style={{ ...placeholderBox, height: 200 }}>
                <span style={placeholderLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cadeaux" className="pad" style={{ padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1240, alignItems: "start" }}>
          <div>
            <p style={eyebrow}>Liste de mariage · Registry</p>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>Votre présence suffit</h2>
            <p style={{ margin: "0 0 14px", fontSize: 18, lineHeight: 1.6, color: "#4a423a", maxWidth: "48ch" }}>
              Mais si vous souhaitez marquer le coup, voici ce qui nous ferait plaisir.
            </p>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#6b5f52", fontStyle: "italic", maxWidth: "50ch" }}>
              Your presence is the gift. If you&apos;d like to do more, we&apos;re saving for a
              trip to Senegal and for the house.
            </p>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "#fbf5ea", border: "1px solid #e0cfb4", borderRadius: 24, padding: "26px 28px" }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Liste maison</p>
              <p style={{ margin: "8px 0 16px", fontSize: 16, color: "#4a423a", lineHeight: 1.55 }}>
                Quelques objets choisis, à tous les budgets, chez un détaillant d&apos;Ottawa.
              </p>
              <a
                href="https://www.amazon.ca/wedding/share/borisberenice"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: "inline-block", border: "1.5px solid #201e1d", color: "#201e1d", padding: "11px 20px", borderRadius: 999, fontWeight: 600, fontSize: 15 }}
              >
                Voir la liste
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp" className="pad" style={{ background: "#7a8a5e", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1000 }}>
          <p style={{ ...eyebrow, color: "#e9efdb" }}>RSVP</p>
          <h2 style={{ ...h2, margin: "0 0 12px", color: "#fbf5ea" }}>Dites-nous si vous venez</h2>
          <p style={{ margin: "0 0 36px", fontSize: 17, color: "#f0f3e7", maxWidth: "56ch" }}>
            Merci de répondre avant le <strong>1er Septembre 2026</strong>, une réponse par foyer.{" "}
            <span style={{ fontStyle: "italic" }}>Please reply by 1 August 2026 — one response per household.</span>
          </p>
          <RsvpForm />
        </div>
      </section>

      <section id="faq" className="pad" style={{ padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 48, maxWidth: 1240, alignItems: "start" }}>
          <div>
            <p style={eyebrow}>FAQ</p>
            <h2 style={{ ...h2, margin: 0 }}>Les questions qu&apos;on nous pose</h2>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              {
                q: "Les enfants sont-ils bienvenus ?",
                a: "Oui, jusqu'au dîner. Une salle calme avec une garde d'enfants est ouverte de 18 h à minuit — indiquez-le dans votre réponse.",
              },
              {
                q: "Où dormir à proximité ?",
                a: "Deux blocs de chambres sont réservés à l'hôtel Bytown et à l'auberge Riverside, code « BORISBERENICE », jusqu'au 1er septembre 2026.",
              },
              {
                q: "Puis-je venir accompagné ?",
                a: "Si votre invitation mentionne « et son / sa +1 », oui, avec plaisir. Merci d'indiquer son nom dans le formulaire.",
              },
              {
                q: "Photos pendant la cérémonie ?",
                a: "Téléphones rangés pendant les vœux, puis photographiez autant que vous voulez. Partagez avec #BorisBerenice2026.",
              },
              {
                q: "Et s'il pleut ? · What if it rains?",
                a: (
                  <>
                    La grange couverte accueille la cérémonie en cas de pluie. Rien ne change pour
                    vous, sauf les chaussures.{" "}
                    <span style={{ fontStyle: "italic" }}>The covered barn is our rain plan.</span>
                  </>
                ),
              },
              {
                q: "Jusqu'à quand puis-je répondre ?",
                a: "Le 1er août 2026. Après cette date, le traiteur fixe les quantités et nous ne pouvons plus ajouter de couvert.",
              },
            ].map((item) => (
              <details key={item.q} style={{ background: "#fbf5ea", border: "1px solid #e0cfb4", borderRadius: 20, padding: "20px 24px" }}>
                <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 17, listStyle: "none" }}>{item.q}</summary>
                <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4a423a" }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="pad" style={{ background: "#201e1d", color: "#f5ead8", padding: "72px 40px 56px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, maxWidth: 1240 }}>
          <div>
            <p style={{ ...eyebrow, color: "#9db07a" }}>Contact</p>
            <h2 style={{ fontFamily: "var(--font-caprasimo), serif", fontWeight: 400, fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.05, margin: "0 0 18px", color: "#f5ead8" }}>
              Une question ? Écrivez-nous
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#ded1bb", maxWidth: "46ch" }}>
              Le plus simple reste le courriel — nous répondons sous quelques jours. Le jour J,
              appelez Claire, notre maîtresse de cérémonie.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 26, margin: "26px 0 0" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b6ad9b", fontWeight: 700 }}>
                  Courriel
                </p>
                <a href="mailto:borisberenice2026@exemple.ca" style={{ color: "#f0b183", fontSize: 17, fontWeight: 600 }}>
                  borisberenice2026@exemple.ca
                </a>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b6ad9b", fontWeight: 700 }}>
                  Jour J · Claire
                </p>
                <a href="tel:+16135550142" style={{ color: "#f0b183", fontSize: 17, fontWeight: 600 }}>
                  +1 613 555 0142
                </a>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <a href="#rsvp" className="btn-fill" style={{ color: "#fbf5ea", padding: "14px 26px", borderRadius: 999, fontWeight: 700, textAlign: "center" }}>
              Répondre à l&apos;invitation
            </a>
            <a
              href="https://maps.google.com/?q=19+Lavigne+Street+Bourget+ON"
              className="btn-outline-dark"
              style={{ border: "1.5px solid #6b5f52", color: "#f5ead8", padding: "14px 26px", borderRadius: 999, fontWeight: 600, textAlign: "center" }}
            >
              Itinéraire vers le domaine
            </a>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "#b6ad9b", lineHeight: 1.6 }}>
              Boris &amp; Bérénice · 3 octobre 2026 · Ottawa
              <br />
              #BorisBerenice2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
