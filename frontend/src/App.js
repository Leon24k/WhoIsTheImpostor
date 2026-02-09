import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '@/App.css';
import { SetupScreen } from '@/components/SetupScreen';
import { RoleScreen } from '@/components/RoleScreen';
import { GameScreen } from '@/components/GameScreen';
import { VotingScreen } from '@/components/VotingScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { getRandomWord, getRandomImposterIndex } from '@/data/words';
import { getTranslation } from '@/data/translations';

function App() {
  const [gameState, setGameState] = useState('setup'); // setup, role, game, voting, result
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [wordData, setWordData] = useState(null);
  const [imposterIndex, setImposterIndex] = useState(null);
  const [suspectedImposter, setSuspectedImposter] = useState(null);
  const [language, setLanguage] = useState('id'); // 'id' or 'en'
  
  // Game Settings
  const [settings, setSettings] = useState({
    timer: 0, // 0 means no timer, otherwise seconds per turn
    rounds: 2, // number of rounds
    sound: false, // sound effects on/off
    category: 'all', // 'all' or specific category name
    imposterCount: 1, // 1-3 imposters
    showCategoryToImposter: true // whether imposters see the category
  });
  
  const t = getTranslation(language);

  const handleStartGame = (playerNames) => {
    const word = getRandomWord(language, settings.category);
    const imposters = getRandomImposterIndex(playerNames.length, settings.imposterCount);
    
    setPlayers(playerNames);
    setWordData(word);
    setImposterIndex(imposters);
    setCurrentPlayerIndex(0);
    setGameState('role');
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  const handleRoleComplete = () => {
    setGameState('game');
  };

  const handleStartVoting = () => {
    setGameState('voting');
  };

  const handleVoteComplete = (suspectedPlayer) => {
    setSuspectedImposter(suspectedPlayer);
    setGameState('result');
  };

  const handlePlayAgain = () => {
    const word = getRandomWord(language, settings.category);
    const imposter = getRandomImposterIndex(players.length, settings.imposterCount);
    
    setWordData(word);
    setImposterIndex(imposter);
    setCurrentPlayerIndex(0);
    setSuspectedImposter(null);
    setGameState('role');
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setWordData(null);
    setImposterIndex(null);
    setSuspectedImposter(null);
  };

  const getPageTitle = () => {
    const titles = {
      id: {
        setup: 'Siapa Imposter? - Game Party Offline',
        role: 'Lihat Role Anda - Siapa Imposter?',
        game: 'Diskusi & Petunjuk - Siapa Imposter?',
        voting: 'Voting - Siapa Imposter?',
        result: 'Hasil Permainan - Siapa Imposter?'
      },
      en: {
        setup: 'Who Is The Imposter? - Offline Party Game',
        role: 'See Your Role - Who Is The Imposter?',
        game: 'Discussion & Clues - Who Is The Imposter?',
        voting: 'Voting Time - Who Is The Imposter?',
        result: 'Game Results - Who Is The Imposter?'
      }
    };
    return titles[language][gameState];
  };

  const getPageDescription = () => {
    const descriptions = {
      id: 'Game party deduksi sosial offline untuk 3+ pemain. Ponsel Anda berperan sebagai game master - giliran melihat role dan temukan imposter bersama teman-teman secara langsung!',
      en: 'Offline social deduction party game for 3+ players. Your phone acts as game master - pass the device, see your role, and find the imposter together in person!'
    };
    return descriptions[language];
  };

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={language} />
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <link rel="alternate" hreflang="en" href="https://whoistheimpostorgame.vercel.app/?lang=en" />
        <link rel="alternate" hreflang="id" href="https://whoistheimpostorgame.vercel.app/?lang=id" />
        <link rel="alternate" hreflang="x-default" href="https://whoistheimpostorgame.vercel.app/" />
      </Helmet>
      
      <div className="App dark min-h-screen">
        {gameState === 'setup' && (
        <SetupScreen 
          onStartGame={handleStartGame} 
          language={language} 
          setLanguage={setLanguage} 
          settings={settings}
          setSettings={setSettings}
          t={t.setup} 
        />
      )}
      
      {gameState === 'role' && (
        <RoleScreen
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          wordData={wordData}
          imposterIndex={imposterIndex}
          onNext={handleNextPlayer}
          onComplete={handleRoleComplete}
          settings={settings}
          t={t.role}
        />
      )}
      
      {gameState === 'game' && (
        <GameScreen
          players={players}
          wordData={wordData}
          onStartVoting={handleStartVoting}
          settings={settings}
          t={t.game}
        />
      )}
      
      {gameState === 'voting' && (
        <VotingScreen
          players={players}
          onVoteComplete={handleVoteComplete}
          t={t.voting}
        />
      )}
      
      {gameState === 'result' && (
        <ResultScreen
          players={players}
          imposterIndex={imposterIndex}
          suspectedImposter={suspectedImposter}
          wordData={wordData}
          onPlayAgain={handlePlayAgain}
          onBackToSetup={handleBackToSetup}
          t={t.result}
        />
      )}
      </div>
    </HelmetProvider>
  );
}

export default App;
