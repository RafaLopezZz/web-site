import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    description: "Java, Spring Boot, APIs REST y bases de datos relacionales.",
    skills: [
      { name: "Java", icon: "openjdk" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "APIs REST" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "Bash / Shell", icon: "gnubash" },
    ],
  },
  {
    title: "Frontend",
    description:
      "Interfaces claras con Angular, TypeScript y base sólida en HTML y CSS.",
    skills: [
      { name: "Angular", icon: "angular" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "Thymeleaf", icon: "thymeleaf" },
    ],
  },
  {
    title: "Herramientas",
    description:
      "Trabajo habitual con control de versiones, documentación y despliegues sencillos.",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker básico", icon: "docker" },
      { name: "Swagger", icon: "swagger" },
      { name: "Postman", icon: "postman" },
      { name: "Railway", icon: "railway" },
    ],
  },
  {
    title: "Aprendiendo y practicando",
    description:
      "Tecnologías y áreas que estoy trabajando en la especialización de IA y Big Data para ampliar base técnica.",
    skills: [
      { name: "Python", icon: "python" },
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Visualización de datos" },
      { name: "Business Intelligence" },
      { name: "Testing" },
      { name: "CI / CD" },
      { name: "AWS" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Astro", icon: "astro" },
    ],
  },
];
