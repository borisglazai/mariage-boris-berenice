import { Caprasimo, Figtree } from "next/font/google";
import "./globals.css";

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Boris & Bérénice — 3 octobre 2026",
  description:
    "Boris et Bérénice se marient le 3 octobre 2026 à Ottawa. Toutes les infos et le formulaire RSVP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
