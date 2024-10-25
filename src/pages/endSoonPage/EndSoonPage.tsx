import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import { useClearCategory } from "../../hooks/useClearCategory";

const EndSoonPage: FC = () => {
  useClearCategory();

  return (
    <Promotions
      isPagination
      title="Скоро заканчивается"
      promotionsType="endSoon"
    />
  );
};

export default EndSoonPage;
