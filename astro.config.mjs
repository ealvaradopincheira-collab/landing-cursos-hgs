// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// `site` queda sin definir hasta resolver el dominio (D-08 en specs/prd.md);
// sin él, las URL canónicas y Open Graph se emiten relativas.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS pequeño (< 60 KB, constitución §3): incrustarlo elimina la petición que bloquea el render
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  // Las fuentes se descargan en el build y se sirven desde el propio sitio.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-display',
      weights: ['600 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      // optional: si no llega en ~100 ms se usa la monoespaciada del sistema sin desplazar el layout (CLS)
      display: 'optional',
      weights: [500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
