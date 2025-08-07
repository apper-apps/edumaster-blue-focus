import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className 
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    primary: "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    free: "bg-gray-100 text-gray-800",
    member: "bg-blue-100 text-blue-800",
    master: "bg-purple-100 text-purple-800",
    admin: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;