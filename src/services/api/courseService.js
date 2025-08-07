import coursesData from "@/services/mockData/courses.json";

class CourseService {
  constructor() {
    this.courses = [...coursesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.courses];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const course = this.courses.find(course => course.Id === id);
    if (!course) {
      throw new Error("Course not found");
    }
    return { ...course };
  }

  async create(courseData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newCourse = {
      ...courseData,
      Id: Math.max(...this.courses.map(c => c.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      thumbnailUrl: courseData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    
    this.courses.push(newCourse);
    return { ...newCourse };
  }

  async update(id, courseData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.courses.findIndex(course => course.Id === id);
    if (index === -1) {
      throw new Error("Course not found");
    }
    
    this.courses[index] = {
      ...this.courses[index],
      ...courseData,
      thumbnailUrl: courseData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    
    return { ...this.courses[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.courses.findIndex(course => course.Id === id);
    if (index === -1) {
      throw new Error("Course not found");
    }
    
    this.courses.splice(index, 1);
    return true;
  }
}

export default new CourseService();