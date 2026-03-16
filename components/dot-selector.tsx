import clsx from "clsx";

export function DotSelector({ score }: { score: number }) {
  const scoreValues = [1, 2, 3, 4, 5];

  return (
    <ul className="flex">
      {scoreValues.map((s) => (
        <li
          key={s}
          className={clsx(
            "border border-white/40 text-sm text-white/70 mr-3 rounded-full p-2 flex items-center justify-center shrink-0 w-8 h-8",
            {
              "bg-white/70 text-gray-700!": score === s,
            },
          )}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
