import { FC } from "react";
import { useCompanies } from "../../hooks/useCompanies";
import CompanyCard from "../../components/companyCard/CompanyCard";
import { useTopScroll } from "../../hooks/useTopScroll";

const CompaniesPage: FC = () => {
  useTopScroll();
  const { data } = useCompanies();

  return (
    <div className="container py-60 min-h-[calc(100vh-279px)]">
      <h2>Компании</h2>
      <div className="mt-40 grid grid-cols-5 gap-x-[16px] gap-y-[30px] lt:grid-cols-3 tb:grid-cols-2 bmb:grid-cols-1">
        {data?.results.map((company) => (
          <div key={company.id} className="mx-auto">
            <CompanyCard {...company} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;
