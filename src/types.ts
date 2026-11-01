export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  scopeOfWork: string[];
  technicalCapabilities: string[];
  applicableStandards: string[];
  industriesServed: string[];
  image: string;
  featured: boolean;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  challenges: string;
  complianceReqs: string;
  engineeringReqs: string;
  solutions: string[];
  relevantServices: string[];
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  client: string;
  year: string;
  description: string;
  scopeOfWork: string[];
  outcomes: string;
  image: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  certifications: string;
  bio: string;
  image: string;
  category: 'management' | 'technical';
}

export interface Testimonial {
  id: string;
  clientName: string;
  organization: string;
  role: string;
  rating: number;
  content: string;
  approved: boolean;
  date: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  summary: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
}

export interface Enquiry {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  serviceRequired: string;
  projectLocation: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface QuoteRequest {
  id: string;
  referenceNo: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceRequested: string;
  projectLocation: string;
  subject?: string;
  projectScope: string;
  estimatedTimeline: string;
  budgetRange: string;
  attachmentsNote?: string;
  createdAt: string;
  status: 'pending' | 'assessing' | 'quoted' | 'closed';
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  officeAddress: string;
  postalAddress: string;
  workingHoursWeekday: string;
  workingHoursSaturday: string;
  statProjectsCompleted: string;
  statYearsExperience: string;
  statSatisfiedClients: string;
  statIsoAlignment: string;
}
