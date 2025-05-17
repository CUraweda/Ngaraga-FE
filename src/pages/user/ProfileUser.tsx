import { Pencil, QrCode } from "lucide-react";

import Placeholder from "@/assets/Image PlaceHolder.png";
import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import QRScanner from "@/components/ui/QRCodeReader";
import userStore from "@/store/user.store";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import CardList from "@/components/userCard/cardList";
import CardListStore from "@/store/cardList.store";

import confetti from "canvas-confetti";

import { useState } from "react";
import { useRef } from "react";

const ProfileUser = () => {
  const { user, getUser } = userStore();
  const { claimNormalCard } = CardListStore();
  const [showCard, setShowCard] = useState(false);
  const [cardAnimIndex, setCardAnimIndex] = useState(0);
  

  const [showReward, setShowReward] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleQRResult = async (value: string) => {
    try {
      await claimNormalCard(value);
      setShowReward(true);
      closeModal("modal-QR");
      getUser();
  
      // buka portal
      setTimeout(() => {
        setShowCard(true);
  
        if (audioRef.current) {
          audioRef.current.play();
        }
  
        confetti({
          particleCount: 180,
          spread: 120,
          origin: { y: 0.6 },
          scalar: 1.2,
          zIndex: 9999,
        });
  
        // animasi konvert berulang
        let index = 0;
        const interval = setInterval(() => {
          setCardAnimIndex((prev) => prev + 1);
          index++;
          if (index >= 6) clearInterval(interval); // ulang 6x
        }, 500); // tiap 0.5 detik
      }, 2000);
  
    } catch (error) {
      console.error("❌ Claim failed:", error);
    }
  };
  
  return (
    <div>
      <section className="">
        {/* Banner Image */}
        <div className={`relative w-full bg-cover bg-center `}>
          <img
            src={Placeholder}
            alt="Profile banner"
            className="object-fit w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/70 to-amber-50/50 flex items-center justify-center" />

          <div className="absolute -bottom-15 left-6 md:left-12 border-4 border-white dark:border-gray-900 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrwMvUgClCnBNDMfiBcopM8BgT74epXtu0g&s"
              alt="Animakid profile picture"
              width={100}
              height={100}
              className="w-32 h-32 object-cover"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="container mx-auto px-6 pt-20 pb-12 ">
          <div className="">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 w-full ">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                {user?.name}
              </h1>
              <div className="flex items-center gap-4">
                <button
                  className="btn btn-outline  text-amber-600 flex items-center gap-2"
                  onClick={() => {
                    openModal("modal-QR");
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  <span>Scan Card</span>
                </button>
                <button className="btn bg-amber-400 hover:bg-amber-500 text-gray-900 flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mb-8">
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  250k+
                </p>
                <p className="text-gray-600 dark:text-gray-400">Card</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  50+
                </p>
                <p className="text-gray-600 dark:text-gray-400">Special Card</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Bio
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.bio
                  ? user?.bio
                  : "No bio available. Please update your profile."}
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Account Info
              </h2>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>
                  <MdEmail />
                </span>
                {user?.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>
                  <BsWhatsapp />
                </span>
                {user?.whatsapp ? user?.whatsapp : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="tabs tabs-border">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Card"
            defaultChecked
          />
          <div className="tab-content p-10">
            <CardList />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Special Card"
          />
          <div className="tab-content  p-10">Tab content 2</div>
        </div>
      </div>

      <Modal id="modal-QR">
        <div className="max-w-sm mx-auto">
          <QRScanner onResult={handleQRResult} />
        </div>
      </Modal>
    

      {/* 🎉 Animasi klaim berhasil */}
      {showReward && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="animate-fade-in-up scale-100 transition-all duration-500">
            <div className="relative bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-4 text-center border-[3px] border-yellow-500">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZvaTZjZnZ5eDE5NzdlbnQ1dzBkYzF5ZmxkZDRrcmx5ZjdwcnF2dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Z9Urb9SrxrxnKz3kmT/giphy.gif"
                alt="Card Unlocked"
                className="w-44 h-44 rounded-xl shadow-lg border-2 border-yellow-400"
              />
              <h2 className="text-3xl font-extrabold text-yellow-600 drop-shadow-md animate-pulse">
                🎉 Card Unlocked!
              </h2>
              <p className="text-gray-600 text-sm animate-fade-in">
                Selamat! Kartu berhasil diklaim ke akunmu.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
