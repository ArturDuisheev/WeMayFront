import { FC, MouseEvent, useEffect, useState } from "react";
import { IPromotionCard } from "../../types/types";
import { Link } from "react-router-dom";
import starIcon from "../../assets/images/icons/star.svg";
import starYellowIcon from "../../assets/images/icons/star-yellow.svg";
import likeIcon from "../../assets/images/icons/like.svg";
import likedIcon from "../../assets/images/icons/liked.svg";
import { useProfile } from "../../hooks/useProfile";
import { useFavourites } from "../../hooks/useFavourites";
import { RootState, useAppDispatch } from "../../store/store";
import { setIsAuthOpen } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useLikePromotion } from "../../hooks/useLikePromotion";
import { useAddToFavouritePromotion } from "../../hooks/useAddToFavouritePromotion";

interface IPromotionCardProps extends IPromotionCard {
  disabled?: boolean;
}

const PromotionCard: FC<IPromotionCardProps> = ({
  id,
  title,
  old_price,
  new_price,
  discount,
  likes,
  images,
  disabled = false,
}) => {
  const dispatch = useAppDispatch();
  const [localLikes, setLocalLikes] = useState(likes || []);
  const [localIsFavourite, setLocalIsFavourite] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const { data: profile } = useProfile();
  const { data: favourites } = useFavourites();

  const { mutate: addToFavourite } = useAddToFavouritePromotion();

  const { mutate: like } = useLikePromotion();

  useEffect(() => {
    likes && setLocalLikes(likes);
  }, [likes]);

  useEffect(() => {
    favourites?.results?.some((promotion) => promotion.id === id) &&
      setLocalIsFavourite(true);
  }, [favourites]);

  const onClickLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!profile?.id) {
      dispatch(setIsAuthOpen(true));
      return;
    }

    like(id);
    setLocalLikes((prev) =>
      prev.includes(profile?.id!)
        ? prev.filter((id) => id !== profile?.id)
        : [...prev, profile?.id!]
    );
  };

  const onClickFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!profile?.id) {
      dispatch(setIsAuthOpen(true));
      return;
    }

    addToFavourite(id);
    setLocalIsFavourite((prev) => !prev);
  };

  return (
    <Link
      to={`/promotion/${id}`}
      className="block max-w-[540px] lt:max-w-[768px]"
      onClick={(e) => disabled && e.preventDefault()}
    >
      <div
        style={{ backgroundImage: `url(${images?.[0]?.image})` }}
        className="rounded-[24px] pt-[16px] w-full h-[260px] bg-cover bg-no-repeat bg-center text-white lt:h-[370px] tb:h-[300px] stb:h-[260px] smb:h-[200px]"
      >
        <div className="h-full flex flex-col justify-between">
          <button onClick={onClickFavourite} className="pr-[16px] self-end">
            <img
              alt="star"
              src={isAuth && localIsFavourite ? starYellowIcon : starIcon}
            />
          </button>
          <div className="flex justify-between">
            {discount ? (
              <span className="rounded-[0_24px_0_24px] p-[12px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] text-[24px] font-bold">
                -{discount}%
              </span>
            ) : (
              <div></div>
            )}
            <button
              onClick={onClickLike}
              className="rounded-[24px_0_24px_0] py-[12px] px-[24px] bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] flex gap-[8px] items-center"
            >
              <img
                src={
                  isAuth && localLikes.includes(profile?.id!)
                    ? likedIcon
                    : likeIcon
                }
                alt="like"
              />
              <span className="font-medium">{localLikes?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
      <h3 className="mt-[24px] mb-[16px] font-semibold stb:font-normal">
        {title}
      </h3>
      <div className="flex gap-[8px] items-center text-[20px] leading-[24px] stb:text-18">
        {old_price && (
          <span className="relative font-medium text-[rgba(130,130,130,1)]">
            от {old_price} сом{" "}
            <div className="absolute top-[calc(50%)] left-0 right-0 h-[1px] bg-[rgba(130,130,130,1)]"></div>
          </span>
        )}
        <b>от {new_price} сом</b>
      </div>
    </Link>
  );
};

export default PromotionCard;
