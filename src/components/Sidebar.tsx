"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, ShieldAlert, PieChart, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '@/context/GlobalContext';

const navItems = [
  { name: 'City Monitor', href: '/', icon: LayoutDashboard },
  { name: 'Worker Portal', href: '/portal', icon: User },
  { name: 'Policy Marketplace', href: '/policies', icon: ShieldAlert },
  { name: 'Risk Reports', href: '/reports', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { globalPremium, activePlan } = useGlobalContext();

  return (
    <div className="w-16 md:w-64 h-screen shrink-0 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col z-50">
      <div className="p-4 md:p-6 flex justify-center md:justify-start">
        <h1 className="text-2xl font-heading font-extrabold tracking-tighter hidden md:flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-primary shadow-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          GigShield
        </h1>
        <ShieldCheck className="w-8 h-8 text-primary shadow-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] md:hidden mb-8" />
      </div>
      <nav className="space-y-2 px-2 md:px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/20 rounded-xl border border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] hidden md:block"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <div className="absolute inset-0 bg-primary/20 rounded-xl border border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] md:hidden" />
              )}
              <div className={`relative flex items-center justify-center md:justify-start gap-3 px-0 md:px-4 py-3 rounded-xl transition-colors font-medium ${isActive ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
                <Icon className="w-5 h-5 md:w-5 md:h-5" />
                <span className="hidden md:inline">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto p-4 md:p-6 hidden md:block">
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">Global Premium</h4>
          <div className="text-3xl font-bold font-mono tracking-tighter text-white mb-2">₹{globalPremium}<span className="text-sm font-medium font-sans text-gray-500 tracking-normal ml-1">/wk</span></div>
          <div className="text-xs text-primary font-medium opacity-90 flex justify-between items-center tracking-wide">
            {activePlan} Active
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
