import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "heavy";
}

export function LiquidGlass({ className, intensity = "medium", children, ...props }: LiquidGlassProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        intensity === "light" && "bg-white/5 backdrop-blur-xl border border-white/10",
        intensity === "medium" && "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.05)]",
        intensity === "heavy" && "bg-white/20 backdrop-blur-3xl border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_12px_40px_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
      {children}
    </div>
  );
}
