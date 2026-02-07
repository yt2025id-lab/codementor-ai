"use client";

import { useState } from "react";
import CustomCursor from "./CustomCursor";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useState(() => {
    setTimeout(() => setIsAnimated(true), 100);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-purple-950/30 relative overflow-hidden custom-cursor-container">
      {/* Custom Cursor */}
      <CustomCursor />
      {/* 3D Animated Logo Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating 3D Logos */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-10 animate-float-slow">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-contain transform rotate-12 scale-150"
            style={{ filter: 'blur(1px)' }}
          />
        </div>
        <div className="absolute top-40 right-20 w-48 h-48 opacity-10 animate-float-medium">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-contain transform -rotate-12 scale-125"
            style={{ filter: 'blur(2px)' }}
          />
        </div>
        <div className="absolute bottom-32 left-1/4 w-56 h-56 opacity-10 animate-float-fast">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-contain transform rotate-45"
            style={{ filter: 'blur(1px)' }}
          />
        </div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 opacity-10 animate-float-slow">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-contain transform -rotate-6"
            style={{ filter: 'blur(2px)' }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="CodeMentor AI"
                  className="w-10 h-10 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CodeMentor AI</h1>
                <p className="text-xs text-gray-400">Style-aware coding assistant</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 border border-white/20"
            >
              Sign In
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* 3D Logo with glow effect */}
            <div className="mb-8 relative">
              {/* Glow layers */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Main logo with 3D effect */}
              <div className="relative animate-float-hero">
                <img
                  src="/logo.png"
                  alt="CodeMentor AI"
                  className="w-36 h-36 mx-auto object-contain relative z-10"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.5)) drop-shadow(0 20px 60px rgba(147, 51, 234, 0.3))',
                  }}
                />
              </div>
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-8 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-300 font-medium">Powered by Gemini 2.0</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-6xl md:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              AI That Speaks
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Your Code Language
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed transition-all duration-700 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Stop translating AI suggestions to your style.
              <br />
              <span className="text-gray-400">CodeMentor learns your preferences and adapts every response automatically.</span>
            </p>

            {/* CTA Buttons */}
            <div className={`flex items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-lg font-semibold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <span>Get Started Free</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-lg font-semibold backdrop-blur-sm border border-white/20 transition-all hover:scale-105">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-700 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">300%</p>
                <p className="text-sm text-gray-400">Faster Workflow</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">100%</p>
                <p className="text-sm text-gray-400">Style Match</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">15+</p>
                <p className="text-sm text-gray-400">Patterns Detected</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Premium Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>

          {/* Section Header */}
          <div className="text-center mb-20 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-300 font-medium">The Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your coding workflow in three intelligent steps
            </p>
          </div>

          {/* Steps Grid with 3D Cards */}
          <div className="relative z-10 space-y-24">
            {/* Step 1 - Paste Your Code */}
            <div className="group relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="order-2 md:order-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-blue-500/50 transform group-hover:scale-110 transition-transform duration-500">
                        1
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-400 font-semibold mb-1">STEP ONE</div>
                      <h3 className="text-3xl font-bold text-white">Paste Your Code</h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400 leading-relaxed">
                    Import from GitHub or paste any code snippet. CodeMentor instantly analyzes your codebase, supporting all languages and frameworks.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>GitHub repository import</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>All languages supported</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Instant analysis in seconds</span>
                    </div>
                  </div>
                </div>

                {/* Visual - Code Editor Mockup */}
                <div className="order-1 md:order-2 relative group/card">
                  {/* 3D Card Container */}
                  <div className="relative perspective-1000">
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transform group-hover/card:scale-105 group-hover/card:rotate-y-5 transition-all duration-700">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

                      {/* Code content */}
                      <div className="relative p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <span className="ml-2 text-xs text-gray-500 font-mono">index.tsx</span>
                        </div>
                        <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                          <code>{`const getUserData = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`)
  return response.json()
}

// CodeMentor analyzes:
// ✓ camelCase naming
// ✓ Arrow functions
// ✓ Template literals
// ✓ No type annotations`}</code>
                        </pre>
                      </div>

                      {/* Scanning effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-scan opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - AI Learns */}
            <div className="group relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Visual - Brain/Analysis */}
                <div className="relative group/card">
                  <div className="relative perspective-1000">
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transform group-hover/card:scale-105 group-hover/card:-rotate-y-5 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10"></div>

                      <div className="relative p-8">
                        {/* Pattern detection visualization */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <span className="text-sm text-gray-300">Naming Convention</span>
                            <span className="text-green-400 font-semibold text-sm">camelCase ✓</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <span className="text-sm text-gray-300">Quote Style</span>
                            <span className="text-green-400 font-semibold text-sm">Single ' ✓</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <span className="text-sm text-gray-300">Function Style</span>
                            <span className="text-green-400 font-semibold text-sm">Arrow → ✓</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <span className="text-sm text-gray-300">Type Annotations</span>
                            <span className="text-green-400 font-semibold text-sm">Minimal ✓</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                            <span className="text-sm text-gray-300">Semicolons</span>
                            <span className="text-green-400 font-semibold text-sm">No ; ✓</span>
                          </div>
                        </div>

                        {/* AI Brain icon */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-purple-500/50 transform group-hover:scale-110 transition-transform duration-500">
                        2
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-semibold mb-1">STEP TWO</div>
                      <h3 className="text-3xl font-bold text-white">AI Learns Your Style</h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400 leading-relaxed">
                    Real-time analysis of 15+ coding patterns. Our AI creates a unique profile of your preferences, from naming conventions to syntax choices.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">15+</div>
                      <div className="text-xs text-gray-400">Patterns Detected</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">&lt;2s</div>
                      <div className="text-xs text-gray-400">Analysis Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Get Suggestions */}
            <div className="group relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="order-2 md:order-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-green-500/50 transform group-hover:scale-110 transition-transform duration-500">
                        3
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-green-400 font-semibold mb-1">STEP THREE</div>
                      <h3 className="text-3xl font-bold text-white">Get Perfect Suggestions</h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400 leading-relaxed">
                    Every AI response perfectly matches YOUR coding style. Copy, paste, done. Zero manual edits or style translation needed.
                  </p>

                  <div className="p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-green-400">3× Faster Workflow</div>
                        <div className="text-xs text-gray-500">No style translation needed</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Save 5-10 minutes per AI interaction by eliminating manual code adjustments
                    </div>
                  </div>
                </div>

                {/* Visual - Before/After */}
                <div className="order-1 md:order-2 relative group/card">
                  <div className="relative perspective-1000">
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transform group-hover/card:scale-105 group-hover/card:rotate-y-5 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10"></div>

                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                            <span className="text-xs text-green-400 font-semibold">Perfect Match</span>
                          </div>
                        </div>
                        <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                          <code className="text-green-400">{`// AI Output matches YOUR style:

const handleSubmit = async () => {
  try {
    const result = await api.post('/submit')
    showNotification('Success!')
  } catch (err) {
    handleError(err)
  }
}

// ✓ camelCase ✓ Arrow functions
// ✓ No semicolons ✓ Single quotes
// 🎯 Copy & Paste Ready!`}</code>
                        </pre>
                      </div>

                      {/* Success glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-500/0 via-green-500/5 to-green-500/0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 relative z-10">
            <button
              onClick={onGetStarted}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-lg font-bold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Start Analyzing Your Code</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Problem/Solution Section - PREMIUM */}
        <section className="relative max-w-7xl mx-auto px-6 py-24">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Problem</span> vs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Solution</span>
            </h2>
            <p className="text-xl text-gray-400">See the difference for yourself</p>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* THE PROBLEM - Red Card */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative perspective-1000">
                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-2xl rounded-3xl border-2 border-red-500/30 overflow-hidden transform group-hover:scale-[1.02] group-hover:-rotate-y-3 transition-all duration-700 shadow-2xl">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-orange-900/30"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    {/* Badge with animation */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border-2 border-red-500/40 mb-6 animate-pulse">
                      <svg className="w-5 h-5 text-red-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm text-red-300 font-bold tracking-wide">THE PROBLEM</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      Generic AI<br />Wastes Your Time
                    </h3>

                    {/* Issues list */}
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">Suggests code in <strong className="text-white">different style</strong> than yours</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">You manually <strong className="text-white">translate every suggestion</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="leading-relaxed"><strong className="text-red-300">5-10 minutes wasted</strong> per response</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">Breaks your <strong className="text-white">flow and focus</strong></span>
                      </li>
                    </ul>

                    {/* Code example */}
                    <div className="relative group/code">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl opacity-50"></div>
                      <div className="relative bg-gray-950/90 backdrop-blur-sm rounded-xl p-6 border border-red-500/30 overflow-hidden">
                        {/* Code header */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <span className="ml-auto text-xs text-gray-600 font-mono">generic-ai.ts</span>
                        </div>

                        {/* Code */}
                        <pre className="text-sm font-mono leading-relaxed">
                          <code>
                            <div className="text-gray-500">// Generic AI Output:</div>
                            <div className="text-red-300 mt-2">function get_user_data(user_id: string)</div>
                            <div className="text-gray-500 mt-4">// Your Style:</div>
                            <div className="text-gray-400">const getUserData = (userId) =&gt;</div>
                          </code>
                        </pre>

                        {/* MISMATCH badge */}
                        <div className="absolute -right-3 -top-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-xl shadow-2xl font-sans text-xs font-bold rotate-12 animate-pulse">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>MISMATCH!</span>
                          </div>
                        </div>

                        {/* Error glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Time wasted metric */}
                    <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Average time wasted:</span>
                        <span className="text-2xl font-bold text-red-400">7.5 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THE SOLUTION - Green Card */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative perspective-1000">
                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-2xl rounded-3xl border-2 border-green-500/30 overflow-hidden transform group-hover:scale-[1.02] group-hover:rotate-y-3 transition-all duration-700 shadow-2xl">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-emerald-900/30"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    {/* Badge with animation */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border-2 border-green-500/40 mb-6 animate-pulse">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-green-300 font-bold tracking-wide">THE SOLUTION</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      CodeMentor<br />Adapts to YOU
                    </h3>

                    {/* Benefits list */}
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">Every suggestion matches your <strong className="text-white">exact style</strong></span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed"><strong className="text-white">Copy & paste ready</strong> instantly</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed"><strong className="text-green-300">Zero time wasted</strong> on translation</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300 group/item">
                        <div className="mt-1 w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed">Stay in <strong className="text-white">flow, code faster</strong></span>
                      </li>
                    </ul>

                    {/* Code example */}
                    <div className="relative group/code">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl opacity-50"></div>
                      <div className="relative bg-gray-950/90 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 overflow-hidden">
                        {/* Code header */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <span className="ml-auto text-xs text-gray-600 font-mono">codementor-ai.ts</span>
                        </div>

                        {/* Code */}
                        <pre className="text-sm font-mono leading-relaxed">
                          <code>
                            <div className="text-gray-500">// Your Style Profile:</div>
                            <div className="text-green-400 mt-2">✓ camelCase naming</div>
                            <div className="text-green-400">✓ Arrow functions</div>
                            <div className="text-green-400">✓ No type annotations</div>
                            <div className="text-gray-500 mt-4">// AI Output:</div>
                            <div className="text-green-300">const getUserData = (userId) =&gt;</div>
                          </code>
                        </pre>

                        {/* PERFECT MATCH badge */}
                        <div className="absolute -right-3 -top-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-2xl font-sans text-xs font-bold -rotate-12 animate-pulse">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>PERFECT MATCH!</span>
                          </div>
                        </div>

                        {/* Success glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Time saved metric */}
                    <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Time saved per suggestion:</span>
                        <span className="text-2xl font-bold text-green-400">~8 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats comparison */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-green-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">300%</div>
                  <div className="text-sm text-gray-400">Faster Workflow</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">100%</div>
                  <div className="text-sm text-gray-400">Style Match Rate</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">0</div>
                  <div className="text-sm text-gray-400">Manual Edits Needed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-blue-500/30 p-16 text-center backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Code at 3× Speed?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join developers who've stopped wasting time translating AI suggestions.
            </p>
            <button
              onClick={onGetStarted}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xl font-bold shadow-2xl shadow-blue-500/50 transition-all hover:scale-110 active:scale-95 inline-flex items-center gap-3"
            >
              <span>Get Started Free</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <p className="text-sm text-gray-500 mt-6">No credit card required • Takes 30 seconds</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-md bg-gray-900/50 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
            <p>Built with Gemini 2.0 Flash • Powered by AI • Made for Developers</p>
            <p className="mt-2">© 2026 CodeMentor AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
