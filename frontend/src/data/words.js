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
export const getRandomWord = (language = 'id') => {
  const categories = wordCategories[language] || wordCategories.id;
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
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
