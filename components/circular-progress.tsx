export function CircularProgress({ duration }: { duration: number }) {
  const capped = Math.min(duration / 8, 1);

  return (
    <svg width="150" height="150" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 40}
        strokeDashoffset={2 * Math.PI * 40 * (1 - capped)}
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="22"
        fill="white"
      >
        {duration}
      </text>
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="10"
        fill="rgba(255,255,255,0.35)"
      >
        hrs
      </text>
    </svg>
  );
}
