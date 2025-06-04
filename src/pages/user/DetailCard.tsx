import TiltedCard, { type TiltedCardHandle } from "@/components/ui/TiledCard";
import { listedParam } from "@/constant/listed.param";
import { formatRupiah } from "@/helper/formatRupiah";
import CardStore from "@/store/card.store";
import CardSpecialStore from "@/store/cardSpecial";
import CartItemStore from "@/store/cartItem.store";
import { CheckCircleIcon, CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { flyToCart } from "@/components/ui/FlyToCart";
import { useRef } from "react";
import { BiCartAdd } from "react-icons/bi";
import Pagination from "@/components/ui/Pagination";

const DetailCard = () => {
  const { cardItem, getOneCard, cards, getCard } = CardStore();
  const {
    checkCardSpecial,
    specialCard,
    claimCardSpecial,
    isClaimed,
  } = CardSpecialStore();
  const { addToCart } = CartItemStore();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const cardRef = useRef<TiltedCardHandle>(null);
  const id = searchParams.get("card") ?? "";
  const type = searchParams.get("type") ?? "";
  const cartIconRef = document.getElementById("cart-button");

  const fetchData = async () => {
    await getOneCard(id);
    if (type === "special") {
      await checkCardSpecial(id);
    }
  };

  const fetchCard = async () => {
    const payload = `where=categoryId:${cardItem?.category?.id}&limit=${itemsPerPage}&page=${currentPage}`;
    await getCard(payload);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchCard();
  }, [currentPage, itemsPerPage, cardItem?.category?.id]);

  useEffect(() => {
    if (cards) {
      setTotalPages(cards.total_pages);
    }
  }, [cards, itemsPerPage]);

  const handleDetail = (id: string, type: string) => {
    const params = new URLSearchParams({
      card: id,
      type: type,
    });

    navigate(`${listedParam.detailCard}?${params.toString()}`);
  };

  const handleAddToCart = (id: string) => {
    const imgEl = cardRef.current?.getImage();

    if (imgEl && cartIconRef) {
      flyToCart(imgEl, cartIconRef);
    }
    addToCart({
      cardId: id,
      quantity: 1,
    });
  };

  const handleClaimCard = async () => {
    await claimCardSpecial(id);
  };

  useEffect(() => {
    if (isClaimed) {
      const params = new URLSearchParams({
        card: id,
        type: type,
      });

      navigate(`${listedParam.profile}?${params.toString()}`);
    }
  }, [isClaimed]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-5 min-h-screen">
        <div className="w-full sm:w-5/6 bg-white rounded-lg p-4 flex flex-col sm:flex-row">
          <div className="flex w-full sm:w-1/2 p-3 justify-center items-center">
            <div className="w-full sm:w-5/6 justify-center items-center flex">
              <TiltedCard
                imageSrc={`${
                  import.meta.env.VITE_REACT_API_URL
                }/api/download?path=${cardItem?.image}`}
                altText={cardItem?.name || "Card Image"}
                captionText={cardItem?.name || "Card Name"}
                containerWidth="500px"
                imageWidth="500px"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
                showSpecialBadge={cardItem?.isSpecial}
                overlayContent={
                  <div className="flex items-center justify-between h-full px-4 w-full"></div>
                }
              />
            </div>
          </div>
          <div className="flex w-full sm:w-1/2 py-5 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-bold">{cardItem?.name}</p>
              <div className="flex flex-col gap-5 w-full sm:w-1/2 mt-5">
                <p className="text-sm">Description</p>
                <p className="text-sm">{cardItem?.description}</p>
              </div>
            </div>

            <div className="flex flex-col mt-5 w-full bg-amber-100 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-5 w-full sm:w-1/2">
                  <span>
                    <p className="text-xl">Master</p>
                    <p className="badge badge-outline badge-secondary font-bold">
                      {cardItem?.master?.name}
                    </p>
                  </span>
                  <span>
                    <p className="text-xl">Category</p>
                    <p className="badge badge-outline badge-success font-bold">
                      {cardItem?.category?.name}
                    </p>
                  </span>
                  <span>
                    <p className="text-xl">Series</p>
                    <p className="badge badge-outline badge-warning font-bold">
                      {cardItem?.series?.name}
                    </p>
                  </span>
                  <span>
                    <p className="text-xl">Type</p>
                    <p className="badge badge-outline badge-warning font-bold">
                      {cardItem?.isSpecial ? "Special" : "Normal"}
                    </p>
                  </span>
                </div>
                {type === "regular" && (
                  <div className="flex flex-col gap-5 w-full sm:w-1/2">
                    <span>
                      <p className="text-xl">Stock</p>
                      <p className="text-2xl font-bold">{cardItem?.stock}</p>
                    </span>
                    <span>
                      <p className="text-xl">Price</p>
                      <p className="text-2xl font-bold">
                        {formatRupiah(cardItem?.price)}
                      </p>
                    </span>
                  </div>
                )}
              </div>
              {type === "special" && (
                <div className="flex w-full justify-start mt-5 flex-col gap-3">
                  <span className="text-xl">Requirment Card</span>
                  {specialCard?.missingCards?.map(
                    (item: any, index: number) => (
                      <div
                        className="flex items-center gap-5 w-full bg-amber-200 rounded-lg p-3 cursor-pointer"
                        key={index}
                        onClick={() => handleDetail(item?.id, "regular")}
                      >
                        <p className="tooltip" data-tip="Missing">
                          <CircleXIcon className="w-8 h-8 text-red-500" />
                        </p>
                        <p className="font-bold">{item?.name}</p>
                        <p className="badge badge-outline badge-error font-bold">
                          {item?.category}
                        </p>
                      </div>
                    )
                  )}
                  {specialCard?.ownedCards?.map((item: any, index: number) => (
                    <div
                      className="flex items-center gap-5 w-full bg-amber-200 rounded-lg p-3 cursor-pointer"
                      key={index}
                      onClick={() => handleDetail(item?.id, "regular")}
                    >
                      <p className="tooltip" data-tip="Owned">
                        <CheckCircleIcon className="w-8 h-8 text-green-500" />
                      </p>

                      <p className="font-bold">{item?.name}</p>
                      <p className="badge badge-outline badge-error font-bold">
                        {item?.category}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {type === "special" && (
              <div
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 border-base-300 border"
              >
                <div className="collapse-title font-semibold">
                  How to claim this card?
                </div>
                <div className="collapse-content text-sm">
                  <ul className="list-disc list-inside space-y-2">
                    <li className="flex gap-2 items-center">
                      collect all the required cards marked with the symbol,
                      <CircleXIcon className="w-8 h-8 text-red-500" />
                    </li>
                    <li className="flex gap-2 items-center">
                      after the cards are collected marked with the symbol
                      <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    </li>
                    <li className="flex gap-2 items-center">
                      the claim button will open
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {type === "special" && (
              <div className="flex w-full justify-start mt-5">
                <button
                  className={`btn btn-primary ${
                    specialCard?.hasAllRequirements ? "" : "btn-disabled"
                  }`}
                  onClick={handleClaimCard}
                >
                  <p>Claim Now</p>
                </button>
              </div>
            )}

            {type === "regular" && (
              <div className="flex w-full justify-start mt-5">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(id)}
                >
                  <p>Add to Cart</p>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg p-5 mt-5 w-full sm:w-5/6 mx-auto">
          <span className="text-2xl font-bold">
            Related Card for {cardItem?.category?.name}
          </span>
          <div className="flex flex-wrap gap-2 w-full  items-center mt-5">
            {cards?.items?.map((card: any, index: number) => (
              <TiltedCard
                key={index}
                imageSrc={`${
                  import.meta.env.VITE_REACT_API_URL
                }/api/download?path=${card?.image}`}
                altText={card.name}
                ref={cardRef}
                captionText={card.name}
                containerWidth="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                showSpecialBadge={card.isSpecial}
                onClick={() =>
                  handleDetail(card.id, card.isSpecial ? "special" : "regular")
                }
                overlayContent={
                  <div className="flex h-full px-4 w-full">
                    <div className="flex flex-col w-full h-full justify-between gap-2">
                      <p className="font-bold text-black">{card.name}</p>
                      <p className="text-sm badge badge-outline badge-xs badge-secondary">
                        {card.category.name}
                      </p>
                      {!card.isSpecial && (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Price: </p>
                            <span className="font-medium ">
                              {formatRupiah(card.price)}
                            </span>
                          </div>
                          <button
                            className="btn  btn-sm btn-ghost bg-amber-400 hover:bg-amber-500 text-gray-900 text-xl"
                            onClick={() => {
                              handleAddToCart(card.id);
                            }}
                          >
                            <BiCartAdd />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
          <div className="flex w-full justify-end mt-4 px-10">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              onTotalPageItem={(total) => setItemsPerPage(total)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
