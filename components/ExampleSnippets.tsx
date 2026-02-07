"use client";

import { useState } from "react";

const EXAMPLES = [
  {
    title: "React Component",
    language: "typescript",
    code: `import { useState } from 'react';

interface Props {
  initialCount: number;
}

const Counter = ({ initialCount }: Props) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default Counter;`,
  },
  {
    title: "Async Function",
    language: "typescript",
    code: `async function fetchUserData(userId: string) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,
  },
  {
    title: "Array Operations",
    language: "typescript",
    code: `const numbers = [1, 2, 3, 4, 5];

// Map, filter, reduce
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Destructuring
const [first, second, ...rest] = numbers;

// Spread operator
const moreNumbers = [...numbers, 6, 7, 8];`,
  },
  {
    title: "API Route Handler",
    language: "typescript",
    code: `import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    // Process request
    const result = await processData(body);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
  },
];

interface ExampleSnippetsProps {
  onSelect: (code: string) => void;
}

export default function ExampleSnippets({ onSelect }: ExampleSnippetsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-all rounded-md flex items-center gap-2 border border-gray-700/50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <span>Examples</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Example Code Snippets</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Load an example to test CodeMentor's style learning
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAMPLES.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer group"
                  onClick={() => {
                    onSelect(example.code);
                    setIsOpen(false);
                  }}
                >
                  <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {example.title}
                  </h3>
                  <pre className="text-xs text-gray-400 font-mono overflow-hidden" style={{ maxHeight: "100px" }}>
                    {example.code.slice(0, 150)}...
                  </pre>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{example.language}</span>
                    <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to load →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
