# Advanced TicTacToe Game

A modern, feature-rich TicTacToe game built with React, TypeScript, and Tailwind CSS. Features AI opponents, multiple board sizes, animations, achievements, and more!

## 🎮 Features

### Core Gameplay
- **Multiple Game Modes**: Single Player vs AI, Two Player local, Tournament mode
- **Flexible Board Sizes**: 3x3, 4x4, and 5x5 grids
- **Smart AI**: Three difficulty levels (Easy, Medium, Hard) with adaptive learning
- **Move History**: Track and review all moves made during the game
- **Undo System**: Undo moves (single or multiple for AI games)

### Visual Experience
- **Smooth Animations**: Powered by Framer Motion
- **Multiple Themes**: Light, Dark, Neon, and Classic themes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Particle Effects**: Winning celebrations and visual feedback
- **Modern UI**: Clean, accessible interface with intuitive controls

### Advanced Features
- **Achievement System**: Unlock achievements for various accomplishments
- **Statistics Tracking**: Win/loss ratios, streaks, and performance metrics
- **Auto-save**: Automatic game state persistence
- **Tournament Mode**: Bracket-style competitions
- **Sound Effects**: Audio feedback for moves and events (configurable)

### AI Capabilities
- **Minimax Algorithm**: With alpha-beta pruning for optimal performance
- **Adaptive Learning**: AI learns from games and improves over time
- **Strategic Play**: Position evaluation and move optimization
- **Difficulty Scaling**: From beginner-friendly to expert-level challenge

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
```

## 🎯 How to Play

### Basic Rules
1. Players take turns placing their mark (X or O) on the board
2. First player to get required marks in a row (horizontal, vertical, or diagonal) wins
3. If the board fills up without a winner, it's a draw

### Board Sizes & Win Conditions
- **3x3 Board**: 3 in a row to win
- **4x4 Board**: 4 in a row to win  
- **5x5 Board**: 4 in a row to win (for balance)

### Game Modes

#### Single Player
- Choose AI difficulty (Easy, Medium, Hard)
- AI will adapt and learn from your playing style
- Perfect for practice and skill improvement

#### Two Player
- Local multiplayer on the same device
- Great for playing with friends and family
- Real-time turn indicators and scoring

#### Tournament
- Create bracket-style competitions
- Multiple rounds with elimination
- Track winners and statistics

## ⚙️ Configuration

### Game Settings
- **AI Difficulty**: Easy, Medium, Hard
- **Board Size**: 3x3, 4x4, 5x5
- **Themes**: Light, Dark, Neon, Classic
- **Animations**: Enable/disable visual effects
- **Sound**: Configure audio feedback

### Advanced Options
- **Time Limits**: Set move timers (optional)
- **First Move Advantage**: Toggle X always goes first
- **Move Hints**: Show suggested moves (two-player only)

## 🏆 Achievements

Unlock achievements by:
- Winning your first game
- Achieving win streaks (5, 10+ games)
- Fast victories (under 30 seconds)
- Perfect games (opponent makes no moves)
- Defeating AI on all difficulty levels
- Playing multiple board sizes

## 🎨 Themes

### Light Mode
- Clean, bright interface
- High contrast for accessibility
- Perfect for daytime gaming

### Dark Mode  
- Easy on the eyes
- Great for low-light environments
- Modern, sleek appearance

### Neon
- Cyberpunk-inspired design
- Glowing effects and animations
- High-energy gaming experience

### Classic
- Traditional, timeless design
- Focused on gameplay
- Minimal distractions

## 🛠️ Technical Details

### Built With
- **React 18** - Modern React with Hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Architecture
- **Component-based**: Modular, reusable components
- **Hook-based State**: Custom hooks for game logic
- **Context API**: Global state management
- **Engine Pattern**: Separated game logic from UI
- **Strategy Pattern**: Different AI difficulty implementations

### Performance
- **Optimized Rendering**: Minimal re-renders with React.memo
- **Efficient AI**: Alpha-beta pruning for fast moves
- **Responsive Design**: Smooth on all devices
- **Code Splitting**: Lazy loading for better performance

## 📱 Mobile Support

The game is fully optimized for mobile devices:
- **Touch Controls**: Responsive touch input
- **Responsive Layout**: Adapts to all screen sizes
- **Mobile Gestures**: Swipe and tap interactions
- **Performance**: Optimized for mobile hardware

## 🔧 Development

### Project Structure
```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── core/              # Game engine and logic
├── ai/                # AI player implementation
├── utils/             # Utility functions and constants
├── styles/            # CSS and styling
├── assets/            # Static assets
├── storage/           # Data persistence
└── audio/             # Sound management
```

### Key Components
- **GameEngine**: Core game logic and validation
- **AIPlayer**: Minimax algorithm with learning
- **GameProvider**: React Context for state management
- **GameBoard**: Interactive game grid
- **ScoreBoard**: Player statistics and scores

### Development Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run TypeScript linter
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons
- The open-source community for inspiration and tools

---

**Enjoy playing! 🎮** 