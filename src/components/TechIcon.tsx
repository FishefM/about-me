import React from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPostgresql, 
  SiDocker, 
  SiSupabase, 
  SiStripe, 
  SiThreedotjs, 
  SiOpenai, 
  SiTailwindcss, 
  SiJavascript,
  SiD3,
  SiVite,
  SiFirebase,
  SiExpo,
  SiKotlin,
  SiAndroidstudio,
  SiEspressif
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { TbBrandReactNative } from 'react-icons/tb';

interface TechIconProps {
  name: string;
  className?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'AWS': FaAws,
  'D3.js': SiD3,
  'Supabase': SiSupabase,
  'Stripe': SiStripe,
  'Three.js': SiThreedotjs,
  'OpenAI': SiOpenai,
  'Tailwind': SiTailwindcss,
  'JavaScript': SiJavascript,
  'Vite': SiVite,
  'Firebase': SiFirebase,
  'Expo': SiExpo,
  'Kotlin': SiKotlin,
  'Android Studio': SiAndroidstudio,
  'ESP32': SiEspressif,
  'React Native': TbBrandReactNative,
  'React / Next.js': SiReact, // Special case for About.tsx
};

const TechIcon: React.FC<TechIconProps> = ({ name, className }) => {
  const Icon = iconMap[name];
  
  if (!Icon && name === 'React / Next.js') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <SiReact />
        <span className="text-zinc-400">/</span>
        <SiNextdotjs />
      </div>
    );
  }

  if (!Icon) return null;

  return <Icon className={className} />;
};

export default TechIcon;
