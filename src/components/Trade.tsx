'use client';

import { useEffect, useState, useRef } from 'react';

interface SPVProject {
  id: string;
  name: string;
  icon: string;
  status: 'subscription' | 'operating';
  statusText: string;
  revenueShareRatio: string;
  fundraisingAsset: string;
  raisedAmount: string;
  targetAmount: string;
  progressPercentage: number;
  investors: string;
  establishmentDate: string;
  contractTerm: string;
  underlyingAsset: string;
}

export default function Trade() {
  const [currentFilter, setCurrentFilter] = useState<'all' | 'subscription' | 'completed'>('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const spvProjects: SPVProject[] = [
    {
      id: 'tvc001',
      name: 'Tweet Value Checker SPV',
      icon: 'fa-building',
      status: 'subscription',
      statusText: 'SPV Subscribing',
      revenueShareRatio: '15%',
      fundraisingAsset: 'USDT',
      raisedAmount: '$85,000',
      targetAmount: '$100,000',
      progressPercentage: 85,
      investors: '892',
      establishmentDate: '2025-05-10',
      contractTerm: '24 months',
      underlyingAsset: 'Subscription Revenue Rights'
    },
    {
      id: 'nft001',
      name: 'NFT Analytics Platform SPV',
      icon: 'fa-chart-pie',
      status: 'operating',
      statusText: 'SPV Operating',
      revenueShareRatio: '12%',
      fundraisingAsset: 'USDT',
      raisedAmount: '$150,000',
      targetAmount: '$150,000',
      progressPercentage: 100,
      investors: '1,205',
      establishmentDate: '2025-01-15',
      contractTerm: '18 months',
      underlyingAsset: 'API Service Revenue Rights'
    },
    {
      id: 'defi001',
      name: 'DeFi Yield Optimizer',
      icon: 'fa-coins',
      status: 'subscription',
      statusText: 'SPV Subscribing',
      revenueShareRatio: '10%',
      fundraisingAsset: 'USDC',
      raisedAmount: '$42,000',
      targetAmount: '$80,000',
      progressPercentage: 52.5,
      investors: '312',
      establishmentDate: '2025-05-22',
      contractTerm: '12 months',
      underlyingAsset: 'Yield Revenue Rights'
    }
  ];

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (filter: 'all' | 'subscription' | 'completed') => {
    setCurrentFilter(filter);
  };

  const handleProjectClick = (project: SPVProject) => {
    if (project.id === 'tvc001' || project.id === 'defi001') {
      const subscribeId = project.id === 'tvc001' ? 'tweet-value-checker' : 'defi-yield-optimizer';
      window.location.href = `/subscribe/${subscribeId}`;
    } else {
      // For operating projects, go to trade detail page
      const detailId = project.id === 'nft001' ? 'nft001' : project.id;
      window.location.href = `/trade/${detailId}`;
    }
  };

  const filteredProjects = spvProjects.filter(project => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'completed' && project.status === 'operating') return true;
    if (currentFilter === 'subscription' && project.status === 'subscription') return true;
    return false;
  });

  const renderProjectCard = (project: SPVProject) => {
    const isSubscription = project.status === 'subscription';
    const buttonClass = isSubscription ? 'bg-black text-[#F2F1EF] hover:bg-[#F2F1EF] hover:text-black' : 'bg-white text-black hover:bg-black hover:text-[#F2F1EF]';
    const buttonText = isSubscription ? 'Subscribe SPV Shares' : 'View SPV Details';
    const buttonIcon = isSubscription ? 'fa-chart-line' : 'fa-eye';

    return (
      <div key={project.id} className={`bg-white border-[3px] border-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Card Header */}
        <div className="bg-[#F2F1EF] border-b-[3px] border-black p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl flex-shrink-0 border-2 border-black">
              <i className={`fas ${project.icon}`}></i>
            </div>
            <div className="flex-1">
              <h3 className="font-['42dot_Sans'] text-xl font-black text-black mb-2 leading-tight">
                {project.name}
              </h3>
              <span className={`px-3 py-1.5 text-xs font-semibold font-['Commit_Mono'] uppercase border-2 border-black inline-block ${
                project.status === 'subscription' 
                  ? 'bg-white text-black' 
                  : 'bg-black text-[#F2F1EF]'
              }`}>
                {project.statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Ratio Highlight */}
          <div className="bg-[#F2F1EF] p-5 border-2 border-black text-center mb-6">
            <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase mb-2">
              {isSubscription ? 'Revenue Share Ratio' : 'Actual Share Ratio'}
            </div>
            <div className="text-4xl font-black text-black font-['42dot_Sans']">
              {project.revenueShareRatio}
            </div>
          </div>

          {/* Funding Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              <span className="text-[#666] text-sm font-['Commit_Mono']">SPV Fundraising Asset:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.fundraisingAsset}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              <span className="text-[#666] text-sm font-['Commit_Mono']">Raised Amount/Target:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.raisedAmount} / {project.targetAmount}</span>
            </div>
            <div className="w-full h-2 bg-[#E5E5E5] border border-black my-4 overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${project.progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              <span className="text-[#666] text-sm font-['Commit_Mono']">SPV Investors:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.investors}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              <span className="text-[#666] text-sm font-['Commit_Mono']">SPV Establishment Date:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.establishmentDate}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              <span className="text-[#666] text-sm font-['Commit_Mono']">DRC Contract Term:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.contractTerm}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#666] text-sm font-['Commit_Mono']">Underlying Asset:</span>
              <span className="font-semibold text-black text-sm font-['42dot_Sans']">{project.underlyingAsset}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-[#F2F1EF] border-t-[3px] border-black p-6">
          <button 
            className={`w-full py-4 border-[3px] border-black font-bold font-['Commit_Mono'] text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 uppercase ${buttonClass}`}
            onClick={() => handleProjectClick(project)}
          >
            <i className={`fas ${buttonIcon}`}></i>
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={`min-h-screen bg-[#F2F1EF] pt-10 font-['42dot_Sans'] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1400px] mx-auto px-8 max-md:px-4">
        
        {/* Hero Banner */}
        <div className={`bg-white text-black p-16 max-md:p-10 max-sm:p-8 mb-10 border-[3px] border-black shadow-[8px_8px_0px_#000000] transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-md:gap-8 items-center">
            {/* Platform Stats */}
            <div>
              <h2 className="font-['42dot_Sans'] text-4xl max-md:text-3xl max-sm:text-2xl font-black text-black mb-8 max-md:text-center">
                Platform Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-[#F2F1EF] p-6 border-[3px] border-black transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl max-md:text-2xl font-black text-black mb-2 font-['42dot_Sans']">
                    $8,765,432 USD
                  </div>
                  <div className="text-sm text-[#666] font-['Commit_Mono'] uppercase">
                    Total Value Locked (TVL)
                  </div>
                </div>
                <div className="bg-[#F2F1EF] p-6 border-[3px] border-black transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl max-md:text-2xl font-black text-black mb-2 font-['42dot_Sans']">
                    $876,543 USD
                  </div>
                  <div className="text-sm text-[#666] font-['Commit_Mono'] uppercase">
                    Total Dividends Paid
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Box */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-[#F2F1EF] to-[#E5E5E5] p-12 max-md:p-10 max-sm:p-8 border-[3px] border-black w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-black"></div>
                <div className="w-16 h-16 bg-black text-[#F2F1EF] rounded-full flex items-center justify-center text-3xl mx-auto mb-5 animate-pulse">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3 className="font-['42dot_Sans'] text-2xl max-md:text-xl font-black text-black leading-tight mb-3 text-center">
                  Invest in Web3&apos;s Future Cash Flow
                </h3>
                <p className="text-sm text-[#666] font-['Commit_Mono'] uppercase tracking-wide text-center">
                  Transparent Investment Channels Based on Real Cash Flows
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="flex gap-4 max-md:flex-col max-md:gap-3">
            <button 
              className={`px-8 py-3 border-2 border-black font-semibold font-['Commit_Mono'] text-sm uppercase transition-all duration-300 ${
                currentFilter === 'all' 
                  ? 'bg-black text-[#F2F1EF]' 
                  : 'bg-white text-black hover:bg-black hover:text-[#F2F1EF]'
              }`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={`px-8 py-3 border-2 border-black font-semibold font-['Commit_Mono'] text-sm uppercase transition-all duration-300 ${
                currentFilter === 'subscription' 
                  ? 'bg-black text-[#F2F1EF]' 
                  : 'bg-white text-black hover:bg-black hover:text-[#F2F1EF]'
              }`}
              onClick={() => handleFilterChange('subscription')}
            >
              Subscribing
            </button>
            <button 
              className={`px-8 py-3 border-2 border-black font-semibold font-['Commit_Mono'] text-sm uppercase transition-all duration-300 ${
                currentFilter === 'completed' 
                  ? 'bg-black text-[#F2F1EF]' 
                  : 'bg-white text-black hover:bg-black hover:text-[#F2F1EF]'
              }`}
              onClick={() => handleFilterChange('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map(renderProjectCard)}
          </div>
        </div>

        {/* Announcements Section */}
        <div className={`bg-white border-[3px] border-black overflow-hidden mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="p-8 max-md:p-6">
            <h3 className="font-['42dot_Sans'] text-2xl max-md:text-xl font-black text-black mb-6 flex items-center gap-3">
              <i className="fas fa-bullhorn text-xl"></i>
              Platform Announcements
            </h3>
            <div className="space-y-5">
              <div className="p-5 bg-[#F2F1EF] border-2 border-black transition-all duration-200 hover:translate-x-1">
                <div className="text-xs text-[#666] mb-2 font-['Commit_Mono']">2025-05-20</div>
                <div className="text-xs px-2.5 py-1 border-2 border-green-600 bg-white text-green-600 font-semibold font-['Commit_Mono'] uppercase inline-block mb-2">
                  [Regular]
                </div>
                <div className="text-sm leading-relaxed text-[#333] font-['42dot_Sans']">
                  Tweet Value Checker (SPV.TVC001) May dividends have been distributed
                </div>
              </div>
              <div className="p-5 bg-[#F2F1EF] border-2 border-black transition-all duration-200 hover:translate-x-1">
                <div className="text-xs text-[#666] mb-2 font-['Commit_Mono']">2025-05-15</div>
                <div className="text-xs px-2.5 py-1 border-2 border-red-600 bg-white text-red-600 font-semibold font-['Commit_Mono'] uppercase inline-block mb-2">
                  [Important]
                </div>
                <div className="text-sm leading-relaxed text-[#333] font-['42dot_Sans']">
                  Platform now supports USDT subscription
                </div>
              </div>
              <div className="p-5 bg-[#F2F1EF] border-2 border-black transition-all duration-200 hover:translate-x-1">
                <div className="text-xs text-[#666] mb-2 font-['Commit_Mono']">2025-05-12</div>
                <div className="text-xs px-2.5 py-1 border-2 border-blue-600 bg-white text-blue-600 font-semibold font-['Commit_Mono'] uppercase inline-block mb-2">
                  [Update]
                </div>
                <div className="text-sm leading-relaxed text-[#333] font-['42dot_Sans']">
                  NFT Analytics Platform April operational report released
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
