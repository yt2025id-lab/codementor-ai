"use client";

import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze?: (context: string) => void;
}

export default function CodeEditor({ value, onChange, onAnalyze }: CodeEditorProps) {
  useEffect(() => {
    if (value && onAnalyze) {
      // Analyze code for patterns when it changes
      const analysis = analyzeCode(value);
      onAnalyze(analysis);
    }
  }, [value, onAnalyze]);

  const analyzeCode = (code: string): string => {
    const lines = code.split("\n");
    const analysis = {
      totalLines: lines.length,
      hasReact: code.includes("react") || code.includes("React"),
      hasTypeScript: code.includes(": ") && code.includes("interface"),
      hasFunctions: code.includes("function") || code.includes("const "),
      patterns: detectPatterns(code),
    };

    return JSON.stringify(analysis, null, 2);
  };

  const detectPatterns = (code: string) => {
    return {
      prefersFunctionalComponents: code.includes("const ") && code.includes("=>"),
      usesTypeScript: code.includes("interface") || code.includes("type "),
      commentStyle: code.includes("//") ? "inline" : code.includes("/*") ? "block" : "none",
      namingConvention: /const [a-z][a-zA-Z]*/.test(code) ? "camelCase" : "unknown",
    };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-800 p-2 px-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">editor.tsx</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Monaco Editor</span>
            <span className="text-xs text-green-500">● Gemini Ready</span>
          </div>
        </div>
      </div>

      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue="// Start coding... CodeMentor is watching and learning your style!\n\n"
        value={value}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          padding: { top: 16 },
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
