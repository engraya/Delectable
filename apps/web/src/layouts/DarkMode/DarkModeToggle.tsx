import { useEffect, useState } from "react";
import "./DarkMode.css";
import Sun from "./Sun.svg?react";
import Moon from "./Moon.svg?react";

const STORAGE_KEY = "delectable-theme";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as "dark" | "light" | null;
    if (stored === "dark" || stored === "light") {
      setDark(stored === "dark");
      return;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }, [dark]);

  return (
    <div className="dark_mode">
      <input
        id="darkmode-toggle"
        className="dark_mode_input"
        type="checkbox"
        checked={dark}
        onChange={(e) => setDark(e.target.checked)}
        aria-label="Toggle dark mode"
      />
      <label htmlFor="darkmode-toggle" className="dark_mode_label">
        <Sun className="sun" aria-hidden />
        <Moon className="moon" aria-hidden />
      </label>
    </div>
  );
}
