import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "오류가 발생했습니다", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="premium-card rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        문제가 발생했습니다
      </h3>
      
      <p className="text-slate-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default Error;