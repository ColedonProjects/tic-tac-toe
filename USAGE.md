# Quick Usage Guide

## Install

```bash
npm install @coledon/advanced-tictactoe
```

## Basic Integration

```tsx
import React from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function MyApp() {
  return (
    <div>
      <h1>My Awesome App</h1>
      <TicTacToeGame />
    </div>
  );
}

export default MyApp;
```

## 404 Page Example

```tsx
import React from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">While you're here, want to play a game?</p>
      
      <TicTacToeGame
        showMenu={false}
        defaultDifficulty="medium"
        className="max-w-2xl"
      />
    </div>
  );
}
```

## Hidden Game in Header

```tsx
import React, { useState } from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function Header() {
  const [showGame, setShowGame] = useState(false);

  return (
    <header>
      <nav>
        <button onClick={() => setShowGame(!showGame)}>
          🎮 Secret Game
        </button>
      </nav>
      
      {showGame && (
        <div className="absolute top-16 right-4 z-50 bg-white shadow-xl rounded-lg p-4">
          <TicTacToeGame
            showMenu={false}
            defaultDifficulty="easy"
            className="w-96"
          />
          <button 
            onClick={() => setShowGame(false)}
            className="mt-2 px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
}
```

That's it! The component handles all the game logic, AI, animations, and state management automatically. 