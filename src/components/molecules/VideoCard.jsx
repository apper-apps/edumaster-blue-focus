import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const VideoCard = ({ video, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  
  const getYoutubeThumbnail = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    
    let videoId = null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      videoId = match[1];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return video.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  };

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

  return (
    <div className="premium-card rounded-xl overflow-hidden video-thumbnail transition-all duration-300 group relative">
      {video.isPinned && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="warning" size="sm">
            <ApperIcon name="Pin" size={12} className="mr-1" />
            고정
          </Badge>
        </div>
      )}
      
      <div 
        className="relative cursor-pointer"
        onClick={() => navigate(`/video/${video.Id}`)}
      >
        <img
          src={getYoutubeThumbnail(video.videos?.[0]?.url)}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
            <ApperIcon name="Play" size={24} className="text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {video.videos?.length || 0}개 강의
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {video.allowedRoles?.map(role => (
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
                  onEdit(video);
                }}
              >
                <ApperIcon name="Edit" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(video.Id);
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

export default VideoCard;