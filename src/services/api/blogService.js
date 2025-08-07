import blogData from "@/services/mockData/blog.json";

class BlogService {
  constructor() {
    this.posts = [...blogData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.posts];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = this.posts.find(post => post.Id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return { ...post };
  }

  async create(postData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newPost = {
      ...postData,
      Id: Math.max(...this.posts.map(p => p.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      thumbnailUrl: postData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    
    this.posts.push(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.posts.findIndex(post => post.Id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    
    this.posts[index] = {
      ...this.posts[index],
      ...postData,
      thumbnailUrl: postData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    
    return { ...this.posts[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.posts.findIndex(post => post.Id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    
    this.posts.splice(index, 1);
    return true;
  }
}

export default new BlogService();