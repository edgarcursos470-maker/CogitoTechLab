/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Zap, TriangleAlert as AlertOctagon, Copy, Check, Code, Menu, X } from 'lucide-react';
import { pythonScript } from './PythonScript';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'code'>('dashboard');
  const [cmdCopied, setCmdCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  
  // Interactive console states
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<React.ReactNode[]>([
    <div key={0} className="text-slate-500">[2023-10-27 14:20:01] <span className="text-blue-400">[INFO]</span> GhostScanner process started successfully.</div>,
    <div key={1} className="text-slate-500">[2023-10-27 14:20:02] <span className="text-blue-400">[INFO]</span> Loaded 142 items from produtos.json.</div>,
    <div key={2} className="text-slate-500">[2023-10-27 14:20:05] <span className="text-green-400">[SUCS]</span> Item [41]: "Smartphone Galaxy S23 Ultra" processed.</div>,
    <div key={3} className="text-white py-1">
      <span className="text-slate-500">[2023-10-27 14:20:08]</span> <span className="text-yellow-400 font-bold">[WORK]</span> Processing [42]: "Placa de Vídeo RTX 4080"...
    </div>,
    <div key={4} className="pl-4 text-slate-400">&gt; Focus detected on browser input.</div>,
    <div key={5} className="pl-4 text-slate-400">&gt; Typing search query... (pyautogui.typewrite)</div>,
    <div key={6} className="pl-4 text-slate-400">&gt; Waiting for DOM content load (3.5s delay)...</div>,
    <div key={7} className="pl-4 text-slate-400">&gt; Triggering Ctrl+A -&gt; Ctrl+C sequence...</div>,
    <div key={8} className="pl-4 text-green-500">&gt; Data captured! Text length: 14,292 chars.</div>,
    <div key={9} className="pl-4 text-blue-400">&gt; Writing to: ./todos_os_precos/placa_de_video_rtx_4080.json</div>,
  ]);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('pyinstaller --noconfirm --onefile --windowed --name "GhostScanner" main.py');
    setCmdCopied(true);
    setTimeout(() => setCmdCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const startMockScan = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(prev => [...prev, 
      <div key={Date.now()} className="text-slate-500">[{new Date().toISOString().substring(0,19).replace('T', ' ')}] <span className="text-blue-400">[INFO]</span> Starting manual scan sequence...</div>
    ]);
    
    // Auto stop after a few seconds for demonstration
    setTimeout(() => {
        setIsRunning(false);
         setLogs(prev => [...prev, 
            <div key={Date.now()} className="text-slate-500">[{new Date().toISOString().substring(0,19).replace('T', ' ')}] <span className="text-red-400">[STOP]</span> Emergency stop activated [F12].</div>
          ]);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden">
      {/* Top Navigation / Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-[#1e293b] border-b border-slate-700 shadow-lg shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center">
            GhostScanner 
            <span className="hidden sm:inline text-blue-400 font-mono text-xs sm:text-sm ml-2 px-2 py-0.5 bg-blue-500/10 rounded">v2.4.0-STABLE</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-medium text-slate-300">SYSTEM READY</span>
          </div>
          <button 
            onClick={() => setActiveView(activeView === 'dashboard' ? 'code' : 'dashboard')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded text-xs sm:text-sm flex items-center gap-2 transition-all border border-slate-600"
          >
            {activeView === 'dashboard' ? <Code className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">{activeView === 'dashboard' ? 'View Python App' : 'Back to Dashboard'}</span>
          </button>
          {activeView === 'dashboard' && (
            <button 
                onClick={() => setIsRunning(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg"
            >
                <AlertOctagon className="w-4 h-4" />
                <span className="hidden sm:inline">EMERGENCY STOP [F12]</span>
                <span className="sm:hidden">STOP</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Dashboard View */}
        <div className={`absolute inset-0 flex transition-opacity duration-300 ${activeView === 'dashboard' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          {/* Left Sidebar: Configuration */}
          <aside className="hidden md:flex w-80 bg-[#1e293b] border-r border-slate-700 p-6 flex-col gap-6 shrink-0 overflow-y-auto">
            <section>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Source Configuration</label>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">produtos.json</span>
                  <span className="text-xs text-blue-400">Detected</span>
                </div>
                <div className="text-[11px] text-slate-400 mb-1">Items found: <span className="text-white">142 items</span></div>
                <div className="text-[11px] text-slate-400">Target: <span className="text-white">/todos_os_precos/</span></div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Automation Parameters</label>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Load Delay (Page)</span>
                  <span className="text-blue-400">3.5s</span>
                </div>
                <input type="range" className="w-full accent-blue-500" defaultValue="35" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Typing Speed</span>
                  <span className="text-blue-400">120 wpm</span>
                </div>
                <input type="range" className="w-full accent-blue-500" defaultValue="60" />
              </div>
            </section>

            <div className="mt-auto">
              <button 
                onClick={startMockScan}
                disabled={isRunning}
                className={`w-full ${isRunning ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 hover:bg-blue-500 text-white'} py-4 rounded-lg font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-colors`}
              >
                {!isRunning && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                  </svg>
                )}
                {isRunning ? 'SCANNING...' : 'INICIAR VARREDURA'}
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-4">
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Ctrl+C</kbd> in terminal to force exit
              </p>
            </div>
          </aside>

          {/* Main Content Area: Console & Live Status */}
          <section className="flex-1 flex flex-col bg-[#020617] overflow-hidden w-full">
            {/* Execution Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border-b border-slate-800 shrink-0">
              <div className="bg-[#0f172a] p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Processed</div>
                <div className="text-xl sm:text-2xl font-mono text-white">42 <span className="text-xs sm:text-sm text-slate-500">/ 142</span></div>
              </div>
              <div className="bg-[#0f172a] p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Efficiency</div>
                <div className="text-xl sm:text-2xl font-mono text-green-400">98.4%</div>
              </div>
              <div className="bg-[#0f172a] p-3 sm:p-4 hidden sm:block">
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Errors</div>
                <div className="text-xl sm:text-2xl font-mono text-red-400">0</div>
              </div>
              <div className="bg-[#0f172a] p-3 sm:p-4 hidden lg:block">
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Est. Remaining</div>
                <div className="text-xl sm:text-2xl font-mono text-blue-400">14m 22s</div>
              </div>
            </div>

            {/* Console Output */}
            <div 
              className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed CustomScrollbar"
              ref={consoleRef}
            >
              <div className="flex flex-col gap-1">
                {logs}
                {isRunning && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-slate-500 italic">Scanning next item in 2s...</span>
                    </div>
                )}
              </div>
            </div>

            {/* Compilation Helper Footer */}
            <div className="h-16 sm:h-12 bg-[#1e293b] border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 gap-2 sm:gap-4 shrink-0 py-2 sm:py-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0 hidden sm:block">Build Binary:</span>
              <div className="flex-1 overflow-x-auto overflow-y-hidden w-full CustomScrollbarX">
                  <code className="text-[10px] sm:text-[11px] bg-black/40 px-2 sm:px-3 py-1 rounded border border-slate-600 text-slate-400 font-mono whitespace-nowrap block w-max">
                    pyinstaller --noconfirm --onefile --windowed --name "GhostScanner" main.py
                  </code>
              </div>
              <button 
                onClick={handleCopyCmd}
                className="shrink-0 ml-auto sm:ml-0 text-[10px] font-bold text-blue-400 uppercase flex items-center gap-1 hover:text-blue-300 transition-colors bg-blue-400/10 px-2 py-1 rounded"
              >
                {cmdCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {cmdCopied ? 'COPIED!' : 'Copy Cmd'}
              </button>
            </div>
          </section>
        </div>

        {/* Python Code View */}
        <div className={`absolute inset-0 bg-[#0f172a] flex flex-col transition-opacity duration-300 ${activeView === 'code' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
             <div className="flex-1 overflow-auto p-4 sm:p-8">
                 <div className="max-w-4xl mx-auto w-full">
                     <div className="flex items-center justify-between mb-4">
                         <div>
                             <h2 className="text-xl font-bold text-white mb-1">GhostScanner Python App</h2>
                             <p className="text-sm text-slate-400">Implementação em Python (Tkinter + PyAutoGUI) baseada no seu pedido inicial.</p>
                         </div>
                         <button 
                            onClick={handleCopyCode}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium text-sm flex items-center gap-2 transition-all shadow-lg"
                         >
                            {codeCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {codeCopied ? 'Copied to Clipboard' : 'Copy Python Script'}
                         </button>
                     </div>
                     
                     <div className="bg-[#1e293b] border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
                         <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                             <div className="flex gap-1.5">
                                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             </div>
                             <span className="ml-2 text-xs font-mono text-slate-400">main.py</span>
                         </div>
                         <pre className="p-4 sm:p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-slate-300 CustomScrollbar">
                             <code>{pythonScript}</code>
                         </pre>
                     </div>
                 </div>
             </div>
        </div>
      </main>
    </div>
  );
}

