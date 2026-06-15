import { useEffect, useRef } from 'react';

const RollingText = ({ phrases }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const spans = container.querySelectorAll('span');
    if (!spans.length) return;
    // ... the same logic from rolling-text.js, but using spans and container
    // Set width, start interval, etc.
    // Cleanup interval on unmount
  }, [phrases]);

  return (
    <div className="rolling-text" ref={containerRef}>
      {phrases.map((text, idx) => (
        <span key={idx} className="text-gradient">{text}</span>
      ))}
    </div>
  );
};
export default RollingText;