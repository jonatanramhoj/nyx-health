export function Loader() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.4s" }}
        />
      ))}
    </div>
  );
}
