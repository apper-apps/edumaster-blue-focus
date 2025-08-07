import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import VideoCard from "@/components/molecules/VideoCard";
import BlogCard from "@/components/molecules/BlogCard";
import courseService from "@/services/api/courseService";
import blogService from "@/services/api/blogService";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      
      const [coursesData, blogData] = await Promise.all([
        courseService.getAll(),
        blogService.getAll()
      ]);
      
      setCourses(coursesData.slice(0, 6)); // Show only 6 latest courses
      setBlogPosts(blogData.slice(0, 6)); // Show only 6 latest posts
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="premium-card rounded-2xl p-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">EduMaster</span>와 함께
            <br />
            성장하세요
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            전문가들의 고품질 강의를 통해 새로운 기술을 배우고, 
            실무에 바로 적용할 수 있는 실력을 키워보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/membership")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <ApperIcon name="Play" size={20} className="mr-2 inline" />
              멤버십 강의 보기
            </button>
            <button
              onClick={() => navigate("/insights")}
              className="bg-white text-slate-800 border-2 border-slate-300 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <ApperIcon name="BookOpen" size={20} className="mr-2 inline" />
              인사이트 읽기
            </button>
          </div>
        </div>
      </section>

      {/* Latest Courses */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              최신 강의
            </h2>
            <p className="text-slate-600">
              가장 최근에 업데이트된 강의를 확인해보세요
            </p>
          </div>
          <button
            onClick={() => navigate("/membership")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
          >
            전체보기 <ApperIcon name="ArrowRight" size={16} />
          </button>
        </div>

        {courses.length === 0 ? (
          <Empty
            title="강의가 없습니다"
            description="아직 등록된 강의가 없어요."
            icon="Video"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <VideoCard
                key={course.Id}
                video={course}
                showActions={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              최신 인사이트
            </h2>
            <p className="text-slate-600">
              전문가들의 최신 인사이트를 확인해보세요
            </p>
          </div>
          <button
            onClick={() => navigate("/insights")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
          >
            전체보기 <ApperIcon name="ArrowRight" size={16} />
          </button>
        </div>

        {blogPosts.length === 0 ? (
          <Empty
            title="인사이트가 없습니다"
            description="아직 등록된 인사이트가 없어요."
            icon="BookOpen"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.Id}
                post={post}
                showActions={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            왜 EduMaster인가요?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            체계적인 학습 시스템과 전문가 강의로 효율적인 성장을 지원합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Users" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">전문가 강의</h3>
            <p className="text-slate-600 leading-relaxed">
              현업 전문가들의 실무 경험이 담긴 고품질 강의를 제공합니다.
            </p>
          </div>

          <div className="premium-card rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Target" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">맞춤형 학습</h3>
            <p className="text-slate-600 leading-relaxed">
              개인의 수준과 목표에 맞는 체계적인 커리큘럼을 제공합니다.
            </p>
          </div>

          <div className="premium-card rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Trophy" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">성과 중심</h3>
            <p className="text-slate-600 leading-relaxed">
              실무에 바로 적용할 수 있는 실용적인 지식과 스킬을 습득합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;