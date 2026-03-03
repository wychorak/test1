import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "motion/react";
import { forwardRef, ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "glass" | "outline" | "white";
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 overflow-hidden group",
          variant === "primary" && "bg-navy text-white shadow-lg hover:shadow-xl hover:shadow-navy/20",
          variant === "white" && "bg-white text-navy shadow-lg hover:shadow-xl hover:bg-white/90",
          variant === "glass" && "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/20",
          variant === "outline" && "border border-navy/20 text-navy hover:bg-navy/5",
          className
        )}
        {...props}
      >
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <span className="relative z-10">{children as ReactNode}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
