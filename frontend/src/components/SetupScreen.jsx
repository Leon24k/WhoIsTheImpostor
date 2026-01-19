import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Play, Users, HelpCircle, Eye, MessageCircle, Vote, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const SetupScreen = ({ onStartGame }) => {
  const [players, setPlayers] = useState(['']);
  const [error, setError] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  const addPlayer = () => {
    setPlayers([...players, '']);
    setError('');
  };

  const removePlayer = (index) => {
    if (players.length > 1) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const updatePlayer = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
    setError('');
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(p => p.trim() !== '');
    
    if (validPlayers.length < 3) {
      setError('Minimal 3 pemain diperlukan untuk bermain!');
      return;
    }
    
    // Check for duplicate names
    const uniqueNames = new Set(validPlayers.map(p => p.toLowerCase().trim()));
    if (uniqueNames.size !== validPlayers.length) {
      setError('Nama pemain tidak boleh sama!');
      return;
    }
    
    onStartGame(validPlayers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary glow-primary mb-4"
          >
            <Users className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold mb-3 text-gradient-primary"
          >
            Siapa Imposter?
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm sm:text-base"
          >
            Masukkan nama pemain untuk memulai permainan
          </motion.p>
          
          {/* Tutorial Button */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary/30 hover:bg-primary/10"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Cara Bermain
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gradient-primary">
                    Cara Bermain "Siapa Imposter?"
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Permainan deduksi sosial yang seru untuk 3+ pemain
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Tujuan Permainan */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Tujuan Permainan</h3>
                    </div>
                    <p className="text-muted-foreground pl-7">
                      <strong className="text-foreground">Pemain Biasa:</strong> Temukan siapa imposter di antara kalian<br/>
                      <strong className="text-destructive">Imposter:</strong> Sembunyi identitasmu dan hindari ketahuan!
                    </p>
                  </div>

                  {/* Peraturan */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Peraturan</h3>
                    
                    <div className="space-y-3 pl-2">
                      {/* Step 1 */}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Eye className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Lihat Role</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Setiap pemain akan melihat role mereka secara bergantian. 
                            <strong className="text-foreground"> Pemain biasa</strong> mendapat kata rahasia (misal: "Kucing"), 
                            sedangkan <strong className="text-destructive">imposter</strong> hanya mendapat kategori (misal: "Hewan").
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Diskusi & Beri Petunjuk</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Secara bergantian, setiap pemain memberikan <strong className="text-foreground">petunjuk tentang kata mereka </strong> 
                             tanpa menyebutkan kata tersebut secara langsung. Imposter harus berpura-pura tahu kata yang dimaksud!
                          </p>
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <strong>Contoh:</strong><br/>
                            Kata: "Kucing" → Petunjuk: "Hewan yang suka tidur dan mengeong"<br/>
                            ❌ Jangan: "K-U-C-I-N-G" atau terlalu spesifik!
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Vote className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Voting</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Setelah diskusi, semua pemain memilih siapa yang mereka curigai sebagai imposter.
                          </p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          4
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Hasil</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Imposter terungkap! Apakah tebakan kalian benar?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-lg mb-2">💡 Tips</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• <strong className="text-foreground">Untuk Pemain Biasa:</strong> Beri petunjuk yang cukup spesifik agar pemain lain tahu kamu bukan imposter</li>
                      <li>• <strong className="text-destructive">Untuk Imposter:</strong> Dengarkan petunjuk orang lain dan coba tebak kata rahasianya, lalu beri petunjuk yang umum</li>
                      <li>• Perhatikan pemain yang memberikan petunjuk terlalu umum atau tidak nyambung!</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setShowTutorial(false)} className="gradient-primary">
                    Mengerti, Ayo Main!
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Players Card */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="space-y-3 mb-4">
            {players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-2"
              >
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Pemain ${index + 1}`}
                    value={player}
                    onChange={(e) => updatePlayer(index, e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground h-12 text-base"
                  />
                </div>
                {players.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(index)}
                    className="h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            >
              {error}
            </motion.div>
          )}

          <Button
            onClick={addPlayer}
            variant="outline"
            className="w-full border-border hover:bg-muted h-12 text-base"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Pemain
          </Button>
        </Card>

        {/* Start Button */}
        <Button
          onClick={handleStartGame}
          className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity glow-primary"
          disabled={players.filter(p => p.trim() !== '').length < 3}
        >
          <Play className="h-6 w-6 mr-2 fill-current" />
          Mulai Permainan
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {players.filter(p => p.trim() !== '').length} / {players.length} pemain siap
        </p>
      </motion.div>
    </div>
  );
};
