import type {
  GamePreferences,
  AudioSettings,
  AnimationSettings,
  Achievement,
  Theme
} from '@/types/game';

// Board configurations
export const BOARD_SIZES = {
  SMALL: 3,
  MEDIUM: 4,
  LARGE: 5,
} as const;

export const DEFAULT_BOARD_SIZE = BOARD_SIZES.SMALL;

// Game timing
export const GAME_TIMINGS = {
  AI_THINKING_MIN: 500,    // Minimum AI thinking time (ms)
  AI_THINKING_MAX: 2000,   // Maximum AI thinking time (ms)
  ANIMATION_DURATION: 300, // Default animation duration (ms)
  MOVE_TIMEOUT: 30000,     // Move timeout (ms)
  GAME_TIMEOUT: 1800000,   // Game timeout (30 minutes)
  AUTOSAVE_INTERVAL: 5000, // Autosave interval (ms)
} as const;

// AI difficulty settings
export const AI_SETTINGS = {
  EASY: {
    depth: 1,
    randomness: 0.3,
    thinking_time: { min: 800, max: 1500 },
    mistake_probability: 0.4,
  },
  MEDIUM: {
    depth: 3,
    randomness: 0.15,
    thinking_time: { min: 1000, max: 2000 },
    mistake_probability: 0.15,
  },
  HARD: {
    depth: 6,
    randomness: 0.05,
    thinking_time: { min: 1200, max: 2500 },
    mistake_probability: 0.02,
  },
} as const;

// Scoring system
export const SCORING = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
  STREAK_MULTIPLIER: 0.1,
  TIME_BONUS_THRESHOLD: 10, // seconds
  TIME_BONUS_POINTS: 1,
} as const;

// Achievement IDs and configurations
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    progress: 0,
    target: 1,
  },
  {
    id: 'win_streak_5',
    name: 'On Fire',
    description: 'Win 5 games in a row',
    icon: '🔥',
    progress: 0,
    target: 5,
  },
  {
    id: 'win_streak_10',
    name: 'Unstoppable',
    description: 'Win 10 games in a row',
    icon: '⚡',
    progress: 0,
    target: 10,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Win a game in under 30 seconds',
    icon: '💨',
    progress: 0,
    target: 1,
  },
  {
    id: 'perfect_game',
    name: 'Perfect Game',
    description: 'Win without the opponent making a move',
    icon: '💎',
    progress: 0,
    target: 1,
  },
  {
    id: 'comeback_king',
    name: 'Comeback King',
    description: 'Win after being behind',
    icon: '👑',
    progress: 0,
    target: 1,
  },
  {
    id: 'ai_slayer',
    name: 'AI Slayer',
    description: 'Defeat Hard AI 10 times',
    icon: '🤖',
    progress: 0,
    target: 10,
  },
  {
    id: 'marathon_player',
    name: 'Marathon Player',
    description: 'Play 100 games',
    icon: '🏃',
    progress: 0,
    target: 100,
  },
  {
    id: 'master_strategist',
    name: 'Master Strategist',
    description: 'Win 50 games with 80% win rate',
    icon: '🧠',
    progress: 0,
    target: 50,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try all board sizes',
    icon: '🗺️',
    progress: 0,
    target: 3,
  },
];

// Default game preferences
export const DEFAULT_PREFERENCES: GamePreferences = {
  theme: 'dark',
  soundEnabled: true,
  musicEnabled: false,
  animationsEnabled: true,
  difficulty: 'medium',
  boardSize: 3,
  timeLimit: undefined,
  firstMoveAdvantage: false,
  showMoveHints: false,
};

// Default audio settings
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 0.7,
  sfxVolume: 0.8,
  musicVolume: 0.5,
  enabled: true,
};

// Default animation settings
export const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
  enabled: true,
  speed: 'normal',
  particleEffects: true,
  transitions: true,
};

// Themes
export const THEMES: Theme[] = [
  {
    id: 'light',
    name: 'Light Mode',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#ffffff',
      text: '#111827',
      board: '#f9fafb',
      cell: '#ffffff',
      playerX: '#ef4444',
      playerO: '#3b82f6',
      winner: '#10b981',
    },
    fonts: {
      primary: 'Orbitron, monospace',
      secondary: 'system-ui, sans-serif',
    },
    shadows: {
      board: '0 8px 32px rgba(0, 0, 0, 0.1)',
      cell: '0 2px 8px rgba(0, 0, 0, 0.05)',
      button: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      background: '#111827',
      text: '#f9fafb',
      board: '#1f2937',
      cell: '#374151',
      playerX: '#f87171',
      playerO: '#60a5fa',
      winner: '#34d399',
    },
    fonts: {
      primary: 'Orbitron, monospace',
      secondary: 'system-ui, sans-serif',
    },
    shadows: {
      board: '0 8px 32px rgba(0, 0, 0, 0.3)',
      cell: '0 2px 8px rgba(0, 0, 0, 0.2)',
      button: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: {
      primary: '#06ffa5',
      secondary: '#4fd1c7',
      background: '#0f0f23',
      text: '#ffffff',
      board: '#1a1a2e',
      cell: '#16213e',
      playerX: '#ff006e',
      playerO: '#06ffa5',
      winner: '#ffbe0b',
    },
    fonts: {
      primary: 'Orbitron, monospace',
      secondary: 'system-ui, sans-serif',
    },
    shadows: {
      board: '0 0 20px rgba(6, 255, 165, 0.3)',
      cell: '0 0 10px rgba(6, 255, 165, 0.2)',
      button: '0 0 15px rgba(6, 255, 165, 0.4)',
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    colors: {
      primary: '#8b5cf6',
      secondary: '#64748b',
      background: '#fafaf9',
      text: '#0c0a09',
      board: '#f5f5f4',
      cell: '#ffffff',
      playerX: '#dc2626',
      playerO: '#2563eb',
      winner: '#059669',
    },
    fonts: {
      primary: 'Georgia, serif',
      secondary: 'system-ui, sans-serif',
    },
    shadows: {
      board: '0 4px 16px rgba(0, 0, 0, 0.1)',
      cell: '0 1px 4px rgba(0, 0, 0, 0.1)',
      button: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
];

// Sound effect configurations
export const SOUND_EFFECTS = {
  MOVE: { id: 'move', name: 'Move', url: '/sounds/move.mp3', volume: 0.6, loop: false },
  WIN: { id: 'win', name: 'Win', url: '/sounds/win.mp3', volume: 0.8, loop: false },
  LOSE: { id: 'lose', name: 'Lose', url: '/sounds/lose.mp3', volume: 0.7, loop: false },
  DRAW: { id: 'draw', name: 'Draw', url: '/sounds/draw.mp3', volume: 0.6, loop: false },
  CLICK: { id: 'click', name: 'Click', url: '/sounds/click.mp3', volume: 0.4, loop: false },
  HOVER: { id: 'hover', name: 'Hover', url: '/sounds/hover.mp3', volume: 0.3, loop: false },
  ERROR: { id: 'error', name: 'Error', url: '/sounds/error.mp3', volume: 0.5, loop: false },
  ACHIEVEMENT: { id: 'achievement', name: 'Achievement', url: '/sounds/achievement.mp3', volume: 0.9, loop: false },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  PLAYER_PROFILE: 'tictactoe_player_profile',
  GAME_HISTORY: 'tictactoe_game_history',
  ACHIEVEMENTS: 'tictactoe_achievements',
  SETTINGS: 'tictactoe_settings',
  AUDIO_SETTINGS: 'tictactoe_audio_settings',
  ANIMATION_SETTINGS: 'tictactoe_animation_settings',
  THEME: 'tictactoe_theme',
  TOURNAMENTS: 'tictactoe_tournaments',
  CURRENT_GAME: 'tictactoe_current_game',
} as const;

// API endpoints (for future online multiplayer)
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3001',
  WEBSOCKET_URL: 'ws://localhost:3001',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/profile',
    LEADERBOARD: '/leaderboard',
    MATCHMAKING: '/matchmaking',
    GAME_HISTORY: '/games/history',
    ACHIEVEMENTS: '/achievements',
  },
} as const;

// Game rules and validation
export const GAME_RULES = {
  MIN_BOARD_SIZE: 3,
  MAX_BOARD_SIZE: 5,
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 2,
  WIN_CONDITION_LENGTH: {
    3: 3, // 3x3 board needs 3 in a row
    4: 4, // 4x4 board needs 4 in a row
    5: 4, // 5x5 board needs 4 in a row (more balanced)
  },
  MAX_MOVES: {
    3: 9,  // 3x3 = 9 cells
    4: 16, // 4x4 = 16 cells
    5: 25, // 5x5 = 25 cells
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_MOVE: 'Invalid move. Cell is already occupied.',
  GAME_OVER: 'Game is already over.',
  INVALID_POSITION: 'Invalid board position.',
  NETWORK_ERROR: 'Network connection error.',
  SAVE_FAILED: 'Failed to save game data.',
  LOAD_FAILED: 'Failed to load game data.',
  AUDIO_LOAD_FAILED: 'Failed to load audio files.',
  INVALID_SETTINGS: 'Invalid game settings.',
} as const;

// Feature flags
export const FEATURES = {
  ONLINE_MULTIPLAYER: false,
  TOURNAMENTS: true,
  ACHIEVEMENTS: true,
  ANALYTICS: false,
  SOCIAL_SHARING: true,
  CLOUD_SAVE: false,
  CUSTOM_THEMES: true,
  AI_LEARNING: true,
} as const; 