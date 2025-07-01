import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Square, 
  RotateCcw,
  Settings,
  Download,
  Share2,
  Menu
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';
import { compilerAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import ScrollProgress from '../../components/ScrollProgress';

// Language configurations
const LANGUAGES = {
  python: {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    extension: '.py',
    defaultCode: `# Welcome to Python Online Compiler
print("Hello, World!")

# Try some basic operations
x = 10
y = 20
result = x + y
print(f"The sum of {x} and {y} is {result}")

# List operations
numbers = [1, 2, 3, 4, 5]
squared = [n**2 for n in numbers]
print(f"Original: {numbers}")
print(f"Squared: {squared}")`,
    monacoLanguage: 'python'
  },
  java: {
    id: 'java',
    name: 'Java',
    icon: '☕',
    extension: '.java',
    defaultCode: `// Welcome to Java Online Compiler
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Try some basic operations
        int x = 10;
        int y = 20;
        int result = x + y;
        System.out.println("The sum of " + x + " and " + y + " is " + result);

        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Original: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
    monacoLanguage: 'java'
  }
};

const OnlineCompiler = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [code, setCode] = useState(LANGUAGES.python.defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState(theme === 'dark' ? 'vs-dark' : 'light');

  // Update editor theme when app theme changes
  useEffect(() => {
    setEditorTheme(theme === 'dark' ? 'vs-dark' : 'light');
  }, [theme]);

  // Update code when language changes
  useEffect(() => {
    setCode(LANGUAGES[selectedLanguage].defaultCode);
    setOutput('');
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
    setMobileMenuOpen(false);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const handleRunCode = async () => {
    // Check if user is logged in for Python and Java
    if ((selectedLanguage === 'python' || selectedLanguage === 'java') && !user) {
      setOutput('❌ Please log in to run Python and Java code.');
      return;
    }

    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      // For Python and Java, use the backend compiler API
      const result = await compilerAPI.compileCode({
        language: selectedLanguage,
        source_code: code,
        stdin: ''
      });

      // Format the output
      let outputText = '';

      if (result.stdout) {
        outputText += result.stdout;
      }

      if (result.stderr) {
        outputText += '\n❌ Error:\n' + result.stderr;
      }

      if (result.compile_output) {
        outputText += '\n📝 Compilation Output:\n' + result.compile_output;
      }

      if (result.status) {
        outputText += `\n\n📊 Status: ${result.status.description || 'Unknown'}`;
      }

      if (!outputText.trim()) {
        outputText = '✅ Code executed successfully (no output)';
      }

      setOutput(outputText);

    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`❌ Execution failed: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setOutput(prev => prev + '\n\n⚠️ Execution stopped by user');
  };

  const handleResetCode = () => {
    setCode(LANGUAGES[selectedLanguage].defaultCode);
    setOutput('');
  };

  const currentLanguage = LANGUAGES[selectedLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />
      <Navbar />
      
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: sidebarCollapsed ? "120px" : "280px",
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hidden lg:flex flex-col bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 relative z-40"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 dark:border-gray-700/20 pt-24 relative z-50">
            <div className="flex items-center justify-between relative z-50">
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="font-poppins font-semibold text-gray-900 dark:text-white text-sm"
                  >
                    Languages
                  </motion.h3>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleToggleSidebar}
                className="p-3 rounded-lg bg-blue-500/20 dark:bg-blue-600/20 hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-200 border-2 border-blue-500/50 dark:border-blue-400/50 flex-shrink-0 cursor-pointer z-[60] relative shadow-lg active:scale-95"
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {Object.values(LANGUAGES).map((language) => (
                <motion.button
                  key={language.id}
                  onClick={() => handleLanguageSelect(language.id)}
                  whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative w-full text-left rounded-xl transition-all duration-300 ${
                    selectedLanguage === language.id
                      ? 'bg-blue-500/20 border-2 border-blue-500/50 text-blue-700 dark:text-blue-300 shadow-lg'
                      : 'bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-600/50 hover:bg-white/60 dark:hover:bg-gray-700/50 hover:shadow-md'
                  } ${sidebarCollapsed ? 'p-3 mx-1' : 'p-4'}`}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className={`${sidebarCollapsed ? 'w-10 h-8' : 'w-8 h-8'} rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-sm ${sidebarCollapsed ? 'border border-white/10 dark:border-gray-500/20' : ''}`}>
                      <span className={`${sidebarCollapsed ? 'text-lg' : 'text-base'}`}>
                        {language.icon}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 min-w-0"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                            {language.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language.extension}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {language.name}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden fixed top-24 left-4 z-40 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 z-50 overflow-y-auto"
              >
                <div className="p-4 pt-24">
                  <h3 className="font-poppins font-semibold text-gray-900 dark:text-white text-lg mb-4">
                    Select Language
                  </h3>
                  <div className="space-y-3">
                    {Object.values(LANGUAGES).map((language) => (
                      <button
                        key={language.id}
                        onClick={() => handleLanguageSelect(language.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedLanguage === language.id
                            ? 'bg-blue-500/20 border-2 border-blue-500/50 text-blue-700 dark:text-blue-300'
                            : 'bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-600/50 hover:bg-white/60 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            <span className="text-base">{language.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {language.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {language.extension}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 relative min-w-0">
          <div className="relative z-10 pt-24 pb-4">
            <div className={`h-[calc(100vh-7rem)] transition-all duration-300 ${
              sidebarCollapsed ? 'px-4' : 'px-4 lg:px-6'
            }`}>

              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentLanguage.icon}</span>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentLanguage.name} Compiler
                    </h1>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    className="p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 transition-all duration-200"
                    title="Reset Code"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={isRunning ? handleStopExecution : handleRunCode}
                    disabled={!code.trim()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isRunning
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isRunning ? (
                      <>
                        <Square className="w-4 h-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run
                      </>
                    )}
                  </button>
                </div>
              </div>



              {/* Editor and Output Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-5rem)]">
                {/* Code Editor Panel */}
                <div className="bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                  <div className="p-3 border-b border-white/10 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Code Editor
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[calc(100%-3.5rem)]">
                    <Editor
                      height="100%"
                      language={currentLanguage.monacoLanguage}
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      theme={editorTheme}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        folding: true,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 3,
                        glyphMargin: false,
                        padding: { top: 16, bottom: 16 }
                      }}
                    />
                  </div>
                </div>

                {/* Output Panel */}
                <div className="bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                  <div className="p-3 border-b border-white/10 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/20">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Output
                    </h3>
                  </div>
                  <div className="h-[calc(100%-3.5rem)] p-4 overflow-auto">
                    <pre className="text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">
                      {output || 'Click "Run" to execute your code...'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
