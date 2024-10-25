import clsx from "clsx";
import {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import arrowDownIcon from "../../../assets/images/icons/small-arrow-bottom.svg";

interface IAccordeonProps {
  buttonText?: string;
  style?: string;
  bodyStyle?: string;
  buttonStyle?: string;
  arrowIconStyle?: string;
  button?: ReactElement;
  onClick?: () => void;
  isActive?: boolean;
  maxHeight?: number | string;
  arrowIcon?: string;
}

const Accordeon: FC<PropsWithChildren<IAccordeonProps>> = ({
  buttonText = "Выбрать",
  button = null,
  style = "",
  bodyStyle = "",
  buttonStyle = "",
  arrowIconStyle = "",
  maxHeight = 0,
  isActive = true,
  onClick,
  arrowIcon = arrowDownIcon,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordBody = useRef<HTMLDivElement>(null);
  const isOpenCondition = isOpen;

  useEffect(() => {
    !isActive && setIsOpen(false);
  }, [isActive]);

  const onClickOpen = () => {
    onClick?.();
    isActive && setIsOpen((prev) => !prev);
  };

  return (
    <div className={style}>
      <button
        onClick={onClickOpen}
        className={clsx(
          "w-full flex justify-between items-center",
          buttonStyle
        )}
      >
        {button || <span>{buttonText}</span>}
        <img
          src={arrowIcon}
          alt="arrow-down"
          className={clsx("trans-def", arrowIconStyle, {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <div
        ref={accordBody}
        className={clsx(
          "overflow-hidden trans-def opacity-1 max-h-[38px]",
          bodyStyle,
          {
            "!m-0": !isOpenCondition,
            "opacity-0": !isOpenCondition,
          }
        )}
        style={{
          maxHeight: isOpenCondition
            ? maxHeight || accordBody.current?.scrollHeight
            : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordeon;
