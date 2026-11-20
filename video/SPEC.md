# SPEC — « Comment faire du marketing digital »

GOAL:    à la fin, le spectateur retient « une personne, le bon endroit, mesurer » et sait par où commencer.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps.
TIME:    43 s x 30 = 1290 frames. Voix off = l'horloge (Kokoro `ff_siwis`, 8 phrases, assets/voice/v1–v8.wav).
         Musique : à ajouter (catalogue HeyGen, ~110 BPM pop enjouée) quand l'outil `heygen` sera installé.

LOOK:
- Ouverture et fin (A) : façade de boulangerie en aplats découpés. Mur terracotta #8C4B2F, bois cacao #3B2416,
  store rayé #E8742A / #FBF1DE, vitre #2A1810 → #3D2618 avec un reflet diagonal à 7 %, trottoir #B9A58C.
  Croissants dorés #F2B33D, nervures #C8782E.
- Rythme (C) : aplats saturés, un par idée reçue. Jaune #FFD23F, outremer #2337C6, corail #FF6F59, vert #1F9D63.
- Encre : #1B1410 sur fond clair, #FBF1DE sur fond foncé. Accent : le trait de marqueur rouge #E0262D
  (corail : encre #1B1410). Il barre l'idée reçue et souligne un seul mot de la règle. Rien d'autre n'est rouge.
- Typo : Archivo Black pour les grandes lignes, 130–150 px, interlignage 0.95, approche -1 %, en capitales,
  alignées à gauche sur x = 192. Nunito 800–900 pour les phrases, 40–72 px.

OBJECTS: une vitrine avec un cadre en bois, une étagère et 5 croissants ; une horloge à 7 h 02 ; une porte vitrée
         avec une clochette en laiton ; le ticket client de Léa (carte blanche inclinée de -4°) ; une épingle de carte ;
         3 tampons (visites, appels, ventes) ; 3 barres qui montent ; une file de 7 silhouettes.

MOTION:  arrivée expo.out ou power4.out 0.3–0.5 s ; sortie power3.in 0.2–0.3 s ; nappe de couleur power2.inOut 0.45 s ;
         mots qui arrivent : flou 8 px → 0 en 0.15 s, 0.07 s d'écart, sans déplacement ; trait de marqueur en 0.35 s
         power2.out ; ressorts back.out(1.6) sur les tampons et le ticket (jamais sur l'opacité).

SHOTS (secondes globales) :
1. 0.0–6.2   Vitrine au petit matin, poussée de caméra 1.15 → 1. « De bons croissants. » (≈1.9), « Une boutique vide. » (≈3.6).
             Sortie : la caméra plonge dans la vitre (power3.in) + whoosh.
2. 6.2–10.4  Intérieur sombre, un grand croissant. « Le produit ? Excellent. » (7.7), « PERSONNE / NE LE SAIT. » (8.7).
             Nappe jaune qui part du croissant + whoosh.
3. 10.4–15.4 Jaune. ~~IL FAUT ÊTRE PARTOUT~~ (rature à 12.1) → SOIS LÀ OÙ / SONT TES **CLIENTS**. 12 croissants
             éparpillés se rassemblent sur une épingle (14.0, pop). Sortie : coup de fouet vers la gauche.
4. 15.4–21.8 Outremer. ~~PUBLIE TOUS LES JOURS~~ (16.3) → PUBLIE POUR / **QUELQU'UN**. Ticket de Léa (18.6, pop),
             « 8 h » entouré (20.6). Nappe corail qui part du ticket.
5. 21.8–26.6 Corail. ~~PLUS DE LIKES = PLUS DE VENTES~~ (22.7) → MESURE CE / QUI **RAPPORTE**. Tampons visites 24.1,
             appels 24.7, ventes 25.3. Sortie : coup de fouet vers le haut.
6. 26.6–31.2 Vert. ~~IL FAUT UN GROS BUDGET~~ (27.6) → COMMENCE PETIT, / **AJUSTE**. Trois barres 28.5 / 29.2 / 30.1.
7. 31.2–35.0 Ouverture en iris sur la façade éclairée ; la file de clients arrive de la droite ; la clochette sonne
             (31.5, 33.6). « Le lendemain… »
8. 35.0–43.0 Or #F2B33D. « Le marketing digital, c'est : » puis UNE PERSONNE. (37.2) / LE BON ENDROIT. (38.0) /
             **MESURER.** (39.1, impact). Tenu jusqu'à 43.0.

BANNED:  fond sombre vide avec de petits éléments ; glow, particules, néon ; dégradés violets ou bleus, cartes en verre ;
         papier crème + serif + étiquettes en mono ; « 01 / 02 » ; puces et pilules ; tout centré ; tout en fondu et
         glissé vers le haut ; titres qui bougent une fois posés ; trois cartes en ligne ; logo dans un coin ;
         carte de fin de marque.

QA: 0.0 (vignette : la vitrine), 3.8, 6.4, 9.0, 12.3, 14.2, 18.9, 20.8, 25.5, 30.3, 33.0, 39.5, 42.5.
