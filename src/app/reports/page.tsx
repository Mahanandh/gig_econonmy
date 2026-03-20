"use client";
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { PieChart, TrendingUp, BrainCircuit, ShieldCheck, MapPin } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const zoneData = [
  { name: "Velachery", risk: 85, fill: "#ef4444" }, // Destructive / Red
  { name: "Adyar", risk: 79, fill: "#f59e0b" }, // Amber
  { name: "T. Nagar", risk: 72, fill: "#f59e0b" }, // Amber
];

const forecastData = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 8 },
  { day: "Thu", hours: 14 },
  { day: "Fri", hours: 10 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 1 },
];

export default function ReportsPage() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-8 font-sans h-full overflow-y-auto w-full pb-20 md:pb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <h1 className="text-3xl font-heading font-extrabold tracking-tighter flex items-center gap-3">
            <PieChart className="w-8 h-8 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            Risk Reports
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base font-medium leading-relaxed">City-wide analytics and AI-driven predictive disruption modeling.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Zone Risk Distribution */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Zone Risk Distribution
            </h3>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} width={80} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar dataKey="risk" radius={[0, 8, 8, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Impact Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-center"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
              <ShieldCheck className="w-4 h-4 text-chart-2" />
              Impact Summary
            </h3>
            
            <div className="space-y-6">
              <div className="bg-chart-2/10 border border-chart-2/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <p className="text-[10px] text-chart-2 uppercase tracking-widest font-bold mb-1">Protected Earnings</p>
                <p className="text-4xl font-mono font-bold tracking-tighter text-white">₹1.2M</p>
                <p className="text-xs font-medium text-chart-2 mt-2 flex items-center gap-1">+14% vs last week</p>
              </div>
              
              <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <p className="text-[10px] text-destructive uppercase tracking-widest font-bold mb-1">Potential Loss Prevented</p>
                <p className="text-4xl font-mono font-bold tracking-tighter text-white">₹8.5M</p>
                <p className="text-xs font-medium text-destructive mt-2 flex items-center gap-1">Across 15,000+ workers</p>
              </div>
            </div>
          </motion.div>

          {/* AI Insights Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md flex flex-col"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15)_0%,transparent_50%)] animate-pulse pointer-events-none" />
            
            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 flex items-center gap-2 mb-6 relative z-10">
              <BrainCircuit className="w-4 h-4" />
              AI Risk Insights
            </h3>
            
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-200 leading-relaxed">
                  System predicts <span className="text-destructive font-bold font-mono tracking-tighter">15%</span> increase in rain-related disruptions for <span className="text-white font-semibold">Velachery</span> due to low-pressure buildup.
                </p>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-200 leading-relaxed">
                  <span className="text-chart-2 font-bold">Active Shield</span> smart contracts are pre-funded. Expected auto-payout latency: <span className="font-mono font-bold text-white tracking-tighter">1.2s</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Disruption Forecast */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Predicted Disruption Hours (Next 7 Days)
              </h3>
            </div>
            
            <div className="h-[250px] md:h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDisruption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'monospace' }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}h`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDisruption)" name="Disruption Hours" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
