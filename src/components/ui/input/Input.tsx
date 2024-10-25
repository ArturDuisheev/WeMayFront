import { ChangeEvent, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

interface IInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  error?: FieldError;
  icon?: string;
  isErrorRespond?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type = "text",
      placeholder = "",
      className = "",
      inputClassName = "",
      isErrorRespond = true,
      error,
      icon,
      ...register
    },
    ref
  ) => {
    return (
      <>
        <div
          className={clsx(className, { "relative flex items-center": icon })}
        >
          {icon && (
            <img src={icon} alt="input-left" className="absolute left-[16px]" />
          )}
          <input
            ref={ref}
            type={type}
            className={clsx("box-input", inputClassName, {
              "border-red": error,
              "pl-[44px]": icon,
            })}
            placeholder={placeholder}
            {...register}
          />
        </div>
        {isErrorRespond && error && (
          <span className="block mt-[5px] text-red">{error.message}</span>
        )}
      </>
    );
  }
);

export default Input;
