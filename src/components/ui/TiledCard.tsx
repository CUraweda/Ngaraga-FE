import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export interface TiltedCardHandle {
  getImage: () => HTMLImageElement | null;
}

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  showSpecialBadge?: boolean;
  onClick?: () => void;
  onAddToCart?: (imageElem: HTMLImageElement) => void;
}

const TiltedCard = forwardRef<TiltedCardHandle, TiltedCardProps>(
  ({
    imageSrc,
    altText = "card ngaraga",
    captionText = "",
    containerWidth = "100%",
    showSpecialBadge = false,
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = true,
    onClick,

  }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
      stiffness: 350,
      damping: 30,
      mass: 1,
    });

    const [lastY, setLastY] = useState(0);

    useImperativeHandle(ref, () => ({
      getImage: () => imgRef.current,
    }));

    function handleMouse(e: MouseEvent<HTMLDivElement>) {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

      rotateX.set(rotationX);
      rotateY.set(rotationY);

      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);

      const velocityY = offsetY - lastY;
      rotateFigcaption.set(-velocityY * 0.6);
      setLastY(offsetY);
    }

    function handleMouseEnter() {
      scale.set(scaleOnHover);
      opacity.set(1);
    }

    function handleMouseLeave() {
      opacity.set(0);
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
      rotateFigcaption.set(0);
    }

    return (
      <figure
        ref={containerRef}
        className="relative w-full h-full [perspective:1000px] flex flex-col items-center justify-center hover:z-10  cursor-pointer"
        style={{
          width: "100%",
          maxWidth: containerWidth,
          aspectRatio: "3 / 4",
        }}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showMobileWarning && (
          <div className="absolute top-4 text-center text-sm block sm:hidden">
            This effect is not optimized for mobile. Check on desktop.
          </div>
        )}

        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d]"
          style={{ rotateX, rotateY, scale }}
        >
          {showSpecialBadge && (
            <div className="absolute top-13 -right-5 z-30 p-2">
              <div className="bg-yellow-400 text-white font-bold text-xs p-1 text-center w-[100px] rotate-45 origin-top-right shadow-lg rounded-md">
                <div className="absolute inset-0 overflow-hidden rounded-[15px] pointer-events-none z-20">
                  <div className="absolute top-0 left-[-75%] w-[20%] h-full bg-yellow-400 blur-[2px] animate-[glossy-shine_1s_linear_infinite]" />
                </div>
                <p className="text-xl border-2 border-white border-dashed rounded-md">
                  SPECIAL
                </p>
              </div>
            </div>
          )}

          {showSpecialBadge && (
            <div className="absolute inset-0 overflow-hidden rounded-[15px] pointer-events-none z-20">
              <div className="absolute top-0 left-[-75%] w-[30%] h-full bg-white/20 blur-[2px] skew-x-[-20deg] animate-[glossy-shine_2.5s_linear_infinite]" />
            </div>
          )}

          <motion.img
            ref={imgRef}
            src={imageSrc}
            alt={altText}
            onClick={onClick}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px] will-change-transform [transform:translateZ(0)] hover:shadow-2xl"
          />

          {displayOverlayContent && overlayContent && (
            <motion.div className="absolute bottom-0 right-0 z-[2] py-5 will-change-transform [transform:translateZ(30px)] rounded-xl bg-linear-to-t from-white to-white/20 w-full">
              {overlayContent}
            </motion.div>
          )}
        </motion.div>

        {showTooltip && (
          <motion.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
            style={{ x, y, opacity, rotate: rotateFigcaption }}
          >
            {captionText}
          </motion.figcaption>
        )}
      </figure>
    );
  }
);

export default TiltedCard;
