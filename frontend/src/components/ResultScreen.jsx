import { motion } from 'framer-motion';
import { Trophy, XCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ResultScreen = ({ players, imposterIndex, suspectedImposter, wordData, onPlayAgain, onBackToSetup }) => {
  const actualImposter = players[imposterIndex];
  const innocentsWin = suspectedImposter === actualImposter;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-2xl"
      >
        {/* Result Icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 ${
              innocentsWin
                ? 'gradient-primary glow-primary'
                : 'bg-destructive/20 border-2 border-destructive glow-destructive'
            }`}
          >
            {innocentsWin ? (
              <Trophy className="w-16 h-16 text-primary-foreground" />
            ) : (
              <span className="text-6xl">🎭</span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl sm:text-5xl font-bold mb-3 ${
              innocentsWin ? 'text-gradient-primary' : 'text-destructive'
            }`}
          >
            {innocentsWin ? 'Pemain Menang!' : 'Imposter Menang!'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg"
          >
            {innocentsWin 
              ? 'Kalian berhasil menemukan Imposter!' 
              : 'Imposter berhasil menipu kalian semua!'}
          </motion.p>
        </div>

        {/* Game Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-card to-card-elevated border-border">
            <div className="space-y-6">
              {/* Word Reveal */}
              <div className="text-center pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">Kata Rahasia</p>
                <p className="text-4xl font-bold text-primary mb-2">{wordData.word}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <span className="text-xs text-muted-foreground">Kategori:</span>
                  <span className="text-sm font-semibold text-foreground">{wordData.category}</span>
                </div>
              </div>

              {/* Imposter Reveal */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-xl">🎭</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Imposter Sebenarnya</p>
                    <p className="text-lg font-bold text-destructive">{actualImposter}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-4 rounded-lg ${
                  innocentsWin
                    ? 'bg-success/10 border border-success/20'
                    : 'bg-muted border border-border'
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    innocentsWin ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    {innocentsWin ? (
                      <Trophy className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Pilihan Pemain</p>
                    <p className={`text-lg font-bold ${
                      innocentsWin ? 'text-success' : 'text-foreground'
                    }`}>
                      {suspectedImposter || 'Tidak ada yang dipilih'}
                    </p>
                  </div>
                </div>
              </div>

              {/* All Players */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Semua Pemain</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {players.map((player, index) => (
                    <div
                      key={player}
                      className={`p-3 rounded-lg border text-center ${
                        index === imposterIndex
                          ? 'bg-destructive/10 border-destructive/30 text-destructive font-semibold'
                          : 'bg-card border-border text-foreground'
                      }`}
                    >
                      <p className="text-sm">
                        {index === imposterIndex && '🎭 '}
                        {player}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <Button
            onClick={onPlayAgain}
            className="h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Main Lagi
          </Button>
          <Button
            onClick={onBackToSetup}
            variant="outline"
            className="h-14 text-lg font-semibold border-border hover:bg-muted"
          >
            <Home className="h-5 w-5 mr-2" />
            Menu Utama
          </Button>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 rounded-lg bg-muted/50 border border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            {innocentsWin 
              ? '🎉 Kerja tim yang bagus! Petunjuk kalian sangat membantu.'
              : '🎭 Imposter bermain dengan cerdas! Coba lagi dengan petunjuk yang lebih baik.'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
