import React from "react";
import CardTrending from "../ui/CardTrending";

const TrendingCard = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto">
          <div className=" mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Cards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Checkout our weekly updated trending collection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <CardTrending/>
              <CardTrending/>
              <CardTrending/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrendingCard;
