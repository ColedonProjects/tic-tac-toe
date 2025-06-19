import React from 'react';
import { GameBoard } from './GameBoard';
import { ScoreBoard } from './ScoreBoard';
import type { GameState, Position } from '@/types/game';

interface GameViewProps
{
  gameState: GameState;
  onMakeMove: ( position: Position ) => Promise<boolean>;
  onBackToMenu: () => void;
  onResetGame: () => void;
  isAITurn: boolean;
  playerData: {
    name: string;
    gamesPlayed: number;
    wins: number;
    winStreak: number;
    draws: number;
  };
}

export const GameView: React.FC<GameViewProps> = ( {
  gameState,
  onMakeMove,
  onBackToMenu,
  onResetGame,
  isAITurn,
  playerData,
} ) =>
{
  const formatGameMode = ( mode: string ) =>
  {
    return mode === 'singlePlayer' ? 'vs AI' : 'vs Friend';
  };

  const getCurrentPlayerName = () =>
  {
    if ( gameState.gameMode === 'singlePlayer' )
    {
      return gameState.currentPlayer === 'X' ? playerData.name : 'AI';
    }
    return gameState.currentPlayer === 'X' ? 'Player X' : 'Player O';
  };

  const getGameStatus = () =>
  {
    if ( gameState.status === 'finished' )
    {
      if ( gameState.winner )
      {
        const winnerName = gameState.gameMode === 'singlePlayer'
          ? ( gameState.winner === 'X' ? playerData.name : 'AI' )
          : `Player ${ gameState.winner }`;
        return `🎉 ${ winnerName } Wins!`;
      } else
      {
        return `🤝 It's a Draw!`;
      }
    }

    if ( isAITurn )
    {
      return '🤔 AI is thinking...';
    }

    return `${ getCurrentPlayerName() }'s Turn`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */ }
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={ onBackToMenu }
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Menu
          </button>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              { formatGameMode( gameState.gameMode ) }
            </h1>
            <p className="text-gray-600">Round { gameState.round }</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={ onResetGame }
              className="px-4 py-2 border-2 border-gray-400 text-gray-600 rounded-lg hover:border-gray-500 hover:text-gray-700 transition-colors bg-transparent"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Game Content */ }
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_250px] lg:grid-cols-[280px_1fr_220px] gap-6">
          {/* Left Sidebar - Score Board */ }
          <div className="xl:order-1 order-2">
            <ScoreBoard
              gameState={ gameState }
              playerData={ playerData }
            />
          </div>

          {/* Center - Game Board (Much Larger) */ }
          <div className="xl:order-2 order-1 flex flex-col items-center justify-center">
            {/* Game Status */ }
            <div className="mb-8 text-center">
              <div className="inline-block px-8 py-4 bg-white rounded-full shadow-lg">
                <p className="text-xl font-semibold text-gray-800">
                  { getGameStatus() }
                </p>
              </div>
            </div>

            {/* Game Board - Much Larger */ }
            <div className="relative">
              <GameBoard
                board={ gameState.board }
                onCellClick={ onMakeMove }
                winCondition={ gameState.winCondition }
                disabled={ gameState.status !== 'playing' || isAITurn }
                currentPlayer={ gameState.currentPlayer }
                size="large"
              />

              {/* Overlay for AI turn or game over */ }
              { ( isAITurn || gameState.status === 'finished' ) && (
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg flex items-center justify-center">
                  { isAITurn && (
                    <div className="animate-pulse">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full animate-ping"></div>
                      </div>
                    </div>
                  ) }
                </div>
              ) }
            </div>

            {/* Game Info - Mobile Only */ }
            <div className="xl:hidden mt-8 w-full max-w-md">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-center">Game Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Board Size</p>
                    <p className="text-lg font-bold">{ gameState.settings.boardSize }×{ gameState.settings.boardSize }</p>
                  </div>
                  { gameState.gameMode === 'singlePlayer' && (
                    <div className="text-center">
                      <p className="font-medium text-gray-600">AI Difficulty</p>
                      <p className="text-lg font-bold capitalize">{ gameState.settings.difficulty }</p>
                    </div>
                  ) }
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Moves Made</p>
                    <p className="text-lg font-bold">{ gameState.moveHistory.length }</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Game Time</p>
                    <p className="text-lg font-bold">
                      { Math.floor( ( Date.now() - gameState.startTime ) / 1000 ) }s
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Game Info (Much Smaller) */ }
          <div className="xl:order-3 order-3 hidden xl:block">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Game Info</h3>
              <div className="space-y-3 text-sm">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Board Size</p>
                  <p className="font-bold text-lg">{ gameState.settings.boardSize }×{ gameState.settings.boardSize }</p>
                </div>
                { gameState.gameMode === 'singlePlayer' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">AI Difficulty</p>
                    <p className="font-bold text-lg capitalize">{ gameState.settings.difficulty }</p>
                  </div>
                ) }
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Moves Made</p>
                  <p className="font-bold text-lg">{ gameState.moveHistory.length }</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Game Time</p>
                  <p className="font-bold text-lg">
                    { Math.floor( ( Date.now() - gameState.startTime ) / 1000 ) }s
                  </p>
                </div>
              </div>

              {/* Game Over Actions */ }
              { gameState.status === 'finished' && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={ onResetGame }
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    Play Again
                  </button>
                </div>
              ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 