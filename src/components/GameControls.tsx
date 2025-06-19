import React from 'react';
import { RotateCcw, Pause, Play, Lightbulb } from 'lucide-react';
import { useGame } from './GameProvider';
import { motion } from 'framer-motion';

/**
 * Game controls component providing action buttons for the game
 */
export const GameControls: React.FC = () =>
{
  const {
    gameState,
    undoMove,
    resetGame,
    pauseGame,
    resumeGame,
    canUndo,
    isGameActive,
    isAITurn
  } = useGame();

  const isGamePaused = gameState.status === 'paused';
  const isGameFinished = gameState.status === 'finished';
  const canUndoMove = canUndo() && !isAITurn();

  const handleUndo = () =>
  {
    if ( canUndoMove )
    {
      undoMove();
    }
  };

  const handleReset = () =>
  {
    resetGame();
  };

  const handlePauseResume = () =>
  {
    if ( isGamePaused )
    {
      resumeGame();
    } else
    {
      pauseGame();
    }
  };

  const handleHint = () =>
  {
    // TODO: Implement hint system
    console.log( 'Hint requested' );
  };

  const controls = [
    {
      id: 'undo',
      label: 'Undo',
      icon: RotateCcw,
      action: handleUndo,
      disabled: !canUndoMove,
      className: 'btn-secondary',
      tooltip: canUndoMove ? 'Undo last move' : 'No moves to undo',
    },
    {
      id: 'hint',
      label: 'Hint',
      icon: Lightbulb,
      action: handleHint,
      disabled: isGameFinished || isGamePaused || isAITurn() || gameState.gameMode === 'singlePlayer',
      className: 'btn-warning',
      tooltip: 'Get a move suggestion',
    },
    {
      id: 'pause',
      label: isGamePaused ? 'Resume' : 'Pause',
      icon: isGamePaused ? Play : Pause,
      action: handlePauseResume,
      disabled: !isGameActive(),
      className: 'btn-primary',
      tooltip: isGamePaused ? 'Resume game' : 'Pause game',
    },
    {
      id: 'reset',
      label: 'Reset',
      icon: RotateCcw,
      action: handleReset,
      disabled: false,
      className: 'btn-error',
      tooltip: 'Start a new round',
    },
  ];

  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.5 } }
      className="game-controls"
    >
      { controls.map( ( control, index ) =>
      {
        const IconComponent = control.icon;

        return (
          <motion.button
            key={ control.id }
            initial={ { opacity: 0, scale: 0.8 } }
            animate={ { opacity: 1, scale: 1 } }
            transition={ { duration: 0.3, delay: index * 0.1 } }
            whileHover={ !control.disabled ? { scale: 1.05 } : {} }
            whileTap={ !control.disabled ? { scale: 0.95 } : {} }
            onClick={ control.action }
            disabled={ control.disabled }
            className={ `control-button ${ control.className }` }
            title={ control.tooltip }
          >
            <IconComponent size={ 18 } />
            <span className="hidden sm:inline">{ control.label }</span>
          </motion.button>
        );
      } ) }
    </motion.div>
  );
}; 