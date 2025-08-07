import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg",
    secondary: "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
    xl: "px-8 py-4 text-xl rounded-xl"
  };

  return (
    <button
      className={cn(
        "font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;