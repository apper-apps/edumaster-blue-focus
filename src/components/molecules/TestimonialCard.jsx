import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const TestimonialCard = ({ testimonial, onEdit, onDelete, onPin, showActions = false, currentUser }) => {
  const isAdmin = currentUser?.role === "admin";
  
  return (
    <div className="premium-card rounded-xl p-4 transition-all duration-300 hover:shadow-lg">
      {testimonial.isPinned && (
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="warning" size="sm">
            <ApperIcon name="Pin" size={12} className="mr-1" />
            우수후기
          </Badge>
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={20} className="text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-slate-800">학습자</span>
            <span className="text-sm text-slate-500">
              {format(new Date(testimonial.createdAt), "M월 d일", { locale: ko })}
            </span>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            {testimonial.content}
          </p>
          
          {showActions && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(testimonial)}
              >
                <ApperIcon name="Edit" size={16} />
              </Button>
              
              {isAdmin && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPin(testimonial.Id)}
                  >
                    <ApperIcon name={testimonial.isPinned ? "PinOff" : "Pin"} size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(testimonial.Id)}
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;