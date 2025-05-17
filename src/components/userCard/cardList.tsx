import { useEffect } from "react";
import TiltedCard from "../ui/TiledCard";
import CardListStore from "@/store/cardList.store";
import userStore from "@/store/user.store";

const cardList = () => {
  const { getCardList, cardsList } = CardListStore();
  const { user } = userStore();

  useEffect(() => {
    const CardList = async () => {
      if (user) {
        const payload = `limit=1000&where=linkedUser:${user.id}`;
        await getCardList(payload);
      }
    };
    CardList();
  }, [user]);

  
  return (
    <div className="flex flex-wrap gap-2 w-full justify-start items-start ">
      {cardsList?.items?.map((card: any) => (
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
          overlayContent={
            <div className="flex items-center justify-between h-full px-4 w-full"></div>
          }
        />
      ))}
    </div>
  );
};

export default cardList;
