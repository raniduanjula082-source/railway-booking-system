import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onBookNowClick: () => void;
  onExploreRoutesClick: () => void;
}

export function Hero({ onBookNowClick, onExploreRoutesClick }: HeroProps) {
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMHRyYWlufGVufDF8fHx8MTc2NzYxMzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Sri Lanka Railway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          {...({
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 }
          } as any)}
          className="text-white max-w-2xl"
        >
          <motion.h1
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.8 }
            } as any)}
            className="text-5xl md:text-6xl mb-6"
          >
            Explore the Pearl of the Indian Ocean
          </motion.h1>
          <motion.p
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4, duration: 0.8 }
            } as any)}
            className="text-xl mb-8 text-gray-100"
          >
            Experience the scenic beauty of Sri Lanka by rail. From misty mountains to coastal
            paradise, book your journey through the island's most breathtaking landscapes.
          </motion.p>
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6, duration: 0.8 }
            } as any)}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onBookNowClick}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Book Your Journey
            </button>
            <button
              onClick={onExploreRoutesClick}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Explore Routes
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.8, duration: 0.8 }
            } as any)}
            className="mt-12 grid grid-cols-3 gap-8"
          >
            <div>
              <div className="text-3xl mb-1">200+</div>
              <div className="text-sm text-gray-200">Daily Trains</div>
            </div>
            <div>
              <div className="text-3xl mb-1">1500km</div>
              <div className="text-sm text-gray-200">Railway Network</div>
            </div>
            <div>
              <div className="text-3xl mb-1">24/7</div>
              <div className="text-sm text-gray-200">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}