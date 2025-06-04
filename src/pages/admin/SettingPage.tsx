import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import TrendingStore from "@/store/trending.store";
import CardStore from "@/store/card.store";
import { useEffect, useState } from "react";

const SettingPage = () => {
  const { items, getAllHomePage, createHomePage ,deleteHomePage} = TrendingStore();
  const { cards, getCard } = CardStore();
  const [position, setPosition] = useState("home");
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    getAllHomePage("");
  }, []);

  const handleGetCards = async () => {
    await getCard("limit=1000");
    openModal("add-home-page");
  };

  const handleAddCard = async () => {
    await createHomePage({
      cardId: cardId,
      note: position,
    });
    setCardId("");
    setPosition("trending");
    closeModal("add-home-page");
  };

  const handleDeleteCard = async (id: string) => {
    await deleteHomePage(id);
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-5 items-center ">
      <div className="w-5/6 mt-5 p-5 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold">Seeting Card on Home Page</span>
            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleGetCards()}
              >
                Add
              </button>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.items?.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.card.code} - {item.card.name}</td>
                    <td>{item.note}</td>
                    <td>
                      <button className="btn btn-error" onClick={() => handleDeleteCard(item.id)}>Delete</button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal id="add-home-page">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Add Card on Home Page</span>
          <div className="flex flex-col gap-2 mt-3">
            <span className="text-sm font-bold">Card</span>
            <select
              className="select select-bordered w-full "
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
            >
                <option value="">Select Card</option>
              {cards?.items?.map((card: any) => (
                <option value={card.id}>
                  {card.code} - {card.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <span className="text-sm font-bold">Position</span>
            <select
              className="select select-bordered w-full "
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Select Position</option>
              <option value="home">Hero Section</option>
              <option value="trending">Trending Section</option>
            </select>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={() => handleAddCard()}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingPage;
