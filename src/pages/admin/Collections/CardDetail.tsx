import Pagination from "@/components/ui/Pagination";
import TiltedCard from "@/components/ui/TiledCard";
import CardStore from "@/store/card.store";
import CardListStore from "@/store/cardList.store";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { formatRupiah } from "@/helper/formatRupiah";

const CardDetail = () => {
  const [searchParams] = useSearchParams();
  const {
    getOneCard,
    cardItem,
    addStockCard,
    getCard,
    cards,
    addCardToSpecial,
    deleteRequiredCard,
  } = CardStore();
  const { getCardList, cardsList } = CardListStore();

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const id = searchParams.get("card") ?? "";
  const type = searchParams.get("type") ?? "";
  const dataSpecial = cardItem?.requirements

  useEffect(() => {
    const getCard = async () => {
      await getOneCard(id);
    };

    getCard();
  }, [id, itemsPerPage, currentPage]);

  useEffect(() => {
    const CardList = async () => {
      const payload = `limit=${itemsPerPage}&page=${currentPage}&where=cardId:${cardItem?.id}`;
      await getCardList(payload);
    };
    if (type !== "special") {
      CardList();
    }
  }, [cardItem]);

  useEffect(() => {
    if (cardsList) {
      setTotalPages(cardsList.total_pages);
    }
  }, [cardsList, itemsPerPage]);

  const handleStock = async () => {
    const data = {
      stock: Number(stock),
    };
    await addStockCard(id, data);
    setStock(0);
    closeModal("add-stock");
  };

  const triggerAddCard = async () => {
    const payload = `limit=1000`;
    await getCard(payload);
    openModal("add-card");
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((selectedId) => selectedId !== id);
      }
    });
  };

  const handleAddCardToSpecial = async () => {
    const payload = {
      requiredCardIds: selectedIds,
    };
    await addCardToSpecial(id, payload);
    closeModal("add-card");
    setSelectedIds([]);
  };

  const handleDeleteRequiredCard = async (idSpecial: string) => {
    await deleteRequiredCard(idSpecial, id);
    
  };

  const handleDownloadZip = async (cardsList: any) => {
    const zip = new JSZip();
  
    for (const item of cardsList.items) {
      const canvas = document.getElementById(item.uniqeCode) as HTMLCanvasElement;
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        const base64 = dataUrl.split(",")[1];
  
        zip.file(`QR-${item.uniqeCode}.png`, base64, { base64: true });
      }
    }
  
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "qr-codes.zip");
  };

  return (
    <div>
      <div className="w-full flex">
        <div className="w-1/4  p-10">
          <TiltedCard
            imageSrc={`${
              import.meta.env.VITE_REACT_API_URL
            }/api/download?path=${cardItem?.image}`}
            altText={cardItem?.name || "Card Image"}
            captionText={cardItem?.name || "Card Name"}
            containerWidth="300px"
            imageWidth="300px"
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
        <div className="w-3/4 p-10  gap-3 flex">
          <div className="w-1/2 flex-col flex gap-2">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}

                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{cardItem?.name}</td>
                  </tr>
                  <tr>
                    <td>Code</td>
                    <td>{cardItem?.code}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>
                      {cardItem?.isSpecial ? (
                        <span className="badge badge-primary">Special</span>
                      ) : (
                        <span className="badge badge-secondary">Regular</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Master</td>
                    <td>{cardItem?.master?.name}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{cardItem?.category?.name}</td>
                  </tr>
                  <tr>
                    <td>Series</td>
                    <td>{cardItem?.series?.name}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{formatRupiah(cardItem?.price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/2 flex-col flex gap-2">
            <div className="w-full border-l-10 border-amber-300 min-h-32 p-3 shadow-md rounded-md flex flex-col gap-5">
              <span className="text-2xl font-bold text-amber-500">
                {cardItem?.isSpecial ? "Max Redeem" : "Stock"}
              </span>
              <div>
                <span className="text-5xl font-bold">
                  {cardItem?.stock}
                </span>
                <p>{cardItem?.isSpecial ? "User" : "Card"}</p>
              </div>
            </div>
            <div className="w-full border-l-10 border-green-300 min-h-32 p-3 shadow-md rounded-md flex flex-col gap-5">
              <span className="text-2xl font-bold text-green-500">
                {cardItem?.isSpecial ? "Total Redeem" : "Linked to User"}
              </span>
              <div>
                <span className="text-5xl font-bold">
                  {cardItem?.isSpecial ? cardItem?.totalSpecialUsers : cardItem?.totalLinkedCardLists}
                </span>
                <p>{cardItem?.isSpecial ? "User" : "Card"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {type === "special" ? (
        <div>
          <div className="w-full mt-5 flex flex-col px-5 gap-2">
            <div className="flex justify-between ">
              <span className="text-xl font-bold">Requirement Card</span>

              <div className="flex gap-3">
                <button className="btn btn-primary" onClick={triggerAddCard}>
                  Add Card
                </button>
              </div>
            </div>
            <div className="overflow-x-auto ">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSpecial?.map((item: any, index: number) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.requiredCard.code}</td>
                      <td>{item.requiredCard.name}</td>
                      <td>{item.requiredCard.category.name}</td>
                      <td>{item.requiredCard.isSpecial ? "Special" : "Regular"}</td>
                      <td>
                        <div className="bg-white p-2 rounded-md qr-code">
                          <button
                            className="btn btn-error"
                            onClick={() => handleDeleteRequiredCard(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-5 flex flex-col px-5 gap-2">
          <div className="flex justify-between ">
            <span className="text-xl font-bold">List of Cards Stock</span>

            <div className="flex gap-3">
              <button
                className="btn btn-primary"
                onClick={() => openModal("add-stock")}
              >
                Add Stock
              </button>
              <button className="btn btn-success" onClick={() => handleDownloadZip(cardsList)}>Download QR Code</button>
            </div>
          </div>
          <div className="overflow-x-auto ">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Uniqe Code</th>
                  <th>Status</th>
                  <th>owner</th>
                  <th>created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cardsList?.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.uniqeCode}</td>
                    <td>{!item.linkedUser ? "not linked yet" : "linked"}</td>
                    <td>
                      {item?.user?.name} - {item?.user?.email}
                    </td>
                    <td>{item.createdAt}</td>
                    <td>
                      <div
                        key={index}
                        className="bg-white p-2 rounded-md qr-code"
                      >
                        <QRCodeCanvas
                          value={item.uniqeCode}
                          size={150}
                          id={item.uniqeCode}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-end mt-4">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              onTotalPageItem={(total) => setItemsPerPage(total)}
            />
          </div>
        </div>
      )}

      <Modal id="add-stock">
        <span>Add Stock Card</span>
        <input
          type="number"
          className="input w-full"
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <button className="btn btn-primary" onClick={handleStock}>
          Submit
        </button>
      </Modal>

      <Modal id="add-card" width="w-11/12 max-w-5xl">
        <span className="text-xl font-bold">Add Card to Special</span>
        <div className="flex flex-col gap-2 my-5">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {cards?.items
                  .filter((item: any) => cardItem && item.id !== cardItem.id)
                  .map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          onChange={(e) =>
                            handleCheckboxChange(item.id, e.target.checked)
                          }
                        />
                      </td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.category.name}</td>
                      <td>{item.isSpecial ? "Special" : "Regular"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleAddCardToSpecial}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CardDetail;
