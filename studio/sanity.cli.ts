import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REPLACE_WITH_PROJECT_ID",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Optional hosted fallback: https://elephantaes.sanity.studio
  // Primary home is elephantaes.com/admin — the built studio references its
  // assets at /static, so the deploy copies dist/static to the site root too
  // (see netlify.toml build command).
  studioHost: "elephantaes",
});
