"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import PageTransition from "@/components/PageTransition";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxWrapper = dynamic(() => import('@/components/MapboxWrapper'), { ssr: false });
import { 
  CloudLightning, 
  MapPin, 
  ShieldCheck, 
  TrendingUp,
  Activity,
  AlertTriangle,
  Zap,
  IndianRupee,
  CloudRain,
  Settings,
  Wifi
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Type definition
interface TriggerEvent {
  id: number;
  zone: string;
  triggerType: string;
  amount: string;
  status: string;
  active: boolean;
  icon: ReactNode;
  timestamp: string;
  workerId?: string;
  color?: string;
  coordinates?: { lat: number; lng: number };
}

const generateWorkerId = () => `WKR-${Math.floor(1000 + Math.random() * 9000)}`;

const CHENNAI_ZONES: Record<string, { lat: number; lng: number }> = {
  "Velachery, CHN": { lat: 12.9815, lng: 80.2226 },
  "T. Nagar, CHN": { lat: 13.0418, lng: 80.2341 },
  "Adyar, CHN": { lat: 13.0012, lng: 80.2565 },
  "Guindy, CHN": { lat: 13.0067, lng: 80.2206 },
  "Sholinganallur, CHN": { lat: 12.9010, lng: 80.2279 },
  "Koramangala, BLR": { lat: 12.9352, lng: 77.6245 },
  "Bandra West, MUM": { lat: 19.0596, lng: 72.8295 },
  "Hinjewadi, PUNE": { lat: 18.5913, lng: 73.7389 }
};

// TriggerCard Component
const TriggerCard = ({ event, isActive, onClick }: { event: TriggerEvent, isActive: boolean, onClick?: () => void }) => (
  <motion.div 
    onClick={onClick}
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      borderColor: isActive ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.1)"
    }}
    className="p-4 border rounded-xl bg-white/5 backdrop-blur-md relative overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
  >
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
    <div className="flex justify-between items-center relative z-10">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-400">{event.zone}</h3>
      </div>
      {isActive ? (
        <motion.span 
          animate={{ opacity: [1, 0.4, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
        />
      ) : (
        <span className="h-2 w-2 rounded-full bg-gray-600" />
      )}
    </div>
    <div className="mt-3 flex items-center justify-between relative z-10">
      <div>
        <p className="text-lg font-heading font-bold flex items-center gap-2">
          {event.icon} {event.triggerType}
        </p>
      </div>
    </div>
    <p className="text-xs text-primary mt-2 font-mono font-medium tracking-tight opacity-90 relative z-10">
      Payout: ₹{event.amount} • <span className="opacity-70">{event.status}</span>
    </p>
  </motion.div>
);

// Rolling Number Component
const RollingNumber = ({ value }: { value: number }) => {
  const springValue = useSpring(0, { stiffness: 50, damping: 15 });
  const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString('en-IN'));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span>{displayValue}</motion.span>;
};

const useGigShieldSimulation = () => {
  const [riskLevel, setRiskLevel] = useState(30);
  const [protectedEarnings, setProtectedEarnings] = useState(17790);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isAutoPilot, setIsAutoPilot] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [pulseLocation, setPulseLocation] = useState<{lng: number, lat: number, color?: string} | null>({ lng: 80.2341, lat: 13.0418, color: "var(--color-primary)" });
  
  const [events, setEvents] = useState<TriggerEvent[]>([
    { id: 1, zone: "Koramangala, BLR", triggerType: "Extreme Heat", amount: "250", status: "Paid via UPI", active: false, icon: <Zap className="w-5 h-5 text-amber-500" />, timestamp: new Date(Date.now() - 3600000).toISOString(), workerId: generateWorkerId(), color: "#f59e0b", coordinates: CHENNAI_ZONES["Koramangala, BLR"] },
    { id: 2, zone: "Bandra West, MUM", triggerType: "Waterlogging", amount: "400", status: "Processing", active: true, icon: <CloudLightning className="w-5 h-5 text-amber-500" />, timestamp: new Date(Date.now() - 1800000).toISOString(), workerId: generateWorkerId(), color: "#f59e0b", coordinates: CHENNAI_ZONES["Bandra West, MUM"] },
    { id: 3, zone: "Hinjewadi, PUNE", triggerType: "AQI > 300", amount: "150", status: "Paid via UPI", active: false, icon: <Activity className="w-5 h-5 text-purple-500" />, timestamp: new Date(Date.now() - 7200000).toISOString(), workerId: generateWorkerId(), color: "#a855f7", coordinates: CHENNAI_ZONES["Hinjewadi, PUNE"] }
  ]);

  const triggerSimulatorEvent = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const zones = ["Velachery, CHN", "T. Nagar, CHN", "Adyar, CHN", "Guindy, CHN", "Sholinganallur, CHN"];
    const randomZone = zones[Math.floor(Math.random() * zones.length)];
    const payout = Math.floor(Math.random() * (900 - 400 + 1)) + 400;
    
    const types = [
      { type: "Heavy Rain Alert", color: "#06b6d4", icon: <CloudRain className="w-5 h-5 text-cyan-500" /> },
      { type: "Waterlogging", color: "#f59e0b", icon: <CloudLightning className="w-5 h-5 text-amber-500" /> },
      { type: "AQI Spike", color: "#a855f7", icon: <Activity className="w-5 h-5 text-purple-500" /> }
    ];
    const triggerClass = types[Math.floor(Math.random() * types.length)];
    
    setRiskLevel(Math.floor(Math.random() * 20) + 75); // high risk
    
    const coords = CHENNAI_ZONES[randomZone];
    if (coords) {
      setPulseLocation({ lng: coords.lng, lat: coords.lat, color: triggerClass.color });
    }

    const newEvent: TriggerEvent = { 
      id: Date.now(), 
      zone: randomZone, 
      triggerType: triggerClass.type, 
      amount: payout.toString(), 
      status: "Triggering Smart Contract...", 
      active: true,
      icon: triggerClass.icon,
      timestamp: new Date().toISOString(),
      workerId: generateWorkerId(),
      color: triggerClass.color,
      coordinates: coords
    };
    
    setEvents(prev => [newEvent, ...prev.slice(0, 5)]);

    toast.info("Parametric Trigger Detected", {
      description: `${newEvent.triggerType} in ${randomZone.split(',')[0]}. Initiating payouts...`,
      icon: triggerClass.icon,
      duration: 3000,
    });

    setTimeout(() => {
      setProtectedEarnings(prev => prev + payout);
      toast.success("Payout Dispatched", {
        description: `Automatic Payout of ₹${payout} sent to partner ${newEvent.workerId} via UPI.`,
        icon: <ShieldCheck className="text-chart-2 w-5 h-5" />,
        duration: 4000,
      });
      setEvents(prev => {
        const up = [...prev];
        if(up[0]) up[0] = { ...up[0], status: "Paid via UPI", active: false };
        return up;
      });
      setIsSimulating(false);
    }, 3000);
  };

  // Auto-Pilot Generator Timer
  useEffect(() => {
    if (!isAutoPilot) return;
    
    const interval = setInterval(() => {
      triggerSimulatorEvent();
    }, 12000);
    
    return () => clearInterval(interval);
  }, [isAutoPilot, isSimulating]);

  // 10-second auto-recovery decay for risk gauge
  useEffect(() => {
    if (riskLevel > 45 && !isSimulating) {
      const timer = setTimeout(() => {
        setRiskLevel(45);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [riskLevel, isSimulating]);

  return {
    riskLevel,
    protectedEarnings,
    isSimulating,
    events,
    triggerRainEvent: triggerSimulatorEvent,
    isAutoPilot,
    setIsAutoPilot,
    pulseLocation,
    setPulseLocation,
    apiError
  };
};

export default function GigShieldDashboard() {
  const { 
    riskLevel, 
    protectedEarnings, 
    isSimulating, 
    events, 
    triggerRainEvent, 
    isAutoPilot, 
    setIsAutoPilot,
    pulseLocation,
    setPulseLocation,
    apiError
  } = useGigShieldSimulation();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const bentoItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-8 font-sans selection:bg-primary/30 h-full overflow-y-auto w-full pb-20 md:pb-8">
        {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tighter flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary shadow-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            GigShield
          </h1>
          <p className="text-muted-foreground mt-2 text-sm font-medium leading-relaxed">Real-Time Parametric Monitoring</p>
        </div>

        <div className="flex gap-4 items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
           {apiError ? (
             <span className="text-sm font-semibold text-amber-500 animate-pulse flex items-center gap-2">
               <Wifi className="w-4 h-4" /> Reconnecting...
             </span>
           ) : (
             <>
               <Zap className={`w-4 h-4 ${isAutoPilot ? 'text-emerald-500' : 'text-gray-400'}`} />
               <span className="text-sm font-semibold text-gray-300">
                 {isAutoPilot ? 'Auto-Pilot Online' : 'Manual Mode'}
               </span>
             </>
           )}
           <span className="w-px h-4 bg-white/20 mx-2" />
           <div className="text-sm font-mono tracking-wider flex items-center">
             <IndianRupee className="w-3.5 h-3.5 mr-1" />
             <RollingNumber value={protectedEarnings} />
           </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        
        {/* HERO CARD (Live City Pulse) - Span 8 columns */}
        <motion.div 
          variants={bentoItem}
          whileHover={{ scale: 1.01 }}
          className="col-span-1 md:col-span-8 group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[8px] overflow-hidden min-h-[400px] flex flex-col"
        >
          {/* Mapbox Live Map */}
          <div className="absolute inset-0 z-0">
            <MapboxWrapper 
              pulseLocation={pulseLocation}
              isAutoPilot={isAutoPilot}
            />
          </div>
          
          <div className="p-8 relative z-10 flex-1 flex flex-col bg-gradient-to-t from-background via-background/60 to-transparent">
            <div className="flex justify-between items-start mt-auto pt-24 pb-4">
              <div>
                <Badge variant="outline" className="bg-background/80 text-primary border-primary/50 uppercase tracking-widest text-xs px-3 py-1 font-semibold mb-4 backdrop-blur-md shadow-[0_0_10px_var(--color-primary)]">
                  Live Vector Coverage
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tighter mb-3 leading-tight flex items-center gap-2">
                  <span className="drop-shadow-lg">Chennai Metro Grid</span>
                </h2>
                <p className="text-gray-200 drop-shadow-md font-medium leading-relaxed w-full max-w-[60%]">
                  Listening to telemetry across 15,000+ localized parametric nodes representing active partners.
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex flex-col gap-3 items-end">
                <Button 
                  onClick={() => setIsAutoPilot(!isAutoPilot)}
                  variant="outline"
                  className={`border-white/20 bg-background/60 backdrop-blur-md transition-all ${isAutoPilot ? 'text-primary border-primary/50' : 'text-gray-400'}`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {isAutoPilot ? 'Auto-Pilot ON' : 'Auto-Pilot OFF'}
                </Button>
                
                {!isAutoPilot && (
                  <Button 
                    onClick={() => triggerRainEvent()}
                    disabled={isSimulating}
                    className="bg-primary/20 text-primary hover:bg-primary/40 border border-primary/50 backdrop-blur-md transition-all font-semibold relative overflow-hidden shadow-lg"
                  >
                    <CloudRain className="w-4 h-4 mr-2" />
                    Simulate Spike
                    {isSimulating && (
                      <motion.div 
                        className="absolute inset-0 bg-primary/20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Risk Gauge */}
            <div className="bg-black/60 p-6 rounded-2xl border border-white/10 backdrop-blur-lg shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex justify-between items-end mb-4 relative z-10">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${riskLevel > 80 ? 'text-destructive' : 'text-amber-500'}`} />
                    Aggregated Risk Level
                  </h3>
                  <div className="text-5xl font-mono font-bold tracking-tighter flex items-baseline gap-1">
                    <RollingNumber value={riskLevel} />
                    <span className="text-xl font-sans font-medium text-muted-foreground tracking-normal leading-none">%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold uppercase tracking-wider ${riskLevel > 80 ? 'text-destructive' : 'text-primary'}`}>
                    {riskLevel > 80 ? 'CRITICAL - PAYOUTS ARMED' : 'NOMINAL'}
                  </span>
                </div>
              </div>
              
              <div className="relative h-3 w-full bg-gray-800 rounded-full overflow-hidden z-10">
                <motion.div 
                  className={`absolute top-0 left-0 h-full rounded-full ${riskLevel > 80 ? 'bg-destructive shadow-[0_0_15px_var(--color-destructive)]' : 'bg-primary shadow-[0_0_10px_var(--color-primary)]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${riskLevel}%` }}
                  transition={{ type: "spring", stiffness: 40, damping: 10 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* FEED CARD - Span 4 columns */}
        <motion.div 
          variants={bentoItem}
          className="col-span-1 md:col-span-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[8px] p-6 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Trigger Feed</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide flex flex-col relative h-[400px]">
            <AnimatePresence mode="popLayout">
              {events.map((evt) => (
                <motion.div key={evt.id} layout initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 100, damping: 15 }}>
                  <TriggerCard event={evt} isActive={evt.active} onClick={() => {
                    if (evt.coordinates) {
                      setPulseLocation({ lng: evt.coordinates.lng, lat: evt.coordinates.lat, color: evt.color });
                    }
                  }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RECENT TRANSACTIONS LEDGER - Span 8 columns */}
        <motion.div 
          variants={bentoItem}
          className="col-span-1 md:col-span-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[8px] p-8 relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30 px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                Immutable Ledger Active
              </Badge>
              <h2 className="text-2xl font-heading font-bold leading-tight mb-2">Recent Transactions</h2>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">Protected Earnings disbursements to worker UPI accounts.</p>
            </div>
          </div>

          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 px-4 font-semibold">Worker ID</th>
                  <th className="pb-3 px-4 font-semibold">Zone</th>
                  <th className="pb-3 px-4 font-semibold">Trigger</th>
                  <th className="pb-3 px-4 font-semibold text-right">Amount</th>
                  <th className="pb-3 px-4 font-semibold text-right">Status</th>
                  <th className="pb-3 px-4 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <AnimatePresence mode="popLayout">
                  {events.map((evt, i) => (
                    <motion.tr 
                      key={evt.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group/row"
                    >
                      <td className="py-4 px-4 font-mono text-gray-300">
                        {hasMounted ? evt.workerId : 'WKR-0000'}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{evt.zone.split(',')[0]}</td>
                      <td className="py-4 px-4 flex items-center gap-2 text-gray-300">
                        {evt.triggerType.includes('Rain') || evt.triggerType.includes('Waterlogging') ? <CloudRain className="w-3.5 h-3.5 text-blue-500" /> : evt.triggerType.includes('AQI') ? <Activity className="w-3.5 h-3.5 text-gray-500" /> : <Zap className="w-3.5 h-3.5 text-amber-500" />}
                        {evt.triggerType}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-200">₹{evt.amount}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium ${evt.active ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-chart-2/10 text-chart-2 border border-chart-2/20 shadow-[0_0_5px_rgba(16,185,129,0.3)]'}`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-500 text-xs font-mono">
                         {hasMounted ? new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "00:00:00 AM"}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* METRICS CARD - Span 4 columns */}
        <motion.div 
          variants={bentoItem}
          whileHover={{ scale: 1.02 }}
          className="col-span-1 md:col-span-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[8px] p-8 flex flex-col justify-between"
        >
           <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                <div className="text-xl font-bold font-mono mt-1 text-primary shadow-primary">₹<RollingNumber value={protectedEarnings} /></div>
              </div>
           </div>
           <div>
             <div className="flex justify-between text-sm mb-2 text-gray-400">
               <span>Daily Shield Capacity</span>
               <span>78%</span>
             </div>
             <Progress value={78} className="h-2 bg-gray-800 [&>div]:bg-primary" />
           </div>
           <p className="text-xs text-muted-foreground mt-4 leading-relaxed border-t border-white/10 pt-4">
             GigShield uses real-time API integrations with Mapbox telemetry, meteorological nodes, and air quality indexes to autonomously trigger income protection clauses in smart contracts.
           </p>
        </motion.div>
        
      </motion.div>
      </div>
    </PageTransition>
  );
}
