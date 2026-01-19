import { useState } from 'react';
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
    const imposter = getRandomImposterIndex(players.length);
    
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

  return (
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
  );
}

export default App;
