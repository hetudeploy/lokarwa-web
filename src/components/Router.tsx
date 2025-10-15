'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
  const router = useRouter();
  // const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      // setCurrentPath(path);
      
      if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/trade') {
        router.push('/trade');
      } else if (path === '/swap') {
        router.push('/swap');
      } else if (path.startsWith('/contact')) {
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

    window.addEventListener('popstate', handlePopState);
    
    // setCurrentPath(window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return <>{children}</>;
}
