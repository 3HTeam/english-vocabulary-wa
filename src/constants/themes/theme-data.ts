import { shadcnThemePresets } from "./shadcn-presets";
import { tweakcnPresets } from "./tweakcn-presets";
import { type ColorTheme } from "@/types/theme";

// Tweakcn theme presets for the dropdown - convert from tweakcnPresets
export const tweakcnThemes: ColorTheme[] = Object.entries(tweakcnPresets).map(
  ([key, preset]) => ({
    name: preset.label || key,
    value: key,
    preset: preset,
  }),
);

// Shadcn theme presets for the dropdown - convert from shadcnThemePresets
export const colorThemes: ColorTheme[] = Object.entries(shadcnThemePresets).map(
  ([key, preset]) => ({
    name: preset.label || key,
    value: key,
    preset: preset,
  }),
);
