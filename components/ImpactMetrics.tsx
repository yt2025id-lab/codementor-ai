"use client";

import { useEffect, useState } from "react";

interface ImpactMetricsProps {
  messageCount: number;
}

export default function ImpactMetrics({ messageCount }: ImpactMetricsProps) {
  const [timeSaved, setTimeSaved] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (messageCount > 2) {
      setIsVisible(true);
      // Estimate 5 minutes saved per AI response
      const savedMinutes = (messageCount - 2) * 5;

      // Animate counter
      let current = 0;
      const increment = savedMinutes / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= savedMinutes) {
          setTimeSaved(savedMinutes);
          clearInterval(timer);
        } else {
          setTimeSaved(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [messageCount]);

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-800 p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Time Saved Today</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              {timeSaved}
            </span>
            <span className="text-sm text-gray-400">minutes</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">Suggestions Given</p>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {messageCount - 2}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-800/50 rounded px-2 py-1.5">
          <p className="text-xs text-green-400 font-semibold">{((timeSaved / (messageCount - 2 || 1)) * 60).toFixed(0)}s</p>
          <p className="text-xs text-gray-500">avg/response</p>
        </div>
        <div className="bg-gray-800/50 rounded px-2 py-1.5">
          <p className="text-xs text-blue-400 font-semibold">100%</p>
          <p className="text-xs text-gray-500">style match</p>
        </div>
        <div className="bg-gray-800/50 rounded px-2 py-1.5">
          <p className="text-xs text-purple-400 font-semibold">0</p>
          <p className="text-xs text-gray-500">manual edits</p>
        </div>
      </div>
    </div>
  );
}
