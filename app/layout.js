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

const title = "Boris & Bérénice — 3 octobre 2026";
const description =
  "Boris et Bérénice se marient le 3 octobre 2026 à Ottawa et Bourget. Toutes les informations et le formulaire de réponse.";

export const metadata = {
  metadataBase: new URL("https://mariage-boris-berenice.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
