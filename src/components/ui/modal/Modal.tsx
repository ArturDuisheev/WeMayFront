import { FC, PropsWithChildren, useEffect } from "react";
import clsx from "clsx";

interface IModalProps {
  isOpen: boolean;
  close: () => void;
  modalStyle?: string;
  contentStyle?: string;
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({
  isOpen,
  close,
  children,
  modalStyle = "",
  contentStyle = "",
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      onClick={close}
      className={clsx(
        "fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.25)] z-50 opacity-0 pointer-events-none trans-def",
        modalStyle,
        { "opacity-100 pointer-events-auto": isOpen }
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx("rounded-[24px] bg-gray", contentStyle)}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
