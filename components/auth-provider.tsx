"use client";

import { useAppStore } from "@/stores/app-store";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

export function AuthProvider({ user }: { user: User | null }) {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return null;
}
