import TiltedCard, { type TiltedCardHandle } from "@/components/ui/TiledCard";
import { BiCartAdd } from "react-icons/bi";
import CardStore from "@/store/card.store";
import categoryStore from "@/store/category.store";
import CartItemStore from "@/store/cartItem.store";
import userStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { formatRupiah } from "@/helper/formatRupiah";
import { listedParam } from "@/constant/listed.param";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { flyToCart } from "@/components/ui/FlyToCart";

const HomeMarket = () => {
  const { categories, getCategory } = categoryStore();
  const { cards, getCard } = CardStore();
  const { user } = userStore();
  const navigate = useNavigate();
  const { addToCart } = CartItemStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const cardRef = useRef<TiltedCardHandle>(null);

  const cartIconRef = document.getElementById("cart-button");

  const fetchData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}${
      category !== "all" ? `&categoryId=${category}` : ""
    }`;
    await getCard(payload);
    await getCategory(payload);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, search, category]);

  useEffect(() => {
    if (cards) {
      setTotalPages(cards.total_pages);
    }
  }, [cards, itemsPerPage]);

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

  const handleAddToCart = (id: string) => {
    const imgEl = cardRef.current?.getImage();
    if (!user) {
      navigate(listedParam.signin);
      return;
    }

    if (imgEl && cartIconRef) {
      flyToCart(imgEl, cartIconRef);
    }
    addToCart({
      cardId: id,
      quantity: 1,
    });
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-10 px-5 mx-auto mt-10 ">
        <div className="w-full flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Marketplace
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse through more than 50k Cards on the Card Marketplace.
          </p>
        </div>

        <div className="flex w-full justify-end md:flex-row gap-4">
          <fieldset className="fieldset">
            <select
              defaultValue="filter"
              className="select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Category</option>
              {categories?.items?.map((category: any, index: number) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </fieldset>
          <label className="input">
            <SearchIcon className="h-[1em] opacity-50" />
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-8 mx-auto mt-10">
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
            onClick={() => handleDetail(card.id, card.isSpecial)}
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
  );
};

export default HomeMarket;
