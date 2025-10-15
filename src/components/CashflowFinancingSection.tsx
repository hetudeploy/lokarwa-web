'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function CashflowFinancingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalFinanced: 0,
    aiCompanies: 0,
    avgTenor: 0,
    avgAPY: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setNumbersVisible(true);
            setTimeout(() => animateNumber('totalFinanced', 150), 200);
            setTimeout(() => animateNumber('aiCompanies', 1.2), 500);
            setTimeout(() => animateNumber('avgTenor', 30), 800);
            setTimeout(() => animateNumber('avgAPY', 12), 1100);
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
    <section ref={sectionRef} className={`w-full bg-[#F2F1EF] py-32 relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1600px] mx-auto px-8 max-md:px-4">
        
        <div className="grid grid-cols-2 max-md:grid-cols-1 h-[800px] max-md:h-auto">
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'} flex flex-col justify-center`}>
            <div className="bg-white border-[3px] border-black rounded-none p-8 shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center">
              <div className="text-center">
                <h1 className="font-['42dot_Sans'] text-5xl font-black text-black mb-8 leading-[0.9] max-md:text-4xl max-sm:text-3xl">
                  <em>Cashflow Financing for the Machine Economy</em>
                </h1>
                <p className="font-['42dot_Sans'] text-xl text-[#666666] leading-relaxed max-md:text-lg">
                  Turn AI revenues into liquid, tradable tokens — <strong className="text-black font-bold">fund growth before it happens.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col justify-center`}>
            <div className="bg-white border-[3px] border-black rounded-none p-8 shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                  <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-3 max-md:text-4xl">
                    {numbersVisible ? `$${formatNumber(animatedNumbers.totalFinanced)} M` : '$0 M'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Total Financed Value</div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                  <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-3 max-md:text-4xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.aiCompanies)} K+` : '0 K+'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide"># of AI Companies / Agents</div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                  <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-3 max-md:text-4xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.avgTenor)} days` : '0 days'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Avg Loan Tenor</div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                  <div className="font-['42dot_Sans'] text-5xl font-black text-black mb-3 max-md:text-4xl">
                    {numbersVisible ? `${formatNumber(animatedNumbers.avgAPY)}%` : '0%'}
                  </div>
                  <div className="font-['Commit_Mono'] text-sm text-[#666666] uppercase tracking-wide">Avg Investor APY</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'} flex flex-col justify-center`}>
            <div className="bg-white border-[3px] border-black rounded-none p-4 shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <Image 
                  src="/home/loka_desktop.png" 
                  alt="LOKA Desktop Platform" 
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col justify-center`}>
            <div className="bg-white border-[3px] border-black rounded-none p-8 shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className="font-['42dot_Sans'] text-3xl font-black text-black mb-6 leading-tight max-md:text-2xl">
                  Raise your hand to earn real allocation or high yield!
                </h2>
                <p className="font-['42dot_Sans'] text-lg text-[#666666] mb-8 max-md:text-base">
                  Which hand will you raise? Coming with launch.
                </p>
                <button className="bg-white text-black border-[3px] border-black rounded-none py-[15px] px-[30px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[200px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5 mx-auto">
                  Get Allo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
