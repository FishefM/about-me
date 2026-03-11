import plantitas from '../assets/icono.jpg';

export interface ProjectItem {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string | { plantitas: string };
}

export const projects: ProjectItem[] = [
  {
    title: 'Landing Page para Startup',
    category: 'Frontend',
    desc: 'Plataforma de visualización de productos comerciales con animaciones interactivas y diseño responsivo.',
    tags: ['React', 'Vite', 'Tailwind'],
    image: '🛍️'
  },
  {
    title: 'Dashboard de visualización de camaras de seguridad',
    category: 'Multimedia',
    desc: 'Interfaz de usuario para visualización de múltiples cámaras de seguridad con integración en dispositivos móviles.',
    tags: ['Expo', 'Supabase', 'React Native', 'Node.js'],
    image: '🎥'
  },
  {
    title: 'Plantitas - ESP32',
    category: 'IoT',
    desc: 'Sistema de monitoreo de plantas con sensores de humedad, temperatura y luminosidad; con alertas en tiempo real a través de una aplicación móvil mediante un módulo ESP32.',
    tags: ['Kotlin', 'ESP32', 'Firebase', 'Android Studio'],
    image: { plantitas }
  },
];
