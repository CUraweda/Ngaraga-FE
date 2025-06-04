import useCategoryStore from "@/store/category.store";
import { useEffect } from "react";

const Category = () => {
  const { categories, getCategory } = useCategoryStore();

  useEffect(() => {
    getCategory("");
  }, []);

  return (
    <div>
      <div className="container mx-auto min-h-96 p-5">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Checkout Categories on the Ngaraga Marketplace
          </p>
        </div>
        <data className="w-full flex flex-wrap gap-4 mt-5">
          {categories?.items?.map((category: any) => (
            <div key={category.id}>
              <img
                src={`${import.meta.env.VITE_REACT_API_URL}/api/download?path=${
                  category.image
                }`}
                alt={category.name}
                className="w-64"
              />
            </div>
          ))}
        </data>
      </div>
    </div>
  );
};

export default Category;
