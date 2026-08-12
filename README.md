# Site de mariage — Boris & Bérénice

Site en Next.js généré à partir du design "Mariage Boris et Berenice" (Claude Design). Direction terracotta, une seule page, avec compte à rebours et formulaire RSVP.

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000).

## Configurer le formulaire RSVP (Formspree)

Dans le prototype, valider le RSVP n'envoyait rien nulle part. Ici, le formulaire poste les réponses vers [Formspree](https://formspree.io), qui te les transmet par courriel et les garde dans un tableau de bord — aucun serveur ni base de données à gérer.

1. Crée un compte gratuit sur [formspree.io](https://formspree.io).
2. Crée un nouveau formulaire, donne-lui l'adresse courriel où tu veux recevoir les réponses (ex. `borisberenice2026@...`).
3. Formspree te donne un identifiant de formulaire, du genre `myzqjkpe` (dans l'URL d'endpoint `https://formspree.io/f/myzqjkpe`).
4. Copie `.env.local.example` vers `.env.local` :
   ```bash
   cp .env.local.example .env.local
   ```
5. Ouvre `.env.local` et remplace la valeur par ton identifiant :
   ```
   NEXT_PUBLIC_FORMSPREE_ID=myzqjkpe
   ```
6. Relance `npm run dev`. Le formulaire RSVP fonctionne maintenant, et tu verras chaque réponse dans ton tableau de bord Formspree (et par courriel).

Tant que `.env.local` n'est pas configuré, le formulaire affiche un message d'erreur clair au lieu de planter.

## Déployer le site

Le plus simple pour un premier site Next.js est [Vercel](https://vercel.com) (créé par l'équipe de Next.js, gratuit pour ce genre de projet) :

1. Mets ce dossier dans un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), "Add New Project" → importe le dépôt.
3. Dans les réglages du projet Vercel, ajoute la variable d'environnement `NEXT_PUBLIC_FORMSPREE_ID` avec ton identifiant Formspree (Settings → Environment Variables).
4. Déploie. Vercel te donne une URL (ex. `boris-berenice.vercel.app`) ; tu peux ensuite y attacher un nom de domaine si tu en achètes un.

## Contenus encore à remplacer

Certains éléments du design sont encore des placeholders, à remplacer quand tu auras les vrais contenus :

- **Section « Lieu »** : l'encadré rayé "carte du domaine ou capture Google Maps" — remplace-le par une vraie carte ou capture d'écran.
- **Section « Témoins & cortège »** : les portraits (encadrés rayés "portrait") — à remplacer par de vraies photos.
- **Section « Galerie »** : trois vignettes encore en placeholder ("photo fiançailles", "le domaine", "Ottawa, automne").
- **Contact** : le courriel `borisberenice2026@exemple.ca` et le numéro de Claire sont des exemples — remplace-les par les vrais.
- **Liste de mariage** : le lien Amazon est un exemple, à remplacer par ta vraie liste.

Les photos du couple (héros + section "Notre histoire") sont déjà les vraies, dans `public/images/`.

## Structure

- `app/page.js` — toute la page (une seule page, sections par ancre `#histoire`, `#programme`, etc.)
- `app/components/Countdown.js` — compte à rebours (client component)
- `app/components/RsvpForm.js` — formulaire RSVP (client component, poste vers Formspree)
- `app/globals.css` — reset + règles responsives
- `public/images/` — photos du couple
