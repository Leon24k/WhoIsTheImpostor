import { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Crown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const VotingScreen = ({ players, onVoteComplete }) => {
  const [votes, setVotes] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const handleVote = (playerName) => {
    setSelectedPlayer(playerName);
  };

  const handleConfirmVote = () => {
    if (!selectedPlayer) return;
    
    // Calculate votes
    const newVotes = { ...votes };
    newVotes[selectedPlayer] = (newVotes[selectedPlayer] || 0) + 1;
    
    // Find player with most votes
    let maxVotes = 0;
    let suspectedImposter = null;
    
    Object.keys(newVotes).forEach(player => {
      if (newVotes[player] > maxVotes) {
        maxVotes = newVotes[player];
        suspectedImposter = player;
      }
    });
    
    onVoteComplete(suspectedImposter);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-accent glow-accent mb-4"
          >
            <Vote className="w-10 h-10 text-accent-foreground" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            Saatnya Voting!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Pilih siapa yang menurut Anda adalah Imposter
          </p>
        </div>

        {/* Voting Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-accent/5 border border-accent/20"
        >
          <p className="text-sm text-center text-muted-foreground">
            Diskusikan dengan pemain lain dan pilih tersangka. Suara terbanyak akan menentukan hasil!
          </p>
        </motion.div>

        {/* Player Selection */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.map((player, index) => (
              <motion.button
                key={player}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleVote(player)}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedPlayer === player
                    ? 'border-accent bg-accent/10 shadow-lg glow-accent'
                    : 'border-border bg-card-elevated hover:border-muted hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      selectedPlayer === player
                        ? 'gradient-accent'
                        : 'bg-muted'
                    }`}>
                      <span className="text-xl font-bold text-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{player}</p>
                      {selectedPlayer === player && (
                        <p className="text-xs text-accent">Pilihan Anda</p>
                      )}
                    </div>
                  </div>
                  {selectedPlayer === player && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmVote}
          disabled={!selectedPlayer}
          className="w-full h-14 text-lg font-semibold gradient-accent hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Crown className="h-6 w-6 mr-2" />
          Konfirmasi Pilihan
        </Button>

        {/* Vote Tip */}
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-muted/50 border border-border text-center"
          >
            <p className="text-sm text-muted-foreground">
              Anda memilih <span className="font-bold text-foreground">{selectedPlayer}</span> sebagai Imposter
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
