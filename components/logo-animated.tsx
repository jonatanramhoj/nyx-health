export function LogoAnimated() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-6"
    >
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        style={{
          transformOrigin: "18px 18px",
          animation: "pulse-ring 2s ease-out infinite",
        }}
      />
      <path
        d="M8 18 Q11 18, 13 14 Q15 10, 17 18 Q19 26, 21 18 Q23 12, 25 18 Q27 22, 28 18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: 60,
          animation: "draw-line 2s ease infinite",
        }}
      />
    </svg>
  );
}
