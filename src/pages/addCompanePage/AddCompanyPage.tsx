import { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "../../components/ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddCompanyFields, IScheduleWeekDay } from "../../types/types";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import companiesService from "../../services/companiesService";
import { useProfile } from "../../hooks/useProfile";
import Modal from "../../components/ui/modal/Modal";
import CompanyCard from "../../components/companyCard/CompanyCard";
import basketIcon from "../../assets/images/icons/basket.svg";
import Contacts from "../../components/promotionPublicationPage/contacts/Contacts";
import { useAppDispatch } from "../../store/store";
import {
  setErrorNotification,
  setNotification,
} from "../../store/slices/notificationSlice";
import Schedule from "../../components/promotionPublicationPage/schedule/Schedule";
import { useNavigate } from "react-router-dom";
import { useClearCategory } from "../../hooks/useClearCategory";
import instagramIcon from "../../assets/images/icons/instagram.svg";
import facebookIcon from "../../assets/images/icons/facebook.svg";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import websiteIcon from "../../assets/images/icons/website.svg";

const AddCompanyPage: FC = () => {
  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IAddCompanyFields>({ mode: "onBlur" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [contacts, setContacts] = useState<string[]>([""]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [schedule, setSchedule] = useState<IScheduleWeekDay[] | null>(null);
  useClearCategory();

  const { data: profile, status } = useProfile();

  const {
    mutate: addCompany,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: companiesService.addCompany,
    onSuccess: () => {
      reset();
      dispatch(setNotification("Компания успешно добавлена!"));
    },
  });

  useEffect(() => {
    if (status !== "pending" && !profile?.id) {
      navigate("/");
      dispatch(
        setErrorNotification("Для текущей страницы требуется авторизация")
      );
    }
  }, [profile, status]);

  const { mutate: addContact } = useMutation({
    mutationFn: companiesService.addContact,
  });

  const { mutate: addWorkSchedule } = useMutation({
    mutationFn: companiesService.addWorkSchedule,
  });

  useEffect(() => {
    profile && setValue("owner", profile.id);
  }, [profile]);

  useEffect(() => {
    if (isSuccess) {
      const companyId = data.data.id;
      contacts.forEach(
        (contact) =>
          contact &&
          addContact({
            company: companyId,
            title: contact,
            value: contact,
          })
      );
      setContacts([""]);

      const days = schedule?.reduce(
        (prev, day) =>
          day.isActive && day.time.from.isValid() && day.time.to.isValid()
            ? {
                ...prev,
                [`${day.day.value}_start`]: day.time.from.format("HH:mm"),
                [`${day.day.value}_end`]: day.time.to.format("HH:mm"),
              }
            : prev,
        {}
      );

      days &&
        Object.keys(days).length &&
        addWorkSchedule({ ...days, company: companyId });
    }
  }, [isSuccess]);

  const onClickAdd: SubmitHandler<IAddCompanyFields> = (body) => {
    addCompany({ ...body, image: body.image!.file });
  };

  const onChangeImage = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    const currentFile = files![0];
    setValue("image", {
      file: currentFile,
      imageUrl: URL.createObjectURL(currentFile),
    });
  };

  return (
    <>
      <div className="container pt-80 pb-[120px] max-w-[1064px]">
        <h2>Добавить компанию</h2>
        <form onSubmit={(e) => e.preventDefault()} className="*:mt-40">
          <div>
            <h3 className="mb-[8px] title-3">Название</h3>
            <Input
              placeholder="Введите название"
              error={errors.name}
              {...register("name", {
                required: "Это поле обязательно для заполнения",
              })}
            />
          </div>
          <div>
            {watch("image") && (
              <button
                onClick={() => setValue("image", null)}
                className="mb-20 relative rounded-[10px] w-[100px] h-[100px] flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:trans-def hover:before:bg-[rgba(210,50,50,0.57)] *:hover:opacity-100"
                style={{
                  backgroundImage: `url(${watch("image")?.imageUrl})`,
                }}
              >
                <img
                  src={basketIcon}
                  alt="basket"
                  className="w-[40px] h-[40px] opacity-0 trans-def"
                />
              </button>
            )}
            <label
              htmlFor="promotion-publication-image"
              className="box-btn block w-fit text-green"
            >
              Добавить фото
              <input
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
                id="promotion-publication-image"
                onChange={onChangeImage}
              />
            </label>
          </div>
          <div>
            <h3 className="mb-[8px] title-3">Описание</h3>
            <div
              className={clsx("box-input h-[240px] has-[:focus]:border-green", {
                "border-red": errors.description,
              })}
            >
              <textarea
                cols={30}
                rows={9}
                placeholder="Введите описание"
                className="w-full h-full outline-none scroll-small"
                {...register("description", {
                  required: "Описание не должен быть пустым!",
                })}
              ></textarea>
            </div>
          </div>
          <div>
            <h3 className="mb-[8px] title-3">Максимальный процент скидки</h3>
            <Input
              type="number"
              placeholder="Введите проценты"
              error={errors.discounts}
              {...register("discounts", {
                required: "Это поле обязательно для заполнения",
              })}
            />
          </div>
          <h3 className="mb-[8px] title-3">Контакты</h3>
          <Input
            className="!mt-0"
            icon={instagramIcon}
            placeholder="Ссылка на instagram"
            inputClassName="pl-[64px]"
            {...register("instagram")}
          />
          <Input
            icon={facebookIcon}
            className="!mt-[16px]"
            placeholder="Ссылка на facebook"
            inputClassName="pl-[64px]"
            {...register("facebook")}
          />
          <Input
            icon={whatsappIcon}
            className="!mt-[16px]"
            placeholder="Ссылка на whatsapp"
            inputClassName="pl-[64px]"
            {...register("whatsapp")}
          />
          <Input
            icon={websiteIcon}
            className="!mt-[16px]"
            placeholder="Ссылка на website"
            inputClassName="pl-[64px]"
            {...register("website")}
          />
          <Contacts contacts={contacts} setContacts={setContacts} />
          <button
            onClick={() => setContacts((prev) => [...prev, ""])}
            className=" ml-[16px] block text-green font-bold"
          >
            Добавить ещё
          </button>
          <button
            onClick={() => setIsScheduleOpen(true)}
            className="mt-20 box-btn text-green"
          >
            Добавить график работы
          </button>
          <div className="mt-[87px] flex gap-[16px]">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="box-btn py-[22px] flex-grow text-center"
            >
              Предпросмотр
            </button>
            <button
              disabled={!isValid}
              onClick={handleSubmit(onClickAdd)}
              className="btn rounded-[24px] py-[22px] flex-grow text-center"
            >
              Опубликовать
            </button>
          </div>
        </form>
      </div>
      <Schedule
        isOpen={isScheduleOpen}
        setSchedule={setSchedule}
        close={() => setIsScheduleOpen(false)}
      />
      <Modal
        isOpen={isPreviewOpen}
        close={() => setIsPreviewOpen(false)}
        contentStyle="p-20 bg-white w-full max-w-[245px]"
      >
        <CompanyCard
          id={0}
          name={watch("name")}
          promotions_count={0}
          discounts={watch("discounts")}
          image={watch("image")?.imageUrl || ""}
        />
      </Modal>
    </>
  );
};

export default AddCompanyPage;
