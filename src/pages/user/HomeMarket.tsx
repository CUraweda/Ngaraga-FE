import TiltedCard from "@/components/ui/TiledCard";
import React from "react";
import { BiCartAdd } from "react-icons/bi";

const HomeMarket = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-10 px-5 mx-auto mt-10">
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
            <select defaultValue="Pick a browser" className="select">
              <option disabled={true}>Filter</option>
              <option>Chrome</option>
              <option>FireFox</option>
              <option>Safari</option>
            </select>
          </fieldset>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-2  mx-auto mt-10">

        <TiltedCard
          imageSrc="https://card25th.portal-pokemon.com/assets/img/promo/id/1.png"
          altText="Kendrick Lamar - GNX Album Cover"
          captionText="Kendrick Lamar - GNX"
          containerWidth="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="flex items-center justify-between h-full px-4 w-full">
              <div className="flex flex-col text-white">
                <h3 className="font-bold">Kendrick Lamar - GNX</h3>
                <p className="text-sm">Price: </p>
              <span className="font-medium ">0.5 ETH</span>
              </div>
              <button className="btn  btn-sm btn-ghost bg-amber-400 hover:bg-amber-500 text-gray-900 mt-10">
                <BiCartAdd />
              </button>
            </div>
          }
        />
       
      </div>
    </div>
  );
};

export default HomeMarket;
