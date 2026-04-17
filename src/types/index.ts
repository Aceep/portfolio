export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  label: string;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  category?: 'personal' | 'school' | 'professional';
  preview?: string;
  modal?: boolean;
}

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  external?: boolean;
}

export interface Video {
  id: string;
  title: string;
  filename: string;
  description?: string;
}

export interface PortfolioContent {
  name: string;
  tagline: string;
  description: string;
  yearsExp: string;
  aboutTitle: string;
  aboutDescription: string;
  contactEmail: string;
  contactLocation: string;
  contactAvailability: string;
}
