import { FC } from "react";
// import checkedIcon from "../../../assets/images/icons/checked.svg";
// import checkedWrapperIcon from "../../../assets/images/icons/checked-wrapper.svg";
import Select from "../../ui/select/Select";
import categoryService from "../../../services/categoryService";
import { useQuery } from "@tanstack/react-query";

interface ICategoriesProps {
  category: number;
  setCategory: (value: number) => void;
}

const Categories: FC<ICategoriesProps> = ({
  category: categoryId,
  setCategory,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    select: ({ data }) => data,
  });


  return (
    <div>
      <h3 className="mb-[8px] title-3">Выберите категорию</h3>
      <Select
        value={categoryId}
        isLoading={isLoading}
        onChange={(value) => setCategory(value as number)}
        customOptions={{ options: data?.results, labelKey: "title" }}
      />
    </div>
  );
};

export default Categories;
