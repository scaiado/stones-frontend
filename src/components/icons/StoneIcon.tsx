import React from 'react';

interface StoneIconProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function StoneIcon({ className = '', size = 64, showText = false }: StoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="100" height="100" rx="20" fill="#1F2937" />
      
      {/* Stones */}
      <g transform="translate(30, 25)">
        <path
          d="M10 30 L25 25 L40 30 L35 40 L15 40 Z"
          fill="#6B7280"
        />
        <path
          d="M20 15 L30 12 L40 15 L35 25 L25 25 Z"
          fill="#9CA3AF"
        />
        <path
          d="M25 0 L30 0 L35 5 L30 10 L25 10 Z"
          fill="#D1D5DB"
        />
      </g>

      {/* Yellow Path */}
      <path
        d="M25 60 Q40 55 45 65 T65 70"
        stroke="#FCD34D"
        strokeWidth="6"
        fill="none"
      />

      {showText && (
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Stones
        </text>
      )}
    </svg>
  );
} 