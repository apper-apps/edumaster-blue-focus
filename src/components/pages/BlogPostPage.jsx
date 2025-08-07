import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import BlogCard from "@/components/molecules/BlogCard";
import BlogUploadModal from "@/components/organisms/BlogUploadModal";
import blogService from "@/services/api/blogService";

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser] = useState({ role: "admin" }); // Mock user

  const loadPost = async () => {
    try {
      setError("");
      setLoading(true);
      const postData = await blogService.getById(parseInt(id));
      setPost(postData);
      
      // Load other posts
      const allPosts = await blogService.getAll();
      const filtered = allPosts.filter(p => p.Id !== postData.Id).slice(0, 6);
      setOtherPosts(filtered);
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleEditPost = async (postData) => {
    try {
      await blogService.update(post.Id, postData);
      toast.success("글이 수정되었습니다.");
      loadPost();
    } catch (err) {
      toast.error("글 수정에 실패했습니다.");
    }
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPost} />;
  if (!post) return <Error message="게시글을 찾을 수 없습니다." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/insights")}
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              인사이트 목록
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <ApperIcon name="Edit" size={16} className="mr-2" />
              수정
            </Button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Header */}
        <header className="mb-8">
          <div className="premium-card rounded-xl p-8">
            {post.thumbnailUrl && (
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>{format(new Date(post.createdAt), "yyyy년 M월 d일", { locale: ko })}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.allowedRoles?.map(role => (
                  <Badge key={role} variant={getRoleBadgeVariant(role)} size="sm">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className="premium-card rounded-xl p-8 mb-8">
          <div 
            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-800 prose-ul:text-slate-700 prose-ol:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              다른 인사이트 글
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((otherPost) => (
                <BlogCard
                  key={otherPost.Id}
                  post={otherPost}
                  showActions={false}
                />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Edit Modal */}
      <BlogUploadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditPost}
        editingPost={post}
      />
    </div>
  );
};

export default BlogPostPage;