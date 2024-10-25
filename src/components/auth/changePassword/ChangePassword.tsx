import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import passwordEyeIcon from "../../../assets/images/icons/password-eye.svg";
import passwordEyeDisabledIcon from "../../../assets/images/icons/password-eye-disabled.svg";
import Input from "../../ui/input/Input";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";
import Loading from "../../ui/loading/Loading";
import clsx from "clsx";
import okIcon from "../../../assets/images/icons/ok.svg";

interface Props {
  token: string;
  uid: string;
  close: () => void;
}

interface IChangePasswordFields {
  password: string;
  repeatPassword: string;
}

const ChangePassword: FC<Props> = ({ token, uid, close }) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<IChangePasswordFields>({ mode: "onBlur" });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordRepeatHidden, setIsPasswordRepeatHidden] = useState(true);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: authService.resetPassword,
    onError: (error: any) => {
      error.response.data.new_password &&
        setError("password", { message: error.response.data.new_password[0] });
    },
  });

  const resetPassword: SubmitHandler<IChangePasswordFields> = ({
    password,
    repeatPassword,
  }) => {
    mutate({
      token,
      uid,
      new_password: password,
      re_new_password: repeatPassword,
    });
  };

  return (
    <>
      <h2 className="mb-[56px] font-montserrat">
        {isSuccess ? "Пароль изменён!" : "Сброс пароля"}
      </h2>
      {isSuccess ? (
        <>
          <img src={okIcon} alt="ok" className="mx-auto" />
          <button onClick={close} className="btn mt-[32px] py-[22px] w-full">
            Хорошо
          </button>
        </>
      ) : (
        <form
          className={clsx("relative", { "blur-sm": isPending })}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <span className="text-14 text-[rgba(83,83,84,1)]">
              Новый пароль
            </span>
            <div className="relative flex items-center">
              <Input
                error={errors.password}
                type={isPasswordHidden ? "password" : "text"}
                className="w-full"
                isErrorRespond={false}
                {...register("password", {
                  required: "Пароль не может быть пустым!",
                  minLength: {
                    value: 4,
                    message: "Пароль не должен быть меньше 4 символов",
                  },
                  maxLength: {
                    value: 22,
                    message: "Пароль не должен быть больше 22 символов",
                  },
                })}
              />
              <button
                className="absolute right-[12px]"
                onClick={() => setIsPasswordHidden((prev) => !prev)}
              >
                <img
                  src={
                    isPasswordHidden ? passwordEyeDisabledIcon : passwordEyeIcon
                  }
                  alt="password-eye"
                />
              </button>
            </div>
            {errors.password && (
              <span className="block mt-[5px] text-red">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="my-[32px]">
            <span className="text-14 text-[rgba(83,83,84,1)]">
              Подтвердить новый пароль
            </span>
            <div className="relative flex items-center">
              <Input
                error={errors.repeatPassword}
                type={isPasswordRepeatHidden ? "password" : "text"}
                className="w-full"
                isErrorRespond={false}
                {...register("repeatPassword", {
                  validate: {
                    "Введенный пароль не совпадает": (fieldValue) => {
                      return fieldValue === getValues("password");
                    },
                  },
                })}
              />
              <button
                className="absolute right-[12px]"
                onClick={() => setIsPasswordRepeatHidden((prev) => !prev)}
              >
                <img
                  src={
                    isPasswordRepeatHidden
                      ? passwordEyeDisabledIcon
                      : passwordEyeIcon
                  }
                  alt="password-eye"
                />
              </button>
            </div>
            {errors.repeatPassword && (
              <span className="block mt-[5px] text-red">
                {errors.repeatPassword?.type}
              </span>
            )}
          </div>
          <button
            onClick={handleSubmit(resetPassword)}
            disabled={isPending || !isValid}
            className="btn my-[32px] py-[22px] w-full"
          >
            Отправить
          </button>
        </form>
      )}
      {isPending && <Loading />}
    </>
  );
};

export default ChangePassword;
