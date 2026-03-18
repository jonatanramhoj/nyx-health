type SkeletonType = "ring" | "bars";

type Props = {
  type?: SkeletonType;
};

const SKELETON_HEIGHTS = [45, 70, 35, 80, 55, 65, 40];

export function WidgetSkeleton({ type = "bars" }: Props) {
  return (
    <div className="animate-pulse flex-1 flex flex-col min-h-53.75">
      {type === "ring" ? (
        <>
          <div className="flex justify-center items-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-white/10" />
          </div>
          <div className="mb-6 flex items-center justify-center flex-col mt-4">
            <div className="h-4 bg-white/10 rounded w-1/4 mb-2" />
            <div className="h-4 bg-white/10 rounded w-1/3" />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
          </div>
          <div className="mt-auto h-20 rounded flex items-end justify-between px-2 py-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-t w-2"
                style={{
                  height: `${SKELETON_HEIGHTS[i]}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
