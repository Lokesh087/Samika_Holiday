import { Send, Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="bg-[#070b14] border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-left">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIP Insider Access</span>
          </span>
          <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight">
            Subscribe To Our Exclusive Newsletter
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Get private jet invites, seasonal discounts & luxury travel guides delivered to your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto max-w-md flex-1">
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to VIP Newsletter!'); }} className="relative flex items-center">
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="w-full bg-slate-900/90 border border-slate-700/80 text-white placeholder:text-slate-500 pl-6 pr-16 py-4 rounded-full focus:outline-none focus:border-emerald-400 text-xs font-semibold shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 p-3 bg-gradient-to-r from-[#059669] to-[#06b6d4] hover:from-emerald-500 hover:to-cyan-400 text-slate-950 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
