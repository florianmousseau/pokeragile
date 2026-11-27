/*
 * Le manifeste des routes ne part pas au navigateur.
 *
 * Mesure du 2026-11-27 : chaque route ajoutee coutait environ 37 octets brotli
 * a toute premiere visite, salle comprise, et quatre articles ont pousse la
 * salle a 50,15 Ko sur 50. Avec la resolution des routes par le serveur, la
 * salle tombe a 46,66 Ko et l accueil a 41,61 Ko ; une navigation vers une
 * adresse jamais vue demande sa route au serveur (`__route.js`).
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

describe('routage', () => {
  it('resout les routes sur le serveur', () => {
    expect(readFileSync('vite.config.ts', 'utf8')).toMatch(/router:\s*\{\s*resolution:\s*'server'\s*\}/);
  });
});
