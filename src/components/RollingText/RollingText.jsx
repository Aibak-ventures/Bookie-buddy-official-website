import { useRef } from 'react';
import useRollingText from '../../hooks/useRollingText';

const RollingText = ({ phrases = ['Growing', 'Automate', 'Transform', 'Scaling', 'Simplify', 'Manage'] }) => {
  const containerRef = useRef(null);
  useRollingText(containerRef);

  return (
    <span className="rolling-text" ref={containerRef}>
      {phrases.map((text, idx) => (
        <span key={idx} className="text-gradient">{text}</span>
      ))}
    </span>
  );
};

export default RollingText;
