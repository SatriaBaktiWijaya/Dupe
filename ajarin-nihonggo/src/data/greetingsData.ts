export interface GreetingItem {
  id: string;
  japanese: string;
  romaji: string;
  meaningId: string;
  situation: string;
  kanaBreakdown: string[];
}

export const GREETINGS_DATA: GreetingItem[] = [
  {
    id: 'g_ohayou',
    japanese: 'おはようございます',
    romaji: 'Ohayou gozaimasu',
    meaningId: 'Selamat Pagi (Sopan)',
    situation: 'Diucapkan di pagi hari kepada rekan kerja, guru, atau atasan.',
    kanaBreakdown: ['お', 'は', 'よ', 'う', 'ご', 'ざ', 'い', 'ま', 'す'],
  },
  {
    id: 'g_konnichiwa',
    japanese: 'こんにちは',
    romaji: 'Konnichiwa',
    meaningId: 'Selamat Siang / Halo',
    situation: 'Salam umum dari siang hingga sore hari kepada siapa saja.',
    kanaBreakdown: ['こ', 'ん', 'に', 'ち', 'は'],
  },
  {
    id: 'g_konbanwa',
    japanese: 'こんばんは',
    romaji: 'Konbanwa',
    meaningId: 'Selamat Malam',
    situation: 'Diucapkan saat bertemu orang di malam hari.',
    kanaBreakdown: ['こ', 'ん', 'ば', 'ん', 'は'],
  },
  {
    id: 'g_oyasumi',
    japanese: 'おやすみなさい',
    romaji: 'Oyasuminasai',
    meaningId: 'Selamat Tidur / Beristirahat',
    situation: 'Diucapkan sebelum tidur atau berpamitan pulang larut malam.',
    kanaBreakdown: ['お', 'や', 'す', 'み', 'な', 'さ', 'い'],
  },
  {
    id: 'g_arigatou',
    japanese: 'ありがとうございます',
    romaji: 'Arigatou gozaimasu',
    meaningId: 'Terima Kasih Banyak',
    situation: 'Ungkapan terima kasih standar yang sopan dan formal.',
    kanaBreakdown: ['あ', 'り', 'が', 'と', 'う', 'ご', 'ざ', 'い', 'ま', 'す'],
  },
  {
    id: 'g_douitashimashite',
    japanese: 'どういたしまして',
    romaji: 'Douitashimashite',
    meaningId: 'Sama-sama / Kembali',
    situation: 'Balasan setelah seseorang berterima kasih kepada Anda.',
    kanaBreakdown: ['ど', 'う', 'い', 'た', 'し', 'ま', 'し', 'て'],
  },
  {
    id: 'g_sumimasen',
    japanese: 'すみません',
    romaji: 'Sumimasen',
    meaningId: 'Permisi / Maaf / Terima Kasih',
    situation: 'Kata paling serbaguna: memanggil pelayan, meminta maaf ringan, atau terima kasih.',
    kanaBreakdown: ['す', 'み', 'ま', 'せ', 'ん'],
  },
  {
    id: 'g_gomennasai',
    japanese: 'ごめんなさい',
    romaji: 'Gomennasai',
    meaningId: 'Mohon Maaf (Kasual/Tulus)',
    situation: 'Meminta maaf atas kesalahan pribadi kepada teman atau keluarga.',
    kanaBreakdown: ['ご', 'め', 'ん', 'な', 'さ', 'い'],
  },
  {
    id: 'g_itadakimasu',
    japanese: 'いただきます',
    romaji: 'Itadakimasu',
    meaningId: 'Selamat Makan / Saya Menerima Makanan Ini',
    situation: 'Diucapkan tepat sebelum mulai menyantap makanan atau minuman.',
    kanaBreakdown: ['い', 'た', 'だ', 'き', 'ま', 'す'],
  },
  {
    id: 'g_gochisousama',
    japanese: 'ごちそうさまでした',
    romaji: 'Gochisousama deshita',
    meaningId: 'Terima kasih atas hidangannya',
    situation: 'Diucapkan setelah selesai makan kepada tuan rumah atau juru masak.',
    kanaBreakdown: ['ご', 'ち', 'そ', 'う', 'さ', 'ま', 'で', 'し', 'た'],
  },
  {
    id: 'g_sayounara',
    japanese: 'さようなら',
    romaji: 'Sayounara',
    meaningId: 'Selamat Tinggal (Lama)',
    situation: 'Perpisahan resmi ketika tidak akan bertemu lagi dalam waktu dekat.',
    kanaBreakdown: ['さ', 'よ', 'う', 'な', 'ら'],
  },
  {
    id: 'g_otsukaresama',
    japanese: 'おつかれさまでした',
    romaji: 'Otsukaresama deshita',
    meaningId: 'Terima kasih atas kerja kerasnya',
    situation: 'Diucapkan kepada rekan kerja di akhir jam kerja atau setelah menyelesaikan proyek.',
    kanaBreakdown: ['お', 'つ', 'か', 'れ', 'さ', 'ま', 'で', 'し', 'た'],
  },
];

