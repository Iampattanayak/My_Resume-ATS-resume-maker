import { Linkedin, Globe, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export function LandingFooter() {
  return (
    <footer className="relative h-100 overflow-hidden border-t border-border/70 bg-linear-to from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-900 dark:via-zinc-950 dark:to-black flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.1),transparent_70%)]" />

      <div className="relative z-10 pb-20 flex flex-col items-center justify-center text-center space-y-6 px-6">

        <div className="flex flex-col items-center gap-4">
          <p className="flex items-center gap-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Build by Akash Pattanayak
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/akashpattanayak2006/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group relative flex size-10 items-center justify-center rounded-full bg-background/50 border border-border/50 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500"
            >
              <Linkedin className="size-4 transition-colors" />
            </a>
            
            <a
              href="https://www.pattanayak.qzz.io/"
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              className="group relative flex size-10 items-center justify-center rounded-full bg-background/50 border border-border/50 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500"
            >
              <Globe className="size-4 transition-colors" />
            </a>

            <a
              href="https://www.instagram.com/akashpattanayak_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="group relative flex size-10 items-center justify-center rounded-full bg-background/50 border border-border/50 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-500"
            >
              <Instagram className="size-4 transition-colors" />
            </a>
          </div>
        </div>

        <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mt-6">
          &copy; {new Date().getFullYear()} My Resume. All rights reserved.     
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden">
        <p className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.75] tracking-tighter text-transparent bg-linear-to-b from-zinc-300/50 to-zinc-400/10 bg-clip-text dark:from-zinc-800/80 dark:to-zinc-900/20 select-none">
          MY RESUME
        </p>
      </div>
    </footer>
  );
}
