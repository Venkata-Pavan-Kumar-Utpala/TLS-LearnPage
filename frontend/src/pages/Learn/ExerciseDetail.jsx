import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft, BookOpen, Code, Eye, Play, Trophy,
  Clock, CheckCircle, Copy, RotateCcw, Send,
  FileText, Terminal, Settings, Folder, ChevronRight,
  ChevronDown, Circle, Square, Maximize2, Minimize2,
  MoreHorizontal, Search, GitBranch, Bug
} from 'lucide-react';
import { exerciseAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const ExerciseDetail = () => {
  const { courseId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const codeEditorRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('theory');
  const [exercise, setExercise] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // IDE state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [currentFile, setCurrentFile] = useState('main.js');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  // Mock exercise data
  const mockExercise = {
    id: exerciseId,
    title: 'Hello World Program',
    difficulty: 'Easy',
    estimatedTime: '5 min',
    xp: 10,
    description: 'Write your first program that displays "Hello, World!" to the console.',
    theory: `
# Hello World Program

Welcome to your first programming exercise! The "Hello World" program is a simple program that outputs "Hello, World!" to the screen. It's traditionally the first program written by people learning a new programming language.

## Learning Objectives
- Understand basic program structure
- Learn how to output text to the console
- Get familiar with the development environment

## Key Concepts
1. **Console Output**: Using console.log() to display text
2. **String Literals**: Text enclosed in quotes
3. **Semicolons**: Statement terminators in JavaScript

## Example
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

This simple line of code will output "Hello, World!" to the console.
    `,
    starterCode: `// Write your Hello World program here
// Use console.log() to output "Hello, World!"

`,
    expectedOutput: 'Hello, World!',
    testCases: [
      { input: '', expected: 'Hello, World!' }
    ]
  };

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'compiler', label: 'Compiler', icon: Code },
    { id: 'preview', label: 'Live Preview', icon: Eye }
  ];

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await exerciseAPI.getExercise(courseId, exerciseId);
        setExercise(mockExercise);
        setUserCode(mockExercise.starterCode);
      } catch (error) {
        console.error('Error fetching exercise:', error);
        setExercise(mockExercise);
        setUserCode(mockExercise.starterCode);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [courseId, exerciseId]);

  // Disable copy-paste in code editor
  const handleKeyDown = (e) => {
    // Disable Ctrl+C, Ctrl+V, Ctrl+A
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
      e.preventDefault();
      return false;
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Simple JavaScript execution simulation
      // In a real implementation, you'd send this to a backend code execution service
      const result = eval(userCode);
      
      // Capture console.log output
      let consoleOutput = '';
      const originalLog = console.log;
      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\n';
      };
      
      eval(userCode);
      console.log = originalLog;
      
      setOutput(consoleOutput || 'Code executed successfully');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setTimeout(() => setIsRunning(false), 1000);
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);

    try {
      // First, run the code to get the output
      let codeOutput = '';

      try {
        // Capture console.log output
        let consoleOutput = '';
        const originalLog = console.log;
        console.log = (...args) => {
          consoleOutput += args.join(' ') + '\n';
        };

        eval(userCode);
        console.log = originalLog;

        codeOutput = consoleOutput.trim();
      } catch (error) {
        setIsSubmitting(false);
        alert(`Code Error: ${error.message}\nPlease fix your code before submitting.`);
        return;
      }

      // Check if the output matches the expected output
      const expectedOutput = exercise?.expectedOutput?.trim();
      const isCorrect = codeOutput === expectedOutput;

      if (isCorrect) {
        // TODO: Replace with actual API call
        // const response = await exerciseAPI.submitExercise(courseId, exerciseId, userCode);

        setTimeout(() => {
          alert('Exercise submitted successfully! +10 XP earned');
          setIsSubmitting(false);
        }, 1500);
      } else {
        setTimeout(() => {
          alert(`Incorrect Output!\n\nYour Output: "${codeOutput}"\nExpected Output: "${expectedOutput}"\n\nPlease check your code and try again.`);
          setIsSubmitting(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
      alert('An error occurred while submitting. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetCode = () => {
    setUserCode(exercise?.starterCode || '');
    setOutput('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading exercise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(`/learn/exercises/${courseId}`)}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Exercises</span>
        </motion.button>

        {/* Exercise Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 mb-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-poppins text-2xl md:text-3xl font-medium brand-heading-primary mb-2 tracking-wider">
                {exercise?.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {exercise?.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-medium">
                  {exercise?.difficulty}
                </span>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{exercise?.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Trophy className="w-4 h-4" />
                  <span>{exercise?.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50'
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-white/20 dark:border-gray-700/20'
                } backdrop-blur-xl`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden"
        >
          {/* Theory Tab */}
          {activeTab === 'theory' && (
            <div className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {exercise?.theory}
                </div>
              </div>
            </div>
          )}

          {/* Compiler Tab - Premium Code Editor */}
          {activeTab === 'compiler' && (
            <div className="h-[700px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Code Editor Header */}
              <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="font-medium ml-2">Code Editor</span>
                </div>
                <button
                  onClick={resetCode}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Monaco Editor */}
              <div className="h-[calc(100%-7rem)] relative">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={userCode}
                  onChange={(value) => setUserCode(value || '')}
                  options={{
                    fontSize: 14,
                    fontFamily: 'Fira Code, Monaco, Consolas, monospace',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    contextmenu: false,
                    copyWithSyntaxHighlighting: false,
                    // Disable all IntelliSense and suggestions
                    quickSuggestions: false,
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: 'off',
                    tabCompletion: 'off',
                    wordBasedSuggestions: false,
                    parameterHints: { enabled: false },
                    autoClosingBrackets: 'never',
                    autoClosingQuotes: 'never',
                    autoSurround: 'never',
                    snippetSuggestions: 'none',
                    suggest: {
                      showKeywords: false,
                      showSnippets: false,
                      showClasses: false,
                      showFunctions: false,
                      showVariables: false,
                      showModules: false,
                      showProperties: false,
                      showEvents: false,
                      showOperators: false,
                      showUnits: false,
                      showValues: false,
                      showConstants: false,
                      showEnums: false,
                      showEnumMembers: false,
                      showColors: false,
                      showFiles: false,
                      showReferences: false,
                      showFolders: false,
                      showTypeParameters: false,
                      showIssues: false,
                      showUsers: false,
                      showWords: false
                    },
                    hover: { enabled: false },
                    lightbulb: { enabled: false },
                    find: {
                      addExtraSpaceOnTop: false,
                      autoFindInSelection: 'never',
                      seedSearchStringFromSelection: 'never'
                    }
                  }}
                  onMount={(editor, monaco) => {
                    // Disable copy-paste and other shortcuts
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {});
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {});
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {});
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {});
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {});

                    // Disable all language features
                    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                      noLib: true,
                      allowNonTsExtensions: true
                    });

                    // Clear all language providers
                    monaco.languages.registerCompletionItemProvider('javascript', {
                      provideCompletionItems: () => ({ suggestions: [] })
                    });
                  }}
                />

                {/* Language indicator */}
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  JAVASCRIPT | Line 1
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex gap-3">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  onClick={submitCode}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}

          {/* Live Preview Tab - Output Display */}
          {activeTab === 'preview' && (
            <div className="h-[700px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Output Header */}
              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span className="font-medium">Output</span>
              </div>

              {/* Terminal Output */}
              <div className="h-[calc(100%-3.5rem)] bg-gray-900 text-white font-mono text-sm">
                <div className="p-4 h-full overflow-auto">
                  {output ? (
                    <>
                      <div className="text-green-400 mb-2">$ node main.js</div>
                      <div className="text-white whitespace-pre-wrap">
                        {output}
                      </div>
                      {exercise?.expectedOutput && (
                        <div className="mt-4 pt-2 border-t border-gray-700">
                          <div className="text-gray-400 text-xs mb-1">Expected Output:</div>
                          <div className="text-yellow-400">{exercise.expectedOutput}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Eye className="w-16 h-16 text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Live Preview
                      </h3>
                      <p className="text-gray-400">
                        Run your code in the Compiler tab to see the output here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
