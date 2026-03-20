import clsx from "clsx";
import { WidgetSkeleton } from "./skeletons/widget-skeleton";

type Props = {
  children: React.ReactNode;
  label: string;
  className?: string;
  isLoading?: boolean;
  type?: "ring" | "bars";
};

export function WidgetContainer({
  children,
  label,
  className,
  isLoading,
  type,
}: Props) {
  return (
    <div
      className={clsx(
        "rounded-2xl glass-card p-6 flex flex-col min-h-75",
        className,
      )}
    >
      {label && (
        <span className="text-gray-300 uppercase text-xs block mb-6">
          {label}
        </span>
      )}
      {isLoading ? <WidgetSkeleton type={type} /> : children}
    </div>
  );
}
