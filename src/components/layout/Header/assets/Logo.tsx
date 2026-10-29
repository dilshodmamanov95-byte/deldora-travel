// src/components/layout/Header/assets/Logo.tsx
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="120" 
    height="120" 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Gradient Definitions */}
    <defs>
      <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E3A8A" />
        <stop offset="50%" stop-color="#7C3AED" />
        <stop offset="100%" stop-color="#F472B6" />
      </linearGradient>
      <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
    </defs>

    {/* Outer Circle (Stroke with gradient) */}
    <circle cx="60" cy="60" r="55" fill="none" stroke="url(#logoGradient1)" strokeWidth="2" />

    {/* Letter D (Left part) */}
    <path 
      d="M25 25 L25 95 Q25 95 40 95 L55 80 Q60 75 55 65 L40 55 Q45 50 40 45 L25 45 Q25 45 25 35 Q25 30 35 25 L50 25 Q55 25 55 35 L50 45 Q45 50 50 55 L55 65 Q60 70 55 75 L50 80 Q45 85 40 85 L25 85 Z"
      fill="url(#logoGradient2)" 
    />

    {/* Letter L (Right part) */}
    <path 
      d="M65 25 L85 25 L85 45 L70 45 L70 65 L85 65 L85 85 L75 85 L75 95 L65 95 L65 25 Z"
      fill="url(#logoGradient1)" 
    />

    {/* Airplane trajectory (line from D to L) */}
    <path 
      d="M55 40 Q60 35 65 40 Q70 45 65 50"
      stroke="#F472B6" 
      strokeWidth="3" 
      fill="none" 
      strokeLinecap="round" 
    />

    {/* Airplane (arrow) */}
    <path 
      d="M65 45 L70 40 L65 35 L68 42 L65 45 Z"
      fill="#F472B6" 
    />
  </svg>
);

export default Logo;
