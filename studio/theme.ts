import { buildLegacyTheme } from "sanity";

// Elephantaes palette — matches the site (cream / forest / honey / ink).
const cream = "#fdf8e7";
const forest = "#2e4a2a";
const forestDeep = "#1f3219";
const honey = "#c9985c";
const ink = "#1a2415";
const sage = "#8a9184";

export const elephantaesTheme = buildLegacyTheme({
  "--black": ink,
  "--white": cream,
  "--gray": sage,
  "--gray-base": sage,
  "--component-bg": cream,
  "--component-text-color": ink,
  "--brand-primary": forest,
  "--default-button-color": sage,
  "--default-button-primary-color": forest,
  "--default-button-success-color": "#3f7d4e",
  "--default-button-warning-color": honey,
  "--default-button-danger-color": "#a33d2f",
  "--state-info-color": forest,
  "--state-success-color": "#3f7d4e",
  "--state-warning-color": honey,
  "--state-danger-color": "#a33d2f",
  "--main-navigation-color": forestDeep,
  "--main-navigation-color--inverted": cream,
  "--focus-color": honey,
});
