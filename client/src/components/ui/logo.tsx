import { Plane } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Logo() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount (page load)
    const timer = setTimeout(() => {
      setIsAnimating(true);
      // Reset animation after it completes
      setTimeout(() => setIsAnimating(false), 3000);
    }, 500); // Small delay before starting

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Add the keyframes to the document head */}
      {typeof window !== 'undefined' && (
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fly-around {
              0% {
                transform: rotate(50deg) translateX(0px) translateY(0px) scaleX(1);
              }
              25% {
                transform: rotate(0deg) translateX(130px) translateY(-5px) scaleX(1);
              }
              50% {
                transform: rotate(-20deg) translateX(0px) translateY(-10px) scaleX(-1);
              }
              75% {
                transform: rotate(25deg) translateX(0px) translateY(0px) scaleX(-1);
              }
              100% {
                transform: rotate(140deg) translateX(0px) translateY(0px) scaleX(-1);
              }
            }
            
            .animate-fly-around {
              animation: fly-around 3s ease-in-out;
              z-index: 10;
              position: relative;
            }
          `
        }} />
      )}
      
      <div className="flex items-center gap-2 relative" style={{ width: '250px', height: '60px' }}>
        <Plane 
          className={`h-6 w-6 text-primary transition-all duration-300 ${
            isAnimating 
              ? 'animate-fly-around' 
              : 'rotate-45'
          }`}
        />
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
          Wandrivo
        </span>
      </div>
    </>
  );
}
