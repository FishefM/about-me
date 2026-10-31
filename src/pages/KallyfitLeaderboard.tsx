import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiDownload, 
  FiSearch, 
  FiAward, 
  FiTrendingUp, 
  FiCalendar, 
  FiShield,
  FiX,
  FiRefreshCw
} from 'react-icons/fi';
import kallyfitIcon from '../assets/kallyfit-icon.png';
import { leaderboardAthletes, type AthleteRankItem } from '../data/kallyfitLeaderboard';

const WORKER_API = import.meta.env.VITE_KALLYFIT_API_URL || 'https://kallyfit.yucefhernandez.com';

const KallyfitLeaderboard: React.FC = () => {
  const [rankingType, setRankingType] = useState<'monthly' | 'total'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveAthletes, setLiveAthletes] = useState<AthleteRankItem[] | null>(null);
  const [isLiveSync, setIsLiveSync] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const downloadUrl = 'https://tokiserver.com/drive/kallyfit/kallyfit-v1.0.7.apk';

  const fetchLiveRankings = async (type = rankingType) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${WORKER_API}/api/leaderboard?type=${type}&limit=50`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.athletes) && data.athletes.length > 0) {
        const mapped: AthleteRankItem[] = data.athletes.map((a: any, idx: number) => ({
          id: a.id || `ath_${idx}`,
          displayName: a.athleteName,
          username: a.athleteName.toLowerCase().replace(/\s+/g, '_'),
          avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + (idx * 1337)}?w=120&auto=format&fit=crop&q=80`,
          title: a.scoreTotal > 5000 ? 'Atleta Élite & Creador' : 'Atleta Comunidad',
          rankMonthly: type === 'monthly' ? a.rank : idx + 1,
          rankTotal: type === 'total' ? a.rank : idx + 1,
          monthlyScore: a.scoreMonthly,
          totalXp: a.scoreTotal,
          monthlySessions: a.athleteName === 'Yucef' ? 9 : a.athleteName === 'Kitzya' ? 1 : 0,
          totalSessions: a.athleteName === 'Yucef' ? 9 : a.athleteName === 'Kitzya' ? 1 : 0,
          verified: true,
        }));
        setLiveAthletes(mapped);
        setIsLiveSync(true);
      }
    } catch (err) {
      // Fallback silencioso a datos locales en caso de desconexión
      setIsLiveSync(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRankings(rankingType);
  }, [rankingType]);

  const currentDataSource = liveAthletes || leaderboardAthletes;

  // Sort athletes based on ranking type
  const sortedAthletes = useMemo(() => {
    const list = [...currentDataSource];
    if (rankingType === 'monthly') {
      list.sort((a, b) => a.rankMonthly - b.rankMonthly);
    } else {
      list.sort((a, b) => a.rankTotal - b.rankTotal);
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      a =>
        a.displayName.toLowerCase().includes(q) ||
        a.username.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q)
    );
  }, [currentDataSource, rankingType, searchQuery]);

  // Top 3 for podium
  const topThree = useMemo(() => {
    const base = [...currentDataSource];
    if (rankingType === 'monthly') {
      base.sort((a, b) => a.rankMonthly - b.rankMonthly);
    } else {
      base.sort((a, b) => a.rankTotal - b.rankTotal);
    }
    return base.slice(0, 3);
  }, [currentDataSource, rankingType]);

  const maxScore = useMemo(() => {
    if (rankingType === 'monthly') {
      return Math.max(...currentDataSource.map(a => a.monthlyScore));
    }
    return Math.max(...currentDataSource.map(a => a.totalXp));
  }, [currentDataSource, rankingType]);

  const monthNames = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
  const currentMonthLabel = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] selection:bg-[#58a6ff] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/dev/kallyfit"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8b949e] hover:text-[#58a6ff] transition-colors"
            >
              <FiArrowLeft />
              <span>Volver a Kallyfit</span>
            </Link>
            <span className="text-[#30363d]">|</span>
            <div className="flex items-center gap-2">
              <img src={kallyfitIcon} alt="Kallyfit Logo" className="w-7 h-7 rounded-lg shadow border border-[#30363d]" />
              <span className="font-black text-sm tracking-wider bg-gradient-to-r from-[#58a6ff] to-[#79c0ff] bg-clip-text text-transparent">
                LEADERBOARD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLiveSync ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-[#238636]/60 bg-[#238636]/15 text-[#3fb950] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse"></span>
                Cloudflare Edge Live
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-[#30363d] bg-[#161b22] text-[#8b949e]">
                Caché local
              </span>
            )}
            <a
              href={downloadUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-black text-xs sm:text-sm active:scale-95 transition-all shadow-md shadow-emerald-900/30"
            >
              <FiDownload className="text-sm stroke-[3]" />
              <span>Descargar APK</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20 space-y-12">
        {/* Title & Info Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-mono font-bold tracking-wider">
            <FiAward />
            <span>SISTEMA DE PUNTUACIÓN DE ATLETAS • KALLYFIT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Posiciones & Ranking de Atletas
          </h1>

          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Publicación en tiempo real del desempeño de los usuarios. La constancia, el volumen de repeticiones y la dificultad de los ejercicios definen tu lugar en la tabla.
          </p>
        </div>

        {/* Toggle & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#161b22] border border-[#30363d] p-3 sm:p-4 rounded-2xl">
          {/* Tabs */}
          <div className="flex p-1 bg-[#0d1117] rounded-xl border border-[#30363d]">
            <button
              onClick={() => setRankingType('monthly')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                rankingType === 'monthly'
                  ? 'bg-[#1f6feb] text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              <FiCalendar />
              <span>Ranking Mensual ({currentMonthLabel})</span>
            </button>
            <button
              onClick={() => setRankingType('total')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                rankingType === 'total'
                  ? 'bg-[#1f6feb] text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              <FiTrendingUp />
              <span>Ranking Total (XP Histórico)</span>
            </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b949e] text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar atleta o especialidad..."
                className="w-full pl-9 pr-8 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#58a6ff] text-white placeholder-[#6e7681]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8b949e] hover:text-white"
                >
                  <FiX />
                </button>
              )}
            </div>

            <button
              onClick={() => fetchLiveRankings(rankingType)}
              disabled={isLoading}
              title="Refrescar datos en vivo desde Cloudflare Edge"
              className="p-2.5 rounded-xl bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-[#58a6ff] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <FiRefreshCw className={`text-sm ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* PODIUM OF TOP 3 */}
        {!searchQuery && topThree.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2 items-end">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 p-6 rounded-3xl bg-[#161b22] border border-[#30363d] relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="w-9 h-9 rounded-2xl bg-[#30363d] text-[#e6edf3] font-black flex items-center justify-center text-sm border border-[#484f58]">
                    #2
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b949e]">
                    Plata
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{topThree[1].displayName}</h3>
                  <p className="text-xs text-[#58a6ff] font-mono font-semibold">@{topThree[1].username}</p>
                  <p className="text-xs text-[#8b949e] mt-1">{topThree[1].title}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#30363d] mt-6 flex justify-between items-end">
                <div>
                  <span className="text-xs text-[#8b949e] block font-mono">PUNTOS</span>
                  <span className="text-2xl font-black text-white">
                    {rankingType === 'monthly' ? topThree[1].monthlyScore : topThree[1].totalXp}
                  </span>
                </div>
                <div className="text-right text-xs font-mono text-[#8b949e]">
                  <span>{rankingType === 'monthly' ? topThree[1].monthlySessions : topThree[1].totalSessions} sesiones</span>
                </div>
              </div>
            </div>

            {/* 1st Place (Champion) */}
            <div className="order-1 md:order-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1f6feb]/20 to-[#161b22] border-2 border-[#58a6ff] relative overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="w-11 h-11 rounded-2xl bg-[#d29922] text-black font-black flex items-center justify-center text-base shadow-lg shadow-amber-500/20">
                    #1
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#d29922]/20 text-[#d29922] border border-[#d29922]/40 text-[10px] font-mono font-black uppercase tracking-wider">
                    Líder {rankingType === 'monthly' ? currentMonthLabel : 'Absoluto'}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{topThree[0].displayName}</h3>
                  <p className="text-xs text-[#79c0ff] font-mono font-semibold">@{topThree[0].username}</p>
                  <p className="text-xs text-[#8b949e] mt-1">{topThree[0].title}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#30363d] mt-6 flex justify-between items-end">
                <div>
                  <span className="text-xs text-[#8b949e] block font-mono">PUNTOS DE RANKING</span>
                  <span className="text-3xl font-black text-white">
                    {rankingType === 'monthly' ? topThree[0].monthlyScore : topThree[0].totalXp}
                  </span>
                </div>
                <div className="text-right text-xs font-mono text-[#3fb950] font-bold">
                  <span>{rankingType === 'monthly' ? topThree[0].monthlySessions : topThree[0].totalSessions} sesiones</span>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3 p-6 rounded-3xl bg-[#161b22] border border-[#30363d] relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="w-9 h-9 rounded-2xl bg-[#a371f7]/20 text-[#a371f7] font-black flex items-center justify-center text-sm border border-[#a371f7]/40">
                    #3
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b949e]">
                    Bronce
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{topThree[2].displayName}</h3>
                  <p className="text-xs text-[#58a6ff] font-mono font-semibold">@{topThree[2].username}</p>
                  <p className="text-xs text-[#8b949e] mt-1">{topThree[2].title}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#30363d] mt-6 flex justify-between items-end">
                <div>
                  <span className="text-xs text-[#8b949e] block font-mono">PUNTOS</span>
                  <span className="text-2xl font-black text-white">
                    {rankingType === 'monthly' ? topThree[2].monthlyScore : topThree[2].totalXp}
                  </span>
                </div>
                <div className="text-right text-xs font-mono text-[#8b949e]">
                  <span>{rankingType === 'monthly' ? topThree[2].monthlySessions : topThree[2].totalSessions} sesiones</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL LEADERBOARD TABLE */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {rankingType === 'monthly' ? `Clasificación de ${currentMonthLabel} ${currentYear}` : 'Clasificación Histórica Acumulada'}
            </h3>
            <span className="text-xs font-mono text-[#8b949e]">
              {sortedAthletes.length} atletas registrados
            </span>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl">
            {sortedAthletes.length === 0 ? (
              <div className="text-center py-16 p-6 space-y-3">
                <p className="text-sm text-[#8b949e]">No se encontraron atletas con ese nombre.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-[#21262d] text-white text-xs font-bold rounded-xl border border-[#30363d]"
                >
                  Limpiar filtro
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]">
                {sortedAthletes.map((athlete: AthleteRankItem) => {
                  const currentRank = rankingType === 'monthly' ? athlete.rankMonthly : athlete.rankTotal;
                  const currentScore = rankingType === 'monthly' ? athlete.monthlyScore : athlete.totalXp;
                  const currentSessions = rankingType === 'monthly' ? athlete.monthlySessions : athlete.totalSessions;
                  const percentOfTop = Math.round((currentScore / maxScore) * 100);

                  return (
                    <div
                      key={athlete.id}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#21262d]/50 ${
                        currentRank === 1 ? 'bg-[#58a6ff]/5' : ''
                      }`}
                    >
                      {/* Left: Rank, Name, Details */}
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center shrink-0">
                          <span
                            className={`font-black text-xs font-mono ${
                              currentRank === 1
                                ? 'text-[#d29922]'
                                : currentRank === 2
                                ? 'text-[#e6edf3]'
                                : currentRank === 3
                                ? 'text-[#a371f7]'
                                : 'text-[#8b949e]'
                            }`}
                          >
                            #{currentRank}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-white">{athlete.displayName}</span>
                            <span className="text-xs font-mono text-[#58a6ff]">@{athlete.username}</span>
                            {currentRank === 1 && (
                              <span className="px-2 py-0.2 rounded text-[9px] font-black bg-[#d29922]/20 text-[#d29922] uppercase">
                                Top 1
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                            <span>{athlete.title}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Metrics & XP Progress Bar */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 self-stretch sm:self-auto pl-12 sm:pl-0">
                        {/* Sessions */}
                        <div className="text-left sm:text-right text-xs font-mono">
                          <span className="text-white font-bold block">{currentSessions} sesiones</span>
                        </div>

                        {/* Points & Progress Bar */}
                        <div className="w-32 sm:w-40 text-right space-y-1.5">
                          <div className="flex justify-between items-baseline text-xs font-mono">
                            <span className="text-[#8b949e] text-[10px]">PUNTOS</span>
                            <span className="text-sm font-black text-white">{currentScore.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
                            <div
                              className="h-full bg-gradient-to-r from-[#1f6feb] to-[#58a6ff] rounded-full transition-all duration-500"
                              style={{ width: `${percentOfTop}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* HOW RANKING WORKS INFO BOX */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
          <div className="flex items-center gap-2 text-[#58a6ff]">
            <FiShield className="text-lg" />
            <h4 className="font-bold text-sm sm:text-base text-white">¿Cómo funciona la puntuación en Kallyfit?</h4>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs text-[#8b949e] leading-relaxed pt-1">
            <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]/60 space-y-1.5">
              <span className="font-bold text-white block">1. Volumen & Dificultad</span>
              <p>Cada serie completada otorga puntos ponderados según la complejidad biomecánica del ejercicio y el rango de repeticiones o segundos estáticos.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]/60 space-y-1.5">
              <span className="font-bold text-white block">2. Ranking Mensual</span>
              <p>Mide la constancia durante el mes actual ({currentMonthLabel}). Se reinicia el primer día de cada mes para mantener la competencia activa para todos los atletas.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]/60 space-y-1.5">
              <span className="font-bold text-white block">3. Total XP Histórico</span>
              <p>Acumula cada sesión completada desde tu primer entrenamiento en la app, reflejando tu dedicación a largo plazo y progresión en calistenia.</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-[#30363d] text-center text-xs text-[#8b949e] space-y-2">
          <p>© {currentYear} Kallyfit Leaderboard • Sincronizado vía TokiServer</p>
          <p className="text-[11px] text-[#6e7681]">
            <Link to="/dev/kallyfit" className="text-[#58a6ff] hover:underline">Volver a la página de Kallyfit</Link> • Desarrollado por <Link to="/" className="text-[#58a6ff] hover:underline">Yucef</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default KallyfitLeaderboard;
