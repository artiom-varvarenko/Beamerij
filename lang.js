/* Beamerij — synchronous NL / FR / EN localization.
   Dutch mirrors index.html. Legal pages extend the dictionaries separately. */
(function () {
  var SUPPORTED = ['nl', 'fr', 'en'];
  var STORE = 'beamerij-lang';
  var LOCALES = { nl: 'nl-BE', fr: 'fr-BE', en: 'en' };
  var OG_LOCALES = { nl: 'nl_BE', fr: 'fr_BE', en: 'en_GB' };

  var DICT = {
    nl: {
      'meta.title': 'Beamerij — Samen. Groots. | Big-screen verhuur Antwerpen',
      'meta.desc': 'Maak je avond groots met Beamerij. Huur een 4K-beamer, 200+ inch scherm en geluid in Antwerpen. Complete set vanaf €175. Zelf afhalen of volledig laten opbouwen.',
      'meta.ogtitle': 'Beamerij — Samen. Groots.',
      'meta.ogdesc': 'Jouw mensen. Jouw plek. Groots beeld. 4K big-screen verhuur in Antwerpen, van zelf afhalen tot volledig verzorgd.',
      'meta.imagealt': 'Samen voetbal kijken op een groot scherm, uit de Beamerij-photoshoot',
      'meta.twitterdesc': '4K-beamer, groot scherm en geluid. Jij nodigt uit. Wij brengen het beeld.',
      'skip': 'Ga naar inhoud',
      'nav.aria': 'Hoofdnavigatie',
      'nav.menu': 'Menu openen',
      'nav.experience': 'De beleving',
      'nav.packages': 'Pakketten',
      'nav.how': 'Zo werkt het',
      'nav.cta': 'Plan je avond',
      'hero.eyebrow': 'Big-screen verhuur · Antwerpen',
      'hero.line1': 'Samen.',
      'hero.line2': 'Groots.',
      'hero.copy': 'Jouw mensen. Jouw plek. Een scherm dat alles verandert.',
      'hero.description': '4K-beamer, 200+ inch scherm en geluid. Zelf afhalen of volledig laten opbouwen.',
      'hero.cta': 'Maak je avond groots',
      'hero.price': 'Complete set vanaf <strong>€175</strong><span> / avond</span>',
      'hero.film': 'Voel de sfeer',
      'hero.filmnote': 'Uit onze WK-photoshoot',
      'hero.rail': 'Niet gewoon kijken. Samen beleven.',
      'motion.pause': 'Pauzeer beweging',
      'motion.play': 'Hervat beweging',
      'quick.aria': 'Vraag je datum aan',
      'quick.title': 'Een goed plan begint<br>met een datum.',
      'quick.label': 'Jouw eventdatum',
      'quick.cta': 'Vraag beschikbaarheid',
      'quick.note': 'Vrijblijvend. Persoonlijk antwoord.<br>Meestal binnen 1 werkdag.',
      'intro.eyebrow': 'Meer dan een scherm',
      'intro.title': 'Je nodigt uit.<br>Wij brengen de <em>wauw.</em>',
      'intro.copy': 'Die ene goal. De eerste scène. Een zaal die even stilvalt. Sommige momenten verdienen meer dan een tv. Beamerij brengt groots beeld en goed geluid naar jouw plek. Zonder technisch gedoe.',
      'intro.setaria': 'Ontdek de complete set',
      'stat.screen': 'Een scherm dat indruk maakt',
      'stat.projector': '5.700 lumen. Elk detail telt.',
      'stat.completelabel': '% compleet',
      'stat.complete': 'Geluid, stands en alle kabels',
      'media.night': 'Samen in het gras voor het grote scherm tijdens de Beamerij-photoshoot',
      'media.crowd': 'Supporters samen op het terras tijdens de photoshoot',
      'showcase.eyebrow': 'Echt beeld. Echte sfeer.',
      'showcase.title': 'Hier wil je<br>bij zijn.',
      'showcase.play': 'Bekijk de sfeerfilm',
      'showcase.caption': 'Een terugblik op onze WK-photoshoot.',
      'occ.eyebrow': 'Jouw avond, jouw verhaal',
      'occ.title': 'Elke reden<br>is een <em>goede.</em>',
      'occ.intro': 'Van een film onder de sterren tot de match waar iedereen op wacht. Voor jouw privéfeest of besloten bedrijfsevent.',
      'occ.photo': 'Gemaakt om samen te beleven.',
      'occ.1.t': 'De match.',
      'occ.1.d': 'De spanning. Het gejuich. Je eigen tribune in de tuin, voor voetbal, koers of de finale.',
      'occ.2.t': 'De filmavond.',
      'occ.2.d': 'Dekentjes, popcorn, je favoriete mensen. Jouw tuin of living wordt even een bioscoop.',
      'occ.3.t': 'De game night.',
      'occ.3.d': 'Een groter speelveld voor je rivaliteit. Race, speel en win op 200+ inch. PS5 optioneel.',
      'occ.4.t': 'Jouw moment.',
      'occ.4.d': 'Huwelijk, verjaardag, communie of intern bedrijfsevent. Geef je verhaal het beeld dat het verdient.',
      'pkg.eyebrow': 'Groots, op jouw manier',
      'pkg.title': 'Jouw plan.<br>Jouw pakket.',
      'pkg.intro': 'Zelf de handen uit de mouwen of alleen je gasten ontvangen? Jij kiest. Heldere vanafprijzen, vrijgesteld van btw.',
      'pkg.from': 'vanaf',
      'pkg.night': '/ avond',
      'pkg.select': 'Dit wordt mijn avond',
      'pkg.service': 'Regel het voor mij',
      'pkg.discuss': 'Bespreek je event',
      'pkg.1.label': 'De essentie',
      'pkg.1.t': 'Alleen beamer',
      'pkg.1.d': 'Jij hebt de plek en een scherm of witte muur. Wij hebben het beeld.',
      'pkg.1.sub': '€100 voor een heel weekend',
      'pkg.1.f1': '4K laserprojector',
      'pkg.1.f2': 'Kabels en afstandsbediening',
      'pkg.1.f3': 'Afhalen en terugbrengen op afspraak',
      'pkg.2.label': 'De complete ervaring',
      'pkg.2.t': 'Full big-screen set',
      'pkg.2.d': 'Alles voor jouw eigen cinema. Groot beeld, goed geluid, groots gevoel.',
      'pkg.2.sub': '€250 voor een heel weekend',
      'pkg.2.f1': '200+ inch scherm met stille blower',
      'pkg.2.f2': '4K laserprojector en geluidsset',
      'pkg.2.f3': 'Stands, kabels en duidelijke opbouwuitleg',
      'pkg.3.label': 'Jij hoeft alleen te genieten',
      'pkg.3.t': 'Full-service event',
      'pkg.3.d': 'Van de eerste kabel tot de laatste aftiteling. Wij regelen de techniek.',
      'pkg.3.sub': 'Antwerpen + 15 km · geen waarborg',
      'pkg.3.f1': 'De volledige big-screen set',
      'pkg.3.f2': 'Levering, opbouw en ophaling',
      'pkg.3.f3': 'Bediening tijdens jouw event',
      'pkg.4.label': 'Een groter plan?',
      'pkg.4.t': 'Business &amp; meerdaags',
      'pkg.4.d': 'Interne bedrijfsevents of langer huren. Technische afstemming, een flexibele huurperiode en begeleiding op aanvraag.',
      'pkg.4.price': 'Vanaf <strong>€450</strong> · op maat',
      'pkg.details': 'Goed om te weten: extra’s, waarborg &amp; prijzen',
      'pkg.note1': '<strong>Extra’s bij afhaalpakketten:</strong> levering, opbouw en ophaling €50–80 · operator €100–125 · extra speaker of bekabeling €15–25.',
      'pkg.note2': '<strong>Waarborg:</strong> beamer €300–400 · full set €500–750. In overleg is een identiteitskaart met ondertekende overeenkomst mogelijk. Bij full-service is geen waarborg nodig.',
      'pkg.note3': '<strong>Transparant voorstel:</strong> alle prijzen zijn vrijgesteld van btw. Eventuele extra’s spreken we vooraf af. Je ontvangt de totaalprijs voor je bevestigt.',
      'addon.title': 'Maak het helemaal van jou · op aanvraag',
      'addon.1.t': 'PS5 gaming-set',
      'addon.1.d': 'Console en twee draadloze controllers.',
      'addon.2.t': 'Leg het moment vast',
      'addon.2.d': 'Fotograaf of videograaf voor jouw event.',
      'addon.3.t': 'Zonder stopcontact',
      'addon.3.d': 'Een stille powerstation als stroomoptie.',
      'proc.eyebrow': 'Van idee naar onvergetelijk',
      'proc.title': 'Grootse avond.<br><em>Kleine moeite.</em>',
      'proc.intro': 'Geen technische handleiding voor je avond. Wel één aanspreekpunt dat met je meedenkt.',
      'proc.cta': 'Vertel ons je plan',
      'proc.1.t': 'Jij hebt een idee.',
      'proc.1.d': 'Stuur je datum, plek en plan. Via het formulier, WhatsApp of gewoon even bellen.',
      'proc.2.t': 'We maken het concreet.',
      'proc.2.d': 'Je krijgt persoonlijk advies en een helder voorstel met de totaalprijs. Pas na jouw akkoord leggen we alles vast.',
      'proc.3.t': 'Het scherm gaat aan.',
      'proc.3.d': 'Zelf afhalen met uitleg of ons laten opbouwen in 30–60 minuten. Na afloop breng je terug of halen wij op, volgens je pakket.',
      'faq.eyebrow': 'Nog even praktisch',
      'faq.title': 'Goed om<br>te weten.',
      'faq.intro': 'Twijfel je over je locatie of opstelling? We denken graag met je mee.',
      'faq.link': 'Stel je vraag via WhatsApp',
      'faq.1.q': 'Waar leveren jullie?',
      'faq.1.a': 'In Antwerpen en ongeveer 15 km errond: onder meer Berchem, Deurne, Wilrijk, Mortsel, Edegem, Schoten en Brasschaat. Verder weg? Vraag gerust. Zelf afhalen kan op afspraak. Levering zit in full-service en is als extra mogelijk bij de andere pakketten.',
      'faq.2.q': 'Kan het ook in mijn tuin of binnen?',
      'faq.2.a': 'Ja. Tuin, terras, living, feestzaal of kantoor: we stemmen de opstelling af op je plek. Buiten is schemering of duisternis belangrijk voor mooi beeld. Stuur ons de beschikbare ruimte en lichtomstandigheden; we adviseren je vooraf.',
      'faq.3.q': 'Wat als het regent of hard waait?',
      'faq.3.a': 'Veiligheid eerst. Bij ongeschikt weer bekijken we samen vooraf een binnenalternatief, een nieuw moment of een andere passende oplossing. Een buitenopstelling is altijd weersafhankelijk.',
      'faq.4.q': 'Moet ik zelf iets voorzien?',
      'faq.4.a': 'Bij de complete set krijg je scherm, projector, geluid, stands en kabels. Voorzie een veilige plek en een normaal stopcontact. Geen stroom in de buurt? Een powerstation is op aanvraag beschikbaar. Je zorgt zelf voor je film, game of uitzending en de benodigde accounts en gebruiksrechten.',
      'faq.5.q': 'Hoe zit het met de waarborg?',
      'faq.5.a': 'Voor alleen de beamer is de waarborg €300–400; voor de full set €500–750. In overleg is een identiteitskaart met ondertekende overeenkomst mogelijk. Bij full-service met bediening ter plaatse betaal je geen waarborg. De huurder is verantwoordelijk voor schade, verlies of diefstal volgens de huurvoorwaarden.',
      'faq.6.q': 'Is mijn aanvraag meteen een boeking?',
      'faq.6.a': 'Nee. Je aanvraag is gratis en vrijblijvend. We controleren je datum en sturen een voorstel. Een boeking volgt pas na bevestiging. Annuleren kan volgens de afspraken in de algemene voorwaarden; afhankelijk van het moment kunnen kosten gelden.',
      'contact.eyebrow': 'Het begint met jouw idee',
      'contact.title': 'En nu:<br><em>jouw avond.</em>',
      'contact.copy': 'Een datum, een plek, een idee. Meer hebben we niet nodig om samen iets groots te plannen.',
      'contact.response': 'Vanuit Antwerpen, voor jouw moment.<br>Meestal persoonlijk antwoord binnen 1 werkdag.',
      'form.eyebrow': 'Jouw plan, vrijblijvend',
      'form.required': '* verplicht',
      'form.name': 'Jouw naam',
      'form.email': 'E-mailadres',
      'form.date': 'Eventdatum',
      'form.datehint': 'Nog niet zeker? Een richtdatum mag ook.',
      'form.location': 'Locatie / postcode',
      'form.package': 'Jouw pakket',
      'form.choose': 'Maak je keuze',
      'form.unsure': 'Ik wil graag advies',
      'form.phone': 'Telefoon (optioneel)',
      'form.message': 'Wat ben je van plan?',
      'form.placeholder': 'Een filmavond met 25 vrienden in de tuin…',
      'form.submit': 'Verstuur mijn plan',
      'form.consent': 'Geen betaling. Geen verplichting. We gebruiken je gegevens om je aanvraag te beantwoorden. Lees ons <a href="privacybeleid.html">privacybeleid</a>.',
      'form.successtitle': 'Jouw plan is onderweg.',
      'form.successbody': 'Bedankt! Je hoort meestal binnen 1 werkdag van ons met een persoonlijk voorstel. Je aanvraag is nog geen bevestigde boeking.',
      'form.urgent': 'Toch nog iets toevoegen? Stuur een WhatsApp.',
      'form.sending': 'Even versturen…',
      'form.error': 'Versturen lukte niet. Probeer opnieuw of mail ons via info@beamerij.be.',
      'form.notconfigured': 'Het formulier is niet beschikbaar. Mail je plan naar info@beamerij.be.',
      'form.selection': 'Jouw selectie:',
      'form.clearselection': 'Selectie wissen',
      'footer.tagline': 'Groot beeld. Goed gezelschap.<br>Beamer- en big-screenverhuur vanuit Antwerpen.',
      'footer.top': 'Terug naar boven',
      'footer.region': 'Antwerpen + 15 km · verder op aanvraag',
      'footer.privacy': 'Privacy',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Voorwaarden',
      'footer.cookieprefs': 'Cookievoorkeuren',
      'footer.vat': 'Privégebruik en besloten bedrijfsevents. Kleine onderneming onder de btw-vrijstellingsregeling; btw niet van toepassing.',
      'film.title': 'Samen beleefd.',
      'film.close': 'Sluit de sfeerfilm',
      'film.description': 'Sfeerbeelden uit onze WK-photoshoot. Samen supporteren, op groot scherm.'
    },
    fr: {
      'meta.title': 'Beamerij — Ensemble. Grand. | Location grand écran à Anvers',
      'meta.desc': 'Voyez votre soirée en grand avec Beamerij. Projecteur 4K, écran de plus de 200 pouces et sonorisation à Anvers. Ensemble complet dès 175 €. À emporter ou avec installation.',
      'meta.ogtitle': 'Beamerij — Ensemble. Grand.',
      'meta.ogdesc': 'Vos proches. Votre lieu. En grand. Location de grand écran 4K à Anvers, à emporter ou en service complet.',
      'meta.imagealt': 'Un match de football partagé sur grand écran, lors du shooting Beamerij',
      'meta.twitterdesc': 'Projecteur 4K, grand écran et son. Vous invitez. Nous apportons l’image.',
      'skip': 'Aller au contenu',
      'nav.aria': 'Navigation principale',
      'nav.menu': 'Ouvrir le menu',
      'nav.experience': 'L’expérience',
      'nav.packages': 'Les formules',
      'nav.how': 'Comment ça marche',
      'nav.cta': 'Votre soirée',
      'hero.eyebrow': 'Location grand écran · Anvers',
      'hero.line1': 'Ensemble.',
      'hero.line2': 'Grand.',
      'hero.copy': 'Vos proches. Votre lieu. Un écran qui change tout.',
      'hero.description': 'Projecteur 4K, écran de plus de 200 pouces et son. À emporter ou entièrement installé.',
      'hero.cta': 'Vivez votre soirée en grand',
      'hero.price': 'Ensemble complet dès <strong>175 €</strong><span> / soirée</span>',
      'hero.film': 'Vivez l’ambiance',
      'hero.filmnote': 'Notre shooting Coupe du monde',
      'hero.rail': 'Pas seulement regarder. Le vivre ensemble.',
      'motion.pause': 'Mettre les animations en pause',
      'motion.play': 'Reprendre les animations',
      'quick.aria': 'Proposer votre date',
      'quick.title': 'Une belle soirée commence<br>par une date.',
      'quick.label': 'Votre date',
      'quick.cta': 'Demander la disponibilité',
      'quick.note': 'Sans engagement. Réponse personnelle.<br>Généralement sous 1 jour ouvrable.',
      'intro.eyebrow': 'Bien plus qu’un écran',
      'intro.title': 'Vous invitez.<br>Nous créons l’effet <em>waouh.</em>',
      'intro.copy': 'Ce but décisif. La première scène. Une salle qui retient son souffle. Certains moments méritent mieux qu’une télé. Beamerij apporte la grande image et le bon son chez vous. Sans casse-tête technique.',
      'intro.setaria': 'Découvrir l’ensemble complet',
      'stat.screen': 'Un écran qui fait son effet',
      'stat.projector': '5 700 lumens. Chaque détail compte.',
      'stat.completelabel': '% complet',
      'stat.complete': 'Son, pieds et tous les câbles',
      'media.night': 'Réunis dans l’herbe devant le grand écran lors du shooting Beamerij',
      'media.crowd': 'Des supporters réunis sur la terrasse pendant le shooting',
      'showcase.eyebrow': 'De vraies images. Une vraie ambiance.',
      'showcase.title': 'On s’y voit<br>déjà.',
      'showcase.play': 'Voir le film',
      'showcase.caption': 'Retour sur notre shooting Coupe du monde.',
      'occ.eyebrow': 'Votre soirée, votre histoire',
      'occ.title': 'Toute occasion<br>est la <em>bonne.</em>',
      'occ.intro': 'Un film sous les étoiles ou le match que tout le monde attend. Pour votre fête privée ou votre événement d’entreprise à huis clos.',
      'occ.photo': 'Fait pour être vécu ensemble.',
      'occ.1.t': 'Le match.',
      'occ.1.d': 'Le suspense. Les cris de joie. Votre tribune au jardin, pour le foot, le vélo ou la finale.',
      'occ.2.t': 'La soirée ciné.',
      'occ.2.d': 'Plaids, pop-corn et vos personnes préférées. Votre jardin ou salon devient un cinéma le temps d’un soir.',
      'occ.3.t': 'La soirée gaming.',
      'occ.3.d': 'Voyez vos duels en grand. Faites la course, jouez et gagnez sur plus de 200 pouces. PS5 en option.',
      'occ.4.t': 'Votre moment.',
      'occ.4.d': 'Mariage, anniversaire, communion ou événement interne d’entreprise. Donnez à votre histoire l’image qu’elle mérite.',
      'pkg.eyebrow': 'En grand, à votre façon',
      'pkg.title': 'Votre idée.<br>Votre formule.',
      'pkg.intro': 'Envie d’installer vous-même ou de simplement accueillir vos invités ? À vous de choisir. Des prix de départ clairs, exonérés de TVA.',
      'pkg.from': 'dès',
      'pkg.night': '/ soirée',
      'pkg.select': 'C’est ma soirée',
      'pkg.service': 'On s’occupe de tout',
      'pkg.discuss': 'Parlons de votre événement',
      'pkg.1.label': 'L’essentiel',
      'pkg.1.t': 'Projecteur seul',
      'pkg.1.d': 'Vous avez le lieu et un écran ou un mur blanc. Nous avons l’image.',
      'pkg.1.sub': '100 € pour tout un week-end',
      'pkg.1.f1': 'Projecteur laser 4K',
      'pkg.1.f2': 'Câbles et télécommande',
      'pkg.1.f3': 'Retrait et retour sur rendez-vous',
      'pkg.2.label': 'L’expérience complète',
      'pkg.2.t': 'Ensemble grand écran',
      'pkg.2.d': 'Tout pour votre cinéma à vous. Grande image, beau son, grandes émotions.',
      'pkg.2.sub': '250 € pour tout un week-end',
      'pkg.2.f1': 'Écran de plus de 200 pouces, soufflerie silencieuse',
      'pkg.2.f2': 'Projecteur laser 4K et sonorisation',
      'pkg.2.f3': 'Pieds, câbles et explications de montage',
      'pkg.3.label': 'Il ne reste qu’à profiter',
      'pkg.3.t': 'Événement clé en main',
      'pkg.3.d': 'Du premier câble au générique de fin. Nous gérons toute la technique.',
      'pkg.3.sub': 'Anvers + 15 km · sans caution',
      'pkg.3.f1': 'L’ensemble grand écran complet',
      'pkg.3.f2': 'Livraison, installation et reprise',
      'pkg.3.f3': 'Régie pendant votre événement',
      'pkg.4.label': 'Un projet plus grand ?',
      'pkg.4.t': 'Entreprises &amp; longue durée',
      'pkg.4.d': 'Événements internes ou location sur plusieurs jours. Coordination technique, durée flexible et accompagnement sur demande.',
      'pkg.4.price': 'Dès <strong>450 €</strong> · sur mesure',
      'pkg.details': 'À savoir : options, caution &amp; tarifs',
      'pkg.note1': '<strong>Options des formules à emporter :</strong> livraison, installation et reprise 50–80 € · opérateur 100–125 € · enceinte ou câblage supplémentaire 15–25 €.',
      'pkg.note2': '<strong>Caution :</strong> projecteur 300–400 € · ensemble complet 500–750 €. Une carte d’identité avec contrat signé est possible après accord. Aucune caution pour la formule clé en main.',
      'pkg.note3': '<strong>Une offre transparente :</strong> tous les prix sont exonérés de TVA. Les suppléments éventuels sont convenus à l’avance. Vous recevez le prix total avant de confirmer.',
      'addon.title': 'À votre image · sur demande',
      'addon.1.t': 'Ensemble gaming PS5',
      'addon.1.d': 'Console et deux manettes sans fil.',
      'addon.2.t': 'Gardez le souvenir',
      'addon.2.d': 'Photographe ou vidéaste pour votre événement.',
      'addon.3.t': 'Sans prise à proximité',
      'addon.3.d': 'Une batterie nomade silencieuse en option.',
      'proc.eyebrow': 'De l’idée à l’inoubliable',
      'proc.title': 'Grande soirée.<br><em>Zéro casse-tête.</em>',
      'proc.intro': 'Pas de mode d’emploi pour votre soirée. Juste un interlocuteur qui réfléchit avec vous.',
      'proc.cta': 'Racontez-nous votre idée',
      'proc.1.t': 'Vous avez une idée.',
      'proc.1.d': 'Envoyez votre date, votre lieu et votre idée. Via le formulaire, WhatsApp ou un simple appel.',
      'proc.2.t': 'Nous lui donnons forme.',
      'proc.2.d': 'Vous recevez des conseils personnalisés et une offre claire avec le prix total. Rien n’est fixé avant votre accord.',
      'proc.3.t': 'L’écran s’allume.',
      'proc.3.d': 'Retirez le matériel avec nos explications ou laissez-nous l’installer en 30–60 minutes. Ensuite, vous le rapportez ou nous le récupérons, selon votre formule.',
      'faq.eyebrow': 'Côté pratique',
      'faq.title': 'Bon à<br>savoir.',
      'faq.intro': 'Un doute sur votre lieu ou l’installation ? Nous sommes là pour vous conseiller.',
      'faq.link': 'Posez votre question sur WhatsApp',
      'faq.1.q': 'Où livrez-vous ?',
      'faq.1.a': 'À Anvers et dans un rayon d’environ 15 km : notamment Berchem, Deurne, Wilrijk, Mortsel, Edegem, Schoten et Brasschaat. Plus loin ? Parlons-en. Le retrait se fait sur rendez-vous. La livraison est incluse dans la formule clé en main et disponible en supplément avec les autres formules.',
      'faq.2.q': 'Dans mon jardin ou à l’intérieur, c’est possible ?',
      'faq.2.a': 'Oui. Jardin, terrasse, salon, salle de fête ou bureau : nous adaptons l’installation à votre lieu. Dehors, le crépuscule ou l’obscurité sont importants pour une belle image. Indiquez-nous l’espace et la luminosité disponibles ; nous vous conseillons à l’avance.',
      'faq.3.q': 'Et s’il pleut ou s’il y a du vent fort ?',
      'faq.3.a': 'La sécurité d’abord. Si la météo ne convient pas, nous étudions ensemble à l’avance une solution en intérieur, une autre date ou une alternative adaptée. Une installation extérieure dépend toujours de la météo.',
      'faq.4.q': 'Que dois-je prévoir ?',
      'faq.4.a': 'L’ensemble complet comprend écran, projecteur, son, pieds et câbles. Prévoyez un emplacement sûr et une prise électrique standard. Pas de courant à proximité ? Une batterie nomade est disponible sur demande. Vous fournissez votre film, jeu ou diffusion, ainsi que les comptes et droits d’utilisation nécessaires.',
      'faq.5.q': 'Comment fonctionne la caution ?',
      'faq.5.a': 'La caution est de 300–400 € pour le projecteur seul et de 500–750 € pour l’ensemble complet. Une carte d’identité avec contrat signé est possible après accord. Aucune caution pour la formule clé en main avec régie sur place. Le locataire est responsable des dommages, pertes ou vols selon les conditions de location.',
      'faq.6.q': 'Ma demande vaut-elle réservation ?',
      'faq.6.a': 'Non. Votre demande est gratuite et sans engagement. Nous vérifions votre date et envoyons une offre. La réservation n’est effective qu’après confirmation. Une annulation est possible selon les conditions générales ; des frais peuvent s’appliquer selon le moment.',
      'contact.eyebrow': 'Tout commence par votre idée',
      'contact.title': 'À votre tour.<br><em>En grand.</em>',
      'contact.copy': 'Une date, un lieu, une idée. Il n’en faut pas plus pour imaginer ensemble un grand moment.',
      'contact.response': 'Depuis Anvers, pour votre moment.<br>Réponse personnelle généralement sous 1 jour ouvrable.',
      'form.eyebrow': 'Votre projet, sans engagement',
      'form.required': '* obligatoire',
      'form.name': 'Votre nom',
      'form.email': 'Adresse e-mail',
      'form.date': 'Date de l’événement',
      'form.datehint': 'Pas encore sûr ? Une date indicative convient aussi.',
      'form.location': 'Lieu / code postal',
      'form.package': 'Votre formule',
      'form.choose': 'Faites votre choix',
      'form.unsure': 'Je souhaite un conseil',
      'form.phone': 'Téléphone (facultatif)',
      'form.message': 'Quelle est votre idée ?',
      'form.placeholder': 'Une soirée ciné avec 25 amis dans le jardin…',
      'form.submit': 'Envoyer mon projet',
      'form.consent': 'Sans paiement. Sans engagement. Nous utilisons vos données pour répondre à votre demande. Consultez notre <a href="privacybeleid.html">politique de confidentialité</a>.',
      'form.successtitle': 'Votre projet est en route.',
      'form.successbody': 'Merci ! Vous recevrez généralement une proposition personnalisée sous 1 jour ouvrable. Votre demande n’est pas encore une réservation confirmée.',
      'form.urgent': 'Un détail à ajouter ? Envoyez un WhatsApp.',
      'form.sending': 'Envoi en cours…',
      'form.error': 'L’envoi a échoué. Réessayez ou écrivez-nous à info@beamerij.be.',
      'form.notconfigured': 'Le formulaire est indisponible. Envoyez votre projet à info@beamerij.be.',
      'form.selection': 'Votre sélection :',
      'form.clearselection': 'Effacer la sélection',
      'footer.tagline': 'Grande image. Bonne compagnie.<br>Location de projecteurs et grands écrans depuis Anvers.',
      'footer.top': 'Retour en haut',
      'footer.region': 'Anvers + 15 km · plus loin sur demande',
      'footer.privacy': 'Confidentialité',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Conditions',
      'footer.cookieprefs': 'Préférences de cookies',
      'footer.vat': 'Usage privé et événements d’entreprise à huis clos. Petite entreprise sous le régime de franchise de TVA ; TVA non applicable.',
      'film.title': 'Vécu ensemble.',
      'film.close': 'Fermer le film',
      'film.description': 'Images de notre shooting Coupe du monde. Supporter ensemble, sur grand écran.'
    },
    en: {
      'meta.title': 'Beamerij — Together. Bigger. | Big-screen rental Antwerp',
      'meta.desc': 'Make your evening bigger with Beamerij. Hire a 4K projector, 200+ inch screen and sound in Antwerp. Complete set from €175. Pick it up or leave the setup to us.',
      'meta.ogtitle': 'Beamerij — Together. Bigger.',
      'meta.ogdesc': 'Your people. Your place. A bigger picture. 4K big-screen rental in Antwerp, from pickup to full service.',
      'meta.imagealt': 'Watching football together on a big screen, from the Beamerij photoshoot',
      'meta.twitterdesc': '4K projector, big screen and sound. You invite. We bring the picture.',
      'skip': 'Skip to content',
      'nav.aria': 'Main navigation',
      'nav.menu': 'Open menu',
      'nav.experience': 'The experience',
      'nav.packages': 'Packages',
      'nav.how': 'How it works',
      'nav.cta': 'Plan your evening',
      'hero.eyebrow': 'Big-screen rental · Antwerp',
      'hero.line1': 'Together.',
      'hero.line2': 'Bigger.',
      'hero.copy': 'Your people. Your place. A screen that changes everything.',
      'hero.description': '4K projector, 200+ inch screen and sound. Pick it up or leave the whole setup to us.',
      'hero.cta': 'Make your evening bigger',
      'hero.price': 'Complete set from <strong>€175</strong><span> / evening</span>',
      'hero.film': 'Feel the atmosphere',
      'hero.filmnote': 'From our World Cup photoshoot',
      'hero.rail': 'Don’t just watch. Experience it together.',
      'motion.pause': 'Pause motion',
      'motion.play': 'Resume motion',
      'quick.aria': 'Enquire about your date',
      'quick.title': 'A great plan starts<br>with a date.',
      'quick.label': 'Your event date',
      'quick.cta': 'Ask about availability',
      'quick.note': 'No commitment. A personal reply.<br>Usually within 1 working day.',
      'intro.eyebrow': 'More than a screen',
      'intro.title': 'You invite.<br>We bring the <em>wow.</em>',
      'intro.copy': 'That one goal. The opening scene. A room holding its breath. Some moments deserve more than a TV. Beamerij brings a big picture and great sound to your place. Without the technical hassle.',
      'intro.setaria': 'Discover the complete set',
      'stat.screen': 'A screen that makes an impression',
      'stat.projector': '5,700 lumens. Every detail counts.',
      'stat.completelabel': '% complete',
      'stat.complete': 'Sound, stands and every cable',
      'media.night': 'Together on the grass in front of the big screen during the Beamerij photoshoot',
      'media.crowd': 'Supporters together on the terrace during the photoshoot',
      'showcase.eyebrow': 'Real footage. Real atmosphere.',
      'showcase.title': 'You’ll wish<br>you were here.',
      'showcase.play': 'Watch the film',
      'showcase.caption': 'A look back at our World Cup photoshoot.',
      'occ.eyebrow': 'Your evening, your story',
      'occ.title': 'Every reason<br>is a <em>good one.</em>',
      'occ.intro': 'From a film under the stars to the match everyone’s waiting for. For your private party or closed company event.',
      'occ.photo': 'Made to experience together.',
      'occ.1.t': 'The match.',
      'occ.1.d': 'The tension. The cheers. Your own garden grandstand, for football, cycling or the final.',
      'occ.2.t': 'Movie night.',
      'occ.2.d': 'Blankets, popcorn, your favourite people. Your garden or living room becomes a cinema for the night.',
      'occ.3.t': 'Game night.',
      'occ.3.d': 'A bigger stage for your rivalry. Race, play and win on 200+ inches. Optional PS5 hire.',
      'occ.4.t': 'Your moment.',
      'occ.4.d': 'Wedding, birthday, communion or internal company event. Give your story the picture it deserves.',
      'pkg.eyebrow': 'Go big, your way',
      'pkg.title': 'Your plan.<br>Your package.',
      'pkg.intro': 'Happy to set up yourself, or just want to welcome your guests? You choose. Clear starting prices, VAT-exempt.',
      'pkg.from': 'from',
      'pkg.night': '/ evening',
      'pkg.select': 'This is my evening',
      'pkg.service': 'Take care of it for me',
      'pkg.discuss': 'Let’s talk about your event',
      'pkg.1.label': 'The essentials',
      'pkg.1.t': 'Projector only',
      'pkg.1.d': 'You have the space and a screen or white wall. We have the picture.',
      'pkg.1.sub': '€100 for a full weekend',
      'pkg.1.f1': '4K laser projector',
      'pkg.1.f2': 'Cables and remote control',
      'pkg.1.f3': 'Pickup and return by appointment',
      'pkg.2.label': 'The complete experience',
      'pkg.2.t': 'Full big-screen set',
      'pkg.2.d': 'Everything for your own cinema. Big picture, great sound, all the feels.',
      'pkg.2.sub': '€250 for a full weekend',
      'pkg.2.f1': '200+ inch screen with a quiet blower',
      'pkg.2.f2': '4K laser projector and sound system',
      'pkg.2.f3': 'Stands, cables and clear setup instructions',
      'pkg.3.label': 'All you do is enjoy',
      'pkg.3.t': 'Full-service event',
      'pkg.3.d': 'From the first cable to the closing credits. We handle the technical side.',
      'pkg.3.sub': 'Antwerp + 15 km · no deposit',
      'pkg.3.f1': 'The complete big-screen set',
      'pkg.3.f2': 'Delivery, setup and collection',
      'pkg.3.f3': 'An operator during your event',
      'pkg.4.label': 'Thinking bigger?',
      'pkg.4.t': 'Business &amp; multi-day',
      'pkg.4.d': 'Internal company events or longer rentals. Technical coordination, flexible hire periods and support on request.',
      'pkg.4.price': 'From <strong>€450</strong> · tailored to you',
      'pkg.details': 'Good to know: extras, deposits &amp; prices',
      'pkg.note1': '<strong>Extras for pickup packages:</strong> delivery, setup and collection €50–80 · operator €100–125 · extra speaker or cabling €15–25.',
      'pkg.note2': '<strong>Deposit:</strong> projector €300–400 · full set €500–750. An identity card with a signed agreement is an option by arrangement. No deposit is needed for full service.',
      'pkg.note3': '<strong>A clear proposal:</strong> all prices are VAT-exempt. Any extras are agreed in advance. You receive the total price before you confirm.',
      'addon.title': 'Make it yours · on request',
      'addon.1.t': 'PS5 gaming set',
      'addon.1.d': 'Console and two wireless controllers.',
      'addon.2.t': 'Capture the moment',
      'addon.2.d': 'A photographer or videographer for your event.',
      'addon.3.t': 'No socket needed',
      'addon.3.d': 'A quiet portable power station as an option.',
      'proc.eyebrow': 'From an idea to unforgettable',
      'proc.title': 'Big evening.<br><em>Little effort.</em>',
      'proc.intro': 'No technical manual for your evening. Just one person to help you work it all out.',
      'proc.cta': 'Tell us your plan',
      'proc.1.t': 'You have an idea.',
      'proc.1.d': 'Send your date, place and plan. Use the form, WhatsApp or simply give us a call.',
      'proc.2.t': 'We make it happen.',
      'proc.2.d': 'You get personal advice and a clear proposal with the total price. Nothing is fixed until you agree.',
      'proc.3.t': 'The screen lights up.',
      'proc.3.d': 'Pick it up with instructions, or let us set up in 30–60 minutes. Afterwards, you return it or we collect it, depending on your package.',
      'faq.eyebrow': 'The practical details',
      'faq.title': 'Good to<br>know.',
      'faq.intro': 'Unsure about your location or setup? We’re happy to help you plan.',
      'faq.link': 'Ask us on WhatsApp',
      'faq.1.q': 'Where do you deliver?',
      'faq.1.a': 'In Antwerp and around 15 km beyond: including Berchem, Deurne, Wilrijk, Mortsel, Edegem, Schoten and Brasschaat. Further away? Just ask. Pickup is by appointment. Delivery is included in full service and available as an extra with other packages.',
      'faq.2.q': 'Can I use it in my garden or indoors?',
      'faq.2.a': 'Yes. Garden, terrace, living room, venue or office: we tailor the setup to your space. Outdoors, dusk or darkness matters for a good picture. Tell us about the available space and lighting; we’ll advise you in advance.',
      'faq.3.q': 'What if it rains or gets very windy?',
      'faq.3.a': 'Safety first. If the weather is unsuitable, we’ll discuss an indoor alternative, a new date or another suitable solution with you in advance. Outdoor setups always depend on the weather.',
      'faq.4.q': 'What do I need to provide?',
      'faq.4.a': 'The complete set includes a screen, projector, sound, stands and cables. Provide a safe space and a standard power socket. No power nearby? A portable power station is available on request. You provide your own film, game or broadcast, along with the necessary accounts and usage rights.',
      'faq.5.q': 'How does the deposit work?',
      'faq.5.a': 'The deposit is €300–400 for the projector only, or €500–750 for the full set. An identity card with a signed agreement is an option by arrangement. With full service and an operator on site, no deposit is required. The renter is responsible for damage, loss or theft under the rental terms.',
      'faq.6.q': 'Does my enquiry count as a booking?',
      'faq.6.a': 'No. Your enquiry is free and without commitment. We check your date and send a proposal. A booking only follows after confirmation. You can cancel under the arrangements in the terms and conditions; charges may apply depending on when you cancel.',
      'contact.eyebrow': 'It starts with your idea',
      'contact.title': 'And now:<br><em>your evening.</em>',
      'contact.copy': 'A date, a place, an idea. That’s all we need to plan something big together.',
      'contact.response': 'From Antwerp, for your moment.<br>Usually a personal reply within 1 working day.',
      'form.eyebrow': 'Your plan, no commitment',
      'form.required': '* required',
      'form.name': 'Your name',
      'form.email': 'Email address',
      'form.date': 'Event date',
      'form.datehint': 'Not sure yet? An approximate date is fine.',
      'form.location': 'Location / postcode',
      'form.package': 'Your package',
      'form.choose': 'Make your choice',
      'form.unsure': 'I’d like some advice',
      'form.phone': 'Phone (optional)',
      'form.message': 'What are you planning?',
      'form.placeholder': 'A movie night with 25 friends in the garden…',
      'form.submit': 'Send my plan',
      'form.consent': 'No payment. No commitment. We use your details to answer your enquiry. Read our <a href="privacybeleid.html">privacy policy</a>.',
      'form.successtitle': 'Your plan is on its way.',
      'form.successbody': 'Thank you! You’ll usually hear from us within 1 working day with a personal proposal. Your enquiry is not yet a confirmed booking.',
      'form.urgent': 'Something to add? Send us a WhatsApp.',
      'form.sending': 'Sending…',
      'form.error': 'Your message could not be sent. Please try again or email info@beamerij.be.',
      'form.notconfigured': 'The form is unavailable. Please email your plan to info@beamerij.be.',
      'form.selection': 'Your selection:',
      'form.clearselection': 'Clear selection',
      'footer.tagline': 'Big picture. Good company.<br>Projector and big-screen rental from Antwerp.',
      'footer.top': 'Back to top',
      'footer.region': 'Antwerp + 15 km · further on request',
      'footer.privacy': 'Privacy',
      'footer.cookies': 'Cookies',
      'footer.terms': 'Terms',
      'footer.cookieprefs': 'Cookie preferences',
      'footer.vat': 'Private use and closed company events. Small business under the VAT exemption scheme; VAT does not apply.',
      'film.title': 'Experienced together.',
      'film.close': 'Close the film',
      'film.description': 'Scenes from our World Cup photoshoot. Cheering together, on the big screen.'
    }
  };

  var current = 'nl';
  var canonical = document.querySelector('link[rel="canonical"]');

  function supported(value) {
    var language = typeof value === 'string' ? value.toLowerCase() : '';
    return SUPPORTED.indexOf(language) > -1 ? language : '';
  }

  function getInitial() {
    var query = supported(new URLSearchParams(window.location.search).get('lang'));
    if (query) return query;
    try {
      var stored = supported(localStorage.getItem(STORE));
      if (stored) return stored;
    } catch (e) {}
    return supported((navigator.language || 'nl').slice(0, 2)) || 'nl';
  }

  function remember(language) {
    try { localStorage.setItem(STORE, language); } catch (e) {}
  }

  function val(key) {
    var value = DICT[current][key];
    return value != null ? value : DICT.nl[key];
  }

  function setMeta(selector, value) {
    var element = document.querySelector(selector);
    if (element && value != null) element.setAttribute('content', value);
  }

  function localizePageLinks() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      var url;
      try { url = new URL(href, window.location.href); } catch (e) { return; }
      if (url.origin !== window.location.origin || !/\/(?:[^/]+\.html)?$/.test(url.pathname)) return;
      url.searchParams.set('lang', current);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
  }

  function apply(language) {
    current = supported(language) || 'nl';
    window.__lang = current;
    document.documentElement.setAttribute('lang', LOCALES[current]);

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      var value = val(element.getAttribute('data-i18n'));
      if (value != null && element.innerHTML !== value) element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (element) {
      var value = val(element.getAttribute('data-i18n-ph'));
      if (value != null) element.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-al]').forEach(function (element) {
      var value = val(element.getAttribute('data-i18n-al'));
      if (value != null) element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (element) {
      var value = val(element.getAttribute('data-i18n-alt'));
      if (value != null) element.setAttribute('alt', value);
    });

    var titleKey = document.documentElement.getAttribute('data-i18n-title') || 'meta.title';
    var title = val(titleKey);
    if (title != null) document.title = title;
    var descriptionKey = document.documentElement.getAttribute('data-i18n-desc') || 'meta.desc';
    setMeta('meta[name="description"]', val(descriptionKey));
    setMeta('meta[property="og:title"]', val('meta.ogtitle'));
    setMeta('meta[property="og:description"]', val('meta.ogdesc'));
    setMeta('meta[property="og:image:alt"]', val('meta.imagealt'));
    setMeta('meta[property="og:locale"]', OG_LOCALES[current]);
    setMeta('meta[name="twitter:title"]', val('meta.ogtitle'));
    setMeta('meta[name="twitter:description"]', val('meta.twitterdesc'));
    if (canonical) {
      var canonicalURL = new URL(canonical.href);
      if (current === 'nl') canonicalURL.searchParams.delete('lang');
      else canonicalURL.searchParams.set('lang', current);
      canonical.href = canonicalURL.href;
      setMeta('meta[property="og:url"]', canonicalURL.href);
    }
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === current));
    });
    localizePageLinks();
    document.dispatchEvent(new CustomEvent('beamerij:languagechange', { detail: { lang: current } }));
  }

  window.t = function (key) {
    var value = val(key);
    return value != null ? value : '';
  };

  window.__i18nAddDict = function (extra) {
    if (!extra) return;
    SUPPORTED.forEach(function (language) {
      if (!extra[language]) return;
      for (var key in extra[language]) {
        if (Object.prototype.hasOwnProperty.call(extra[language], key)) DICT[language][key] = extra[language][key];
      }
    });
    apply(current);
  };

  function set(language) {
    language = supported(language);
    if (!language) return;
    remember(language);
    var url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    try { window.history.replaceState(window.history.state, '', url.href); } catch (e) {}
    apply(language);
  }

  window.__setLang = set;
  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-lang]');
    if (!button) return;
    event.preventDefault();
    set(button.getAttribute('data-lang'));
  });
  window.addEventListener('popstate', function () {
    var language = getInitial();
    remember(language);
    apply(language);
  });

  var initial = getInitial();
  remember(initial);
  apply(initial);
})();
