import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, ArrowRight, RefreshCw, Zap } from 'lucide-react';

const App = () => {
  const [status, setStatus] = useState('idle'); // idle, calculating, revealed
  const [loadingMsg, setLoadingMsg] = useState('');
  const [prediction, setPrediction] = useState(null);

  // The "Complex" Algorithms
  const loadingMessages = [
    "Consulting the temporal oracles...",
    "Adjusting for leap seconds...",
    "Aligning planetary retrograde...",
    "Parsing the space-time continuum...",
    "Adding 24 hours to 'Now'...",
  ];

  const predictTomorrow = () => {
    setStatus('calculating');
    
    // Simulate complex calculation with staggered messages
    let msgIndex = 0;
    setLoadingMsg(loadingMessages[0]);

    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < loadingMessages.length) {
        setLoadingMsg(loadingMessages[msgIndex]);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setPrediction(tomorrow.toLocaleDateString('en-US', options));
      setStatus('revealed');
    }, 4000);
  };

  const reset = () => {
    setStatus('idle');
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-black font-sans selection:bg-[#ff90e8] selection:text-black flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Main Card */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#ff90e8] border-b-4 border-black p-6 flex items-center justify-between">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              WHATDAYIS<span className="text-white">IT</span>
            </h1>
            <Zap className="w-8 h-8 fill-yellow-400 stroke-black stroke-2" />
          </div>

          <div className="p-8 flex flex-col items-center text-center min-h-[400px] justify-center">
            
            <AnimatePresence mode='wait'>
              
              {/* STATE: IDLE */}
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="bg-[#2a9d8f] p-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Calendar className="w-12 h-12 text-white stroke-[2.5px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Unsure about the future?</h2>
                    <p className="text-gray-600 font-medium px-4">
                      Our advanced AI (Artificial Intuition) can predict exactly what day it will be in approximately 24 hours.
                    </p>
                  </div>

                  <button 
                    onClick={predictTomorrow}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-black text-lg text-white transition-all duration-200 bg-black border-2 border-transparent rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#ff90e8]"
                  >
                    PREDICT NOW
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* STATE: CALCULATING */}
              {status === 'calculating' && (
                <motion.div 
                  key="calculating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full"
                >
                  <div className="flex flex-col items-center gap-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-16 h-16 border-8 border-black border-t-[#ff90e8] rounded-full"
                    />
                    
                    <div className="space-y-2 w-full">
                      <h3 className="text-xl font-bold uppercase animate-pulse">Processing</h3>
                      <div className="h-6 overflow-hidden relative">
                         <motion.p 
                           key={loadingMsg}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           className="text-sm font-mono bg-yellow-300 inline-block px-2 border border-black transform -rotate-1"
                         >
                           {loadingMsg}
                         </motion.p>
                      </div>
                    </div>

                    {/* Fake Progress Bar */}
                    <div className="w-full bg-gray-200 h-4 border-2 border-black rounded-full overflow-hidden relative">
                      <motion.div 
                        className="h-full bg-[#ff90e8] absolute top-0 left-0"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4 }}
                      />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE: REVEALED */}
              {status === 'revealed' && (
                <motion.div 
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center gap-6 w-full"
                >
                  <div className="relative">
                    <Sparkles className="absolute -top-8 -right-8 w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" />
                    <Sparkles className="absolute -bottom-4 -left-8 w-8 h-8 text-[#ff90e8] fill-[#ff90e8] animate-pulse" />
                    
                    <div className="bg-blue-500 text-white p-6 rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                      <p className="font-mono text-sm uppercase tracking-widest mb-1 opacity-80">The Oracle Declares</p>
                      <h2 className="text-4xl font-black leading-tight">
                        {prediction}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 italic max-w-xs">
                    *Prediction accuracy 99.9%. Void where prohibited by time travel laws.
                  </p>

                  <button 
                    onClick={reset}
                    className="mt-4 flex items-center gap-2 text-black font-bold hover:underline decoration-4 decoration-[#ff90e8] underline-offset-4"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Predict Another
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          
          {/* Footer Bar */}
          <div className="bg-gray-100 border-t-4 border-black p-3 flex justify-between text-xs font-mono font-bold text-gray-400">
             <span>V 1.0.0</span>
             <span>SECURE CONNECTION</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;