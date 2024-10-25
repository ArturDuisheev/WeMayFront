import { FC, MouseEvent, useEffect, useState } from "react";
import { IPromotionCard } from "../../types/types";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { RootState, useAppDispatch } from "../../store/store";
import { setIsAuthOpen } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import likeIcon from "../../assets/images/icons/like.svg";
import likedIcon from "../../assets/images/icons/liked.svg";
import { useLikePromotion } from "../../hooks/useLikePromotion";

interface IPromotionCardTwoProps extends IPromotionCard {
  onClickDelete: (id: number) => void;
}

const PromotionCatdTwo: FC<IPromotionCardTwoProps> = ({
  id,
  images,
  discount,
  likes,
  title,
  old_price,
  new_price,
  onClickDelete,
}) => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [localLikes, setLocalLikes] = useState(likes || []);

  const { data: profile } = useProfile();

  const { mutate: like } = useLikePromotion();

  useEffect(() => {
    likes && setLocalLikes(likes);
  }, [likes]);

  const deleteFunc = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickDelete(id);
  };

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

  return (
    <Link to={`/promotion/${id}`} className="flex gap-[24px] tb:flex-col  ">
      <div
        style={{ backgroundImage: `url(${images[0]?.image})` }}
        className="rounded-[24px] flex-[0_0_414px] h-[200px] flex justify-between items-end bg-no-repeat bg-cover bg-center text-white tb:flex-[260px] stb:flex-auto"
      >
        <span className="rounded-[0px_24px_0px_24px] py-[12px] pl-[12px] pr-[33px] bg-[linear-gradient(90deg,#2F80ED_0%,rgba(47,128,237,0)_100%)] font-bold">
          -{discount}%
        </span>
        <button
          onClick={onClickLike}
          className="rounded-[24px_0px_24px_0px] py-[15px] px-[24px] flex gap-[8px] items-center bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_96.11%)] font-medium"
        >
          <img
            src={
              isAuth && localLikes.includes(profile?.id!) ? likedIcon : likeIcon
            }
            alt="like"
          />
          <span>{likes.length || 0}</span>
        </button>
      </div>
      <div className="flex-auto flex flex-col">
        <h3 className="text-grey font-semibold">{title}</h3>
        <div className="mt-[16px] mb-auto flex gap-[12px] text-[20px]">
          <span className="text-[rgba(130,130,130,1)] line-through">
            от {old_price} сом
          </span>
          <span className="font-bold">от {new_price} сом</span>
        </div>
        <button
          onClick={deleteFunc}
          className="box-secondary py-[14px] px-[47px] border-[2px] w-fit self-end text-green font-bold"
        >
          Удалить
        </button>
      </div>
    </Link>
  );
};

export default PromotionCatdTwo;
