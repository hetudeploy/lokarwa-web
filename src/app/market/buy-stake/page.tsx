'use client';
import React, { useState } from 'react';

export default function BuyStakePage() {
  const [activeTab, setActiveTab] = useState('bridge');
  const [approveChecked, setApproveChecked] = useState(false);
  const [stakeSubTab, setStakeSubTab] = useState('stake');
  const [amount, setAmount] = useState('');
  const [usdaiAmount, setUsdaiAmount] = useState('');

  return (
    <div className="bg-white min-h-full p-6">


      {/* 标签页 */}
      <div className="flex border border-gray-200 rounded-md overflow-hidden mb-6">
        <button
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'buy' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('buy')}
        >
          BUY
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'stake' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('stake')}
        >
          STAKE
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'bridge' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('bridge')}
        >
          BRIDGE
        </button>
      </div>

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <span className="text-blue-500 mr-2">ℹ️</span>
          <p className="text-sm text-blue-700">
            {activeTab === 'stake' 
              ? 'The sUSDai unstaking period is approximately 30 days.' 
              : activeTab === 'bridge'
                ? 'Bridging can take up to 15 minutes.'
                : 'USDai does not accrue yield, but earns Allo™. Stake USDai to earn yield & Allo™.'
            }
          </p>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* 交易表单 */}
        <div className="flex-1 border border-gray-200 rounded-md p-6">
          {/* Stake/Unstake 子标签 - 仅在Stake主标签显示 */}
          {activeTab === 'stake' && (
            <div className="flex border border-gray-200 rounded-md overflow-hidden mb-6">
              <button
                className={`flex-1 py-2 px-4 font-medium text-sm ${stakeSubTab === 'stake' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setStakeSubTab('stake')}
              >
                Stake
              </button>
              <button
                className={`flex-1 py-2 px-4 font-medium text-sm ${stakeSubTab === 'unstake' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setStakeSubTab('unstake')}
              >
                Unstake
              </button>
            </div>
          )}
          
          {activeTab === 'bridge' ? (
            // Bridge 表单
            <>
              {/* Arbitrum USDai 输入区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">USDai</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/window.svg" alt="USDai" className="w-4 h-4 mr-2" />
                      <span className="font-medium">USDai</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <span className="text-xs">Arbitrum</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none"
                      value={usdaiAmount}
                      onChange={(e) => setUsdaiAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium">$0.00</span>
                </div>
              </div>

              {/* 分隔箭头 */}
              <div className="flex justify-center mb-6">
                <button className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="transform rotate-90">↔️</span>
                </button>
              </div>

              {/* Plasma USDai 输出区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">USDai</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/window.svg" alt="USDai" className="w-4 h-4 mr-2" />
                      <span className="font-medium">USDai</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <span className="text-xs">Plasma</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none bg-gray-50"
                      value={usdaiAmount ? usdaiAmount : '0'}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium">$0.00</span>
                </div>
              </div>
            </>
          ) : activeTab === 'stake' ? (
            // Stake 表单
            <>
              {/* USDai 输入区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">USDai</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/window.svg" alt="USDai" className="w-4 h-4 mr-2" />
                      <span className="font-medium">USDai</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <span className="text-xs">Arbitrum</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none"
                      value={usdaiAmount}
                      onChange={(e) => setUsdaiAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium">$0.00</span>
                </div>
              </div>

              {/* 分隔箭头 */}
              <div className="flex justify-center mb-6">
                <button className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="transform rotate-90">↔️</span>
                </button>
              </div>

              {/* sUSDai 输出区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">sUSDai</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/window.svg" alt="sUSDai" className="w-4 h-4 mr-2" />
                      <span className="font-medium">sUSDai</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <span className="text-xs">Arbitrum</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none bg-gray-50"
                      value={usdaiAmount ? usdaiAmount : '0'}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium">$0.00</span>
                </div>
              </div>

              {/* 交易信息 */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Exchange:</span>
                  <span>--- USDai ↔ --- sUSDai</span>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <span className="mr-2">✓</span>
                  <span>Eligible for Allo™</span>
                </div>
              </div>
            </>
          ) : (
            // Buy 表单 (原有内容)
            <>
              {/* 输入区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">From</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/file.svg" alt="USDT" className="w-4 h-4 mr-2" />
                      <span className="font-medium">USDT</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <img src="/globe.svg" alt="Plasma" className="w-4 h-4 mr-1" />
                      <span className="text-xs">Plasma</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* 交换箭头 */}
              <div className="flex justify-center mb-6">
                <button className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="transform rotate-90">↔️</span>
                </button>
              </div>

              {/* 输出区域 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500">To</label>
                  <button className="text-sm text-blue-600 hover:underline">Balance: -</button>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                      <img src="/window.svg" alt="USDai" className="w-4 h-4 mr-2" />
                      <span className="font-medium">USDai</span>
                      <span className="ml-2 text-gray-500 text-xs">↓</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 ml-2">
                      <span className="text-xs">Arbitrum</span>
                    </div>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 text-lg font-medium focus:outline-none bg-gray-50"
                      value={amount ? amount : '0'}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* 金额显示 */}
              <div className="mb-6">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-500">Total USDai</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              {/* 交易信息 */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Exchange:</span>
                  <span>--- USDT ↔ --- USDai</span>
                </div>
                <div className="flex justify-between">
                  <span>Exch. Amount:</span>
                  <span>0 USDai</span>
                </div>
                <div className="flex justify-between">
                  <span>Fees (0.01% + Bridge)</span>
                  <span className="text-red-500">0 USDai</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 交易详情 */}
        <div className="w-full md:w-80 border border-gray-200 rounded-md p-6">
          <h3 className="text-lg font-medium mb-6">Transaction Details</h3>
          
          <div className="space-y-4">
            {activeTab === 'bridge' ? (
              // Bridge 交易详情
              <>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                     <input
                        type="checkbox"
                        id="approve"
                        checked={approveChecked}
                        onChange={(e) => setApproveChecked(e.target.checked)}
                        className="mr-2 w-4 h-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                      />
                      <label htmlFor="approve" className="text-sm font-medium cursor-pointer">
                        Bridge USDai
                      </label>
                  </div>
                </div>

                <button
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-md font-medium disabled:opacity-50"
                  disabled={!approveChecked || !usdaiAmount}
                >
                  Bridge
                </button>
              </>
            ) : activeTab === 'stake' ? (
              // Stake 交易详情
              <>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                     <input
                        type="checkbox"
                        id="approve"
                        checked={approveChecked}
                        onChange={(e) => setApproveChecked(e.target.checked)}
                        className="mr-2 w-4 h-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                      />
                      <label htmlFor="approve" className="text-sm font-medium cursor-pointer">
                        Approve USDai
                      </label>
                  </div>
                </div>

                <button
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-md font-medium disabled:opacity-50"
                  disabled={!approveChecked || !usdaiAmount}
                >
                  Stake USDai
                </button>
                
                <button
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-300"
                >
                  Approve
                </button>
              </>
            ) : (
              // Buy 交易详情 (原有内容)
              <>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                     <input
                        type="checkbox"
                        id="approve"
                        checked={approveChecked}
                        onChange={(e) => setApproveChecked(e.target.checked)}
                        className="mr-2 w-4 h-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                      />
                      <label htmlFor="approve" className="text-sm font-medium cursor-pointer">
                        Approve USDT
                      </label>
                  </div>
                </div>

                <button
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-md font-medium disabled:opacity-50"
                  disabled={!approveChecked || !amount}
                >
                  Buy USDai
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}