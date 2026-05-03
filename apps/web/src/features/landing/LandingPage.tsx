import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowTrendingUp,
  HiBolt,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiGlobeAlt,
  HiSparkles,
} from "react-icons/hi2";
import { RecipeSearchField } from "@/features/search/RecipeSearchField";
import { LANDING_IMAGES } from "@/features/landing/landingContent";
import { BRAND } from "@/shared/lib/brand";

const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp";

const stats = [
  { label: "AI smart search", value: "Plain English → filters", hint: "Cuisine, diet, time" },
  { label: "Recipe copilot", value: "Context-aware", hint: "Substitutions & scaling" },
  { label: "Global catalog", value: "Trending & cuisines", hint: "Always-on discovery" },
] as const;

export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="landing-hero relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 landing-hero-mesh" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/90 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-fg-muted shadow-sm backdrop-blur-sm dark:border-border dark:bg-surface-elevated/60 sm:text-xs">
                <HiSparkles className="h-4 w-4 text-primary" aria-hidden />
                {BRAND.name}
              </p>
              <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Turn “something healthy tonight” into{" "}
                <span className="text-primary">a real plan</span>—in seconds.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                {BRAND.shortTagline} Search a world of recipes, let AI translate your
                cravings into smart filters, and get step-by-side cooking help that
                stays grounded in <em className="not-italic font-medium text-fg">your</em>{" "}
                ingredients—not generic blog spam.
              </p>

              <div className="mt-8 max-w-xl">
                <RecipeSearchField size="lg" autoFocus={false} />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/trending"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-fg shadow-md shadow-primary/20 transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 active:scale-[0.99] dark:shadow-primary/10"
                >
                  Start exploring
                  <HiArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/cuisines"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 text-sm font-semibold text-fg shadow-sm transition hover:border-primary/30 hover:bg-surface-muted dark:bg-surface-elevated/80"
                >
                  Cuisines &amp; AI search
                </Link>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center px-4 text-sm font-medium text-fg-muted underline-offset-4 transition hover:text-fg hover:underline"
                >
                  View source
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15" aria-hidden />
              <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10" aria-hidden />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card dark:shadow-card-dark">
                    <img
                      src={LANDING_IMAGES.hero1}
                      alt="Colorful dishes on a table"
                      className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-[1.02]"
                      width={450}
                      height={560}
                      loading="eager"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card dark:shadow-card-dark">
                    <img
                      src={LANDING_IMAGES.grid4}
                      alt="Breakfast spread"
                      className="aspect-square w-full object-cover transition duration-500 hover:scale-[1.02]"
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-8 sm:space-y-4 sm:pt-12">
                  <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card dark:shadow-card-dark">
                    <img
                      src={LANDING_IMAGES.hero2}
                      alt="Fresh salad bowl"
                      className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-[1.02]"
                      width={400}
                      height={530}
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-2xl border border-primary/25 bg-primary-muted/50 p-4 dark:bg-primary-muted/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Why teams &amp; cooks notice
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      One search box. Two AI surfaces. Zero clutter between you and the
                      recipe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/80 bg-surface-elevated/60 px-4 py-4 backdrop-blur-sm dark:border-border dark:bg-surface-muted/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  {s.label}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-fg">{s.value}</p>
                <p className="mt-1 text-sm text-fg-muted">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI features */}
      <section
        id="ai-features"
        className="scroll-mt-24 border-b border-border bg-surface-muted/35 py-20 dark:bg-surface-muted/15"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              AI that earns the click
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Two AI features. One product philosophy:{" "}
              <span className="text-fg-muted">clarity over hype.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              {BRAND.name} isn’t another chatbot bolted onto a blog. Smart Search and
              Recipe Copilot are scoped, honest about limits, and built to sell your
              portfolio story: <strong className="font-semibold text-fg">thoughtful full-stack product craft.</strong>
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="space-y-6">
              <article className="group rounded-3xl border border-border bg-surface-elevated p-6 shadow-card transition hover:border-primary/25 hover:shadow-card-hover dark:shadow-card-dark dark:hover:shadow-card-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-muted text-primary dark:bg-primary-muted/40">
                  <HiBolt className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-fg">
                  Smart Search — cravings → structured filters
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                  Type how you actually think:{" "}
                  <q className="text-fg/90">Cheap vegetarian dinners under 30 minutes</q>.
                  Our backend parses intent into query, cuisine, diet, intolerances, and
                  time—so results feel intentional, not keyword-lucky.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-fg-muted">
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Natural language in; API-ready filters out.</span>
                  </li>
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Graceful when AI keys aren’t configured—no dead ends.</span>
                  </li>
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Pairs with classic keyword search for hybrid workflows.</span>
                  </li>
                </ul>
                <Link
                  to="/cuisines"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Try it on Cuisines
                  <HiArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>

              <article className="group rounded-3xl border border-border bg-surface-elevated p-6 shadow-card transition hover:border-primary/25 hover:shadow-card-hover dark:shadow-card-dark dark:hover:shadow-card-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-muted text-primary dark:bg-primary-muted/40">
                  <HiChatBubbleLeftRight className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-fg">
                  Recipe Copilot — the page-aware sous-chef
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                  On every recipe, Copilot reads the dish you’re viewing. Ask for
                  substitutions, scaling, simpler steps, or allergy-aware swaps. It’s
                  conversational—but grounded in the ingredients and instructions in
                  front of you.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-fg-muted">
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Threaded chat with clear “you / copilot” turns.</span>
                  </li>
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Explicit disclaimer: cooking help, not medical advice.</span>
                  </li>
                  <li className="flex gap-2">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>Built for demos: shows off API design + UX guardrails.</span>
                  </li>
                </ul>
                <Link
                  to="/trending"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Open a recipe &amp; ask Copilot
                  <HiArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </div>

            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-3xl border border-border shadow-card dark:shadow-card-dark">
                <img
                  src={LANDING_IMAGES.aiPanel}
                  alt="Hands preparing food in a kitchen"
                  className="aspect-[4/3] w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
              <div className="rounded-3xl border border-dashed border-primary/35 bg-primary-muted/30 p-6 dark:bg-primary-muted/10">
                <p className="font-display text-lg font-semibold text-fg">
                  Pitch this in one sentence.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  “{BRAND.name} is a production-leaning recipe product with real AI
                  workflows—search parsing and contextual copilot—wrapped in SaaS-grade
                  UI, loading states, and dark mode.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery pillars */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-sm dark:shadow-card-dark">
              <HiArrowTrendingUp className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-fg">
                Momentum you can browse
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Trending isn’t vanity—it’s a low-friction first run for recruiters and
                users. Cards load with purpose; skeletons respect attention.
              </p>
              <Link
                to="/trending"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                See what’s hot →
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-sm dark:shadow-card-dark">
              <HiGlobeAlt className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-fg">
                Cuisines without the maze
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Regions as chips—not mystery meat navigation. Empty states tell you what
                to tap next. Search and AI sit where expectations already are.
              </p>
              <Link
                to="/cuisines"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Pick a region →
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-sm dark:shadow-card-dark">
              <HiSparkles className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-fg">
                Diet paths, clearly signaled
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Vegetarian mode keeps the same premium grid and detail layout—because
                constraints shouldn’t mean a worse UI.
              </p>
              <Link
                to="/vegetarian"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Browse vegetarian →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image mosaic */}
      <section className="border-b border-border bg-surface-muted/30 py-20 dark:bg-surface-muted/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Made for portfolios that need to look like{" "}
              <span className="text-primary">shipped software</span>.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              Rich imagery, disciplined typography, and sections that answer “what is
              it?” and “why AI?” before anyone hits the repo link.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {[
              [LANDING_IMAGES.grid1, "Cooking at the stove"],
              [LANDING_IMAGES.grid2, "Gourmet burger"],
              [LANDING_IMAGES.grid3, "Healthy bowl"],
              [LANDING_IMAGES.grid5, "Pizza fresh from oven"],
              [LANDING_IMAGES.grid6, "Pancakes stack"],
              [LANDING_IMAGES.grid4, "Morning table"],
            ].map(([src, alt], i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card dark:shadow-card-dark"
              >
                <img
                  src={src}
                  alt={alt}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  width={600}
                  height={450}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold text-fg sm:text-4xl">
            From idea to ingredients in three moves
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Search or describe",
                body: "Use the bar like Google—or describe the night you want. AI optional, never required.",
              },
              {
                step: "02",
                title: "Scan, don’t scroll forever",
                body: "Cards, skeletons, and errors behave like a mature SaaS. Pick a dish that fits.",
              },
              {
                step: "03",
                title: "Cook with backup",
                body: "Export PDF, save the hero shot, and let Copilot handle the “what if I don’t have…?” moments.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-3xl border border-border bg-surface-elevated p-8 dark:shadow-card-dark"
              >
                <span className="font-mono text-3xl font-bold tabular-nums text-primary/80">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-border bg-surface-muted/25 py-20 dark:bg-surface-muted/10">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <figure>
            <blockquote className="font-display text-xl font-medium leading-snug text-fg sm:text-2xl">
              “{BRAND.name} reads like a real startup ship—tight UX, honest AI, and a
              landing page that actually sells the story. It’s what I’d expect from a
              strong full-stack product hire.”
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-2">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-bold text-fg"
                aria-hidden
              >
                A
              </div>
              <div className="text-sm text-fg-muted">
                <span className="font-medium text-fg">engr_aya</span>
                <span className="mx-2 text-fg-subtle" aria-hidden>
                  ·
                </span>
                <span>Fullstack engineer · builder of {BRAND.name}</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta border-t border-border py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
            Ready to impress on first scroll?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
            Open trending, run a search, or jump to cuisines and stress-test Smart Search.
            Toggle dark mode—this UI was built to look intentional in both themes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/trending"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-fg shadow-lg shadow-primary/25 transition hover:bg-primary-hover sm:w-auto dark:shadow-primary/15"
            >
              Launch the app
              <HiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface-elevated px-8 text-sm font-semibold text-fg transition hover:bg-surface-muted sm:w-auto"
            >
              Star the repo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
