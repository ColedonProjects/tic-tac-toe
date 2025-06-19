# 🎮 Advanced TicTacToe

A modern, feature-rich TicTacToe React component with AI opponents, smooth animations, and persistent statistics. Perfect for adding entertainment features, 404 pages, or hidden games to your applications.

## ✨ Features

- 🤖 **Smart AI Opponents** - Three difficulty levels with intelligent gameplay
- 🎨 **Beautiful Animations** - Smooth transitions powered by Framer Motion
- 📊 **Persistent Statistics** - Cookie-based player stats and progress tracking
- 📱 **Mobile Responsive** - Touch-friendly interface that works on all devices
- 🎯 **Flexible Integration** - Easy to embed in any React application
- 🔧 **TypeScript Support** - Full type safety and excellent developer experience
- 🎨 **Tailwind CSS Styling** - Modern, customizable design system

## 📦 Installation

```bash
npm install @coledon/advanced-tictactoe
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom
```

## 🚀 Quick Start

### Basic Usage

```tsx
import React from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1>Welcome to My App</h1>
      <TicTacToeGame />
    </div>
  );
}

export default App;
```

### Advanced Configuration

```tsx
import React from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function GamePage() {
  const handleGameStateChange = (state: 'menu' | 'game' | 'settings') => {
    console.log('Game state changed to:', state);
  };

  return (
    <TicTacToeGame
      initialPlayerName="John Doe"
      defaultDifficulty="hard"
      showMenu={true}
      className="game-container"
      onGameStateChange={handleGameStateChange}
      style={{ minHeight: '100vh' }}
    />
  );
}
```

### Embedded Game (No Menu)

Perfect for 404 pages or inline entertainment:

```tsx
import React from 'react';
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404 - Page Not Found</h1>
      <p>While you're here, want to play a quick game?</p>
      
      <TicTacToeGame
        showMenu={false}
        defaultDifficulty="medium"
        className="max-w-2xl mx-auto mt-8"
      />
    </div>
  );
}
```

## 🔧 Component API

### TicTacToeGame Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialPlayerName` | `string` | `"Player"` | Initial player name |
| `className` | `string` | `undefined` | CSS class for the game container |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the container |
| `showMenu` | `boolean` | `true` | Whether to show the main menu |
| `defaultDifficulty` | `"easy" \| "medium" \| "hard"` | `"medium"` | Default AI difficulty |
| `onGameStateChange` | `(state) => void` | `undefined` | Callback when game state changes |

## 🎯 Advanced Usage

### Using Individual Components

If you need more control, you can use individual components:

```tsx
import React from 'react';
import { 
  GameProvider, 
  GameBoard, 
  ScoreBoard, 
  useGame 
} from '@coledon/advanced-tictactoe';

function CustomGameLayout() {
  return (
    <GameProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ScoreBoard />
        <GameBoard />
        <div>
          {/* Your custom sidebar content */}
        </div>
      </div>
    </GameProvider>
  );
}
```

### Custom Hook Usage

```tsx
import React from 'react';
import { GameProvider, useGame } from '@coledon/advanced-tictactoe';

function CustomGameControls() {
  const { 
    gameState, 
    makeMove, 
    resetGame, 
    playerData,
    startNewGame 
  } = useGame();

  return (
    <div>
      <p>Current Player: {gameState.currentPlayer}</p>
      <p>Games Played: {playerData.gamesPlayed}</p>
      <button onClick={() => startNewGame('singlePlayer')}>
        New Game vs AI
      </button>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <CustomGameControls />
    </GameProvider>
  );
}
```

## 🎨 Styling & Customization

The component uses Tailwind CSS classes. You have several options for styling:

### Option 1: Include Tailwind CSS

If your project uses Tailwind CSS, the component will inherit your theme:

```tsx
// The component will use your existing Tailwind configuration
<TicTacToeGame className="bg-gray-100 rounded-lg shadow-xl" />
```

### Option 2: Override with Custom CSS

```css
/* Custom styling */
.game-container {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --danger-color: #ef4444;
}

.game-container .bg-blue-500 {
  background-color: var(--primary-color) !important;
}
```

### Option 3: CSS-in-JS

```tsx
const gameStyles = {
  minHeight: '600px',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
};

<TicTacToeGame style={gameStyles} />
```

## 🔌 Available Exports

```tsx
// Main component
import { TicTacToeGame } from '@coledon/advanced-tictactoe';

// Individual components
import { 
  GameBoard,
  ScoreBoard,
  MainMenu,
  GameView 
} from '@coledon/advanced-tictactoe';

// Context and hooks
import { 
  GameProvider,
  useGame,
  useGameState 
} from '@coledon/advanced-tictactoe';

// Core engine and AI
import { 
  GameEngine,
  AIPlayer 
} from '@coledon/advanced-tictactoe';

// TypeScript types
import type {
  GameState,
  GameMode,
  Player,
  Position,
  Board,
  WinCondition,
  GamePreferences,
  Difficulty
} from '@coledon/advanced-tictactoe';
```

## 📱 Mobile Support

The component is fully responsive and touch-friendly:

- ✅ Touch controls for mobile devices
- ✅ Responsive grid layouts
- ✅ Optimized button sizes for touch
- ✅ Swipe gestures support
- ✅ Portrait and landscape orientations

## 🧠 AI Difficulty Levels

| Level | Behavior |
|-------|----------|
| **Easy** | 50% random moves, 50% strategic moves |
| **Medium** | Always tries to win/block, then strategic placement |
| **Hard** | Minimax algorithm with lookahead - nearly unbeatable |

## 💾 Data Persistence

Player statistics are automatically saved using browser cookies:

- Player name and preferences
- Games played, wins, draws
- Current win streak
- Data persists across browser sessions
- Automatic cleanup and optimization

## 🔧 Development

### Building from Source

```bash
git clone https://github.com/ColedonProjects/tic-tac-toe.git
cd tic-tac-toe
npm install
npm run build:lib
```

### Running the Demo

```bash
npm run dev
```

## 📄 License

MIT © [Coledon](https://github.com/Coledon-projects)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- 🐛 [Report bugs](https://github.com/ColedonProjects/tic-tac-toe/issues)
- 💡 [Request features](https://github.com/ColedonProjects/tic-tac-toe/issues)
- 📖 [Documentation](https://github.com/ColedonProjects/tic-tac-toe#readme)
- 🌐 [Live Demo](https://tic-tac-toe-pied-alpha.vercel.app)

---

Made with ❤️ by [ColedonProjects](https://github.com/ColedonProjects) 