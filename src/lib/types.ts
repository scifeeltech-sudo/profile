export type Lang = "en" | "ko";

export interface Social {
  github: string;
  linkedin: string;
  email: string;
  twitter: string;
  website: string;
}

export interface Profile {
  name: string;
  tagline: string;
  subtitles: string[];
  currentRole: string;
  company: string;
  photo: string;
  social: Social;
}

export interface QnA {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  timeline?: TimelineItem[];
  skills?: SkillCategory[];
}

export interface TimelineItem {
  period: string;
  role: string;
  company: string;
  tags?: string[];
  highlight: string;
  highlightEn: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface InterviewSectionData {
  section: string;
  sectionEn: string;
  qna: QnA[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
}

export interface DomainExpertise {
  domain: string;
  description: string;
  descriptionEn: string;
  relevance: string;
  relevanceEn: string;
}

export interface InterviewData {
  profile: Profile;
  interviews: InterviewSectionData[];
  education: Education[];
  domainExpertise: DomainExpertise[];
}
