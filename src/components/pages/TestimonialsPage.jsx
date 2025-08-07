import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import testimonialService from "@/services/api/testimonialService";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [currentUser] = useState({ role: "admin" }); // Mock user

  const loadTestimonials = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await testimonialService.getAll();
      
      // Sort by pinned first, then by creation date
      data.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setTestimonials(data.filter(t => !t.isHidden));
    } catch (err) {
      setError("후기 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    
    if (!newContent.trim()) {
      toast.error("후기 내용을 입력해주세요.");
      return;
    }

    if (newContent.length > 500) {
      toast.error("후기는 500자 이내로 작성해주세요.");
      return;
    }

    try {
      await testimonialService.create({
        content: newContent.trim(),
        userId: "current-user"
      });
      
      toast.success("후기가 작성되었습니다.");
      setNewContent("");
      loadTestimonials();
    } catch (err) {
      toast.error("후기 작성에 실패했습니다.");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setEditContent(testimonial.content);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    if (!editContent.trim()) {
      toast.error("후기 내용을 입력해주세요.");
      return;
    }

    if (editContent.length > 500) {
      toast.error("후기는 500자 이내로 작성해주세요.");
      return;
    }

    try {
      await testimonialService.update(editingTestimonial.Id, {
        content: editContent.trim()
      });
      
      toast.success("후기가 수정되었습니다.");
      setEditingTestimonial(null);
      setEditContent("");
      loadTestimonials();
    } catch (err) {
      toast.error("후기 수정에 실패했습니다.");
    }
  };

  const handlePin = async (testimonialId) => {
    try {
      const testimonial = testimonials.find(t => t.Id === testimonialId);
      await testimonialService.update(testimonialId, {
        isPinned: !testimonial.isPinned
      });
      
      toast.success(testimonial.isPinned ? "고정이 해제되었습니다." : "우수후기로 고정되었습니다.");
      loadTestimonials();
    } catch (err) {
      toast.error("후기 고정 처리에 실패했습니다.");
    }
  };

  const handleDelete = async (testimonialId) => {
    if (!confirm("정말 이 후기를 삭제하시겠습니까?")) return;
    
    try {
      await testimonialService.delete(testimonialId);
      toast.success("후기가 삭제되었습니다.");
      loadTestimonials();
    } catch (err) {
      toast.error("후기 삭제에 실패했습니다.");
    }
  };

  const cancelEdit = () => {
    setEditingTestimonial(null);
    setEditContent("");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTestimonials} />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          도전 후기
        </h1>
        <p className="text-slate-600">
          학습자들의 성공 경험과 도전 후기를 공유해주세요
        </p>
      </div>

      {/* New Testimonial Form */}
      <div className="premium-card rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmitNew} className="space-y-4">
          <Textarea
            placeholder="여러분의 학습 경험이나 도전 후기를 공유해주세요... (최대 500자)"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            className="resize-none"
          />
          
          <div className="flex items-center justify-between">
            <span className={`text-sm ${newContent.length > 500 ? "text-red-500" : "text-slate-500"}`}>
              {newContent.length}/500자
            </span>
            
            <Button
              type="submit"
              variant="primary"
              disabled={!newContent.trim() || newContent.length > 500}
            >
              <ApperIcon name="Send" size={16} className="mr-2" />
              후기 작성
            </Button>
          </div>
        </form>
      </div>

      {/* Edit Form */}
      {editingTestimonial && (
        <div className="premium-card rounded-xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">후기 수정</h3>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <Textarea
              placeholder="후기 내용을 수정하세요..."
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            
            <div className="flex items-center justify-between">
              <span className={`text-sm ${editContent.length > 500 ? "text-red-500" : "text-slate-500"}`}>
                {editContent.length}/500자
              </span>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelEdit}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!editContent.trim() || editContent.length > 500}
                >
                  수정 완료
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <Empty
          title="도전 후기가 없습니다"
          description="첫 번째 후기를 작성하여 다른 학습자들과 경험을 공유해보세요."
          icon="MessageSquare"
        />
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.Id}
              testimonial={testimonial}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPin={handlePin}
              showActions={true}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;