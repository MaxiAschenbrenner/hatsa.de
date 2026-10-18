# hatsa.de

Webseite mit Blog und App-Produktseiten, gebaut mit [Astro](https://astro.build) und gehostet auf GitHub Pages.

## Entwicklung

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # Ausgabe nach dist/
```

## Inhalte

- **Blogpost:** neue Datei in `src/content/blog/<slug>.md`
- **App:** neue Datei in `src/content/apps/<slug>.md` — erzeugt automatisch
  `/apps/<slug>/`, `/apps/<slug>/support/` und `/apps/<slug>/privacy/`

Die erlaubten Frontmatter-Felder stehen in `src/content.config.ts`.

## Deployment

Jeder Push auf `main` baut die Seite über `.github/workflows/deploy.yml` und veröffentlicht sie auf https://hatsa.de.

## Rechtliches

Dieses Repository ist nur öffentlich, damit die Website gebaut und veröffentlicht werden kann. Beiträge (Issues, Pull Requests) sind nicht erwünscht.

© Maximilian Aschenbrenner. Alle Rechte vorbehalten. Quellcode und Inhalte (Texte, Bilder, Logos) dürfen ohne ausdrückliche Genehmigung nicht verwendet, kopiert oder weiterverbreitet werden.
