export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  client: string;
  link?: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  image: string;
  rating: number;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  postedDate: string;
  deadline?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface JobApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
  coverLetter: string;
  experience: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  social: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}
