import React from 'react';
import { motion } from 'framer-motion';
interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}
export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 10
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percentage / 100 * circumference;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size
      }}>

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30" />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{
            strokeDashoffset: circumference
          }}
          animate={{
            strokeDashoffset: offset
          }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
          style={{
            strokeDasharray: circumference
          }} />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Done
        </span>
      </div>
    </div>);

}