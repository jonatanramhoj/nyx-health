import { useEffect } from "react";

type Props = {
  ref: React.RefObject<Element | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function useClickOutside({ ref, open, setOpen }: Props) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        open &&
        ref.current &&
        target instanceof Node &&
        !ref.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    window.document.addEventListener("click", handleClickOutside);
    return () => {
      window.document.removeEventListener("click", handleClickOutside);
    };
  }, [open, ref, setOpen]);
}
