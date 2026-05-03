import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, type To } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { BrandLogo } from "@/components/BrandLogo";
import { DarkModeToggle } from "@/layouts/DarkMode/DarkModeToggle";
import { BRAND } from "@/shared/lib/brand";
import { cn } from "@/shared/lib/cn";

type NavItem = {
  name: string;
  to: To;
  end?: boolean;
  /** When set, active if this hash is present on home */
  hash?: string;
  /** Home link not active when deep-linking to an on-page section */
  isHome?: boolean;
};

const navigation: NavItem[] = [
  { name: "Home", to: "/", end: true, isHome: true },
  { name: "Trending", to: "/trending" },
  { name: "Vegetarian", to: "/vegetarian" },
  { name: "Cuisines", to: "/cuisines" },
  { name: "AI", to: { pathname: "/", hash: "ai-features" }, hash: "ai-features" },
];

function isNavItemActive(
  item: NavItem,
  pathname: string,
  hash: string,
  navLinkIsActive: boolean
) {
  if (item.hash != null) {
    return pathname === "/" && hash === `#${item.hash}`;
  }
  if (item.isHome) {
    return navLinkIsActive && hash !== "#ai-features";
  }
  return navLinkIsActive;
}

function navLinkClass(active: boolean, isPending: boolean) {
  return cn(
    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
    "hover:bg-surface-muted hover:text-fg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    isPending && "opacity-70",
    active ? "bg-surface-muted text-fg" : "text-fg-muted"
  );
}

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/85 shadow-nav backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75 dark:border-border dark:shadow-nav-dark">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          aria-label={`${BRAND.name} home`}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl shadow-md shadow-primary/20 ring-1 ring-black/5 transition group-hover:shadow-lg group-hover:shadow-primary/25 dark:ring-white/10">
            <BrandLogo size={36} className="rounded-xl" />
          </span>
          <span className="flex flex-col leading-none sm:flex-row sm:items-baseline sm:gap-1.5">
            <span className="font-display text-lg font-semibold tracking-tight text-fg">
              Delectable
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-primary">
              AI
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={({ isActive, isPending }) =>
                navLinkClass(
                  isNavItemActive(item, location.pathname, location.hash, isActive),
                  isPending
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-fg shadow-sm transition hover:bg-surface-muted dark:bg-surface-elevated/90 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Open menu</span>
            <HiBars3 className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" aria-hidden={false}>
          <button
            type="button"
            className="absolute inset-0 bg-fg/30 backdrop-blur-[2px] dark:bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            ref={panelRef}
            id="mobile-nav"
            className="absolute right-0 top-0 flex h-full w-[min(100%,21rem)] flex-col border-l border-border bg-canvas shadow-2xl dark:shadow-black/40"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <span className="text-sm font-semibold text-fg">{BRAND.name}</span>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition hover:bg-surface-muted hover:text-fg"
                onClick={() => setMobileOpen(false)}
              >
                <span className="sr-only">Close</span>
                <HiXMark className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3" aria-label="Mobile main">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.end}
                  className={({ isActive, isPending }) =>
                    cn(
                      "rounded-xl px-3 py-3 text-base font-medium transition-colors",
                      navLinkClass(
                        isNavItemActive(item, location.pathname, location.hash, isActive),
                        isPending
                      )
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-border p-4">
              <p className="text-2xs leading-relaxed text-fg-subtle">
                Dark mode is tuned for late-night recipe browsing.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
