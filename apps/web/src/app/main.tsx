import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/app/providers";
import { App } from "@/app/App";
import "@/index.css";

const el = document.getElementById("root");
if (!el) {
  throw new Error("Root element #root not found");
}
createRoot(el).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);
