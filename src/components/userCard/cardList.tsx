import { useEffect } from "react";
import TiltedCard from "../ui/TiledCard";
import CardListStore from "@/store/cardList.store";

const cardList = (id: any) => {
  const { getCardList, cardsList } = CardListStore();

  useEffect(() => {
    const CardList = async () => {
        const idUser = id.id ? id.id : 'Razdan12'
      if (idUser) {
        const payload = `limit=1000&where=linkedUser:${idUser}`;
        await getCardList(payload);
      }
    };
    CardList();
  }, [id]);

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
            <div className="flex items-center justify-between h-full px-4 w-full">
              
            </div>
          }
        />
      ))}
    </div>
  );
};

export default cardList;
