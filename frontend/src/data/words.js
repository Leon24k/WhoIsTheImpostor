// Indonesian word categories for the game
export const wordCategories = [
  {
    name: "Hewan",
    words: [
      "Kucing",
      "Anjing",
      "Gajah",
      "Harimau",
      "Singa",
      "Kelinci",
      "Ular",
      "Burung",
      "Ikan",
      "Lumba-lumba"
    ]
  },
  {
    name: "Makanan",
    words: [
      "Nasi Goreng",
      "Bakso",
      "Sate",
      "Rendang",
      "Gado-gado",
      "Soto",
      "Mie Ayam",
      "Nasi Uduk",
      "Martabak",
      "Pempek"
    ]
  },
  {
    name: "Tempat",
    words: [
      "Pantai",
      "Gunung",
      "Sekolah",
      "Rumah Sakit",
      "Pasar",
      "Kantor",
      "Taman",
      "Museum",
      "Bandara",
      "Stasiun"
    ]
  },
  {
    name: "Profesi",
    words: [
      "Dokter",
      "Guru",
      "Polisi",
      "Pilot",
      "Chef",
      "Arsitek",
      "Programmer",
      "Penyanyi",
      "Aktor",
      "Atlet"
    ]
  },
  {
    name: "Olahraga",
    words: [
      "Sepak Bola",
      "Basket",
      "Bulu Tangkis",
      "Renang",
      "Tenis",
      "Voli",
      "Golf",
      "Tinju",
      "Atletik",
      "Balap"
    ]
  },
  {
    name: "Buah",
    words: [
      "Apel",
      "Jeruk",
      "Mangga",
      "Pisang",
      "Durian",
      "Rambutan",
      "Manggis",
      "Semangka",
      "Melon",
      "Anggur"
    ]
  },
  {
    name: "Kendaraan",
    words: [
      "Mobil",
      "Motor",
      "Sepeda",
      "Pesawat",
      "Kapal",
      "Kereta",
      "Bus",
      "Truk",
      "Helikopter",
      "Becak"
    ]
  },
  {
    name: "Warna",
    words: [
      "Merah",
      "Biru",
      "Hijau",
      "Kuning",
      "Hitam",
      "Putih",
      "Ungu",
      "Oranye",
      "Pink",
      "Coklat"
    ]
  },
  {
    name: "Alat Musik",
    words: [
      "Gitar",
      "Piano",
      "Drum",
      "Biola",
      "Suling",
      "Angklung",
      "Gamelan",
      "Saxophone",
      "Terompet",
      "Harmonika"
    ]
  },
  {
    name: "Negara",
    words: [
      "Indonesia",
      "Malaysia",
      "Singapura",
      "Thailand",
      "Jepang",
      "Korea",
      "Australia",
      "Amerika",
      "Inggris",
      "Prancis"
    ]
  }
];

// Get a random word and category
export const getRandomWord = () => {
  const randomCategory = wordCategories[Math.floor(Math.random() * wordCategories.length)];
  const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
  return {
    word: randomWord,
    category: randomCategory.name
  };
};

// Get random imposter index
export const getRandomImposterIndex = (playerCount) => {
  return Math.floor(Math.random() * playerCount);
};

// Shuffle array (for randomizing player order)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
