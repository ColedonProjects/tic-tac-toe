import React from 'react';
import { GameProvider, useGame } from '@/components/GameProvider';
import { MainMenu } from '@/components/MainMenu';
import { GameView } from '@/components/GameView';

/**
 * App content component that uses the game context
 */
const AppContent: React.FC = () =>
{
  const {
    currentView,
    gameState,
    playerData,
    startNewGame,
    showMenu,
    makeMove,
    resetGame,
    isAITurn,
    updatePlayerName,
    getTotalStats,
  } = useGame();

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
          onBackToMenu={ showMenu }
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

/**
 * Main App component - Root of the TicTacToe application
 */
const App: React.FC = () =>
{
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App; 