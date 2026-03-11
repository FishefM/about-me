import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TechIcon from '../components/TechIcon';

const Layout: React.FC = () => (
  <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col w-full overflow-x-hidden">
    <Navbar />
    <main className="flex-grow w-full px-4 md:px-0">
      <Outlet />
    </main>
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center text-sm text-zinc-500 w-full mt-auto">
      <div className="flex flex-col items-center gap-2">
        <p>© {new Date().getFullYear()} - Diseñado con</p>
        <div className="flex items-center gap-4 justify-center">
          <div className="flex items-center gap-1.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <TechIcon name="React" className="text-lg text-[#61DAFB]" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">React</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">+</span>
          <div className="flex items-center gap-1.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <TechIcon name="Tailwind" className="text-lg text-[#38B2AC]" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout;
