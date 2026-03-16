import { useEffect } from "react";

type Props = {
  ref: React.RefObject<any>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function useClickOutside({ ref, open, setOpen }: Props) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (open && ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    };

    window.document.addEventListener("click", handleClickOutside);
    return () => {
      window.document.removeEventListener("click", handleClickOutside);
    };
  }, [open, ref, setOpen]);
}
