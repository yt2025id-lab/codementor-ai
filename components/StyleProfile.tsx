"use client";

import { StyleProfile as StyleProfileType } from "@/lib/styleAnalyzer";

interface StyleProfileProps {
  profile: StyleProfileType | null;
  summary: string;
}

export default function StyleProfile({ profile, summary }: StyleProfileProps) {
  if (!profile) {
    return (
      <div className="border-t border-gray-800 p-4 bg-gray-900/80">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
          <span className="text-sm">Waiting for code to analyze style...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-800 p-4 bg-gray-900/80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          Your Coding Style
          <svg className="w-4 h-4 text-purple-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
          </svg>
        </h3>
        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded flex items-center gap-1.5 animate-pulse">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          <span>Learned</span>
        </span>
      </div>

      <div className="space-y-1.5">
        {summary.split("\n").map((line, idx) => (
          <div key={idx} className="text-xs text-gray-400 flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="flex-1">{line.replace("✓ ", "")}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          AI adapts responses to match your style
        </p>
        <button
          onClick={() => {
            const dataStr = JSON.stringify(profile, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "codementor-style-profile.json";
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-xs font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
