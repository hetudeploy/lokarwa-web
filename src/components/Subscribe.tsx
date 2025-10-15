'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SubscribeProps {
  projectId: string;
}

export default function Subscribe({ projectId }: SubscribeProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('project-details');
  const [subscribeAmount, setSubscribeAmount] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);

  // Project data
  const projectData = {
    'tweet-value-checker': {
      name: 'Tweet Value Checker',
      icon: 'fas fa-brain',
      targetAmount: '100,000 AIUSD',
      raisedAmount: '85,000 AIUSD',
      progress: 85,
      remainingDays: 15
    },
    'defi-yield-optimizer': {
      name: 'DeFi Yield Optimizer',
      icon: 'fas fa-chart-line',
      targetAmount: '150,000 AIUSD',
      raisedAmount: '90,000 AIUSD',
      progress: 60,
      remainingDays: 22
    }
  };

  const currentProject = projectData[projectId as keyof typeof projectData] || projectData['tweet-value-checker'];

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

  const handleBackClick = () => {
    router.push('/trade');
  };

  const handleQuickAmount = (amount: string) => {
    setSubscribeAmount(amount);
    updateSubscriptionSummary(parseFloat(amount));
  };

  const handleAmountChange = (value: string) => {
    setSubscribeAmount(value);
    updateSubscriptionSummary();
  };

  const updateSubscriptionSummary = (_amount?: number) => {
    // This would update the summary calculations
    // For now, we'll just handle the state
  };

  const handleSubscribe = () => {
    if (parseFloat(subscribeAmount) >= 100 && agreementChecked) {
      setIsProcessing(true);
      
      setTimeout(() => {
        const sharePercentage = ((parseFloat(subscribeAmount) / 100000) * 100).toFixed(2);
        alert(`AIUSD SPV Share Subscription Successful!\nYou have invested ${subscribeAmount} USDC\nSystem automatically minted ${subscribeAmount} AIUSD\nSPV Share Percentage: ${sharePercentage}%\nWill enjoy Daily AIUSD Distribution returns\nAIUSD can be redeemed 1:1 for USDC at any time`);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const isSubscribeEnabled = parseFloat(subscribeAmount) >= 100 && agreementChecked;

  return (
    <section ref={sectionRef} className={`min-h-screen bg-[#F2F1EF] pt-10 font-['42dot_Sans'] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1400px] mx-auto px-8 max-md:px-4 pb-16">
        
        {/* Breadcrumb */}
        <div className={`bg-white py-4 border-b-2 border-black mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="flex items-center gap-4">
            <button 
              className="text-black no-underline font-semibold font-['Commit_Mono'] px-4 py-2 border-2 border-black inline-flex items-center gap-2 transition-all duration-300 hover:bg-black hover:text-[#F2F1EF]"
              onClick={handleBackClick}
            >
              <i className="fas fa-home"></i>
              Investment Platform
            </button>
            <span className="text-[#666] mx-4">
              <i className="fas fa-chevron-right"></i>
            </span>
            <span className="text-[#666] font-medium">{currentProject.name}</span>
          </div>
        </div>

        {/* Project Summary */}
        <div className={`bg-white border-[3px] border-black p-8 max-md:p-6 mb-8 shadow-[8px_8px_0px_#000000] transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
            <div className="flex items-center gap-5">
              <div className="w-15 h-15 bg-black flex items-center justify-center text-[#F2F1EF] text-3xl">
                <i className={currentProject.icon}></i>
              </div>
              <div>
                <h1 className="text-3xl max-md:text-2xl font-black text-black mb-2 font-['42dot_Sans']">
                  {currentProject.name} SPV
                </h1>
                <span className="px-4 py-1.5 text-sm font-bold font-['Commit_Mono'] uppercase bg-white text-green-600 border-2 border-green-600">
                  AIUSD Subscribing
                </span>
              </div>
            </div>
            <button 
              className="bg-white border-2 border-black px-6 py-3 flex items-center gap-2 font-semibold font-['Commit_Mono'] transition-all duration-300 hover:bg-black hover:text-[#F2F1EF]"
              onClick={handleBackClick}
            >
              <i className="fas fa-arrow-left"></i>
              <span>Return to List</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Share Ratio */}
            <div className="bg-white border-2 border-black p-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:shadow-[8px_8px_0px_#000000]">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl mb-2.5">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="text-2xl font-black text-black font-['42dot_Sans']">15%</div>
              <div className="text-sm text-[#666] font-['Commit_Mono'] text-center leading-tight">AIUSD Share Ratio</div>
            </div>

            {/* Target Amount */}
            <div className="bg-[#F2F1EF] border-2 border-black p-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:shadow-[8px_8px_0px_#000000]">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl mb-2.5">
                <i className="fas fa-bullseye"></i>
              </div>
              <div className="text-2xl font-black text-black font-['42dot_Sans']">{currentProject.targetAmount}</div>
              <div className="text-sm text-[#666] font-['Commit_Mono'] text-center leading-tight">SPV Target Fundraising Amount</div>
            </div>

            {/* Funding Progress */}
            <div className="bg-white border-2 border-black p-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:shadow-[8px_8px_0px_#000000]">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl mb-2.5">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="text-2xl font-black text-black font-['42dot_Sans']">{currentProject.raisedAmount}</div>
              <div className="text-sm text-[#666] font-['Commit_Mono'] text-center leading-tight mb-2">Raised Amount</div>
              <div className="flex items-center gap-2.5 w-full justify-center">
                <div className="flex-1 h-1.5 bg-[#E5E5E5] border border-black overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-300"
                    style={{ width: `${currentProject.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold text-black min-w-[35px] text-right font-['Commit_Mono']">
                  {currentProject.progress}%
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-white border-2 border-black p-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:shadow-[8px_8px_0px_#000000]">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl mb-2.5">
                <i className="fas fa-clock"></i>
              </div>
              <div className="flex items-baseline gap-1 mb-1 justify-center">
                <div className="text-2xl font-black text-black font-['42dot_Sans']">{currentProject.remainingDays}</div>
                <div className="text-sm text-[#666] font-medium font-['Commit_Mono']">days</div>
              </div>
              <div className="text-sm text-[#666] font-['Commit_Mono'] text-center leading-tight">Remaining Subscription Time</div>
            </div>

            {/* Minimum Investment */}
            <div className="bg-[#F2F1EF] border-2 border-black p-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:shadow-[8px_8px_0px_#000000]">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-[#F2F1EF] text-2xl mb-2.5">
                <i className="fas fa-coins"></i>
              </div>
              <div className="text-2xl font-black text-black font-['42dot_Sans']">100 USDC</div>
              <div className="text-sm text-[#666] font-['Commit_Mono'] text-center leading-tight">Minimum Investment Amount</div>
            </div>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-8">
          
          {/* Main Content */}
          <div className="bg-white border-[3px] border-black overflow-hidden">
            {/* Tab Header */}
            <div className="flex bg-[#F2F1EF] border-b-2 border-[#E5E5E5]">
              <button 
                className={`flex-1 py-5 px-6 bg-none border-none cursor-pointer text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative font-['Commit_Mono'] uppercase ${
                  activeTab === 'project-details' 
                    ? 'bg-white text-black font-bold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[3px] after:bg-black' 
                    : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                }`}
                onClick={() => setActiveTab('project-details')}
              >
                <i className="fas fa-info-circle"></i>
                <span>Project Details</span>
              </button>
              <button 
                className={`flex-1 py-5 px-6 bg-none border-none cursor-pointer text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative font-['Commit_Mono'] uppercase ${
                  activeTab === 'dividend-info' 
                    ? 'bg-white text-black font-bold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[3px] after:bg-black' 
                    : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                }`}
                onClick={() => setActiveTab('dividend-info')}
              >
                <i className="fas fa-donate"></i>
                <span>Dividend Information</span>
              </button>
              <button 
                className={`flex-1 py-5 px-6 bg-none border-none cursor-pointer text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative font-['Commit_Mono'] uppercase ${
                  activeTab === 'revenue-records' 
                    ? 'bg-white text-black font-bold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[3px] after:bg-black' 
                    : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                }`}
                onClick={() => setActiveTab('revenue-records')}
              >
                <i className="fas fa-receipt"></i>
                <span>Revenue Records</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'project-details' && (
                <div>
                  <h2 className="text-2xl mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                    <i className="fas fa-info-circle text-xl"></i>
                    AIUSD SPV Project Details
                  </h2>
                  <div className="space-y-6">
                    <div className="pb-5 border-b border-[#F3F4F6]">
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">AIUSD SPV Structure</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        <strong>{currentProject.name} AIUSD SPV</strong> is a special purpose vehicle specifically designed to hold and manage future subscription revenue rights for {currentProject.name} products. Investors use Base Chain USDC to invest, and the system automatically mints equivalent AIUSD tokens as SPV share certificates.
                      </p>
                    </div>
                    <div className="pb-5 border-b border-[#F3F4F6]">
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">AIUSD Minting Mechanism</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        After users invest Base Chain USDC, the system will automatically mint equivalent AIUSD tokens (1:1 exchange rate). AIUSD serves as SPV share certificates, representing investors&apos; equity proportion in the SPV. AIUSD can be redeemed for USDC at any time at a 1:1 exchange rate.
                      </p>
                    </div>
                    <div className="pb-5 border-b border-[#F3F4F6]">
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">Revenue Sharing Contract (DRC)</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        The SPV has signed a daily revenue sharing contract with the {currentProject.name} project party, stipulating that the project party will pay <strong>15%</strong> of its daily subscription revenue to the SPV in AIUSD form for distributing returns to investors. The contract term is 24 months.
                      </p>
                    </div>
                    <div className="pb-5 border-b border-[#F3F4F6]">
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">Underlying Asset</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        The SPV holds subscription revenue rights for {currentProject.name} products. The product currently has approximately 10,000 paying users with an average monthly subscription revenue of about 50,000 USDT, providing a stable cash flow foundation for the SPV.
                      </p>
                    </div>
                    <div className="pb-5 border-b border-[#F3F4F6]">
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">SPV Entity Information</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        <strong>SPV Name:</strong> {currentProject.name} AIUSD Income Fund SPV<br/>
                        <strong>Registration Number:</strong> SPV.{projectId.toUpperCase()}.AIUSD001<br/>
                        <strong>Custodian:</strong> Digital Asset Custody Ltd.<br/>
                        <strong>Legal Advisor:</strong> Web3 Legal Partners
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2.5 text-black font-['42dot_Sans'] font-bold">Investment Model</h3>
                      <p className="text-[#666] leading-relaxed text-sm">
                        Investors use Base Chain USDC to purchase AIUSD SPV shares, enjoying corresponding proportional future subscription revenue distribution rights. Returns are distributed in AIUSD form and can be redeemed for USDC at any time. During the investment period, investors do not need to bear project operational risks, as returns are entirely derived from revenue sharing payments made by the project party according to the contract.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'dividend-info' && (
                <div>
                  <h2 className="text-2xl mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                    <i className="fas fa-donate text-xl"></i>
                    AIUSD Revenue Distribution
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Distribution Method:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">Daily AIUSD Distribution</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Share Ratio:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">15% (Project Daily Revenue)</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Distribution Currency:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">AIUSD</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Distribution Frequency:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">Daily Automatic Distribution</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Contract Term:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">24 months</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-[#666] font-medium font-['Commit_Mono']">Redemption Mechanism:</span>
                      <span className="text-black font-bold font-['42dot_Sans']">AIUSD can be redeemed 1:1 for USDC at any time</span>
                    </div>
                    
                    <div className="bg-[#F2F1EF] p-5 mt-5 border-2 border-black">
                      <h4 className="text-black mb-2.5 font-['42dot_Sans'] font-bold">Revenue Calculation Example</h4>
                      <p className="text-[#374151] leading-relaxed text-sm mb-4">
                        Assuming the project party&apos;s daily revenue is <strong>1,667 USDT</strong> (monthly revenue 50,000 USDT ÷ 30 days), the SPV can receive a daily share of <strong>250 AIUSD</strong> (1,667 × 15%).
                      </p>
                      <p className="text-[#374151] leading-relaxed text-sm mb-4">
                        Subscribing <strong>1,000 USDC</strong> obtains <strong>1,000 AIUSD</strong> SPV shares (1% of total fundraising amount), and can receive approximately <strong>2.5 AIUSD</strong> daily return distribution.
                      </p>
                      <p className="text-[#374151] leading-relaxed text-sm">
                        <strong>Redemption Example:</strong> Holding 1,000 AIUSD can be redeemed for 1,000 USDC at any time with no fees.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'revenue-records' && (
                <div>
                  <h2 className="text-2xl mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                    <i className="fas fa-receipt text-xl"></i>
                    AIUSD Revenue Sharing Records (POCW Trusted Verification)
                  </h2>
                  <p className="text-[#666] mb-5 italic text-sm">
                    The following are AIUSD revenue sharing records for the SPV over the past few months, audited and verified through POCW trusted verification components, demonstrating the project party&apos;s ability to stably pay revenue sharing according to the contract.
                  </p>
                  
                  <div className="overflow-x-auto border-2 border-black">
                    <table className="w-full border-collapse bg-white min-w-[800px]">
                      <thead>
                        <tr>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Time</th>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">Project Total Revenue (USDT)</th>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">SPV Share Revenue (AIUSD)</th>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Share Ratio</th>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">POCW Audit Hash</th>
                          <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">POCW Metadata</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#F8F8F8]">
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">2025-04</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">49,850 USDT</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">7,477.5 AIUSD</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">15.00%</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-blue-600 text-sm font-mono font-semibold">POCW_AUDIT_7a9f...c82d</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-blue-600 text-sm font-mono font-semibold">View Metadata</td>
                        </tr>
                        <tr className="hover:bg-[#F8F8F8]">
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">2025-03</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">48,920 USDT</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">7,338 AIUSD</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-black text-sm">15.00%</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-blue-600 text-sm font-mono font-semibold">POCW_AUDIT_3b1c...e75a</td>
                          <td className="p-4 border-b border-[#F3F4F6] text-blue-600 text-sm font-mono font-semibold">View Metadata</td>
                        </tr>
                        <tr className="hover:bg-[#F8F8F8]">
                          <td className="p-4 text-black text-sm">2025-02</td>
                          <td className="p-4 text-black text-sm">50,110 USDT</td>
                          <td className="p-4 text-black text-sm">7,516.5 AIUSD</td>
                          <td className="p-4 text-black text-sm">15.00%</td>
                          <td className="p-4 text-blue-600 text-sm font-mono font-semibold">POCW_AUDIT_9e2d...a41f</td>
                          <td className="p-4 text-blue-600 text-sm font-mono font-semibold">View Metadata</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Subscription Panel */}
            <div className="bg-white border-[3px] border-black p-6">
              <h3 className="text-xl mb-4 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                <i className="fas fa-chart-line text-xl"></i>
                Subscribe AIUSD SPV Shares
              </h3>
              <p className="text-[#666] mb-5 text-sm leading-relaxed">
                Use Base Chain USDC to invest, system automatically mints equivalent AIUSD as SPV share certificate
              </p>
              
              <div className="relative mb-4">
                <input 
                  type="number" 
                  className="w-full p-4 pr-12 border-2 border-black text-base transition-colors duration-300 font-['Commit_Mono'] focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)]"
                  placeholder="Enter subscription amount"
                  min="100"
                  step="100"
                  value={subscribeAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] font-bold font-['Commit_Mono']">USDC</span>
              </div>
              
              <div className="text-[#666] mb-5 text-sm font-['Commit_Mono']">
                Your USDC Balance: <span className="font-bold text-black">0 USDC</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2.5 mb-5">
                <button 
                  className="p-2.5 border-2 border-black bg-white cursor-pointer font-semibold transition-all duration-300 font-['Commit_Mono'] hover:bg-black hover:text-[#F2F1EF]"
                  onClick={() => handleQuickAmount('100')}
                >
                  100
                </button>
                <button 
                  className="p-2.5 border-2 border-black bg-white cursor-pointer font-semibold transition-all duration-300 font-['Commit_Mono'] hover:bg-black hover:text-[#F2F1EF]"
                  onClick={() => handleQuickAmount('500')}
                >
                  500
                </button>
                <button 
                  className="p-2.5 border-2 border-black bg-white cursor-pointer font-semibold transition-all duration-300 font-['Commit_Mono'] hover:bg-black hover:text-[#F2F1EF]"
                  onClick={() => handleQuickAmount('1000')}
                >
                  1,000
                </button>
                <button 
                  className="p-2.5 border-2 border-black bg-[#F2F1EF] cursor-pointer font-bold transition-all duration-300 font-['Commit_Mono'] hover:bg-black hover:text-[#F2F1EF]"
                  onClick={() => handleQuickAmount('10000')}
                >
                  MAX
                </button>
              </div>
              
              <div className="bg-[#F2F1EF] p-5 mb-5 border-2 border-black">
                <div className="flex justify-between mb-2.5">
                  <span className="text-[#666] font-['Commit_Mono']">Invest USDC:</span>
                  <span className="text-black font-bold font-['42dot_Sans']">{subscribeAmount || '0'} USDC</span>
                </div>
                <div className="flex justify-between mb-2.5">
                  <span className="text-[#666] font-['Commit_Mono']">Get AIUSD:</span>
                  <span className="text-black font-bold font-['42dot_Sans']">{subscribeAmount || '0'} AIUSD</span>
                </div>
                <div className="flex justify-between mb-2.5">
                  <span className="text-[#666] font-['Commit_Mono']">SPV Share Percentage:</span>
                  <span className="text-black font-bold font-['42dot_Sans']">~{((parseFloat(subscribeAmount) / 100000) * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666] font-['Commit_Mono']">Expected Daily Return:</span>
                  <span className="text-black font-bold font-['42dot_Sans']">~{((parseFloat(subscribeAmount) / 100000) * 250).toFixed(2)} AIUSD</span>
                </div>
              </div>
              
              <div className="mb-5">
                <label className="flex items-start gap-2.5 cursor-pointer text-sm leading-tight font-['Commit_Mono'] text-black">
                  <input 
                    type="checkbox" 
                    className="mt-1"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                  />
                  I have read and agree to the &quot;AIUSD SPV Investment Agreement&quot; and &quot;Risk Disclosure&quot;
                </label>
              </div>
              
              <button 
                className={`w-full py-4 px-4 border-none font-bold cursor-pointer transition-all duration-300 font-['Commit_Mono'] uppercase flex items-center justify-center gap-2 ${
                  isSubscribeEnabled
                    ? 'bg-black text-[#F2F1EF] hover:bg-[#333] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000]'
                    : 'bg-black text-[#F2F1EF] opacity-50 cursor-not-allowed'
                }`}
                onClick={handleSubscribe}
                disabled={!isSubscribeEnabled || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket"></i>
                    Subscribe AIUSD SPV Shares
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Risk Warning */}
        <div className={`bg-yellow-100 p-6 border-[3px] border-yellow-500 mt-8 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h3 className="text-yellow-800 mb-4 flex items-center gap-2.5 font-['42dot_Sans'] font-black text-lg">
            <i className="fas fa-exclamation-triangle"></i>
            Risk Warning
          </h3>
          <p className="text-yellow-800 leading-relaxed text-sm">
            Investment involves risks. Please invest carefully. This project&apos;s returns depend on the future subscription revenue of the &apos;{currentProject.name}&apos; product. If the product loses users or revenue decreases, it may lead to reduced AIUSD dividends or principal loss. AIUSD can be redeemed 1:1 for USDC at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
