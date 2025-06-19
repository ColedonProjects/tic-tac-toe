import React from 'react';
import { motion } from 'framer-motion';
import type { Position, Board, WinCondition, Player } from '@/types/game';

interface GameBoardProps
{
  board: Board;
  onCellClick: ( position: Position ) => Promise<boolean>;
  winCondition: WinCondition | null;
  disabled: boolean;
  currentPlayer: Player;
  size?: 'small' | 'medium' | 'large';
}

export const GameBoard: React.FC<GameBoardProps> = ( {
  board,
  onCellClick,
  winCondition,
  disabled,
  currentPlayer,
  size = 'medium'
} ) =>
{
  const boardSize = board.length;

  const handleCellClick = async ( position: Position ) =>
  {
    if ( disabled ) return;
    await onCellClick( position );
  };

  const isCellDisabled = ( row: number, col: number ) =>
  {
    return board[ row ][ col ] !== null || disabled;
  };

  const isCellWinner = ( row: number, col: number ) =>
  {
    if ( !winCondition ) return false;
    return winCondition.positions.some(
      pos => pos.row === row && pos.col === col
    );
  };

  const getSizeClass = () =>
  {
    switch ( size )
    {
      case 'small': return 'w-12 h-12 text-lg';
      case 'large': return 'w-28 h-28 text-3xl sm:w-32 sm:h-32 sm:text-4xl';
      default: return 'w-16 h-16 text-xl';
    }
  };

  const getGapClass = () =>
  {
    switch ( size )
    {
      case 'small': return 'gap-1';
      case 'large': return 'gap-3 sm:gap-4';
      default: return 'gap-2';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={ { scale: 0.8, opacity: 0 } }
        animate={ { scale: 1, opacity: 1 } }
        transition={ { duration: 0.5 } }
        className={ `grid ${ getGapClass() } ${ boardSize === 3 ? 'grid-cols-3' : boardSize === 4 ? 'grid-cols-4' : 'grid-cols-5' }` }
      >
        { board.map( ( row, rowIndex ) =>
          row.map( ( cell, colIndex ) =>
          {
            const position: Position = { row: rowIndex, col: colIndex };
            const isCellDisabledValue = isCellDisabled( rowIndex, colIndex );
            const isWinner = isCellWinner( rowIndex, colIndex );

            return (
              <motion.button
                key={ `${ rowIndex }-${ colIndex }` }
                className={ `
                  ${ getSizeClass() }
                  bg-white border-2 border-gray-200 rounded-xl shadow-lg
                  font-bold transition-all duration-200
                  ${ isCellDisabledValue ? 'cursor-not-allowed opacity-50' : 'hover:border-blue-400 hover:shadow-xl hover:scale-105' }
                  ${ isWinner ? 'bg-green-100 border-green-400 shadow-green-200' : '' }
                  ${ cell === 'X' ? 'text-red-500' : cell === 'O' ? 'text-blue-500' : 'text-gray-400' }
                `}
                onClick={ () => handleCellClick( position ) }
                disabled={ isCellDisabledValue }
                whileHover={ !isCellDisabledValue ? { scale: 1.05 } : {} }
                whileTap={ !isCellDisabledValue ? { scale: 0.95 } : {} }
                initial={ { scale: 0 } }
                animate={ { scale: 1 } }
                transition={ {
                  duration: 0.3,
                  delay: ( rowIndex * boardSize + colIndex ) * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                } }
              >
                { cell && (
                  <motion.span
                    key={ cell }
                    initial={ { scale: 0, rotate: 180 } }
                    animate={ { scale: 1, rotate: 0 } }
                    transition={ {
                      duration: 0.4,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    } }
                  >
                    { cell }
                  </motion.span>
                ) }

                {/* Hover preview for empty cells */ }
                { !cell && !isCellDisabledValue && (
                  <motion.span
                    className={ `opacity-20 ${ currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500' }` }
                    initial={ { opacity: 0 } }
                    whileHover={ { opacity: 0.3 } }
                    transition={ { duration: 0.2 } }
                  >
                    { currentPlayer }
                  </motion.span>
                ) }
              </motion.button>
            );
          } )
        ) }
      </motion.div>

      {/* Board size indicator */ }
      <motion.div
        initial={ { opacity: 0, y: 10 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { duration: 0.5, delay: 0.3 } }
        className="mt-6 text-center"
      >
        <span className="text-sm text-gray-500 font-medium">
          { boardSize }×{ boardSize } Board
        </span>
      </motion.div>
    </div>
  );
}; 