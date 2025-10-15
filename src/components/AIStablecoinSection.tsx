'use client';

import { useEffect, useState, useRef } from 'react';

export default function AIStablecoinSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalSupply: 0,
    reserveCoverage: 0,
    averageAPY: 0,
    holders: 0
  });
  const sectionRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setNumbersVisible(true);

            setTimeout(() => animateNumber('totalSupply', 850), 200);
            setTimeout(() => animateNumber('reserveCoverage', 101.5), 500);
            setTimeout(() => animateNumber('averageAPY', 5.2), 800);
            setTimeout(() => animateNumber('holders', 12), 1100);
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
    <section ref={sectionRef} className={`w-full bg-[#F2F1EF] relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{minHeight: '100vh'}}>

      <div className="absolute top-20 right-20 w-64 h-64 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-black/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="max-w-[1600px] mx-auto px-8 max-md:px-4 relative z-10">
        <div className="grid grid-cols-12 gap-20 items-start max-md:grid-cols-1 max-md:gap-12">
          
          <div className={`col-span-7 max-md:col-span-1 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'} sticky top-20 max-md:sticky max-md:top-4 h-fit`}>
            <div className="py-32 max-md:py-16">
              <h1 className="font-['42dot_Sans'] text-6xl font-black text-black mb-8 leading-[0.9] max-md:text-5xl max-sm:text-4xl">
                <span className="block">AIUSD— The AI-Native Stablecoin</span>
              </h1>
              <p className="font-['42dot_Sans'] text-xl text-[#666666] leading-relaxed max-md:text-lg max-w-2xl">
                Powering the AI-Native Economy with <strong className="text-black font-bold">Real-Yield, Real-World Collateral, and Real Cashflows.</strong>
              </p>
              

              <div className="mt-8 w-16 h-1 bg-black/20 rounded-full"></div>
            </div>
          </div>


          <div className={`col-span-5 max-md:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="py-32 max-md:py-16">
              <div className="space-y-24 max-md:space-y-16">
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="font-['42dot_Sans'] text-6xl font-black text-black leading-none mb-3 max-md:text-5xl">
                    {numbersVisible ? `$${formatNumber(animatedNumbers.totalSupply)} M` : '$0 M'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Total Supply</div>
                </div>
                
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="font-['42dot_Sans'] text-6xl font-black text-black leading-none mb-3 max-md:text-5xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.reserveCoverage)}%` : '0%'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Reserve Coverage Ratio</div>
                </div>
                
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="font-['42dot_Sans'] text-6xl font-black text-black leading-none mb-3 max-md:text-5xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.averageAPY)}%` : '0%'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Average APY (RWA Yield)</div>
                </div>
                
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="font-['42dot_Sans'] text-6xl font-black text-black leading-none mb-3 max-md:text-5xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.holders)} K+` : '0 K+'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Holders / Agents Integrated</div>
                </div>


                <div className="h-16 max-md:h-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
