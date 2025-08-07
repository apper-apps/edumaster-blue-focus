import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import RichTextEditor from "@/components/molecules/RichTextEditor";

const BlogUploadModal = ({ isOpen, onClose, onSave, editingPost = null }) => {
  const [formData, setFormData] = useState(() => ({
    title: editingPost?.title || "",
    content: editingPost?.content || "",
    thumbnailUrl: editingPost?.thumbnailUrl || "",
    allowedRoles: editingPost?.allowedRoles || ["free"]
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    await onSave(formData);
    onClose();
    setFormData({
      title: "",
      content: "",
      thumbnailUrl: "",
      allowedRoles: ["free"]
    });
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
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              {editingPost ? "글 수정" : "새 글 작성"}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="제목"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="글 제목을 입력하세요"
            required
          />

          <Input
            label="썸네일 이미지 URL (선택사항)"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              내용
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              placeholder="글 내용을 입력하세요..."
            />
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

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {editingPost ? "수정하기" : "발행하기"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogUploadModal;