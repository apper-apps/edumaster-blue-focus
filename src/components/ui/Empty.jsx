import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "콘텐츠가 없습니다", 
  description = "아직 등록된 콘텐츠가 없어요.", 
  actionText, 
  onAction,
  icon = "BookOpen",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="premium-card rounded-full p-8 mb-6">
        <ApperIcon name={icon} size={64} className="text-slate-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;