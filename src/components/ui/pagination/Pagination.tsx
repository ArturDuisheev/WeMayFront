import { Dispatch, FC, useEffect, useState } from "react";
import clsx from "clsx";

interface IPaginationProps {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  count: number;
  limit: number;
  pagesViewLimit: number;
  reactWhenNumber?: number;
  wrapperStyle?: string;
  leftBtnIcon?: string;
  rightBtnIcon?: string;
  paginationStyle?: string;
  pageBtnStyle?: string;
  activePageBtnStyle?: string;
  navBtnsStyle?: string;
  nearestPageBtnStyle?: string;
}

const Pagination: FC<IPaginationProps> = ({
  page,
  count,
  limit,
  setPage,
  pagesViewLimit,
  reactWhenNumber = 1,
  wrapperStyle = "",
  leftBtnIcon = "",
  rightBtnIcon = "",
  paginationStyle = "",
  pageBtnStyle = "",
  activePageBtnStyle = "",
  navBtnsStyle = "",
  nearestPageBtnStyle = "",
}) => {
  if (count <= limit) return <></>;

  const pagesCount = Math.ceil(count / limit);
  const [pagesControl, setPagesControl] = useState({
    offset: 0,
    limit: pagesViewLimit,
  });
  const pages = [...new Array(pagesCount)]
    .map((_, key) => key + 1)
    .slice(pagesControl.offset, pagesControl.limit);

  useEffect(() => {
    if (!pages.includes(page + reactWhenNumber)) {
      const limit =
        page + reactWhenNumber < pagesCount
          ? page + reactWhenNumber
          : pagesCount;

      setPagesControl({
        offset: limit - pagesViewLimit,
        limit,
      });
    } else if (!pages.includes(page - reactWhenNumber)) {
      const offset =
        page - reactWhenNumber - 1 > 0 ? page - reactWhenNumber - 1 : 0;

      setPagesControl({
        offset,
        limit: offset + pagesViewLimit,
      });
    }
  }, [page]);

  const onPrev = () => {
    page > 1 && setPage((page) => page - 1);
  };

  const onNext = () => {
    page < pagesCount && setPage((page) => page + 1);
  };

  return (
    <div className={clsx("flex", wrapperStyle)}>
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className={clsx("flex-shrink-0", navBtnsStyle)}
      >
        <img src={leftBtnIcon} alt="arrow-left" />
      </button>
      <div className={clsx("flex", paginationStyle)}>
        {pages.map((currentPage) => (
          <button
            key={currentPage}
            onClick={() => setPage(currentPage)}
            className={clsx(pageBtnStyle, {
              [activePageBtnStyle]: currentPage === page,
              [nearestPageBtnStyle]:
                page - 1 === currentPage || page + 1 === currentPage,
            })}
          >
            {currentPage}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={page >= pagesCount}
        className={clsx("flex-shrink-0", navBtnsStyle)}
      >
        <img src={rightBtnIcon} alt="arrow-right" />
      </button>
    </div>
  );
};

export default Pagination;
