import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import mdx from "@astrojs/mdx";

// Stamp every sitemap entry with the build time so AI crawlers and AEO
// checkers see a recent <lastmod> freshness signal on every URL.
const buildDate = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  site: "https://eriktaheri.com",
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = buildDate;
        return item;
      },
    }),
    robotsTxt(),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
