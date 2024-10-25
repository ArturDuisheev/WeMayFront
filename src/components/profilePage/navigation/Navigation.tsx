import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { profileLinks } from "../../../data/data";
import clsx from "clsx";
import Modal from "../../ui/modal/Modal";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";
import { useAppDispatch } from "../../../store/store";
import { setNotification } from "../../../store/slices/notificationSlice";
import { deleteTokens } from "../../../common/api.helpers";
import { setIsAuth } from "../../../store/slices/authSlice";
import arrowIcon from "../../../assets/images/icons/arrow-down.svg";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      navigate("/");
      deleteTokens();
      dispatch(setIsAuth(false));
      dispatch(setNotification("Вы успешно вышли из аккаунта!"));
    },
  });

  return (
    <>
      <nav className="rounded-[16px] p-[32px] min-h-[665px] bg-white2 text-18 leading-[23px] [&>:not(:last-child)]:mb-[8px] lt:min-h-fit">
        <div className="lt:hidden">
          {profileLinks.map(({ link, label, isEnd }) => (
            <NavLink
              to={link}
              key={link}
              end={isEnd}
              className={({ isActive }) =>
                clsx(
                  " border-green py-[8px] px-[12px] block w-[244px] trans-def",
                  {
                    "border-b": isActive,
                  }
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => setIsExitOpen(true)}
            className="py-[8px] px-[12px]"
          >
            Выход
          </button>
        </div>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="hidden lt:flex justify-between items-center"
        >
          <span>Изменить профиль</span>
          <img
            src={arrowIcon}
            alt="arrow-down"
            className={clsx("trans-def", { "rotate-180": isOpen })}
          />
        </div>
      </nav>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="hidden lt:block rounded-[8px] bg-white"
        >
          {profileLinks.map((link) => (
            <NavLink
              to={link.link}
              end={link.isEnd}
              key={link.link}
              className={({ isActive }) =>
                clsx("px-[24px] py-[28px] block", { "text-green": isActive })
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
      <Modal
        isOpen={isExitOpen}
        close={() => setIsExitOpen(false)}
        modalStyle="z-[53]"
        contentStyle="py-20 px-40"
      >
        <h2 className="title">Выйти</h2>
        <span className="block my-40 text-center text-18">
          Вы действительно хотите выйти?
        </span>
        <div className="flex gap-[16px]">
          <button
            onClick={() => setIsExitOpen(false)}
            className="box-secondary border-[2px] rounded-[24px] py-[22px] w-[252px] text-center text-18 font-bold font-montserrat text-green"
          >
            Отмена
          </button>
          <button
            onClick={() => logout()}
            className="btn rounded-[24px] py-[22px] w-[252px]"
          >
            Выйти
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Navigation;
