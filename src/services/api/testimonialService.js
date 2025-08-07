import testimonialsData from "@/services/mockData/testimonials.json";

class TestimonialService {
  constructor() {
    this.testimonials = [...testimonialsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.testimonials];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const testimonial = this.testimonials.find(t => t.Id === id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    return { ...testimonial };
  }

  async create(testimonialData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newTestimonial = {
      ...testimonialData,
      Id: Math.max(...this.testimonials.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      isPinned: false,
      isHidden: false
    };
    
    this.testimonials.push(newTestimonial);
    return { ...newTestimonial };
  }

  async update(id, testimonialData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.testimonials.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    
    this.testimonials[index] = {
      ...this.testimonials[index],
      ...testimonialData
    };
    
    return { ...this.testimonials[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.testimonials.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    
    this.testimonials.splice(index, 1);
    return true;
  }
}

export default new TestimonialService();