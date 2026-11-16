# App-Seite für hatsa.de

So kommt eine App auf hatsa.de:

1. Den Prompt aus Teil 1 in einen Chat im **App-Projekt** kopieren. Der Agent sieht sich dort den Code an und erzeugt eine ZIP-Datei.
2. Die ZIP-Datei in einen Chat im Projekt **hatsa.de** legen. Der Agent dort baut sie nach Teil 2 ein.

---

## Teil 1: Prompt für das App-Projekt

Alles zwischen den beiden Linien kopieren.

````markdown
Erstelle mir ein Paket mit allem, was ich für die Seite dieser App auf meiner Webseite hatsa.de brauche. Die Seite gibt es auf Deutsch und Englisch. Das Paket ist eine ZIP-Datei, die ich in einen anderen Chat lade, der sie in die Webseite einbaut. Du musst die Webseite nicht kennen; alles Nötige steht hier.

## Vorgehen

1. Sieh dir das Projekt gründlich an: Code, README, Info.plist, Assets, Entitlements, App-Store-Texte (falls vorhanden, z. B. in `fastlane/metadata`), Lokalisierungen. Finde heraus, was die App wirklich kann, für wen sie ist, auf welchen Plattformen sie läuft und welche Daten sie verarbeitet.
2. Schreib nur, was du im Code oder in vorhandenen Texten belegen kannst. Erfinde keine Funktionen, Preise, Systemvoraussetzungen oder Store-Links. Was du nicht sicher weißt, lässt du weg und schreibst es als offene Frage in `NOTES.md`.
3. Erzeuge die Dateien unten, packe sie als ZIP und nenne mir am Ende den absoluten Pfad der ZIP-Datei.
4. Committe nichts und ändere nichts am App-Projekt. Die ZIP-Datei und den Arbeitsordner legst du außerhalb des Repos ab (z. B. in `~/Downloads`) oder entfernst sie danach wieder.

## Slug

Der Slug ist der Name der App in Kleinbuchstaben, nur `a-z`, `0-9` und `-`, z. B. `weightwidget`. Er wird Teil der URL (`hatsa.de/apps/<slug>/`). Bekannte Slugs, die du genau so verwenden sollst: `weightwidget`, `hamster`, `turtle`.

## Inhalt der ZIP-Datei

Dateiname: `<slug>-hatsa.zip`. Darin genau ein Ordner `<slug>/`:

```
<slug>/
  de.md       Seite auf Deutsch
  en.md       Seite auf Englisch
  icon.png    App-Icon
  NOTES.md    Datenschutz-Fakten und offene Fragen (wird nicht veröffentlicht)
```

Erzeugen z. B. mit: `cd <arbeitsordner> && zip -r ~/Downloads/<slug>-hatsa.zip <slug>`

## de.md und en.md

Beide Dateien haben denselben Aufbau: Frontmatter, dann Markdown. Beispiel:

```markdown
---
name: WeightWidget
tagline: Dein Gewicht auf einen Blick, direkt auf dem Homescreen.
icon: ../icons/weightwidget.png
status: in-entwicklung
platforms: [iOS]
---

Einleitung in zwei bis drei Sätzen: Was ist die App, für wen ist sie, was ist das Besondere?

## Funktionen

- **Kurzer Begriff:** Ein Satz, was das bringt.
- **Kurzer Begriff:** Ein Satz, was das bringt.

## So funktioniert's

1. Erster Schritt.
2. Zweiter Schritt.

## Häufige Fragen

**Frage?**\
Antwort.

**Noch eine Frage?**\
Antwort.
```

### Frontmatter-Felder

| Feld | Pflicht | Inhalt |
|---|---|---|
| `name` | ja | Name der App, wie im App Store. In beiden Sprachen gleich. |
| `tagline` | ja | Ein Satz, höchstens etwa 80 Zeichen. Steht in der App-Übersicht und unter dem Titel. |
| `icon` | ja | Immer genau `../icons/<slug>.png`. |
| `status` | ja | Genau einer dieser Werte: `in-entwicklung`, `beta`, `veroeffentlicht`. Auch auf Englisch diese deutschen Werte verwenden. |
| `platforms` | ja | Liste, z. B. `[iOS]`, `[iOS, iPadOS, watchOS]`, `[macOS]`, `[Android]`. |
| `appStoreUrl` | nein | Nur wenn die App wirklich im App Store ist und du den Link sicher kennst. Sonst weglassen. |
| `playStoreUrl` | nein | Wie `appStoreUrl`, für Google Play. |
| `supportEmail` | nein | Nur wenn im Projekt eine Support-Adresse steht. Sonst weglassen. |

Keine weiteren Felder verwenden; die Webseite lehnt unbekannte Werte bei `status` ab.

### Text

- **Keine H1-Überschrift** (`# …`). Name, Status, Tagline, Icon und Store-Links zeigt die Seite selbst an.
- **Abschnitte:** Einleitung (ohne Überschrift), `## Funktionen` mit 3 bis 6 Punkten, optional `## So funktioniert's` mit 3 bis 5 Schritten, `## Häufige Fragen` mit 3 bis 5 Fragen. Englisch: `## Features`, `## How it works`, `## FAQ`.
- **FAQ-Format:** Frage fett, am Zeilenende ein Backslash (`\`), Antwort in der nächsten Zeile, Leerzeile zwischen den Fragen. Ohne Backslash laufen Frage und Antwort in einer Zeile zusammen.
- **Keine Bilder, kein HTML, keine Links zu Support oder Datenschutz.** Die Seite verlinkt Support und Datenschutz automatisch.
- **Ton:** sachlich, kurz, freundlich, kein Werbesprech. Deutsch in der Du-Form. Englisch ist eine sinngemäße, natürlich klingende Fassung, keine Wort-für-Wort-Übersetzung.
- **Status ehrlich:** Ist die App noch nicht veröffentlicht, darf der Text nicht so tun, als könne man sie schon laden.

## icon.png

- Das App-Icon als PNG, 1024 × 1024 Pixel, quadratisch, **ohne** abgerundete Ecken und ohne Transparenz. Die Webseite rundet die Ecken selbst ab.
- Bei iOS-Projekten liegt es meist in `Assets.xcassets/AppIcon.appiconset/` (die 1024er-Datei). Gibt es nur eine Icon-Composer-Datei (`.icon`) oder nur kleinere Größen, nimm die beste vorhandene Quelle und vermerke das in `NOTES.md`.
- Gibt es noch gar kein Icon, lass `icon.png` weg und schreib das in `NOTES.md`. Die Webseite zeigt dann eine Ersatzkachel mit dem Anfangsbuchstaben; die Zeile `icon:` im Frontmatter entfällt in diesem Fall ebenfalls.

## NOTES.md

Wird nicht veröffentlicht, sondern dient mir und dem Einbau-Chat als Grundlage, vor allem für die spätere Datenschutzerklärung. Auf Deutsch, Stichpunkte reichen:

- **Daten:** Welche Daten verarbeitet die App (z. B. Gesundheitsdaten über HealthKit, Standort, Fotos, Kontakte)?
- **Speicherort:** Nur auf dem Gerät, iCloud/CloudKit, eigener Server, Drittanbieter?
- **Netzwerk:** Welche Verbindungen baut die App auf, wohin?
- **SDKs und Dienste:** Analytics, Crash-Reporting, Werbung, Zahlungsanbieter, jeweils mit Namen.
- **Konto:** Gibt es eine Anmeldung?
- **Käufe:** Gratis, Abo, In-App-Käufe?
- **Berechtigungen:** Die Usage-Description-Texte aus der Info.plist.
- **Offene Fragen:** Alles, was du nicht sicher klären konntest.
````

---

## Teil 2: Einbau in hatsa.de

Für den Chat im Projekt hatsa.de, wenn eine ZIP-Datei `<slug>-hatsa.zip` angehängt ist. Angehängte Dateien liegen unter `~/.t3/userdata/attachments/`.

1. **Entpacken** in einen leeren Ordner im Scratchpad, nicht ins Repo. Prüfen, dass genau ein Ordner `<slug>/` mit `de.md` und `en.md` drin ist (`icon.png` und `NOTES.md` sind optional, aber erwartet).
2. **Prüfen:**
   - Frontmatter passt zum Schema in `src/content.config.ts`: Pflichtfelder vorhanden, `status` ist einer der erlaubten Werte, `icon` ist `../icons/<slug>.png` (oder fehlt, wenn es kein Icon gibt).
   - Keine H1-Überschrift im Text, kein HTML, keine Bilder.
   - `icon.png` ist ein quadratisches PNG (`file icon.png`).
   - Was nicht passt, korrigieren und dem Nutzer sagen, was geändert wurde.
3. **Einbauen:**
   - `de.md` → `src/content/apps/de/<slug>.md`
   - `en.md` → `src/content/apps/en/<slug>.md`
   - `icon.png` → `src/content/apps/icons/<slug>.png`
   - Gibt es die App schon, die alten Dateien ersetzen und dem Nutzer die wichtigsten Unterschiede nennen.
   - `order` setzen, damit die Reihenfolge in der Übersicht stimmt (bei Neuanlage: an das Ende). Den Nutzer fragen, falls unklar.
4. **Testen:** `npx astro build` muss fehlerfrei laufen. Dann den Dev-Server starten (`astro dev --background --host --allowed-hosts lenovo`) und die Links zum Ansehen als `http://lenovo:4321/...` ausgeben: Übersicht `/apps/`, App-Seite `/apps/<slug>/` und `/de/apps/<slug>/`.
5. **NOTES.md** nicht ins Repo legen. Den Inhalt dem Nutzer kurz zusammenfassen, vor allem offene Fragen und Datenschutz-Fakten.
6. **Nichts committen.** Der Nutzer will die Seite vorher selbst abnehmen.
