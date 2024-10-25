import { RefObject, useEffect } from "react";

export const useClickOutside = <T>(
  refs: RefObject<T>[],
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      let isClickedInside = false;

      refs.forEach((ref) => {
        if (
          ref.current &&
          event.composedPath().includes(ref.current as unknown as EventTarget)
        )
          isClickedInside = true;
      });

      !isClickedInside && onClickOutside();
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
};
