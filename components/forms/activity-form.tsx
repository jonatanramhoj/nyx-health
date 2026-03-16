import { useAppStore } from "@/stores/app-store";

export function ActivityForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const handleSubmit = (formData: FormData) => {
    const type = formData.get("type");
    const duration = formData.get("duration");

    const activityEntry = { type, duration };

    // API request goes here...
    setActiveModal(null);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log Activity
      </span>
      <div className="mb-4">
        <label htmlFor="type" className="nyx-label">
          Type
        </label>
        <input className="nyx-input" name="type" type="text" />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="nyx-label">
          Duration
        </label>
        <input className="nyx-input" name="duration" type="number" />
      </div>
      <button className="nyx-submit" type="submit">
        Save
      </button>
    </form>
  );
}
