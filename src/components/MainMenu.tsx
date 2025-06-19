import React, { useState, useEffect } from 'react';
import { GameMode, Difficulty } from '@/types/game';

interface MainMenuProps
{
  onStartGame: ( mode: GameMode, settings?: { difficulty?: Difficulty; } ) => void;
  playerName: string;
  onPlayerNameChange: ( name: string ) => void;
  totalStats: {
    gamesPlayed: number;
    wins: number;
    winStreak: number;
    draws: number;
  };
}

/**
 * Main menu component showing game mode selection and options
 */
export const MainMenu: React.FC<MainMenuProps> = ( {
  onStartGame,
  playerName,
  onPlayerNameChange,
  totalStats
} ) =>
{
  const [ selectedDifficulty, setSelectedDifficulty ] = useState<Difficulty>( 'medium' );
  const [ nameInput, setNameInput ] = useState( playerName );
  const [ hasNameChanged, setHasNameChanged ] = useState( false );

  // Update nameInput when playerName prop changes
  useEffect( () =>
  {
    setNameInput( playerName );
    setHasNameChanged( false );
  }, [ playerName ] );

  const handleNameChange = ( value: string ) =>
  {
    setNameInput( value );
    setHasNameChanged( value.trim() !== playerName );
  };

  const handleNameSubmit = () =>
  {
    if ( nameInput.trim() && nameInput.trim() !== playerName )
    {
      onPlayerNameChange( nameInput.trim() );
      setHasNameChanged( false );
    }
  };

  const handleNameKeyPress = ( e: React.KeyboardEvent ) =>
  {
    if ( e.key === 'Enter' )
    {
      handleNameSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Advanced Tic-Tac-Toe
          </h1>
          <p className="text-gray-600">Challenge the AI or play with friends</p>
        </div>

        {/* Player Name Section */ }
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Player Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={ nameInput }
              onChange={ ( e ) => handleNameChange( e.target.value ) }
              onKeyPress={ handleNameKeyPress }
              onBlur={ handleNameSubmit }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              maxLength={ 20 }
            />
            { hasNameChanged && (
              <button
                onClick={ handleNameSubmit }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            ) }
          </div>
        </div>

        {/* Statistics */ }
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Your Stats</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{ totalStats.gamesPlayed }</p>
              <p className="text-gray-600">Games Played</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{ totalStats.wins }</p>
              <p className="text-gray-600">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{ totalStats.draws }</p>
              <p className="text-gray-600">Draws</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{ totalStats.winStreak }</p>
              <p className="text-gray-600">Win Streak</p>
            </div>
          </div>
        </div>

        {/* AI Difficulty Selection */ }
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            AI Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            { ( [ 'easy', 'medium', 'hard' ] as Difficulty[] ).map( ( difficulty ) => (
              <button
                key={ difficulty }
                onClick={ () => setSelectedDifficulty( difficulty ) }
                className={ `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${ selectedDifficulty === difficulty
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }` }
              >
                { difficulty.charAt( 0 ).toUpperCase() + difficulty.slice( 1 ) }
              </button>
            ) ) }
          </div>
        </div>

        {/* Game Mode Buttons */ }
        <div className="space-y-3">
          <button
            onClick={ () => onStartGame( 'singlePlayer', { difficulty: selectedDifficulty } ) }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>🤖</span>
            Play vs AI ({ selectedDifficulty })
          </button>

          <button
            onClick={ () => onStartGame( 'twoPlayer' ) }
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>👥</span>
            Play with Friend
          </button>
        </div>

        {/* Footer */ }
        <div className="mt-8 text-center text-xs text-gray-500">
          Your progress is automatically saved
        </div>
      </div>
    </div>
  );
}; 