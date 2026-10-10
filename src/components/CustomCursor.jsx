import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const trailRef = useRef(null);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsMobile(!hasHover);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // Set cursor active body class for pointer styles
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic hover detection for clickable elements
    const handleMouseEnterInteractive = () => setIsHovered(true);
    const handleMouseLeaveInteractive = () => setIsHovered(false);

    const updateInteractiveListeners = () => {
      const selectables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-element');
      selectables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    // Run initially and set a MutationObserver to watch for DOM updates (e.g. state changes)
    updateInteractiveListeners();
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
      
      const selectables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-element');
      selectables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  // Trail physics simulation loop
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let frameId;
    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.16, // Ease factor for standard trailing effect
          y: prev.y + dy * 0.16,
        };
      });
      frameId = requestAnimationFrame(animateTrail);
    };

    frameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(frameId);
  }, [position, isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Glow Trail Ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-purple/40 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          backgroundColor: isHovered ? 'rgba(159, 161, 255, 0.12)' : 'transparent',
          borderColor: isHovered ? 'var(--color-brand-mint)' : 'rgba(159, 161, 255, 0.4)',
        }}
        id="custom-cursor-trail"
      />
      {/* Inner Pinpoint Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-sky rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0.5 : 1})`,
        }}
        id="custom-cursor-dot"
      />
    </>
  );
}
