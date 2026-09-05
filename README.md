# Beamerij website

Statische, meertalige marketingwebsite voor **beamerij.be**. Geen framework, package-installatie of build-stap: publiceer de bestanden vanuit de repository-root.

## Lokaal bekijken

Start een statische server in deze map:

```powershell
py -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/?lang=nl`. Gebruik `?lang=fr` of `?lang=en` voor de andere talen. Gebruik een lokale server, niet `file://`, om dezelfde URL-, media- en formulierwerking als op de gepubliceerde site te bekijken. Zet de browsercache uit tijdens het aanpassen van CSS of JavaScript.

## Merk en opbouw

**Samen. Groots.** De site verkoopt de gedeelde beleving, gevolgd door de apparatuur, concrete pakketten, werkwijze, praktische antwoorden en een persoonlijke offerteaanvraag.

- Kleuren: donkergroen `#15231d`, warm ivoor `#f3f2ea`, licht lime `#d9ef93`.
- Typografie: Barlow Condensed 700 en Manrope 400–800; lokaal gehost in `fonts/`, met de oorspronkelijke OFL-licenties.
- Het nieuwe projectorbeeldmerk staat inline in de homepage en juridische pagina's. Favicons, Apple-iconen en `site.webmanifest` gebruiken dezelfde identiteit. Oudere bestanden in `logo/` blijven als bronarchief bewaard en worden niet door het nieuwe ontwerp geladen.
- Echte foto's en een sfeerfilm met oorspronkelijk camerageluid uit de aangeleverde WK-photoshoot vervangen de oude illustratieve marketingbeelden. De campagne is een terugblik, geen actuele WK-promotie of claim van een officieel partnerschap.

De richting is geïnformeerd door de belevingsgerichte private-hirepresentatie van [Everyman](https://ww2.everymancinema.com/private-hire), de locatiebeelden van [Black Cat Cinema](https://www.theblackcatcinema.com/private-events) en [NN/g's onderzoek naar vertrouwen en transparante dienstverlening](https://www.nngroup.com/articles/trustworthy-design/). Er zijn geen externe merkteksten, foto's of klantbeoordelingen overgenomen.

## Bestanden en verantwoordelijkheden

| Bestand | Inhoud |
| --- | --- |
| `index.html` | Nederlandse broninhoud, prijzen, SEO, formulier, media en toegankelijke structuur |
| `styles.css` | Volledig ontwerp, responsive lay-outs, CSS-animaties, juridische pagina's en toestemmingsmelding |
| `lang.js` | Nederlandse, Franse en Engelse teksten; taalkeuze, metadata en lokale paginalinks |
| `script.js` | Menu, focusbeheer, datum-/pakketselectie, opties, beweging, video en offerteverzending |
| `consent.js` | Google Consent Mode-keuze en vertaalde toestemmingsmelding |
| `legal-i18n.js` | Franse en Engelse juridische inhoud; Nederlandse inhoud komt uit de juridische HTML |
| `privacybeleid.html`, `cookiebeleid.html`, `algemene-voorwaarden.html` | Juridische pagina's met gedeelde merkstijl |
| `images/campaign/` | Geoptimaliseerde campagnefoto's en films |
| `fonts/` | Lokale WOFF2-bestanden en licenties |

## Inhoud en talen aanpassen

Pas Nederlandse homepage-inhoud zowel in `index.html` als in het Nederlandse woordenboek van `lang.js` aan. Werk ook de Franse en Engelse vertalingen bij. Bij prijswijzigingen moeten de zichtbare pakketten en de `LocalBusiness`-aanbiedingen in het JSON-LD-blok overeenkomen.

`data-i18n` vertaalt inhoud; `data-i18n-ph`, `data-i18n-al` en `data-i18n-alt` vertalen placeholders, toegankelijke namen en alternatieve beeldteksten. De expliciete `?lang=`-parameter gaat vóór de opgeslagen keuze en de browsertaal. Wisselen behoudt andere queryparameters en de hash. Juridische links nemen de actieve taal mee.

De gedeelde taal-API is `window.t`, `window.__lang`, `window.__setLang` en `window.__i18nAddDict`. Na toepassing volgt het documentevent `beamerij:languagechange`, zodat selecties, verzendstatus en de toestemmingsmelding dezelfde taal behouden.

## Campagnebeelden

Alle originelen in `images/WC26 photoshoot/` blijven ongewijzigd. De website laadt geen originele JPG's of MOV's.

| Webbestand | Bron | Gebruik |
| --- | --- | --- |
| `terrace-960.webp`, `terrace-1600.webp`, `terrace-2400.webp` | `P1001174.JPG` | Hero; druk terras, scherm rechts |
| `night-960.webp`, `night-1600.webp`, `night-2400.webp` | `P1001128.JPG` | Brede parkopstelling; showcase en filmposter |
| `crowd-960.webp` | `P1001157.JPG` | Sfeerdetail met lichtjes en supporters |
| `social.jpg` | `P1001174.JPG` | Sociale deelafbeelding, 1200 × 630 |
| `hero-loop.mp4` | `P1001148.MOV`, 2,0–9,6 s | Stille desktoploop, 1600 × 900, 7 s, circa 2,0 MiB; cyclische crossfade van 0,6 s |
| `event-film.mp4` | `P1001148.MOV` → `P1001361.MOV` → `P1001214.MOV` | Sfeerfilm met oorspronkelijk stereogeluid, 1920 × 1080, 22 s, circa 7,2 MiB |

De foto's zijn WebP-exports op kwaliteit 81, met behouden bronverhouding 3:2. Beide films gebruiken H.264, 25 fps, yuv420p en faststart, zonder camerametadata. Alleen de hero-loop is geluidloos. De sfeerfilm bevat AAC-LC-stereo op 48 kHz en circa 192 kbit/s: de oorspronkelijke camerakanalen zijn op de bestaande beeldmontage uitgelijnd, met korte audio-overgangen en gelijkmatige niveaus (circa −20 LUFS, true peak −3,1 dBTP). Een nieuwe export moet dezelfde paden, verhoudingen en HTML-dimensies respecteren; pas die samen aan als de uitsnede verandert.

De homepage verwijst naar de aangepaste scripts en sfeerfilm met `?v=20260905-audio`, zodat eerder gecachte stille versies worden vervangen. Verhoog deze versiesuffix bij volgende wijzigingen aan die bestanden.

## Beweging en toegankelijkheid

- Grote titels openen met een korte maskeranimatie; secties verschijnen eenmaal met een subtiele verspringing.
- Scrollen blijft native. Parallax gebruikt hoogstens één aangevraagde animatieframe-update per scroll-/resizegroep.
- De hero is eerst een gewone responsive foto. De loop wordt pas na het laden toegevoegd op desktop, zonder databesparings- of verminderde-bewegingsvoorkeur, en alleen wanneer het beeld zichtbaar is. Open menu's en dialogen pauzeren het achtergrondbeeld.
- De bewegingsknop pauzeert decoratieve animaties en video. `prefers-reduced-motion` schakelt die standaard uit, ook wanneer de systeeminstelling tijdens het bezoek verandert. Bewust de sfeerfilm openen blijft mogelijk.
- De sfeerfilm laadt uitsluitend na een klik en start standaard met geluid, met native bediening in een dialoog. Een door de bezoeker gekozen mute- of volume-instelling blijft bij heropenen behouden. Sluiten stopt de film en het geluid en herstelt de toetsenbordfocus; de automatische achtergrondloop blijft altijd stil.
- Zonder JavaScript blijven inhoud, prijzen, FAQ, directe filmlink, contactkanalen en het native POST-formulier beschikbaar. Er is een compacte navigatiefallback; niet-werkende JavaScriptbediening wordt verborgen.

## Offerteaanvragen

De bestaande Formspree-koppeling is geconfigureerd op het formulier in `index.html`; `script.js` gebruikt dat endpoint. Telefoon, WhatsApp en `info@beamerij.be` blijven bestaande contactkanalen. Er is **geen boekingsagenda of live beschikbaarheidsdatabase**: een aanvraag is gratis en vrijblijvend, waarna Beamerij een datum controleert en een voorstel stuurt.

- De datumchecker neemt de datum mee naar het aanvraagformulier.
- Pakketknoppen selecteren het juiste pakket. Houd de stabiele `data-package`-waarden gelijk aan de waarden van de selectopties, ook in andere talen.
- Gelegenheden en extra's worden afzonderlijk meegestuurd; ze overschrijven het vrije bericht niet en kunnen worden gewist.
- Native validatie blokkeert onvolledige aanvragen. Tijdens het verzenden is dubbel verzenden geblokkeerd.
- Alleen een succesvolle HTTP-respons van de provider toont de bedankstatus. Bij een fout blijven de gegevens staan en kan de bezoeker opnieuw proberen of rechtstreeks contact opnemen.
- Zonder JavaScript gebruikt het formulier zijn normale `action` en `method="POST"`.

Controleer de echte aflevering vóór publicatie met een herkenbare aanvraag en de ontvangende inbox. De ontwikkelcontrole heeft providerresponses onderschept; er zijn daarbij geen echte aanvragen verstuurd.

## Analytics en toestemming

De bestaande GA4-configuratie en Google Consent Mode v2 blijven behouden. De standaard is `denied` voor analytics- en advertentieopslag. De toestemmingsmelding biedt accepteren en weigeren; **Cookievoorkeuren** laat de keuze later wijzigen. Keuzes worden in `localStorage` bewaard. Het bestaande beleid kan cookieloze signalen van Google toelaten; dit is geen volledige netwerkblokkade tot toestemming.

Bestaande conversie-events blijven `generate_lead`, `whatsapp_click`, `phone_click` en `contact_cta`. Een succesvol formulier is de leadgebeurtenis, geen bevestigde boeking.

## Vóór publicatie

1. Vul de geverifieerde juridische identiteit, het ondernemingsnummer en het officiële adres in waar nodig. De bestaande juridische teksten bevatten nog `BE 0XXX.XXX.XXX`; er is geen nummer verzonnen.
2. Laat de juridische teksten en operationele afspraken nakijken, waaronder waarborg, annulering, verzekering en gebruiksrechten.
3. Bevestig de tarieven. Deze versie behoudt de lokale projectprijzen: €70 / €175 / €350 / €450 vanaf. Controleer dat de gepubliceerde site, offertes en eventuele advertenties dezelfde tarieven gebruiken.
4. Bevestig dat de beelden mogen worden gepubliceerd, inclusief toestemmingen van herkenbare personen en relevante beeld-/uitzendrechten. Het aanbod blijft privégebruik en besloten, interne bedrijfsevenementen.
5. Controleer de Formspree-inbox met een echte, duidelijk herkenbare aanvraag en controleer eventuele providerinstellingen voor het productiedomein.
6. Publiceer en controleer op het echte domein mobiele mediaweergave, contactlinks, taalkeuze en toestemming. Lokale weergave is geen bewijs van productie-aflevering of campagnesucces.

## Publiceren

Voor Netlify of Vercel: gebruik een statische site zonder buildcommand, met de repository-root als publicatiemap. Voor andere hosting geldt hetzelfde. Upload de HTML-, CSS- en JavaScriptbestanden plus `fonts/`, de gebruikte `images/`, favicons en manifest. Grote originele photoshootbestanden, `.idea/`, `research/`, `tmp/` en `output/` hoeven niet mee naar de publieke hosting.
