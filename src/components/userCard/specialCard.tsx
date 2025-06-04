import { useEffect } from "react";
import TiltedCard from "../ui/TiledCard";
import userStore from "@/store/user.store";
import CardSpecialStore from "@/store/cardSpecial";

const SpecialCard = () => {
  const { specialCards, getAllSpecialCards } = CardSpecialStore();
  const { user } = userStore();

  useEffect(() => {
    const CardList = async () => {
      if (user) {
      
        await getAllSpecialCards();
      }
    };
    CardList();
  }, [user]);

  
  return (
    <div className="flex flex-wrap gap-2 w-full justify-start items-start ">
      {specialCards?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className=" text-gray-900 dark:text-white mb-4 text-center">
          you don't have any card yet, find the card in the marketplace
          </p>
        </div>
      ) : (
      specialCards?.map((card: any) => (
        <TiltedCard
          imageSrc={`${import.meta.env.VITE_REACT_API_URL}/api/download?path=${
            card?.card?.image
          }`}
          altText={card?.card?.name}
          captionText={card?.card?.name}
          containerWidth="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
          showSpecialBadge={card.card.isSpecial}
          overlayContent={
            <div className="flex items-center justify-between h-full px-4 w-full"></div>
          }
          />
        ))
      )}
    </div>
  );
};

export default SpecialCard;
