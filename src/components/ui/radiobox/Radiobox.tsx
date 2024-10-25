import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface IRadioboxProps {
  id: string;
  name: string;
  checked?: boolean;
  isCheckbox?: boolean;
  onChange?: () => void;
  className?: string;
}

const Radiobox: FC<PropsWithChildren<IRadioboxProps>> = ({
  id,
  name,
  checked,
  isCheckbox = false,
  onChange,
  className = "",
  children,
}) => {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex gap-[10px] items-center cursor-pointer font-mulish",
        className
      )}
    >
      <input
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        type={isCheckbox ? "checkbox" : "radio"}
        className="peer hidden pointer-events-none"
      />
      <div className="rounded-[50%] border border-green p-[1px] w-[15px] h-[15px] peer-checked:*:opacity-100">
        <div className="rounded-[50%] w-full h-full bg-green trans-def opacity-0"></div>
      </div>
      {children}
    </label>
  );
};

export default Radiobox;
