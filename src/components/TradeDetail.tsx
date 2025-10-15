'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface TradeDetailProps {
  projectId: string;
}

type TabType = 'spv-health' | 'investment-overview' | 'dividend-history' | 'revenue-records';

export default function TradeDetail({ projectId }: TradeDetailProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TabType>('spv-health');
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);

  // Project data
  const projectData = {
    'nft001': {
      name: 'NFT Analytics Platform',
      icon: 'fas fa-chart-pie'
    },
    'tvc001': {
      name: 'Tweet Value Checker',
      icon: 'fas fa-brain'
    },
    'defi001': {
      name: 'DeFi Yield Optimizer',
      icon: 'fas fa-chart-line'
    }
  };

  const currentProject = projectData[projectId as keyof typeof projectData] || projectData['nft001'];

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

  // Toast notification
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'info': return 'info-circle';
      case 'warning': return 'exclamation-triangle';
      case 'error': return 'times-circle';
      default: return 'info-circle';
    }
  };

  const handleBackClick = () => {
    router.push('/trade');
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  const handleDownloadReport = () => {
    showToast('Downloading Report...', 'info');
    setTimeout(() => {
      showToast('Report Download Complete!', 'success');
    }, 1500);
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'Continue Investing':
        router.push(`/subscribe/${projectId}`);
        break;
      case 'AIUSD Redeem to USDC':
        router.push('/swap');
        break;
      case 'Export Records':
        showToast('Exporting Records...', 'info');
        setTimeout(() => {
          showToast('Records Export Complete!', 'success');
        }, 1500);
        break;
      default:
        console.log('Action button clicked:', action);
    }
  };

  const handleSupportClick = () => {
    showToast('Connecting to Customer Service...', 'info');
    setTimeout(() => {
      showToast('Customer Service Connected!', 'success');
    }, 1500);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg z-[10000] transition-all duration-300 ${
          toast ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}>
          <div className="flex items-center gap-3">
            <i className={`fas fa-${getToastIcon(toast.type)} text-lg ${
              toast.type === 'success' ? 'text-green-400' :
              toast.type === 'info' ? 'text-blue-400' :
              toast.type === 'warning' ? 'text-yellow-400' :
              'text-red-400'
            }`}></i>
            <span className="text-sm font-medium font-['42dot_Sans']">{toast.message}</span>
          </div>
        </div>
      )}

      <section ref={sectionRef} className={`min-h-screen bg-[#F2F1EF] pt-10 font-['42dot_Sans'] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-[1400px] mx-auto px-8 max-md:px-4 pb-16">
          
          {/* Breadcrumb */}
          <div className={`bg-white py-4 border-2 border-black mb-8 flex items-center gap-2.5 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
            <button 
              className="text-black no-underline font-['Commit_Mono'] text-sm font-semibold flex items-center gap-2 transition-colors duration-300 hover:text-[#666]"
              onClick={handleBackClick}
            >
              <i className="fas fa-home"></i>
              Investment Platform
            </button>
            <span className="text-[#666] mx-4">
              <i className="fas fa-chevron-right"></i>
            </span>
            <span className="text-[#666] font-['Commit_Mono'] text-sm">{currentProject.name}</span>
          </div>

          {/* Project Status */}
          <div className={`bg-white border-[3px] border-black p-8 max-md:p-6 mb-8 shadow-[8px_8px_0px_#000000] transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
            <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
              <div className="flex items-center gap-5">
                <div className="w-15 h-15 bg-black flex items-center justify-center text-[#F2F1EF] text-3xl border-2 border-black">
                  <i className={currentProject.icon}></i>
                </div>
                <div>
                  <h1 className="text-3xl max-md:text-2xl font-black text-black mb-2 font-['42dot_Sans']">
                    {currentProject.name} SPV
                  </h1>
                  <span className="px-4 py-1.5 text-xs font-semibold font-['Commit_Mono'] uppercase bg-black text-[#F2F1EF] border-2 border-black">
                    SPV Operating
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
              <div className="bg-[#F2F1EF] border-2 border-black p-5 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2F1EF] text-xl flex-shrink-0">
                  <i className="fas fa-coins"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-black font-['42dot_Sans'] mb-1">100,000 USDT</div>
                  <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase">Final Fundraising Amount</div>
                </div>
              </div>

              <div className="bg-[#F2F1EF] border-2 border-black p-5 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2F1EF] text-xl flex-shrink-0">
                  <i className="fas fa-users"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-black font-['42dot_Sans'] mb-1">1,150</div>
                  <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase">Total Investors</div>
                </div>
              </div>

              <div className="bg-white border-[3px] border-black p-5 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2F1EF] text-xl flex-shrink-0">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-black font-['42dot_Sans'] mb-1">7.52%</div>
                  <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase">Actual Annualized Return Rate</div>
                </div>
              </div>

              <div className="bg-[#F2F1EF] border-2 border-black p-5 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2F1EF] text-xl flex-shrink-0">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-black font-['42dot_Sans'] mb-1">2025-07-05</div>
                  <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase">Next Expected Dividend Date (5 days)</div>
                </div>
              </div>

              <div className="bg-[#F2F1EF] border-2 border-black p-5 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-[#F2F1EF] text-xl flex-shrink-0">
                  <i className="fas fa-piggy-bank"></i>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-black font-['42dot_Sans'] mb-1">1,000 USDT</div>
                  <div className="text-xs text-[#666] font-['Commit_Mono'] uppercase">Your Holdings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-8">
            
            {/* Main Content */}
            <div className="bg-white border-[3px] border-black overflow-hidden">
              {/* Tab Header */}
              <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#F2F1EF] border-b-[3px] border-black">
                <button 
                  className={`py-5 px-4 bg-none border-none cursor-pointer text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative font-['Commit_Mono'] uppercase border-r-2 border-black ${
                    currentTab === 'spv-health' 
                      ? 'bg-white text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-black' 
                      : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                  }`}
                  onClick={() => handleTabChange('spv-health')}
                >
                  <i className="fas fa-tachometer-alt"></i>
                  <span>SPV Operating Health</span>
                </button>
                <button 
                  className={`py-5 px-4 bg-none border-none cursor-pointer text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative font-['Commit_Mono'] uppercase border-r-2 border-black ${
                    currentTab === 'investment-overview' 
                      ? 'bg-white text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-black' 
                      : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                  }`}
                  onClick={() => handleTabChange('investment-overview')}
                >
                  <i className="fas fa-wallet"></i>
                  <span>My Investment Overview</span>
                </button>
                <button 
                  className={`py-5 px-4 bg-none border-none cursor-pointer text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative font-['Commit_Mono'] uppercase border-r-2 border-black ${
                    currentTab === 'dividend-history' 
                      ? 'bg-white text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-black' 
                      : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                  }`}
                  onClick={() => handleTabChange('dividend-history')}
                >
                  <i className="fas fa-history"></i>
                  <span>AIUSD Dividend History</span>
                </button>
                <button 
                  className={`py-5 px-4 bg-none border-none cursor-pointer text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative font-['Commit_Mono'] uppercase ${
                    currentTab === 'revenue-records' 
                      ? 'bg-white text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-black' 
                      : 'text-[#666] hover:bg-[#E5E5E5] hover:text-black'
                  }`}
                  onClick={() => handleTabChange('revenue-records')}
                >
                  <i className="fas fa-receipt"></i>
                  <span>x402 Revenue Records</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {currentTab === 'spv-health' && (
                  <div>
                    <h2 className="text-2xl mb-6 flex items-center gap-3 text-black font-['42dot_Sans'] font-black">
                      <i className="fas fa-tachometer-alt text-xl"></i>
                      AIUSD SPV Operating Health 
                      <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600 ml-4">
                        Healthy
                      </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                      <div className="bg-[#F2F1EF] border-2 border-black p-5 text-center">
                        <div className="text-3xl font-black text-black font-['42dot_Sans'] mb-2">10,250</div>
                        <div className="flex items-center justify-center gap-1 text-sm font-semibold text-green-600 mb-2.5 font-['Commit_Mono']">
                          <i className="fas fa-arrow-up"></i>
                          2.5%
                        </div>
                        <div className="font-semibold text-black text-sm mb-1">Base Project Subscription Users</div>
                        <div className="text-xs text-[#666]">(Trend: ↑ 2.5% vs last month)</div>
                      </div>
                      
                      <div className="bg-[#F2F1EF] border-2 border-black p-5 text-center">
                        <div className="text-3xl font-black text-black font-['42dot_Sans'] mb-2">7,687.5</div>
                        <div className="text-sm text-[#666] mb-2.5 font-['Commit_Mono']">AIUSD</div>
                        <div className="font-semibold text-black text-sm mb-1">SPV Monthly Average Share Revenue</div>
                        <div className="text-xs text-[#666]">(15% share ratio)</div>
                      </div>
                      
                      <div className="bg-[#F2F1EF] border-2 border-black p-5 text-center">
                        <div className="text-3xl font-black text-black font-['42dot_Sans'] mb-2">15%</div>
                        <div className="font-semibold text-black text-sm mb-1">DRC Share Ratio</div>
                        <div className="text-xs text-[#666]">(Fixed share ratio)</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl mb-4 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                        <i className="fas fa-file-alt"></i>
                        Project Quarterly Operating Report
                      </h3>
                      <p className="text-[#666] mb-6 italic leading-relaxed text-sm">
                        Project party regularly discloses operating conditions according to protocol requirements.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-[#F2F1EF] border-2 border-black p-5 flex justify-between items-center gap-5">
                          <div className="flex-1">
                            <div className="font-bold text-black mb-2 font-['42dot_Sans'] text-base">2025 Q2 Operating Report</div>
                            <div className="text-[#666] text-sm mb-2 font-['Commit_Mono']">Release Date: 2025-07-01</div>
                            <div className="text-[#666] text-sm leading-tight">Contains detailed information on Q2 user growth, revenue, product updates, etc.</div>
                          </div>
                          <button 
                            className="bg-black text-[#F2F1EF] px-5 py-3 border-none font-bold font-['Commit_Mono'] cursor-pointer flex items-center gap-2 transition-all duration-300 uppercase text-sm hover:bg-[#333]"
                            onClick={handleDownloadReport}
                          >
                            <i className="fas fa-download"></i>
                            <span>Download PDF</span>
                          </button>
                        </div>
                        
                        <div className="bg-[#F2F1EF] border-2 border-black p-5 flex justify-between items-center gap-5">
                          <div className="flex-1">
                            <div className="font-bold text-black mb-2 font-['42dot_Sans'] text-base">2025 Q1 Operating Report</div>
                            <div className="text-[#666] text-sm mb-2 font-['Commit_Mono']">Release Date: 2025-04-01</div>
                            <div className="text-[#666] text-sm leading-tight">Q1 operating summary, user growth data analysis, product development progress</div>
                          </div>
                          <button 
                            className="bg-black text-[#F2F1EF] px-5 py-3 border-none font-bold font-['Commit_Mono'] cursor-pointer flex items-center gap-2 transition-all duration-300 uppercase text-sm hover:bg-[#333]"
                            onClick={handleDownloadReport}
                          >
                            <i className="fas fa-download"></i>
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === 'investment-overview' && (
                  <div>
                    <h2 className="text-2xl mb-6 flex items-center gap-3 text-black font-['42dot_Sans'] font-black">
                      <i className="fas fa-wallet text-xl"></i>
                      My AIUSD SPV Investment Overview
                    </h2>
                    
                    <div className="bg-[#F2F1EF] p-6 border-2 border-black mb-5">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#D0D0D0]">
                        <span className="text-[#666] font-['Commit_Mono'] text-sm">SPV Holdings:</span>
                        <span className="font-bold text-black font-['42dot_Sans'] text-base">1,000 AIUSD</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#D0D0D0]">
                        <span className="text-[#666] font-['Commit_Mono'] text-sm">SPV Share Percentage:</span>
                        <span className="font-bold text-black font-['42dot_Sans'] text-base">1.00%</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#D0D0D0]">
                        <span className="text-[#666] font-['Commit_Mono'] text-sm">Cumulative Dividend Income:</span>
                        <span className="font-bold text-black font-['42dot_Sans'] text-base">12.50 AIUSD</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#666] font-['Commit_Mono'] text-sm">Expected Daily Dividend:</span>
                        <div>
                          <span className="font-bold text-black font-['42dot_Sans'] text-base">~2.5 AIUSD</span>
                          <div className="text-xs text-[#999] italic mt-1">(Estimated based on current share ratio)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button 
                        className="w-full py-4 bg-[#E5E5E5] border-2 border-black font-bold font-['Commit_Mono'] cursor-not-allowed opacity-60 flex items-center justify-center gap-2 text-[#666] uppercase text-sm"
                        disabled
                      >
                        <i className="fas fa-exchange-alt"></i>
                        <span>View SPV Share Secondary Market</span>
                      </button>
                      <span className="block text-[#666] text-xs mt-2.5 font-['Commit_Mono']">Coming Soon</span>
                    </div>
                  </div>
                )}

                {currentTab === 'dividend-history' && (
                  <div>
                    <h2 className="text-2xl mb-6 flex items-center gap-3 text-black font-['42dot_Sans'] font-black">
                      <i className="fas fa-history text-xl"></i>
                      AIUSD Dividend History (On-Chain Records)
                    </h2>
                    <p className="text-[#666] mb-6 italic leading-relaxed text-sm">
                      All dividends have been automatically executed through smart contracts, with immutable records. According to the DRC contract, the project party transfers 15% of daily revenue to the SPV in AIUSD form.
                    </p>
                    
                    <div className="overflow-x-auto border-2 border-black">
                      <table className="w-full min-w-[900px] border-collapse bg-white">
                        <thead>
                          <tr>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Dividend Date</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">Project Daily Revenue</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">SPV Dividend Amount</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Your Dividend</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Status</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Transaction Hash</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-[#F8F8F8]">
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">2025-06-05</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">1,667 USDT</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">250 AIUSD</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">2.5 AIUSD</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm">
                              <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600">
                                Received
                              </span>
                            </td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm font-mono font-semibold">0xabcd...1234</td>
                          </tr>
                          <tr className="hover:bg-[#F8F8F8]">
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">2025-06-04</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">1,650 USDT</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">247.5 AIUSD</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">2.48 AIUSD</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm">
                              <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600">
                                Received
                              </span>
                            </td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm font-mono font-semibold">0xefgh...5678</td>
                          </tr>
                          <tr className="hover:bg-[#F8F8F8]">
                            <td className="p-4 text-black text-sm">2025-06-03</td>
                            <td className="p-4 text-black text-sm">1,680 USDT</td>
                            <td className="p-4 text-black text-sm">252 AIUSD</td>
                            <td className="p-4 text-black text-sm">2.52 AIUSD</td>
                            <td className="p-4 text-sm">
                              <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600">
                                Received
                              </span>
                            </td>
                            <td className="p-4 text-sm font-mono font-semibold">0xijkl...9012</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {currentTab === 'revenue-records' && (
                  <div>
                    <h2 className="text-2xl mb-6 flex items-center gap-3 text-black font-['42dot_Sans'] font-black">
                      <i className="fas fa-receipt text-xl"></i>
                      AIUSD Continuous Revenue Sharing Records (x402 On-Chain Verification)
                    </h2>
                    <p className="text-[#666] mb-6 italic leading-relaxed text-sm">
                      This section continuously displays on-chain records of the project party transferring 15% of monthly subscription revenue to the SPV custody account according to the DRC contract, verified through dual verification by x402 protocol and POCW, proving its continuous payment capability.
                    </p>
                    
                    <div className="bg-[#F2F1EF] p-5 border-2 border-black mb-6">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <i className="fas fa-shield-alt text-black text-lg"></i>
                        <span className="font-bold text-black font-['42dot_Sans']">x402 Protocol Status: Active</span>
                        <span className="bg-transparent text-green-600 px-2.5 py-1 text-xs font-bold font-['Commit_Mono'] uppercase">
                          Real-time Monitoring
                        </span>
                      </div>
                      <p className="text-sm text-[#666] leading-relaxed m-0">
                        x402 protocol ensures the credibility and immutability of all revenue sharing transactions
                      </p>
                    </div>

                    <div className="overflow-x-auto border-2 border-black">
                      <table className="w-full min-w-[900px] border-collapse bg-white">
                        <thead>
                          <tr>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Time</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">Project Total Revenue</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[20%]">SPV Share Revenue</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Share Ratio</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">x402 Transaction Hash</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">POCW Audit Hash</th>
                            <th className="bg-[#F2F1EF] text-black font-bold p-4 text-left border-b-2 border-black font-['Commit_Mono'] uppercase text-xs w-[15%]">Verification Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-[#F8F8F8]">
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">2025-06</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">51,250 USDT</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">7,687.5 AIUSD</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-black text-sm">15.00%</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm font-mono font-semibold text-green-600">x402_1a2b...c3d4</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm font-mono font-semibold text-blue-600">POCW_AUDIT_7a9f...c82d</td>
                            <td className="p-4 border-b border-[#E5E5E5] text-sm">
                              <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600">
                                Verified
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#F8F8F8]">
                            <td className="p-4 text-black text-sm">2025-05</td>
                            <td className="p-4 text-black text-sm">50,110 USDT</td>
                            <td className="p-4 text-black text-sm">7,516.5 AIUSD</td>
                            <td className="p-4 text-black text-sm">15.00%</td>
                            <td className="p-4 text-sm font-mono font-semibold text-green-600">x402_5e6f...g7h8</td>
                            <td className="p-4 text-sm font-mono font-semibold text-blue-600">POCW_AUDIT_3b1c...e75a</td>
                            <td className="p-4 text-sm">
                              <span className="bg-white text-green-600 px-3 py-1 text-xs font-bold font-['Commit_Mono'] uppercase border-2 border-green-600">
                                Verified
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#F2F1EF] p-6 border-2 border-black mt-6">
                      <h4 className="text-black mb-5 flex items-center gap-2.5 font-['42dot_Sans'] font-black text-lg">
                        <i className="fas fa-check-circle"></i>
                        Dual Verification Mechanism
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-black mb-2.5 font-['42dot_Sans'] font-bold text-base">x402 Protocol Verification</h5>
                          <p className="text-[#666] text-sm leading-relaxed">
                            Through the x402 protocol, ensure the credibility, transparency, and immutability of all revenue sharing transactions. Each transaction has a unique x402 transaction hash.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-black mb-2.5 font-['42dot_Sans'] font-bold text-base">POCW Audit Verification</h5>
                          <p className="text-[#666] text-sm leading-relaxed">
                            POCW trusted verification component conducts independent audits on each revenue share, generating immutable audit hashes to ensure data authenticity and integrity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Earnings Panel */}
              <div className="bg-white border-[3px] border-black p-6">
                <h3 className="text-lg mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                  <i className="fas fa-chart-line"></i>
                  My AIUSD Earnings Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#666] text-sm font-['Commit_Mono']">Total Invested USDC</span>
                    <span className="text-black font-bold font-['42dot_Sans'] text-sm">1,000 USDC</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#666] text-sm font-['Commit_Mono']">Holding AIUSD</span>
                    <span className="text-black font-bold font-['42dot_Sans'] text-sm">1,000 AIUSD</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#666] text-sm font-['Commit_Mono']">Cumulative AIUSD Dividends</span>
                    <span className="text-green-600 font-bold font-['42dot_Sans'] text-sm text-right">+12.50 AIUSD</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#666] text-sm font-['Commit_Mono']">Total Return Rate</span>
                    <span className="text-green-600 font-bold font-['42dot_Sans'] text-sm">+1.25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666] text-sm font-['Commit_Mono']">Annualized Return Rate</span>
                    <span className="text-green-600 font-bold font-['42dot_Sans'] text-sm">7.52%</span>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="bg-white border-[3px] border-black p-6">
                <h4 className="text-lg mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                  AIUSD Operations Center
                </h4>
                <div className="space-y-3">
                  <button 
                    className="w-full py-3 px-3 border-none font-bold font-['Commit_Mono'] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-2 border-black uppercase text-sm bg-black text-[#F2F1EF] hover:bg-[#333]"
                    onClick={() => handleActionClick('Continue Investing')}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Continue Investing</span>
                  </button>
                  <button 
                    className="w-full py-3 px-3 border-none font-bold font-['Commit_Mono'] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-2 border-black uppercase text-sm bg-white text-black hover:bg-[#F2F1EF]"
                    onClick={() => handleActionClick('AIUSD Redeem to USDC')}
                  >
                    <i className="fas fa-exchange-alt"></i>
                    <span>AIUSD Redeem to USDC</span>
                  </button>
                  <button 
                    className="w-full py-3 px-3 border-none font-bold font-['Commit_Mono'] cursor-not-allowed opacity-50 flex items-center justify-center gap-2 border-2 border-black uppercase text-sm bg-white text-black"
                    disabled
                  >
                    <i className="fas fa-exchange-alt"></i>
                    <span>Transfer Shares</span>
                  </button>
                  <button 
                    className="w-full py-3 px-3 border-none font-bold font-['Commit_Mono'] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-2 border-black uppercase text-sm bg-white text-black hover:bg-[#F2F1EF]"
                    onClick={() => handleActionClick('Export Records')}
                  >
                    <i className="fas fa-download"></i>
                    <span>Export Records</span>
                  </button>
                </div>
              </div>

              {/* Support Panel */}
              <div className="bg-white border-[3px] border-black p-6">
                <h4 className="text-lg mb-5 flex items-center gap-2.5 text-black font-['42dot_Sans'] font-black">
                  <i className="fas fa-headset"></i>
                  Customer Service Portal
                </h4>
                <p className="text-[#666] mb-5 leading-relaxed text-sm">
                  If you have any questions about your AIUSD dividends or redemption, please contact customer service.
                </p>
                <button 
                  className="w-full py-3 px-3 bg-black text-[#F2F1EF] border-none font-bold font-['Commit_Mono'] cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 uppercase text-sm hover:bg-[#333]"
                  onClick={handleSupportClick}
                >
                  <i className="fas fa-comments"></i>
                  <span>Contact Customer Service</span>
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
              This project has entered the operational stage, but investment risks still exist. Returns depend on the continuous operational capability and market competitiveness of the &apos;{currentProject.name}&apos; product. AIUSD can be redeemed 1:1 for USDC at any time. Please continue to pay attention to the operational reports disclosed by the project party.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
