# FlagMaster Game 🚀

A modern, high-performance flag identification game built with Next.js 16, TypeScript, and Tailwind CSS. This project demonstrates professional-grade architecture, clean code practices, and advanced features.

## ✨ Features

### Core Gameplay
- **Three Game Modes**:
  - **Classic**: No time limit, learn at your own pace
  - **Time Attack**: 60-second challenge with infinite flags
  - **Hardcore**: 3 lives with adaptive difficulty progression

### Advanced Features
- 🎯 **Adaptive Difficulty**: Automatically adjusts based on performance
- 💡 **Hint System**: Remove incorrect options (2 hints per question)
- 📊 **Statistics Tracking**: Comprehensive analytics including:
  - Accuracy metrics
  - Best streaks
  - Time per question
  - Games by mode
- 🏆 **Achievement System**: Unlockable badges with different rarities
- 🔊 **Sound Effects**: Immersive audio with toggle control
- 🌓 **Theme System**: Light/Dark mode with manual toggle
- 🌍 **Multi-language Support**: English, Korean, and Uzbek
- ♿ **Full Accessibility**: Keyboard navigation, ARIA labels, focus management
- 📱 **Responsive Design**: Optimized for all device sizes
- ⚡ **Performance Optimized**: Lazy loading, image optimization, code splitting

### Technical Excellence
- **Clean Architecture**: Well-separated concerns with service layers
- **Type Safety**: Full TypeScript coverage
- **Design System**: Comprehensive design tokens and utility classes
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Offline Support**: Graceful degradation when offline
- **Flag Verification**: Automatic verification of flag image loading

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── game/         # Game pages
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles and design tokens
│   └── i18n.ts           # i18n initialization
├── components/
│   ├── game/             # Game-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Service layer (API, Supabase)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── store/                # Zustand state management
├── data/                 # Static data (countries)
└── locales/              # Translation files
```

### Design System
- **Design Tokens**: Centralized in `src/lib/config/theme.ts`
- **CSS Variables**: Theme-aware variables in `globals.css`
- **Utility Classes**: Reusable Tailwind utilities
- **Component Library**: Consistent UI components

### State Management
- **Zustand**: Lightweight state management
- **Persistent Storage**: LocalStorage for preferences and high scores
- **Statistics Store**: Separate store for game analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FlagMasterGame
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for Supabase):
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Generate Sound Effects** (Optional but recommended):
   
   **Option A - Browser Generator (Easiest):**
   - Open `scripts/generate-sounds-browser.html` in your browser
   - Click "Generate & Play" to preview sounds
   - Click "Download" to save each sound
   - Convert WAV files to MP3 (use online converter or ffmpeg)
   - Place MP3 files in `public/sounds/` directory
   
   **Option B - Download from Free Sources:**
   - See `scripts/download-free-sounds.md` for detailed instructions
   - Recommended sources: Mixkit, Freesound, Zapsplat
   - Download and place in `public/sounds/`:
     - `correct.wav`
     - `incorrect.wav`
     - `game-over.wav`
     - `achievement.wav`
     - `hint.mwavp3`
   
   **Note:** The game works perfectly without sound files - they're optional!

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
npm test
```

## 📦 Key Dependencies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **Zustand**: State management
- **Framer Motion**: Animations
- **i18next**: Internationalization
- **Canvas Confetti**: Celebration effects
- **Lucide React**: Icon library

## 🎨 Design Principles

1. **Design Tokens First**: All colors, spacing, and animations defined as tokens
2. **Component Reusability**: DRY principle with shared components
3. **Accessibility First**: WCAG 2.1 AA compliance
4. **Performance**: Optimized images, lazy loading, code splitting
5. **Type Safety**: Full TypeScript coverage
6. **Clean Code**: Readable, maintainable, well-documented

## 🔧 Configuration

### Theme Customization
Edit `src/lib/config/theme.ts` to customize colors, spacing, and animations.

### Game Configuration
Edit `src/lib/config/constants.ts` to adjust game rules, scoring, and difficulty.

### Achievements
Edit `src/lib/config/achievements.ts` to add or modify achievements.

## 🌐 Internationalization

Supported languages:
- English (en)
- Korean (ko)
- Uzbek (uz)

Add new languages by:
1. Creating a new folder in `src/locales/`
2. Adding translation files
3. Updating `src/lib/config/i18n.ts`

## 📊 Supabase Integration

The project includes Supabase integration for:
- Leaderboard
- User statistics
- Achievement tracking

Set up your Supabase project and add credentials to `.env.local`.

## 🐛 Error Handling

- **Error Boundaries**: Catch React errors gracefully
- **Flag Image Fallbacks**: Handle missing flag images
- **Offline Support**: Graceful degradation
- **Network Errors**: User-friendly error messages

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and live regions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects user preferences

## 📈 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **LCP Optimization**: Priority loading for above-the-fold content
- **Bundle Size**: Tree-shaking and minimal dependencies

## 🤝 Contributing

1. Follow the existing code style
2. Add JSDoc comments for new functions
3. Write tests for new features
4. Update translations for UI changes
5. Ensure accessibility compliance

## 📝 License

[Your License Here]

## 🙏 Acknowledgments

- Flag images from [Flag CDN](https://flagcdn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Built with ❤️ using Next.js and modern web technologies.
