import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 3, icon: "openjdk" },
      { name: "PHP", level: 3, icon: "php" },
      { name: "Spring Boot", level: 2, icon: "springboot" },
      { name: "Laravel", level: 2, icon: "laravel" },
      { name: "Bash/Shell", level: 4, icon: "gnubash" }
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Angular", level: 2, icon: "angular" },
      { name: "TypeScript", level: 2, icon: "typescript" },
      { name: "Astro", level: 1, icon: "astro" },
      { name: "HTML5", level: 3, icon: "html5" },
      { name: "CSS3", level: 3, icon: "css" },
      { name: "Thymeleaf", level: 3, icon: "thymeleaf" },
    ],
  },
  {
    title: "Infra/Cloud",
    skills: [
      { name: "Docker", level: 2, icon: "docker" },
      { name: "GitHub", level: 3, icon: "github" },
      { name: "Railway", level: 2, icon: "railway" },
      { name: "AWS", level: 1, icon: "aws" },
    ],
  },
  {
    title: "Bases de Datos",
    skills: [
      { name: "PostgreSQL", level: 3, icon: "postgresql" },
      { name: "MySQL", level: 3, icon: "mysql" },
      { name: "MongoDB", level: 1, icon: "mongodb" },
    ],
  },
  {
    title: "Herramientas",
    skills: [
      { name: "Git", level: 3, icon: "git" },
      { name: "Postman", level: 4, icon: "postman" },
      { name: "Swagger", level: 4, icon: "swagger" },
    ],
  },
];
