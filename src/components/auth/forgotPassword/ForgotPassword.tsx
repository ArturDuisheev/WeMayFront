import { Dispatch, FC, SetStateAction } from "react";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthType, IAuthFields } from "../../../types/types";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";
import Loading from "../../ui/loading/Loading";
import clsx from "clsx";

interface Props {
  setAuthType: Dispatch<SetStateAction<AuthType>>;
}

const ForgotPassword: FC<Props> = ({ setAuthType }) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IAuthFields, "email">>({ mode: "onBlur" });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const forgotPassword: SubmitHandler<Pick<IAuthFields, "email">> = ({
    email,
  }) => {
    mutate(email);
  };

  return (
    <>
      <div className={clsx({ "blur-sm": isPending })}>
        <div className="flex justify-between items-center">
          <h2 className="font-montserrat">
            {isSuccess ? "Спасибо!" : "Забыли пароль"}
          </h2>
          <button onClick={() => setAuthType("login")}>Назад</button>
        </div>
        <span className="mt-[56px] mb-[32px] block text-center">
          {isSuccess
            ? "Пожалуйста проверьте свой Email адрес"
            : "Мы отправим вам инструкцию, как сбросить свой пароль"}
        </span>
        {isSuccess ? (
          <a
            target="_blank"
            className="block text-center text-blue"
            href="https://mail.google.com/mail/u/0/#inbox"
          >
            {getValues("email")}
          </a>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <span className="text-14 text-[rgba(83,83,84,1)]">
                Введите Email<span className="text-red">*</span>
              </span>
              <Input
                type="email"
                error={errors.email}
                {...register("email", {
                  required: "Email не должен быть пустым!",
                  pattern: {
                    value:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                    message: "Некорректный Email!",
                  },
                })}
              />
            </div>
            <button
              onClick={handleSubmit(forgotPassword)}
              disabled={isPending || !isValid}
              className="btn my-[32px] py-[22px] w-full"
            >
              Отправить
            </button>
          </form>
        )}
      </div>
      {isPending && <Loading />}
    </>
  );
};

export default ForgotPassword;
