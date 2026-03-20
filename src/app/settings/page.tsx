"use client";
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, ShieldCheck, CheckCircle2, User, CreditCard, Bell, TestTube } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [upid, setUpid] = useState("ravi.gig@oksbi");
  const [toggles, setToggles] = useState({ alerts: true, weather: true, premium: false });

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  const handleTestPayout = () => {
    toast.info("Initiating Test Transaction...", {
      description: `Connecting to NPCI gateway for ${upid}`,
    });
    setTimeout(() => {
      toast.success("Test Payout Successful", {
        description: `₹1.00 successfully deposited to ${upid}`,
        icon: <ShieldCheck className="w-5 h-5 text-chart-2" />,
      });
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-8 font-sans h-full overflow-y-auto w-full pb-20 md:pb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <h1 className="text-3xl font-heading font-extrabold tracking-tighter flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            System Settings
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base font-medium leading-relaxed">Manage your identity, payout destinations, and system preferences.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Identity & Profile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-6 items-center md:items-start"
          >
            <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-heading font-bold text-white mb-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
                Ravi Kumar 
                <span className="bg-chart-2/20 text-chart-2 text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-semibold border border-chart-2/30 flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-3 h-3" /> Aadhaar Verified
                </span>
              </h2>
              <p className="text-gray-400 font-medium text-sm mb-5">Partner ID: WKR-8492 • Joined Jan 2025</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Lifetime Protected</p>
                  <p className="text-xl font-mono font-bold tracking-tighter text-white">₹42,500</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Active Triggers</p>
                  <p className="text-xl font-mono font-bold tracking-tighter text-white">14</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 md:pb-0">
            {/* Payout Destination */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
                <CreditCard className="w-4 h-4 text-primary" />
                Payout Destination
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Primary Target (UPI)</label>
                  <input 
                    type="text" 
                    value={upid}
                    onChange={(e) => setUpid(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all tracking-tight"
                  />
                  <p className="text-xs font-medium opacity-70 text-gray-400 mt-3 flex items-start gap-1.5 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-chart-2 shrink-0" />
                    Funds are instantly released via smart contract directly to this UPI.
                  </p>
                </div>
                
                <button 
                  onClick={handleTestPayout}
                  className="w-full mt-4 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-xl py-3 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  Run Test Payout (₹1.00)
                </button>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
                <Bell className="w-4 h-4 text-purple-400" />
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {[
                  { id: 'alerts', label: "Instant Payout Alerts", desc: "Push notification when a smart contract triggers." },
                  { id: 'weather', label: "Weather Warnings", desc: "Pre-emptive AI alerts for high probability events." },
                  { id: 'premium', label: "Weekly Premium Reminders", desc: "Reminders to top-up wallet for next week's policy." },
                ].map((toggle) => (
                  <div key={toggle.id} className="flex items-center justify-between p-3 bg-black/30 border border-white/5 rounded-2xl gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">{toggle.label}</p>
                      <p className="text-[10px] md:text-xs text-gray-400 leading-tight">{toggle.desc}</p>
                    </div>
                    {/* Glassmorphic Toggle */}
                    <button 
                      onClick={() => setToggles(p => ({ ...p, [toggle.id]: !p[toggle.id as keyof typeof toggles] }))}
                      className={`w-12 h-6 shrink-0 rounded-full relative transition-colors ${toggles[toggle.id as keyof typeof toggles] ? 'bg-primary' : 'bg-gray-700'}`}
                    >
                      <motion.div 
                        className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                        animate={{ left: toggles[toggle.id as keyof typeof toggles] ? "calc(100% - 22px)" : "2px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
