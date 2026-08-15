import React, { useEffect, useRef, useState } from "react";

export interface TimelineItemProps {
  year: number;
  title: string;
  text: string;
  isLeft: boolean;
  isCentered?: boolean;
  children: React.ReactNode;
}

export const StorylineItem = ({ year, title, text, isLeft, isCentered = false, children }: TimelineItemProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible((prev) => {
        if (!prev && entry.intersectionRatio > 0.15) return true;
        if (prev && entry.intersectionRatio < 0.02) return false;
        return prev;
      });
    },
    {
      threshold: [0, 0.02, 0.15, 1],
      rootMargin: "0px",
    }
  );

  const el = elementRef.current;
  if (el) observer.observe(el);
  return () => { if (el) observer.unobserve(el); };
}, []);
  return (
    <div
      ref={elementRef}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-20 lg:mb-28 last:mb-0 transition-all duration-700 ease-out transform ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-12 scale-[0.97]"
      }`}
    >
      {!isCentered && (
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
          <div className={`w-5.5 h-5.5 rounded-full border border-accent/40 bg-surface flex items-center justify-center transition-all duration-500 ${
            isVisible ? "border-accent bg-accent scale-110 glow-green-sm" : ""
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-accent/40 transition-all duration-500 ${
              isVisible ? "bg-bg-main" : ""
            }`} />
          </div>
        </div>
      )}

      {isCentered ? (
        <div className="col-span-1 md:col-span-2 max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-5">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xl lg:text-4xl text-accent font-bold tracking-widest">{year}</span>
            <h3 className="font-sans font-bold text-3xl md:text-4xl xl:text-[56px] text-text-main">{title}</h3>
          </div>
          <p className="font-sans text-sm lg:text-xl text-text-secondary leading-relaxed max-w-6xl">
            {text}
          </p>
          <div className="w-full mt-2 transition-all duration-300 hover:scale-[1.01] hover:glow-green">
            {children}
          </div>
        </div>
      ) : isLeft ? (
        <>
          <div className="flex flex-col items-center md:items-end space-y-3 text-center md:text-right md:pr-16 order-1">
            <span className="font-mono text-xl lg:text-3xl text-accent font-bold tracking-widest">{year}</span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl xl:text-[44px] text-text-main">{title}</h3>
            <p className="font-sans text-sm lg:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto md:ml-auto whitespace-pre-line">
              {text}
            </p>
          </div>
          <div className="order-2 md:pl-16 transition-all duration-300 hover:scale-[1.01] w-full">
            {children}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left md:pl-16 order-1 md:order-2">
            <span className="font-mono text-xl lg:text-3xl text-accent font-bold tracking-widest">{year}</span>
            <h3 className="font-sans font-bold text-2xl md:text-3xl xl:text-[44px] text-text-main">{title}</h3>
            <p className="font-sans text-sm lg:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto md:mr-auto whitespace-pre-line">
              {text}
            </p>
          </div>
          <div className="order-2 md:order-1 md:pr-16 transition-all duration-300 hover:scale-[1.01] w-full">
            {children}
          </div>
        </>
      )}

    </div>
  );
}
