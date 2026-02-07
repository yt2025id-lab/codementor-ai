"use client";

import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import ChatPanel from "@/components/ChatPanel";
import GitHubImport from "@/components/GitHubImport";
import StyleProfile from "@/components/StyleProfile";
import LearningJournal from "@/components/LearningJournal";
import ExampleSnippets from "@/components/ExampleSnippets";
import ImpactMetrics from "@/components/ImpactMetrics";
import BeforeAfterDemo from "@/components/BeforeAfterDemo";
import LandingPage from "@/components/LandingPage";
import EmailAuth from "@/components/EmailAuth";
import { analyzeCodeStyle, generateStyleSummary, StyleProfile as StyleProfileType } from "@/lib/styleAnalyzer";

type AppState = "landing" | "auth" | "app";

interface User {
  email: string;
  name: string;
  timestamp: number;
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [code, setCode] = useState<string>("");
  const [styleProfile, setStyleProfile] = useState<StyleProfileType | null>(null);
  const [styleSummary, setStyleSummary] = useState<string>("");
  const [importedFiles, setImportedFiles] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("codementor_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as User;
        setUser(userData);
        setAppState("app");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleGetStarted = () => {
    setAppState("auth");
  };

  const handleAuthSuccess = (email: string) => {
    const storedUser = localStorage.getItem("codementor_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
      setAppState("app");
    }
  };

  const handleBackToLanding = () => {
    setAppState("landing");
  };

  const handleLogout = () => {
    localStorage.removeItem("codementor_user");
    setUser(null);
    setAppState("landing");
    // Reset app state
    setCode("");
    setStyleProfile(null);
    setStyleSummary("");
    setImportedFiles([]);
    setMessages([]);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    // Analyze style if enough code
    if (newCode.length > 100) {
      const profile = analyzeCodeStyle(newCode);
      const summary = generateStyleSummary(profile);
      setStyleProfile(profile);
      setStyleSummary(summary);
    }
  };

  const handleGitHubImport = (files: { name: string; content: string }[]) => {
    if (files.length === 0) return;

    // Combine all files for analysis
    const allCode = files.map(f => f.content).join("\n\n");

    // Analyze combined code
    const profile = analyzeCodeStyle(allCode);
    const summary = generateStyleSummary(profile);
    setStyleProfile(profile);
    setStyleSummary(summary);

    // Set first file in editor
    setCode(files[0].content);
    setImportedFiles(files.map(f => f.name));
  };

  const handleExampleSelect = (exampleCode: string) => {
    setCode(exampleCode);
    // Trigger analysis
    const profile = analyzeCodeStyle(exampleCode);
    const summary = generateStyleSummary(profile);
    setStyleProfile(profile);
    setStyleSummary(summary);
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center animate-pulse">
            <img
              src="/logo.png"
              alt="CodeMentor AI"
              className="w-16 h-16 object-contain"
            />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page
  if (appState === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show email auth
  if (appState === "auth") {
    return <EmailAuth onSuccess={handleAuthSuccess} onBack={handleBackToLanding} />;
  }

  // Show main app
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="CodeMentor AI"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">CodeMentor AI</h1>
                <p className="text-xs text-gray-400">
                  {user ? `Welcome back, ${user.name.split(" ")[0]}!` : "Personalized coding assistant"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ExampleSnippets onSelect={handleExampleSelect} />
            {importedFiles.length > 0 && (
              <div className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-md border border-green-400/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Analyzed {importedFiles.length} files</span>
              </div>
            )}
            <GitHubImport onImport={handleGitHubImport} />

            {/* User menu */}
            {user && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - 2 Column Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Code Editor */}
        <div className="flex-1 border-r border-gray-800 relative">
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
          />

          {/* Welcome overlay when no code */}
          {!code && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950/95 via-blue-950/20 to-gray-950/95 backdrop-blur-sm pointer-events-none">
              <div className="text-center max-w-lg px-6">
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="CodeMentor AI"
                    className="w-24 h-24 object-contain drop-shadow-2xl"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {user ? `Welcome, ${user.name.split(" ")[0]}!` : "Welcome to CodeMentor"}
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  AI assistant that learns your unique coding style and provides personalized suggestions
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-blue-400 mb-2">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-medium">Style Learning</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-purple-400 mb-2">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-medium">Real-time AI</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-green-400 mb-2">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-medium">GitHub Import</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-8">
                  Start typing, load an example, or import from GitHub
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Chat + Style Profile */}
        <div className="w-[500px] flex flex-col">
          {/* Style Profile at top */}
          <StyleProfile profile={styleProfile} summary={styleSummary} />

          {/* Impact Metrics */}
          <ImpactMetrics messageCount={messages.length} />

          {/* Chat Panel */}
          <div className="flex-1">
            <ChatPanel
              styleProfile={styleProfile}
              styleSummary={styleSummary}
              currentCode={code}
              onMessagesChange={setMessages}
            />
          </div>
        </div>
      </main>

      {/* Learning Journal - Floating */}
      <LearningJournal messages={messages} />

      {/* Before/After Demo - Floating */}
      <BeforeAfterDemo />
    </div>
  );
}
