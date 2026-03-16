import clsx from "clsx";

export function DotSelector({
  score,
  onChange,
}: {
  score: number | null;
  onChange: (score: number | null) => void;
}) {
  const scoreValues = [1, 2, 3, 4, 5];

  return (
    <ul className="flex">
      {scoreValues.map((s) => (
        <li key={s}>
          <button
            type="button"
            className={clsx(
              "border border-white/40 text-sm text-white/70 mr-3 rounded-full p-2 flex items-center justify-center shrink-0 w-8 h-8 cursor-default!",
              {
                "bg-white/70 text-gray-700!": score === s,
                "hover:bg-white/70 hover:text-gray-700 transition-all duration-200 ease-in-out cursor-pointer!":
                  onChange,
              },
            )}
            onClick={() => onChange?.(s)}
          >
            {s}
          </button>
        </li>
      ))}
    </ul>
  );
}
