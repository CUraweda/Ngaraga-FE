import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrendingStore from "@/store/trending.store";
import useAuthStore from "@/store/auth.store";
import TiltedCard from "../ui/TiledCard";
import { listedParam } from "@/constant/listed.param";

const TrendingCard = () => {
  const { items } = TrendingStore();
  const { user } = useAuthStore();
  const [card, setCard] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (items?.items?.length > 0) {
      const trendingCards = items.items.filter(
        (item: any) => item.note === "trending"
      );
      console.log(trendingCards);
      if (trendingCards.length > 0) {
        setCard(trendingCards.map((item: any) => item.card));
      }
    }
  }, [items]);

  const handleDetail = (id: string, isSpecial: boolean) => {
    if (user) {
      const params = new URLSearchParams({
        card: id,
        type: isSpecial ? "special" : "regular",
      });

      navigate(`${listedParam.detailCard}?${params.toString()}`);
    } else {
      navigate(listedParam.signin);
    }
  };
  return (
    <div>
      <section className="bg-base-200 p-5 rounded-lg min-h-screen flex items-center justify-center">
        <div className="w-5/6 mx-auto flex flex-col gap-10">
          <div className=" mx-auto w-full">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Cards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Checkout our weekly updated trending collection.
              </p>
            </div>

            <div className="w-full flex flex-wrap justify-center items-center gap-8 mx-auto mt-10 ">
              {card?.map((card: any, index: number) => (
                <TiltedCard
                  key={index}
                  imageSrc={`${
                    import.meta.env.VITE_REACT_API_URL
                  }/api/download?path=${card?.image}`}
                  altText={card.name}
                  captionText={card.name}
                  containerWidth="250px"
                  imageWidth="250px"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  showSpecialBadge={card.isSpecial}
                  onClick={() => handleDetail(card.id, card.isSpecial)}
                  overlayContent={
                    <div className="flex h-full px-4 w-full"></div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrendingCard;
