import { addWakeTime } from "@/lib/supabase/client";
import { useAppStore } from "@/stores/app-store";

export function RiseForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const handleSubmit = async (formData: FormData) => {
    const wakeTime = formData.get("wakeTime") as string;

    await addWakeTime(wakeTime);

    setActiveModal(null);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log wake up time
      </span>
      <div className="mb-4">
        <label htmlFor="wakeTime" className="nyx-label">
          Wake time
        </label>
        <input className="nyx-input" name="wakeTime" type="time" required />
      </div>
      <button className="nyx-submit" type="submit">
        Save
      </button>
    </form>
  );
}
