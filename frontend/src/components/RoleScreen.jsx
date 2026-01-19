import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const RoleScreen = ({ players, currentPlayerIndex, wordData, imposterIndex, onNext, onComplete, settings, t }) => {
  const [revealed, setRevealed] = useState(false);
  const currentPlayer = players[currentPlayerIndex];
  const isImposter = Array.isArray(imposterIndex) 
    ? imposterIndex.includes(currentPlayerIndex) 
    : currentPlayerIndex === imposterIndex;
  const isLastPlayer = currentPlayerIndex === players.length - 1;

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setRevealed(false);
    if (isLastPlayer) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        key={currentPlayerIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Player Info */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary mb-4"
          >
            <span className="text-2xl font-bold text-primary">{currentPlayerIndex + 1}</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t.turnTitle}: {currentPlayer}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentPlayerIndex + 1} / {players.length}
          </p>
        </div>

        {/* Role Card */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-gradient-to-br from-card to-card-elevated border-border relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)'
                  }} />
                </div>

                <div className="relative text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6"
                  >
                    <EyeOff className="w-12 h-12 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {t.passDevice} {currentPlayer}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t.ready}
                  </p>
                  <Button
                    onClick={handleReveal}
                    className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity glow-primary"
                  >
                    <Eye className="h-6 w-6 mr-2" />
                    {t.showRole}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`p-8 relative overflow-hidden ${
                isImposter 
                  ? 'bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive glow-destructive' 
                  : 'bg-gradient-to-br from-primary/20 to-primary/10 border-primary glow-primary'
              }`}>
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: isImposter
                      ? ['radial-gradient(circle at 20% 50%, hsl(var(--destructive)) 0%, transparent 50%)',
                         'radial-gradient(circle at 80% 50%, hsl(var(--destructive)) 0%, transparent 50%)',
                         'radial-gradient(circle at 20% 50%, hsl(var(--destructive)) 0%, transparent 50%)']
                      : ['radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)',
                         'radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)',
                         'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    {isImposter ? (
                      <>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/20 border-2 border-destructive mb-6 animate-pulse-glow">
                          <span className="text-4xl">🎭</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 text-destructive">
                          {t.yourRole}
                        </h3>
                        <p className="text-5xl font-bold mb-4 text-destructive">
                          {t.imposter}
                        </p>
                        {settings?.showCategoryToImposter && (
                          <p className="text-sm text-muted-foreground">
                            {t.category}: {wordData.category}
                          </p>
                        )}
                        {!settings?.showCategoryToImposter && (
                          <p className="text-sm text-muted-foreground italic">
                            ({t.category} Hidden)
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-2 border-primary mb-6">
                          <span className="text-4xl">✨</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                          {t.yourWord}
                        </h3>
                        <p className="text-5xl font-bold mb-4 text-primary">
                          {wordData.word}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                          <span className="text-xs text-muted-foreground">{t.category}:</span>
                          <span className="text-sm font-semibold text-foreground">{wordData.category}</span>
                        </div>
                      </>
                    )}
                  </motion.div>

                  <Button
                    onClick={handleNext}
                    className={`w-full h-14 text-lg font-semibold mt-8 ${
                      isImposter
                        ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                        : 'gradient-primary hover:opacity-90'
                    } transition-all`}
                  >
                    {isLastPlayer ? t.startGame : t.next}
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-4 rounded-lg bg-muted/50 border border-border"
          >
            <p className="text-xs text-center text-muted-foreground">
              {isImposter 
                ? `💡 ${t.rememberImposter}`
                : `💡 ${t.remember}`
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
