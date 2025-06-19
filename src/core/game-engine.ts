import type {
  Board,
  Player,
  Position,
  WinCondition,
  BoardSize,
} from '@/types/game';
import { GAME_RULES } from '@/utils/constants';

/**
 * Core game engine for TicTacToe
 * Handles all game logic, validation, and state management
 */
export class GameEngine
{
  private boardSize: BoardSize;
  private winLength: number;

  constructor ( boardSize: BoardSize = 3 )
  {
    this.boardSize = boardSize;
    this.winLength = GAME_RULES.WIN_CONDITION_LENGTH[ boardSize ];
  }

  /**
   * Creates an empty board
   */
  createEmptyBoard (): Board
  {
    return Array( this.boardSize ).fill( null ).map( () =>
      Array( this.boardSize ).fill( null )
    );
  }

  /**
   * Validates if a position is within board bounds
   */
  isValidPosition ( position: Position ): boolean
  {
    const { row, col } = position;
    return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
  }

  /**
   * Validates if a move is legal
   */
  isValidMove ( board: Board, position: Position ): boolean
  {
    if ( !this.isValidPosition( position ) )
    {
      return false;
    }

    const { row, col } = position;
    return board[ row ][ col ] === null;
  }

  /**
   * Makes a move on the board
   */
  makeMove ( board: Board, position: Position, player: Player ): Board
  {
    if ( !this.isValidMove( board, position ) )
    {
      throw new Error( 'Invalid move' );
    }

    const newBoard = board.map( row => [ ...row ] );
    newBoard[ position.row ][ position.col ] = player;
    return newBoard;
  }

  /**
   * Checks if the board is full
   */
  isBoardFull ( board: Board ): boolean
  {
    return board.every( row => row.every( cell => cell !== null ) );
  }

  /**
   * Gets all empty positions on the board
   */
  getEmptyPositions ( board: Board ): Position[]
  {
    const emptyPositions: Position[] = [];

    for ( let row = 0; row < this.boardSize; row++ )
    {
      for ( let col = 0; col < this.boardSize; col++ )
      {
        if ( board[ row ][ col ] === null )
        {
          emptyPositions.push( { row, col } );
        }
      }
    }

    return emptyPositions;
  }

  /**
   * Checks for a win condition and returns the winning line
   */
  checkWin ( board: Board ): WinCondition | null
  {
    // Check rows
    for ( let row = 0; row < this.boardSize; row++ )
    {
      const winCondition = this.checkLine( board, { row, col: 0 }, { row: 0, col: 1 }, 'row' );
      if ( winCondition ) return winCondition;
    }

    // Check columns
    for ( let col = 0; col < this.boardSize; col++ )
    {
      const winCondition = this.checkLine( board, { row: 0, col }, { row: 1, col: 0 }, 'column' );
      if ( winCondition ) return winCondition;
    }

    // Check main diagonal (top-left to bottom-right)
    for ( let offset = 0; offset <= this.boardSize - this.winLength; offset++ )
    {
      // Starting from top row
      const winCondition1 = this.checkLine(
        board,
        { row: 0, col: offset },
        { row: 1, col: 1 },
        'diagonal'
      );
      if ( winCondition1 ) return winCondition1;

      // Starting from left column (skip 0,0 as it's already checked)
      if ( offset > 0 )
      {
        const winCondition2 = this.checkLine(
          board,
          { row: offset, col: 0 },
          { row: 1, col: 1 },
          'diagonal'
        );
        if ( winCondition2 ) return winCondition2;
      }
    }

    // Check anti-diagonal (top-right to bottom-left)
    for ( let offset = 0; offset <= this.boardSize - this.winLength; offset++ )
    {
      // Starting from top row
      const winCondition1 = this.checkLine(
        board,
        { row: 0, col: this.boardSize - 1 - offset },
        { row: 1, col: -1 },
        'diagonal'
      );
      if ( winCondition1 ) return winCondition1;

      // Starting from right column (skip top-right as it's already checked)
      if ( offset > 0 )
      {
        const winCondition2 = this.checkLine(
          board,
          { row: offset, col: this.boardSize - 1 },
          { row: 1, col: -1 },
          'diagonal'
        );
        if ( winCondition2 ) return winCondition2;
      }
    }

    return null;
  }

  /**
   * Checks a line for consecutive pieces
   */
  private checkLine (
    board: Board,
    start: Position,
    direction: Position,
    type: 'row' | 'column' | 'diagonal'
  ): WinCondition | null
  {
    let consecutiveCount = 0;
    let currentPlayer: Player | null = null;
    const positions: Position[] = [];

    let row = start.row;
    let col = start.col;

    while ( this.isValidPosition( { row, col } ) )
    {
      const cell = board[ row ][ col ];

      if ( cell === null )
      {
        // Reset count if we hit an empty cell
        consecutiveCount = 0;
        currentPlayer = null;
        positions.length = 0;
      } else if ( cell === currentPlayer )
      {
        // Continue the streak
        consecutiveCount++;
        positions.push( { row, col } );
      } else
      {
        // New player, start new streak
        currentPlayer = cell;
        consecutiveCount = 1;
        positions.length = 0;
        positions.push( { row, col } );
      }

      // Check if we have a winning streak
      if ( consecutiveCount >= this.winLength && currentPlayer )
      {
        return {
          player: currentPlayer,
          positions: positions.slice( -this.winLength ), // Get the last winLength positions
          type,
        };
      }

      row += direction.row;
      col += direction.col;
    }

    return null;
  }

  /**
   * Evaluates board position for AI (minimax algorithm)
   */
  evaluateBoard ( board: Board, maximizingPlayer: Player ): number
  {
    const winCondition = this.checkWin( board );

    if ( winCondition )
    {
      if ( winCondition.player === maximizingPlayer )
      {
        return 10;
      } else
      {
        return -10;
      }
    }

    if ( this.isBoardFull( board ) )
    {
      return 0; // Draw
    }

    // No terminal state, continue evaluation
    return this.evaluatePosition( board, maximizingPlayer );
  }

  /**
   * Advanced position evaluation for AI
   */
  private evaluatePosition ( board: Board, maximizingPlayer: Player ): number
  {
    let score = 0;
    const opponent = maximizingPlayer === 'X' ? 'O' : 'X';

    // Evaluate all possible lines
    score += this.evaluateAllLines( board, maximizingPlayer, 1 );
    score -= this.evaluateAllLines( board, opponent, 1 );

    // Center control bonus (for larger boards)
    if ( this.boardSize >= 3 )
    {
      const center = Math.floor( this.boardSize / 2 );
      if ( board[ center ][ center ] === maximizingPlayer )
      {
        score += 0.3;
      } else if ( board[ center ][ center ] === opponent )
      {
        score -= 0.3;
      }
    }

    return score;
  }

  /**
   * Evaluates all possible lines for potential wins
   */
  private evaluateAllLines ( board: Board, player: Player, weight: number ): number
  {
    let totalScore = 0;

    // Check all rows
    for ( let row = 0; row < this.boardSize; row++ )
    {
      totalScore += this.evaluateLine( board, { row, col: 0 }, { row: 0, col: 1 }, player ) * weight;
    }

    // Check all columns
    for ( let col = 0; col < this.boardSize; col++ )
    {
      totalScore += this.evaluateLine( board, { row: 0, col }, { row: 1, col: 0 }, player ) * weight;
    }

    // Check diagonals
    for ( let offset = 0; offset <= this.boardSize - this.winLength; offset++ )
    {
      // Main diagonal
      totalScore += this.evaluateLine( board, { row: 0, col: offset }, { row: 1, col: 1 }, player ) * weight;
      if ( offset > 0 )
      {
        totalScore += this.evaluateLine( board, { row: offset, col: 0 }, { row: 1, col: 1 }, player ) * weight;
      }

      // Anti-diagonal
      totalScore += this.evaluateLine( board, { row: 0, col: this.boardSize - 1 - offset }, { row: 1, col: -1 }, player ) * weight;
      if ( offset > 0 )
      {
        totalScore += this.evaluateLine( board, { row: offset, col: this.boardSize - 1 }, { row: 1, col: -1 }, player ) * weight;
      }
    }

    return totalScore;
  }

  /**
   * Evaluates a single line for a player
   */
  private evaluateLine ( board: Board, start: Position, direction: Position, player: Player ): number
  {
    let score = 0;
    let playerCount = 0;
    let emptyCount = 0;
    let opponentCount = 0;
    const opponent = player === 'X' ? 'O' : 'X';

    let row = start.row;
    let col = start.col;
    let cellsChecked = 0;

    // Check winLength consecutive cells
    while ( this.isValidPosition( { row, col } ) && cellsChecked < this.winLength )
    {
      const cell = board[ row ][ col ];

      if ( cell === player )
      {
        playerCount++;
      } else if ( cell === opponent )
      {
        opponentCount++;
      } else
      {
        emptyCount++;
      }

      row += direction.row;
      col += direction.col;
      cellsChecked++;
    }

    // If opponent has pieces in this line, it's blocked
    if ( opponentCount > 0 )
    {
      return 0;
    }

    // Score based on player pieces count
    if ( playerCount === this.winLength - 1 && emptyCount === 1 )
    {
      score = 5; // One move away from winning
    } else if ( playerCount === this.winLength - 2 && emptyCount === 2 )
    {
      score = 2; // Two moves away from winning
    } else if ( playerCount > 0 )
    {
      score = 1; // General position advantage
    }

    return score;
  }

  /**
   * Creates a copy of the board
   */
  cloneBoard ( board: Board ): Board
  {
    return board.map( row => [ ...row ] );
  }

  /**
   * Converts position to string for caching
   */
  positionToString ( position: Position ): string
  {
    return `${ position.row },${ position.col }`;
  }

  /**
   * Converts string back to position
   */
  stringToPosition ( str: string ): Position
  {
    const [ row, col ] = str.split( ',' ).map( Number );
    return { row, col };
  }

  /**
   * Converts board to string for hashing/caching
   */
  boardToString ( board: Board ): string
  {
    return board.map( row => row.map( cell => cell || '_' ).join( '' ) ).join( '' );
  }

  /**
   * Gets the opposite player
   */
  getOpponentPlayer ( player: Player ): Player
  {
    return player === 'X' ? 'O' : 'X';
  }

  /**
   * Calculates move score for move ordering in AI
   */
  getMoveScore ( board: Board, position: Position, _player: Player ): number
  {
    const { row, col } = position;
    let score = 0;

    // Center bonus
    const center = Math.floor( this.boardSize / 2 );
    const distanceFromCenter = Math.abs( row - center ) + Math.abs( col - center );
    score += ( this.boardSize - distanceFromCenter ) * 0.1;

    // Corner bonus for 3x3
    if ( this.boardSize === 3 )
    {
      if ( ( row === 0 || row === 2 ) && ( col === 0 || col === 2 ) )
      {
        score += 0.2;
      }
    }

    return score;
  }

  /**
   * Get all possible moves sorted by potential value
   */
  getSortedMoves ( board: Board, player: Player ): Position[]
  {
    const moves = this.getEmptyPositions( board );

    // Sort moves by their potential score (for better AI performance)
    return moves.sort( ( a, b ) =>
    {
      const scoreA = this.getMoveScore( board, a, player );
      const scoreB = this.getMoveScore( board, b, player );
      return scoreB - scoreA;
    } );
  }
} 