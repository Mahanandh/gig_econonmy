"use client";
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import { ShieldCheck, MapPin, Activity, Zap, CloudLightning, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerPortal() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-8 font-sans h-full overflow-y-auto w-full max-w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <h1 className="text-3xl font-heading font-extrabold tracking-tighter flex items-center gap-3">
            Worker Portal
          </h1>
          <p className="text-muted-foreground mt-2 text-sm font-medium leading-relaxed">Hello, Ravi! Here's your protection status.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 md:pb-0">
          {/* Active Shield Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border border-primary/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] pointer-events-none rounded-full" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_var(--color-primary)]">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Full Shield Active</h3>
                <p className="text-primary text-sm font-medium tracking-wide opacity-90">Parametric coverage online</p>
              </div>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="text-[10px] md:text-xs text-slate-500 mb-2 uppercase tracking-widest font-semibold">Weekly Renewal In</p>
                <div className="text-2xl font-mono font-bold tracking-tighter flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400 hidden sm:block" />
                  5d 4h 12m
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] md:text-xs text-slate-500 mb-2 uppercase tracking-widest font-semibold">Premium</p>
                <div className="text-2xl font-mono font-bold tracking-tighter">₹149<span className="text-sm font-sans font-medium text-gray-400 tracking-normal ml-1">/wk</span></div>
              </div>
            </div>
          </motion.div>

          {/* Personal Risk Gauge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Localized Risk
                </h3>
                <p className="text-gray-300 font-medium text-sm">Velachery, CHN • 600042</p>
              </div>
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-destructive/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <span className="text-xl font-mono font-bold tracking-tighter text-destructive absolute">82%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="4" className="text-destructive" strokeDasharray="163" strokeDashoffset="29.34" />
                </svg>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-destructive mb-2 font-semibold text-sm">
                <Activity className="w-4 h-4" /> Elevated Risk Detected
              </div>
              <p className="text-xs text-gray-300">High probability of waterlogging in your working zones tonight. Payout smart contracts are primed and ready.</p>
            </div>
          </motion.div>

          {/* Recent Payouts */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-chart-2" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Your Recent Payouts
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                { type: "Heavy Rain Protocol", amount: 450, date: "Today, 2:30 PM", icon: <CloudLightning className="text-blue-500 w-5 h-5" />, status: "Deposited to UPI" },
                { type: "Extreme AQI Drop", amount: 150, date: "Mar 15, 2026", icon: <Activity className="text-purple-500 w-5 h-5" />, status: "Deposited to UPI" },
              ].map((payout, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/5 p-3 rounded-full shrink-0">
                      {payout.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white mb-1">{payout.type}</h4>
                      <p className="text-xs font-medium text-gray-400">{payout.date}</p>
                    </div>
                  </div>
                  <div className="sm:text-right flex sm:block justify-between items-center sm:items-end">
                    <div className="font-bold text-chart-2 font-mono tracking-tighter text-xl mb-1">+₹{payout.amount}</div>
                    <div className="text-xs font-medium opacity-70 text-gray-400 uppercase tracking-widest">{payout.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
