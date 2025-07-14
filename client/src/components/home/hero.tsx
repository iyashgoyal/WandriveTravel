import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/6894549/6894549-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        {/* Fallback for unsupported browsers */}
        Your browser does not support the video tag.
      </video>

      {/* Enhanced Tinted Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Discover Your Next Adventure
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">
            with Wandrivo
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          From pristine beaches to majestic mountains, experience unforgettable journeys 
          to India's most breathtaking destinations and beyond
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => setLocation("/packages")}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Explore Packages
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/about")}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-lg px-8 py-4 rounded-full backdrop-blur-sm"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </div>
  );
}