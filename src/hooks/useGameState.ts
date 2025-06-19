import { useState, useCallback, useEffect } from 'react';
import type {
  GameState,
  GameMode,
  Position,
  Player,
  GamePreferences,
  GameStatus
} from '@/types/game';
import { GameEngine } from '@/core/game-engine';
import { AIPlayer } from '@/ai/ai-player';
import { DEFAULT_PREFERENCES } from '@/utils/constants';

type ViewType = 'menu' | 'game' | 'settings';

interface PlayerData
{
  name: string;
  gamesPlayed: number;
  wins: number;
  winStreak: number;
  draws: number;
}

interface GameStateHook
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

// Cookie utilities
const setCookie = ( name: string, value: string, days: number = 365 ) =>
{
  const expires = new Date();
  expires.setTime( expires.getTime() + days * 24 * 60 * 60 * 1000 );
  document.cookie = `${ name }=${ value };expires=${ expires.toUTCString() };path=/`;
};

const getCookie = ( name: string ): string | null =>
{
  const nameEQ = name + "=";
  const ca = document.cookie.split( ';' );
  for ( let i = 0; i < ca.length; i++ )
  {
    let c = ca[ i ];
    while ( c.charAt( 0 ) === ' ' ) c = c.substring( 1, c.length );
    if ( c.indexOf( nameEQ ) === 0 ) return c.substring( nameEQ.length, c.length );
  }
  return null;
};

/**
 * Main game state management hook
 * Handles game logic, AI integration, and view state
 */
export const useGameState = (): GameStateHook =>
{
  const [ currentView, setCurrentView ] = useState<ViewType>( 'menu' );
  const [ engine ] = useState( () => new GameEngine( 3 ) );
  const [ aiPlayer, setAIPlayer ] = useState<AIPlayer | null>( null );
  const [ isAIThinking, setIsAIThinking ] = useState( false );

  // Initialize player data from cookies
  const initializePlayerData = useCallback( (): PlayerData =>
  {
    return {
      name: getCookie( 'playerName' ) || 'Player',
      gamesPlayed: parseInt( getCookie( 'gamesPlayed' ) || '0' ),
      wins: parseInt( getCookie( 'wins' ) || '0' ),
      winStreak: parseInt( getCookie( 'winStreak' ) || '0' ),
      draws: parseInt( getCookie( 'draws' ) || '0' ),
    };
  }, [] );

  const [ playerData, setPlayerData ] = useState<PlayerData>( initializePlayerData );

  // Save player data to cookies
  const savePlayerData = useCallback( ( data: PlayerData ) =>
  {
    setCookie( 'playerName', data.name );
    setCookie( 'gamesPlayed', data.gamesPlayed.toString() );
    setCookie( 'wins', data.wins.toString() );
    setCookie( 'winStreak', data.winStreak.toString() );
    setCookie( 'draws', data.draws.toString() );
  }, [] );

  // Initialize default game state
  const createInitialGameState = useCallback( (): GameState =>
  {
    return {
      board: engine.createEmptyBoard(),
      currentPlayer: 'X',
      gameMode: 'twoPlayer',
      status: 'waiting',
      winner: null,
      winCondition: null,
      moveHistory: [],
      startTime: Date.now(),
      settings: DEFAULT_PREFERENCES,
      players: {
        X: {
          id: 'player1',
          name: playerData.name,
          stats: {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            winStreak: 0,
            longestWinStreak: 0,
            totalMoves: 0,
            averageMovesPerGame: 0,
            fastestWin: 0,
          },
          achievements: [],
          preferences: DEFAULT_PREFERENCES,
        },
        O: {
          id: 'player2',
          name: 'Player 2',
          stats: {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            winStreak: 0,
            longestWinStreak: 0,
            totalMoves: 0,
            averageMovesPerGame: 0,
            fastestWin: 0,
          },
          achievements: [],
          preferences: DEFAULT_PREFERENCES,
        },
      },
      scores: { X: 0, O: 0 },
      round: 1,
    };
  }, [ engine, playerData.name ] );

  const [ gameState, setGameState ] = useState<GameState>( createInitialGameState );

  // Update player statistics
  const updatePlayerStats = useCallback( ( winner: Player | null, _gameDuration: number ) =>
  {
    setPlayerData( prev =>
    {
      const newData = { ...prev };

      // Always increment games played
      newData.gamesPlayed++;

      if ( winner === 'X' )
      {
        // Human player wins (in single player mode, human is always X)
        newData.wins++;
        newData.winStreak++;
      } else if ( winner === null )
      {
        // Draw
        newData.draws++;
        newData.winStreak = 0; // Reset win streak on draw
      } else
      {
        // AI wins (O wins)
        newData.winStreak = 0; // Reset win streak on loss
      }

      // Save to cookies
      savePlayerData( newData );
      return newData;
    } );
  }, [ savePlayerData ] );

  // Update player name
  const updatePlayerName = useCallback( ( name: string ) =>
  {
    setPlayerData( prev =>
    {
      const newData = { ...prev, name };
      savePlayerData( newData );
      return newData;
    } );

    // Update game state to reflect name change
    setGameState( prev => ( {
      ...prev,
      players: {
        ...prev.players,
        X: { ...prev.players.X, name }
      }
    } ) );
  }, [ savePlayerData ] );

  // View navigation functions
  const showMenu = useCallback( () =>
  {
    setCurrentView( 'menu' );
  }, [] );

  const startNewGame = useCallback( ( mode: GameMode, settings?: Partial<GamePreferences> ) =>
  {
    const newSettings = { ...DEFAULT_PREFERENCES, ...settings };

    // Create new AI player for single player mode
    if ( mode === 'singlePlayer' )
    {
      const ai = new AIPlayer( newSettings.boardSize, newSettings.difficulty, 'O' );
      setAIPlayer( ai );
    } else
    {
      setAIPlayer( null );
    }

    setGameState( prev => ( {
      ...createInitialGameState(),
      gameMode: mode,
      settings: newSettings,
      status: 'playing',
      players: {
        ...prev.players,
        X: { ...prev.players.X, name: playerData.name },
        O: mode === 'singlePlayer'
          ? { ...prev.players.O, name: 'AI Player' }
          : prev.players.O
      }
    } ) );

    setCurrentView( 'game' );
  }, [ createInitialGameState, playerData.name ] );

  // Game action functions
  const makeMove = useCallback( async ( position: Position ): Promise<boolean> =>
  {
    if ( gameState.status !== 'playing' || isAIThinking )
    {
      return false;
    }

    try
    {
      // Validate move
      if ( !engine.isValidMove( gameState.board, position ) )
      {
        return false;
      }

      // Make the move
      const newBoard = engine.makeMove( gameState.board, position, gameState.currentPlayer );

      // Create move record
      const move = {
        position,
        player: gameState.currentPlayer,
        timestamp: Date.now(),
        moveNumber: gameState.moveHistory.length + 1,
      };

      // Check for win condition
      const winCondition = engine.checkWin( newBoard );
      const isBoardFull = engine.isBoardFull( newBoard );

      let newStatus: GameStatus = gameState.status;
      let winner: Player | null = null;

      if ( winCondition )
      {
        newStatus = 'finished';
        winner = winCondition.player;
      } else if ( isBoardFull )
      {
        newStatus = 'finished';
        winner = null; // Draw
      }

      const nextPlayer = engine.getOpponentPlayer( gameState.currentPlayer );

      // Update game state
      setGameState( prev => ( {
        ...prev,
        board: newBoard,
        currentPlayer: nextPlayer,
        moveHistory: [ ...prev.moveHistory, move ],
        status: newStatus,
        winner,
        winCondition,
        endTime: newStatus === 'finished' ? Date.now() : undefined,
      } ) );

      // Update statistics if game is finished
      if ( newStatus === 'finished' )
      {
        const gameDuration = Date.now() - gameState.startTime;
        updatePlayerStats( winner, gameDuration );

        // Update round scores
        if ( winner )
        {
          setGameState( prev => ( {
            ...prev,
            scores: {
              ...prev.scores,
              [ winner ]: prev.scores[ winner ] + 1
            }
          } ) );
        }
      }

      return true;
    } catch ( error )
    {
      console.error( 'Move failed:', error );
      return false;
    }
  }, [ gameState, engine, isAIThinking, updatePlayerStats ] );

  // Separate AI move handler to avoid recursion
  const handleAIMove = useCallback( async () =>
  {
    if ( !aiPlayer || gameState.status !== 'playing' || gameState.currentPlayer !== 'O' || isAIThinking )
    {
      return;
    }

    setIsAIThinking( true );

    try
    {
      const aiMove = await aiPlayer.makeMove( gameState.board );

      // Make AI move directly without recursion
      if ( engine.isValidMove( gameState.board, aiMove ) )
      {
        const newBoard = engine.makeMove( gameState.board, aiMove, 'O' );

        const move = {
          position: aiMove,
          player: 'O' as Player,
          timestamp: Date.now(),
          moveNumber: gameState.moveHistory.length + 1,
        };

        // Check for win condition
        const winCondition = engine.checkWin( newBoard );
        const isBoardFull = engine.isBoardFull( newBoard );

        let newStatus: GameStatus = gameState.status;
        let winner: Player | null = null;

        if ( winCondition )
        {
          newStatus = 'finished';
          winner = winCondition.player;
        } else if ( isBoardFull )
        {
          newStatus = 'finished';
          winner = null; // Draw
        }

        // Update game state with AI move
        setGameState( prev => ( {
          ...prev,
          board: newBoard,
          currentPlayer: 'X',
          moveHistory: [ ...prev.moveHistory, move ],
          status: newStatus,
          winner,
          winCondition,
          endTime: newStatus === 'finished' ? Date.now() : undefined,
        } ) );

        // Update statistics if game is finished
        if ( newStatus === 'finished' )
        {
          const gameDuration = Date.now() - gameState.startTime;
          updatePlayerStats( winner, gameDuration );

          // Update round scores
          if ( winner )
          {
            setGameState( prev => ( {
              ...prev,
              scores: {
                ...prev.scores,
                [ winner ]: prev.scores[ winner ] + 1
              }
            } ) );
          }
        }
      }
    } catch ( error )
    {
      console.error( 'AI move failed:', error );
    } finally
    {
      setIsAIThinking( false );
    }
  }, [ aiPlayer, gameState, engine, isAIThinking, updatePlayerStats ] );

  // Effect to trigger AI moves
  useEffect( () =>
  {
    if ( gameState.gameMode === 'singlePlayer' &&
      gameState.currentPlayer === 'O' &&
      gameState.status === 'playing' &&
      !isAIThinking )
    {
      // Small delay for better UX
      const timeoutId = setTimeout( handleAIMove, 500 );
      return () => clearTimeout( timeoutId );
    }
  }, [ gameState.currentPlayer, gameState.status, gameState.gameMode, isAIThinking, handleAIMove ] );

  const resetGame = useCallback( () =>
  {
    setGameState( prev => ( {
      ...createInitialGameState(),
      gameMode: prev.gameMode,
      settings: prev.settings,
      players: prev.players,
      scores: prev.scores,
      round: prev.round + 1,
      status: 'playing',
    } ) );
    setIsAIThinking( false );
  }, [ createInitialGameState ] );

  // Query functions
  const isGameActive = useCallback( () =>
  {
    return gameState.status === 'playing' || gameState.status === 'paused';
  }, [ gameState.status ] );

  const isAITurn = useCallback( () =>
  {
    return gameState.gameMode === 'singlePlayer' &&
      gameState.currentPlayer === 'O' &&
      gameState.status === 'playing';
  }, [ gameState ] );

  const getGameDuration = useCallback( () =>
  {
    if ( !gameState.startTime ) return 0;
    const endTime = gameState.endTime || Date.now();
    return Math.floor( ( endTime - gameState.startTime ) / 1000 );
  }, [ gameState ] );

  const getTotalStats = useCallback( () =>
  {
    return playerData;
  }, [ playerData ] );

  return {
    gameState,
    currentView,
    aiPlayer,
    engine,
    playerData,

    // View navigation
    setCurrentView,
    showMenu,
    startNewGame,

    // Player management
    updatePlayerName,

    // Game actions
    makeMove,
    resetGame,

    // Game state queries
    isGameActive,
    isAITurn,
    getGameDuration,
    getTotalStats,
  };
}; 