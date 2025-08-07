import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalPosts: 0,
    totalTestimonials: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState("");

  // Mock data and functions - replace with real service calls
  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      
      // Mock users data
      const mockUsers = [
        { Id: 1, email: "user1@example.com", role: "free", createdAt: new Date() },
        { Id: 2, email: "member@example.com", role: "member", createdAt: new Date() },
        { Id: 3, email: "master@example.com", role: "master", createdAt: new Date() },
        { Id: 4, email: "both@example.com", role: "both", createdAt: new Date() },
        { Id: 5, email: "admin@example.com", role: "admin", createdAt: new Date() }
      ];
      
      setUsers(mockUsers);
      setStats({
        totalUsers: mockUsers.length,
        totalCourses: 12,
        totalPosts: 8,
        totalTestimonials: 25
      });
    } catch (err) {
      setError("관리자 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditRole = (user) => {
    setEditingUser(user);
    setEditRole(user.role);
  };

  const handleSaveRole = async () => {
    try {
      // Mock API call - replace with real service
      const updatedUsers = users.map(user => 
        user.Id === editingUser.Id 
          ? { ...user, role: editRole }
          : user
      );
      
      setUsers(updatedUsers);
      toast.success("사용자 등급이 변경되었습니다.");
      setEditingUser(null);
      setEditRole("");
    } catch (err) {
      toast.error("등급 변경에 실패했습니다.");
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

  const getRoleLabel = (role) => {
    const labels = {
      free: "무료",
      member: "멤버",
      master: "마스터", 
      both: "멤버+마스터",
      admin: "관리자"
    };
    return labels[role] || role;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          관리자 대시보드
        </h1>
        <p className="text-slate-600">
          사이트 통계와 사용자 관리를 할 수 있습니다
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="premium-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">총 사용자</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="premium-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">총 강의</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Video" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="premium-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">총 인사이트</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalPosts}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="premium-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">총 후기</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalTestimonials}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="MessageSquare" size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="premium-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">사용자 관리</h2>
        
        {users.length === 0 ? (
          <Empty
            title="사용자가 없습니다"
            description="아직 등록된 사용자가 없어요."
            icon="Users"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">이메일</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">등급</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">가입일</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.Id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-slate-800">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {user.createdAt.toLocaleDateString("ko-KR")}
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRole(user)}
                      >
                        <ApperIcon name="Edit" size={16} className="mr-1" />
                        등급 변경
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">등급 변경</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditingUser(null)}
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">사용자</p>
                <p className="font-medium text-slate-800">{editingUser.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  새 등급
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="free">무료</option>
                  <option value="member">멤버</option>
                  <option value="master">마스터</option>
                  <option value="both">멤버+마스터</option>
                  <option value="admin">관리자</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                variant="secondary" 
                onClick={() => setEditingUser(null)}
                className="flex-1"
              >
                취소
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSaveRole}
                className="flex-1"
              >
                변경하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;