"use client";

import { signInWithGoogle } from "@/lib/supabase/server";
import { WidgetContainer } from "../widget-container";

export function LoginForm() {
  const handleSignIn = async () => signInWithGoogle();

  return (
    <div className="max-w-sm m-auto w-full">
      <WidgetContainer label="" className="min-h-[0]!">
        <div className="flex flex-col items-center justify-center">
          <span className="block mb-4 text-gray-400">
            Welcome to NYX Health
          </span>

          <form action={handleSignIn}>
            <button className="filter-btn w-full" type="submit">
              Continue with Google
            </button>
          </form>
        </div>
      </WidgetContainer>
    </div>
  );
}
