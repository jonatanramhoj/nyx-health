import { addSleep } from "@/lib/supabase/client";
import { useAppStore } from "@/stores/app-store";
import { useState } from "react";
import { Loader } from "../loader";
import { today } from "@/utils/date-helpers";

export function SleepForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string;
    const bedTime = formData.get("bedTime") as string;
    const wakeTime = formData.get("wakeTime") as string;

    if (!bedTime) return;

    setStatus("loading");

    const { error } = await addSleep(date, bedTime, wakeTime);

    if (error) {
      setStatus("idle");
      return;
    }

    setStatus("success");

    setTimeout(() => {
      setActiveModal(null);
      setStatus("idle");
    }, 1000);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log sleep
      </span>
      <div className="mb-4">
        <label htmlFor="bedTime" className="nyx-label">
          Date
        </label>
        <input
          className="nyx-input"
          name="date"
          type="date"
          defaultValue={today()}
          required
        />
      </div>
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
      <button
        className="nyx-submit flex justify-center h-10.25"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Loader />
        ) : status === "success" ? (
          "✔︎"
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}
