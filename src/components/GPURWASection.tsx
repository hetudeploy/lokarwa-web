'use client';

import { useEffect, useState, useRef } from 'react';

export default function GPURWASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalTVL: 0,
    avgYield: 0
  });
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setNumbersVisible(true);
            setTimeout(() => animateNumber('totalTVL', 250), 200);
            setTimeout(() => animateNumber('avgYield', 7.8), 500);
          }, 600);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumber = (key: string, target: number) => {
    const duration = 1500;
    const start = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = target * easeOutQuart;

      setAnimatedNumbers(prev => ({
        ...prev,
        [key]: currentValue
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (num: number, suffix: string = '') => {
    if (num >= 1000) {
      return Math.floor(num) + 'K+';
    }

    if (num === Math.floor(num)) {
      return Math.floor(num).toString() + suffix;
    }
    return num.toFixed(1) + suffix;
  };

  return (
    <section ref={sectionRef} className={`w-full bg-white py-32 relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1600px] mx-auto px-8 max-md:px-4">

        <div className="grid grid-cols-12 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
          
          <div className={`col-span-5 max-md:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="relative"> 
              <div className="w-96 h-96 bg-[#F2F1EF] rounded-full flex items-center justify-center mx-auto relative overflow-visible">
                <div className="absolute inset-0 border-4 border-black rounded-full opacity-20"></div>
                <div className="absolute inset-8 border-4 border-black rounded-full opacity-10"></div>
                
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/5 to-transparent animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black/30 rounded-full animate-bounce"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-black/20 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-black/25 rounded-full animate-bounce delay-500"></div>
                
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 group hover:scale-110 transition-all duration-300">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <div className="text-white text-2xl font-bold">$</div>
                  </div>
                  <div className="text-center mt-3 whitespace-nowrap">
                    <div className="font-['42dot_Sans'] text-lg font-black">T-Bills</div>
                    <div className="font-['Commit_Mono'] text-xs text-[#666666] uppercase">Treasury</div>
                  </div>
                </div>
                

                <div className="absolute -bottom-4 -left-4 group hover:scale-110 transition-all duration-300">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <div className="text-white text-2xl">⚡</div>
                  </div>
                  <div className="text-center mt-3 whitespace-nowrap">
                    <div className="font-['42dot_Sans'] text-lg font-black">GPU</div>
                    <div className="font-['Commit_Mono'] text-xs text-[#666666] uppercase">Leases</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 group hover:scale-110 transition-all duration-300">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <div className="text-white text-2xl">⚡</div>
                  </div>
                  <div className="text-center mt-3 whitespace-nowrap">
                    <div className="font-['42dot_Sans'] text-lg font-black">Energy</div>
                    <div className="font-['Commit_Mono'] text-xs text-[#666666] uppercase">Contracts</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-black to-[#333] rounded-full flex items-center justify-center shadow-xl relative">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute w-32 h-0.5 bg-gradient-to-r from-black/30 to-transparent transform rotate-90 -translate-y-16 -translate-x-16"></div>
                    <div className="absolute w-32 h-0.5 bg-gradient-to-r from-black/30 to-transparent transform rotate-45 -translate-y-12 translate-x-12"></div>
                    <div className="absolute w-32 h-0.5 bg-gradient-to-r from-black/30 to-transparent transform -rotate-45 -translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute w-2 h-2 bg-black/40 rounded-full animate-ping -translate-y-16 -translate-x-16"></div>
                    <div className="absolute w-2 h-2 bg-black/40 rounded-full animate-ping delay-500 -translate-y-12 translate-x-12"></div>
                    <div className="absolute w-2 h-2 bg-black/40 rounded-full animate-ping delay-1000 -translate-y-12 -translate-x-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-span-7 max-md:col-span-1 transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <h1 className="font-['42dot_Sans'] text-6xl font-black text-black mb-8 leading-[0.9] max-md:text-4xl max-sm:text-3xl">
              <em>Tokenizing the Real Yield Infrastructure for AI</em>
            </h1>
            
            <p className="font-['42dot_Sans'] text-2xl text-[#666666] mb-12 leading-relaxed max-md:text-xl">
              From compute to T-Bills — <strong className="text-black font-bold">AI-driven valuation, transparent yield.</strong>
            </p>
            
            <div className="mb-12">
              <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide mb-6">Custodians & Partners</div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black border-[3px] border-black rounded-none py-[15px] px-[30px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[200px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5">
                  Temasek
                </button>
                <button className="bg-white text-black border-[3px] border-black rounded-none py-[15px] px-[30px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[200px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5">
                  Anchorage
                </button>
                <button className="bg-white text-black border-[3px] border-black rounded-none py-[15px] px-[30px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[200px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5">
                  Bybit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
              <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-2 max-md:text-4xl">
                  {numbersVisible ? `$${formatNumber(animatedNumbers.totalTVL)} M` : '$0 M'}
                </div>
                <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Total RWA TVL</div>
              </div>
              <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-2 max-md:text-4xl">
                  {numbersVisible ? `${formatNumber(animatedNumbers.avgYield)}%` : '0%'}
                </div>
                <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Avg Yield</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
