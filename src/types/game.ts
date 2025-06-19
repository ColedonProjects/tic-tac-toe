// Core game types
export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardSize = 3 | 4 | 5;

// Position on the board
export interface Position
{
  row: number;
  col: number;
}

// Board state
export type Board = Cell[][];

// Game modes
export type GameMode = 'singlePlayer' | 'twoPlayer' | 'tournament' | 'online';

// AI difficulty levels
export type Difficulty = 'easy' | 'medium' | 'hard';

// Game status
export type GameStatus = 'waiting' | 'playing' | 'paused' | 'finished';

// Game result
export type GameResult = 'win' | 'lose' | 'draw';

// Win condition
export interface WinCondition
{
  player: Player;
  positions: Position[];
  type: 'row' | 'column' | 'diagonal';
}

// Move history
export interface Move
{
  position: Position;
  player: Player;
  timestamp: number;
  moveNumber: number;
}

// Game statistics
export interface GameStats
{
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  longestWinStreak: number;
  totalMoves: number;
  averageMovesPerGame: number;
  fastestWin: number; // in seconds
}

// Player profile
export interface PlayerProfile
{
  id: string;
  name: string;
  avatar?: string;
  stats: GameStats;
  achievements: Achievement[];
  preferences: GamePreferences;
}

// Achievement system
export interface Achievement
{
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
}

// Game settings and preferences
export interface GamePreferences
{
  theme: 'light' | 'dark' | 'neon' | 'classic';
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  difficulty: Difficulty;
  boardSize: BoardSize;
  timeLimit?: number; // in seconds, undefined for no limit
  firstMoveAdvantage: boolean;
  showMoveHints: boolean;
}

// Game state
export interface GameState
{
  board: Board;
  currentPlayer: Player;
  gameMode: GameMode;
  status: GameStatus;
  winner: Player | null;
  winCondition: WinCondition | null;
  moveHistory: Move[];
  startTime: number;
  endTime?: number;
  settings: GamePreferences;
  players: {
    X: PlayerProfile;
    O: PlayerProfile;
  };
  scores: {
    X: number;
    O: number;
  };
  round: number;
  maxRounds?: number;
}

// AI Player state
export interface AIPlayerState
{
  isThinking: boolean;
  lastMove: Position | null;
  moveCount: number;
  thinkingTime: number;
}

// Audio system types
export interface SoundEffect
{
  id: string;
  name: string;
  url: string;
  volume: number;
  loop: boolean;
}

export interface AudioSettings
{
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  enabled: boolean;
}

// Animation settings
export interface AnimationSettings
{
  enabled: boolean;
  speed: 'slow' | 'normal' | 'fast';
  particleEffects: boolean;
  transitions: boolean;
}

// Theme configuration
export interface Theme
{
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    board: string;
    cell: string;
    playerX: string;
    playerO: string;
    winner: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  shadows: {
    board: string;
    cell: string;
    button: string;
  };
}

// Tournament system
export interface Tournament
{
  id: string;
  name: string;
  participants: PlayerProfile[];
  matches: TournamentMatch[];
  bracket: TournamentBracket;
  status: 'registration' | 'active' | 'completed';
  winner?: PlayerProfile;
  startTime: number;
  endTime?: number;
}

export interface TournamentMatch
{
  id: string;
  playerX: PlayerProfile;
  playerO: PlayerProfile;
  games: GameState[];
  winner?: PlayerProfile;
  round: number;
  position: number;
}

export interface TournamentBracket
{
  rounds: TournamentMatch[][];
  currentRound: number;
  totalRounds: number;
}

// Storage types
export interface StorageData
{
  playerProfile: PlayerProfile;
  gameHistory: GameState[];
  achievements: Achievement[];
  settings: GamePreferences;
  audioSettings: AudioSettings;
  animationSettings: AnimationSettings;
  theme: Theme;
  tournaments: Tournament[];
}

// Event system types
export type GameEvent =
  | { type: 'MAKE_MOVE'; payload: { position: Position; player: Player; }; }
  | { type: 'RESET_GAME'; payload: Record<string, never>; }
  | { type: 'CHANGE_SETTINGS'; payload: Partial<GamePreferences>; }
  | { type: 'PAUSE_GAME'; payload: Record<string, never>; }
  | { type: 'RESUME_GAME'; payload: Record<string, never>; }
  | { type: 'START_NEW_ROUND'; payload: Record<string, never>; }
  | { type: 'GAME_OVER'; payload: { winner: Player | null; winCondition: WinCondition | null; }; }
  | { type: 'AI_MOVE'; payload: { position: Position; }; }
  | { type: 'UNDO_MOVE'; payload: Record<string, never>; }
  | { type: 'HINT_REQUESTED'; payload: Record<string, never>; };

// Component props types
export interface GameBoardProps
{
  board: Board;
  onCellClick: ( position: Position ) => void;
  winCondition: WinCondition | null;
  disabled?: boolean;
  showCoordinates?: boolean;
  animateLastMove?: boolean;
  lastMove?: Position;
}

export interface GameControlsProps
{
  gameState: GameState;
  onReset: () => void;
  onPause: () => void;
  onResume: () => void;
  onUndo: () => void;
  onHint: () => void;
  onSettings: () => void;
}

export interface ScoreboardProps
{
  scores: { X: number; O: number; };
  players: { X: PlayerProfile; O: PlayerProfile; };
  currentPlayer: Player;
  round: number;
  maxRounds?: number;
}

// Utility types
export type DeepPartial<T> = {
  [ P in keyof T ]?: T[ P ] extends object ? DeepPartial<T[ P ]> : T[ P ];
};

export type GameEventHandler<T extends GameEvent = GameEvent> = ( event: T ) => void; 