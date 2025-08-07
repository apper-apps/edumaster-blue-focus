import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import VideoUploadModal from "@/components/organisms/VideoUploadModal";
import courseService from "@/services/api/courseService";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser] = useState({ role: "admin" }); // Mock user

  const loadCourse = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await courseService.getById(parseInt(id));
      setCourse(data);
    } catch (err) {
      setError("강의 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  const getVideoEmbedUrl = (url) => {
if (!url) return "";
    
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url;
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleEditCourse = async (courseData) => {
    try {
      await courseService.update(course.Id, courseData);
      toast.success("강의가 수정되었습니다.");
      loadCourse();
    } catch (err) {
      toast.error("강의 수정에 실패했습니다.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCourse} />;
  if (!course) return <Error message="강의를 찾을 수 없습니다." />;

  const currentVideo = course.videos?.[currentVideoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
                돌아가기
              </Button>
              
              <div>
                <h1 className="text-lg font-semibold text-slate-800">
                  {course.title}
                </h1>
                <p className="text-sm text-slate-600">
                  {currentVideo?.title || "강의를 선택해주세요"}
                </p>
              </div>
            </div>
            
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Video Player */}
          <div className="lg:flex-1">
            <div className="premium-card rounded-xl overflow-hidden mb-6">
              {currentVideo ? (
                <div className="aspect-video">
                  <iframe
                    src={getVideoEmbedUrl(currentVideo.url)}
                    title={currentVideo.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-slate-100">
                  <div className="text-center">
                    <ApperIcon name="Play" size={48} className="text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">강의를 선택해주세요</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="premium-card rounded-xl p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {currentVideo?.title || course.title}
              </h2>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Curriculum Sidebar */}
          <div className="lg:w-80 mt-8 lg:mt-0">
            <div className="premium-card rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <ApperIcon name="List" size={20} className="mr-2" />
                커리큘럼
              </h3>
              
              {course.videos && course.videos.length > 0 ? (
                <div className="space-y-2">
                  {course.videos.map((video, index) => (
                    <div
                      key={index}
                      className={`curriculum-item p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentVideoIndex
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 border-l-4 border-blue-500"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => handleVideoSelect(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          index === currentVideoIndex
                            ? "bg-blue-500 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            index === currentVideoIndex ? "text-blue-700" : "text-slate-800"
                          }`}>
                            {video.title}
                          </p>
                        </div>
                        
                        {index === currentVideoIndex && (
                          <ApperIcon name="Play" size={16} className="text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">
                  등록된 강의가 없습니다
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <VideoUploadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditCourse}
        editingVideo={course}
      />
    </div>
  );
};

export default VideoPlayerPage;