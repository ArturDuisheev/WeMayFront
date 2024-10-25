import { FC } from "react";
import arrowLeftIcon from "../../assets/images/icons/arrow-left.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { setCategories } from "../../store/slices/filterSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import categoryService from "../../services/categoryService";
import Loading from "../ui/loading/Loading";

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.filter.categories);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    select: ({ data }) => data,
  });

  return (
    <nav className="relative py-20 container max-w-[1400px] flex justify-between items-center categories">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            disabled={!data?.results.length}
            className="px-10 h-full slider-prev group flex-shrink-0 disabled:hidden"
          >
            <img
              src={arrowLeftIcon}
              alt="arrow-left"
              className="trans-def group-disabled:opacity-50"
            />
          </button>
          <Swiper
            grabCursor
            slidesPerView={1}
            spaceBetween={24}
            modules={[Navigation]}
            navigation={{
              prevEl: ".categories .slider-prev",
              nextEl: ".categories .slider-next",
            }}
            breakpoints={{ 425: { slidesPerView: "auto" } }}
          >
            {data?.results?.map((category) => (
              <SwiperSlide key={category.title} className="w-fit">
                <Link
                  to="/promotions"
                  key={category.title}
                  onClick={() => dispatch(setCategories([category.title]))}
                  className={clsx(
                    "group flex flex-col items-center trans-def hover:text-green",
                    { "text-green": categories.includes(category.title) }
                  )}
                >
                  <div
                    style={{ maskImage: `url(${category.icon})` }}
                    className={clsx(
                      "w-[16px] h-[16px] bg-[#4F4F4F] opacity-50 trans-def group-hover:bg-green",
                      { "bg-green": categories.includes(category.title) }
                    )}
                  ></div>
                  <span>{category.title}</span>
                  {/* <div className="flex gap-[9px] items-center">
                <span className="whitespace-nowrap">{category.title}</span>
                <div
                  style={{ maskImage: `url(${smallArrowDownIcon})` }}
                  className={clsx(
                    "w-[8px] h-[4px] bg-[#333333] group-hover:bg-green",
                    { "bg-green": categories.includes(category.title) }
                  )}
                ></div>
              </div> */}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            disabled={!data?.results.length}
            className="px-10 h-full slider-next group flex-shrink-0 disabled:hidden"
          >
            <img
              src={arrowLeftIcon}
              alt="arrow-right"
              className="rotate-180 trans-def group-disabled:opacity-50"
            />
          </button>
        </>
      )}
    </nav>
  );
};

export default Categories;
