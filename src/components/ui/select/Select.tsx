import { FC } from "react";
import ReactSelect, { Props } from "react-select";
import clsx from "clsx";
import dropdownIcon from "../../../assets/images/icons/arrow-down.svg";
import searchIcon from "../../../assets/images/icons/search.svg";

interface CustomProps extends Props {
  controlClassName?: string;
  isSearch?: boolean;
  isInitialOnChange?: boolean;
  customOptions?: {
    options: any[] | undefined;
    labelKey: string;
  };
}

const Select: FC<CustomProps> = ({
  controlClassName = "",
  isSearch,
  customOptions,
  options,
  isInitialOnChange,
  ...props
}) => {
  return (
    <ReactSelect
      options={
        customOptions
          ? customOptions.options
            ? customOptions.options.map((option) => ({
                // @ts-ignore
                value: option.id,
                // @ts-ignore
                label: option[customOptions.labelKey],
              }))
            : []
          : options
      }
      classNames={{
        control: () =>
          "!rounded-[24px] !border !border-gray !p-[12px_16px] !max-w-[500px] !shadow-none !cursor-pointer",
        menu: () =>
          "!w-fit !border !border-green !shadow-[4px_4px_10px_0px_rgba(0,0,0,0.1)]",
        menuList: () => "!p-0 scroll-small",
        indicatorSeparator: () => "!hidden",
        valueContainer: () => "!p-0",
        placeholder: () => "m-0",
        input: () => "m-0 p-0",
        dropdownIndicator: () =>
          "!py-[9px] !px-[11px] bg-no-repeat bg-center *:!hidden",
        option: (state) =>
          clsx("trans-def duration-[.13s] !cursor-pointer", {
            "!text-white !bg-green": state.isSelected || state.isFocused,
            "!text-black": !state.isSelected && !state.isFocused,
            "opacity-50": state.isFocused,
            "font-bold": state.isSelected,
          }),
      }}
      styles={{
        dropdownIndicator: () => ({ backgroundImage: `url(${dropdownIcon})` }),
        ...(isSearch
          ? {
              dropdownIndicator: () => ({
                backgroundImage: `url(${searchIcon})`,
              }),
            }
          : {}),
      }}
      {...props}
      {...(props.value
        ? {
            value: {
              value: props.value,
              label: customOptions?.options?.find(
                (option) => option.id === props.value
              )[customOptions.labelKey],
            },
          }
        : {})}
      onChange={(value) =>
        // @ts-ignore
        props.onChange(isInitialOnChange ? value : value.value)
      }
    />
  );
};

export default Select;
