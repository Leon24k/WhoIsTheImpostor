import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Crown, CheckCircle, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * VotingScreen — each player votes one at a time (pass-the-device style).
 * After all players have voted the tally is computed and the most-voted
 * player is sent to `onVoteComplete`.
 */
export const VotingScreen = ({ players, onVoteComplete, t }) => {
  // Which voter is currently casting their vote (index into `players`)
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  // true while the current voter is choosing; false on the "pass device" screen
  const [isVoting, setIsVoting] = useState(false);
  // The player the current voter has selected
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // Accumulated votes: { playerName: count }
  const [votes, setVotes] = useState({});

  const currentVoter = players[currentVoterIndex];

  // Players the current voter can vote for (everyone except themselves)
  const voteOptions = useMemo(
    () => players.filter((p) => p !== currentVoter),
    [players, currentVoter],
  );

  /** Show the voting UI for the current voter */
  const handleReady = () => {
    setIsVoting(true);
    setSelectedPlayer(null);
  };

  /** Record the current voter's choice and advance */
  const handleConfirmVote = () => {
    if (!selectedPlayer) return;

    const newVotes = { ...votes };
    newVotes[selectedPlayer] = (newVotes[selectedPlayer] || 0) + 1;
    setVotes(newVotes);

    const nextIndex = currentVoterIndex + 1;

    if (nextIndex >= players.length) {
      // All players have voted — determine the winner
      let maxCount = 0;

      // Find the highest vote count
      Object.values(newVotes).forEach((count) => {
        if (count > maxCount) maxCount = count;
      });

      // Collect all players tied at the top
      const topCandidates = Object.entries(newVotes)
        .filter(([, count]) => count === maxCount)
        .map(([player]) => player);

      // Break ties randomly for fairness
      const suspected =
        topCandidates.length === 1
          ? topCandidates[0]
          : topCandidates[Math.floor(Math.random() * topCandidates.length)];

      onVoteComplete(suspected, newVotes);
    } else {
      // Move to the next voter's "pass device" screen
      setCurrentVoterIndex(nextIndex);
      setIsVoting(false);
      setSelectedPlayer(null);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  "Pass the device" screen                                          */
  /* ------------------------------------------------------------------ */
  if (!isVoting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          key={`pass-${currentVoterIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-accent glow-accent mb-6"
          >
            <Vote className="w-10 h-10 text-accent-foreground" />
          </motion.div>

          <p className="text-sm text-muted-foreground mb-2">
            {t.voterTurn || 'Voter'} {currentVoterIndex + 1} / {players.length}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            {t.passDevice || 'Pass the device to'}
          </h1>
          <p className="text-2xl font-bold text-primary mb-8">{currentVoter}</p>

          <Button
            onClick={handleReady}
            className="w-full h-14 text-lg font-semibold gradient-accent hover:opacity-90 transition-opacity"
          >
            {t.ready || "I'm Ready!"}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  Voting UI                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        key={`vote-${currentVoterIndex}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-accent glow-accent mb-4"
          >
            <Vote className="w-10 h-10 text-accent-foreground" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-accent/5 border border-accent/20"
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <p className="text-sm text-center text-muted-foreground">
              <span className="font-semibold text-foreground">{currentVoter}</span>
              {' — '}
              {t.selectPrompt}
            </p>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-accent"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentVoterIndex + 1) / players.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Player Selection — cannot vote for yourself */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {voteOptions.map((player, index) => (
                <motion.button
                  key={player}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPlayer(player)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedPlayer === player
                      ? 'border-accent bg-accent/10 shadow-lg glow-accent'
                      : 'border-border bg-card-elevated hover:border-muted hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          selectedPlayer === player ? 'gradient-accent' : 'bg-muted'
                        }`}
                      >
                        <span className="text-xl font-bold text-foreground">
                          {players.indexOf(player) + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {player}
                        </p>
                        {selectedPlayer === player && (
                          <p className="text-xs text-accent">
                            {t.voteFor} {player}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedPlayer === player && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <CheckCircle className="w-6 h-6 text-accent" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmVote}
          disabled={!selectedPlayer}
          className="w-full h-14 text-lg font-semibold gradient-accent hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Crown className="h-6 w-6 mr-2" />
          {t.confirmVote}
        </Button>

        {/* Vote Tip */}
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-muted/50 border border-border text-center"
          >
            <p className="text-sm text-muted-foreground">
              {t.votingFor
                ? t.votingFor.replace('{player}', selectedPlayer)
                : `Voting for ${selectedPlayer} as Imposter`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
