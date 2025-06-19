import type {
  Board,
  Player,
  Position,
  Difficulty,
  BoardSize
} from '@/types/game';
import { GameEngine } from '@/core/game-engine';

interface AIPlayerState
{
  isThinking: boolean;
  lastMove: Position | null;
  moveCount: number;
  thinkingTime: number;
}

/**
 * Simple and reliable AI Player implementation
 * Uses straightforward logic that prioritizes winning and blocking
 */
export class AIPlayer
{
  private engine: GameEngine;
  private difficulty: Difficulty;
  private player: Player;
  private state: AIPlayerState;

  constructor (
    boardSize: BoardSize = 3,
    difficulty: Difficulty = 'medium',
    player: Player = 'O'
  )
  {
    this.engine = new GameEngine( boardSize );
    this.difficulty = difficulty;
    this.player = player;
    this.state = {
      isThinking: false,
      lastMove: null,
      moveCount: 0,
      thinkingTime: 0,
    };
  }

  /**
   * Makes a move based on current difficulty level
   */
  async makeMove ( board: Board ): Promise<Position>
  {
    this.state.isThinking = true;
    const startTime = Date.now();

    try
    {
      // Add a small delay for better UX
      const thinkingDelay = this.getThinkingDelay();
      await this.delay( thinkingDelay );

      let bestMove: Position;

      switch ( this.difficulty )
      {
        case 'easy':
          bestMove = this.makeEasyMove( board );
          break;
        case 'medium':
          bestMove = this.makeMediumMove( board );
          break;
        case 'hard':
          bestMove = this.makeHardMove( board );
          break;
        default:
          bestMove = this.makeMediumMove( board );
      }

      this.state.thinkingTime = Date.now() - startTime;
      this.state.lastMove = bestMove;
      this.state.moveCount++;

      return bestMove;
    } finally
    {
      this.state.isThinking = false;
    }
  }

  /**
   * Easy AI: Mostly random with basic win/block logic
   */
  private makeEasyMove ( board: Board ): Position
  {
    const availableMoves = this.getAvailableMoves( board );

    // 50% chance to make a smart move, 50% random
    if ( Math.random() > 0.5 )
    {
      const smartMove = this.findWinningMove( board ) || this.findBlockingMove( board );
      if ( smartMove )
      {
        return smartMove;
      }
    }

    // Random move
    return availableMoves[ Math.floor( Math.random() * availableMoves.length ) ];
  }

  /**
   * Medium AI: Always tries to win or block, then plays strategically
   */
  private makeMediumMove ( board: Board ): Position
  {
    // 1. Try to win
    const winningMove = this.findWinningMove( board );
    if ( winningMove )
    {
      return winningMove;
    }

    // 2. Block opponent from winning
    const blockingMove = this.findBlockingMove( board );
    if ( blockingMove )
    {
      return blockingMove;
    }

    // 3. Play strategically
    return this.findStrategicMove( board );
  }

  /**
   * Hard AI: Uses minimax algorithm for optimal play
   */
  private makeHardMove ( board: Board ): Position
  {
    // 1. Try to win
    const winningMove = this.findWinningMove( board );
    if ( winningMove )
    {
      return winningMove;
    }

    // 2. Block opponent from winning
    const blockingMove = this.findBlockingMove( board );
    if ( blockingMove )
    {
      return blockingMove;
    }

    // 3. Use minimax for optimal move
    return this.findOptimalMove( board );
  }

  /**
   * Find a move that wins the game immediately
   */
  private findWinningMove ( board: Board ): Position | null
  {
    const availableMoves = this.getAvailableMoves( board );

    for ( const move of availableMoves )
    {
      const testBoard = this.engine.makeMove( board, move, this.player );
      if ( this.engine.checkWin( testBoard ) )
      {
        return move;
      }
    }

    return null;
  }

  /**
   * Find a move that blocks the opponent from winning
   */
  private findBlockingMove ( board: Board ): Position | null
  {
    const availableMoves = this.getAvailableMoves( board );
    const opponent = this.getOpponent();

    for ( const move of availableMoves )
    {
      const testBoard = this.engine.makeMove( board, move, opponent );
      if ( this.engine.checkWin( testBoard ) )
      {
        return move;
      }
    }

    return null;
  }

  /**
   * Find a strategic move (center, corners, edges in that order)
   */
  private findStrategicMove ( board: Board ): Position
  {
    const availableMoves = this.getAvailableMoves( board );
    const boardSize = board.length;
    const center = Math.floor( boardSize / 2 );

    // 1. Try center
    const centerMove = { row: center, col: center };
    if ( this.isMoveAvailable( board, centerMove ) )
    {
      return centerMove;
    }

    // 2. Try corners
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: boardSize - 1 },
      { row: boardSize - 1, col: 0 },
      { row: boardSize - 1, col: boardSize - 1 }
    ];

    for ( const corner of corners )
    {
      if ( this.isMoveAvailable( board, corner ) )
      {
        return corner;
      }
    }

    // 3. Return any available move
    return availableMoves[ 0 ];
  }

  /**
   * Find optimal move using simple minimax
   */
  private findOptimalMove ( board: Board ): Position
  {
    const availableMoves = this.getAvailableMoves( board );
    let bestMove = availableMoves[ 0 ];
    let bestScore = -Infinity;

    for ( const move of availableMoves )
    {
      const testBoard = this.engine.makeMove( board, move, this.player );
      const score = this.minimax( testBoard, 5, false ); // Depth 5 for hard difficulty

      if ( score > bestScore )
      {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  /**
   * Simple minimax algorithm
   */
  private minimax ( board: Board, depth: number, isMaximizing: boolean ): number
  {
    // Check terminal states
    const winCondition = this.engine.checkWin( board );
    if ( winCondition )
    {
      return winCondition.player === this.player ? 10 - depth : depth - 10;
    }

    if ( this.engine.isBoardFull( board ) || depth === 0 )
    {
      return 0; // Draw or depth limit
    }

    const availableMoves = this.getAvailableMoves( board );

    if ( isMaximizing )
    {
      let maxScore = -Infinity;
      for ( const move of availableMoves )
      {
        const testBoard = this.engine.makeMove( board, move, this.player );
        const score = this.minimax( testBoard, depth - 1, false );
        maxScore = Math.max( maxScore, score );
      }
      return maxScore;
    } else
    {
      let minScore = Infinity;
      for ( const move of availableMoves )
      {
        const testBoard = this.engine.makeMove( board, move, this.getOpponent() );
        const score = this.minimax( testBoard, depth - 1, true );
        minScore = Math.min( minScore, score );
      }
      return minScore;
    }
  }

  /**
   * Get all available moves on the board
   */
  private getAvailableMoves ( board: Board ): Position[]
  {
    const moves: Position[] = [];
    for ( let row = 0; row < board.length; row++ )
    {
      for ( let col = 0; col < board[ row ].length; col++ )
      {
        if ( board[ row ][ col ] === null )
        {
          moves.push( { row, col } );
        }
      }
    }
    return moves;
  }

  /**
   * Check if a move is available
   */
  private isMoveAvailable ( board: Board, position: Position ): boolean
  {
    return board[ position.row ][ position.col ] === null;
  }

  /**
   * Get the opponent player
   */
  private getOpponent (): Player
  {
    return this.player === 'X' ? 'O' : 'X';
  }

  /**
   * Get thinking delay based on difficulty
   */
  private getThinkingDelay (): number
  {
    switch ( this.difficulty )
    {
      case 'easy':
        return 300 + Math.random() * 500; // 300-800ms
      case 'medium':
        return 500 + Math.random() * 700; // 500-1200ms
      case 'hard':
        return 800 + Math.random() * 1000; // 800-1800ms
      default:
        return 500;
    }
  }

  /**
   * Simple delay utility
   */
  private delay ( ms: number ): Promise<void>
  {
    return new Promise( resolve => setTimeout( resolve, ms ) );
  }

  /**
   * Get current AI state
   */
  getState (): AIPlayerState
  {
    return { ...this.state };
  }

  /**
   * Set AI difficulty
   */
  setDifficulty ( difficulty: Difficulty ): void
  {
    this.difficulty = difficulty;
  }

  /**
   * Reset AI state
   */
  reset (): void
  {
    this.state = {
      isThinking: false,
      lastMove: null,
      moveCount: 0,
      thinkingTime: 0,
    };
  }
} 