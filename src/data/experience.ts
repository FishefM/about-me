export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  desc: string;
  current: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    company: 'ContBIT',
    role: 'Full Stack Developer',
    period: '2026 — Act.',
    desc: 'Responsable del desarrollo y mantenimiento de aplicaciones orientadas a una plataforma de e-commerce.',
    current: true
  },
  {
    company: 'Emtix',
    role: 'Software Engineer',
    period: '2025 — 2026',
    desc: 'Desarrollo de aplicaciones web y móviles.',
    current: false
  },
  {
    company: 'Freelancer',
    role: 'Freelance Mobile Developer',
    period: '2023 — 2025',
    desc: 'Desarrollo de aplicaciones móviles para clientes diversos.',
    current: false
  }
];
