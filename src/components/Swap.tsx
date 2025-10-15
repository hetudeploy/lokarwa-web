'use client';

import { useEffect, useState, useRef } from 'react';

interface SwapProps {
  className?: string;
}

export default function Swap({ className = '' }: SwapProps) {
  const [currentMode, setCurrentMode] = useState<'mint' | 'redeem'>('mint');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);

  // Simulated balances
  const balances = {
    'USDC': '1,250.50',
    'AIUSD': '850.25'
  };

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

  const switchMode = (mode: 'mint' | 'redeem') => {
    setCurrentMode(mode);
    calculateOutputAmount(fromAmount, mode);
  };

  const calculateOutputAmount = (amount: string, mode?: 'mint' | 'redeem') => {
    const currentModeToUse = mode || currentMode;
    const fromAmountValue = parseFloat(amount) || 0;
    const exchangeRate = 1.0; // 1:1 exchange rate
    const feeRate = 0.001; // 0.1% fee
    
    let calculatedAmount;
    if (currentModeToUse === 'mint') {
      // Mint: USDC -> AIUSD (with fee)
      calculatedAmount = fromAmountValue * exchangeRate * (1 - feeRate);
    } else {
      // Redeem: AIUSD -> USDC (with fee)
      calculatedAmount = fromAmountValue * exchangeRate * (1 - feeRate);
    }
    
    setToAmount(calculatedAmount > 0 ? calculatedAmount.toFixed(2) : '');
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    calculateOutputAmount(value);
  };

  const swapTokens = () => {
    setIsRotating(true);
    
    setTimeout(() => {
      // Swap amounts
      const tempFromAmount = fromAmount;
      const tempToAmount = toAmount;
      
      setFromAmount(tempToAmount);
      setToAmount(tempFromAmount);
      
      // Switch the mode
      const newMode = currentMode === 'mint' ? 'redeem' : 'mint';
      setCurrentMode(newMode);
      
      setIsRotating(false);
    }, 150);
  };

  const handleBalanceClick = (token: 'USDC' | 'AIUSD') => {
    const balance = parseFloat(balances[token].replace(',', ''));
    setFromAmount(balance.toFixed(2));
    calculateOutputAmount(balance.toFixed(2));
  };

  const executeMintRedeem = () => {
    if (!fromAmount || !toAmount) return;
    
    setIsProcessing(true);
    
    // Simulate mint/redeem process
    setTimeout(() => {
      const action = currentMode === 'mint' ? 'minted' : 'redeemed';
      const fromToken = currentMode === 'mint' ? 'USDC' : 'AIUSD';
      const toToken = currentMode === 'mint' ? 'AIUSD' : 'USDC';
      
      alert(`Successfully ${action} ${toAmount} ${toToken} from ${fromAmount} ${fromToken}`);
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      setIsProcessing(false);
    }, 2000);
  };

  const getFromBalance = () => {
    return currentMode === 'mint' ? balances['USDC'] : balances['AIUSD'];
  };

  const getToBalance = () => {
    return currentMode === 'mint' ? balances['AIUSD'] : balances['USDC'];
  };

  const getFromToken = () => {
    return currentMode === 'mint' ? 'USDC' : 'AIUSD';
  };

  const getToToken = () => {
    return currentMode === 'mint' ? 'AIUSD' : 'USDC';
  };

  const getExchangeRate = () => {
    return currentMode === 'mint' ? '1 USDC = 1.00 AIUSD' : '1 AIUSD = 1.00 USDC';
  };

  const getMinReceived = () => {
    const amount = parseFloat(toAmount) || 0;
    const minReceived = amount * 0.995; // Additional 0.5% slippage protection
    const tokenSymbol = currentMode === 'mint' ? 'AIUSD' : 'USDC';
    return minReceived.toFixed(2) + ' ' + tokenSymbol;
  };

  const isButtonDisabled = !fromAmount || parseFloat(fromAmount) <= 0 || isProcessing;

  return (
    <section ref={sectionRef} className={`min-h-screen bg-[#F2F1EF] py-16 font-['42dot_Sans'] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-4">
        <div className="flex justify-center items-center">
          <div className={`bg-white border-[3px] border-black p-8 max-md:p-6 max-sm:p-5 w-full max-w-[420px] shadow-[8px_8px_0px_#000000] transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
            
            {/* Swap Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl max-md:text-xl font-black text-black font-['42dot_Sans']">
                AIUSD Mint & Redeem
              </h1>
              <button className="bg-[#F2F1EF] border-2 border-black text-black p-2 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-[#F2F1EF]">
                <i className="fas fa-cog"></i>
              </button>
            </div>

            {/* Mode Selector */}
            <div className="flex bg-[#F2F1EF] p-1 mb-6 border-2 border-black">
              <button 
                className={`flex-1 p-3 border-none bg-transparent font-bold cursor-pointer transition-all duration-300 text-sm font-['Commit_Mono'] uppercase flex items-center justify-center gap-2 ${
                  currentMode === 'mint' 
                    ? 'bg-white text-green-600 border-2 border-black' 
                    : 'text-[#666]'
                }`}
                onClick={() => switchMode('mint')}
              >
                <i className="fas fa-plus-circle"></i>
                Mint AIUSD
              </button>
              <button 
                className={`flex-1 p-3 border-none bg-transparent font-bold cursor-pointer transition-all duration-300 text-sm font-['Commit_Mono'] uppercase flex items-center justify-center gap-2 ${
                  currentMode === 'redeem' 
                    ? 'bg-white text-red-600 border-2 border-black' 
                    : 'text-[#666]'
                }`}
                onClick={() => switchMode('redeem')}
              >
                <i className="fas fa-minus-circle"></i>
                Redeem USDC
              </button>
            </div>

            {/* Input Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-black font-['Commit_Mono']">You pay</span>
                <span className="text-xs text-[#666] font-['Commit_Mono']">
                  Balance: <span 
                    className="text-black cursor-pointer font-bold font-['42dot_Sans'] hover:underline"
                    onClick={() => handleBalanceClick(getFromToken() as 'USDC' | 'AIUSD')}
                  >
                    {getFromBalance()}
                  </span>
                </span>
              </div>
              <div className="relative bg-[#F2F1EF] border-2 border-black p-4 transition-all duration-300 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center">
                  <input 
                    type="number" 
                    className="bg-none border-none text-2xl max-md:text-xl font-black text-black w-full outline-none font-['42dot_Sans'] placeholder:text-[#666]"
                    placeholder="0.0"
                    step="0.01"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                  />
                  <div className="flex items-center gap-2 bg-white border-2 border-black p-2 cursor-pointer transition-all duration-300 hover:bg-[#F2F1EF] min-w-[120px] max-md:min-w-[100px]">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center text-lg font-black text-white transition-all duration-300 ${
                      getFromToken() === 'USDC' 
                        ? 'bg-gradient-to-br from-[#2775ca] to-[#1e40af] shadow-[0_2px_8px_rgba(39,117,202,0.3)]' 
                        : 'bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                    }`}>
                      {getFromToken() === 'USDC' ? 'U' : 'A'}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="font-bold text-black font-['42dot_Sans'] text-sm">
                        {getFromToken()}
                      </div>
                    </div>
                    <i className="fas fa-chevron-down text-[#666] text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Convert Direction Button */}
            <div className="relative my-4 flex justify-center">
              <button 
                className={`bg-white border-2 border-black w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 hover:bg-[#F2F1EF] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000000] active:translate-y-0 active:shadow-[2px_2px_0px_#000000] ${isRotating ? 'pointer-events-none' : ''}`}
                onClick={swapTokens}
              >
                <i className={`fas fa-arrow-down text-black text-base transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`}></i>
              </button>
            </div>

            {/* Output Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-black font-['Commit_Mono']">You receive</span>
                <span className="text-xs text-[#666] font-['Commit_Mono']">
                  Balance: <span className="text-black cursor-pointer font-bold font-['42dot_Sans'] hover:underline">
                    {getToBalance()}
                  </span>
                </span>
              </div>
              <div className="relative bg-[#F2F1EF] border-2 border-black p-4 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <input 
                    type="number" 
                    className="bg-none border-none text-2xl max-md:text-xl font-black text-black w-full outline-none font-['42dot_Sans'] placeholder:text-[#666]"
                    placeholder="0.0"
                    step="0.01"
                    value={toAmount}
                    readOnly
                  />
                  <div className="flex items-center gap-2 bg-white border-2 border-black p-2 cursor-pointer transition-all duration-300 hover:bg-[#F2F1EF] min-w-[120px] max-md:min-w-[100px]">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center text-lg font-black text-white transition-all duration-300 ${
                      getToToken() === 'USDC' 
                        ? 'bg-gradient-to-br from-[#2775ca] to-[#1e40af] shadow-[0_2px_8px_rgba(39,117,202,0.3)]' 
                        : 'bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                    }`}>
                      {getToToken() === 'USDC' ? 'U' : 'A'}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="font-bold text-black font-['42dot_Sans'] text-sm">
                        {getToToken()}
                      </div>
                    </div>
                    <i className="fas fa-chevron-down text-[#666] text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="bg-[#F2F1EF] p-4 mb-6 border-2 border-black">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666] font-['Commit_Mono']">Exchange Rate</span>
                <span className="text-sm font-bold text-black font-['42dot_Sans']">{getExchangeRate()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666] font-['Commit_Mono']">Mint Fee</span>
                <span className="text-xs text-green-600 font-bold font-['Commit_Mono']">0.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#666] font-['Commit_Mono']">Minimum Received</span>
                <span className="text-sm font-bold text-black font-['42dot_Sans']">{getMinReceived()}</span>
              </div>
            </div>

            {/* Mint/Redeem Button */}
            <button 
              className={`w-full py-4 border-none rounded-none text-base font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 font-['Commit_Mono'] uppercase ${
                isButtonDisabled
                  ? 'bg-[#E5E5E5] text-[#666] cursor-not-allowed'
                  : currentMode === 'mint'
                    ? 'bg-black text-[#F2F1EF] hover:bg-green-600 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000]'
                    : 'bg-black text-[#F2F1EF] hover:bg-red-600 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000]'
              }`}
              onClick={executeMintRedeem}
              disabled={isButtonDisabled}
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  {currentMode === 'mint' ? 'Minting...' : 'Redeeming...'}
                </>
              ) : fromAmount && parseFloat(fromAmount) > 0 ? (
                <>
                  <i className={`fas ${currentMode === 'mint' ? 'fa-plus-circle' : 'fa-minus-circle'}`}></i>
                  {currentMode === 'mint' ? 'Mint AIUSD' : 'Redeem USDC'}
                </>
              ) : (
                <>
                  <i className="fas fa-plus-circle"></i>
                  Enter Amount
                </>
              )}
            </button>

            {/* Network Information */}
            <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-green-50 border-2 border-green-600">
              <div className="w-5 h-5 bg-green-600 flex items-center justify-center text-white text-xs font-bold font-['Commit_Mono']">
                B
              </div>
              <span className="text-sm text-green-800 font-bold font-['42dot_Sans']">
                Base Network
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
