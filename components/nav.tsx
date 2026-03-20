"use client";
import { usePathname } from "next/navigation";
import { formatDisplayDate } from "@/utils/date-helpers";
import { User } from "@supabase/supabase-js";
import { getGreeting } from "@/utils/get-greeting";
import Image from "next/image";
import { signOut } from "@/lib/supabase/server";

export function Nav({ user }: { user: User | null }) {
  const currentPath = usePathname();

  if (currentPath !== "/") return null;

  const userName = user?.user_metadata.full_name.split(" ")[0];

  return (
    <nav className="flex justify-between w-full m-auto py-8 px-6">
      <span className="text-white/90 text-sm">
        {getGreeting()}, {userName}
      </span>
      <div className="flex items-center">
        <form action={signOut}>
          <span className="text-white/90 text-sm mr-4">
            {formatDisplayDate()} | <button type="submit">Logout</button>
          </span>
        </form>
        <Image
          src={user?.user_metadata.avatar_url}
          alt=""
          width={30}
          height={30}
          className="rounded-full ring-2 ring-white/90"
        />
      </div>
    </nav>
  );
}
