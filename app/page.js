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

const photoFilter = { filter: "saturate(0.72) contrast(0.94) sepia(0.12)" };

const venueCardStyle = {
  background: "#fbf5ea",
  border: "1px solid #e0cfb4",
  borderRadius: 24,
  padding: 28,
  display: "grid",
  gap: 14,
};

const mapFrameStyle = {
  border: "1px solid #e0cfb4",
  borderRadius: 16,
  width: "100%",
  height: 220,
  display: "block",
};

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Mariage de Boris & Bérénice") +
  "&dates=" + "20261003T153000Z/20261004T020000Z" +
  "&details=" + encodeURIComponent(
    "Cérémonie à l'église Vases d'Honneur Ottawa de 11 h 30 à 14 h 30, puis réception au Centre communautaire de Bourget (19, rue Lavigne, Bourget, ON) à partir de 15 h 30. Détails complets : https://mariage-boris-berenice.vercel.app"
  ) +
  "&location=" + encodeURIComponent("Église Vases d'Honneur Ottawa, 4090 Belgreen Drive, unité 4, Ottawa, ON K1G 3N2");

const PROGRAMME = [
  {
    heure: "11 h 30",
    titre: "Accueil des invités",
    texte: "Arrivée à l'église Vases d'Honneur. Merci d'être assis pour 11 h 55.",
    color: "#c67139",
  },
  {
    heure: "12 h 00 – 12 h 30",
    titre: "Mariage civil",
    texte: "Célébration officielle et signature des registres.",
    color: "#c67139",
  },
  {
    heure: "12 h 30 – 14 h 30",
    titre: "Bénédiction nuptiale",
    texte: "Notre union sera bénie devant Dieu et devant vous.",
    color: "#c67139",
  },
  {
    heure: "14 h 30 – 15 h 30",
    titre: "Route vers Bourget",
    texte: "Environ 35 minutes de trajet. Prenez votre temps, roulez prudemment.",
    color: "#7a8a5e",
  },
  {
    heure: "À partir de 15 h 30",
    titre: "Cocktail de bienvenue",
    texte: "Rafraîchissements en attendant l'arrivée des mariés.",
    color: "#7a8a5e",
  },
  {
    heure: "16 h 00",
    titre: "Ouverture de la réception",
    texte: "Entrée des mariés et début des festivités.",
    color: "#7a8a5e",
  },
  {
    heure: "16 h 30",
    titre: "Souper",
    texte: "Service du repas que vous aurez choisi.",
    color: "#7a8a5e",
  },
  {
    heure: "Jusqu'à 22 h 00",
    titre: "Célébration",
    texte: "Musique, danse et joie partagée.",
    color: "#7a8a5e",
  },
];

const FAQ = [
  {
    q: "À quelle heure dois-je arriver ?",
    a: "À 11 h 30 à l'église Vases d'Honneur. Le mariage civil débute à 12 h 00 précises, merci d'être installé pour 11 h 55.",
  },
  {
    q: "Faut-il se déplacer entre les deux lieux ?",
    a: "Oui. La cérémonie a lieu à Ottawa, la réception à Bourget — environ 35 minutes de route. La cérémonie se termine à 14 h 30 et le cocktail commence à 15 h 30, vous avez donc le temps.",
  },
  {
    q: "Comment se passe le choix du repas ?",
    a: "Chaque invité choisit son plat directement dans le formulaire de réponse. Merci de faire ce choix pour chaque personne de votre groupe avant le 1er septembre.",
  },
  {
    q: "Les enfants sont-ils bienvenus ?",
    a: "Oui, avec plaisir. Nous n'avons pas prévu de service de garde, les enfants restent donc sous la responsabilité de leurs parents tout au long de la journée. Merci d'indiquer leur nombre dans votre réponse.",
  },
  {
    q: "Y aura-t-il de l'alcool ?",
    a: "Non. Notre célébration se fera sans alcool. Des rafraîchissements variés seront servis tout au long de la soirée.",
  },
  {
    q: "Puis-je venir accompagné ?",
    a: "Si votre invitation mentionne un accompagnant, oui, avec plaisir. Merci d'indiquer son nom et son choix de plat dans le formulaire.",
  },
  {
    q: "Photos pendant la cérémonie ?",
    a: "Photographiez autant que vous voulez, et partagez-nous vos clichés après ! Une seule règle : notre photographe et notre vidéaste officiels ont la priorité. Si vous vous retrouvez épaule contre épaule avec eux pour le même angle, laissez-leur la place ne leur faites pas concurrence, ils sont armés d'objectifs plus gros que les vôtres. #BorisBerenice2026.",
  },
  {
    q: "Y a-t-il des restrictions à la salle ?",
    a: "Oui : ni confettis, ni riz, ni bulles de savon, à l'intérieur comme à l'extérieur. Merci de respecter cette consigne du Centre communautaire.",
  },
  {
    q: "Jusqu'à quand puis-je répondre ?",
    a: "Le 1er septembre 2026. Après cette date, les quantités sont fixées avec le traiteur et nous ne pouvons plus ajouter de couvert.",
  },
];

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
            <p style={eyebrow}>Nous nous marions</p>
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
                Ottawa &amp; Bourget, Ontario
              </span>
            </div>
            <p style={{ maxWidth: "48ch", fontSize: 18, lineHeight: 1.65, color: "#4a423a", margin: "28px 0 0" }}>
              Ce qui a commencé par un simple message deviendra, ce jour-là, une alliance devant
              Dieu. Nous serions honorés que vous soyez là pour le vivre avec nous.
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
              Il reste
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
            <p style={eyebrow}>Notre histoire</p>
            <h2 style={h2}>Ce que Dieu a uni</h2>
            <div style={{ display: "grid", gap: 18, maxWidth: "62ch", fontSize: 17, lineHeight: 1.65, color: "#4a423a" }}>
              <p style={{ margin: 0 }}>
                Notre histoire n&apos;a pas commencé sous un ciel étoilé, ni au détour d&apos;une
                rue. Elle a commencé par un geste tout simple : <strong>il a fait le premier pas.</strong>{" "}
                Une demande d&apos;amitié envoyée sur Facebook, puis un message sur Messenger pour
                oser entamer la conversation.
              </p>
              <p style={{ margin: 0 }}>
                Aujourd&apos;hui, les kilomètres qui nous séparaient s&apos;effacent. Ce premier
                message devient une alliance devant Dieu et devant vous. Et ce qui n&apos;était
                qu&apos;un clic devient un « oui » pour la vie.
              </p>
              <p style={{ margin: 0 }}>
                Nous ne pouvons que rendre grâce. Ce n&apos;est ni notre mérite, ni notre
                intelligence, ni le hasard d&apos;un algorithme. C&apos;est la grâce, cette grâce
                qui prend nos chemins les plus banals pour y écrire ses plus belles histoires.
              </p>
              <p style={{ margin: "8px 0 0", fontFamily: "var(--font-caprasimo), serif", fontSize: 21, lineHeight: 1.4, color: "#a05426" }}>
                « Ce que Dieu a uni, que l&apos;homme ne le sépare point. »
              </p>
              <p style={{ margin: 0, fontWeight: 600, color: "#201e1d" }}>
                Merci d&apos;être là pour célébrer avec nous ce que Lui seul a rendu possible.
              </p>
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
          <p style={eyebrow}>Le jour J</p>
          <h2 style={{ ...h2, margin: "0 0 12px" }}>Samedi 3 octobre, heure par heure</h2>
          <p style={{ margin: "0 0 24px", fontSize: 16, color: "#6b5f52" }}>
            Notre journée se déroule en deux lieux : la cérémonie à Ottawa, puis la réception à
            Bourget. Comptez environ 35 minutes de route entre les deux.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "0 0 44px" }}>
            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ border: "1.5px solid #201e1d", color: "#201e1d", padding: "11px 20px", borderRadius: 999, fontWeight: 600, fontSize: 14.5 }}
            >
              + Google Agenda
            </a>
            <a
              href="/mariage-boris-berenice.ics"
              download
              className="btn-outline"
              style={{ border: "1.5px solid #201e1d", color: "#201e1d", padding: "11px 20px", borderRadius: 999, fontWeight: 600, fontSize: 14.5 }}
            >
              + Apple / Outlook (.ics)
            </a>
          </div>
          <div className="row3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {PROGRAMME.map((item) => (
              <div key={item.heure + item.titre} style={{ background: "#f5ead8", borderRadius: 24, padding: 28 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-caprasimo), serif", fontSize: 24, color: item.color }}>
                  {item.heure}
                </p>
                <p style={{ margin: "10px 0 0", fontWeight: 700, fontSize: 18 }}>{item.titre}</p>
                <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lieu" className="pad" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 1240 }}>
          <p style={eyebrow}>Lieu &amp; itinéraire</p>
          <h2 style={{ ...h2, margin: "0 0 32px" }}>Deux lieux, une seule journée</h2>

          <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 40 }}>
            <div style={venueCardStyle}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#a05426", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  La cérémonie
                </p>
                <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 20 }}>Église Vases d&apos;Honneur Ottawa</p>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                4090 Belgreen Drive, unité 4, Ottawa, ON K1G 3N2
              </p>
              <p style={{ margin: 0, fontSize: 15, color: "#6b5f52" }}>
                Accueil dès 11 h 30 · Cérémonie de 12 h 00 à 14 h 30
              </p>
              <iframe
                title="Carte — Église Vases d'Honneur Ottawa"
                style={mapFrameStyle}
                loading="lazy"
                src="https://www.google.com/maps?q=4090+Belgreen+Drive+Ottawa+ON+K1G+3N2&output=embed"
              />
              <a
                href="https://maps.google.com/?q=4090+Belgreen+Drive+Ottawa+ON+K1G+3N2"
                className="btn-fill"
                style={{ color: "#fbf5ea", padding: "12px 22px", borderRadius: 999, fontWeight: 600, textAlign: "center" }}
              >
                Ouvrir dans Maps
              </a>
            </div>

            <div style={venueCardStyle}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#7a8a5e", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  La réception
                </p>
                <p style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 20 }}>Centre communautaire de Bourget</p>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                19, rue Lavigne, Bourget, ON K0A 1E0
              </p>
              <p style={{ margin: 0, fontSize: 15, color: "#6b5f52" }}>À partir de 15 h 30</p>
              <iframe
                title="Carte — Centre communautaire de Bourget"
                style={mapFrameStyle}
                loading="lazy"
                src="https://www.google.com/maps?q=19+rue+Lavigne+Bourget+ON+K0A+1E0&output=embed"
              />
              <a
                href="https://maps.google.com/?q=19+rue+Lavigne+Bourget+ON+K0A+1E0"
                className="btn-fill"
                style={{ color: "#fbf5ea", padding: "12px 22px", borderRadius: 999, fontWeight: 600, textAlign: "center" }}
              >
                Ouvrir dans Maps
              </a>
            </div>
          </div>

          <p style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>Informations pratiques</p>
          <div className="row3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Stationnement</p>
              <p style={{ margin: "5px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                Gratuit sur place aux deux endroits.
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Entre les deux lieux</p>
              <p style={{ margin: "5px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                Environ 35 minutes de route vers l&apos;est. Nous vous encourageons à covoiturer —
                c&apos;est plus convivial, et plus simple pour tout le monde.
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>Depuis Ottawa</p>
              <p style={{ margin: "5px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4a423a" }}>
                Bourget se trouve à une trentaine de kilomètres à l&apos;est du centre-ville. Le
                service Uber y est limité : prévoyez un véhicule ou un covoiturage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dresscode" className="pad" style={{ background: "#201e1d", color: "#f5ead8", padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1240, alignItems: "center" }}>
          <div>
            <p style={{ ...eyebrow, color: "#9db07a" }}>Dress code</p>
            <h2 style={{ ...h2, margin: "0 0 20px", color: "#f5ead8" }}>Tenue de ville, élégance chaleureuse</h2>
            <p style={{ margin: "0 0 14px", fontSize: 18, lineHeight: 1.6, color: "#ded1bb", maxWidth: "48ch" }}>
              Élégant sans être coincé. Nous aimons les tons d&apos;automne : terracotta, sauge,
              crème, brun chaud, doré.
            </p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#ded1bb", maxWidth: "48ch" }}>
              Petit conseil : début octobre en Ontario, les soirées sont fraîches — prévoyez une
              veste ou une étole pour le déplacement entre l&apos;église et la salle.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {["#c67139", "#7a8a5e", "#eccfae", "#6b5f52", "#a05426", "#5d6b45"].map((c) => (
              <div key={c} style={{ width: 108, height: 108, borderRadius: 999, background: c }} />
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
          <p style={eyebrow}>Galerie</p>
          <h2 style={{ ...h2, margin: "0 0 12px" }}>Avant, et bientôt après</h2>
          <p style={{ margin: "0 0 40px", fontSize: 16, color: "#6b5f52", maxWidth: "54ch" }}>
            Les photos du mariage seront ajoutées ici quelques semaines après le 3 octobre.
          </p>
          <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ borderRadius: 24, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/boris-berenice-hero.jpeg"
                alt="Boris et Bérénice"
                style={{ display: "block", width: "100%", height: 360, objectFit: "cover", ...photoFilter }}
              />
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/boris-berenice-histoire.jpeg"
                alt="Boris et Bérénice"
                style={{ display: "block", width: "100%", height: 360, objectFit: "cover", objectPosition: "50% 20%", ...photoFilter }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cadeaux" className="pad" style={{ padding: "88px 40px" }}>
        <div className="row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1240, alignItems: "start" }}>
          <div>
            <p style={eyebrow}>Liste de mariage</p>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>Votre présence est déjà le plus beau des cadeaux</h2>
            <p style={{ margin: "0 0 14px", fontSize: 18, lineHeight: 1.6, color: "#4a423a", maxWidth: "50ch" }}>
              Vous avez prié pour nous, vous nous avez encouragés, et plusieurs d&apos;entre vous
              feront des heures de route pour être là. C&apos;est immense, et cela nous suffit.
            </p>
            <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.6, color: "#4a423a", maxWidth: "50ch" }}>
              Pour ceux qui souhaitent tout de même marquer le coup, nous avons préparé une liste de
              mariage rassemblant quelques objets qui nous feront plaisir, à tous les budgets.
            </p>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#6b5f52" }}>
              Merci du fond du cœur pour votre générosité, quelle qu&apos;en soit la forme.
            </p>
          </div>
          <div style={{ background: "#fbf5ea", border: "1px solid #e0cfb4", borderRadius: 24, padding: "26px 28px" }}>
            <a
              href="https://www.amazon.ca/wedding/share/borisberenice"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: "inline-block", border: "1.5px solid #201e1d", color: "#201e1d", padding: "11px 20px", borderRadius: 999, fontWeight: 600, fontSize: 15 }}
            >
              Voir notre liste de mariage
            </a>
          </div>
        </div>
      </section>

      <section id="rsvp" className="pad" style={{ background: "#7a8a5e", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1000 }}>
          <p style={{ ...eyebrow, color: "#e9efdb" }}>RSVP</p>
          <h2 style={{ ...h2, margin: "0 0 12px", color: "#fbf5ea" }}>Dites-nous si vous venez</h2>
          <p style={{ margin: "0 0 12px", fontSize: 17, color: "#f0f3e7", maxWidth: "56ch" }}>
            Merci de répondre avant le <strong>1er septembre 2026</strong>. Une seule réponse par
            foyer.
          </p>
          <p style={{ margin: "0 0 36px", fontSize: 17, color: "#f0f3e7", maxWidth: "56ch" }}>
            Si vous serez des nôtres, merci de choisir un plat pour chaque personne de votre
            groupe — cela nous permet de transmettre les bons nombres au traiteur.
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
            {FAQ.map((item) => (
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
              Le plus simple reste le courriel — nous répondons en quelques heures. Le jour du
              mariage, adressez-vous directement à Arlette, notre planificatrice.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 26, margin: "26px 0 0" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b6ad9b", fontWeight: 700 }}>
                  Courriel
                </p>
                <a href="mailto:borisbereniceglazai@gmail.com" style={{ color: "#f0b183", fontSize: 17, fontWeight: 600 }}>
                  borisbereniceglazai@gmail.com
                </a>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b6ad9b", fontWeight: 700 }}>
                  Jour J · Arlette
                </p>
                <a href="tel:+16138040709" style={{ color: "#f0b183", fontSize: 17, fontWeight: 600 }}>
                  613 804-0709
                </a>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <a href="#rsvp" className="btn-fill" style={{ color: "#fbf5ea", padding: "14px 26px", borderRadius: 999, fontWeight: 700, textAlign: "center" }}>
              Répondre à l&apos;invitation
            </a>
            <a
              href="https://maps.google.com/?q=4090+Belgreen+Drive+Ottawa+ON+K1G+3N2"
              className="btn-outline-dark"
              style={{ border: "1.5px solid #6b5f52", color: "#f5ead8", padding: "14px 26px", borderRadius: 999, fontWeight: 600, textAlign: "center" }}
            >
              Itinéraire vers l&apos;église
            </a>
            <a
              href="https://maps.google.com/?q=19+rue+Lavigne+Bourget+ON+K0A+1E0"
              className="btn-outline-dark"
              style={{ border: "1.5px solid #6b5f52", color: "#f5ead8", padding: "14px 26px", borderRadius: 999, fontWeight: 600, textAlign: "center" }}
            >
              Itinéraire vers la salle
            </a>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "#b6ad9b", lineHeight: 1.6 }}>
              Boris &amp; Bérénice · 3 octobre 2026 · Ottawa &amp; Bourget
              <br />
              #BorisBerenice2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
