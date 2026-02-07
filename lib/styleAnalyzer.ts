export interface StyleProfile {
  namingConvention: "camelCase" | "snake_case" | "PascalCase" | "mixed";
  componentStyle: "functional" | "class" | "mixed";
  commentStyle: "inline" | "block" | "jsdoc" | "minimal";
  importStyle: "named" | "default" | "namespace" | "mixed";
  indentation: "spaces" | "tabs";
  quoteStyle: "single" | "double" | "backtick" | "mixed";
  semicolons: boolean;
  trailingCommas: boolean;
  typeAnnotations: "explicit" | "minimal" | "none";
  patterns: {
    usesHooks: boolean;
    usesAsync: boolean;
    prefersArrowFunctions: boolean;
    usesDestructuring: boolean;
    usesSpreadOperator: boolean;
    usesOptionalChaining: boolean;
  };
  preferences: {
    lineLength: number;
    functionLength: number;
    complexity: "simple" | "moderate" | "complex";
  };
}

export function analyzeCodeStyle(code: string): StyleProfile {
  const lines = code.split("\n");

  return {
    namingConvention: detectNamingConvention(code),
    componentStyle: detectComponentStyle(code),
    commentStyle: detectCommentStyle(code),
    importStyle: detectImportStyle(code),
    indentation: detectIndentation(lines),
    quoteStyle: detectQuoteStyle(code),
    semicolons: code.includes(";"),
    trailingCommas: /,\s*[}\])]/.test(code),
    typeAnnotations: detectTypeAnnotations(code),
    patterns: {
      usesHooks: /use[A-Z]\w*\(/.test(code),
      usesAsync: /async|await/.test(code),
      prefersArrowFunctions: (code.match(/=>/g) || []).length > (code.match(/function/g) || []).length,
      usesDestructuring: /const\s*{.*}|const\s*\[.*\]/.test(code),
      usesSpreadOperator: /\.\.\./.test(code),
      usesOptionalChaining: /\?\./.test(code),
    },
    preferences: {
      lineLength: Math.max(...lines.map(l => l.length)),
      functionLength: estimateFunctionLength(code),
      complexity: estimateComplexity(code),
    },
  };
}

function detectNamingConvention(code: string): StyleProfile["namingConvention"] {
  const camelCase = (code.match(/\b[a-z][a-zA-Z0-9]*\b/g) || []).length;
  const snake_case = (code.match(/\b[a-z]+_[a-z_]+\b/g) || []).length;
  const PascalCase = (code.match(/\b[A-Z][a-zA-Z0-9]*\b/g) || []).length;

  if (camelCase > snake_case && camelCase > PascalCase) return "camelCase";
  if (snake_case > camelCase) return "snake_case";
  if (PascalCase > camelCase) return "PascalCase";
  return "mixed";
}

function detectComponentStyle(code: string): StyleProfile["componentStyle"] {
  const functional = /const\s+\w+\s*=.*=>|function\s+\w+\s*\(/.test(code);
  const classStyle = /class\s+\w+/.test(code);

  if (functional && !classStyle) return "functional";
  if (classStyle && !functional) return "class";
  return "mixed";
}

function detectCommentStyle(code: string): StyleProfile["commentStyle"] {
  const inline = (code.match(/\/\//g) || []).length;
  const block = (code.match(/\/\*/g) || []).length;
  const jsdoc = (code.match(/\/\*\*/g) || []).length;

  if (jsdoc > 0) return "jsdoc";
  if (inline > block) return "inline";
  if (block > 0) return "block";
  return "minimal";
}

function detectImportStyle(code: string): StyleProfile["importStyle"] {
  const named = (code.match(/import\s*{/g) || []).length;
  const defaultImport = (code.match(/import\s+\w+\s+from/g) || []).length;
  const namespace = (code.match(/import\s*\*\s*as/g) || []).length;

  if (named > defaultImport && named > namespace) return "named";
  if (defaultImport > named) return "default";
  if (namespace > 0) return "namespace";
  return "mixed";
}

function detectIndentation(lines: string[]): "spaces" | "tabs" {
  const spaces = lines.filter(l => /^\s{2,}/.test(l)).length;
  const tabs = lines.filter(l => /^\t/.test(l)).length;
  return spaces > tabs ? "spaces" : "tabs";
}

function detectQuoteStyle(code: string): StyleProfile["quoteStyle"] {
  const single = (code.match(/'/g) || []).length;
  const double = (code.match(/"/g) || []).length;
  const backtick = (code.match(/`/g) || []).length;

  if (single > double && single > backtick) return "single";
  if (double > single && double > backtick) return "double";
  if (backtick > single && backtick > double) return "backtick";
  return "mixed";
}

function detectTypeAnnotations(code: string): StyleProfile["typeAnnotations"] {
  const typeAnnotations = (code.match(/:\s*(string|number|boolean|any|void)/g) || []).length;
  const variables = (code.match(/\b(const|let|var)\b/g) || []).length;

  if (typeAnnotations === 0) return "none";
  if (typeAnnotations / variables > 0.7) return "explicit";
  return "minimal";
}

function estimateFunctionLength(code: string): number {
  const functions = code.match(/function.*?{[\s\S]*?}|=>[\s\S]*?{[\s\S]*?}/g) || [];
  if (functions.length === 0) return 0;
  const lengths = functions.map(f => f.split("\n").length);
  return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
}

function estimateComplexity(code: string): "simple" | "moderate" | "complex" {
  const conditionals = (code.match(/if|else|switch|case/g) || []).length;
  const loops = (code.match(/for|while|map|filter|reduce/g) || []).length;
  const complexity = conditionals + loops * 2;

  if (complexity < 5) return "simple";
  if (complexity < 15) return "moderate";
  return "complex";
}

export function generateStyleSummary(profile: StyleProfile): string {
  const summary: string[] = [];

  // Naming & Style
  summary.push(`✓ Prefers ${profile.namingConvention} naming`);
  summary.push(`✓ Uses ${profile.componentStyle} components`);
  summary.push(`✓ ${profile.quoteStyle} quotes`);
  summary.push(`✓ ${profile.semicolons ? "Uses" : "No"} semicolons`);

  // Patterns
  if (profile.patterns.prefersArrowFunctions) {
    summary.push("✓ Prefers arrow functions");
  }
  if (profile.patterns.usesHooks) {
    summary.push("✓ Uses React Hooks");
  }
  if (profile.patterns.usesAsync) {
    summary.push("✓ Uses async/await");
  }
  if (profile.patterns.usesDestructuring) {
    summary.push("✓ Uses destructuring");
  }

  // Type annotations
  if (profile.typeAnnotations !== "none") {
    summary.push(`✓ ${profile.typeAnnotations} type annotations`);
  }

  // Complexity
  summary.push(`✓ Code complexity: ${profile.preferences.complexity}`);

  return summary.join("\n");
}
