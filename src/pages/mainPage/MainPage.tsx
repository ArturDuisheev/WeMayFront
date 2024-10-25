import { FC } from "react";
import Slider from "../../components/mainPage/slider/Slider";
import Companies from "../../components/mainPage/companies/Companies";
import Promotions from "../../components/promotions/Promotions";
import { useClearCategory } from "../../hooks/useClearCategory";

const MainPage: FC = () => {
  useClearCategory();

  return (
    <>
      <Slider />
      <Companies />
      <Promotions />
    </>
  );
};

export default MainPage;
