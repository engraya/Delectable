import { useId } from "react";
import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
  /** Default matches nav mark (36px) */
  size?: number;
};

/**
 * Vector brand mark: warm dish + steam + sparkle (AI). Renders sharp at any size.
 */
export function BrandLogo({ className, size = 36 }: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `brand-bg-${uid}`;
  const plateId = `brand-plate-${uid}`;
  const shineId = `brand-shine-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 drop-shadow-sm", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="4" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f766e" />
          <stop offset="0.45" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id={plateId} x1="18" y1="20" x2="18" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffefb" />
          <stop offset="1" stopColor="#e7f7f4" />
        </linearGradient>
        <radialGradient id={shineId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17 14) rotate(90) scale(9)">
          <stop stopColor="#fef9c3" />
          <stop offset="0.55" stopColor="#fde047" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      <rect x="1" y="1" width="34" height="34" rx="10" fill={`url(#${gradId})`} />
      {/* Inner rim glow */}
      <rect x="2.5" y="2.5" width="31" height="31" rx="8.5" stroke="white" strokeOpacity="0.22" strokeWidth="1" fill="none" />

      {/* Steam */}
      <path
        d="M12 9c0 1.5-1 2.5-1 4s1.2 2.2 1.2 3.8"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 7c0 1.8-1.1 3-1.1 4.6s1.3 2.4 1.3 4"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 9c0 1.5-1 2.5-1 4s1.2 2.2 1.2 3.8"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Dish / “food” glow */}
      <circle cx="18" cy="15" r="7" fill={`url(#${shineId})`} />

      {/* Plate */}
      <ellipse cx="18" cy="24.5" rx="11" ry="4.2" fill={`url(#${plateId})`} />
      <ellipse cx="18" cy="24" rx="11" ry="4.2" fill="none" stroke="#0f766e" strokeOpacity="0.12" strokeWidth="0.75" />

      {/* AI sparkle */}
      <path
        d="M27.5 6.5l.35 1.05 1.1.05-.85.65.3 1.05-.8-.55-.8.55.3-1.05-.85-.65 1.1-.05.35-1.05z"
        fill="#fef08a"
        stroke="#fbbf24"
        strokeWidth="0.35"
      />
      <circle cx="28.8" cy="5.1" r="0.65" fill="#fffbeb" />
    </svg>
  );
}
