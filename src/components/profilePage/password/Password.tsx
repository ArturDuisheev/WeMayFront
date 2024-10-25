import { FC } from "react";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChangePasswordFields } from "../../../types/types";
import { useMutation } from "@tanstack/react-query";
import profileService from "../../../services/profileService";
import { useAppDispatch } from "../../../store/store";
import { setNotification } from "../../../store/slices/notificationSlice";
import { useLogout } from "../../../hooks/useLogout";

const Password: FC = () => {
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IChangePasswordFields>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const { mutate: logout } = useLogout(
    "Вы изменили пароль, требуется повторный вход в систему."
  );

  const { mutate: changePassword } = useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: () => {
      reset();
      logout();
      dispatch(setNotification("Пароль успешно изменён!"));
    },
  });

  const onClickSave: SubmitHandler<IChangePasswordFields> = ({
    newPassword,
    reNewPassword,
    currentPassword,
  }) => {
    changePassword({
      new_password: newPassword,
      re_new_password: reNewPassword,
      current_password: currentPassword,
    });
  };

  return (
    <>
      <div>
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Старый пароль
        </h2>
        <Input
          error={errors.currentPassword}
          inputClassName="max-w-[700px]"
          {...register("currentPassword", {
            required: "Поле обязательно для заполнения",
          })}
        />
      </div>
      <div className="my-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Новый пароль
        </h2>
        <Input
          error={errors.newPassword}
          inputClassName="max-w-[700px]"
          {...register("newPassword", {
            required: "Поле обязательно для заполнения",
          })}
        />
      </div>
      <div className="my-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Подтвердить новый пароль
        </h2>
        <Input
          error={errors.reNewPassword}
          inputClassName="max-w-[700px]"
          {...register("reNewPassword", {
            validate: {
              "Введенный пароль не совпадает": (fieldValue) => {
                return fieldValue === getValues("newPassword");
              },
            },
          })}
        />
      </div>
      <button
        className="btn"
        disabled={!isValid}
        onClick={handleSubmit(onClickSave)}
      >
        Сохранить
      </button>
    </>
  );
};

export default Password;
