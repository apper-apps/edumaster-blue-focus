import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import VideoCard from "@/components/molecules/VideoCard";
import VideoUploadModal from "@/components/organisms/VideoUploadModal";
import courseService from "@/services/api/courseService";

const MasterPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [currentUser] = useState({ role: "admin" }); // Mock user

  const loadCourses = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await courseService.getAll();
      const masterCourses = data.filter(course => course.type === "master");
      
      // Sort by pinned first, then by creation date
      masterCourses.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setCourses(masterCourses);
    } catch (err) {
      setError("강의 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSaveCourse = async (courseData) => {
    try {
      const courseWithType = {
        ...courseData,
        type: "master"
      };
      
      if (editingCourse) {
        await courseService.update(editingCourse.Id, courseWithType);
        toast.success("강의가 수정되었습니다.");
      } else {
        await courseService.create(courseWithType);
        toast.success("새 강의가 업로드되었습니다.");
      }
      
      setEditingCourse(null);
      loadCourses();
    } catch (err) {
      toast.error("강의 저장에 실패했습니다.");
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsUploadModalOpen(true);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm("정말 이 강의를 삭제하시겠습니까?")) return;
    
    try {
      await courseService.delete(courseId);
      toast.success("강의가 삭제되었습니다.");
      loadCourses();
    } catch (err) {
      toast.error("강의 삭제에 실패했습니다.");
    }
  };

  const closeModal = () => {
    setIsUploadModalOpen(false);
    setEditingCourse(null);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCourses} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            마스터 강의
          </h1>
          <p className="text-slate-600">
            고급 전문가를 위한 마스터 레벨 강의 콘텐츠입니다
          </p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          새 강의 업로드
        </Button>
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <Empty
          title="마스터 강의가 없습니다"
          description="아직 등록된 마스터 강의가 없어요. 새로운 고급 강의를 업로드해보세요."
          actionText="강의 업로드하기"
          onAction={() => setIsUploadModalOpen(true)}
          icon="Award"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <VideoCard
              key={course.Id}
              video={course}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              showActions={true}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <VideoUploadModal
        isOpen={isUploadModalOpen}
        onClose={closeModal}
        onSave={handleSaveCourse}
        editingVideo={editingCourse}
      />
    </div>
  );
};

export default MasterPage;