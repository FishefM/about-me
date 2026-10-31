export interface AthleteRankItem {
  id: string;
  username: string;
  displayName: string;
  rankMonthly: number;
  rankTotal: number;
  title: string;
  level: string;
  monthlyScore: number;
  totalXp: number;
  monthlySessions: number;
  totalSessions: number;
  streakDays: number;
  specialty: string;
}

export const leaderboardAthletes: AthleteRankItem[] = [
  {
    id: '1',
    username: 'yucef',
    displayName: 'Yucef Hernández',
    rankMonthly: 1,
    rankTotal: 1,
    title: 'Creador & Atleta Élite',
    level: 'Nivel 28 • Élite',
    monthlyScore: 3840,
    totalXp: 26450,
    monthlySessions: 24,
    totalSessions: 164,
    streakDays: 18,
    specialty: 'Muscle-Up & Fondos Lastrados'
  },
  {
    id: '2',
    username: 'alex_calisthenics',
    displayName: 'Alex M.',
    rankMonthly: 2,
    rankTotal: 3,
    title: 'Master de Estáticos',
    level: 'Nivel 25 • Avanzado',
    monthlyScore: 3510,
    totalXp: 21800,
    monthlySessions: 22,
    totalSessions: 142,
    streakDays: 14,
    specialty: 'Front Lever & Planche Leans'
  },
  {
    id: '3',
    username: 'marcos_barz',
    displayName: 'Marcos R.',
    rankMonthly: 3,
    rankTotal: 2,
    title: 'Bestia del Volumen',
    level: 'Nivel 26 • Élite',
    monthlyScore: 3290,
    totalXp: 23400,
    monthlySessions: 21,
    totalSessions: 155,
    streakDays: 12,
    specialty: 'Dominadas con Agarre Estricto'
  },
  {
    id: '4',
    username: 'carlos_front',
    displayName: 'Carlos V.',
    rankMonthly: 4,
    rankTotal: 5,
    title: 'Especialista de Tracción',
    level: 'Nivel 22 • Avanzado',
    monthlyScore: 2950,
    totalXp: 18200,
    monthlySessions: 19,
    totalSessions: 118,
    streakDays: 9,
    specialty: 'Dominadas Neutras & Remos'
  },
  {
    id: '5',
    username: 'david_street',
    displayName: 'David S.',
    rankMonthly: 5,
    rankTotal: 4,
    title: 'Atleta Street Workout',
    level: 'Nivel 23 • Avanzado',
    monthlyScore: 2810,
    totalXp: 19100,
    monthlySessions: 18,
    totalSessions: 124,
    streakDays: 8,
    specialty: 'Pike Push-ups & Fondos'
  },
  {
    id: '6',
    username: 'samuel_pull',
    displayName: 'Samuel L.',
    rankMonthly: 6,
    rankTotal: 6,
    title: 'Guerrero de la Barra',
    level: 'Nivel 20 • Intermedio',
    monthlyScore: 2420,
    totalXp: 15600,
    monthlySessions: 16,
    totalSessions: 98,
    streakDays: 7,
    specialty: 'Dominadas Explosivas'
  },
  {
    id: '7',
    username: 'adrian_dips',
    displayName: 'Adrián P.',
    rankMonthly: 7,
    rankTotal: 8,
    title: 'Poder de Empuje',
    level: 'Nivel 19 • Intermedio',
    monthlyScore: 2190,
    totalXp: 13900,
    monthlySessions: 15,
    totalSessions: 89,
    streakDays: 6,
    specialty: 'Fondos en Paralelas'
  },
  {
    id: '8',
    username: 'lucas_planche',
    displayName: 'Lucas T.',
    rankMonthly: 8,
    rankTotal: 7,
    title: 'Control Escapular',
    level: 'Nivel 20 • Intermedio',
    monthlyScore: 1980,
    totalXp: 14200,
    monthlySessions: 14,
    totalSessions: 94,
    streakDays: 5,
    specialty: 'Tuck Planche & L-Sit'
  },
  {
    id: '9',
    username: 'mateo_iron',
    displayName: 'Mateo B.',
    rankMonthly: 9,
    rankTotal: 9,
    title: 'Atleta Constante',
    level: 'Nivel 17 • Intermedio',
    monthlyScore: 1750,
    totalXp: 11800,
    monthlySessions: 12,
    totalSessions: 76,
    streakDays: 4,
    specialty: 'Flexiones Diamante'
  },
  {
    id: '10',
    username: 'javier_beast',
    displayName: 'Javier M.',
    rankMonthly: 10,
    rankTotal: 10,
    title: 'Promesa de la Barra',
    level: 'Nivel 15 • Principiante Avanzado',
    monthlyScore: 1520,
    totalXp: 9400,
    monthlySessions: 11,
    totalSessions: 60,
    streakDays: 3,
    specialty: 'Sentadillas Búlgaras & Core'
  }
];
