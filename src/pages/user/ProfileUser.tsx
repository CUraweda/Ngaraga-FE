import {  QrCode } from "lucide-react";

import Placeholder from "@/assets/Image PlaceHolder.png";
import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import QRScanner from "@/components/ui/QRCodeReader";
import userStore from "@/store/user.store";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import CardList from "@/components/userCard/cardList";
import CardStore from "@/store/card.store";
import CardListStore from "@/store/cardList.store";
import CardSpecialStore from "@/store/cardSpecial";
import { useEffect, useState } from "react";
import TiltedCard from "@/components/ui/TiledCard";
import { ConfettiFireworks } from "@/components/magicui/confetti";
import SpecialCard from "@/components/userCard/specialCard";
import { useSearchParams } from "react-router-dom";
import { listedParam } from "@/constant/listed.param";
import { useNavigate } from "react-router-dom";
import EditProfile from "@/components/EditProfile";
import { FaGear } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";

const ProfileUser = () => {
  const navigate = useNavigate();
  const { user, getUser, updateProfile } = userStore();
  const { getOneCard, cardItem } = CardStore();
  const { resetClaimed: resetClaimedSpecial } = CardSpecialStore();
  const { claimNormalCard, cardListItem, resetClaimed, isClaimed , loading } =
    CardListStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchParams] = useSearchParams();
  const [dataCard, setDataCard] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const id = searchParams.get("card") ?? "";
  const type = searchParams.get("type") ?? "";

  const handleQRResult = async (value: string) => {
    closeModal("modal-QR");
    await claimNormalCard(value)
  };

  const fetchData = async () => {
    await getOneCard(id);
  };

  useEffect(() => {
    if (id && type === "special") {
      fetchData();
      openModal("modal-Reward");
      setShowConfetti(true);
      setDataCard(cardItem);
    }
  }, [id]);

  useEffect(() => {
    if (loading) {

      openModal("modal-loading");
      return;
    } else {
      closeModal("modal-loading");
      if (cardListItem && isClaimed) {
        setDataCard(cardListItem);
        openModal("modal-Reward");
        setShowConfetti(true);
      }
    }
  }, [cardListItem, isClaimed, loading]);

  const handleClaimCard = async () => {
    closeModal("modal-Reward");
    getUser();
    resetClaimed();
    resetClaimedSpecial();
    navigate(listedParam.profile);
  };

  const handleUpdateProfile = async () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    try {
      await updateProfile(user?.id ?? "", formData);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpdateProfile();
    }
  }, [selectedFile]);

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

          <div className="absolute -bottom-15 left-6 md:left-12">
            <div className="relative group w-32 h-32 border-4 border-white dark:border-gray-900 rounded-xl overflow-hidden shadow-lg">
              <img
                src={
                  user?.profilePic
                    ? `${
                        import.meta.env.VITE_REACT_API_URL
                      }/api/download?path=${user?.profilePic}`
                    : "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

              {/* 🖊️ Overlay Edit */}
              <label
                htmlFor="upload-profile"
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A4 4 0 019 17H5v-4a4 4 0 014-4z"
                  />
                </svg>
              </label>

              <input
                type="file"
                id="upload-profile"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file); // ✅ simpan ke state
                  }
                }}
              />
            </div>
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
                <button
                  className="btn btn-circle bg-amber-400 hover:bg-amber-500 text-gray-900 flex items-center gap-2"
                  onClick={() => {
                    openModal("modal-EditProfile");
                  }}
                >
                  <FaGear />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mb-8">
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {user?._count?.cardLists}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Card</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {user?._count?.cardSpecialUsers}
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

      <div className="container mx-auto px-6 bg-white p-5 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Card Collection
        </h1>
        <div className="flex items-center justify-center h-full">
          <div className="tabs tabs-lift w-full">
            <input
              type="radio"
              name="my_tabs_3"
              className="tab"
              aria-label="Cards"
              defaultChecked
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <CardList />
            </div>

            <input
              type="radio"
              name="my_tabs_3"
              className="tab"
              aria-label="Special Cards"
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <SpecialCard />
            </div>
          </div>
        </div>
      </div>

      <Modal id="modal-QR">
        <div className="max-w-sm mx-auto">
          <QRScanner onResult={handleQRResult} />
        </div>
      </Modal>

      <Modal id="modal-EditProfile">
        <div className="">
          <EditProfile />
        </div>
      </Modal>

      <dialog id="modal-Reward" className="modal">
        <div className="w-full relative h-screen flex items-center justify-center">
          <div className="w-full flex justify-center">
            <TiltedCard
              imageSrc={`${
                import.meta.env.VITE_REACT_API_URL
              }/api/download?path=${dataCard?.image}`}
              altText={dataCard?.name || "Card Image"}
              captionText={"Click to Claim"}
              containerWidth="500px"
              imageWidth="500px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
              showSpecialBadge={dataCard?.isSpecial}
              onClick={() => {
                handleClaimCard();
              }}
              overlayContent={
                <div className="flex items-center justify-between h-full px-4 w-full"></div>
              }
            />
            <ConfettiFireworks trigger={showConfetti} durationMs={6000} />
          </div>
        </div>
      </dialog>
      <dialog id="modal-loading" className="modal">
        <div className="w-full relative h-screen flex items-center justify-center gap-2 text-white font-bold ">
              <span className="animate-spin"><VscLoading /></span>
              <span>Loading...</span>
          </div>
      </dialog>
    </div>
  );
};

export default ProfileUser;
