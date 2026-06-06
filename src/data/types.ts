export interface TimelineItemExperience {
  role: string;
  company: string;
  period: string;
  summary?: string;
  highlights: string[];
  webs?: string[];
}

export interface TimelineItemEducation {
  degree: string;
  institution: string;
  marks?: string;
  period: string;
  summary?: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: Skill[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
}
