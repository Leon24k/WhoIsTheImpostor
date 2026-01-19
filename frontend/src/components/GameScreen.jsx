import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { shuffleArray } from '@/data/words';

export const GameScreen = ({ players, wordData, onStartVoting, t }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playerOrder, setPlayerOrder] = useState([]);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const totalRounds = 2; // Each player gives 2 clues

  useEffect(() => {
    // Randomize player order at start
    const shuffled = shuffleArray(players.map((name, index) => ({ name, index })));
    setPlayerOrder(shuffled);
  }, [players]);

  const handleNextTurn = () => {
    if (currentTurn < playerOrder.length - 1) {
      setCurrentTurn(currentTurn + 1);
    } else {
      if (roundsCompleted < totalRounds - 1) {
        // Start new round
        setRoundsCompleted(roundsCompleted + 1);
        setCurrentTurn(0);
        // Shuffle again for next round
        const shuffled = shuffleArray(playerOrder);
        setPlayerOrder(shuffled);
      } else {
        // All rounds complete, go to voting
        onStartVoting();
      }
    }
  };

  const currentPlayer = playerOrder[currentTurn];
  const progress = ((roundsCompleted * players.length + currentTurn + 1) / (totalRounds * players.length)) * 100;

  if (playerOrder.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary mb-4"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {t.round} {roundsCompleted + 1} / {totalRounds}
            </span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {roundsCompleted * players.length + currentTurn + 1} / {totalRounds * players.length} {t.turn.toLowerCase()}
          </p>
        </div>

        {/* Current Player Card */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-card to-card-elevated border-border relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, hsl(var(--primary)) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="relative text-center">
            <motion.div
              key={currentTurn}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary glow-primary mb-4"
            >
              <span className="text-3xl font-bold text-primary-foreground">
                {currentPlayer.index + 1}
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
              {t.currentTurn}: {currentPlayer.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t.giveClue}
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t.category}</p>
                <p className="text-lg font-semibold text-foreground">{wordData.category}</p>
              </div>
            </div>

            <Button
              onClick={handleNextTurn}
              className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity"
            >
              {currentTurn === playerOrder.length - 1 && roundsCompleted === totalRounds - 1
                ? t.startVoting
                : t.nextTurn
              }
              <ArrowRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </Card>

        {/* All Players List */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">{t.players}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {playerOrder.map((player, index) => (
              <motion.div
                key={player.index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge
                  variant={index === currentTurn ? "default" : "outline"}
                  className={`w-full justify-center py-2 px-3 text-sm ${
                    index === currentTurn
                      ? 'gradient-primary text-primary-foreground border-0 glow-primary'
                      : index < currentTurn
                      ? 'bg-muted text-muted-foreground border-border opacity-50'
                      : 'border-border text-foreground'
                  }`}
                >
                  {index < currentTurn && '✓ '}
                  {player.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
        >
          <p className="text-xs text-center text-muted-foreground">
            💡 <span className="font-semibold">Tips:</span> Berikan petunjuk yang cukup jelas untuk pemain lain, 
            tapi tidak terlalu spesifik sehingga Imposter bisa menebak
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
