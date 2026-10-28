import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children, enabled }) => {
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Phone container */}
      <div className="w-full sm:max-w-[420px] bg-slate-100 sm:rounded-[44px] shadow-2xl sm:border-[10px] sm:border-slate-800 flex flex-col h-screen sm:h-[860px] overflow-hidden relative">
        {/* Android Top Status Bar */}
        <div className="bg-teal-900 text-teal-100 px-6 pt-2 pb-1 text-xs font-semibold flex items-center justify-between select-none z-50">
          <span className="font-mono text-[11px] tracking-tight">{currentTime}</span>

          {/* Camera punch-hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-950/80 mx-auto" />

          <div className="flex items-center gap-1.5 text-[11px]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <span>98%</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Inner Phone Content */}
        <div className="flex-1 overflow-y-auto relative scrollbar-none flex flex-col">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="bg-white/80 py-1.5 flex justify-center items-center pointer-events-none z-50 border-t border-slate-100">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
