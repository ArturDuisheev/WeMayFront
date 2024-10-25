import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import { useClearCategory } from "../../hooks/useClearCategory";

const PromotionsFreePage: FC = () => {
  useClearCategory();
  return <Promotions isPagination title="Бесплатно" promotionsType="free" />;
};

export default PromotionsFreePage;
