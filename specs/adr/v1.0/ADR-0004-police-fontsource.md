# ADR-0004 : Police Ubuntu servie par le paquet `@fontsource/ubuntu`

## Statut
Accepté (2026-11-05) — choix de Koya parmi trois options.

## Contexte
Le starter fournit Ubuntu en TTF (Regular, Medium, Bold : ≈ 840 ko). Les tests visuels comparent des pixels : la police doit être servie avec le site, sans dépendre du réseau.

## Options
| Option | Pour | Contre |
|---|---|---|
| **`@fontsource/ubuntu` (choisie)** | woff2 découpés par alphabet (quelques dizaines de ko), servis avec le site ; même méthode qu'E-commerce | Une dépendance de plus |
| TTF du starter + `@font-face` | Aucune dépendance | ≈ 840 ko à télécharger |
| Lien Google Fonts | Le plus simple | Dépend du réseau et de Google |

## Décision
- `@fontsource/ubuntu` en dépendance d'exécution ; seules les graisses 400, 500 et 700 sont importées dans `src/style.css`.

## Conséquences
- Aucun appel à un serveur de polices ; fitness function « ADR-0004 » : rien n'est chargé hors du domaine et les trois graisses se chargent.
- Les TTF du starter restent dans `assets/fonts/` (starter intact) mais ne sont pas servis.
