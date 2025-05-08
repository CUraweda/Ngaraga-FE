import React from "react";
import { FaPenAlt } from "react-icons/fa";

interface CategoryProps {
  name: string;
  icon: React.ReactNode;
  bgImage: string;
}

const categories: CategoryProps[] = [
  {
    name: "Art",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Collectibles",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Music",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Photography",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Video",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Utility",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Sport",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Virtual Worlds",
    icon: <FaPenAlt className="w-8 h-8 text-white" />,
    bgImage: "/placeholder.svg?height=300&width=400",
  },
];

function CategoryCard({ name, icon, bgImage }: CategoryProps) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={bgImage || "/placeholder.svg"}
          alt={`${name} category`}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4">
        <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
      </div>
    </div>
  );
}
const Category = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Browse Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
