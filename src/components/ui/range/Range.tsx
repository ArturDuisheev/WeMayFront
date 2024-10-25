import { ChangeEvent, FC } from "react";

interface IRangeProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Range: FC<IRangeProps> = ({ value, min = 0, max = 100, onChange }) => {
  return (
    <div
      className="relative rounded-[2px] w-full overflow-hidden"
      draggable={false}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="relative w-full z-20 cursor-pointer"
        draggable={false}
      />
      <div
        style={{ width: value + "%" }}
        className="absolute top-[calc(50%-1px)] left-0 h-[2px] bg-green pointer-events-none z-10"
      ></div>
      <div className="absolute top-[calc(50%-1px)] right-0 w-full h-[2px] bg-[#6FCF97] pointer-events-none"></div>
    </div>
  );
};

export default Range;
