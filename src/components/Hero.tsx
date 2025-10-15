'use client';

// import { useEffect } from 'react';
import GlobeEffect from './GlobeEffect';

export default function Hero() {

  const handleGetStarted = () => {
    window.open('https://github.com/loka-network', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-black relative overflow-hidden mb-20 max-md:mb-10 max-md:min-h-0 max-md:pt-5">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-[#F2F1EF]" />

      <div className="w-full max-w-[1400px] mx-auto px-8 py-12 flex flex-row items-stretch relative z-[1] min-h-[80vh] max-md:flex-col max-md:min-h-0 max-md:gap-0 max-md:px-4 max-md:py-8 max-sm:px-3">
        <div className="flex-[0_0_40%] flex flex-col justify-start items-end px-12 pt-24 pb-8 bg-[rgba(242,241,239,0.95)] backdrop-blur-[10px] min-w-0 text-right max-md:flex-none max-md:px-4 max-md:pt-16 max-md:pb-6 max-md:border-r-0 max-md:border-b max-md:border-b-black/10 max-md:items-center max-md:text-center">
          <div className="mb-6 text-right max-md:text-center max-md:mb-4">
            <h1 className="font-['42dot_Sans'] text-2xl font-extrabold m-0 mb-2 leading-tight text-black max-md:text-[28px] max-sm:text-2xl max-[360px]:text-xl">
              LOKA: The AI-Native Finance Layer
            </h1>
            <p className="font-['Commit_Mono'] text-lg leading-relaxed text-black text-right font-normal m-0 max-md:text-base max-md:text-center max-sm:text-sm max-[360px]:text-[13px]">
              <strong className="font-bold text-black">AI + RWA + Stablecoin + Cashflow Financing</strong>
            </p>
          </div>

          <div className="flex flex-col gap-3 my-6 mb-8 items-end max-md:gap-2 max-md:my-4 max-md:mb-6 max-md:items-center max-sm:gap-3 max-sm:my-4 max-sm:mb-6 max-[360px]:gap-2 max-[360px]:my-3 max-[360px]:mb-5">
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-right w-full max-w-[500px] max-md:max-w-full max-sm:gap-3 max-sm:grid-cols-[100px_1fr] max-[360px]:gap-2 max-[360px]:grid-cols-[80px_1fr]">
              <span className="font-['42dot_Sans'] text-[2rem] font-black text-black leading-none text-right whitespace-nowrap max-md:text-[1.75rem] max-sm:text-2xl max-[360px]:text-xl">4-8%</span>
              <span className="font-['Commit_Mono'] text-[0.85rem] text-[#666666] font-medium tracking-wide text-left leading-snug uppercase max-md:text-[0.8rem] max-sm:text-xs max-[360px]:text-[0.7rem]">YIELD</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-right w-full max-w-[500px] max-md:max-w-full max-sm:gap-3 max-sm:grid-cols-[100px_1fr] max-[360px]:gap-2 max-[360px]:grid-cols-[80px_1fr]">
              <span className="font-['42dot_Sans'] text-[2rem] font-black text-black leading-none text-right whitespace-nowrap max-md:text-[1.75rem] max-sm:text-2xl max-[360px]:text-xl">$300M</span>
              <span className="font-['Commit_Mono'] text-[0.85rem] text-[#666666] font-medium tracking-wide text-left leading-snug uppercase max-md:text-[0.8rem] max-sm:text-xs max-[360px]:text-[0.7rem]">TVL</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-right w-full max-w-[500px] max-md:max-w-full max-sm:gap-3 max-sm:grid-cols-[100px_1fr] max-[360px]:gap-2 max-[360px]:grid-cols-[80px_1fr]">
              <span className="font-['42dot_Sans'] text-[2rem] font-black text-black leading-none text-right whitespace-nowrap max-md:text-[1.75rem] max-sm:text-2xl max-[360px]:text-xl">300K</span>
              <span className="font-['Commit_Mono'] text-[0.85rem] text-[#666666] font-medium tracking-wide text-left leading-snug uppercase max-md:text-[0.8rem] max-sm:text-xs max-[360px]:text-[0.7rem]">TPS</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-right w-full max-w-[500px] max-md:max-w-full max-sm:gap-3 max-sm:grid-cols-[100px_1fr] max-[360px]:gap-2 max-[360px]:grid-cols-[80px_1fr]">
              <span className="font-['42dot_Sans'] text-[2rem] font-black text-black leading-none text-right whitespace-nowrap max-md:text-[1.75rem] max-sm:text-2xl max-[360px]:text-xl">1,200+</span>
              <span className="font-['Commit_Mono'] text-[0.85rem] text-[#666666] font-medium tracking-wide text-left leading-snug uppercase max-md:text-[0.8rem] max-sm:text-xs max-[360px]:text-[0.7rem]">AI AGENTS</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-right w-full max-w-[500px] max-md:max-w-full max-sm:gap-3 max-sm:grid-cols-[100px_1fr] max-[360px]:gap-2 max-[360px]:grid-cols-[80px_1fr]">
              <span className="font-['42dot_Sans'] text-[2rem] font-black text-black leading-none text-right whitespace-nowrap max-md:text-[1.75rem] max-sm:text-2xl max-[360px]:text-xl">0.05%</span>
              <span className="font-['Commit_Mono'] text-[0.85rem] text-[#666666] font-medium tracking-wide text-left leading-snug uppercase max-md:text-[0.8rem] max-sm:text-xs max-[360px]:text-[0.7rem]">FEE</span>
            </div>
          </div>

          <div className="flex justify-end mt-4 max-md:justify-center">
            <div 
              className="bg-white text-black border-[3px] border-black rounded-none py-[15px] px-[30px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[200px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5 max-md:py-3.5 max-md:px-6 max-md:text-base max-md:min-w-[180px] max-sm:py-[0.875rem] max-sm:px-6 max-sm:text-base max-sm:min-w-[180px] max-[360px]:py-[0.7rem] max-[360px]:px-4 max-[360px]:text-[0.85rem] max-[360px]:min-w-[140px]"
              role="button"
              tabIndex={0}
              aria-label="Get Started"
              onClick={handleGetStarted}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleGetStarted();
                }
              }}
            >
              <span>Get Started</span>
            </div>
          </div>
        </div>

        <div className="flex-[0_0_60%] flex items-center justify-center relative bg-transparent min-w-0 max-md:flex-none max-md:h-[250px] max-md:p-4 max-sm:h-[200px]">
          <GlobeEffect />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-8 px-5 w-full max-md:py-4 max-md:px-4">
        <div className="max-w-[1400px] mx-auto px-8 py-8 relative z-[1] max-md:px-4 max-md:py-6 max-sm:px-3 max-sm:py-5 max-[360px]:px-2 max-[360px]:py-4">
          <div className="grid grid-cols-3 gap-[30px] m-0 w-full max-w-[1200px] mx-auto max-md:grid-cols-1 max-md:gap-5 max-sm:gap-[15px]">
            <div className="bg-white border-[3px] border-black rounded-none p-[25px] transition-all duration-300 relative overflow-hidden shadow-[8px_8px_0px_#000000] hover:-translate-y-[5px] max-md:p-5 max-sm:p-[20px_15px] max-[360px]:p-[15px_12px]">
              <div className="font-['42dot_Sans'] text-4xl font-extrabold text-[#F2F1EF] bg-black w-[60px] h-[60px] rounded-none absolute top-[25px] right-[25px] leading-none flex items-center justify-center border-2 border-black max-md:top-5 max-md:right-5 max-sm:text-[28px] max-sm:w-[50px] max-sm:h-[50px] max-sm:top-5 max-sm:right-5 max-[360px]:text-xl max-[360px]:w-10 max-[360px]:h-10 max-[360px]:top-3 max-[360px]:right-3">
                01
              </div>
              <h3 className="font-['42dot_Sans'] text-xl font-extrabold mb-[15px] text-black leading-snug pr-[80px] max-md:text-lg max-md:pr-[70px] max-sm:text-base max-sm:pr-[70px] max-[360px]:text-sm max-[360px]:pr-[55px]">
                AI-Driven RWA
              </h3>
              <p className="font-['Commit_Mono'] text-sm leading-relaxed text-[#666666] m-0 uppercase tracking-wide max-md:text-xs max-sm:text-[11px] max-[360px]:text-[10px] pr-[80px] max-md:pr-[70px] max-sm:pr-[70px] max-[360px]:pr-[55px]">
                Tokenize & risk-manage yield-bearing assets
              </p>
            </div>

            <div className="bg-white border-[3px] border-black rounded-none p-[25px] transition-all duration-300 relative overflow-hidden shadow-[8px_8px_0px_#000000] hover:-translate-y-[5px] max-md:p-5 max-sm:p-[20px_15px] max-[360px]:p-[15px_12px]">
              <div className="font-['42dot_Sans'] text-4xl font-extrabold text-[#F2F1EF] bg-black w-[60px] h-[60px] rounded-none absolute top-[25px] right-[25px] leading-none flex items-center justify-center border-2 border-black max-md:top-5 max-md:right-5 max-sm:text-[28px] max-sm:w-[50px] max-sm:h-[50px] max-sm:top-5 max-sm:right-5 max-[360px]:text-xl max-[360px]:w-10 max-[360px]:h-10 max-[360px]:top-3 max-[360px]:right-3">
                02
              </div>
              <h3 className="font-['42dot_Sans'] text-xl font-extrabold mb-[15px] text-black leading-snug pr-[80px] max-md:text-lg max-md:pr-[70px] max-sm:text-base max-sm:pr-[70px] max-[360px]:text-sm max-[360px]:pr-[55px]">
                Cashflow Financing
              </h3>
              <p className="font-['Commit_Mono'] text-sm leading-relaxed text-[#666666] m-0 uppercase tracking-wide max-md:text-xs max-sm:text-[11px] max-[360px]:text-[10px] pr-[80px] max-md:pr-[70px] max-sm:pr-[70px] max-[360px]:pr-[55px]">
                Turn AI service revenues into DeFi assets
              </p>
            </div>

            <div className="bg-white border-[3px] border-black rounded-none p-[25px] transition-all duration-300 relative overflow-hidden shadow-[8px_8px_0px_#000000] hover:-translate-y-[5px] max-md:p-5 max-sm:p-[20px_15px] max-[360px]:p-[15px_12px]">
              <div className="font-['42dot_Sans'] text-4xl font-extrabold text-[#F2F1EF] bg-black w-[60px] h-[60px] rounded-none absolute top-[25px] right-[25px] leading-none flex items-center justify-center border-2 border-black max-md:top-5 max-md:right-5 max-sm:text-[28px] max-sm:w-[50px] max-sm:h-[50px] max-sm:top-5 max-sm:right-5 max-[360px]:text-xl max-[360px]:w-10 max-[360px]:h-10 max-[360px]:top-3 max-[360px]:right-3">
                03
              </div>
              <h3 className="font-['42dot_Sans'] text-xl font-extrabold mb-[15px] text-black leading-snug pr-[80px] max-md:text-lg max-md:pr-[70px] max-sm:text-base max-sm:pr-[70px] max-[360px]:text-sm max-[360px]:pr-[55px]">
                AIUSD Stablecoin
              </h3>
              <p className="font-['Commit_Mono'] text-sm leading-relaxed text-[#666666] m-0 uppercase tracking-wide max-md:text-xs max-sm:text-[11px] max-[360px]:text-[10px] pr-[80px] max-md:pr-[70px] max-sm:pr-[70px] max-[360px]:pr-[55px]">
                Native currency for AI-to-AI and AI-to-human payments
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1000px] mx-auto bg-white border-[3px] border-black rounded-none p-10 shadow-[8px_8px_0px_#000000] relative z-[1] max-md:mx-4 max-md:p-[25px_20px] max-sm:mx-3 max-sm:p-[20px_15px] max-[360px]:mx-2 max-[360px]:p-[18px_12px]">
          <p className="font-['42dot_Sans'] text-xl leading-relaxed text-black font-semibold text-center m-0 max-md:text-base max-sm:text-sm max-[360px]:text-[13px]">
            Real-world yield + AI revenue + Institutional collateral = Programmable cashflows
          </p>
        </div>
      </div>
    </section>
  );
}

