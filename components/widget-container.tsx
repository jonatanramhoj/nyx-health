import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  label: string;
  className?: string;
};

export function WidgetContainer({ children, label, className }: Props) {
  return (
    <div
      className={clsx("rounded-2xl glass-card p-6 flex flex-col", className)}
    >
      <span className="text-gray-300 uppercase text-xs block mb-6">
        {label}
      </span>
      {children}
    </div>
  );
}
