# Beamerij website

Statische, mobile-first marketingwebsite voor **beamerij.be**. Geen build-stap, framework of cookiebanner nodig: de site bestaat uit gewone HTML, CSS, JavaScript en lokale beeldassets. De site is geoptimaliseerd om bezoekers tot een offerteaanvraag te laten converteren.

## Lokaal openen

Open `index.html` rechtstreeks in een browser, of start een lokale statische server in deze map:

```powershell
py -m http.server 8080
```

Open vervolgens `http://localhost:8080`. Een lokale server is aanbevolen om het Formspree-formulier correct te testen.

## Publiceren

### Netlify

1. Maak een nieuwe site via **Add new site → Deploy manually**.
2. Sleep deze volledige map naar Netlify, of koppel je Git-repository.
3. Gebruik geen build command en geen publish directory: de repository-root is de publicatiemap.
4. Koppel daarna `beamerij.be` via **Domain management**.

### Vercel

1. Importeer de Git-repository in Vercel.
2. Kies **Other** als framework preset.
3. Laat Build Command leeg en zet Output Directory op `.` (repository-root), indien Vercel erom vraagt.
4. Koppel `beamerij.be` in de projectinstellingen.

## Vóór livegang invullen

Zoek in de repository naar elk van deze placeholders en vervang ze:

| Placeholder | Waarvoor |
| --- | --- |
| `FORMSPREE_ENDPOINT` | Vervang in `index.html` (`data-formspree-endpoint`) en `script.js` door je volledige Formspree endpoint, bijvoorbeeld `https://formspree.io/f/xxxxabcd`. Maak in Formspree een formulier aan en zet daar het ontvangstadres in. |
| `32XXXXXXXXX` | Vervang overal door het WhatsAppnummer zonder `+`, spaties of voorloopnul, bijvoorbeeld `32470123456`. Komt voor in `index.html` (twee `wa.me`-links + de zwevende knop) en de footer. |
| `info@beamerij.be` | Vervang als je een ander contactadres gebruikt. |
| `+32XXXXXXXXX` | Telefoonnummer in het JSON-LD-blok bovenaan `index.html`. |
| `BE 0XXX.XXX.XXX` | Vervang door het echte ondernemingsnummer uit de KBO (footer + JSON-LD-adres). |
| `[Adres invullen]` / `[Postcode]` | Vervang door het officiële vestigingsadres en de postcode in het JSON-LD-blok (structured data) bovenaan `index.html`. |

De Formspree-logica toont na een succesvolle verzending een vriendelijke successtatus. Zonder endpoint toont de site bewust een heldere foutmelding en verstuurt zij niets.

### Seizoensgebonden aankondigingsbalk

Bovenaan staat een goudkleurige balk die naar het **WK 2026** verwijst (`<a class="announce">` in `index.html`). Pas die tekst aan of verwijder het hele `<a class="announce">…</a>`-blok na het toernooi; de header schuift dan automatisch naar boven (de hoogte wordt via de CSS-variabele `--announce-h` door `script.js` gemeten).

## Analytics & advertenties (Google Analytics 4 + Google Ads)

De site gebruikt **Google Analytics 4** en **Google Ads** met **Google Consent Mode v2** en een toestemmingsmelding (`consent.js`). Cookies blijven uit tot de bezoeker op **Accepteren** klikt; bij **Weigeren** of geen keuze worden ze niet geplaatst (Google ontvangt dan enkel cookieloze, gemodelleerde signalen). De keuze wordt onthouden in `localStorage` en is altijd aanpasbaar via **Cookievoorkeuren** onderaan elke pagina.

Vóór livegang:

1. Maak een **GA4-property** aan en kopieer de **Measurement ID** (`G-XXXXXXXXXX`). Vervang `G-XXXXXXXXXX` in `index.html`, `privacybeleid.html`, `cookiebeleid.html` en `algemene-voorwaarden.html` (telkens 2×: in de `gtag/js`-src én in `gtag('config', …)`).
2. Koppel GA4 aan je **Google Ads**-account (Beheer → Productlinks) zodat je conversies kan importeren en remarketingdoelgroepen kan opbouwen.
3. Markeer in GA4 deze **events als sleutelgebeurtenis/conversie** en importeer ze in Google Ads:
   - `generate_lead` — succesvolle verzending van het offerteformulier (met parameter `pakket`). Dit is je hoofdconversie.
   - `whatsapp_click` — klik op een WhatsApp-knop.
   - `phone_click` — klik op een telefoonlink.
   - `contact_cta` — klik op een knop/link naar het contactformulier.
4. Test met de GA4 **DebugView** of Google Tag Assistant; data verschijnt enkel op je echte (HTTPS) domein, niet via `file://`.

> Juridisch: omdat er nu wél cookies en advertentietracking zijn, is een toestemmingsmelding verplicht (al ingebouwd) en zijn het privacy- en cookiebeleid aangepast. Laat deze teksten vóór livegang nakijken door een jurist.

Liever cookieloos zonder banner? Dan is **Plausible/Fathom/Simple Analytics** een alternatief — vraag gerust om terug te schakelen.

## Foto's

De site gebruikt geoptimaliseerde JPEG-foto's in `images/`. Ze zijn met een script teruggebracht van de originele PNG's (~2 MB elk) naar ~150–290 KB. De originele PNG's (`*_Beamerij.png`) blijven als bron bewaard.

| Bestand (in gebruik) | Bron-PNG | Waar |
| --- | --- | --- |
| `movie-night.jpg` | `MovieNight_Beamerij.png` | Hero + occasion "Tuincinema & filmavonden" |
| `football-garden.jpg` | `WorldCup_Beamerij.png` | Occasion "Voetbal & WK 2026" |
| `gaming.jpg` | `GameNight_Beamerij.png` | Occasion "Gaming & esports" |
| `wedding.jpg` | `Wedding_Beamerij.png` | Occasion "Huwelijken & feesten" + atmosfeerband |
| `business.jpg` | `Business_Beamerij.png` | Occasion "Presentaties & gala's" |
| `football-terras.jpg` | `WorldCup_Beamerij2.png` | Occasion "Terras & lounge viewing" + specs-visual |

Wil je een foto vervangen? Behoud de bestandsnaam (dan hoeft de HTML niet aangepast) en exporteer bij voorkeur als geoptimaliseerde JPEG/WebP (kwaliteit ca. 80–85). Houd de `width`/`height`-attributen in `index.html` in lijn met de nieuwe verhoudingen om layout-shift te vermijden.

`favicon.svg` toont het beam-logo (projectorlens + drie lichtstralen) en past bij het inline SVG-logo in de header en footer.

> De oude abstracte SVG-placeholders (`occasion-*.svg`, `gallery-*.svg`, `hero-screen-night.svg`, `kit-detail.svg`) worden niet meer gebruikt en mogen verwijderd worden.

## Inhoud aanpassen

- Pagina-inhoud, prijzen, SEO-titel, meta description en JSON-LD (incl. een `FAQPage`-blok) staan in `index.html`.
- Alle vormgeving, responsive breakpoints en animaties staan in `styles.css`.
- Navigatie, scroll-animaties, parallax, count-up, voortgangsbalk en Formspree-verzending staan in `script.js`.
- Privacy, cookiebeleid en voorwaarden zijn losse pagina's: `privacybeleid.html`, `cookiebeleid.html` en `algemene-voorwaarden.html`.

## Aannames en aandachtspunten

- De site promoot uitsluitend privégebruik en besloten, interne bedrijfsevenementen. Publieke/commerciële filmvertoningen en betaalde toegang worden niet aangeboden.
- Er is **Google Analytics 4 + Google Ads** met **Consent Mode v2** en een toestemmingsmelding toegevoegd (zie sectie **Analytics & advertenties**). Cookies worden pas geplaatst na toestemming; weigeren is even prominent als accepteren. Het cookie- en privacybeleid zijn hierop aangepast.
- De juridische pagina's zijn praktische Belgische basisteksten met duidelijke placeholders. Laat ze vóór publicatie nakijken door een jurist en vul vooral bedrijfsgegevens, concrete betaalvoorwaarden en annuleringspercentages aan.
- De opgegeven prijs- en waarborginformatie is overgenomen uit de briefing. Controleer die samen met beschikbaarheid, leveringsradius en operationele werkwijze voor je live gaat.
- Animaties respecteren `prefers-reduced-motion`: bezoekers met die voorkeur krijgen een statische, volledig zichtbare pagina.
