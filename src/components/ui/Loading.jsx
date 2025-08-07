import React from "react";

const Loading = ({ className = "", type = "skeleton" }) => {
  if (type === "spinner") {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse space-y-4 p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="premium-card rounded-xl p-4 space-y-3">
            <div className="w-full h-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4"></div>
              <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;