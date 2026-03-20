"use client";
import { usePathname } from "next/navigation";
import { formatDisplayDate } from "@/utils/date-helpers";
import { User } from "@supabase/supabase-js";
import { getGreeting } from "@/utils/get-greeting";
import Image from "next/image";
import { signOut } from "@/lib/supabase/server";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import clsx from "clsx";

export function Nav({ user }: { user: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useClickOutside({ ref: menuRef, open: isMenuOpen, setOpen: setIsMenuOpen });

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentPath = usePathname();

  if (currentPath !== "/") return null;

  const userName = user?.user_metadata.full_name.split(" ")[0];
  const userEmail = user?.user_metadata.email;

  return (
    <nav className="flex justify-between w-full m-auto py-8 px-6 relative">
      <span className="text-white/90 text-sm">
        {getGreeting()}, {userName}
      </span>
      <div className="flex items-center">
        <span className="text-white/90 text-sm mr-4">
          {formatDisplayDate()}
        </span>
        <button onClick={handleToggleMenu} className="group relative">
          <Image
            src={user?.user_metadata.avatar_url}
            alt=""
            width={30}
            height={30}
            className={clsx(
              "transition-all duration-200 ease-in-out rounded-full ring-2 ring-white/80 group-hover:ring-white",
              {
                "ring-white!": isMenuOpen,
              },
            )}
          />
          <div
            className={clsx(
              "absolute top-0 left-0 w-full h-full bg-black/10 rounded-full group-hover:opacity-0 transition-all duration-200 ease-in-out",
              {
                "opacity-0": isMenuOpen,
              },
            )}
          />
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute right-6 top-[80px] min-w-[160px] py-4 px-4 z-50 glass-card"
          ref={menuRef}
        >
          <ul>
            <li className="mb-2 pb-2 border-b border-b-white/10">
              <span className="text-gray-400 text-xs">{userEmail}</span>
            </li>
            <li>
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full flex text-left justify-start text-gray-400 text-xs hover:text-white transition-all duration-200 ease-in-out"
                >
                  Sign out
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
