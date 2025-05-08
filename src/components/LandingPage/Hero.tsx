import React from "react";
import { IoRocket } from "react-icons/io5";

const Hero = () => {
  return (
    <div className=" pt-20">
      <div className="grid grid-cols-1 gap-12 lg:gap-16 md:grid-cols-2 items-center">
        {/* Left Column */}
        <div className="space-y-10 md:pr-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Lorem Ipsum dolor{" "}
              <span className="text-gray-800 dark:text-gray-200">
                amet zdzf
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
              amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum
              dolor
            </p>
          </div>

          <button className="btn bg-amber-400 hover:bg-amber-500 text-gray-900 mt-10">
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
        <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 bg-white dark:bg-gray-800">
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nBcQ47aoUYYAX6K2njy1ESReV2oUqf.png"
              alt="Space Walking - Astronaut looking at planet"
              width={600}
              height={400}
              className="w-full h-[350px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Space Walking
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                A
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Animakid
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
