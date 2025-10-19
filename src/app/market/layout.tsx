import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <Navbar currentPage="trade" />
      
      {/* 主体内容区 - 左右布局 */}
      <div className="flex flex-1">
        {/* 左侧菜单侧边栏 */}
        <aside className="w-12 overflow-hidden hover:w-40 bg-black text-white left-0 top-25 overflow-y-auto border-r border-gray-800 transition-all duration-300">          
          <nav className="py-4">
            <Link href="/market" className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors">
              <span className="w-5 h-5 text-white">📊</span>
              <span>CASHFLOW FINANCING</span>
            </Link>
            
            <Link href="/market/buy-stake" className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors">
              <span className="w-5 h-5 text-white">💰</span>
              <span>BUY/STAKE</span>
            </Link>
            
            <Link href="/market/chain" className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors">
              <span className="w-5 h-5 text-white">📈</span>
              <span>CHAIN</span>
            </Link>
          </nav>
        </aside>
        
        {/* 右侧内容区 */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}