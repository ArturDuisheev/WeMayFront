import { ChangeEvent, FC } from "react";
import Input from "../../ui/input/Input";
import { useProfile } from "../../../hooks/useProfile";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfileFields } from "../../../types/types";
import avaIcon from "../../../assets/images/icons/ava.svg";
import { useMutation } from "@tanstack/react-query";
import profileService from "../../../services/profileService";
import { useAppDispatch } from "../../../store/store";
import { setNotification } from "../../../store/slices/notificationSlice";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile, refetch } = useProfile();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProfileFields>({
    mode: "onBlur",
    values: {
      email: profile?.email || "",
      fullname: profile?.fullname || "",
      username: profile?.username || "",
      imageUrl: profile?.image || "",
      image: null,
    },
  });

  const { mutate: changeProfile } = useMutation({
    mutationFn: profileService.changeProfile,
    onSuccess: () => {
      refetch();
      dispatch(setNotification("Данные профиля успешно изменены!"));
    },
  });

  const onClickSend: SubmitHandler<IProfileFields> = ({
    email,
    username,
    fullname,
    image,
  }) => {
    const form = new FormData();

    form.append("email", email);
    form.append("username", username);
    form.append("fullname", fullname);
    image && form.append("image", image);

    changeProfile(form);
  };

  const onChangeAva = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue("image", files![0]);
    setValue("imageUrl", URL.createObjectURL(files![0]));
  };

  const onDeleteAva = () => {
    setValue("image", null);
    setValue("imageUrl", "");
  };

  const isBtnDisabled = !!(
    !isValid ||
    (watch("imageUrl") === profile?.image &&
      watch("email") === profile?.email &&
      watch("fullname") === profile.fullname &&
      watch("username") &&
      profile.username)
  );

  return (
    <>
      <div className="mb-40 flex gap-[40px] items-center tb:flex-col">
        <img
          alt="ava"
          src={watch("imageUrl") || avaIcon}
          className="w-[100px] h-[100px] rounded-[50%] object-cover object-center"
        />
        <div>
          <div className="mb-[8px] flex gap-[16px] tb:flex-col">
            <label
              htmlFor="profile-ava"
              className="btn rounded-[24px] py-[12px] px-[24px] text-18 leading-[23px] cursor-pointer"
            >
              Загрузить новое фото
              <input
                id="profile-ava"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={onChangeAva}
              />
            </label>
            <button
              onClick={onDeleteAva}
              className="btn border border-green rounded-[24px] py-[12px] px-[24px] bg-transparent text-green"
            >
              Удалить
            </button>
          </div>
          <span className="pl-[16px] text-14 text-[rgba(79,79,79,1)]">
            JPG, GIF or PNG. Max size of 800K
          </span>
        </div>
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Имя
        </h2>
        <Input inputClassName="max-w-[700px]" {...register("fullname")} />
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Логин
        </h2>
        <Input inputClassName="max-w-[700px]" {...register("username")} />
      </div>
      <div className="mt-40">
        <h2 className="mb-[8px] text-18 font-montserrat text-[rgba(83,83,84,1)]">
          Почта
        </h2>
        <Input
          error={errors.email}
          inputClassName="max-w-[700px]"
          {...register("email", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
          })}
        />
      </div>
      <button
        className="btn mt-40 tb:block tb:mx-auto"
        disabled={isBtnDisabled}
        onClick={handleSubmit(onClickSend)}
      >
        Сохранить
      </button>
    </>
  );
};

export default Profile;
