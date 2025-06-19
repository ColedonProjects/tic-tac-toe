import React from 'react';
import { GameProvider } from '../components/GameProvider';
import { MainMenu } from '../components/MainMenu';
import { GameView } from '../components/GameView';
import { useGame } from '../components/GameProvider';
import type { Difficulty } from '../types/game';

interface TicTacToeGameProps
{
  /**
   * Initial player name
   * @default "Player"
   */
  initialPlayerName?: string;

  /**
   * CSS class name for the game container
   */
  className?: string;

  /**
   * Inline styles for the game container
   */
  style?: React.CSSProperties;

  /**
   * Whether to show the full game interface with menu
   * If false, will start directly in game mode
   * @default true
   */
  showMenu?: boolean;

  /**
   * Default AI difficulty when starting in game mode
   * @default "medium"
   */
  defaultDifficulty?: Difficulty;

  /**
   * Callback when game state changes
   */
  onGameStateChange?: ( state: 'menu' | 'game' | 'settings' ) => void;
}

const TicTacToeGameContent: React.FC<Omit<TicTacToeGameProps, 'initialPlayerName'>> = ( {
  className,
  style,
  showMenu = true,
  defaultDifficulty = 'medium',
  onGameStateChange,
} ) =>
{
  const {
    currentView,
    gameState,
    playerData,
    startNewGame,
    showMenu: goToMenu,
    makeMove,
    resetGame,
    isAITurn,
    updatePlayerName,
    getTotalStats,
  } = useGame();

  // Notify parent of view changes
  React.useEffect( () =>
  {
    onGameStateChange?.( currentView );
  }, [ currentView, onGameStateChange ] );

  // Auto-start game if showMenu is false
  React.useEffect( () =>
  {
    if ( !showMenu && currentView === 'menu' )
    {
      startNewGame( 'singlePlayer', { difficulty: defaultDifficulty } );
    }
  }, [ showMenu, currentView, startNewGame, defaultDifficulty ] );

  const gameContent = () =>
  {
    if ( !showMenu )
    {
      // Always show game view when menu is disabled
      return (
        <GameView
          gameState={ gameState }
          onMakeMove={ makeMove }
          onBackToMenu={ goToMenu }
          onResetGame={ resetGame }
          isAITurn={ isAITurn() }
          playerData={ playerData }
        />
      );
    }

    // Normal flow with menu
    switch ( currentView )
    {
      case 'menu':
        return (
          <MainMenu
            onStartGame={ startNewGame }
            playerName={ playerData.name }
            onPlayerNameChange={ updatePlayerName }
            totalStats={ getTotalStats() }
          />
        );
      case 'game':
        return (
          <GameView
            gameState={ gameState }
            onMakeMove={ makeMove }
            onBackToMenu={ goToMenu }
            onResetGame={ resetGame }
            isAITurn={ isAITurn() }
            playerData={ playerData }
          />
        );
      default:
        return (
          <MainMenu
            onStartGame={ startNewGame }
            playerName={ playerData.name }
            onPlayerNameChange={ updatePlayerName }
            totalStats={ getTotalStats() }
          />
        );
    }
  };

  return (
    <div className={ className } style={ style }>
      { gameContent() }
    </div>
  );
};

/**
 * Advanced TicTacToe Game Component
 * 
 * A complete, ready-to-use TicTacToe game with AI opponents, animations,
 * and persistent player statistics. Perfect for entertainment features,
 * 404 pages, or hidden games in your application.
 * 
 * @example
 * ```tsx
 * import { TicTacToeGame } from '@coledon/advanced-tictactoe';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       <TicTacToeGame 
 *         initialPlayerName="John"
 *         className="my-game-container"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
const TicTacToeGame: React.FC<TicTacToeGameProps> = ( {
  initialPlayerName: _initialPlayerName = 'Player',
  ...props
} ) =>
{
  return (
    <GameProvider>
      <TicTacToeGameContent { ...props } />
    </GameProvider>
  );
};

export default TicTacToeGame; 