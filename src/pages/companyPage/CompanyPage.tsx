import { FC } from "react";
import Promotions from "../../components/promotions/Promotions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import companiesService from "../../services/companiesService";
import Loading from "../../components/ui/loading/Loading";
import { useClearCategory } from "../../hooks/useClearCategory";
import { useTopScroll } from "../../hooks/useTopScroll";

const CompanyPage: FC = () => {
  const { id } = useParams();
  useTopScroll()
  useClearCategory();

  const { data, isLoading } = useQuery({
    queryKey: ["companies", id],
    queryFn: () => companiesService.getById(+(id || 0)),
    select: ({ data }) => data,
  });

  if (isLoading)
    return (
      <div className="relative h-[calc(100vh-275px)]">
        <Loading />
      </div>
    );

  return (
    <>
      <section className="container pt-80 text-[rgba(51,51,51,1)]">
        <h1 className="title">Компания {data?.name}</h1>
        <div className="my-[64px] flex gap-[35px] items-center tb:flex-col">
          <img
            src={data?.image}
            alt="company-icon"
            className="max-w-[200px] max-h-[190px] object-cover object-center"
          />
          <p className="text-18 leading-[23px]">{data?.description}</p>
        </div>
      </section>
      {data?.name && (
        <section>
          <Promotions title="Акции" style="pt-0" companyName={data.name} />
        </section>
      )}
    </>
  );
};

export default CompanyPage;
