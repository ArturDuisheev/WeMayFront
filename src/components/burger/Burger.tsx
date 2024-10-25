import clsx from "clsx";
import { FC, useEffect } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import crossIcon from "../../assets/images/icons/cross.svg";
import { menuData } from "../../data/data";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setCategories } from "../../store/slices/filterSlice";
import { useQuery } from "@tanstack/react-query";
import categoryService from "../../services/categoryService";
import { useProfile } from "../../hooks/useProfile";

interface IBurgerProps {
  isOpen: boolean;
  close: () => void;
  authOpen: () => void;
}

const Burger: FC<IBurgerProps> = ({ isOpen, close, authOpen }) => {
  const dispatch = useAppDispatch();

  const { data: profile } = useProfile();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  const onClickCategory = (state: TransitionStatus, categoryName: string) => {
    state === "entered" && close();
    dispatch(setCategories([categoryName]));
  };

  return (
    <Transition in={isOpen} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <>
          <div
            onClick={() => state === "entered" && close()}
            className={clsx(
              "fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.25)] z-50",
              {
                "animate-[open-modal-wrapper_0.5s_forwards]":
                  state === "entering",
                "animate-[open-modal-wrapper_0.5s_forwards_reverse]":
                  state === "exiting",
              }
            )}
          ></div>
          <div
            className={clsx("fixed top-0 bottom-0 left-0 z-[52]", {
              "animate-[open-burger_0.5s_forwards]": state === "entering",
              "animate-[open-burger_0.5s_forwards_reverse]":
                state === "exiting",
            })}
          >
            <button
              onClick={() => state === "entered" && close()}
              className="absolute top-[16px] right-[-40px]"
            >
              <img src={crossIcon} alt="cross" />
            </button>
            <nav className="px-[32px] pt-[24px] h-screen overflow-y-scroll scroll-hidden w-[374px] bg-gray shadow-[1.186px_1.423px_3.148px_0px_rgba(0,0,0,0.02),5.216px_6.26px_6.519px_0px_rgba(0,0,0,0.03),12.804px_15.364px_13px_0px_rgba(0,0,0,0.04),24.659px_29.591px_25.481px_0px_rgba(0,0,0,0.04),41.493px_49.792px_46.852px_0px_rgba(0,0,0,0.05),64.018px_76.822px_80px_0px_rgba(0,0,0,0.07)] stb:w-[288px] stb:px-[8px] smb:w-[270px]">
              {menuData.map((link) =>
                link.link ? (
                  <Link
                    key={link.label}
                    to={link.link}
                    onClick={() => state === "entered" && close()}
                    className="block py-20 px-[24px] border-b border-[#D7D7D7]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  !profile && (
                    <button
                      key={link.label}
                      onClick={() => {
                        state === "entered" && close(), authOpen();
                      }}
                      className="block w-full py-20 px-[24px] border-b border-[#D7D7D7]"
                    >
                      {link.label}
                    </button>
                  )
                )
              )}
              <ul className="mt-[32px]">
                {data?.results?.map((category) => (
                  <li key={category.title}>
                    <Link
                      to="/promotions"
                      key={category.title}
                      onClick={() => onClickCategory(state, category.title)}
                      style={{ backgroundImage: `url(${category.image})` }}
                      className="rounded-[12px] mb-[8px] px-[16px] py-20 w-full h-[150px] flex flex-col justify-end gap-[4px] bg-no-repeat bg-cover bg-right"
                    >
                      <strong className="text-18 text-grey leading-[130%]">
                        {category.title}
                      </strong>
                      <span className="text-14 leading-[140%]">
                        {category.count_category} акций
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </Transition>
  );
};

export default Burger;
