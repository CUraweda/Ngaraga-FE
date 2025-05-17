import React from "react";
import { IoRocket } from "react-icons/io5";
import TiltedCard from "../ui/TiledCard";
import SplashCursor from "../ui/SplashScreen";
import BlurText from "../ui/BlurText";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div className="">
      <div className="bg-white min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-12 lg:gap-16 md:grid-cols-2 items-center bg-white py-10 w-5/6 mx-auto">

        <div className="space-y-10 md:pr-8">
          <div className="space-y-6">
            <BlurText
              text="Isn't this so cool?!"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-6xl font-bold mb-8"
            />
            <BlurText
              text="Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
              amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum
              dolor"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-xl mb-8"
            />
           
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              
            </p>
          </div>

          <button className="btn btn-primary mt-10">
            <IoRocket className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span className="font-semibold">Get Started</span>
          </button>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                240k+
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Cards
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                100k+
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Collectors
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                240k+
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Category
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex justify-center items-center">
          <TiltedCard
            imageSrc="https://card25th.portal-pokemon.com/assets/img/promo/id/1.png"
            altText="Kendrick Lamar - GNX Album Cover"
            captionText="Kendrick Lamar - GNX"
            containerWidth="500px"
            imageWidth="500px"
            rotateAmplitude={20}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
            showSpecialBadge={true}
            overlayContent={<div></div>}
          />
        </div>
      </div>
      </div>
     
      <SplashCursor />
    </div>
  );
};

export default Hero;
