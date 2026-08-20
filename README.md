# Portfolio

Mon portfolio, en React 18 + TypeScript + Vite.

**En ligne :** <https://portfolio-topaz-zeta-15.vercel.app>

Le site existe en deux versions à partir du même code : la version
développeuse front-end sur `/`, et la version cybersécurité sur `/cyber`.
Chacune est disponible en français et en anglais, avec son propre CV.
J'ai fait ce choix pour ne pas maintenir deux dépôts alors que 90 % du
contenu est commun.

## Lancer le projet

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build + génération de dist/cyber.html
npm run preview
npm run test:run   # vitest
npm run lint
```

Node 22 (voir `.nvmrc`). La CI joue lint, tests et build à chaque push.

## Organisation

```
src/
├── components/   # un composant par section + quelques primitives (Button, Tag…)
├── constants/    # content.ts : tout le texte, les deux langues, les deux versions
├── i18n/         # contexte langue, résolution de la version selon l'URL, <head>
├── hooks/        # useCursorTracker
├── styles/       # App.css (variables + global), fonts.css, un CSS par composant
└── types/
```

Tout le texte est dans `src/constants/content.ts`. La structure (liste des
projets, des compétences, des vidéos) est déclarée une fois, et les textes
sont dans des tables par langue. `getContent(lang, profile)` assemble le
tout ; les composants reçoivent des données déjà résolues et ne vont jamais
piocher dans les tables.

Pour ajouter un projet : une entrée dans `PROJECTS_META`, son id dans
`PROJECT_ORDER`, et sa description dans `PROJECT_DESC`. Pour une étude de
cas (la modale derrière une carte) : `modal: true` sur le projet et une
entrée dans `CASE_STUDIES`.

## Deux routes, deux documents

Les crawlers n'exécutent pas le JS, donc le `<head>` changé à la volée ne
leur sert à rien. Le build génère un `dist/cyber.html` avec son propre
titre, sa description et sa carte de partage (`scripts/build-routes.mjs`),
et `vercel.json` sert ce fichier sur `/cyber`. Les deux documents lisent
leurs textes dans `src/i18n/document-meta.json`.

## Scripts

```bash
node scripts/vendor-fonts.mjs        # re-télécharge les polices (woff2) et régénère fonts.css
./scripts/optimize-media.sh          # ré-encode les vidéos + posters WebP (ffmpeg)
python3 scripts/optimize-images.py   # previews et posters en WebP (Pillow)
python3 scripts/generate-og-card.py  # cartes de partage (Pillow)
python3 scripts/generate-icons.py    # favicons (Pillow)
```

## Licence

MIT.
