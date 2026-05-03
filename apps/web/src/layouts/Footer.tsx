import { Link } from "react-router-dom";
import { RxGithubLogo } from "react-icons/rx";
import { BRAND } from "@/shared/lib/brand";

const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-canvas dark:border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm text-center lg:text-left">
          <p className="font-display text-base font-semibold text-fg">{BRAND.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {BRAND.shortTagline} Built for recruiters who scan for product taste—not
            just tutorials.
          </p>
          <p className="mt-4 text-xs text-fg-subtle">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center lg:items-end">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/trending" className="text-fg-muted transition hover:text-fg">
              Trending
            </Link>
            <Link to="/vegetarian" className="text-fg-muted transition hover:text-fg">
              Vegetarian
            </Link>
            <Link to="/cuisines" className="text-fg-muted transition hover:text-fg">
              Cuisines
            </Link>
            <Link
              to={{ pathname: "/", hash: "ai-features" }}
              className="text-fg-muted transition hover:text-fg"
            >
              AI features
            </Link>
          </div>
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition hover:text-fg"
          >
            <RxGithubLogo className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
