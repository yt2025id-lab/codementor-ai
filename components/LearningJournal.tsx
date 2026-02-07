"use client";

import { useState, useEffect } from "react";

interface LearningEntry {
  topic: string;
  learned: string;
  timestamp: Date;
}

interface LearningJournalProps {
  messages: Array<{ role: string; content: string }>;
}

export default function LearningJournal({ messages }: LearningJournalProps) {
  const [entries, setEntries] = useState<LearningEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract learning entries from AI responses
    const learningEntries: LearningEntry[] = [];

    messages.forEach((msg, idx) => {
      if (msg.role === "assistant" && msg.content.length > 50) {
        // Extract topic from previous user message
        const prevMsg = messages[idx - 1];
        if (prevMsg && prevMsg.role === "user") {
          learningEntries.push({
            topic: prevMsg.content.slice(0, 50) + "...",
            learned: msg.content.slice(0, 150) + "...",
            timestamp: new Date(),
          });
        }
      }
    });

    setEntries(learningEntries.slice(-5)); // Keep last 5
  }, [messages]);

  if (entries.length === 0) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        title="Learning Journal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {entries.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {entries.length}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Learning Journal
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Track what you learned with CodeMentor
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Entries */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No learning entries yet.</p>
                  <p className="text-sm mt-2">Start asking questions to build your journal!</p>
                </div>
              ) : (
                entries.map((entry, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">
                          {entry.topic}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {entry.learned}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {idx === 0 ? "Just now" : `${entries.length - idx} ago`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-purple-400">{entries.length}</span> learning sessions
                </p>
                <button
                  onClick={() => {
                    const summary = entries.map((e, i) =>
                      `${i + 1}. ${e.topic}\n   ${e.learned}\n`
                    ).join("\n");
                    navigator.clipboard.writeText(summary);
                    alert("Copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
                >
                  📋 Export Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
