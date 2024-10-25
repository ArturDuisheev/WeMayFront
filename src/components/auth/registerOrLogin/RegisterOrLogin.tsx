import { Dispatch, FC, SetStateAction, useState } from "react";
import passwordEyeIcon from "../../../assets/images/icons/password-eye.svg";
import passwordEyeDisabledIcon from "../../../assets/images/icons/password-eye-disabled.svg";
import checkMark from "../../../assets/images/icons/check-mark.svg";
// import googleIcon from "../../../assets/images/icons/google.svg";
// import facebookIcon from "../../../assets/images/icons/f.svg";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthType, IAuthFields } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../ui/loading/Loading";
import clsx from "clsx";

interface Props {
  authType: "login" | "register";
  setAuthType: Dispatch<SetStateAction<AuthType>>;
}

const RegisterOrLogin: FC<Props> = ({ authType, setAuthType }) => {
  const {
    register: registerInp,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<IAuthFields>({ mode: "all" });
  const [isPaswordHidden, setIsPasswordHidden] = useState(true);
  const { mutate: auth, isPending } = useAuth(
    authType,
    getValues("isRemember"),
    (error) => {
      error.response.data.message === "User with this email already exists." &&
        setError("email", {
          message: "Пользователь с таким email уже существует!",
        });

      error.response.data.detail === "Неверные данные, попробуйте ещё раз!" &&
        setError("root", { message: "Неверный email или пароль" });
    }
  );

  const authFunc: SubmitHandler<IAuthFields> = (data) => {
    auth(data);
  };

  return (
    <>
      <h2 className="font-montserrat tb:text-[22px]">
        {authType === "login" ? "Войти" : "Зарегистрироваться"}
      </h2>
      {isPending && <Loading />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className={clsx("relative", { "blur-sm": isPending })}
      >
        <div className="mt-[56px] mb-[32px]">
          <span className="text-14 text-[rgba(83,83,84,1)]">
            Введите Email<span className="text-red">*</span>
          </span>
          <Input
            type="email"
            error={errors.email}
            {...registerInp("email", {
              required: "Email не должен быть пустым!",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Некорректный Email!",
              },
            })}
          />
        </div>
        <div>
          <span className="text-14 text-[rgba(83,83,84,1)]">
            Введите пароль<span className="text-red">*</span>
          </span>
          <div className="relative flex items-center">
            <Input
              error={errors.password}
              type={isPaswordHidden ? "password" : "text"}
              className="w-full"
              isErrorRespond={false}
              {...registerInp("password", {
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
                  isPaswordHidden ? passwordEyeDisabledIcon : passwordEyeIcon
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
          <span className="mt-[12px] mb-[32px] block text-end text-14">
            <span className="text-red">*</span> - обязательное поле
          </span>
          <div className="flex justify-between">
            <label
              htmlFor="remember-me"
              className="flex gap-[8px] items-center cursor-pointer"
            >
              <input
                id="remember-me"
                type="checkbox"
                className="peer group hidden"
                {...registerInp("isRemember")}
              />
              <div className="outline outline-1 outline-[rgba(221,221,223,1)] rounded-[4px] pb-[3px] flex justify-center items-end w-[16px] h-[16px] bg-[#F9F9F9] trans-def peer-checked:bg-blue peer-checked:outline-0 peer-checked:*:opacity-100">
                <img
                  src={checkMark}
                  alt="check-mark"
                  className="opacity-0 group-checked:opacity-100"
                />
              </div>
              <span className="text-14 text-[rgba(108,108,108,1)] leading-[19px]">
                Запомнить меня
              </span>
            </label>
            {authType === "login" && (
              <button
                onClick={() => setAuthType("forgot-password")}
                className="text-blue text-14 leading-[19px]"
              >
                Забыли пароль?
              </button>
            )}
          </div>
          {errors.root && (
            <span className="mt-10 text-red text-center block">
              {errors.root.message}
            </span>
          )}
          <button
            onClick={handleSubmit(authFunc)}
            disabled={isPending || !isValid}
            className="btn my-[32px] py-[22px] w-full"
          >
            {authType === "login" ? "Войти" : "Создать аккаунт"}
          </button>
          <span className="block text-center text-14 leading-[19px] text-[rgba(51,51,51,1)]">
            {authType === "login" ? "Ещё нет аккаунта?" : "Есть аккаунт?"}{" "}
            <button
              className="text-blue"
              onClick={() =>
                setAuthType(authType == "login" ? "register" : "login")
              }
            >
              {authType === "login" ? "Зарегистрируйтесь" : "Войдите"}
            </button>
          </span>
          {/*<div className="mt-[32px] flex justify-between tb:flex-col tb:gap-[10px] tb:items-center">*/}
          {/*  <button className="rounded-[24px] border border-[rgba(0,0,0,0.12)] py-[17px] pl-[38px] pr-[25px] flex gap-[9px] items-center text-[rgba(51,51,51,1)] tb:w-fit">*/}
          {/*    <img src={googleIcon} alt="google" />*/}
          {/*    <span>Войти через Google</span>*/}
          {/*  </button>*/}
          {/*  <button className="rounded-[24px] border border-[rgba(0,0,0,0.12)] py-[15px] pl-[26px] pr-[13px] flex gap-[9px] items-center text-[rgba(51,51,51,1)] tb:w-fit">*/}
          {/*    <div className="rounded-[30px] w-[30px] h-[30px] flex justify-center items-center bg-[linear-gradient(0deg,#0062E0_2.92%,#19AFFF_100%)]">*/}
          {/*      <img src={facebookIcon} alt="facebook" />*/}
          {/*    </div>*/}
          {/*    <span>Войти через Facebook</span>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </form>
    </>
  );
};

export default RegisterOrLogin;
