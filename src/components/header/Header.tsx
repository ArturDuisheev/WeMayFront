import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { textLimit } from "../../data/data";
import { IUser } from "../../types/types";
import Burger from "../burger/Burger";
import Modal from "../ui/modal/Modal";
import Dropdown from "../ui/dropdown/Dropdown";
import promotionsIcon from "../../assets/images/icons/promotion-ctg.svg";
import finishSoonIcon from "../../assets/images/icons/finish-ctg.svg";
import freeIcon from "../../assets/images/icons/free-ctg.svg";
import burgerIcon from "../../assets/images/icons/burger.svg";
import logoIcon from "../../assets/images/icons/logo.svg";
import personIcon from "../../assets/images/icons/person.svg";
import profileMenuIcon from "../../assets/images/icons/profile-menu.svg";
import heartIcon from "../../assets/images/icons/heart-black.svg";
import starIcon from "../../assets/images/icons/star-black.svg";
import announcementIcon from "../../assets/images/icons/announcement.svg";
import settingsIcon from "../../assets/images/icons/settings.svg";
import exitIcon from "../../assets/images/icons/exit.svg";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import avaIcon from "../../assets/images/icons/ava.svg";
import Loading from "../ui/loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useProfile } from "../../hooks/useProfile";
import { useFavourites } from "../../hooks/useFavourites";
import { useLikes } from "../../hooks/useLikes";
import { useLogout } from "../../hooks/useLogout";
import { useMyPromotions } from "../../hooks/useMyPromotions";
import "swiper/css";

interface IProfileDropdownProps {
  head: ReactNode;
  profile: IUser;
}

const ProfileDropdown: FC<IProfileDropdownProps> = ({ head, profile }) => {
  const { data: likes } = useLikes();
  const { data: favourites } = useFavourites();
  const { data: myPromotions } = useMyPromotions();

  const { mutate: logout } = useLogout();

  return (
    <Dropdown
      headClassName="flex gap-[11px] items-center"
      bodyClassName="top-[50px] right-0 rounded-[12px] p-[16px] w-[230px] bg-white font-mulish"
      head={head}
    >
      {profile ? (
        <>
          <img
            alt="ava"
            src={profile.image || avaIcon}
            className="w-[40px] h-[40px] rounded-circle object-cover object-center"
          />
          <h3 className="mt-[12px] mb-[6px] text-[rgba(51,51,51,1)] font-bold">
            {profile.fullname}
          </h3>
          <a
            href={`mailto:${profile.email}`}
            className="text-[12px] leading-[20px]"
          >
            {profile.email}
          </a>
          <Link
            to="/liked-promotions"
            className="mt-40 flex gap-[12px] items-center"
          >
            <img src={heartIcon} alt="heart" className="opacity-60" />
            <span>Любимые акции</span>
            <span>{likes?.count || 0}</span>
          </Link>
          <Link
            to="/favourites"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={starIcon} alt="heart" className="opacity-60" />
            <span>Избранное</span>
            <span>{favourites?.count || 0}</span>
          </Link>
          <Link
            to="/my-promotions"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img
              src={announcementIcon}
              alt="announcement"
              className="opacity-60"
            />
            <span>Мои акции</span>
            <span>{myPromotions?.count || 0}</span>
          </Link>
          <Link
            to="/profile"
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={settingsIcon} alt="heart" />
            <span>Настройки</span>
          </Link>
          <button
            onClick={() => logout()}
            className="mt-[24px] flex gap-[12px] items-center"
          >
            <img src={exitIcon} alt="heart" />
            <span>Выход</span>
          </button>
        </>
      ) : (
        <div></div>
      )}
    </Dropdown>
  );
};

interface IHeaderProps {
  setIsAuthOpen: (value: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ setIsAuthOpen }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  return (
    <>
      <header className="bg-gray">
        <div className="bg-gray relative z-[51]">
          <div className="py-20 flex gap-[24px] justify-center lt:hidden">
            <Link
              to="/promotions-daily"
              className="box-secondary border-[#9B51E0] py-[8px] px-[12px] flex items-center gap-[8px] text-[#9B51E0] text-14 font-semibold"
            >
              <img src={promotionsIcon} alt="promotion" />
              <span>Акции дня</span>
            </Link>
            <Link
              to="/promotions-end-soon"
              className="box-secondary border-[#B84040] py-[8px] px-[12px] flex items-center gap-[8px] text-[#B84040] text-14 font-semibold"
            >
              <img src={finishSoonIcon} alt="finish-soon" />
              <span>Скоро заканчивается</span>
            </Link>
            <Link
              to="/promotions-free"
              className="box-secondary border-[#00B856] py-[8px] px-[12px] flex items-center gap-[8px] text-[#00B856] text-14 font-semibold"
            >
              <img src={freeIcon} alt="free" />
              <span>Бесплатно</span>
            </Link>
          </div>
          <div className="h-[1px] bg-[#DDD] lt:hidden"></div>
          <div className="hidden container pt-[22px] pb-[18px] justify-between items-center lt:flex">
            <button onClick={() => setIsBurgerOpen(true)}>
              <img src={burgerIcon} alt="burger-menu" />
            </button>
            <Link to="/" className="pt-[5px]">
              <img src={logoIcon} alt="logo" />
            </Link>
            {isAuth ? (
              <ProfileDropdown
                profile={profile!}
                head={<img src={profileMenuIcon} alt="three-points" />}
              />
            ) : (
              <Dropdown
                bodyClassName="right-0 rounded-[24px] p-10 bg-white"
                head={<img src={profileMenuIcon} alt="three-points" />}
              >
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="box-secondary pr-[49px] flex gap-[8px] items-center"
                >
                  <img src={personIcon} alt="person" />
                  <span>Войти</span>
                </button>
              </Dropdown>
            )}
          </div>
          <div className="relative container py-30 flex justify-between gap-[20px] items-center lt:justify-center lt:pt-[16px]">
            <div className="flex gap-[24px] items-center lt:hidden">
              <button onClick={() => setIsBurgerOpen(true)}>
                <img src={burgerIcon} alt="burger-menu" />
              </button>
              <Link to="/" className="pt-[5px]">
                <img src={logoIcon} alt="logo" />
              </Link>
            </div>
            <Search
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
            <Modal
              isOpen={isSearchFocus}
              close={() => setIsSearchFocus(false)}
              modalStyle="z-[20]"
            />
            {isProfileLoading ? (
              <div className="relative">
                <Loading />
              </div>
            ) : isAuth && profile ? (
              <div className="lt:hidden">
                <ProfileDropdown
                  profile={profile}
                  head={
                    <>
                      <span>{textLimit(profile?.fullname || "User", 14)}</span>
                      <img
                        alt="avatar"
                        src={profile.image || avaIcon}
                        className="w-[40px] h-[40px] rounded-circle object-cover object-center"
                      />
                    </>
                  }
                />
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="box-secondary flex gap-[8px] items-center lt:hidden"
              >
                <img src={personIcon} alt="person" />
                <span>Войти</span>
              </button>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-white"></div>
        <Categories />
        <Burger
          isOpen={isBurgerOpen}
          close={() => setIsBurgerOpen(false)}
          authOpen={() => setIsAuthOpen(true)}
        />
      </header>
    </>
  );
};

export default Header;
