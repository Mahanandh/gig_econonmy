"use client";
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import { useGlobalContext } from '@/context/GlobalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Check } from 'lucide-react';
import { toast } from 'sonner';

const plans = [
  {
    id: "Starter Shield",
    price: 49,
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    maxPayout: 500,
    features: ["Rain alerts only", "Manual claims", "Standard support"]
  },
  {
    id: "Active Shield",
    price: 89,
    popular: true,
    icon: ShieldAlert,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/50",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    maxPayout: 1500,
    features: ["Rain + Waterlogging", "Auto smart-contract", "Priority support"]
  },
  {
    id: "Full Shield",
    price: 149,
    icon: ShieldCheck,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    maxPayout: 2500,
    features: ["All triggers (AQI, Rain, Heat)", "Instant auto-claims", "24/7 VIP support"]
  }
];

export default function PolicyMarketplace() {
  const { setGlobalPremium, activePlan, setActivePlan } = useGlobalContext();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  const handleSelect = (plan: typeof plans[0]) => {
    setActivePlan(plan.id);
    setGlobalPremium(plan.price);
    toast.success("Policy Updated", {
      description: `You are now protected under ${plan.id}. Premium set to ₹${plan.price}/week.`,
      icon: <Check className="w-5 h-5 text-chart-2" />
    });
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-8 font-sans h-full overflow-y-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tighter mb-4 leading-tight">
            Coverage <span className="text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Marketplace</span>
          </h1>
          <p className="text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">Select the parametric protection plan that fits your weekly hustle. Switch anytime, no hidden fees.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 md:pb-0">
          {plans.map((plan, i) => {
            const isSelected = activePlan === plan.id;
            const Icon = plan.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={plan.id}
                className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-300 flex flex-col cursor-pointer ${isSelected ? `${plan.border} ${plan.bg} ${plan.shadow || ''} scale-100 md:scale-105 z-10` : 'border-white/10 bg-white/5 hover:bg-white/10 z-0'}`}
                onClick={() => handleSelect(plan)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold px-3 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_15px_var(--color-primary)] whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                {/* Active Indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-6 right-6 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center border border-primary text-primary shadow-[0_0_10px_var(--color-primary)]"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mb-6">
                  <Icon className={`w-10 h-10 ${plan.color} mb-4`} />
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{plan.id}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">₹{plan.price}</span>
                    <span className="text-gray-400 font-medium tracking-normal ml-1">/week</span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-2xl p-4 mb-6 border border-white/5">
                  <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">Max Weekly Payout</p>
                  <p className="text-2xl font-bold font-mono tracking-tighter text-white">₹{plan.maxPayout}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                      <Check className={`w-5 h-5 ${plan.color} shrink-0`} />
                      {feat}
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full py-3 rounded-xl font-bold transition-all ${isSelected ? 'bg-primary text-black shadow-[0_0_15px_var(--color-primary)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(plan);
                  }}
                >
                  {isSelected ? 'Active Plan' : 'Select Plan'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
