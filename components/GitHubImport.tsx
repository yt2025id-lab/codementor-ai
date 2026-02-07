"use client";

import { useState } from "react";

interface GitHubImportProps {
  onImport: (files: { name: string; content: string }[]) => void;
}

export default function GitHubImport({ onImport }: GitHubImportProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Parse GitHub URL
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error("Invalid GitHub URL");
      }

      const [, owner, repo] = match;
      const cleanRepo = repo.replace(/\.git$/, "");

      // Fetch repository contents
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepo}/contents`
      );

      if (!response.ok) {
        throw new Error("Repository not found or is private");
      }

      const contents = await response.json();

      // Filter for code files
      const codeFiles = contents.filter((file: any) =>
        /\.(ts|tsx|js|jsx|py|java|cpp|c|go|rs)$/.test(file.name)
      );

      // Fetch file contents (limit to first 10 files for demo)
      const filePromises = codeFiles.slice(0, 10).map(async (file: any) => {
        const fileResponse = await fetch(file.download_url);
        const content = await fileResponse.text();
        return { name: file.name, content };
      });

      const files = await Promise.all(filePromises);

      onImport(files);
      setShowModal(false);
      setUrl("");
    } catch (err: any) {
      setError(err.message || "Failed to import repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
      >
        Import from GitHub
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Import GitHub Repository
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Analyze your coding style from a GitHub repo
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setUrl("");
                }}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Repository URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !loading && url.trim() && handleImport()}
                    placeholder="https://github.com/vercel/next.js"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Quick Examples */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick examples:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Next.js", url: "https://github.com/vercel/next.js" },
                    { name: "React", url: "https://github.com/facebook/react" },
                    { name: "TypeScript", url: "https://github.com/microsoft/TypeScript" },
                  ].map((example) => (
                    <button
                      key={example.name}
                      onClick={() => setUrl(example.url)}
                      disabled={loading}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 rounded-lg text-xs text-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {example.name}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-blue-400">
                  We'll analyze the first 10 code files to learn your style. Works with public repositories only.
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                    setUrl("");
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={loading || !url.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95"
                >
                  {loading ? "Importing..." : "Import Repository"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
