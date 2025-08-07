import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className, 
  label,
  error,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          "w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;