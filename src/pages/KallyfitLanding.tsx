import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiDownload, 
  FiVolume2, 
  FiWifiOff, 
  FiClock, 
  FiActivity, 
  FiShield, 
  FiSmartphone, 
  FiPlay, 
  FiPause, 
  FiRotateCcw,
  FiChevronDown,
  FiAward,
  FiTrendingUp,
  FiX,
  FiRefreshCw,
  FiExternalLink
} from 'react-icons/fi';
import kallyfitIcon from '../assets/kallyfit-icon.png';
import BiomechanicFigure from '../components/BiomechanicFigure';

const WORKER_API = import.meta.env.VITE_KALLYFIT_API_URL || 'https://kallyfit.yucefhernandez.com';

const KallyfitLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'push' | 'pull' | 'skills' | 'legs'>('push');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Estados para el Modal de Leaderboard en Vivo
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [modalRankingType, setModalRankingType] = useState<'monthly' | 'total'>('monthly');
  const [liveAthletes, setLiveAthletes] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const downloadUrl = 'https://tokiserver.com/drive/kallyfit/kallyfit-v1.0.7.apk';

  // Función para consultar el Worker en tiempo real
  const fetchWorkerLeaderboard = async (type: 'monthly' | 'total') => {
    setIsLoadingLeaderboard(true);
    setLeaderboardError(null);
    try {
      const res = await fetch(`${WORKER_API}/api/leaderboard?type=${type}&limit=50`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.athletes)) {
        setLiveAthletes(data.athletes);
        setLastUpdated(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        throw new Error('Estructura de datos inválida del servidor');
      }
    } catch (err: any) {
      setLeaderboardError('No se pudo conectar con el Worker en tiempo real: ' + err.message);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const handleOpenModal = (type: 'monthly' | 'total' = 'monthly') => {
    setModalRankingType(type);
    setIsLeaderboardModalOpen(true);
    fetchWorkerLeaderboard(type);
  };

  const handleTabChange = (type: 'monthly' | 'total') => {
    setModalRankingType(type);
    fetchWorkerLeaderboard(type);
  };

  const routinesData = {
    push: {
      title: 'Fuerza de Empuje (Push Day)',
      level: 'Intermedio',
      duration: '40 min',
      exercises: [
        { name: 'Fondos en paralelas estrictos', sets: '4 series', reps: '10 - 12 reps' },
        { name: 'Flexiones declinadas con pausa', sets: '3 series', reps: '12 reps' },
        { name: 'Pike push-ups para hombros', sets: '3 series', reps: '8 reps' },
        { name: 'Fondos en banco (Tríceps finisher)', sets: '2 series', reps: 'Al fallo (AMRAP)' }
      ]
    },
    pull: {
      title: 'Jalón y Espalda de Acero (Pull Day)',
      level: 'Avanzado',
      duration: '45 min',
      exercises: [
        { name: 'Dominadas con agarre prono', sets: '4 series', reps: '8 - 10 reps' },
        { name: 'Dominadas neutras explosivas', sets: '3 series', reps: '6 - 8 reps' },
        { name: 'Remos invertidos en barra baja', sets: '3 series', reps: '12 reps' },
        { name: 'Aguante estático en barra (Hanging)', sets: '3 series', reps: '45 segs' }
      ]
    },
    skills: {
      title: 'Habilidades y Control Estático',
      level: 'Élite',
      duration: '35 min',
      exercises: [
        { name: 'Progresión Tuck Front Lever', sets: '4 series', reps: '15 segs' },
        { name: 'Planche leans en suelo', sets: '3 series', reps: '20 segs' },
        { name: 'L-Sit en paralelas', sets: '4 series', reps: '15 - 20 segs' },
        { name: 'Subidas a pino controlado (Handstand)', sets: '3 series', reps: '5 intentos' }
      ]
    },
    legs: {
      title: 'Piernas y Núcleo Explosivo',
      level: 'Todos los niveles',
      duration: '35 min',
      exercises: [
        { name: 'Sentadillas búlgaras profundas', sets: '4 series', reps: '12 por pierna' },
        { name: 'Saltos al cajón o sentadillas con salto', sets: '3 series', reps: '10 reps' },
        { name: 'Elevaciones de piernas en barra (Core)', sets: '4 series', reps: '10 - 12 reps' },
        { name: 'Hollow body hold activo', sets: '3 series', reps: '40 segs' }
      ]
    }
  };

  const faqs = [
    {
      q: '¿Tiene algún costo o suscripción oculta?',
      a: 'No. Kallyfit es 100% gratuita. No hay mensualidades, compras dentro de la app ni bloqueos tras completar cierto número de rutinas.'
    },
    {
      q: '¿Cómo instalo el archivo APK en mi teléfono Android?',
      a: 'Es muy fácil: 1) Pulsa el botón "Descargar APK". 2) Al finalizar la descarga, abre el archivo desde tus notificaciones. 3) Si tu navegador te solicita permiso para "Instalar aplicaciones de fuentes desconocidas", acéptalo y listo.'
    },
    {
      q: '¿Por qué no está en Google Play Store todavía?',
      a: 'Distribuir el APK de forma directa y autónoma permite recibir actualizaciones continuas inmediatamente sin esperar días de aprobación por tiendas, manteniendo la app ligera y libre de rastreadores comerciales.'
    },
    {
      q: '¿Funciona si no tengo conexión a internet?',
      a: 'Sí, totalmente. Kallyfit fue diseñada bajo la filosofía "Local-First". Todas tus rutinas, cronómetros y registros se ejecutan en tu teléfono sin requerir internet. Si decides iniciar sesión, tus datos se sincronizan automáticamente al volver a tener señal.'
    },
    {
      q: '¿Necesito equipo de gimnasio o pesas?',
      a: 'No es indispensable. El 90% de los ejercicios se basan en calistenia pura con tu peso corporal, una barra de dominadas y unas paralelas simples.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] selection:bg-[#58a6ff] selection:text-black">
      {/* Top Floating App Navbar */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <img src={kallyfitIcon} alt="Kallyfit Logo" className="w-8 h-8 rounded-xl shadow border border-[#30363d]" />
              <span className="font-black text-base sm:text-lg tracking-wider bg-gradient-to-r from-[#58a6ff] to-[#79c0ff] bg-clip-text text-transparent">
                KALLYFIT
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-[#8b949e]">
              <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
              <a href="#biomecanica" className="hover:text-white transition-colors">Animaciones 2.5D</a>
              <a href="#rutinas" className="hover:text-white transition-colors">Rutinas</a>
              <Link to="/dev/kallyfit/leaderboard" className="text-[#58a6ff] hover:text-[#79c0ff] transition-colors flex items-center gap-1 font-bold">
                <FiAward className="text-sm" />
                <span>Leaderboard</span>
              </Link>
              <a href="#instalacion" className="hover:text-white transition-colors">Instalación</a>
              <a href="#faq" className="hover:text-white transition-colors">Preguntas</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dev/kallyfit/leaderboard"
              className="px-3 py-1.5 rounded-xl bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-bold hover:bg-[#21262d] transition-colors flex items-center gap-1.5 md:hidden"
            >
              <FiAward />
              <span>Ranking</span>
            </Link>

            <a
              href={downloadUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-black text-xs sm:text-sm active:scale-95 transition-all shadow-md shadow-emerald-950/40"
            >
              <FiDownload className="text-sm stroke-[3]" />
              <span>Descargar APK</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-12 pb-20 space-y-20">
        {/* HERO SECTION */}
        <section className="text-center space-y-8 pt-2">
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto text-white">
            Domina la barra.<br />
            <span className="bg-gradient-to-r from-[#58a6ff] via-[#79c0ff] to-[#3fb950] bg-clip-text text-transparent">
              Entrena calistenia sin límites.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            La app de entrenamiento creada para atletas reales: cronómetros para series Cluster y AMRAP, avisos por audio y vibración, y <strong className="text-white">funcionalidad offline</strong>.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 max-w-md sm:max-w-none mx-auto">
            <a
              href={downloadUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#238636] hover:bg-[#2ea043] text-white font-black text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-950/50 group"
            >
              <FiDownload className="text-xl stroke-[3] group-hover:translate-y-0.5 transition-transform" />
              <span>Descargar Kallyfit para Android (.APK)</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenModal('monthly')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#161b22] border border-[#30363d] text-[#58a6ff] font-bold text-base hover:bg-[#21262d] transition-all cursor-pointer shadow-lg hover:border-[#58a6ff]/50 active:scale-95"
            >
              <FiAward className="text-lg" />
              <span>Ver Leaderboard de Atletas</span>
            </button>
          </div>

          <div className="text-xs text-[#8b949e] flex flex-wrap justify-center items-center gap-4 pt-1 font-mono">
            <span className="flex items-center gap-1.5 text-[#f0f6fc]"><FiShield className="text-[#3fb950]" /> Sin publicidad</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><FiSmartphone className="text-[#58a6ff]" /> Android 8.0 o superior</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#f0f6fc]"><FiWifiOff className="text-[#3fb950]" /> Funcionalidad offline</span>
          </div>

          {/* DUAL SHOWCASE: PHONE MOCKUP + LIVE BIOMECHANIC ANIMATION */}
          <div className="pt-8 grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Real SVG Biomechanical Animation */}
            <div id="biomecanica" className="order-2 lg:order-1 text-left">
              <BiomechanicFigure defaultExercise="pullup" />
            </div>

            {/* Interactive Phone Mockup */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-[#161b22] border-4 border-[#30363d] p-5 shadow-2xl shadow-blue-500/10 text-left overflow-hidden">
                {/* Notch / Speaker */}
                <div className="w-24 h-4 bg-[#0d1117] rounded-full mx-auto mb-4 opacity-70"></div>

                {/* Status Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse"></div>
                    <span className="text-xs font-mono font-bold text-[#3fb950] uppercase tracking-wider">Entrenamiento Activo</span>
                  </div>
                  <span className="text-xs font-mono text-[#8b949e]">00:24:15</span>
                </div>

                {/* Exercise Card Preview */}
                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#58a6ff] tracking-widest">EJERCICIO 2 DE 4</span>
                      <h4 className="text-lg font-black text-white">Muscle-Up en Barra</h4>
                      <span className="text-xs text-[#8b949e]">Agarre falso • Explosividad</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#a371f7]/20 text-[#a371f7] border border-[#a371f7]/30 uppercase">
                      Élite
                    </span>
                  </div>

                  {/* Big Reps / Timer Display */}
                  <div className="text-center py-4 bg-[#161b22] rounded-xl border border-[#30363d]/50">
                    <div className="text-5xl font-black text-white tracking-tight">
                      {isPlayingDemo ? '01:15' : '6 REPS'}
                    </div>
                    <span className="text-[11px] font-mono text-[#8b949e] uppercase mt-1 block">
                      {isPlayingDemo ? 'TIEMPO DE DESCANSO RESTANTE' : 'SERIE 3 DE 4 • META: 6-8'}
                    </span>
                  </div>

                  {/* Audio & Haptic indicator */}
                  <div className="flex justify-between items-center text-xs text-[#8b949e] px-1 font-mono">
                    <span className="flex items-center gap-1.5 text-[#3fb950]">
                      <FiVolume2 /> Audio beeps ON
                    </span>
                    <span className="flex items-center gap-1.5 text-[#58a6ff]">
                      <FiActivity /> Hápticos ON
                    </span>
                  </div>
                </div>

                {/* Player Controls Simulation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                    className="flex-1 py-3 bg-[#1f6feb] hover:bg-[#58a6ff] text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    {isPlayingDemo ? <FiPause /> : <FiPlay />}
                    <span>{isPlayingDemo ? 'Pausar Descanso' : 'Completar Serie'}</span>
                  </button>

                  <button
                    onClick={() => setIsPlayingDemo(false)}
                    className="p-3 bg-[#21262d] text-[#8b949e] hover:text-white rounded-xl transition-colors border border-[#30363d]"
                    title="Reiniciar"
                  >
                    <FiRotateCcw className="text-base" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / VALUE STRIP */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] text-center space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#58a6ff]">+50</span>
            <span className="text-xs sm:text-sm font-medium text-[#8b949e]">Ejercicios con biomecánica</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] text-center space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#3fb950]">0</span>
            <span className="text-xs sm:text-sm font-medium text-[#8b949e]">Sin publicidad</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] text-center space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#58a6ff]">100%</span>
            <span className="text-xs sm:text-sm font-medium text-[#8b949e]">Funcionalidad offline</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#161b22] border border-[#30363d] text-center space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#3fb950]">$0</span>
            <span className="text-xs sm:text-sm font-medium text-[#8b949e]">Gratis de por vida</span>
          </div>
        </section>

        {/* LEADERBOARD TEASER BANNER */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#161b22] via-[#1f6feb]/15 to-[#161b22] border border-[#58a6ff]/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#58a6ff]/10 text-[#58a6ff] text-xs font-mono font-bold">
              <FiAward />
              <span>COMPETENCIA & RANKING OFICIAL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Tabla de Posiciones de Atletas</h3>
            <p className="text-sm text-[#8b949e] max-w-xl">
              Compite contra la comunidad. Consulta los puntajes acumulados tanto mensuales como históricos de todos los usuarios registrados en Kallyfit.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal('monthly')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1f6feb] hover:bg-[#58a6ff] text-white font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <FiTrendingUp className="text-base" />
            <span>Ver Leaderboard en Vivo</span>
          </button>
        </section>

        {/* CORE FEATURES GRID */}
        <section id="caracteristicas" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#58a6ff]">
              POR QUÉ KALLYFIT ES DIFERENTE
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white">
              Diseñada pensando en lo que pasa en la barra.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 hover:border-[#58a6ff]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#58a6ff]/10 border border-[#58a6ff]/20 text-[#58a6ff] flex items-center justify-center text-2xl">
                <FiVolume2 />
              </div>
              <h4 className="text-xl font-bold text-white">Coach de Audio y Señales Hápticas</h4>
              <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
                Olvídate de desbloquear el teléfono sudado. Kallyfit emite alertas acústicas y vibraciones que te indican el 3-2-1 final del descanso, el inicio de la serie y los cambios de bloque.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 hover:border-[#3fb950]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#3fb950]/10 border border-[#3fb950]/20 text-[#3fb950] flex items-center justify-center text-2xl">
                <FiWifiOff />
              </div>
              <h4 className="text-xl font-bold text-white">Funcionalidad 100% Offline</h4>
              <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
                ¿Entrenas en un parque sin cobertura o en un sótano? Todos tus datos y rutinas se guardan de forma local instantáneamente. Cero pantallas de carga o errores por falta de internet.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 hover:border-[#58a6ff]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#58a6ff]/10 border border-[#58a6ff]/20 text-[#58a6ff] flex items-center justify-center text-2xl">
                <FiClock />
              </div>
              <h4 className="text-xl font-bold text-white">Temporizadores para Atletas Reales</h4>
              <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
                Entrena con series Cluster (ej. 2+2+2), cuenta de segundos para ejercicios estáticos (Front Lever, L-Sit) y bloques AMRAP con dígitos gigantes legibles a metros de distancia.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 hover:border-[#a371f7]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#a371f7]/10 border border-[#a371f7]/20 text-[#a371f7] flex items-center justify-center text-2xl">
                <FiAward />
              </div>
              <h4 className="text-xl font-bold text-white">Progresiones y Guía Biomecánica</h4>
              <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
                Cada ejercicio incluye información anatómica sobre la colocación de codos, hombros y rango de movimiento completo, protegiendo tus tendones y acelerando tu ganancia de fuerza.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ROUTINES PREVIEW */}
        <section id="rutinas" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#58a6ff]">
              PROGRAMAS PRECARGADOS
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Elige tu objetivo y empieza a entrenar
            </h3>
          </div>

          {/* Routine Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'push', label: 'Empuje (Push)' },
              { id: 'pull', label: 'Jalón (Pull)' },
              { id: 'skills', label: 'Estáticos & Skills' },
              { id: 'legs', label: 'Pierna & Core' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1f6feb] text-white shadow-md shadow-blue-500/20'
                    : 'bg-[#161b22] text-[#8b949e] hover:bg-[#21262d] hover:text-white border border-[#30363d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Routine Active Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#161b22] border border-[#30363d] max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#30363d] pb-4">
              <div>
                <h4 className="text-xl font-black text-white">{routinesData[activeTab].title}</h4>
                <span className="text-xs text-[#8b949e]">Duración estimada: {routinesData[activeTab].duration}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 self-start sm:self-auto font-mono">
                {routinesData[activeTab].level}
              </span>
            </div>

            <ul className="space-y-3">
              {routinesData[activeTab].exercises.map((ex, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/60 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#58a6ff]/20 text-[#58a6ff] flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-white">{ex.name}</span>
                  </div>
                  <div className="text-right text-[#8b949e] font-mono text-xs">
                    <span className="text-white font-bold">{ex.sets}</span> • {ex.reps}
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-center">
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
              >
                <span>Descarga Kallyfit para entrenar esta rutina</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3 STEPS INSTALL GUIDE */}
        <section id="instalacion" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Instalación rápida en 3 pasos</h3>
            <p className="text-sm text-[#8b949e]">Comienza a entrenar en menos de 2 minutos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="w-8 h-8 rounded-xl bg-[#1f6feb] text-white font-black flex items-center justify-center text-sm font-mono">1</span>
              <h4 className="font-bold text-white text-base">Descarga el APK</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Haz clic en el botón de descarga para guardar el paquete oficial <strong className="text-white font-mono">kallyfit-v1.0.7.apk</strong> en tu celular.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="w-8 h-8 rounded-xl bg-[#1f6feb] text-white font-black flex items-center justify-center text-sm font-mono">2</span>
              <h4 className="font-bold text-white text-base">Autoriza e Instala</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Abre el archivo descargado y confirma la instalación. Si Android te pregunta, permite "Instalar aplicaciones de fuentes desconocidas".
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="w-8 h-8 rounded-xl bg-[#1f6feb] text-white font-black flex items-center justify-center text-sm font-mono">3</span>
              <h4 className="font-bold text-white text-base">¡Listo para la barra!</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Abre Kallyfit, selecciona una rutina o crea la tuya personalizada y empieza a romper tus marcas personales.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Preguntas Frecuentes</h3>
            <p className="text-sm text-[#8b949e]">Todo lo que necesitas saber antes de entrenar con Kallyfit.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#161b22] border border-[#30363d] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-[#21262d]/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                  <FiChevronDown className={`shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#8b949e] leading-relaxed border-t border-[#30363d]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CONVERSION BANNER */}
        <section className="text-center p-10 sm:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#1f6feb]/20 via-[#161b22] to-[#238636]/20 border-2 border-[#58a6ff]/40 space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <img src={kallyfitIcon} alt="Kallyfit" className="w-16 h-16 rounded-2xl mx-auto shadow-xl border-2 border-[#58a6ff]" />
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Lleva tu físico al siguiente nivel hoy.
            </h3>
            <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
              Descarga Kallyfit directamente en tu teléfono Android y descubre por qué entrenar calistenia con la herramienta correcta marca la diferencia.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={downloadUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[#238636] hover:bg-[#2ea043] text-white font-black text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-950/40"
              >
                <FiDownload className="text-xl stroke-[3]" />
                <span>Descargar APK Gratis (v1.0.7)</span>
              </a>

              <Link
                to="/dev/kallyfit/leaderboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#161b22] border border-[#30363d] text-[#58a6ff] hover:text-white text-base font-bold transition-colors"
              >
                <FiAward className="text-lg" />
                <span>Ver Tabla de Posiciones</span>
              </Link>
            </div>
          </div>

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* Dedicated Minimal Landing Footer */}
        <footer className="pt-8 border-t border-[#30363d] text-center text-xs text-[#8b949e] space-y-2">
          <p>© {new Date().getFullYear()} Kallyfit • Creado con pasión por el entrenamiento físico</p>
          <p className="text-[11px] text-[#6e7681]">
            Desarrollado por <Link to="/" className="text-[#58a6ff] hover:underline">Yucef</Link>
          </p>
        </footer>
      </div>

      {/* MODAL DE LEADERBOARD EN VIVO (CONECTADO DIRECTAMENTE AL WORKER) */}
      {isLeaderboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/80">
              <div className="flex items-center gap-3">
                <img src={kallyfitIcon} alt="Kallyfit" className="w-8 h-8 rounded-xl border border-[#30363d]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">Leaderboard Oficial de Atletas</h3>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#238636]/20 border border-[#238636]/60 text-[#3fb950]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse"></span>
                      Cloudflare Edge Live
                    </span>
                  </div>
                  <p className="text-xs text-[#8b949e]">
                    Datos sincronizados en tiempo real desde el Worker • {lastUpdated ? `Última sincronización: ${lastUpdated}` : 'Consultando...'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLeaderboardModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Tabs & Refresh Bar */}
            <div className="px-5 py-3 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-3 bg-[#161b22]">
              <div className="flex p-1 bg-[#0d1117] rounded-xl border border-[#30363d]">
                <button
                  onClick={() => handleTabChange('monthly')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalRankingType === 'monthly'
                      ? 'bg-[#1f6feb] text-white shadow-sm'
                      : 'text-[#8b949e] hover:text-white'
                  }`}
                >
                  Ranking Mensual
                </button>
                <button
                  onClick={() => handleTabChange('total')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalRankingType === 'total'
                      ? 'bg-[#1f6feb] text-white shadow-sm'
                      : 'text-[#8b949e] hover:text-white'
                  }`}
                >
                  Ranking Total (XP)
                </button>
              </div>

              <button
                onClick={() => fetchWorkerLeaderboard(modalRankingType)}
                disabled={isLoadingLeaderboard}
                className="inline-flex items-center gap-1.5 text-xs text-[#58a6ff] hover:text-[#79c0ff] font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                <FiRefreshCw className={`text-xs ${isLoadingLeaderboard ? 'animate-spin' : ''}`} />
                <span>Refrescar</span>
              </button>
            </div>

            {/* Modal Athletes List */}
            <div className="p-5 overflow-y-auto space-y-3 flex-grow">
              {isLoadingLeaderboard ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-8 h-8 mx-auto border-4 border-[#58a6ff] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-[#8b949e]">Consultando atletas en vivo en Cloudflare Edge (D1)...</p>
                </div>
              ) : leaderboardError ? (
                <div className="py-12 text-center space-y-3 p-4 rounded-2xl bg-red-950/20 border border-red-800/40">
                  <p className="text-xs text-red-400">{leaderboardError}</p>
                  <button
                    onClick={() => fetchWorkerLeaderboard(modalRankingType)}
                    className="px-4 py-2 rounded-xl bg-[#21262d] text-white text-xs font-bold hover:bg-[#30363d]"
                  >
                    Reintentar
                  </button>
                </div>
              ) : liveAthletes.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8b949e]">
                  No hay atletas registrados en este ranking aún.
                </div>
              ) : (
                <div className="divide-y divide-[#30363d]/60">
                  {liveAthletes.map((athlete: any) => {
                    const score = modalRankingType === 'monthly' ? athlete.scoreMonthly : athlete.scoreTotal;
                    const isTop1 = athlete.rank === 1;
                    const isTop2 = athlete.rank === 2;
                    const isTop3 = athlete.rank === 3;
                    return (
                      <div
                        key={athlete.id || athlete.athleteName}
                        className={`py-3 px-3 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                          isTop1 ? 'bg-[#58a6ff]/10 border border-[#58a6ff]/20' : 'hover:bg-[#21262d]/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                              isTop1
                                ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40'
                                : isTop2
                                ? 'bg-[#c0c0c0]/20 text-[#e6edf3] border border-[#c0c0c0]/40'
                                : isTop3
                                ? 'bg-[#cd7f32]/20 text-[#a371f7] border border-[#cd7f32]/40'
                                : 'bg-[#0d1117] text-[#8b949e] border border-[#30363d]'
                            }`}
                          >
                            #{athlete.rank}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{athlete.athleteName}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e]">
                                {athlete.country || 'MX'}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#8b949e]">{athlete.specialty || 'Calistenia'}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-sm text-white font-mono block">
                            {Number(score || 0).toLocaleString()} <span className="text-[10px] text-[#58a6ff]">XP</span>
                          </span>
                          <span className="text-[11px] text-[#3fb950] font-mono">
                            Racha: {athlete.streakDays || 1} d
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-[#30363d] bg-[#0d1117] flex items-center justify-between">
              <Link
                to="/dev/kallyfit/leaderboard"
                onClick={() => setIsLeaderboardModalOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs text-[#58a6ff] hover:text-[#79c0ff] font-bold transition-colors"
              >
                <span>Ver página completa con podio y filtros</span>
                <FiExternalLink className="text-xs" />
              </Link>
              <button
                onClick={() => setIsLeaderboardModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KallyfitLanding;
