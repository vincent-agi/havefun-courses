# M1 : Mathématiques — Du problème historique à la notion

> Milestone 1 sur 4. Chaque *issue* part d'un problème réel, daté et documenté, auquel des savants ont été confrontés faute de la notion visée. L'élève rejoue l'expérience d'origine sur le terrain (Expérience 1), puis résout seul un second problème historique de même nature (Expérience 2).
>
> Sources dépouillées : `maths/6eme` (exemples de mise en œuvre, éduscol), `maths/5eme`, `maths/4eme`, `maths/3eme` (attendus de fin d'année, éduscol).
> Regroupement : une issue par concept porteur d'un ancrage historique distinct (18 issues).

---

## Issue 1.1 — [6e] Le nombre π et le périmètre du cercle

**1. Sous-notion & niveau.** Le périmètre d'un disque est proportionnel à son diamètre ; le coefficient est le nombre π ; formule P = π × D. Niveau 6e (thème *Grandeurs et mesures*).

**2. Contexte historique authentique.** À Syracuse, cité grecque de Sicile, Archimède (287–212 av. J.-C.) s'attaque à un problème que personne n'a résolu proprement : donner un encadrement fiable de la longueur d'un cercle. Les arpenteurs et les charpentiers de marine utilisaient des valeurs approchées grossières (3, ou 3 + 1/8 chez les Babyloniens). Sans encadrement rigoureux, impossible de calculer la quantité de bronze pour une jante, la corde pour un cercle tracé au sol, ou la contenance d'un réservoir cylindrique. Dans son traité *La Mesure du cercle*, Archimède encadre le cercle entre un polygone inscrit et un polygone circonscrit, double le nombre de côtés jusqu'à 96, et démontre : 223/71 < π < 22/7, soit 3,1408 < π < 3,1429. C'est la première fois qu'une constante géométrique est bornée par un raisonnement, et non mesurée à la ficelle.

**3. Expérience 1 — Guidée (extérieur, cour ou préau).**
- *Matériel :* 5 objets circulaires de tailles très différentes (couvercle de poubelle, roue de vélo, assiette, rondelle de tronc, cerceau), une ficelle non élastique, un mètre ruban, un feutre, une craie.
- *Protocole :*
  1. Pour chaque objet, marquer un point de départ sur le bord et faire rouler l'objet sur une ligne à la craie sur un tour complet ; mesurer la distance parcourue = périmètre P.
  2. Mesurer le diamètre D de chaque objet (plus grande largeur, en passant par le centre).
  3. Consigner P et D dans un tableau, puis calculer le quotient P / D pour chaque objet.
- *Mesures à prendre :* P et D au centimètre près pour 5 objets.
- *Interprétation :* tous les quotients P / D tombent autour de 3,14, quelle que soit la taille. La longueur du cercle est donc **proportionnelle** au diamètre. On retrouve « à la main » la constante qu'Archimède a bornée par le calcul : c'est π.

**4. Expérience 2 — En autonomie / Défi.** Archimède aurait aussi estimé la circonférence d'un champ circulaire sans pouvoir le traverser. Dans la cour, on plante un piquet et on trace au cordeau un cercle de 4 m de rayon (zone « infranchissable »). Sans marcher à l'intérieur, l'élève doit prévoir la longueur de grillage nécessaire pour clôturer ce cercle, puis vérifier en déroulant la ficelle sur le tracé. Écart admis : moins de 5 %.

---

## Issue 1.2 — [6e] L'angle droit et l'arpentage : la corde à 13 nœuds

**1. Sous-notion & niveau.** Construire et reconnaître un angle droit ; construire un triangle connaissant ses trois côtés ; vocabulaire des angles. Niveau 6e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** En Égypte, le Nil déborde chaque été et efface les limites des champs. Hérodote (*Histoires*, livre II, Ve siècle av. J.-C.) rapporte que le pharaon Sésostris faisait redécouper les parcelles après la crue et que c'est de là que serait née la géométrie (« mesure de la terre »). Les *harpédonaptes* (« tendeurs de corde ») rétablissaient des angles droits pour les bornages et pour l'orientation des temples. Sans instrument à angle droit, ils utilisaient une corde fermée divisée par des nœuds en 12 intervalles égaux : tendue en triangle de côtés 3, 4 et 5 intervalles, elle forme forcément un angle droit entre les côtés 3 et 4. C'est une application concrète de la relation 3² + 4² = 5², connue et utilisée bien avant sa démonstration grecque.

**3. Expérience 1 — Guidée (extérieur, terrain plat).**
- *Matériel :* une corde de 6,5 m, un mètre, 3 piquets, un feutre indélébile.
- *Protocole :*
  1. Faire 13 nœuds régulièrement espacés de 50 cm sur la corde, puis nouer les deux extrémités ensemble (12 intervalles).
  2. Planter un piquet, y accrocher un nœud ; tendre 3 intervalles jusqu'à un 2e piquet ; tendre 4 intervalles dans une autre direction jusqu'à un 3e piquet ; refermer avec les 5 intervalles restants.
  3. Une fois la corde bien tendue, mesurer l'angle au premier piquet avec une équerre.
- *Mesures :* l'angle mesuré ; les longueurs réelles des trois côtés.
- *Interprétation :* l'angle vaut 90° alors qu'on n'a utilisé aucun instrument à angle droit — seulement des longueurs. La forme du triangle est entièrement déterminée par ses trois côtés.

**4. Expérience 2 — En autonomie / Défi.** Les bâtisseurs de temples devaient tracer au sol un rectangle parfait avant de poser la première pierre. Avec la seule corde à 13 nœuds et des piquets, l'élève doit matérialiser dans la cour un rectangle de 3 m sur 4 m et prouver qu'il est correct en vérifiant que ses deux diagonales ont la même longueur.

---

## Issue 1.3 — [6e] La proportionnalité et la règle de trois

**1. Sous-notion & niveau.** Reconnaître une situation de proportionnalité ; résoudre par linéarité, passage à l'unité, coefficient ; problèmes d'échelle. Niveau 6e (thème *Proportionnalité*).

**2. Contexte historique authentique.** Léonard de Pise, dit Fibonacci (v. 1170–v. 1250), fils d'un fonctionnaire des douanes de la République de Pise, apprend le calcul indo-arabe à Bougie (Béjaïa, actuelle Algérie). En 1202, il publie le *Liber Abaci*. Les marchands italiens de l'époque manient des monnaies, des poids et des mesures qui changent d'une ville à l'autre : convertir des livres de Gênes en florins de Florence, ramener un prix « aux 100 » à un prix « à la pièce », partager un bénéfice au prorata des mises. Le *Liber Abaci* diffuse pour cela la *regula de tribus* (règle de trois) : de trois grandeurs connues liées proportionnellement, on déduit la quatrième. L'ouvrage impose aussi les chiffres 0 à 9 et la numération de position, qui rendent ces calculs praticables sans abaque.

**3. Expérience 1 — Guidée (extérieur, marché ou cour aménagée en étals).**
- *Matériel :* une balance de cuisine, des lots de fruits/légumes (ou sachets de sable étiquetés), des étiquettes de prix « au kilo », une calculatrice, un carnet.
- *Protocole :*
  1. Relever pour 4 produits le prix affiché au kilo.
  2. Peser une portion réelle de chaque produit (ex. 640 g de pommes).
  3. Calculer le prix de la portion par passage à l'unité (prix au kilo ÷ 1000 × masse en g), puis par coefficient.
  4. Doubler puis tripler une portion et vérifier que le prix double puis triple.
- *Mesures :* masse et prix calculé pour chaque produit ; prix pour portion simple, double, triple.
- *Interprétation :* le prix est proportionnel à la masse ; le coefficient est le prix au gramme. La règle de trois de Fibonacci donne directement la « quatrième grandeur ».

**4. Expérience 2 — En autonomie / Défi.** Les marchands lisaient une carte à l'échelle pour estimer des distances de convoi. On remet à l'élève un plan du quartier à l'échelle 1/2000. Il doit prévoir la longueur réelle d'un trajet de la cour au portail, puis la mesurer au décamètre sur le terrain. Écart admis : moins de 10 %.

---

## Issue 1.4 — [6e] La division euclidienne et le calendrier

**1. Sous-notion & niveau.** Division euclidienne d'un entier (dividende, diviseur, quotient, reste) ; lien avec les conversions d'unités de durée. Niveau 6e (thème *Nombres et calculs*).

**2. Contexte historique authentique.** Le calendrier julien, en vigueur depuis Jules César (46 av. J.-C.), compte une année de 365 jours plus un jour tous les 4 ans. Mais l'année des saisons dure environ 365,2422 jours : le calendrier julien avance donc d'environ 3 jours tous les 400 ans. Au XVIe siècle, l'équinoxe de printemps, fixé au 21 mars pour le calcul de Pâques, tombe en réalité vers le 11 mars. Le pape Grégoire XIII charge une commission — dont l'astronome Christopher Clavius et le médecin Luigi Lilio — de corriger la dérive. La bulle *Inter gravissimas* (24 février 1582) supprime 10 jours (au jeudi 4 octobre 1582 succède le vendredi 15 octobre) et change la règle des années bissextiles : une année séculaire n'est bissextile que si son millésime est divisible par 400. Tout repose sur des divisions avec reste.

**3. Expérience 1 — Guidée (extérieur puis salle).**
- *Matériel :* un bâton planté verticalement (gnomon) d'environ 1 m, un mètre ruban, une craie, un chronomètre, l'éphéméride locale du lever/coucher du Soleil.
- *Protocole :*
  1. Sur une journée, mesurer la longueur de l'ombre du gnomon toutes les 30 min et repérer l'instant où elle est la plus courte (midi solaire vrai).
  2. Compter le nombre de jours entre deux midis solaires successifs les plus courts sur une semaine, puis estimer la durée moyenne d'un jour solaire en heures/min/s.
  3. Poser la division euclidienne : nombre total de secondes d'une année ÷ 86 400 (secondes d'un jour) ; identifier quotient (365) et reste.
  4. Convertir ce reste en heures, minutes, secondes par divisions successives.
- *Mesures :* longueurs d'ombre ; instant du minimum ; quotient et reste de la division.
- *Interprétation :* le reste (≈ 0,2422 jour ≈ 5 h 49 min) est exactement ce que le calendrier doit « rattraper ». La règle des 400 ans de Grégoire XIII est le meilleur compromis en nombres entiers.

**4. Expérience 2 — En autonomie / Défi.** Les comptables antiques convertissaient de grandes durées en unités mixtes. Sans calculatrice, l'élève doit exprimer 1 000 000 de secondes en jours, heures, minutes et secondes, uniquement par divisions euclidiennes successives, et vérifier son résultat en refaisant le calcul dans l'autre sens.

---

## Issue 1.5 — [6e] La symétrie axiale et les pavages

**1. Sous-notion & niveau.** Symétrique d'un point / d'une figure par rapport à une droite ; conservation des longueurs et des angles ; axes de symétrie. Niveau 6e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** Au palais de l'Alhambra, à Grenade, construit par les souverains nasrides aux XIIIe et XIVe siècles (principalement sous Yusuf Ier et Muhammad V, vers 1350–1390), les murs sont couverts de *zelliges* : des mosaïques de faïence assemblées sans laisser d'espace. L'art figuratif étant écarté de ce décor, les artisans explorent systématiquement les façons de recouvrir un plan par répétition d'un même motif. Ils utilisent pour cela les réflexions (symétries axiales), les rotations et les translations. Ces pavages réalisent, plusieurs siècles avant leur formalisation mathématique au XIXe siècle, un inventaire quasi complet des symétries possibles d'une frise ou d'un plan.

**3. Expérience 1 — Guidée (extérieur, sol dallé de la cour).**
- *Matériel :* craies de couleur, une grande règle ou une planche droite, un fil à plomb ou une ficelle lestée, du papier calque, un miroir de poche.
- *Protocole :*
  1. Choisir une ligne de joint du dallage comme axe (d).
  2. À la craie, dessiner d'un côté de (d) un motif simple (triangle, empreinte de main, flèche) sur 3 ou 4 dalles.
  3. Pour chaque sommet du motif, tendre la ficelle perpendiculairement à (d), reporter de l'autre côté la même distance à l'axe, marquer le point image.
  4. Relier les points images pour tracer le motif symétrique ; vérifier avec le miroir posé sur (d).
  5. Mesurer un segment du motif et son image ; mesurer un angle et son image.
- *Mesures :* longueurs et angles avant/après réflexion.
- *Interprétation :* la symétrie axiale conserve les longueurs et les angles ; le miroir confirme la construction. En répétant motif + image, on obtient une frise comme celles de l'Alhambra.

**4. Expérience 2 — En autonomie / Défi.** Les artisans nasrides devaient garantir qu'un motif se raccorde parfaitement à lui-même. Sur une bande de 6 dalles, l'élève doit créer un motif dont la frise possède **à la fois** un axe de symétrie vertical et un centre de symétrie, puis le prouver par pliage du calque et par demi-tour du calque.

---

## Issue 1.6 — [5e] L'aire du disque et la méthode d'exhaustion

**1. Sous-notion & niveau.** Aire du disque (A = π × R²) ; encadrement d'une aire courbe par des aires connues. Niveau 5e (thème *Grandeurs et mesures*).

**2. Contexte historique authentique.** Calculer l'aire d'une surface limitée par une courbe est resté longtemps hors de portée : on ne savait mesurer que des polygones. À Syracuse, Archimède démontre dans *La Mesure du cercle* que l'aire d'un disque est égale à celle d'un triangle rectangle dont un côté de l'angle droit est le rayon et l'autre le périmètre du cercle. Sa méthode, dite « d'exhaustion », consiste à coincer le disque entre un polygone inscrit et un polygone circonscrit dont on sait calculer les aires, puis à augmenter indéfiniment le nombre de côtés pour rendre l'écart aussi petit qu'on veut. Vers 263 apr. J.-C., en Chine, Liu Hui applique la même idée dans son commentaire des *Neuf Chapitres* et atteint π ≈ 3,1416 avec un polygone à 3 072 côtés.

**3. Expérience 1 — Guidée (extérieur, cour + sol quadrillé ou pelouse).**
- *Matériel :* un cordeau et un piquet, de la craie, un grand quadrillage tracé au sol (carreaux de 20 cm) ou du papier millimétré grand format, une calculatrice.
- *Protocole :*
  1. Tracer au cordeau un cercle de rayon 1 m sur le quadrillage.
  2. Compter les carreaux entièrement à l'intérieur du cercle : leur aire totale est une **valeur par défaut** de l'aire du disque.
  3. Compter les carreaux qui touchent le cercle ou sont dedans : leur aire totale est une **valeur par excès**.
  4. Inscrire puis circonscrire un carré, un hexagone, un octogone régulier au cercle ; calculer leurs aires ; resserrer l'encadrement.
  5. Comparer l'intervalle obtenu à π × R² = π × 1² ≈ 3,14 m².
- *Mesures :* aire par défaut, aire par excès, aires des polygones.
- *Interprétation :* plus le polygone a de côtés, plus l'encadrement se resserre autour de 3,14 m². On « épuise » l'écart, exactement comme Archimède et Liu Hui.

**4. Expérience 2 — En autonomie / Défi.** Archimède savait aussi comparer l'aire d'un disque à celle du carré construit sur son rayon. Dans la cour, l'élève doit estimer l'aire d'une flaque, d'un massif ou d'une tache d'herbe de forme quelconque, uniquement en l'encadrant par des rectangles tracés à la craie, et donner une valeur par défaut et une valeur par excès.

---

## Issue 1.7 — [5e] Les nombres relatifs : fortunes et dettes

**1. Sous-notion & niveau.** Nombres relatifs ; notion d'opposé ; addition et soustraction de relatifs ; repérage sur une droite graduée. Niveau 5e (thème *Nombres et calculs*).

**2. Contexte historique authentique.** Le mathématicien et astronome indien Brahmagupta, actif à Bhillamala (Bhinmal, Rajasthan), écrit en 628 le *Brāhmasphuṭasiddhānta*. Il y donne, pour la première fois de façon explicite et systématique, les règles de calcul avec le zéro **et** avec des quantités négatives. Il interprète ces dernières comme des « dettes » (*ṛṇa*) par opposition aux « fortunes » (*dhana*) : la somme d'une dette et d'une fortune de même valeur est nulle ; le produit de deux dettes est une fortune ; retrancher une dette revient à ajouter une fortune. Ces règles, issues de la comptabilité, mettront près de mille ans à être pleinement acceptées en Europe, où les racines négatives seront longtemps qualifiées d'« absurdes ».

**3. Expérience 1 — Guidée (extérieur, allée de la cour transformée en droite graduée).**
- *Matériel :* un long mètre ruban ou une corde graduée tous les mètres, des plots numérotés, des jetons « + » (fortune) et « − » (dette), une craie.
- *Protocole :*
  1. Tracer une droite au sol, choisir une origine (0), graduer de −10 à +10 (1 pas = 1 unité). Un sens = fortunes, l'autre = dettes.
  2. L'élève se place en 0. Tirer des cartes « +3 », « −5 », « −(−2) »… ; à chaque carte, avancer ou reculer du nombre de pas correspondant.
  3. Noter la position après chaque carte : c'est le résultat de la somme cumulée.
  4. Rejouer une séquence en remplaçant chaque « soustraire une dette » par « ajouter une fortune » et vérifier qu'on arrive au même plot.
- *Mesures :* position finale pour plusieurs séquences ; comparaison des deux méthodes.
- *Interprétation :* la droite graduée matérialise les relatifs ; « −(−2) » et « +2 » conduisent au même point : soustraire, c'est ajouter l'opposé, comme l'énonce Brahmagupta.

**4. Expérience 2 — En autonomie / Défi.** Les marchands tenaient un livre de comptes avec crédits et débits. On donne à l'élève un relevé fictif de 10 opérations (dépôts et retraits) partant d'un solde de +7. Sans droite tracée, il doit calculer le solde final, indiquer à quel moment le compte est passé « à découvert », et donner l'écart entre le plus haut et le plus bas solde atteints.

---

## Issue 1.8 — [5e] Les nombres premiers et le crible d'Ératosthène

**1. Sous-notion & niveau.** Multiples et diviseurs ; nombres premiers inférieurs à 30 ; critères de divisibilité ; décomposition en produit de facteurs premiers. Niveau 5e (thème *Nombres et calculs*).

**2. Contexte historique authentique.** Ératosthène de Cyrène (v. 276–194 av. J.-C.) dirige la Bibliothèque d'Alexandrie, le plus grand centre de savoir du monde hellénistique. Parmi ses travaux figure un procédé pour dresser la liste des nombres premiers sans avoir à tester chaque nombre un par un : on écrit tous les entiers jusqu'à une borne, on garde 2 et on raye tous ses multiples, on garde 3 et on raye tous ses multiples, et ainsi de suite ; les nombres jamais rayés sont premiers. Ce « crible » est resté, plus de deux mille ans après, la méthode élémentaire de référence pour énumérer les premiers.

**3. Expérience 1 — Guidée (extérieur, grande grille tracée à la craie).**
- *Matériel :* craies de plusieurs couleurs, un sol goudronné, un mètre pour tracer une grille régulière 10 × 10.
- *Protocole :*
  1. Écrire les entiers de 1 à 100 dans la grille.
  2. Barrer 1 (par convention non premier). Entourer 2 en rouge, puis marcher de case en case en sautant de 2 en 2 et barrer chaque multiple.
  3. Entourer 3 en bleu, parcourir la grille de 3 en 3, barrer les multiples.
  4. Recommencer avec 5, puis 7. S'arrêter : 7² = 49 < 100 < 11², donc tout nombre non barré ≤ 100 est premier.
  5. Choisir 3 nombres barrés (ex. 84) et écrire leur décomposition en facteurs premiers en remontant les couleurs qui les ont rayés.
- *Mesures :* liste des nombres entourés (25 premiers ≤ 100) ; décompositions obtenues.
- *Interprétation :* le déplacement physique « de k en k » fait sentir ce qu'est un multiple ; les nombres survivants sont les « briques » multiplicatives de tous les autres.

**4. Expérience 2 — En autonomie / Défi.** Deux engrenages de 12 et 18 dents tournent ensemble. L'élève doit prévoir, en décomposant 12 et 18 en facteurs premiers, au bout de combien de dents les deux roues repasseront simultanément par leur position de départ (recherche du plus petit commun multiple), puis vérifier avec deux disques crantés en carton.

---

## Issue 1.9 — [5e] Mesurer la Terre avec une ombre

**1. Sous-notion & niveau.** Proportionnalité et angles ; agrandissement à l'échelle du globe ; un rapport de longueurs égale un rapport d'angles (arcs). Niveau 5e (thèmes *Proportionnalité* et *Espace et géométrie*).

**2. Contexte historique authentique.** Vers 240 av. J.-C., Ératosthène, à Alexandrie, apprend qu'à Syène (Assouan), le jour du solstice d'été à midi, le Soleil éclaire le fond des puits : il est exactement à la verticale. Le même jour, à la même heure, à Alexandrie, un gnomon projette une ombre. Ératosthène mesure l'angle correspondant : environ 1/50 de tour complet (≈ 7,2°). Comme les rayons du Soleil arrivent parallèles, cet angle est aussi celui que forment, au centre de la Terre, les verticales de Syène et d'Alexandrie. Les deux villes sont donc séparées par 1/50 de la circonférence terrestre. Estimant leur distance à 5 000 stades, il en déduit une circonférence d'environ 250 000 stades — résultat correct à quelques pour-cent près, obtenu avec un bâton et de la géométrie.

**3. Expérience 1 — Guidée (extérieur, deux points éloignés + coopération inter-établissements).**
- *Matériel :* deux gnomons identiques (tiges de 1 m bien verticales, vérifiées au fil à plomb), deux mètres rubans, l'heure exacte (téléphone synchronisé), une carte routière ou un GPS pour la distance nord-sud entre les deux sites.
- *Protocole :*
  1. Le même jour, deux équipes (deux villes, ou deux points distants de plusieurs km sur un axe nord-sud) mesurent la longueur de l'ombre du gnomon **au midi solaire local**.
  2. Chaque équipe calcule l'angle du Soleil : tan(angle) = longueur de l'ombre ÷ hauteur du gnomon.
  3. Faire la différence des deux angles → angle Δ au centre de la Terre entre les deux sites.
  4. Mesurer la distance d nord-sud entre les deux sites.
  5. Poser la proportion : Δ / 360° = d / circonférence ; en déduire la circonférence, puis le rayon terrestre.
- *Mesures :* deux longueurs d'ombre, deux angles, la distance d, la circonférence calculée.
- *Interprétation :* comparer au rayon réel (≈ 6 371 km). Un écart de 10–20 % est déjà une réussite : on a « pesé » la planète avec une ombre, comme Ératosthène.

**4. Expérience 2 — En autonomie / Défi.** Sans partenaire distant, l'élève refait la mesure seul, en un lieu, à deux dates séparées de plusieurs semaines : la variation de l'angle du Soleil à midi entre deux dates correspond à un déplacement apparent connu (≈ 0,4°/jour près des équinoxes). Il doit en déduire une estimation du rayon terrestre et discuter les sources d'erreur (verticalité du gnomon, heure du midi solaire).

---

## Issue 1.10 — [5e] Se repérer dans le plan : les coordonnées

**1. Sous-notion & niveau.** Repère orthogonal du plan ; abscisse et ordonnée ; placer et lire des points à coordonnées relatives. Niveau 5e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** En 1637, René Descartes publie à Leyde, aux Provinces-Unies, *La Géométrie*, en appendice au *Discours de la méthode*. Jusque-là, géométrie et algèbre sont deux mondes séparés : on raisonne soit sur des figures, soit sur des équations. Descartes montre qu'en fixant une droite de référence et une unité, tout point d'une courbe peut être décrit par un couple de nombres liés par une équation, et réciproquement. Un problème de géométrie devient un calcul ; une équation devient une courbe. La même année, Pierre de Fermat développe indépendamment une idée voisine. Cette « géométrie analytique » est l'outil qui permettra plus tard de tracer des trajectoires, des cartes et des graphiques.

**3. Expérience 1 — Guidée (extérieur, cour quadrillée à la craie ou terrain de sport).**
- *Matériel :* craies, décamètre, un jeu de « cartes au trésor » préparées (listes de coordonnées), des plots.
- *Protocole :*
  1. Tracer deux axes perpendiculaires au sol, gradués en mètres de −5 à +5, origine commune marquée O.
  2. Un élève annonce des coordonnées (ex. (−3 ; 2)) ; un camarade s'y place en comptant d'abord horizontalement (abscisse), puis verticalement (ordonnée) ; poser un plot.
  3. Placer ainsi 6 plots ; les relier dans l'ordre : une figure apparaît.
  4. Inverser : relever les coordonnées de 4 objets déjà présents dans la cour (banc, arbre, poteau) dans ce repère.
- *Mesures :* coordonnées lues et placées ; longueur d'un segment entre deux plots (comptage de carreaux).
- *Interprétation :* deux nombres suffisent à désigner sans ambiguïté un point ; changer le signe change de « quart de plan ». C'est le principe de Descartes, transposé au sol.

**4. Expérience 2 — En autonomie / Défi.** Un cartographe doit décrire un itinéraire à quelqu'un qui ne voit pas la carte. L'élève place secrètement 5 « balises » dans la cour, en note les coordonnées, puis rédige la seule liste des couples de nombres. Un camarade doit retrouver les 5 balises uniquement avec cette liste et le repère tracé au sol.

---

## Issue 1.11 — [4e] Le théorème de Pythagore

**1. Sous-notion & niveau.** Théorème de Pythagore et sa réciproque ; calcul d'une longueur dans un triangle rectangle ; preuve qu'un triangle est rectangle. Niveau 4e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** La relation entre les côtés d'un triangle rectangle est utilisée bien avant d'être démontrée. La tablette d'argile babylonienne *Plimpton 322* (région de Larsa, vers 1800 av. J.-C., aujourd'hui à l'université Columbia) aligne des colonnes de nombres qui forment des triplets (a, b, c) vérifiant a² + b² = c², comme (3, 4, 5) ou (119, 120, 169). En Chine, le *Zhoubi Suanjing* expose la règle du *gougu* pour le triangle 3-4-5. C'est l'école de Pythagore de Samos, installée à Crotone (Grande-Grèce) au VIe siècle av. J.-C., à qui la tradition attribue la première **démonstration** générale : la propriété devient un théorème, valable pour tout triangle rectangle, et non une simple recette.

**3. Expérience 1 — Guidée (extérieur, terrain plat).**
- *Matériel :* décamètre, cordeau, piquets, craie, une planche découpée en carré ou du sable pour matérialiser des carrés.
- *Protocole :*
  1. Construire au sol un triangle rectangle de côtés 3 m et 4 m (angle droit vérifié à l'équerre ou à la corde à 13 nœuds) ; mesurer l'hypoténuse.
  2. Sur chacun des trois côtés, tracer à la craie le carré correspondant (côté = longueur du côté).
  3. Recouvrir le petit carré (3×3) et le carré moyen (4×4) de carreaux de 50 cm ; compter les carreaux. Faire de même pour le grand carré.
  4. Comparer : nombre de carreaux du grand carré vs somme des deux autres.
  5. Recommencer avec un triangle de côtés 2 m et 5 m.
- *Mesures :* longueur mesurée de l'hypoténuse ; nombres de carreaux des trois carrés.
- *Interprétation :* l'aire du carré sur l'hypoténuse égale la somme des aires des deux autres carrés : c'est a² + b² = c². La mesure directe de l'hypoténuse confirme le calcul.

**4. Expérience 2 — En autonomie / Défi.** Un maçon veut vérifier qu'un mur de la cour est bien perpendiculaire au sol sans monter d'échafaudage. L'élève doit, en ne mesurant que trois longueurs (au sol, le long du mur, et en diagonale), prouver par la réciproque du théorème si l'angle mur/sol est droit ou non.

---

## Issue 1.12 — [4e] Le théorème de Thalès et la hauteur de la pyramide

**1. Sous-notion & niveau.** Théorème de Thalès et sa réciproque ; proportionnalité des longueurs dans une configuration de triangles ; agrandissement–réduction. Niveau 4e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** Plutarque (*Le Banquet des Sept Sages*) et Diogène Laërce rapportent que Thalès de Milet (v. 624–v. 548 av. J.-C.), en visite en Égypte, aurait déterminé la hauteur de la grande pyramide sans l'escalader : il aurait planté un bâton vertical et attendu l'instant où l'ombre du bâton est égale à sa hauteur ; à cet instant, l'ombre de la pyramide est égale à sa hauteur. Une autre version, plus générale, utilise le fait que le rapport (hauteur / longueur de l'ombre) est le même pour le bâton et pour la pyramide au même moment. Dans les deux cas, l'idée est neuve : deux objets éclairés par le même Soleil forment des triangles **de même forme**, donc à côtés proportionnels. C'est le cœur de ce qu'on appelle aujourd'hui le théorème de Thalès.

**3. Expérience 1 — Guidée (extérieur, journée ensoleillée).**
- *Matériel :* un bâton de 1 m bien vertical (fil à plomb), un mètre ruban, un décamètre, de la craie, un objet inaccessible à mesurer (mât, arbre, façade).
- *Protocole :*
  1. Planter le bâton, mesurer sa hauteur h et la longueur de son ombre o.
  2. Immédiatement, mesurer la longueur de l'ombre O de l'objet inaccessible (du pied de l'objet au bout de l'ombre).
  3. Écrire la proportion : hauteur de l'objet / O = h / o.
  4. En déduire la hauteur de l'objet.
  5. Recommencer 1 heure plus tard : h et o changent, mais le rapport h/o et le résultat pour l'objet doivent rester cohérents.
- *Mesures :* h, o, O à deux instants ; hauteur calculée de l'objet.
- *Interprétation :* le rapport hauteur/ombre ne dépend que de la position du Soleil, pas de l'objet ; on mesure donc une hauteur inaccessible avec un simple bâton, comme Thalès face à la pyramide.

**4. Expérience 2 — En autonomie / Défi.** Par temps couvert, plus d'ombre. L'élève doit mesurer la même hauteur inaccessible avec un autre montage de Thalès : viser le sommet en alignant l'œil, une mire graduée tenue à bout de bras et le sommet de l'objet, puis exploiter les deux triangles semblables (œil–mire et œil–objet). Comparer au résultat obtenu par les ombres.

---

## Issue 1.13 — [4e] Les puissances de 10 : « L'Arénaire » d'Archimède

**1. Sous-notion & niveau.** Puissances de 10 d'exposants positifs et négatifs ; notation scientifique ; ordres de grandeur ; préfixes (nano à giga). Niveau 4e (thème *Nombres et calculs*).

**2. Contexte historique authentique.** Dans l'Antiquité grecque, la numération courante ne va guère au-delà de la myriade (10 000) et de la myriade de myriades (10⁸) ; on dit volontiers que le nombre de grains de sable est « infini ». Archimède, dans un traité adressé au roi Gélon II de Syracuse et connu sous le nom de *L'Arénaire* (ou *Psammite*, « le compteur de sable »), veut réfuter cette idée. Il construit un système capable de nommer des nombres gigantesques, estime la taille d'un grain de sable, puis le volume de l'Univers connu (la sphère des étoiles fixes) et conclut qu'il faudrait de l'ordre de 10⁶³ grains pour le remplir. C'est le premier texte qui manie sciemment des ordres de grandeur et une notation exponentielle.

**3. Expérience 1 — Guidée (extérieur, bac à sable ou plage / cour + terre).**
- *Matériel :* une balance de précision (0,01 g), une petite éprouvette ou un dé à coudre calibré, une loupe, une règle, une calculatrice, un seau, un mètre.
- *Protocole :*
  1. Peser 1 mL de sable sec ; estimer, à la loupe et à la règle, la taille moyenne d'un grain (mesurer une rangée de 10 grains collés, diviser par 10).
  2. En déduire le volume d'un grain, puis le nombre de grains dans 1 mL (≈ 1 cm³), en notation scientifique.
  3. Mesurer les dimensions d'un bac à sable (ou d'un tas), calculer son volume en cm³.
  4. Calculer le nombre total de grains du bac ; l'écrire en notation scientifique et le nommer avec le préfixe adapté.
- *Mesures :* masse de 1 mL, taille d'un grain, volume du bac, nombre de grains (puissance de 10).
- *Interprétation :* un tas « innombrable » se chiffre en 10^n avec n de l'ordre de 8 à 10 ; la notation scientifique rend l'énorme manipulable, exactement le projet d'Archimède.

**4. Expérience 2 — En autonomie / Défi.** Archimède est ensuite passé du grain de sable à l'Univers. L'élève doit estimer, seul et en notation scientifique, le nombre de brins d'herbe d'une pelouse de la cour : définir une petite surface témoin, compter, mesurer l'aire totale, extrapoler, puis exprimer le résultat avec un préfixe (kilo, méga…).

---

## Issue 1.14 — [4e] La racine carrée et le nombre qu'on ne peut pas écrire

**1. Sous-notion & niveau.** Racine carrée d'un nombre positif ; carrés parfaits ; encadrement de √a entre deux entiers ; usage géométrique (diagonale, Pythagore). Niveau 4e (thème *Nombres et calculs*).

**2. Contexte historique authentique.** Les pythagoriciens (Grande-Grèce, Ve siècle av. J.-C.) pensaient que toute longueur pouvait s'exprimer comme rapport de deux entiers. La diagonale d'un carré de côté 1 les met en échec : sa longueur au carré vaut 2, et aucune fraction n'a un carré égal à 2. La tradition attribue cette découverte — l'existence de grandeurs *incommensurables* — à Hippase de Métaponte. C'est une crise : un nombre nécessaire à la géométrie n'a pas d'écriture exacte comme fraction. On apprend alors à l'**encadrer** aussi finement qu'on veut (1,41² = 1,9881 ; 1,42² = 2,0164 ; donc 1,41 < √2 < 1,42) sans jamais l'atteindre exactement.

**3. Expérience 1 — Guidée (extérieur, cour dallée).**
- *Matériel :* décamètre, cordeau, craie, calculatrice, sol quadrillé (dalles de 1 m ou grille tracée).
- *Protocole :*
  1. Tracer un carré de 1 m de côté sur le dallage ; mesurer sa diagonale au mètre ruban le plus précis possible.
  2. Calculer le carré de la mesure obtenue : est-il proche de 2 m² ?
  3. Encadrer la diagonale : tester 1,4 m (carré 1,96), 1,5 m (2,25), puis 1,41 ; 1,42 ; 1,414… en calculant chaque carré, jusqu'à 3 décimales.
  4. Construire un carré de 2 m de côté, mesurer sa diagonale, vérifier qu'elle vaut le double.
- *Mesures :* diagonale mesurée ; suite des encadrements et de leurs carrés.
- *Interprétation :* la mesure « tombe » toujours entre deux valeurs dont les carrés encadrent 2 ; on s'approche de √2 sans l'écrire exactement. La diagonale du carré de côté 2 vaut 2√2 : la racine se comporte proportionnellement à l'agrandissement.

**4. Expérience 2 — En autonomie / Défi.** Un charpentier doit tailler la traverse diagonale d'un cadre rectangulaire de 1,20 m sur 0,90 m. L'élève doit prévoir sa longueur au millimètre en utilisant le théorème de Pythagore et un encadrement de la racine, puis vérifier avec un cordeau tendu sur un cadre réel tracé au sol.

---

## Issue 1.15 — [4e] La trigonométrie du triangle rectangle

**1. Sous-notion & niveau.** Cosinus (puis sinus, tangente en 3e) d'un angle aigu dans un triangle rectangle ; calcul d'une longueur ou d'un angle. Niveau 4e–3e (thème *Espace et géométrie*).

**2. Contexte historique authentique.** Les astronomes grecs cherchent à calculer des distances et des positions sur la sphère céleste. Hipparque de Nicée, actif à Rhodes vers 150 av. J.-C., dresse la première table de « cordes » : à chaque angle au centre d'un cercle il associe la longueur de la corde qui le sous-tend. Trois siècles plus tard, à Alexandrie, Ptolémée reprend et affine ces tables dans l'*Almageste* ; elles permettent de résoudre n'importe quel triangle. Les savants indiens puis arabes (notamment al-Battani, vers 900) remplacent la corde par la demi-corde de l'angle double : c'est le *sinus*. De là viennent le cosinus et la tangente, qui relient directement un angle à un rapport de côtés dans un triangle rectangle.

**3. Expérience 1 — Guidée (extérieur, viser un point élevé).**
- *Matériel :* un rapporteur monté sur une planchette avec une paille et un fil à plomb (clinomètre artisanal), un décamètre, une calculatrice avec touches trigonométriques, une craie.
- *Protocole :*
  1. Se placer à distance connue d du pied d'un objet élevé (mât, arbre) ; mesurer d.
  2. Viser le sommet à travers la paille ; lire l'angle d'élévation α au fil à plomb.
  3. Mesurer la hauteur des yeux du viseur au sol.
  4. Calculer la hauteur au-dessus des yeux : h = d × tan(α) ; ajouter la hauteur des yeux.
  5. Refaire depuis une autre distance et comparer les résultats.
- *Mesures :* d, α, hauteur des yeux, hauteur totale calculée (deux positions).
- *Interprétation :* un angle et une distance suffisent pour une hauteur inaccessible ; c'est la table d'Hipparque transformée en une touche de calculatrice.

**4. Expérience 2 — En autonomie / Défi.** Un géomètre doit connaître la largeur d'une rivière sans la traverser. Sur la cour, une « rivière » est délimitée à la craie. L'élève choisit un repère sur la rive opposée, se déplace le long de sa rive, mesure une base et un angle, et calcule la largeur par la trigonométrie. Vérification au décamètre.

---

## Issue 1.16 — [3e] La fonction et le graphique

**1. Sous-notion & niveau.** Notion de fonction ; image et antécédent ; représentation graphique ; fonctions linéaire et affine ; modélisation d'un phénomène continu. Niveau 3e (thème *Fonctions*).

**2. Contexte historique authentique.** Au XIVe siècle, à Paris, Nicole Oresme (v. 1320–1382), maître à l'université puis évêque de Lisieux, cherche à représenter comment une « qualité » (la vitesse d'un mobile, la chaleur d'une barre) varie le long d'une étendue ou dans le temps. Dans son *Traité des configurations des qualités et des mouvements*, il porte l'étendue (la *longitudo*) sur une ligne horizontale et l'intensité (la *latitudo*) sur des segments verticaux : la figure obtenue « montre » la variation. Il démontre ainsi géométriquement que, pour un mouvement uniformément accéléré, la distance parcourue est celle qu'on ferait à la vitesse moyenne. C'est, près de trois siècles avant Descartes, une première mise en graphique d'une grandeur qui dépend d'une autre.

**3. Expérience 1 — Guidée (extérieur, course chronométrée).**
- *Matériel :* décamètre, plots tous les 5 m sur 50 m, plusieurs chronomètres, papier millimétré grand format ou quadrillage à la craie, une craie.
- *Protocole :*
  1. Un élève marche à allure régulière sur les 50 m ; à chaque plot, un chronométreur note le temps de passage.
  2. Reporter les couples (temps ; distance) sur le graphique (temps en abscisse, distance en ordonnée).
  3. Tracer la courbe : pour une allure régulière, les points sont quasi alignés → fonction linéaire, la pente est la vitesse.
  4. Refaire avec un élève qui accélère progressivement : les points ne sont plus alignés ; la « pente » augmente.
  5. Sur le graphique du marcheur régulier, lire l'image de t = 12 s (distance) et l'antécédent de 30 m (temps).
- *Mesures :* table (temps ; distance) ; pente de la droite ; lectures d'image et d'antécédent.
- *Interprétation :* le graphique traduit la dépendance entre deux grandeurs ; alignement ⇔ proportionnalité ⇔ fonction linéaire. C'est la « configuration » d'Oresme appliquée à une course.

**4. Expérience 2 — En autonomie / Défi.** Oresme représentait aussi le refroidissement. L'élève place un récipient d'eau chaude dehors et relève sa température toutes les 3 minutes pendant une demi-heure. Il doit tracer le graphique température = f(temps), dire si la situation est proportionnelle, et estimer par lecture graphique la température à un instant non mesuré.

---

## Issue 1.17 — [3e] Le mètre et la méridienne

**1. Sous-notion & niveau.** Proportionnalité et grandeurs composées ; conversions d'unités ; triangulation (angles, triangles semblables) ; ordres de grandeur. Niveau 3e (thèmes *Grandeurs et mesures*, *Espace et géométrie*).

**2. Contexte historique authentique.** Avant la Révolution française, chaque région a ses unités de longueur : la toise de Paris n'est pas celle de Lyon, ce qui entrave le commerce et l'impôt. En 1791, l'Assemblée décide de définir une unité universelle « prise dans la nature » : le mètre sera la dix-millionième partie du quart du méridien terrestre. De 1792 à 1799, deux astronomes, Jean-Baptiste Delambre (de Dunkerque vers Rodez) et Pierre Méchain (de Rodez vers Barcelone), mesurent l'arc de méridien entre ces villes par **triangulation** : une chaîne de triangles dont on ne mesure au sol qu'une seule base, tous les autres côtés étant calculés à partir d'angles. L'opération, menée en pleine tourmente révolutionnaire, aboutit au mètre étalon de 1799.

**3. Expérience 1 — Guidée (extérieur, grand espace : stade, parc).**
- *Matériel :* un décamètre (pour une seule base), un théodolite d'école ou un rapporteur monté sur trépied, des jalons, un carnet, une calculatrice.
- *Protocole :*
  1. Choisir deux points A et B distants d'environ 30 m ; mesurer précisément AB au décamètre : c'est **la base**, la seule longueur mesurée.
  2. Choisir un point C éloigné (100 m ou plus), visible de A et de B. Depuis A, mesurer l'angle entre B et C ; depuis B, mesurer l'angle entre A et C.
  3. Calculer AC et BC à l'aide des angles et de la base (triangle entièrement déterminé par un côté et deux angles).
  4. Ajouter un point D, former un 2e triangle appuyé sur AC, calculer AD.
  5. Comparer AD calculé à AD mesuré directement au décamètre (contrôle).
- *Mesures :* base AB ; 4 angles ; longueurs AC, BC, AD calculées ; AD mesuré.
- *Interprétation :* on obtient de longues distances sans les parcourir, à partir d'**une** mesure et d'angles. C'est le procédé exact de Delambre et Méchain, à l'échelle de la cour.

**4. Expérience 2 — En autonomie / Défi.** L'élève doit déterminer la distance jusqu'à un point inaccessible (clocher, château d'eau, arbre de l'autre côté d'un grillage) en ne mesurant qu'une base dans la cour et deux angles, puis exprimer le résultat en mètres **et** en « toises » (1 toise ≈ 1,949 m) pour mesurer l'apport de l'unification.

---

## Issue 1.18 — [3e] Le hasard mis en équation

**1. Sous-notion & niveau.** Probabilité d'un événement (nombre entre 0 et 1) ; équiprobabilité ; expériences à une ou deux épreuves ; stabilisation des fréquences. Niveau 3e (thème *Probabilités*).

**2. Contexte historique authentique.** En 1654, Antoine Gombaud, chevalier de Méré, soumet à Blaise Pascal un vieux problème de jeu : si une partie en plusieurs manches est interrompue avant la fin, comment partager équitablement les mises entre les joueurs selon le score atteint ? Pascal échange par lettres avec Pierre de Fermat pendant l'été 1654. Ensemble, ils établissent qu'il faut raisonner sur **tous les déroulements futurs également possibles** et attribuer à chaque joueur une part proportionnelle au nombre de ceux qui le font gagner. Cette correspondance est considérée comme l'acte de naissance du calcul des probabilités ; en 1657, Christiaan Huygens en publie la première synthèse imprimée.

**3. Expérience 1 — Guidée (extérieur, cour).**
- *Matériel :* deux pièces de monnaie, un dé, des gobelets, une grande feuille ou un tableau à la craie pour cocher, une calculatrice.
- *Protocole :*
  1. Lister d'abord tous les résultats possibles d'un lancer de deux pièces : PP, PF, FP, FF (4 issues également probables).
  2. Prévoir la probabilité d'obtenir « exactement un pile » : 2 cas sur 4 = 0,5.
  3. Lancer 20 fois, puis 100 fois (en cumulant les résultats de la classe) ; noter à chaque palier la fréquence de « exactement un pile ».
  4. Tracer la fréquence en fonction du nombre de lancers.
- *Mesures :* fréquences successives ; comparaison à la probabilité prévue (0,5).
- *Interprétation :* sur peu de lancers la fréquence fluctue ; sur beaucoup de lancers elle se stabilise autour de la probabilité calculée. Le partage « juste » de Pascal et Fermat repose sur ce dénombrement des cas.

**4. Expérience 2 — En autonomie / Défi.** Reprendre le problème des partis : deux joueurs jouent en 3 manches gagnantes à pile ou face, la partie est arrêtée alors que le score est 2 à 1. L'élève doit énumérer les déroulements possibles des manches restantes, en déduire la probabilité de victoire de chaque joueur, et proposer le partage équitable d'une cagnotte de 64 jetons. Vérification par simulation (50 parties rejouées).

---

*Fin du Milestone 1. Suite : `M2-physique.md`.*
