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
          {/* 左侧菜单侧边栏 - 可折叠 */}
          <aside className="w-12 hover:w-40 bg-[#1A1A1A] text-white h-[calc(100vh-100px)] fixed left-0 top-25 overflow-y-auto border-r border-gray-800 transition-all duration-300">
            <div className="p-4 border-b border-gray-800 flex items-center justify-center">
              <Image 
                src="/home/homelogo.svg" 
                alt="LOKA Logo" 
                width={24} 
                height={24} 
                className="text-white" 
              />
            </div>
            
            <nav className="py-4">
              <Link href="/main" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">📊</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">PORTFOLIO</span>
              </Link>
              
              <Link href="/main/buy-stake" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">💰</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">BUY/STAKE</span>
              </Link>
              
              <Link href="/main/dashboard" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">📈</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">DASHBOARD</span>
              </Link>
              
              <Link href="/main/reserves" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">💼</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">RESERVES</span>
              </Link>
              
              <Link href="/main/borrow" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">🏦</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">BORROW</span>
              </Link>
              
              <Link href="/main/loans" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">💸</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">LOANS</span>
              </Link>
              
              <Link href="/main/help-center" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">❓</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">HELP CENTER</span>
              </Link>
              
              <Link href="/main/docs" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">📚</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">DOCS</span>
              </Link>
              
              <Link href="/main/blog" className="flex items-center justify-center gap-3 p-4 hover:bg-gray-800 transition-colors">
                <span className="w-5 h-5 text-white">📝</span>
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">BLOG</span>
              </Link>
            </nav>
          </aside>
          
          {/* 右侧内容区 */}
          <main className="flex-1 ml-12 p-6 transition-all duration-300">
            {children}
          </main>
        </div>
    </div>
  );
}