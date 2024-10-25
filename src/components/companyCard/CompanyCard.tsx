import { FC } from "react";
import {  ICompanyCard } from "../../types/types";
import { Link } from "react-router-dom";

const CompanyCard: FC<ICompanyCard> = ({
  id,
  image,
  promotions_count,
  discounts,
 
}) => {
  
  return (
    <Link
      to={`/company/${id}`}
      className="block rounded-[24px] border border-gray px-[12px] pb-40 w-[205px] h-[280px] trans-def hover:shadow-[0px_4px_13px_0px_#00000026]"
    >
      <div className="mb-[8px]">
        <img src={image} alt="company-logo" className="w-[180px] h-[166px] object-cover" />
      </div>
      <span className="mb-[16px] block text-[20px] leading-[24px] font-medium text-[#828282]">
        Акций: <b className="text-black">{promotions_count}</b>
      </span>
      <span className="mb-[16px] block text-[20px] leading-[24px] font-medium text-[#828282]">
        Скидки: до <b className="text-black">{discounts}%</b>
      </span>
    </Link>
  );
};

export default CompanyCard;
