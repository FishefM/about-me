export interface AthleteRankItem {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  rankMonthly: number;
  rankTotal: number;
  title: string;
  level: string;
  monthlyScore: number;
  totalXp: number;
  monthlySessions: number;
  totalSessions: number;
  verified?: boolean;
}

export const leaderboardAthletes: AthleteRankItem[] = [
  {
    id: 'ath_yucef',
    username: 'yucef',
    displayName: 'Yucef',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rankMonthly: 1,
    rankTotal: 1,
    title: 'Atleta Élite & Creador',
    level: 'Nivel 28 • Élite',
    monthlyScore: 9628,
    totalXp: 9628,
    monthlySessions: 9,
    totalSessions: 9,
    verified: true
  },
  {
    id: 'ath_kitzya',
    username: 'kitzya',
    displayName: 'Kitzya',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rankMonthly: 2,
    rankTotal: 2,
    title: 'Atleta Comunidad',
    level: 'Nivel 2 • Activo',
    monthlyScore: 94,
    totalXp: 94,
    monthlySessions: 1,
    totalSessions: 1,
    verified: true
  },
  {
    id: 'ath_jesus',
    username: 'jesus',
    displayName: 'Jesus',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rankMonthly: 3,
    rankTotal: 3,
    title: 'Atleta Comunidad',
    level: 'Nivel 1 • Activo',
    monthlyScore: 0,
    totalXp: 0,
    monthlySessions: 0,
    totalSessions: 0,
    verified: true
  },
  {
    id: 'ath_hector',
    username: 'hector',
    displayName: 'Hector',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rankMonthly: 4,
    rankTotal: 4,
    title: 'Atleta Comunidad',
    level: 'Nivel 1 • Activo',
    monthlyScore: 0,
    totalXp: 0,
    monthlySessions: 0,
    totalSessions: 0,
    verified: true
  },
  {
    id: 'ath_inge',
    username: 'inge',
    displayName: 'Inge',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rankMonthly: 5,
    rankTotal: 5,
    title: 'Atleta Comunidad',
    level: 'Nivel 1 • Activo',
    monthlyScore: 0,
    totalXp: 0,
    monthlySessions: 0,
    totalSessions: 0,
    verified: true
  }
];
