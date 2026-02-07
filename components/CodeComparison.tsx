"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";

interface CodeComparisonProps {
  original: string;
  optimized: string;
  explanation: string;
}

export default function CodeComparison({ original, optimized, explanation }: CodeComparisonProps) {
  const [view, setView] = useState<"split" | "side-by-side">("side-by-side");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-7xl w-full h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>🔄</span>
                <span>Code Comparison</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Original vs Optimized (matching your style)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setView("side-by-side")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    view === "side-by-side"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Side by Side
                </button>
                <button
                  onClick={() => setView("split")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    view === "split"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Split
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editors */}
        <div className="flex-1 flex overflow-hidden">
          {view === "side-by-side" ? (
            <>
              {/* Original */}
              <div className="flex-1 flex flex-col border-r border-gray-800">
                <div className="p-3 bg-gray-800/50 border-b border-gray-800">
                  <h3 className="text-sm font-semibold text-red-400">Original Code</h3>
                </div>
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={original}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Optimized */}
              <div className="flex-1 flex flex-col">
                <div className="p-3 bg-gray-800/50 border-b border-gray-800">
                  <h3 className="text-sm font-semibold text-green-400">Optimized (Your Style)</h3>
                </div>
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={optimized}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                value={`${original}\n\n/* ========== OPTIMIZED VERSION ========== */\n\n${optimized}`}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: true },
                  fontSize: 14,
                }}
              />
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-2">Why it's better:</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{explanation}</p>
        </div>
      </div>
    </div>
  );
}
