import { FC } from "react";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";
import heartIcon from "../../assets/images/icons/heart.svg";
import { useLikes } from "../../hooks/useLikes";
import { useLikePromotion } from "../../hooks/useLikePromotion";
import { useClearCategory } from "../../hooks/useClearCategory";

const LikedPromotionsPage: FC = () => {
  useClearCategory();
  const { data: promotions } = useLikes();

  const { mutate: like } = useLikePromotion();

  const onClickDelete = (id: number) => {
    like(id);
  };

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="pl-[9px] flex gap-[16px] items-center">
        <img src={heartIcon} alt="star-green" />
        <h2>Любимые акции {promotions?.count || 0}</h2>
      </div>
      <div className="mt-[32px] [&>:not(:last-child)]:mb-40">
        {promotions?.count ? (
          promotions?.results.map((promotion) => (
            <PromotionCatdTwo
              {...promotion}
              key={promotion.id}
              onClickDelete={onClickDelete}
            />
          ))
        ) : (
          <span className="block text-center">Пусто</span>
        )}
      </div>
    </div>
  );
};

export default LikedPromotionsPage;
