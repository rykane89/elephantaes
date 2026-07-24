import React from "react";
// Vite (which powers the studio build) inlines/serves this correctly,
// including under the /admin base path.
import logoUrl from "../logo-mark.png";

export function Logo() {
  return (
    <img
      src={logoUrl}
      alt="Elephantaes"
      style={{
        height: "1.6em",
        width: "1.6em",
        objectFit: "contain",
        borderRadius: "50%",
        background: "#fdf8e7",
      }}
    />
  );
}
