import { useState } from "react";
import { DotSelector } from "../dot-selector";
import { useAppStore } from "@/stores/app-store";
import { Loader } from "../loader";
import { addMoodEntry } from "@/lib/supabase/client";
import { today } from "@/utils/date-helpers";

export function MoodForm() {
  const [score, setScore] = useState<number>(0);
  const setActiveModal = useAppStore((state) => state.setActiveModal);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string;
    const notes = formData.get("notes") as string;

    setStatus("loading");

    const { error } = await addMoodEntry(date, score, notes);

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

  const handleScore = (selectedScore: number) => {
    setScore(selectedScore);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log Mood
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
        <label htmlFor="score" className="nyx-label">
          Score (1-5)
        </label>
        <DotSelector onChange={handleScore} score={score} />
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="nyx-label">
          Notes
        </label>
        <input className="nyx-input" name="notes" type="text" />
      </div>
      <button
        className="nyx-submit flex justify-center h-10.25"
        type="submit"
        disabled={status === "loading" || !score}
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
