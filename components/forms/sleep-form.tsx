import { useAppStore } from "@/stores/app-store";

export function SleepForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const handleSubmit = (formData: FormData) => {
    const bedTime = formData.get("bedTime");
    const wakeTime = formData.get("wakeTime");

    const activityEntry = { bedTime, wakeTime };

    // API request goes here...
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
        <input className="nyx-input" name="bedTime" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="wakeTime" className="nyx-label">
          Wake time
        </label>
        <input className="nyx-input" name="wakeTime" type="number" />
      </div>
      <button className="nyx-submit" type="submit">
        Save
      </button>
    </form>
  );
}
