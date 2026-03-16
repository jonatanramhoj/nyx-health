import { addSleepEntry } from "@/lib/supabase/client";
import { useAppStore } from "@/stores/app-store";
import { calculateHours } from "@/utils/calculate-hours";

export function SleepForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const handleSubmit = async (formData: FormData) => {
    const bedTime = formData.get("bedTime") as string;
    const wakeTime = formData.get("wakeTime") as string;
    const hours = calculateHours(bedTime, wakeTime);
    const date = new Date().toISOString().split("T")[0];

    const entry = {
      bed_time: bedTime,
      wake_time: wakeTime,
      hours,
      date,
    };

    await addSleepEntry(entry);

    setActiveModal(null);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log Sleep
      </span>
      <div className="mb-4">
        <label htmlFor="bedTime" className="nyx-label">
          Bed time
        </label>
        <input className="nyx-input" name="bedTime" type="time" required />
      </div>
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
