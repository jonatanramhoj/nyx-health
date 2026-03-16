import { useState } from "react";
import { DotSelector } from "../dot-selector";
import { useAppStore } from "@/stores/app-store";

export function MoodForm() {
  const [score, setScore] = useState<number | null>(null);
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const handleSubmit = (formData: FormData) => {
    const moodScore = formData.get("score");
    const moodNotes = formData.get("notes");

    const moodEntry = { score: moodScore, notes: moodNotes };

    // API request goes here...
    setActiveModal(null);
  };

  const handleScore = (selectedScore: number | null) => {
    setScore(selectedScore);
  };

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log Mood
      </span>
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
      <button className="nyx-submit" type="submit" disabled={!score}>
        Save
      </button>
    </form>
  );
}
