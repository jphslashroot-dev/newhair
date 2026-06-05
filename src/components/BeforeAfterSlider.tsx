import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  key?: number | string;
  title: string;
  duration: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
}

export default function BeforeAfterSlider({
  title,
  duration,
  description,
  beforeUrl,
  afterUrl,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0-100)
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleMouseUp = () => stopDragging();
    const handleTouchEnd = () => stopDragging();

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const startDragging = (clientX: number) => {
    isDragging.current = true;
    handleMove(clientX);
  };

  return (
    <div className="bg-editorial-bg rounded-none p-8 border border-editorial-dark/10 max-w-4xl mx-auto my-8 animate-fade-in shadow-sm">
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-serif text-2.5xl font-normal text-editorial-charcoal">{title}</h3>
          <span className="px-3.5 py-1.5 bg-editorial-light border border-editorial-dark/10 text-editorial-accent font-sans text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            RITUEL : {duration}
          </span>
        </div>
        <p className="text-editorial-muted text-[13.5px] mt-3 leading-relaxed font-light">{description}</p>
      </div>

      {/* Slider Visual Container */}
      <div
        ref={containerRef}
        className="relative h-[380px] sm:h-[450px] w-full rounded-none overflow-hidden select-none cursor-ew-resize border border-editorial-dark/10"
        onMouseDown={(e) => startDragging(e.clientX)}
        onTouchStart={(e) => startDragging(e.touches[0].clientX)}
      >
        {/* Before Image (underneath, fully visible) */}
        <img
          src={beforeUrl}
          alt="Avant prestation la coiffeuse"
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-editorial-charcoal/80 backdrop-blur-md text-white rounded-none text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 shadow-sm">
          Avant
        </div>

        {/* After Image (overlay, clipped) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={afterUrl}
            alt="Après prestation de la coiffeuse"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-editorial-accent/90 backdrop-blur-md text-white rounded-none text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 shadow-sm">
            Après
          </div>
        </div>

        {/* Separating Line & Drag Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-editorial-accent cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="before-after-handle -ml-4 w-8 h-8 rounded-none bg-editorial-charcoal text-editorial-accent hover:text-white hover:bg-editorial-accent border border-editorial-accent/30 flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-md">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Subtle sliding instruction overlay overlay helper */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-editorial-charcoal/85 backdrop-blur-sm px-4 py-2 border border-editorial-accent/20 rounded-none text-[10px] tracking-[0.1em] uppercase font-bold text-white shadow-sm flex items-center gap-2 pointer-events-none">
          <span>Glisser pour comparer</span>
        </div>
      </div>
    </div>
  );
}
