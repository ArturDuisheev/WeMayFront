import { FC } from "react";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";
import plusIcon from "../../assets/images/icons/plus.svg";
import { Link, Navigate } from "react-router-dom";
import { useMyPromotions } from "../../hooks/useMyPromotions";
import { useMutation } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import Loading from "../../components/ui/loading/Loading";
import clsx from "clsx";
import { useClearCategory } from "../../hooks/useClearCategory";

const MyPromotionsPage: FC = () => {
  useClearCategory();
  const { data: promotions, refetch, isLoading, isError } = useMyPromotions();

  const { mutate: deleteMy, isPending: isDeleteLoading } = useMutation({
    mutationFn: promotionService.deleteMy,
    onSuccess: () => {
      refetch();
    },
  });

  const onClickDelete = (id: number) => {
    deleteMy(id);
  };

  if (!localStorage.getItem("wemay-access-token") || isError)
    return <Navigate to="/" replace />;

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="flex justify-between">
        <h2>Мои акции</h2>
        <Link
          to="/promotion-publicate"
          className="btn rounded-[24px] py-[22px] flex gap-[10px] items-center"
        >
          <img src={plusIcon} alt="plus" />
          <span>Новая акция</span>
        </Link>
      </div>
      <div className="relative mt-[32px] ">
        <div
          className={clsx("[&>:not(:last-child)]:mb-40", {
            "blur-sm": isDeleteLoading,
          })}
        >
          {isLoading ? (
            <Loading />
          ) : (
            promotions?.results.map((promotion) => (
              <PromotionCatdTwo
                key={promotion.id}
                onClickDelete={onClickDelete}
                {...promotion}
              />
            ))
          )}
        </div>
        {isDeleteLoading && <Loading />}
      </div>
    </div>
  );
};

export default MyPromotionsPage;
