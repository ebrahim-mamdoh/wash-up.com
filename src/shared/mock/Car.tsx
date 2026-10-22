/**
 * Side-profile sedan, drawn in strokes and fills that take `currentColor`
 * for the body so it can be tinted (dirty grey → clean brand) by the parent.
 */
export function CarSilhouette({ className = "", shine = 0 }: { className?: string; /** 0..1 gloss on the body */ shine?: number }) {
  return (
    <svg viewBox="0 0 240 92" className={className} aria-hidden>
      <defs>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfe6ff" />
          <stop offset="1" stopColor="#5aa9e6" />
        </linearGradient>
        <linearGradient id="car-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="122" cy="86" rx="104" ry="5" fill="#000" opacity="0.18" />
      {/* Body */}
      <path
        fill="currentColor"
        d="M8 64 C8 54 16 49 30 47 L62 42 C76 28 96 20 124 20 L150 20 C170 20 186 30 200 42 L222 46 C232 48 236 55 236 63 L236 67 C236 71 233 74 229 74 L212 74 A20 20 0 0 0 172 74 L80 74 A20 20 0 0 0 40 74 L14 74 C10 74 8 71 8 67 Z"
      />
      {/* Windows */}
      <path fill="url(#car-glass)" d="M72 42 C84 31 99 26 118 26 L121 26 L121 42 Z" />
      <path fill="url(#car-glass)" d="M127 26 L148 26 C163 26 175 32 186 42 L127 42 Z" />
      {/* Door line and handle */}
      <path d="M124 44 L124 70" stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" />
      <rect x="132" y="50" width="12" height="2.6" rx="1.3" fill="#000" opacity="0.2" />
      {/* Lights */}
      <path d="M226 52 L235 55 L235 60 L224 58 Z" fill="#ffe59a" />
      <path d="M10 56 L18 54 L18 60 L9 61 Z" fill="#ff6b6b" />
      {/* Gloss sweep */}
      <path
        d="M30 48 L62 43 C76 30 96 22 124 22 L150 22 C170 22 186 32 200 44 L222 48"
        fill="none"
        stroke="url(#car-gloss)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={shine}
      />
      {/* Wheels */}
      {[60, 192].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="74" r="16" fill="#111827" />
          <circle cx={cx} cy="74" r="9" fill="#cbd5e1" />
          <circle cx={cx} cy="74" r="3" fill="#475569" />
        </g>
      ))}
    </svg>
  );
}
