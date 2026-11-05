import React from 'react'

export default function Logo({
  variant = 'dark',
  showTagline = true,
  className = 'h-10 w-auto',
}) {
  const isLight = variant === 'light'
  const mainColor = isLight ? '#FFFFFF' : '#121824'
  const taglineColor = isLight ? '#D4B86A' : '#AA8C42'

  return (
    <svg
      viewBox="0 0 360 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NOVORA - Retail reinvented. Elegantly delivered."
    >
      {/* N */}
      <path
        d="M24 64V12H34.5L52.5 44.5V12H63V64H52.5L34.5 31.5V64H24Z"
        fill={mainColor}
      />

      {/* O */}
      <path
        d="M71 38C71 21.5 78.5 12 92.5 12C106.5 12 114 21.5 114 38C114 54.5 106.5 64 92.5 64C78.5 64 71 54.5 71 38ZM103.5 38C103.5 25.5 100 19.5 92.5 19.5C85 19.5 81.5 25.5 81.5 38C81.5 50.5 85 56.5 92.5 56.5C100 56.5 103.5 50.5 103.5 38Z"
        fill={mainColor}
      />

      {/* V */}
      <path
        d="M120 12H130.5L144.5 53.5L158.5 12H169L149.5 64H139.5L120 12Z"
        fill={mainColor}
      />

      {/* O */}
      <path
        d="M176 38C176 21.5 183.5 12 197.5 12C211.5 12 219 21.5 219 38C219 54.5 211.5 64 197.5 64C183.5 64 176 54.5 176 38ZM208.5 38C208.5 25.5 205 19.5 197.5 19.5C190 19.5 186.5 25.5 186.5 38C186.5 50.5 190 56.5 197.5 56.5C205 56.5 208.5 50.5 208.5 38Z"
        fill={mainColor}
      />

      {/* R */}
      <path
        d="M228 64V12H249.5C259.5 12 266 17 266 26.5C266 33.5 261.5 38.5 254.5 40.5L268 64H256.5L244 42H238.5V64H228ZM238.5 34.5H248.5C253.5 34.5 256 31.5 256 26.5C256 21.5 253.5 19.5 248.5 19.5H238.5V34.5Z"
        fill={mainColor}
      />

      {/* A (with signature geometric cut/corner accent in right leg) */}
      <path
        d="M288 64L304.5 12H315L331.5 64H320.5L317 52H298L294.5 64H283.5L288 64ZM300 44.5H315L307.5 19.5L300 44.5Z"
        fill={mainColor}
      />
      {/* Cutout notch accent in A's right leg matching brand identity */}
      <rect x="320.5" y="52" width="11" height="12" fill={mainColor} />
      <rect x="320.5" y="40" width="11" height="12" fill={isLight ? '#0d1422' : '#ffffff'} />

      {/* Tagline */}
      {showTagline && (
        <text
          x="24"
          y="83"
          fill={taglineColor}
          fontFamily="'Plus Jakarta Sans', Georgia, serif"
          fontSize="12.5"
          fontWeight="500"
          letterSpacing="0.08em"
        >
          Retail reinvented. Elegantly delivered.
        </text>
      )}
    </svg>
  )
}

