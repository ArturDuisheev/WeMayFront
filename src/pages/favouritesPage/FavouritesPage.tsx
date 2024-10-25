import { FC } from "react";
import starGreenIcon from "../../assets/images/icons/star-green.svg";
import PromotionCatdTwo from "../../components/promotionCardTwo/PromotionCatdTwo";
import { useFavourites } from "../../hooks/useFavourites";
import { useAddToFavouritePromotion } from "../../hooks/useAddToFavouritePromotion";
import { useClearCategory } from "../../hooks/useClearCategory";

const FavouritesPage: FC = () => {
  useClearCategory();
  const { data: promotions } = useFavourites();

  const { mutate: addToFavourite } = useAddToFavouritePromotion();

  const onClickDelete = (id: number) => addToFavourite(id);

  return (
    <div className="container pt-80 pb-[120px] max-w-[848px]">
      <div className="pl-[9px] flex gap-[16px] items-center">
        <img src={starGreenIcon} alt="star-green" />
        <h2>Избранное {promotions?.count}</h2>
      </div>
      <div className="mt-[32px] [&>:not(:last-child)]:mb-40">
        {promotions?.results.map((promotion) => (
          <PromotionCatdTwo
            key={promotion.id}
            onClickDelete={onClickDelete}
            {...promotion}
          />
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
