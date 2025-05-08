import React from "react";

const CardTrending = () => {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-square">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nBcQ47aoUYYAX6K2njy1ESReV2oUqf.png"
            alt="DSGN Animals - Colorful dog with glasses"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            DSGN Animals
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              M
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              MrFOx
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTrending;
