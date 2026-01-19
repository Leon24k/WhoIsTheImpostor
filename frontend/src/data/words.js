// Word categories for the game - Multi-language support
export const wordCategories = {
  id: [
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
  ],
  en: [
    {
      name: "Animals",
      words: [
        "Cat",
        "Dog",
        "Elephant",
        "Tiger",
        "Lion",
        "Rabbit",
        "Snake",
        "Bird",
        "Fish",
        "Dolphin"
      ]
    },
    {
      name: "Food",
      words: [
        "Pizza",
        "Burger",
        "Sushi",
        "Pasta",
        "Salad",
        "Steak",
        "Sandwich",
        "Soup",
        "Cake",
        "Ice Cream"
      ]
    },
    {
      name: "Places",
      words: [
        "Beach",
        "Mountain",
        "School",
        "Hospital",
        "Market",
        "Office",
        "Park",
        "Museum",
        "Airport",
        "Station"
      ]
    },
    {
      name: "Professions",
      words: [
        "Doctor",
        "Teacher",
        "Police",
        "Pilot",
        "Chef",
        "Architect",
        "Programmer",
        "Singer",
        "Actor",
        "Athlete"
      ]
    },
    {
      name: "Sports",
      words: [
        "Football",
        "Basketball",
        "Badminton",
        "Swimming",
        "Tennis",
        "Volleyball",
        "Golf",
        "Boxing",
        "Athletics",
        "Racing"
      ]
    },
    {
      name: "Fruits",
      words: [
        "Apple",
        "Orange",
        "Mango",
        "Banana",
        "Durian",
        "Strawberry",
        "Watermelon",
        "Melon",
        "Grapes",
        "Pineapple"
      ]
    },
    {
      name: "Vehicles",
      words: [
        "Car",
        "Motorcycle",
        "Bicycle",
        "Airplane",
        "Ship",
        "Train",
        "Bus",
        "Truck",
        "Helicopter",
        "Boat"
      ]
    },
    {
      name: "Colors",
      words: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Black",
        "White",
        "Purple",
        "Orange",
        "Pink",
        "Brown"
      ]
    },
    {
      name: "Musical Instruments",
      words: [
        "Guitar",
        "Piano",
        "Drums",
        "Violin",
        "Flute",
        "Saxophone",
        "Trumpet",
        "Harmonica",
        "Cello",
        "Harp"
      ]
    },
    {
      name: "Countries",
      words: [
        "Indonesia",
        "Malaysia",
        "Singapore",
        "Thailand",
        "Japan",
        "Korea",
        "Australia",
        "America",
        "England",
        "France"
      ]
    }
  ]
};

// Get a random word and category based on language
export const getRandomWord = (language = 'id', categoryFilter = 'all') => {
  const categories = wordCategories[language] || wordCategories.id;
  
  // Filter by category if specified
  let availableCategories = categories;
  if (categoryFilter !== 'all') {
    availableCategories = categories.filter(cat => cat.name === categoryFilter);
    // If no match, fall back to all categories
    if (availableCategories.length === 0) {
      availableCategories = categories;
    }
  }
  
  const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
  const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
  return {
    word: randomWord,
    category: randomCategory.name
  };
};

// Get list of categories for a language
export const getCategories = (language = 'id') => {
  const categories = wordCategories[language] || wordCategories.id;
  return categories.map(cat => cat.name);
};

// Get random imposter indices
export const getRandomImposterIndex = (playerCount, imposterCount = 1) => {
  const indices = [];
  const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
  
  for (let i = 0; i < Math.min(imposterCount, playerCount); i++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    indices.push(availableIndices[randomIndex]);
    availableIndices.splice(randomIndex, 1);
  }
  
  return indices;
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
