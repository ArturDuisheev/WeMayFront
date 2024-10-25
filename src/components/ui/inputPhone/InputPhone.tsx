import clsx from "clsx";
import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import InputMask from "react-input-mask";

interface Props {
  name: string;
  control: Control<FieldValues>;
}

const InputPhone: FC<Props> = ({ name, control }) => {
  return (
    <div className="text-start">
      <span className="text-gray text-[10px] font-medium">Номер телефона</span>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: {
            "Это поле обязательно для заполнения": (fieldValue) => {
              return (fieldValue.match(/\d/g)?.length || 0) >= 9;
            },
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <div className="mt-10 relative flex items-center text-14">
              <span
                className={clsx("absolute left-[20px]", {
                  "text-red": error,
                })}
              >
                +996
              </span>
              <InputMask
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                mask="(999)-999-999"
                placeholder="(___)-___-___"
                className={clsx(
                  "rounded-[100px] py-[12px] pl-[56px] px-20 w-[250px] bg-light-gray",
                  { "bg-light-red !text-red": error }
                )}
                // {...register("phone", {
                // validate: {
                //   "Это поле обязательно для заполнения": (fieldValue) => {
                //     return (fieldValue.match(/\d/g)?.length || 0) >= 9;
                //   },
                // },
                // })}
              />
            </div>
            {error && (
              <span className="mt-10 block max-w-[250px] text-[12px] text-red font-medium text-start">
                {error.message || error.type}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputPhone;
