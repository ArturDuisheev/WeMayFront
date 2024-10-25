import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import { useClearCategory } from "../../hooks/useClearCategory";

const PromotionsDayPage: FC = () => {
  useClearCategory();
  return <Promotions isPagination title="Акции дня" promotionsType="daily" />;
};

export default PromotionsDayPage;
