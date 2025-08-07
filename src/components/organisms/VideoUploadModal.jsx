import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const VideoUploadModal = ({ isOpen, onClose, onSave, editingVideo = null }) => {
  const [formData, setFormData] = useState(() => ({
    title: editingVideo?.title || "",
    description: editingVideo?.description || "",
    thumbnailUrl: editingVideo?.thumbnailUrl || "",
    videos: editingVideo?.videos || [{ title: "", url: "" }],
    allowedRoles: editingVideo?.allowedRoles || ["free"],
    isPinned: editingVideo?.isPinned || false
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (formData.videos.some(video => !video.title.trim() || !video.url.trim())) {
      toast.error("모든 강의의 제목과 URL을 입력해주세요.");
      return;
    }

    await onSave({
      ...formData,
      videos: formData.videos.filter(video => video.title.trim() && video.url.trim())
    });
    
    onClose();
    setFormData({
      title: "",
      description: "",
      thumbnailUrl: "",
      videos: [{ title: "", url: "" }],
      allowedRoles: ["free"],
      isPinned: false
    });
  };

  const addVideoField = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, { title: "", url: "" }]
    }));
  };

  const removeVideoField = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const updateVideoField = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((video, i) => 
        i === index ? { ...video, [field]: value } : video
      )
    }));
  };

  const toggleRole = (role) => {
    setFormData(prev => ({
      ...prev,
      allowedRoles: prev.allowedRoles.includes(role)
        ? prev.allowedRoles.filter(r => r !== role)
        : [...prev.allowedRoles, role]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              {editingVideo ? "강의 수정" : "새 강의 업로드"}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="강의 제목"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="강의 제목을 입력하세요"
            required
          />

          <Textarea
            label="강의 설명"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="강의에 대한 설명을 입력하세요"
            rows={3}
          />

          <Input
            label="썸네일 이미지 URL (선택사항)"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                커리큘럼 강의 목록
              </label>
              <Button type="button" variant="primary" size="sm" onClick={addVideoField}>
                <ApperIcon name="Plus" size={16} className="mr-1" />
                강의 추가
              </Button>
            </div>
            
            {formData.videos.map((video, index) => (
              <div key={index} className="p-4 border-2 border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    강의 {index + 1}
                  </span>
                  {formData.videos.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVideoField(index)}
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  )}
                </div>
                
                <Input
                  label="강의 제목"
                  value={video.title}
                  onChange={(e) => updateVideoField(index, "title", e.target.value)}
                  placeholder={`${index + 1}번 강의 제목`}
                  required
                />
                
                <Input
                  label="YouTube URL"
                  value={video.url}
                  onChange={(e) => updateVideoField(index, "url", e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              접근 권한 설정
            </label>
            <div className="flex flex-wrap gap-2">
              {["free", "member", "master", "both"].map(role => (
                <label key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allowedRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                    className="mr-2"
                  />
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="isPinned" className="text-sm font-medium text-slate-700">
              상단 고정
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {editingVideo ? "수정하기" : "업로드"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadModal;