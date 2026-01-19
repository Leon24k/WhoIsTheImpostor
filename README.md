# 🎭 Who Is The Imposter?

An offline social deduction party game where your phone acts as a game master. Perfect for 3+ players gathering in person to find the imposter among them!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Leon24K/WhoIsTheImposter)

## 🎮 About The Game

**Who Is The Imposter** is a digital companion app for an offline party game inspired by social deduction games like Mafia and Werewolf. Players sit together, pass a single device, secretly view their roles, then discuss and vote to find the imposter.

- **For Innocent Players**: You receive a secret word (e.g., "Cat"). Give clues without saying the word directly to prove you know it.
- **For The Imposter**: You only see the category (e.g., "Animals"). Listen to others' clues, blend in, and avoid detection!

## ✨ Features

### 🎯 Core Gameplay
- **3+ Player Support** - Minimum 3 players, no maximum limit
- **Multiple Imposters** - Choose 1-3 imposters (with fair play restrictions)
- **Secret Role Reveal** - Each player privately sees their role by passing the device
- **Discussion Rounds** - Customizable number of rounds (1-3) for giving clues
- **Voting System** - Democratic voting to identify the imposter
- **Results Screen** - Dramatic reveal of the imposter(s) and game outcome

### ⚙️ Customizable Settings
- **⏱️ Timer Per Turn** - Optional countdown timer (30-180 seconds or off)
- **🔢 Number of Rounds** - Set how many times players give clues (1-3)
- **🎭 Imposter Count** - Choose 1-3 imposters with smart player minimums:
  - 1 Imposter: Minimum 3 players
  - 2 Imposters: Minimum 5 players
  - 3 Imposters: Minimum 7 players
- **🔍 Imposter Clue Setting** - Toggle whether imposters see the word category
- **📚 Word Categories** - Select specific categories or random (10 categories available)
- **🔊 Sound Effects** - Toggle game sounds on/off

### 🌍 Bilingual Support
- **English & Indonesian** - Full UI translation with language switcher
- **Dynamic SEO** - Meta tags adapt to selected language

### 📖 Built-in Tutorial
- Interactive tutorial popup explaining game rules
- Step-by-step instructions for new players
- Tips for both innocent players and imposters

### 🎨 Modern UI/UX
- **Dark Mode** - Eye-friendly design for all lighting conditions
- **Responsive Design** - Works on phones, tablets, and desktops
- **Smooth Animations** - Framer Motion powered transitions
- **Accessible Components** - Built with Radix UI primitives

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Build & Runtime
- **Bun** - Fast JavaScript runtime and package manager
- **CRACO** - Create React App Configuration Override
- **React Scripts** - CRA build tooling

### SEO & Performance
- **React Helmet Async** - Dynamic meta tag management
- **Sitemap & Robots.txt** - Search engine optimization
- **JSON-LD Structured Data** - Rich results in Google
- **Open Graph & Twitter Cards** - Social media preview optimization

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ or **Bun** 1.0+ installed
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Leon24k/WhoIsTheImposter.git
   cd WhoIsTheImposter
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   
   Using Bun (Recommended):
   ```bash
   bun install
   ```
   
   Or using npm:
   ```bash
   npm install
   ```

### Development

**Start the development server:**

Using Bun:
```bash
bun start
```

Or using npm:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

**Create optimized production build:**

Using Bun:
```bash
bun run build
```

Or using npm:
```bash
npm run build
```

Build output will be in `frontend/build/` directory.

## 🌐 Deployment to Vercel

This project is optimized for **Vercel** deployment with **Bun** runtime.

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will automatically detect `vercel.json` configuration

3. **Deploy**
   - Click "Deploy"
   - Vercel will use Bun for faster builds automatically

### Vercel Configuration

The project includes `vercel.json` with:
- **Bun runtime** for fast installs and builds
- **SPA routing** configuration
- **SEO-friendly headers** for sitemap and robots.txt
- **Security headers** (XSS protection, frame options, nosniff)
- **Static asset caching** (1 year for immutable assets)

### Post-Deployment SEO Setup

After deployment, update these files with your actual Vercel URL:

1. **frontend/public/index.html** - Replace `https://whoistheimpostorgame.vercel.app/`
2. **frontend/public/sitemap.xml** - Update all URLs
3. **frontend/public/robots.txt** - Update sitemap URL

Then submit to Google:
- Go to [Google Search Console](https://search.google.com/search-console)
- Add your Vercel URL
- Submit sitemap: `https://yoururl.vercel.app/sitemap.xml`

## 📁 Project Structure

```
WhoIsTheImposter-main/
├── frontend/
│   ├── public/
│   │   ├── index.html          # SEO-optimized HTML with meta tags
│   │   ├── sitemap.xml          # Search engine sitemap
│   │   ├── robots.txt           # Crawler instructions
│   │   └── favicon.ico          # App icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── SetupScreen.jsx      # Player setup & settings
│   │   │   ├── RoleScreen.jsx       # Role reveal screen
│   │   │   ├── GameScreen.jsx       # Discussion rounds
│   │   │   ├── VotingScreen.jsx     # Voting interface
│   │   │   ├── ResultScreen.jsx     # Game results
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── data/
│   │   │   ├── translations.js      # Bilingual translations
│   │   │   └── words.js             # Word database & categories
│   │   ├── hooks/
│   │   │   └── use-toast.js         # Toast notification hook
│   │   ├── lib/
│   │   │   └── utils.js             # Utility functions
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Global styles
│   │   └── index.js                 # React entry point
│   ├── plugins/                 # Visual editing plugins
│   ├── package.json             # Dependencies & scripts
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── craco.config.js          # CRACO configuration
│   └── .env.production          # Production environment
├── backend/                     # (Not used - game is frontend-only)
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## 🎲 How to Play

### Setup
1. Open the app on a single device
2. Enter player names (minimum 3 players)
3. Configure game settings (optional)
4. Click "Start Game"

### Role Reveal Phase
1. Pass the device to the first player
2. Player clicks "Show My Role"
3. **Innocent players** see the secret word
4. **Imposters** see only the category (or nothing, if disabled in settings)
5. Player passes device to next player
6. Repeat until all players have seen their roles

### Discussion Phase
- Players sit in a circle
- Each player gives a clue about their word (without saying it directly)
- **Innocent players**: Give specific clues to prove you know the word
- **Imposters**: Listen carefully and give generic clues to blend in
- Timer countdown (if enabled)
- Multiple rounds (based on settings)

### Voting Phase
- Everyone discusses who they think the imposter is
- Enter the suspected imposter's name
- Submit vote

### Results
- The imposter(s) are revealed!
- **Innocents Win**: If they correctly identified an imposter
- **Imposter Wins**: If they avoided detection

## 🎨 Customization

### Adding New Word Categories

Edit `frontend/src/data/words.js`:

```javascript
export const wordCategories = {
  id: [ // Indonesian
    {
      name: "Your Category",
      words: ["Word1", "Word2", "Word3", ...]
    },
    // ... more categories
  ],
  en: [ // English
    {
      name: "Your Category",
      words: ["Word1", "Word2", "Word3", ...]
    },
    // ... more categories
  ]
};
```

### Adding Translations

Edit `frontend/src/data/translations.js`:

```javascript
export const translations = {
  id: {
    setup: {
      yourKey: "Indonesian translation"
    }
  },
  en: {
    setup: {
      yourKey: "English translation"
    }
  }
};
```

### Styling

The project uses:
- **Tailwind CSS** - Utility classes in components
- **CSS Variables** - Theme colors in `App.css`
- **Dark Mode** - Pre-configured with dark theme

Modify colors in `frontend/src/App.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%;
  --secondary: 220 14.3% 95.9%;
  /* ... more variables */
}
```

## 🔍 SEO Features

The app includes comprehensive SEO optimization:

### Meta Tags
- Primary meta tags (title, description, keywords)
- Open Graph tags (Facebook sharing)
- Twitter Card tags (Twitter sharing)
- Multi-language support (hreflang)
- Canonical URLs

### Structured Data
- JSON-LD schema for MobileApplication
- Game features and descriptions
- Multi-language support metadata

### Search Engine Files
- `sitemap.xml` - Page structure for crawlers
- `robots.txt` - Crawler permissions
- Dynamic meta tags via React Helmet Async

### Performance
- Optimized bundle size
- Static asset caching (1 year)
- Source map disabled in production
- Lazy loading ready

## 🐛 Troubleshooting

### "React Hook useEffect has missing dependency"
Already fixed with `useCallback` in GameScreen.jsx

### Settings dialog not scrollable
Fixed with flexbox layout and proper overflow handling

### Build fails
1. Clear cache: `rm -rf node_modules package-lock.json`
2. Reinstall: `bun install` or `npm install`
3. Rebuild: `bun run build` or `npm run build`

### Deployment issues on Vercel
1. Ensure `vercel.json` is in root directory
2. Check build logs in Vercel dashboard
3. Verify `frontend/build` directory is generated

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by social deduction games like Mafia, Werewolf, and Among Us
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations from [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for party game lovers**

Enjoy finding the imposter! 🎭
