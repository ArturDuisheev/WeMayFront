import { FC, ReactElement } from "react";
import checkedIcon from "../../../assets/images/icons/checked.svg";
import checkedWrapperIcon from "../../../assets/images/icons/checked-wrapper.svg";
import clsx from "clsx";

interface ICheckboxProps {
  name: string;
  checked: boolean;
  style?: string;
  icon?: ReactElement;
  onChange: () => void;
}

const Checkbox: FC<ICheckboxProps> = ({
  name,
  checked,
  style = "",
  icon = null,
  onChange,
}) => {
  return (
    <div className={clsx("flex gap-[8px] items-center", style)}>
      <label
        htmlFor={`category-${name}-filter`}
        className="relative border border-[#6C6C6C] rounded-[4px] w-[16px] h-[16px] flex justify-center items-center trans-def cursor-pointer has-[:checked]:border-0 has-[:checked]:bg-green"
      >
        <input
          id={`category-${name}-filter`}
          type="checkbox"
          className="peer hidden"
          checked={checked}
          onChange={onChange}
        />
        <img
          src={checkedIcon}
          alt="checked"
          className="absolute opacity-0 trans-def bg-white peer-checked:opacity-100"
        />
        <img
          src={checkedWrapperIcon}
          alt="checked"
          className="absolute top-0 left-0 opacity-0 trans-def peer-checked:opacity-100"
        />
      </label>
      {icon}
      <span>{name}</span>
    </div>
  );
};

export default Checkbox;
