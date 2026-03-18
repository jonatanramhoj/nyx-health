"use client";
import { addActivity } from "@/lib/supabase/client";
import { useAppStore } from "@/stores/app-store";
import { useState } from "react";
import { Loader } from "../loader";
import { today } from "@/utils/date-helpers";

export function ActivityForm() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string;
    const activity = formData.get("activity") as string;
    const hours = formData.get("hours");
    const minutes = formData.get("minutes");
    const totalMinutes = Number(hours) * 60 + Number(minutes);

    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { error } = await addActivity(date, activity, totalMinutes);

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

  console.log("status", status);

  const activities = ["", "Padel", "Gym", "Walk", "Swim", "Cycling", "Other"];

  return (
    <form action={handleSubmit}>
      <span className="mb-4 block uppercase text-gray-500 text-sm">
        Log Activity
      </span>
      <div className="mb-4">
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
        <label htmlFor="activity" className="nyx-label">
          Type
        </label>
        <select
          name="activity"
          id="activity"
          required
          className="nyx-input outline-0 px-2"
        >
          {activities.map((item, index) => (
            <option value={item} key={item}>
              {item}
              {index === 0 && "Select an activity"}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="hours" className="nyx-label">
          Duration
        </label>
        <div className="flex items-center">
          <div className="flex items-center w-24 shrink-0 mr-4">
            <input
              name="hours"
              type="number"
              min="0"
              max="8"
              placeholder="0"
              className="nyx-input px-2 w-full text-center mr-2"
            />
            <span className="text-gray-400">h</span>
          </div>
          <div className="flex items-center w-24 shrink-0">
            <input
              name="minutes"
              type="number"
              min="0"
              max="59"
              placeholder="00"
              className="nyx-input px-2 w-full text-center mr-2"
              required
            />
            <span className="text-gray-400">m</span>
          </div>
        </div>
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
