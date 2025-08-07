import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import BlogCard from "@/components/molecules/BlogCard";
import BlogUploadModal from "@/components/organisms/BlogUploadModal";
import blogService from "@/services/api/blogService";

const InsightsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentUser] = useState({ role: "admin" }); // Mock user

  const loadPosts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await blogService.getAll();
      setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError("블로그 게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSavePost = async (postData) => {
    try {
      if (editingPost) {
        await blogService.update(editingPost.Id, postData);
        toast.success("글이 수정되었습니다.");
      } else {
        await blogService.create(postData);
        toast.success("새 글이 발행되었습니다.");
      }
      
      setEditingPost(null);
      loadPosts();
    } catch (err) {
      toast.error("글 저장에 실패했습니다.");
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsUploadModalOpen(true);
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("정말 이 글을 삭제하시겠습니까?")) return;
    
    try {
      await blogService.delete(postId);
      toast.success("글이 삭제되었습니다.");
      loadPosts();
    } catch (err) {
      toast.error("글 삭제에 실패했습니다.");
    }
  };

  const closeModal = () => {
    setIsUploadModalOpen(false);
    setEditingPost(null);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            인사이트
          </h1>
          <p className="text-slate-600">
            전문가들의 인사이트와 업계 동향을 확인하세요
          </p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <ApperIcon name="PenTool" size={20} className="mr-2" />
          새 글 작성
        </Button>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <Empty
          title="인사이트 글이 없습니다"
          description="아직 등록된 인사이트 글이 없어요. 첫 번째 글을 작성해보세요."
          actionText="글 작성하기"
          onAction={() => setIsUploadModalOpen(true)}
          icon="BookOpen"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.Id}
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              showActions={true}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <BlogUploadModal
        isOpen={isUploadModalOpen}
        onClose={closeModal}
        onSave={handleSavePost}
        editingPost={editingPost}
      />
    </div>
  );
};

export default InsightsPage;