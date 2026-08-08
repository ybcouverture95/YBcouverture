// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Toute URL listée dans le sitemap doit être indexable : soumettre une page qui
 * porte `noindex` est contradictoire, et Search Console la remonte en
 * « Exclue par la balise noindex ». Les pages volontairement non indexées
 * (confirmation de formulaire, etc.) sont donc filtrées ici.
 *
 * `/404` est déjà écarté par l'intégration, et `/admin/` n'est pas une route
 * Astro — inutile de les lister.
 */
const NON_INDEXABLES = ['/contact/merci/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://yb-couverture.fr',
  integrations: [
    sitemap({
      filter: (page) => !NON_INDEXABLES.some((path) => new URL(page).pathname === path),
    }),
  ],
});
