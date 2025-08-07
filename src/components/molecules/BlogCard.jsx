import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const BlogCard = ({ post, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  
  const getRoleBadgeVariant = (role) => {
    const variants = {
      free: "free",
      member: "member", 
      master: "master",
      both: "primary",
      admin: "admin"
    };
    return variants[role] || "default";
  };

  const truncateContent = (html, maxLength = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="premium-card rounded-xl overflow-hidden video-thumbnail transition-all duration-300 group">
      <div 
        className="relative cursor-pointer"
        onClick={() => navigate(`/blog/${post.Id}`)}
      >
        <img
          src={post.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div 
          className="cursor-pointer"
          onClick={() => navigate(`/blog/${post.Id}`)}
        >
          <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-3 line-clamp-3">
            {truncateContent(post.content)}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
          <span>{format(new Date(post.createdAt), "yyyy년 M월 d일", { locale: ko })}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.allowedRoles?.map(role => (
              <Badge key={role} variant={getRoleBadgeVariant(role)} size="sm">
                {role}
              </Badge>
            ))}
          </div>
          
          {showActions && (
            <div className="flex gap-2 ml-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(post);
                }}
              >
                <ApperIcon name="Edit" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post.Id);
                }}
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;