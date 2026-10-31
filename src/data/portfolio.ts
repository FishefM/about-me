import plantitas from '../assets/icono.jpg';
import kallyfitIcon from '../assets/kallyfit-icon.png';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  longDesc?: string;
  tags: string[];
  image: string | { [key: string]: string };
  year: string;
  status: 'Producción' | 'Completado' | 'En desarrollo' | 'Open Source' | 'Activo';
  role?: string;
  highlights?: string[];
  features?: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export const projects: ProjectItem[] = [
  {
    id: 'kallyfit',
    title: 'Kallyfit - Workout & Routine Tracker',
    category: 'Móvil',
    desc: 'Aplicación móvil de calistenia y entrenamiento físico con seguimiento de rutinas en tiempo real, bloques AMRAP y arquitectura local-first.',
    longDesc: 'Desarrollo integral de una aplicación móvil para entrenamientos de calistenia y acondicionamiento físico. Integra un motor de efectos sonoros y hápticos para intervalos, sistema de sincronización local-first, constructor interactivo de rutinas y animaciones biomecánicas de ejercicios.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Node.js'],
    image: { kallyfit: kallyfitIcon },
    year: '2026',
    status: 'Producción',
    role: 'Mobile Developer & Architect',
    highlights: [
      'Arquitectura Local-First con persistencia local y sincronización progresiva en la nube.',
      'Motor de audio dinámico y retroalimentación háptica adaptativa para entrenamientos guiados.',
      'Temporizadores configurables para modos intensivos (AMRAP, HIIT, circuitos por series).',
      'Animaciones SVG fluidas con calibración anatómica y biomecánica por ejercicio.'
    ],
    features: [
      'Constructor interactivo de rutinas y bloques de series por repetición/tiempo',
      'Reproductor interactivo con controles debounce, bloqueo de pantalla y alertas de descanso',
      'Historial de entrenamientos completados con estadísticas de consistencia',
      'Compilación nativa automatizada para Android con APK de distribución optimizado'
    ],
    links: {
      demo: '/dev/kallyfit'
    }
  },
  {
    id: 'landing-startup',
    title: 'Landing Page para Startup',
    category: 'Frontend',
    desc: 'Plataforma de visualización de productos comerciales con animaciones interactivas y diseño responsivo.',
    longDesc: 'Diseño e implementación de una landing page comercial con enfoque en alta conversión y experiencia de usuario fluida. Incluye animaciones reactivas, sistema de temas oscuro/claro y optimización de velocidad de carga.',
    tags: ['React', 'Vite', 'Tailwind', 'TypeScript'],
    image: 'shopping',
    year: '2026',
    status: 'Producción',
    role: 'Frontend Lead',
    highlights: [
      'Renderizado ultrarrápido con Vite y bundle minificado.',
      'Animaciones de scroll fluidas a 60fps con Framer Motion.',
      'Diseño Mobile-First 100% responsivo y testeado en múltiples dispositivos.'
    ],
    features: [
      'Catálogo interactivo con filtrado dinámico',
      'Integración con componentes UI accesibles',
      'Optimización de imágenes y lazy loading'
    ],
    links: {
      github: 'https://github.com/yucefh',
      demo: 'https://yucef.dev'
    }
  },
  {
    id: 'cctv-dashboard',
    title: 'Dashboard de visualización de cámaras de seguridad',
    category: 'Multimedia',
    desc: 'Interfaz de usuario para visualización de múltiples cámaras de seguridad con integración en dispositivos móviles.',
    longDesc: 'Sistema distribuido para monitorización de señales de video en tiempo real. Diseñado para ofrecer baja latencia y panel de control centralizado para supervisores de seguridad.',
    tags: ['Expo', 'Supabase', 'React Native', 'Node.js', 'TypeScript'],
    image: 'video',
    year: '2025 - 2026',
    status: 'Activo',
    role: 'Full Stack & Mobile Developer',
    highlights: [
      'Integración de streaming de video con latencia optimizada.',
      'Autenticación robusta y control de acceso por roles con Supabase.',
      'Compatibilidad multiplataforma en iOS, Android y Web vía Expo.'
    ],
    features: [
      'Visualización simultánea multi-cámara en cuadrícula adaptable',
      'Alertas de eventos y detección de movimiento en tiempo real',
      'Historial de grabaciones con búsqueda por marca de tiempo'
    ],
    links: {
      github: 'https://github.com/yucefh'
    }
  },
  {
    id: 'plantitas-esp32',
    title: 'Plantitas - ESP32 IoT',
    category: 'IoT',
    desc: 'Sistema de monitoreo de plantas con sensores de humedad, temperatura y luminosidad; con alertas en tiempo real a través de una aplicación móvil mediante un módulo ESP32.',
    longDesc: 'Solución integral de Internet de las Cosas (IoT) combinando hardware embebido y software móvil. Monitorea variables agrícolas críticas y notifica anomalías automáticamente al usuario.',
    tags: ['Kotlin', 'ESP32', 'Firebase', 'Android Studio'],
    image: { plantitas },
    year: '2025',
    status: 'Completado',
    role: 'Hardware & Mobile Developer',
    highlights: [
      'Lectura continua de sensores DHT11 y de humedad de suelo con ESP32.',
      'Sincronización en tiempo real con Firebase Realtime Database.',
      'Aplicación nativa en Kotlin con arquitectura MVVM y bajo consumo de batería.'
    ],
    features: [
      'Telemetría en tiempo real de humedad, temperatura y luz',
      'Notificaciones push automáticas cuando la planta requiere riego',
      'Gráficas históricas de evolución ambiental por planta'
    ],
    links: {
      github: 'https://github.com/yucefh'
    }
  },
  {
    id: 'dev-notes-vault',
    title: 'Sistema de Gestión de Notas Técnicas',
    category: 'Frontend',
    desc: 'Bóveda de conocimiento personal con renderizado de Markdown, diagramas Mermaid interactivos y soporte de búsqueda difusa.',
    longDesc: 'Módulo de documentación técnica desarrollado como extensión del portafolio. Permite explorar notas de arquitectura, comandos y guías con renderizado avanzado de código y gráficos vectoriales.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    image: 'notes',
    year: '2026',
    status: 'Producción',
    role: 'Frontend Developer',
    highlights: [
      'Búsqueda difusa instantánea impulsada por Fuse.js.',
      'Renderizado dinámico de diagramas interactivos con Mermaid.',
      'Navegación por árbol de carpetas con estado persistente.'
    ],
    features: [
      'Soporte completo de GitHub Flavored Markdown (GFM)',
      'Highlighting de sintaxis de código para múltiples lenguajes',
      'Modo lectura optimizado para dispositivos móviles'
    ],
    links: {
      github: 'https://github.com/yucefh',
      demo: '/notes'
    }
  }
];
