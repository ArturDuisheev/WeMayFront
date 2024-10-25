import clsx from "clsx";
import { FC, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface IDropdownProps {
  head: ReactNode;
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
}

const Dropdown: FC<PropsWithChildren<IDropdownProps>> = ({
  head,
  className = "",
  headClassName = "",
  bodyClassName = "",
  children,
}) => {
  const headRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside<HTMLElement>([headRef], () => setIsOpen(false));

  return (
    <div className={clsx("relative", className)}>
      <button
        ref={headRef}
        className={headClassName}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {head}
      </button>
      <div
        className={clsx(
          "absolute opacity-0 trans-def pointer-events-none z-[53]",
          bodyClassName,
          {
            "opacity-100 pointer-events-auto": isOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
