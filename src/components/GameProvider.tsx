import React, { createContext, useContext, ReactNode } from 'react';
import { useGameState } from '@/hooks/useGameState';
import type {
  GameState,
  GameMode,
  Position,
  GamePreferences
} from '@/types/game';
import { GameEngine } from '@/core/game-engine';
import { AIPlayer } from '@/ai/ai-player';

type ViewType = 'menu' | 'game' | 'settings';

interface PlayerData
{
  name: string;
  gamesPlayed: number;
  wins: number;
  winStreak: number;
  draws: number;
}

interface GameContextType
{
  gameState: GameState;
  currentView: ViewType;
  aiPlayer: AIPlayer | null;
  engine: GameEngine;
  playerData: PlayerData;

  // View navigation
  setCurrentView: ( view: ViewType ) => void;
  showMenu: () => void;
  startNewGame: ( mode: GameMode, settings?: Partial<GamePreferences> ) => void;

  // Player management
  updatePlayerName: ( name: string ) => void;

  // Game actions
  makeMove: ( position: Position ) => Promise<boolean>;
  resetGame: () => void;

  // Game state queries
  isGameActive: () => boolean;
  isAITurn: () => boolean;
  getGameDuration: () => number;
  getTotalStats: () => PlayerData;
}

const GameContext = createContext<GameContextType | undefined>( undefined );

interface GameProviderProps
{
  children: ReactNode;
}

/**
 * Game Provider component that provides game state and actions to child components
 * Uses React Context to share game state throughout the component tree
 */
export const GameProvider: React.FC<GameProviderProps> = ( { children } ) =>
{
  const gameStateHook = useGameState();

  return (
    <GameContext.Provider value={ gameStateHook }>
      { children }
    </GameContext.Provider>
  );
};

/**
 * Custom hook to use the game context
 * Throws an error if used outside of GameProvider
 */
export const useGame = (): GameContextType =>
{
  const context = useContext( GameContext );

  if ( context === undefined )
  {
    throw new Error( 'useGame must be used within a GameProvider' );
  }

  return context;
};

// Export the context for potential direct usage
export { GameContext }; 