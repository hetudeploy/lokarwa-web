'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage = '' }: NavbarProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isMobileDropdownActive, setIsMobileDropdownActive] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  const tradeDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseInDropdown = useRef(false);
  const isMouseInButton = useRef(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;

      if (scrollY > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);


  const showDropdownMenu = () => {
    if (tradeDropdownRef.current && dropdownMenuRef.current) {
      const buttonRect = tradeDropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.left + buttonRect.width / 2,
      });
      setIsDropdownVisible(true);
      cancelHideDropdown();
    }
  };

  const hideDropdownMenu = () => {
    setIsDropdownVisible(false);
  };

  const scheduleHideDropdown = useCallback(() => {
    cancelHideDropdown();
    hideTimeoutRef.current = setTimeout(() => {
      if (isDropdownVisible) {
        hideDropdownMenu();
      }
    }, 200);
  }, [isDropdownVisible]);

  const cancelHideDropdown = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };


  const navigateToPage = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else if (page === 'cashflow') {
      router.push('/market/cashflow');
    } else if (page === 'buyStake') {
      router.push('/market/buy-stake');
    } else if (page === 'chain') {
      router.push('/market/chain');
    } else if (page === 'contact') {
      if (window.location.pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          const target = document.querySelector('#contact');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const target = document.querySelector('#contact');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };


  const handleNavButtonClick = (page: string) => {
    navigateToPage(page);
  };


  const handleDropdownItemClick = (page: string) => {
    navigateToPage(page);
    hideDropdownMenu();
  };


  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownActive(!isMobileDropdownActive);
  };

  const handleMobileMenuItemClick = (page: string) => {
    if (page === 'trade') {
      toggleMobileDropdown();
      return;
    }
    setIsMobileMenuActive(false);
    navigateToPage(page);
  };

  const handleMobileDropdownItemClick = (page: string) => {
    setIsMobileMenuActive(false);
    setIsMobileDropdownActive(false);
    navigateToPage(page);
  };


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDropdownVisible || !tradeDropdownRef.current || !dropdownMenuRef.current) return;

      const buttonRect = tradeDropdownRef.current.getBoundingClientRect();
      const dropdownRect = dropdownMenuRef.current.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      const inButton = x >= buttonRect.left && x <= buttonRect.right && 
                     y >= buttonRect.top && y <= buttonRect.bottom;
      const inDropdown = x >= dropdownRect.left && x <= dropdownRect.right && 
                       y >= dropdownRect.top && y <= dropdownRect.bottom;

      if (inButton || inDropdown) {
        if (hideTimeoutRef.current) {
          cancelHideDropdown();
        }
      } else {
        if (!hideTimeoutRef.current) {
          scheduleHideDropdown();
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isDropdownVisible, scheduleHideDropdown]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      

      if (dropdownMenuRef.current && tradeDropdownRef.current) {
        if (!tradeDropdownRef.current.contains(target) && !dropdownMenuRef.current.contains(target)) {
          hideDropdownMenu();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleGetStarted = () => {
    window.open('https://github.com/loka-network', '_blank');
  };

  return (
    <>
      <nav className={`relative top-0 left-0 w-full h-[100px] bg-transparent z-[1000] flex items-center justify-start p-0 m-0 overflow-visible max-md:fixed max-md:h-20 max-md:bg-[#F6F5F1] max-md:shadow-[0_2px_8px_rgba(0,0,0,0.1)] ${isScrolled ? 'scrolled' : ''}`}>
        <div className="w-full h-full flex items-center justify-start relative z-[1001]">
          <div className="flex h-full w-full relative justify-between bg-black pr-10">
            <div className="nav-trapezoid h-full flex-1 flex items-center justify-center relative z-10 min-w-0">
              <div className="flex max-md:hidden items-center gap-5 h-full w-full px-10 flex-nowrap relative z-[1005] xl:gap-[60px] xl:px-[60px] lg:gap-3 lg:px-[69px] md:gap-2.5 md:px-5 sm:gap-2 sm:px-[15px]">
                <div
                  className={`nav-button relative flex items-center justify-center cursor-pointer transition-all duration-300 h-[50px] min-w-[120px] max-w-[140px] px-[15px] hover:scale-105 xl:min-w-[110px] xl:max-w-[120px] xl:px-3 lg:min-w-[100px] lg:max-w-[110px] lg:h-[45px] lg:px-2.5 md:min-w-[90px] md:max-w-[100px] md:h-[42px] md:px-2 sm:min-w-20 sm:max-w-[90px] sm:h-10 sm:px-1.5 ${
                    currentPage === 'home' ? 'active' : ''
                  }`}
                  onClick={() => handleNavButtonClick('home')}
                >
                  <div 
                    className={`button-bg absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center z-[1] transition-all duration-300 cursor-pointer ${
                      currentPage === 'home' ? "bg-[url('/home/navbar-hover.svg')]" : "bg-[url('/home/navbar.svg')]"
                    }`}
                    role="button" 
                    tabIndex={0} 
                    aria-label="Home"
                  ></div>
                  <span className={`button-text relative z-[2] font-normal text-base font-['Commit_Mono'] uppercase tracking-[0.5px] text-center pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis xl:text-[11px] lg:text-[10px] md:text-[9px] sm:text-[8px] ${
                    currentPage === 'home' ? 'text-black' : 'text-[#F6F5F1]'
                  }`}>
                    HOME
                  </span>
                </div>


                <div
                  ref={tradeDropdownRef}
                  className={`nav-button trade-dropdown relative flex items-center justify-center cursor-pointer transition-all duration-300 h-[50px] min-w-[120px] max-w-[140px] px-[15px] hover:scale-105 z-[9999] xl:min-w-[110px] xl:max-w-[120px] xl:px-3 lg:min-w-[100px] lg:max-w-[110px] lg:h-[45px] lg:px-2.5 md:min-w-[90px] md:max-w-[100px] md:h-[42px] md:px-2 sm:min-w-20 sm:max-w-[90px] sm:h-10 sm:px-1.5 ${
                    currentPage === 'trade' || currentPage === 'swap' ? 'active' : ''
                  }`}
                  onMouseEnter={showDropdownMenu}
                  onMouseLeave={() => {
                    isMouseInButton.current = false;
                    setTimeout(() => {
                      if (!isMouseInButton.current && !isMouseInDropdown.current) {
                        scheduleHideDropdown();
                      }
                    }, 50);
                  }}
                >
                  <div 
                    className={`button-bg absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center z-[1] transition-all duration-300 cursor-pointer ${
                      currentPage === 'trade' || currentPage === 'swap' ? "bg-[url('/home/navbar-hover.svg')]" : "bg-[url('/home/navbar.svg')]"
                    }`}
                    role="button" 
                    tabIndex={0} 
                    aria-label="Market"
                  ></div>
                  <span className={`button-text relative z-[2] font-normal text-base font-['Commit_Mono'] uppercase tracking-[0.5px] text-center pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis xl:text-[11px] lg:text-[10px] md:text-[9px] sm:text-[8px] ${
                    currentPage === 'trade' || currentPage === 'swap' ? 'text-black' : 'text-[#F6F5F1]'
                  }`}>
                    MARKET
                  </span>
                  <div className="dropdown-arrow absolute top-1/2 right-2.5 -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#F6F5F1] transition-all duration-300"></div>
                </div>

                <div
                  className={`nav-button relative flex items-center justify-center cursor-pointer transition-all duration-300 h-[50px] min-w-[120px] max-w-[140px] px-[15px] hover:scale-105 xl:min-w-[110px] xl:max-w-[120px] xl:px-3 lg:min-w-[100px] lg:max-w-[110px] lg:h-[45px] lg:px-2.5 md:min-w-[90px] md:max-w-[100px] md:h-[42px] md:px-2 sm:min-w-20 sm:max-w-[90px] sm:h-10 sm:px-1.5 ${
                    currentPage === 'contact' ? 'active' : ''
                  }`}
                  onClick={() => handleNavButtonClick('contact')}
                >
                  <div 
                    className={`button-bg absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center z-[1] transition-all duration-300 cursor-pointer ${
                      currentPage === 'contact' ? "bg-[url('/home/navbar-hover.svg')]" : "bg-[url('/home/navbar.svg')]"
                    }`}
                    role="button" 
                    tabIndex={0} 
                    aria-label="Contact"
                  ></div>
                  <span className={`button-text relative z-[2] font-normal text-base font-['Commit_Mono'] uppercase tracking-[0.5px] text-center pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis xl:text-[11px] lg:text-[10px] md:text-[9px] sm:text-[8px] ${
                    currentPage === 'contact' ? 'text-black' : 'text-[#F6F5F1]'
                  }`}>
                    CONTACT
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 z-[1002] h-full flex items-center pl-[30px] bg-[#F6F5F1] min-w-[250px] flex-shrink-0 xl:min-w-[220px] xl:pl-[25px] lg:min-w-[200px] lg:pl-5 md:min-w-[180px] md:pl-[18px] sm:min-w-[160px] sm:pl-[15px] max-md:min-w-[140px] max-md:pl-[15px]">
              <Image 
                src="/home/homelogo.svg" 
                alt="LOKA Logo" 
                width={80}
                height={80}
                className="h-20 w-auto object-contain max-w-full xl:h-[70px] lg:h-[65px] md:h-[60px] sm:h-[55px] max-md:h-[55px]" 
              />
            </div>
            <div className='items-center hidden md:flex'>
              <div className="flex justify-end max-md:justify-center">
                <div 
                  className="bg-white text-black border-[3px] border-white rounded-none py-[10px] font-['Commit_Mono'] text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[160px] uppercase tracking-wide shadow-[8px_8px_0px_#000000] hover:bg-black hover:text-[#F2F1EF] hover:-translate-y-0.5 max-md:py-3.5 max-md:px-6 max-md:text-base max-md:min-w-[180px] max-sm:py-[0.875rem] max-sm:px-6 max-sm:text-base max-sm:min-w-[180px] max-[360px]:py-[0.7rem] max-[360px]:px-4 max-[360px]:text-[0.85rem] max-[360px]:min-w-[140px]"
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
          </div>
          {/* Mobile Menu Button */}
          <div
            className={`md:hidden flex flex-col cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-[1001] bg-black/80 p-2 rounded transition-all duration-300 hover:bg-black hover:scale-105 ${
              isMobileMenuActive ? 'hamburger-active' : ''
            }`}
            onClick={toggleMobileMenu}
          >
            <span className={`w-[25px] h-[3px] bg-white my-[3px] transition-all duration-300 rounded ${
              isMobileMenuActive ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''
            }`}></span>
            <span className={`w-[25px] h-[3px] bg-white my-[3px] transition-all duration-300 rounded ${
              isMobileMenuActive ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-[25px] h-[3px] bg-white my-[3px] transition-all duration-300 rounded ${
              isMobileMenuActive ? '-rotate-45 translate-x-[7px] -translate-y-[6px]' : ''
            }`}></span>
          </div>
        </div>

        <div className={`md:hidden fixed top-20 left-0 right-0 bottom-0 bg-[#F6F5F1] z-[1000] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          isMobileMenuActive ? 'block visible opacity-100' : 'hidden invisible opacity-0'
        }`}>
          <div
            className={`block p-4 mb-2 text-base font-medium rounded-lg transition-all duration-300 cursor-pointer hover:translate-x-[5px] ${
              currentPage === 'home' ? 'bg-black text-white rounded-r-[20px] rounded-l-none' : 'text-[#333333]'
            }`}
            onClick={() => handleMobileMenuItemClick('home')}
          >
            <span className="font-['Commit_Mono'] uppercase tracking-[0.5px]">HOME</span>
          </div>

          <div
            className={`relative flex justify-between items-center block p-4 mb-2 text-base font-medium rounded-lg transition-all duration-300 cursor-pointer ${
              currentPage === 'trade' || currentPage === 'swap' ? 'bg-black text-white' : 'text-[#333333]'
            }`}
            onClick={() => handleMobileMenuItemClick('trade')}
          >
            <span className="font-['Commit_Mono'] uppercase tracking-[0.5px]">MARKET</span>
            <span className={`text-xs transition-all duration-300 ml-auto ${
              currentPage === 'trade' || currentPage === 'swap' ? 'text-white' : 'text-[#333333]'
            }`}>
              {isMobileDropdownActive ? '▲' : '▼'}
            </span>
            
            <div className={`mt-2 ml-0 w-full bg-black rounded-lg p-2 ${
              isMobileDropdownActive ? 'block' : 'hidden'
            } ${!(currentPage === 'trade' || currentPage === 'swap') && isMobileDropdownActive ? 'bg-[#F6F5F1]' : ''}`}>
              <div
                className={`p-2.5 mb-[3px] text-[13px] font-normal text-white rounded transition-all duration-300 cursor-pointer border-l-3 border-l-transparent ml-[15px] hover:bg-white/10 hover:translate-x-[3px] hover:border-l-white ${
                  !(currentPage === 'trade' || currentPage === 'swap') && isMobileDropdownActive ? 'text-[#333333] hover:bg-black/10 hover:text-black' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileDropdownItemClick('trade');
                }}
              >
                <span className="font-['Commit_Mono'] uppercase tracking-[0.3px] text-sm">PLATFORM</span>
              </div>
              <div
                className={`p-2.5 mb-0 text-[13px] font-normal text-white rounded transition-all duration-300 cursor-pointer border-l-3 border-l-transparent ml-[15px] hover:bg-white/10 hover:translate-x-[3px] hover:border-l-white ${
                  !(currentPage === 'trade' || currentPage === 'swap') && isMobileDropdownActive ? 'text-[#333333] hover:bg-black/10 hover:text-black' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileDropdownItemClick('swap');
                }}
              >
                <span className="font-['Commit_Mono'] uppercase tracking-[0.3px] text-sm">SWAP</span>
              </div>
            </div>
          </div>

          <div
            className={`block p-4 mb-2 text-base font-medium rounded-lg transition-all duration-300 cursor-pointer hover:translate-x-[5px] ${
              currentPage === 'contact' ? 'bg-black text-white rounded-r-[20px] rounded-l-none' : 'text-[#333333]'
            }`}
            onClick={() => handleMobileMenuItemClick('contact')}
          >
            <span className="font-['Commit_Mono'] uppercase tracking-[0.5px]">CONTACT</span>
          </div>
        </div>
      </nav>

      <div
        ref={dropdownMenuRef}
        className="fixed bg-black min-w-[140px] h-[185px] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-2 border border-white/10 backdrop-blur-[10px] transition-all duration-300"
        style={{
          display: isDropdownVisible ? 'block' : 'none',
          opacity: isDropdownVisible ? '1' : '0',
          visibility: isDropdownVisible ? 'visible' : 'hidden',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          transform: 'translateX(-50%)',
          zIndex: isDropdownVisible ? '10000' : '-1',
          pointerEvents: isDropdownVisible ? 'auto' : 'none',
        }}
        onMouseEnter={() => {
          isMouseInDropdown.current = true;
          cancelHideDropdown();
        }}
        onMouseLeave={() => {
          isMouseInDropdown.current = false;
          setTimeout(() => {
            if (!isMouseInButton.current && !isMouseInDropdown.current) {
              hideDropdownMenu();
            }
          }, 50);
        }}
      >
        <div 
          className="dropdown-item p-[18px_20px] cursor-pointer transition-all duration-300 border-b border-white/10 h-[52px] flex items-center justify-center relative mb-2 rounded overflow-hidden hover:bg-transparent hover:translate-x-[5px] hover:border hover:border-white/20"
          onClick={() => handleDropdownItemClick('cashflow')}
        >
          <span className="text-[#F6F5F1] font-['Commit_Mono'] text-sm font-medium uppercase tracking-[0.5px] whitespace-nowrap leading-none relative z-[1] transition-all duration-300 hover:text-black hover:scale-105">
            CASHFLOW FINANCING
          </span>
        </div>
        <div 
          className="dropdown-item p-[18px_20px] cursor-pointer transition-all duration-300 h-[52px] flex items-center justify-center relative mb-0 rounded overflow-hidden hover:bg-transparent hover:translate-x-[5px] hover:border hover:border-white/20"
          onClick={() => handleDropdownItemClick('buyStake')}
        >
          <span className="text-[#F6F5F1] font-['Commit_Mono'] text-sm font-medium uppercase tracking-[0.5px] whitespace-nowrap leading-none relative z-[1] transition-all duration-300 hover:text-black hover:scale-105">
            BUY/STAKE
          </span>
        </div>
                <div 
          className="dropdown-item p-[18px_20px] cursor-pointer transition-all duration-300 h-[52px] flex items-center justify-center relative mb-0 rounded overflow-hidden hover:bg-transparent hover:translate-x-[5px] hover:border hover:border-white/20"
          onClick={() => handleDropdownItemClick('chain')}
        >
          <span className="text-[#F6F5F1] font-['Commit_Mono'] text-sm font-medium uppercase tracking-[0.5px] whitespace-nowrap leading-none relative z-[1] transition-all duration-300 hover:text-black hover:scale-105">
            CHAIN
          </span>
        </div>
      </div>
    </>
  );
}

