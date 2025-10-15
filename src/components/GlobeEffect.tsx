'use client';

import { useEffect, useRef } from 'react';

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}


interface GlobeControls {
  enableZoom: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  enableDamping: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
}


interface GlobeInstance {
  backgroundColor: (color: string) => GlobeInstance;
  width: (width: number) => GlobeInstance;
  height: (height: number) => GlobeInstance;
  enablePointerInteraction: (enabled: boolean) => GlobeInstance;
  showGlobe: (show: boolean) => GlobeInstance;
  showAtmosphere: (show: boolean) => GlobeInstance;
  arcsData: (data: ArcData[]) => GlobeInstance;
  arcColor: (color: string | ((arc: ArcData) => string)) => GlobeInstance;
  arcDashLength: (length: number | (() => number)) => GlobeInstance;
  arcDashGap: (gap: number | (() => number)) => GlobeInstance;
  arcDashAnimateTime: (time: number | (() => number)) => GlobeInstance;
  polygonsData: (data: unknown) => GlobeInstance;
  polygonCapMaterial: (material: unknown) => GlobeInstance;
  polygonSideColor: (color: string | (() => string)) => GlobeInstance;
  controls: GlobeControls;
  pauseAnimation: () => void;
}

export default function GlobeEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const initGlobe = async () => {
      const Globe = (await import('globe.gl')).default;
      
      const generateArcsData = (): ArcData[] => {
        const N = 20;
        const colors = ['red', 'white', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'];
        const arcs: ArcData[] = [];
        
        for (let i = 0; i < N; i++) {
          arcs.push({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [
              colors[Math.floor(Math.random() * colors.length)],
              colors[Math.floor(Math.random() * colors.length)]
            ]
          });
        }
        return arcs;
      };

      const arcsData = generateArcsData();

      
      const rect = container.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 600;

      container.style.opacity = '0';
      container.style.transition = 'opacity 1.5s ease-in-out';

      globeRef.current = new Globe(container) as unknown as GlobeInstance;
      globeRef.current
        .backgroundColor('#F2F1EF')
        .width(width)
        .height(height)
        .enablePointerInteraction(false)
        .showGlobe(false)
        .showAtmosphere(false)
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(() => Math.random())
        .arcDashGap(() => Math.random())
        .arcDashAnimateTime(() => Math.random() * 4000 + 500);

      
      const loadHollowGlobe = async () => {
        try {
          const { MeshLambertMaterial, DoubleSide } = await import('three');
          
          const response = await fetch('//cdn.jsdelivr.net/npm/world-atlas/land-110m.json');
          const landTopo = await response.json();

          const topojson = await import('topojson-client');
          
          const landFeatures = topojson.feature(landTopo, landTopo.objects.land);
          if (landFeatures && 'features' in landFeatures && globeRef.current) {
            globeRef.current
              .polygonsData(landFeatures.features)
              .polygonCapMaterial(new MeshLambertMaterial({ 
                color: 'black', 
                side: DoubleSide 
              }))
              .polygonSideColor(() => 'rgba(0,0,0,0)');
          }
          
          setTimeout(() => {
            container.style.opacity = '1';
          }, 100);
        } catch (error) {
          console.error('Failed to load globe:', error);
          setTimeout(() => {
            container.style.opacity = '1';
          }, 100);
        }
      };

      await loadHollowGlobe();

      
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const handleMouseEnter = () => {
        container.addEventListener('wheel', handleWheel, { passive: false });
      };

      const handleMouseLeave = () => {
        container.removeEventListener('wheel', handleWheel);
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      
      if (globeRef.current && globeRef.current.controls) {
        const controls = globeRef.current.controls as GlobeControls;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;
        controls.enableDamping = false;
      }

      
      let lastFrameTimestamp = 0;
      const frameInterval = 1000 / 60;

      const animate = () => {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastFrameTimestamp;
        
        if (deltaTime < frameInterval) {
          animationIdRef.current = requestAnimationFrame(animate);
          return;
        }

        
        if (globeRef.current && globeRef.current.controls) {
          const controls = globeRef.current.controls as GlobeControls;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableRotate = false;
        }

        lastFrameTimestamp = currentTime;
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    initGlobe();

    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (globeRef.current) {
        globeRef.current.pauseAnimation();
      }

      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center"
    />
  );
}

