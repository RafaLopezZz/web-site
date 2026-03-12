export interface TimelineItemExperience {
  role: string;
  company: string;
  period: string;
  description: string;
  p?: string;
  webs?: string[];
}

export interface TimelineItemEducation {
  degree: string;
  institution: string;
  marks?: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
}
