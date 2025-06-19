import React from 'react';
import { Crown, User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GameState } from '@/types/game';

interface ScoreBoardProps
{
  gameState: GameState;
  playerData: {
    name: string;
    gamesPlayed: number;
    wins: number;
    winStreak: number;
    draws: number;
  };
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ( { gameState, playerData } ) =>
{
  const { players, scores, currentPlayer, gameMode, round } = gameState;

  const getPlayerIcon = ( player: 'X' | 'O' ) =>
  {
    if ( gameMode === 'singlePlayer' && player === 'O' )
    {
      return <Bot size={ 20 } className="text-blue-500" />;
    }
    return <User size={ 20 } className={ player === 'X' ? 'text-red-500' : 'text-blue-500' } />;
  };

  const getPlayerName = ( player: 'X' | 'O' ) =>
  {
    if ( gameMode === 'singlePlayer' )
    {
      return player === 'X' ? playerData.name : 'AI Player';
    }
    return players[ player ].name;
  };

  const isCurrentPlayer = ( player: 'X' | 'O' ) =>
  {
    return currentPlayer === player && gameState.status === 'playing';
  };

  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.5 } }
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Score Board</h3>
        <div className="text-sm text-gray-500">
          Round { round }
        </div>
      </div>

      <div className="space-y-4">
        {/* Player X */ }
        <motion.div
          className={ `flex items-center justify-between p-3 rounded-lg border-2 ${ isCurrentPlayer( 'X' ) ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }` }
          initial={ { x: -20, opacity: 0 } }
          animate={ { x: 0, opacity: 1 } }
          transition={ { duration: 0.5, delay: 0.1 } }
        >
          <div className="flex items-center gap-3">
            { getPlayerIcon( 'X' ) }
            <div>
              <div className="font-semibold text-red-600">
                { getPlayerName( 'X' ) }
              </div>
              <div className="text-xs text-gray-500">
                Player X
              </div>
            </div>
            { isCurrentPlayer( 'X' ) && (
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full ml-2"
                initial={ { scale: 0 } }
                animate={ { scale: 1 } }
                transition={ { duration: 0.3 } }
              />
            ) }
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              key={ scores.X }
              className="text-2xl font-bold text-red-600"
              initial={ { scale: 1.2 } }
              animate={ { scale: 1 } }
              transition={ { duration: 0.3 } }
            >
              { scores.X }
            </motion.div>
            { scores.X > scores.O && (
              <Crown size={ 16 } className="text-yellow-500" />
            ) }
          </div>
        </motion.div>

        {/* VS Divider */ }
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gray-200" />
          <span className="px-4 text-sm font-semibold text-gray-500">
            vs
          </span>
          <div className="w-full h-px bg-gray-200" />
        </div>

        {/* Player O */ }
        <motion.div
          className={ `flex items-center justify-between p-3 rounded-lg border-2 ${ isCurrentPlayer( 'O' ) ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }` }
          initial={ { x: 20, opacity: 0 } }
          animate={ { x: 0, opacity: 1 } }
          transition={ { duration: 0.5, delay: 0.2 } }
        >
          <div className="flex items-center gap-3">
            { getPlayerIcon( 'O' ) }
            <div>
              <div className="font-semibold text-blue-600">
                { getPlayerName( 'O' ) }
              </div>
              <div className="text-xs text-gray-500">
                Player O { gameMode === 'singlePlayer' && '(AI)' }
              </div>
            </div>
            { isCurrentPlayer( 'O' ) && (
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full ml-2"
                initial={ { scale: 0 } }
                animate={ { scale: 1 } }
                transition={ { duration: 0.3 } }
              />
            ) }
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              key={ scores.O }
              className="text-2xl font-bold text-blue-600"
              initial={ { scale: 1.2 } }
              animate={ { scale: 1 } }
              transition={ { duration: 0.3 } }
            >
              { scores.O }
            </motion.div>
            { scores.O > scores.X && (
              <Crown size={ 16 } className="text-yellow-500" />
            ) }
          </div>
        </motion.div>
      </div>

      {/* Overall Stats */ }
      <motion.div
        initial={ { opacity: 0, y: 10 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { duration: 0.5, delay: 0.3 } }
        className="mt-6 pt-4 border-t border-gray-200"
      >
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="text-xl font-bold text-gray-700">
              { playerData.gamesPlayed }
            </div>
            <div className="text-gray-500">
              Games Played
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-700">
              { playerData.draws }
            </div>
            <div className="text-gray-500">
              Draws
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-sm text-gray-600">Current player&apos;s turn</div>
        </div>
      </motion.div>

      {/* Game Status */ }
      { gameState.status === 'finished' && (
        <motion.div
          initial={ { opacity: 0, scale: 0.9 } }
          animate={ { opacity: 1, scale: 1 } }
          transition={ { duration: 0.5, delay: 0.4 } }
          className="mt-4 p-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg text-center"
        >
          <div className="font-semibold">
            { gameState.winner ? (
              <>🎉 { getPlayerName( gameState.winner ) } Wins!</>
            ) : (
              <>🤝 It&apos;s a Draw!</>
            ) }
          </div>
        </motion.div>
      ) }
    </motion.div>
  );
}; 