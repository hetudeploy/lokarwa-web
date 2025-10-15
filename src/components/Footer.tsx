'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleWhitelistClick = (e: Event) => {
      e.preventDefault();
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSeHJwtpYN0hGYc060Ji954h52dtVATaO7iUNMoFyof5dKLfSQ/viewform?usp=dialog', '_blank');
    };

    const whitelistLink = footerRef.current?.querySelector('.whitelist-link');
    if (whitelistLink) {
      whitelistLink.addEventListener('click', handleWhitelistClick);
    }

    return () => {
      if (whitelistLink) {
        whitelistLink.removeEventListener('click', handleWhitelistClick);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-[#F2F1EF] py-16 overflow-hidden font-['42dot_Sans']">
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-t-[#F2F1EF] border-r-[100px] border-r-transparent z-10 max-lg:border-t-[60px] max-lg:border-r-[80px] max-md:border-t-[50px] max-md:border-r-[60px] max-sm:border-t-[40px] max-sm:border-r-[40px] max-[360px]:border-t-[35px] max-[360px]:border-r-[35px] max-[320px]:border-t-[30px] max-[320px]:border-r-[30px]"></div>
        
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-[#F2F1EF] border-l-[100px] border-l-transparent z-10 max-lg:border-t-[60px] max-lg:border-l-[80px] max-md:border-t-[50px] max-md:border-l-[60px] max-sm:border-t-[40px] max-sm:border-l-[40px] max-[360px]:border-t-[35px] max-[360px]:border-l-[35px] max-[320px]:border-t-[30px] max-[320px]:border-l-[30px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 max-md:px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-md:gap-8 mb-12 max-md:mb-8">
          
          <div className="lg:col-span-1 max-md:text-center">
            <Image 
              src="/home/footerlogo.svg" 
              alt="LOKA Network Logo" 
              width={230}
              height={86}
              className="w-[230px] h-[86px] max-md:w-[180px] max-md:h-[67px] max-sm:w-[150px] max-sm:h-[56px] max-[360px]:w-[130px] max-[360px]:h-[49px] max-[320px]:w-[110px] max-[320px]:h-[41px] object-contain mb-6 max-md:mx-auto"
            />
            <p className="font-['Commit_Mono'] text-sm font-bold text-[#F2F1EF] max-sm:text-xs max-[360px]:text-[10px] max-w-[400px] max-md:mx-auto">
              The World&apos;s High-Performance Web3 Financial Infrastructure
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 max-md:gap-6">
            
            <div className="max-md:text-center">
              <h4 className="font-['42dot_Sans'] text-xl font-bold text-[#F2F1EF] mb-6 max-md:text-lg max-sm:text-base max-[360px]:text-[15px] max-[320px]:text-[14px]">
                About
              </h4>
              <ul className="space-y-3 max-sm:space-y-2">
                <li>
                  <a 
                    href="https://github.com/loka-network" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-['Commit_Mono'] text-sm font-bold text-[#F2F1EF] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a 
                    href="#solution" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Solution
                  </a>
                </li>
                <li>
                  <a 
                    href="#performance" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Performance
                  </a>
                </li>
              </ul>
            </div>

            <div className="max-md:text-center">
              <h4 className="font-['42dot_Sans'] text-xl font-bold text-[#F2F1EF] mb-6 max-md:text-lg max-sm:text-base max-[360px]:text-[15px] max-[320px]:text-[14px]">
                Resources
              </h4>
              <ul className="space-y-3 max-sm:space-y-2">
                <li>
                  <a 
                    href="#research" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>

            <div className="max-md:text-center">
              <h4 className="font-['42dot_Sans'] text-xl font-bold text-[#F2F1EF] mb-6 max-md:text-lg max-sm:text-base max-[360px]:text-[15px] max-[320px]:text-[14px]">
                Contact
              </h4>
              <ul className="space-y-3 max-sm:space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="whitelist-link font-['Commit_Mono'] text-sm font-bold text-[#F2F1EF] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px] cursor-pointer"
                  >
                    Join Whitelist
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="font-['Commit_Mono'] text-sm text-[#999999] hover:text-[#E8E7E5] transition-colors duration-300 max-sm:text-xs max-[360px]:text-[11px] max-[320px]:text-[10px]"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
