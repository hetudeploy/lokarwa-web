'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function InstitutionalStrategySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`w-full bg-[#F2F1EF] py-32 relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1600px] mx-auto px-8 max-md:px-4">
        <div className={`bg-white border-[3px] border-black rounded-none shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>      
          <div className="grid grid-cols-12 h-[700px] max-md:h-auto">
            <div className="col-span-6 max-md:col-span-12 p-16 max-md:p-8 flex flex-col justify-center">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
                <h1 className="font-['42dot_Sans'] text-7xl font-black text-black mb-10 leading-[0.85] max-md:text-6xl max-sm:text-5xl">
                  <em>Compliance & Institutional Onboarding</em>
                </h1>
                <p className="font-['42dot_Sans'] text-2xl text-[#666666] leading-relaxed max-md:text-xl">
                  Licensed custodians, monthly reserve attestations, banking integrations, and partnerships with private credit funds & FoFs.
                </p>
              </div>
            </div>
            <div className="col-span-6 max-md:col-span-12 relative bg-[#F5F5DC] flex items-center justify-start overflow-hidden">
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>             
                <div className="space-y-6 pl-12 pr-20 max-md:pl-8 max-md:pr-16">
                  <div className="bg-[#D2B48C] text-white px-8 py-5 rounded-full font-['Commit_Mono'] text-base font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                    Licensed custodians (Temasek, Fireblocks, Anchorage)
                  </div>
                  <div className="bg-[#D2B48C] text-white px-8 py-5 rounded-full font-['Commit_Mono'] text-base font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                    Monthly reserve attestations (Big-4 or regulated custodian)
                  </div>
                  <div className="bg-[#D2B48C] text-white px-8 py-5 rounded-full font-['Commit_Mono'] text-base font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                    Banking integrations (SG / HK / UAE)
                  </div>
                  <div className="bg-[#D2B48C] text-white px-8 py-5 rounded-full font-['Commit_Mono'] text-base font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center">
                    Partnerships with private credit funds & FoFs
                  </div>
                </div>


                <div className="absolute -right-40 top-1/2 transform -translate-y-1/2 w-96 h-96 max-md:w-80 max-md:h-80">
                  <div className="w-full h-full bg-[#F5DEB3] rounded-full relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center">
                      <Image 
                        src="/home/favicon.png" 
                        alt="LOKA Icon" 
                        width={128}
                        height={128}
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
