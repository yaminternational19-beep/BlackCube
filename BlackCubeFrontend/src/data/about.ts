export interface AboutPageData {
  heroContent: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  companyStats: Array<{
    number: string;
    label: string;
  }>;
  values: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
  }>;
  milestones: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  teamMembers: Array<{
    id: number;
    name: string;
    position: string;
    bio: string;
    social: {
      linkedin: string;
      twitter: string;
      github: string;
    };
  }>;
  whyChooseUs: string[];
  journeySection: {
    title: string;
    subtitle: string;
  };
  clientsSection: {
    title: string;
    subtitle: string;
  };
  teamSection: {
    title: string;
    subtitle: string;
  };
  whyChooseUsSection: {
    title: string;
    subtitle: string;
    stats: {
      satisfactionRate: string;
      satisfactionLabel: string;
      satisfactionSubtext: string;
      metrics: Array<{
        label: string;
        percentage: number;
      }>;
    };
  };
  ctaSection: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  clientLogos: string[];
}

export const defaultAboutPageData: AboutPageData = {
  heroContent: {
    title: 'About Black Cube Solutions',
    subtitle: 'We are a leading IT solutions provider in Dubai, empowering businesses through innovative technology and digital transformation.',
    primaryCta: "Let's Talk",
    secondaryCta: 'View Services'
  },
  companyStats: [
    { number: '100+', label: 'Projects Delivered' },
    { number: '30+', label: 'Active Clients' },
    { number: '10+', label: 'Industries Served' },
    { number: '24/7', label: 'Support' }
  ],
  values: [
    {
      id: 1,
      icon: 'Target',
      title: 'Mission',
      description: 'To empower businesses through innovative technology solutions that drive growth and success in the digital age.'
    },
    {
      id: 2,
      icon: 'Eye',
      title: 'Vision',
      description: 'To be the leading digital transformation partner for businesses worldwide, recognized for excellence and innovation.'
    },
    {
      id: 3,
      icon: 'Heart',
      title: 'Values',
      description: 'We believe in integrity, innovation, collaboration, and delivering exceptional value to our clients.'
    }
  ],
  milestones: [
    { year: '2019', title: 'Company Founded', description: 'Started with a vision to transform businesses digitally' },
    { year: '2020', title: 'First Major Project', description: 'Delivered our first enterprise-level web application' },
    { year: '2021', title: 'Team Expansion', description: 'Grew our team to 15+ skilled professionals' },
    { year: '2022', title: 'Award Recognition', description: 'Received Best IT Solutions Provider award' },
    { year: '2023', title: 'Global Reach', description: 'Expanded services to international markets' },
    { year: '2024', title: 'AI Integration', description: 'Launched AI-powered solutions for clients' }
  ],
  teamMembers: [
    {
      id: 1,
      name: 'John Smith',
      position: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in tech',
      social: { linkedin: '#', twitter: '#', github: '#' }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'CTO',
      bio: 'Technical expert specializing in cloud solutions',
      social: { linkedin: '#', twitter: '#', github: '#' }
    }
  ],
  whyChooseUs: [
    '15+ Years of Combined Experience',
    '50+ Successful Projects Delivered',
    '24/7 Customer Support',
    'Cutting-edge Technology Stack',
    'Agile Development Methodology',
    'Competitive Pricing'
  ],
  journeySection: {
    title: 'Our Journey',
    subtitle: 'From humble beginnings to becoming a trusted partner for businesses worldwide.'
  },
  clientsSection: {
    title: 'Trusted by Leading Brands',
    subtitle: 'OUR CLIENTS'
  },
  teamSection: {
    title: 'Meet Our Team',
    subtitle: 'Our talented team of professionals is dedicated to delivering exceptional results for our clients.'
  },
  whyChooseUsSection: {
    title: 'Why Choose Black Cube Solutions?',
    subtitle: 'We combine technical expertise with business acumen to deliver solutions that drive real results.',
    stats: {
      satisfactionRate: '98%',
      satisfactionLabel: 'Client Satisfaction Rate',
      satisfactionSubtext: 'Based on 50+ completed projects',
      metrics: [
        { label: 'Project Delivery', percentage: 100 },
        { label: 'Code Quality', percentage: 98 },
        { label: 'Client Communication', percentage: 95 },
        { label: 'Support Response', percentage: 100 }
      ]
    }
  },
  ctaSection: {
    title: 'Ready to Work With Us?',
    subtitle: "Let's discuss your project and see how we can help you achieve your digital transformation goals.",
    primaryCta: 'Start Your Project',
    secondaryCta: 'View Our Services'
  },
  clientLogos: [
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+1',
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+2',
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+3',
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+4',
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+5',
    'https://dummyimage.com/160x60/0b1220/ffffff&text=Brand+6'
  ]
};
