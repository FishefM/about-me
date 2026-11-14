import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiLock, FiTrash2, FiMail } from 'react-icons/fi';
import kallyfitLetras from '../assets/kallyfit-letras.png';

const KallyfitPrivacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans pb-16 selection:bg-[#58a6ff]/30 selection:text-white">
      {/* Top Header */}
      <div className="border-b border-[#30363d] bg-[#161b22]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/dev/kallyfit"
            className="inline-flex items-center gap-2 text-sm text-[#58a6ff] hover:text-[#79c0ff] font-bold transition-colors"
          >
            <FiArrowLeft className="text-base" />
            <span>Volver a KallyFit</span>
          </Link>
          <img src={kallyfitLetras} alt="KallyFit" className="h-6 object-contain" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#58a6ff]/10 text-[#58a6ff] text-xs font-mono font-bold tracking-wider uppercase mb-4 border border-[#58a6ff]/20">
          <FiShield className="text-xs" />
          <span>Privacidad & Protección de Datos</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#8b949e] font-mono mb-8">
          Última actualización: 13 de noviembre de 2026 • Versión 1.0.9
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-[#c9d1d9]">
          {/* Card Resumen */}
          <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FiLock className="text-[#58a6ff]" />
              <span>Compromiso con tu Privacidad</span>
            </h2>
            <p>
              En <strong>KallyFit</strong> (creada y mantenida por Yucef Hernández), priorizamos tu privacidad y rendimiento atlético. 
              <strong> NO vendemos, NO alquilamos y NO compartimos</strong> tus datos personales con terceros para fines publicitarios.
              La app no contiene anuncios ni rastreadores de marketing.
            </p>
          </div>

          {/* 1. Datos recopilados */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2">
              1. Información que Recopilamos
            </h2>
            <p>
              Recopilamos únicamente los datos necesarios para registrar tu progreso en calistenia y permitir la sincronización en la nube:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#8b949e]">
              <li>
                <strong className="text-white">Identidad y Cuenta:</strong> Dirección de correo electrónico y nombre de atleta (al iniciar sesión mediante Google Sign-In o registro de correo electrónico). En Modo Invitado no se recopila información personal identificable.
              </li>
              <li>
                <strong className="text-white">Datos Deportivos:</strong> Selección de categoría deportiva / sexo (para asignación justa en clasificaciones) y capacidad biomecánica del atleta.
              </li>
              <li>
                <strong className="text-white">Historial de Entrenamiento y Rutinas:</strong> Series, repeticiones, peso añadido, tiempos y rutinas personalizadas creadas en tu archivo personal.
              </li>
            </ul>
          </section>

          {/* 2. Finalidad del tratamiento */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2">
              2. Finalidad del Uso de Datos
            </h2>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#8b949e]">
              <li>Calcular la sobrecarga progresiva real, volumen semanal y recomendaciones deportivas.</li>
              <li>Permitir el respaldo y sincronización segura en la nube (Cloudflare Workers y Cloudflare D1).</li>
              <li>Mostrar tu puntuación y avatar en la tabla de clasificación comunitaria si decides competir.</li>
            </ul>
          </section>

          {/* 3. Permisos especiales */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2">
              3. Permisos Especiales del Dispositivo
            </h2>
            <p>
              Para una experiencia óptima durante el entrenamiento, KallyFit hace uso de:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#8b949e]">
              <li>
                <strong className="text-white">Servicios de Audio en Primer Plano (FOREGROUND_SERVICE_MEDIA_PLAYBACK):</strong> Permite que el reproductor de entrenamiento emita instrucciones por voz, señales sonoras y cronometrado de descansos de forma ininterrumpida mientras la pantalla del teléfono está bloqueada o apagada.
              </li>
              <li>
                <strong className="text-white">Acceso a Internet:</strong> Utilizado para sincronizar rutinas y consultar clasificaciones.
              </li>
            </ul>
          </section>

          {/* 4. Eliminación de datos y cuenta */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2 flex items-center gap-2">
              <FiTrash2 className="text-[#f85149]" />
              <span>4. Eliminación de Cuenta y Datos Personales</span>
            </h2>
            <p>
              Cumpliendo con las directrices de Google Play y normativas internacionales de protección de datos (GDPR / LFPDPPP), tienes derecho en todo momento a eliminar tu cuenta y todos los datos asociados:
            </p>
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-800/40 space-y-3">
              <p className="font-semibold text-white">¿Cómo solicitar la eliminación?</p>
              <ol className="list-decimal pl-5 space-y-2 text-[#8b949e]">
                <li>
                  <strong className="text-white">Desde la aplicación móvil:</strong> Abre KallyFit &rarr; Ve a <em>Configuración</em> (icono de engranaje) &rarr; desplázate hasta el final &rarr; pulsa <em>"Eliminar Cuenta y Datos"</em> y confirma. La app borrará inmediatamente tus datos locales y credenciales.
                </li>
                <li>
                  <strong className="text-white">Vía solicitud web / correo:</strong> Envía un correo electrónico a <a href="mailto:contacto@yucefhernandez.com" className="text-[#58a6ff] hover:underline font-mono">contacto@yucefhernandez.com</a> con el asunto <code>"Eliminación de Cuenta KallyFit"</code>, indicando el correo o nombre de usuario registrado. Procederemos a borrar permanentemente tu cuenta y registros de nuestra base de datos Cloudflare D1 en un plazo máximo de 48 horas.
                </li>
              </ol>
            </div>
          </section>

          {/* 5. Contacto */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2 flex items-center gap-2">
              <FiMail className="text-[#58a6ff]" />
              <span>5. Contacto y Soporte</span>
            </h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad o sobre tus datos en KallyFit, puedes comunicarte directamente con el desarrollador:
            </p>
            <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1 text-[#8b949e]">
              <p><strong className="text-white">Desarrollador:</strong> Yucef Hernández</p>
              <p><strong className="text-white">Sitio Web:</strong> <a href="https://yucefhernandez.com" className="text-[#58a6ff] hover:underline">yucefhernandez.com</a></p>
              <p><strong className="text-white">Correo de Contacto:</strong> <a href="mailto:contacto@yucefhernandez.com" className="text-[#58a6ff] hover:underline font-mono">contacto@yucefhernandez.com</a></p>
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-[#30363d] text-center text-xs text-[#8b949e] space-y-2">
          <p>© {new Date().getFullYear()} KallyFit • Todos los derechos reservados</p>
          <p className="text-[11px] text-[#6e7681]">
            Desarrollado por <Link to="/" className="text-[#58a6ff] hover:underline">Yucef Hernández</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default KallyfitPrivacy;
