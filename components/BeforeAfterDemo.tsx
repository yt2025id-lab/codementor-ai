"use client";

import { useState } from "react";

export default function BeforeAfterDemo() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 z-40 font-medium text-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        See Before/After
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">The CodeMentor Difference</h2>
            <p className="text-gray-400 text-sm">Generic AI vs Style-Aware AI</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Scenario */}
          <div className="mb-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 font-semibold mb-2">📝 Scenario:</p>
            <p className="text-gray-300 text-sm">
              You have this code and ask AI: <span className="italic text-blue-400">"How can I add error handling?"</span>
            </p>
            <pre className="mt-3 bg-gray-950 p-3 rounded text-xs text-gray-300 overflow-x-auto">
{`const fetchUsers = async () => {
  const response = await fetch('/api/users')
  return response.json()
}`}</pre>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">camelCase</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">arrow functions</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">single quotes</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">no types</span>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* BEFORE: Generic AI */}
            <div className="border border-red-500/30 rounded-lg overflow-hidden">
              <div className="bg-red-900/20 border-b border-red-500/30 p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <h3 className="font-semibold text-red-400">Generic AI (ChatGPT)</h3>
                </div>
              </div>
              <div className="p-4 bg-gray-950">
                <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
{`async function fetchUsers(): Promise<User[]> {
  try {
    const response: Response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error:", error);
    throw error;
  }
}`}</pre>
                <div className="mt-3 space-y-2 text-xs">
                  <p className="text-red-400 flex items-start gap-2">
                    <span>❌</span>
                    <span>Changed to <code className="bg-red-900/20 px-1 rounded">function</code> keyword (you prefer arrow)</span>
                  </p>
                  <p className="text-red-400 flex items-start gap-2">
                    <span>❌</span>
                    <span>Added TypeScript types (you don't use types)</span>
                  </p>
                  <p className="text-red-400 flex items-start gap-2">
                    <span>❌</span>
                    <span>Changed to <code className="bg-red-900/20 px-1 rounded">double quotes</code> (you use single)</span>
                  </p>
                  <p className="text-red-400 flex items-start gap-2">
                    <span>❌</span>
                    <span>Different error handling style</span>
                  </p>
                </div>
                <div className="mt-4 p-3 bg-red-900/20 rounded border border-red-500/30">
                  <p className="text-red-400 font-semibold text-sm mb-1">⏱️ Time to "translate" to your style:</p>
                  <p className="text-2xl font-bold text-red-400">5-8 minutes</p>
                </div>
              </div>
            </div>

            {/* AFTER: CodeMentor AI */}
            <div className="border border-green-500/30 rounded-lg overflow-hidden">
              <div className="bg-green-900/20 border-b border-green-500/30 p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="font-semibold text-green-400">CodeMentor AI (Style-Aware)</h3>
                </div>
              </div>
              <div className="p-4 bg-gray-950">
                <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
{`const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users')

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}`}</pre>
                <div className="mt-3 space-y-2 text-xs">
                  <p className="text-green-400 flex items-start gap-2">
                    <span>✅</span>
                    <span>Kept arrow function (matches your style)</span>
                  </p>
                  <p className="text-green-400 flex items-start gap-2">
                    <span>✅</span>
                    <span>No TypeScript types (matches your preference)</span>
                  </p>
                  <p className="text-green-400 flex items-start gap-2">
                    <span>✅</span>
                    <span>Single quotes everywhere (your style)</span>
                  </p>
                  <p className="text-green-400 flex items-start gap-2">
                    <span>✅</span>
                    <span>Clean, simple error handling</span>
                  </p>
                </div>
                <div className="mt-4 p-3 bg-green-900/20 rounded border border-green-500/30">
                  <p className="text-green-400 font-semibold text-sm mb-1">⏱️ Time to use directly:</p>
                  <p className="text-2xl font-bold text-green-400">0 seconds</p>
                  <p className="text-xs text-gray-400 mt-1">Copy & paste ready! 🎯</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-400">300%</p>
                <p className="text-xs text-gray-400 mt-1">Faster workflow</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">100%</p>
                <p className="text-xs text-gray-400 mt-1">Style match</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">0</p>
                <p className="text-xs text-gray-400 mt-1">Manual edits needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
