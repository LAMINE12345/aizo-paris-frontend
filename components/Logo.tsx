import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <img 
      src="/images/logo.png" 
      alt="AIZO PARIS" 
      className={`${className} object-contain`} 
    />
  );
};

export default Logo;