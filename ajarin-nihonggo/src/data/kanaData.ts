export interface KanaItem {
  id: string;
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  row: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'n' | 'dakuon' | 'handakuon';
  example: {
    word: string;
    reading: string;
    meaning: string;
  };
  strokeCount: number;
  mnemonic: string;
}

export const HIRAGANA_DATA: KanaItem[] = [
  // Vowels
  { id: 'h_a', character: 'あ', romaji: 'a', type: 'hiragana', row: 'vowel', strokeCount: 3, mnemonic: 'Huruf "a" terlihat seperti buah apel dengan tangkai melingkar.', example: { word: 'あさ', reading: 'asa', meaning: 'Pagi' } },
  { id: 'h_i', character: 'い', romaji: 'i', type: 'hiragana', row: 'vowel', strokeCount: 2, mnemonic: 'Dua garis sejajar melengkung seperti dua buah jar<i\>.', example: { word: 'いぬ', reading: 'inu', meaning: 'Anjing' } },
  { id: 'h_u', character: 'う', romaji: 'u', type: 'hiragana', row: 'vowel', strokeCount: 2, mnemonic: 'Orang membungkuk sambil memegang perut karena kenyang.', example: { word: 'うみ', reading: 'umi', meaning: 'Laut' } },
  { id: 'h_e', character: 'え', romaji: 'e', type: 'hiragana', row: 'vowel', strokeCount: 2, mnemonic: 'Terlihat seperti orang yang sedang lari marathon (energetik).', example: { word: 'えき', reading: 'eki', meaning: 'Stasiun' } },
  { id: 'h_o', character: 'お', romaji: 'o', type: 'hiragana', row: 'vowel', strokeCount: 3, mnemonic: 'Huruf O dengan tanda petik di atasnya, seperti bola golf di atas tee.', example: { word: 'おちゃ', reading: 'ocha', meaning: 'Teh Hijau' } },

  // K-row
  { id: 'h_ka', character: 'か', romaji: 'ka', type: 'hiragana', row: 'k', strokeCount: 3, mnemonic: 'Terlihat seperti pedang katana yang menebas sesuatu.', example: { word: 'かさ', reading: 'kasa', meaning: 'Payung' } },
  { id: 'h_ki', character: 'き', romaji: 'ki', type: 'hiragana', row: 'k', strokeCount: 4, mnemonic: 'Mirip kunci kuno (key).', example: { word: 'き', reading: 'ki', meaning: 'Pohon' } },
  { id: 'h_ku', character: 'く', romaji: 'ku', type: 'hiragana', row: 'k', strokeCount: 1, mnemonic: 'Seperti paruh burung kukuk (cuckoo) yang sedang terbuka.', example: { word: 'くるま', reading: 'kuruma', meaning: 'Mobil' } },
  { id: 'h_ke', character: 'け', romaji: 'ke', type: 'hiragana', row: 'k', strokeCount: 3, mnemonic: 'Bentuk tong kayu bir (keg).', example: { word: 'けさ', reading: 'kesa', meaning: 'Pagi ini' } },
  { id: 'h_ko', character: 'こ', romaji: 'ko', type: 'hiragana', row: 'k', strokeCount: 2, mnemonic: 'Dua cacing yang sedang saling menatap mesra.', example: { word: 'こども', reading: 'kodomo', meaning: 'Anak-anak' } },

  // S-row
  { id: 'h_sa', character: 'さ', romaji: 'sa', type: 'hiragana', row: 's', strokeCount: 3, mnemonic: 'Cangkir sake kecil yang elegan.', example: { word: 'さくら', reading: 'sakura', meaning: 'Bunga Sakura' } },
  { id: 'h_shi', character: 'し', romaji: 'shi', type: 'hiragana', row: 's', strokeCount: 1, mnemonic: 'Kail pancing ikan untuk memancing di laut (sea / shi).', example: { word: 'しろ', reading: 'shiro', meaning: 'Putih' } },
  { id: 'h_su', character: 'す', romaji: 'su', type: 'hiragana', row: 's', strokeCount: 2, mnemonic: 'Bunga mawar dengan tangkai berputar (swirl).', example: { word: 'すし', reading: 'sushi', meaning: 'Sushi' } },
  { id: 'h_se', character: 'せ', romaji: 'se', type: 'hiragana', row: 's', strokeCount: 3, mnemonic: 'Orang yang duduk di tepi bangku teater (seat).', example: { word: 'せんせい', reading: 'sensei', meaning: 'Guru' } },
  { id: 'h_so', character: 'そ', romaji: 'so', type: 'hiragana', row: 's', strokeCount: 1, mnemonic: 'Jarum jahit yang sedang menjahit pola zigzag (sew).', example: { word: 'そら', reading: 'sora', meaning: 'Langit' } },

  // T-row
  { id: 'h_ta', character: 'た', romaji: 'ta', type: 'hiragana', row: 't', strokeCount: 4, mnemonic: 'Mirip huruf alfabet "t" dan "a" yang digabung.', example: { word: 'たべる', reading: 'taberu', meaning: 'Makan' } },
  { id: 'h_chi', character: 'ち', romaji: 'chi', type: 'hiragana', row: 't', strokeCount: 2, mnemonic: 'Pemandu sorak (cheerleader) yang sedang menari.', example: { word: 'ちず', reading: 'chizu', meaning: 'Peta' } },
  { id: 'h_tsu', character: 'つ', romaji: 'tsu', type: 'hiragana', row: 't', strokeCount: 1, mnemonic: 'Gelombang tsunami besar yang melengkung.', example: { word: 'つき', reading: 'tsuki', meaning: 'Bulan' } },
  { id: 'h_te', character: 'て', romaji: 'te', type: 'hiragana', row: 't', strokeCount: 1, mnemonic: 'Lengan dan tangan manusia (te = tangan dalam bahasa Jepang).', example: { word: 'て', reading: 'te', meaning: 'Tangan' } },
  { id: 'h_to', character: 'と', romaji: 'to', type: 'hiragana', row: 't', strokeCount: 2, mnemonic: 'Jari kaki yang terkena duri (toe).', example: { word: 'ともだち', reading: 'tomodachi', meaning: 'Teman' } },

  // N-row
  { id: 'h_na', character: 'な', romaji: 'na', type: 'hiragana', row: 'n', strokeCount: 4, mnemonic: 'Biarawati (nun) yang sedang berdoa di depan salib.', example: { word: 'なつ', reading: 'natsu', meaning: 'Musim Panas' } },
  { id: 'h_ni', character: 'に', romaji: 'ni', type: 'hiragana', row: 'n', strokeCount: 3, mnemonic: 'Jarum jahit dengan benang (needle).', example: { word: 'にほん', reading: 'nihon', meaning: 'Jepang' } },
  { id: 'h_nu', character: 'ぬ', romaji: 'nu', type: 'hiragana', row: 'n', strokeCount: 2, mnemonic: 'Mie ramen yang diambil dengan sumpit (noodle).', example: { word: 'ぬいぐるみ', reading: 'nuigurumi', meaning: 'Boneka' } },
  { id: 'h_ne', character: 'ね', romaji: 'ne', type: 'hiragana', row: 'n', strokeCount: 2, mnemonic: 'Kucing dengan ekor melingkar (neko).', example: { word: 'ねこ', reading: 'neko', meaning: 'Kucing' } },
  { id: 'h_no', character: 'の', romaji: 'no', type: 'hiragana', row: 'n', strokeCount: 1, mnemonic: 'Tanda larangan bundar (NO entry sign).', example: { word: 'のみもの', reading: 'nomimono', meaning: 'Minuman' } },

  // H-row
  { id: 'h_ha', character: 'は', romaji: 'ha', type: 'hiragana', row: 'h', strokeCount: 3, mnemonic: 'Bentuk huruf H dengan lingkaran di bawah.', example: { word: 'はな', reading: 'hana', meaning: 'Bunga' } },
  { id: 'h_hi', character: 'ひ', romaji: 'hi', type: 'hiragana', row: 'h', strokeCount: 1, mnemonic: 'Wajah tersenyum lebar tertawa hi-hi-hi.', example: { word: 'ひかり', reading: 'hikari', meaning: 'Cahaya' } },
  { id: 'h_fu', character: 'ふ', romaji: 'fu', type: 'hiragana', row: 'h', strokeCount: 4, mnemonic: 'Gunung Fuji yang megah.', example: { word: 'ふね', reading: 'fune', meaning: 'Kapal Laut' } },
  { id: 'h_he', character: 'へ', romaji: 'he', type: 'hiragana', row: 'h', strokeCount: 1, mnemonic: 'Bentuk lereng bukit atau atap rumah.', example: { word: 'へや', reading: 'heya', meaning: 'Kamar' } },
  { id: 'h_ho', character: 'ほ', romaji: 'ho', type: 'hiragana', row: 'h', strokeCount: 4, mnemonic: 'Orang memakai topi pelindung (helmet).', example: { word: 'ほし', reading: 'hoshi', meaning: 'Bintang' } },

  // M-row
  { id: 'h_ma', character: 'ま', romaji: 'ma', type: 'hiragana', row: 'm', strokeCount: 3, mnemonic: 'Wajah tersenyum manis memakai kacamata.', example: { word: 'まち', reading: 'machi', meaning: 'Kota' } },
  { id: 'h_mi', character: 'み', romaji: 'mi', type: 'hiragana', row: 'm', strokeCount: 2, mnemonic: 'Angka 21 yang meliuk indah.', example: { word: 'みず', reading: 'mizu', meaning: 'Air' } },
  { id: 'h_mu', character: 'む', romaji: 'mu', type: 'hiragana', row: 'm', strokeCount: 3, mnemonic: 'Sapi perah yang bersuara moo.', example: { word: 'むし', reading: 'mushi', meaning: 'Serangga' } },
  { id: 'h_me', character: 'め', romaji: 'me', type: 'hiragana', row: 'm', strokeCount: 2, mnemonic: 'Mata manusia dengan bulu mata (me = mata).', example: { word: 'め', reading: 'me', meaning: 'Mata' } },
  { id: 'h_mo', character: 'も', romaji: 'mo', type: 'hiragana', row: 'm', strokeCount: 3, mnemonic: 'Mata pancing dengan umpan ganda.', example: { word: 'もり', reading: 'mori', meaning: 'Hutan' } },

  // Y-row
  { id: 'h_ya', character: 'や', romaji: 'ya', type: 'hiragana', row: 'y', strokeCount: 3, mnemonic: 'Kapal pesiar yacht berlayar di laut.', example: { word: 'やま', reading: 'yama', meaning: 'Gunung' } },
  { id: 'h_yu', character: 'ゆ', romaji: 'yu', type: 'hiragana', row: 'y', strokeCount: 2, mnemonic: 'Ikan mas yang sedang berenang (you swim).', example: { word: 'ゆき', reading: 'yuki', meaning: 'Salju' } },
  { id: 'h_yo', character: 'よ', romaji: 'yo', type: 'hiragana', row: 'y', strokeCount: 2, mnemonic: 'Mainan yoyo tergantung di tali.', example: { word: 'よる', reading: 'yoru', meaning: 'Malam' } },

  // R-row
  { id: 'h_ra', character: 'ら', romaji: 'ra', type: 'hiragana', row: 'r', strokeCount: 2, mnemonic: 'Pipi beruang bulat (rabbit).', example: { word: 'らいおん', reading: 'raion', meaning: 'Singa' } },
  { id: 'h_ri', character: 'り', romaji: 'ri', type: 'hiragana', row: 'r', strokeCount: 2, mnemonic: 'Dua batang sungai yang mengalir (river).', example: { word: 'りんご', reading: 'ringo', meaning: 'Apel' } },
  { id: 'h_ru', character: 'る', romaji: 'ru', type: 'hiragana', row: 'r', strokeCount: 1, mnemonic: 'Jalan berputar dengan lingkaran di ujung.', example: { word: 'るす', reading: 'rusu', meaning: 'Tidak di rumah' } },
  { id: 'h_re', character: 'れ', romaji: 're', type: 'hiragana', row: 'r', strokeCount: 2, mnemonic: 'Orang sedang berlutut istirahat (rest).', example: { word: 'れいぞうこ', reading: 'reizouko', meaning: 'Kulkas' } },
  { id: 'h_ro', character: 'ろ', romaji: 'ro', type: 'hiragana', row: 'r', strokeCount: 1, mnemonic: 'Jalanan lurus tanpa lingkaran di ujung (road).', example: { word: 'ろうそく', reading: 'rousoku', meaning: 'Lilin' } },

  // W-row & N
  { id: 'h_wa', character: 'わ', romaji: 'wa', type: 'hiragana', row: 'w', strokeCount: 2, mnemonic: 'Bentuk angsa putih di danau (swan).', example: { word: 'わたし', reading: 'watashi', meaning: 'Saya' } },
  { id: 'h_wo', character: 'を', romaji: 'wo', type: 'hiragana', row: 'w', strokeCount: 3, mnemonic: 'Orang melompati rintangan sambil bersorak woah.', example: { word: 'ほんをよむ', reading: 'hon o yomu', meaning: 'Membaca buku' } },
  { id: 'h_n', character: 'ん', romaji: 'n', type: 'hiragana', row: 'n', strokeCount: 1, mnemonic: 'Mirip huruf alfabet "n" yang ditulis bersambung.', example: { word: 'にほん', reading: 'nihon', meaning: 'Jepang' } },
];

export const KATAKANA_DATA: KanaItem[] = [
  // Vowels
  { id: 'k_a', character: 'ア', romaji: 'a', type: 'katakana', row: 'vowel', strokeCount: 2, mnemonic: 'Ujung kapak tajam (axe).', example: { word: 'アイス', reading: 'aisu', meaning: 'Es Krim' } },
  { id: 'k_i', character: 'イ', romaji: 'i', type: 'katakana', row: 'vowel', strokeCount: 2, mnemonic: 'Bentuk kuda-kuda papan lukis (easel).', example: { word: 'インク', reading: 'inku', meaning: 'Tinta' } },
  { id: 'k_u', character: 'ウ', romaji: 'u', type: 'katakana', row: 'vowel', strokeCount: 3, mnemonic: 'Mirip atap rumah Jepang.', example: { word: 'ウェブ', reading: 'webu', meaning: 'Web' } },
  { id: 'k_e', character: 'エ', romaji: 'e', type: 'katakana', row: 'vowel', strokeCount: 3, mnemonic: 'Pilar lift bertingkat (elevator).', example: { word: 'エアコン', reading: 'eakon', meaning: 'AC' } },
  { id: 'k_o', character: 'オ', romaji: 'o', type: 'katakana', row: 'vowel', strokeCount: 3, mnemonic: 'Bentuk sudut siku opera box.', example: { word: 'オレンジ', reading: 'orenji', meaning: 'Jeruk' } },

  // K-row
  { id: 'k_ka', character: 'カ', romaji: 'ka', type: 'katakana', row: 'k', strokeCount: 2, mnemonic: 'Sama seperti hiragana か tetapi lebih tajam sudutnya.', example: { word: 'カメラ', reading: 'kamera', meaning: 'Kamera' } },
  { id: 'k_ki', character: 'キ', romaji: 'ki', type: 'katakana', row: 'k', strokeCount: 3, mnemonic: 'Gagang kunci gembok.', example: { word: 'キー', reading: 'kii', meaning: 'Kunci / Key' } },
  { id: 'k_ku', character: 'ク', romaji: 'ku', type: 'katakana', row: 'k', strokeCount: 2, mnemonic: 'Topi koki juru masak (cook).', example: { word: 'クラス', reading: 'kurasu', meaning: 'Kelas' } },
  { id: 'k_ke', character: 'ケ', romaji: 'ke', type: 'katakana', row: 'k', strokeCount: 3, mnemonic: 'Bentuk sudut huruf K besar.', example: { word: 'ケーキ', reading: 'keeki', meaning: 'Kue / Cake' } },
  { id: 'k_ko', character: 'コ', romaji: 'ko', type: 'katakana', row: 'k', strokeCount: 2, mnemonic: 'Sudut kotak terbuka (corner).', example: { word: 'コーヒー', reading: 'koohii', meaning: 'Kopi' } },

  // S-row
  { id: 'k_sa', character: 'サ', romaji: 'sa', type: 'katakana', row: 's', strokeCount: 3, mnemonic: 'Tiga bilah rumput sabana.', example: { word: 'サラダ', reading: 'sarada', meaning: 'Salad' } },
  { id: 'k_shi', character: 'シ', romaji: 'shi', type: 'katakana', row: 's', strokeCount: 3, mnemonic: 'Wajah tersenyum melirik ke atas (she smiles).', example: { word: 'シャツ', reading: 'shatsu', meaning: 'Kemeja' } },
  { id: 'k_su', character: 'ス', romaji: 'su', type: 'katakana', row: 's', strokeCount: 2, mnemonic: 'Gantungan baju jas (suit).', example: { word: 'スーパー', reading: 'suupaa', meaning: 'Supermarket' } },
  { id: 'k_se', character: 'セ', romaji: 'se', type: 'katakana', row: 's', strokeCount: 2, mnemonic: 'Mirip hiragana せ dengan garis tegas.', example: { word: 'セーター', reading: 'seetaa', meaning: 'Sweater' } },
  { id: 'k_so', character: 'ソ', romaji: 'so', type: 'katakana', row: 's', strokeCount: 2, mnemonic: 'Satu tetes jarum jahit ke bawah.', example: { word: 'ソフト', reading: 'sofuto', meaning: 'Software' } },

  // T-row
  { id: 'k_ta', character: 'タ', romaji: 'ta', type: 'katakana', row: 't', strokeCount: 3, mnemonic: 'Tenda kamping berbentuk prisma.', example: { word: 'タクシー', reading: 'takushii', meaning: 'Taksi' } },
  { id: 'k_chi', character: 'チ', romaji: 'chi', type: 'katakana', row: 't', strokeCount: 3, mnemonic: 'Pemandu sorak yang melompat lurus.', example: { word: 'チーズ', reading: 'chiizu', meaning: 'Keju' } },
  { id: 'k_tsu', character: 'ツ', romaji: 'tsu', type: 'katakana', row: 't', strokeCount: 3, mnemonic: 'Dua jarum yang mengarah ke bawah (tsunami jatuh).', example: { word: 'ツアー', reading: 'tsuaa', meaning: 'Tur' } },
  { id: 'k_te', character: 'テ', romaji: 'te', type: 'katakana', row: 't', strokeCount: 3, mnemonic: 'Antena televisi (TV).', example: { word: 'テスト', reading: 'tesuto', meaning: 'Tes / Ujian' } },
  { id: 'k_to', character: 'ト', romaji: 'to', type: 'katakana', row: 't', strokeCount: 2, mnemonic: 'Pohon pinus tegak (tree).', example: { word: 'トマト', reading: 'tomato', meaning: 'Tomat' } },

  // N-row
  { id: 'k_na', character: 'ナ', romaji: 'na', type: 'katakana', row: 'n', strokeCount: 2, mnemonic: 'Bentuk pedang bajak laut (knife).', example: { word: 'ナイフ', reading: 'naifu', meaning: 'Pisau' } },
  { id: 'k_ni', character: 'ニ', romaji: 'ni', type: 'katakana', row: 'n', strokeCount: 2, mnemonic: 'Dua garis lurus horizontal (angka dua = ni).', example: { word: 'ニュース', reading: 'nyuusu', meaning: 'Berita' } },
  { id: 'k_nu', character: 'ヌ', romaji: 'nu', type: 'katakana', row: 'n', strokeCount: 2, mnemonic: 'Sumpit menyilang mengambil mie.', example: { word: 'ヌードル', reading: 'nuudoru', meaning: 'Mie' } },
  { id: 'k_ne', character: 'ネ', romaji: 'ne', type: 'katakana', row: 'n', strokeCount: 4, mnemonic: 'Dasi leher formal (necktie).', example: { word: 'ネット', reading: 'netto', meaning: 'Internet' } },
  { id: 'k_no', character: 'ノ', romaji: 'no', type: 'katakana', row: 'n', strokeCount: 1, mnemonic: 'Garis miring lereng ski (no problem).', example: { word: 'ノート', reading: 'nooto', meaning: 'Buku Catatan' } },

  // H-row
  { id: 'k_ha', character: 'ハ', romaji: 'ha', type: 'katakana', row: 'h', strokeCount: 2, mnemonic: 'Dua tiang tenda kemah (hut).', example: { word: 'パン', reading: 'pan', meaning: 'Roti' } },
  { id: 'k_hi', character: 'ヒ', romaji: 'hi', type: 'katakana', row: 'h', strokeCount: 2, mnemonic: 'Tumit sepatu bot (heel).', example: { word: 'ヒーロー', reading: 'hiiroo', meaning: 'Pahlawan' } },
  { id: 'k_fu', character: 'フ', romaji: 'fu', type: 'katakana', row: 'h', strokeCount: 1, mnemonic: 'Bendera berkibar di tiang (flag).', example: { word: 'フォーク', reading: 'fooku', meaning: 'Garpu' } },
  { id: 'k_he', character: 'ヘ', romaji: 'he', type: 'katakana', row: 'h', strokeCount: 1, mnemonic: 'Persis sama dengan hiragana へ.', example: { word: 'ヘルメット', reading: 'herumetto', meaning: 'Helm' } },
  { id: 'k_ho', character: 'ホ', romaji: 'ho', type: 'katakana', row: 'h', strokeCount: 4, mnemonic: 'Salib suci di rumah sakit (hospital).', example: { word: 'ホテル', reading: 'hoteru', meaning: 'Hotel' } },

  // M-row
  { id: 'k_ma', character: 'マ', romaji: 'ma', type: 'katakana', row: 'm', strokeCount: 2, mnemonic: 'Cangkir kopi dari atas.', example: { word: 'マスク', reading: 'masuku', meaning: 'Masker' } },
  { id: 'k_mi', character: 'ミ', romaji: 'mi', type: 'katakana', row: 'm', strokeCount: 3, mnemonic: 'Tiga garis nada musik (mi-mi-mi).', example: { word: 'ミルク', reading: 'miruku', meaning: 'Susu' } },
  { id: 'k_mu', character: 'ム', romaji: 'mu', type: 'katakana', row: 'm', strokeCount: 2, mnemonic: 'Bentuk piramida segitiga.', example: { word: 'ムービー', reading: 'muubii', meaning: 'Film' } },
  { id: 'k_me', character: 'メ', romaji: 'me', type: 'katakana', row: 'm', strokeCount: 2, mnemonic: 'Tanda silang pedang (metal).', example: { word: 'メール', reading: 'meeru', meaning: 'Email' } },
  { id: 'k_mo', character: 'モ', romaji: 'mo', type: 'katakana', row: 'm', strokeCount: 3, mnemonic: 'Mirip hiragana も dengan sudut kaku.', example: { word: 'モニター', reading: 'monitaa', meaning: 'Monitor' } },

  // Y-row
  { id: 'k_ya', character: 'ヤ', romaji: 'ya', type: 'katakana', row: 'y', strokeCount: 2, mnemonic: 'Mirip hiragana や versi ringkas.', example: { word: 'ヤード', reading: 'yaado', meaning: 'Halaman / Yard' } },
  { id: 'k_yu', character: 'ユ', romaji: 'yu', type: 'katakana', row: 'y', strokeCount: 2, mnemonic: 'Kail pancing ikan.', example: { word: 'ユーザー', reading: 'yuuzaa', meaning: 'Pengguna' } },
  { id: 'k_yo', character: 'ヨ', romaji: 'yo', type: 'katakana', row: 'y', strokeCount: 3, mnemonic: 'Huruf alfabet E terbalik (yo-yo).', example: { word: 'ヨーグルト', reading: 'yooguruto', meaning: 'Yoghurt' } },

  // R-row
  { id: 'k_ra', character: 'ラ', romaji: 'ra', type: 'katakana', row: 'r', strokeCount: 2, mnemonic: 'Lampu gantung plafon.', example: { word: 'ラジオ', reading: 'rajio', meaning: 'Radio' } },
  { id: 'k_ri', character: 'リ', romaji: 'ri', type: 'katakana', row: 'r', strokeCount: 2, mnemonic: 'Dua pita vertikal (ribbon).', example: { word: 'リーダー', reading: 'riidaa', meaning: 'Pemimpin' } },
  { id: 'k_ru', character: 'ル', romaji: 'ru', type: 'katakana', row: 'r', strokeCount: 2, mnemonic: 'Akar pohon melengkung (roots).', example: { word: 'ルール', reading: 'ruuru', meaning: 'Aturan / Rule' } },
  { id: 'k_re', character: 'レ', romaji: 're', type: 'katakana', row: 'r', strokeCount: 1, mnemonic: 'Tanda centang checklist.', example: { word: 'レストラン', reading: 'resutoran', meaning: 'Restoran' } },
  { id: 'k_ro', character: 'ロ', romaji: 'ro', type: 'katakana', row: 'r', strokeCount: 3, mnemonic: 'Kotak persegi robot.', example: { word: 'ロボット', reading: 'robotto', meaning: 'Robot' } },

  // W-row & N
  { id: 'k_wa', character: 'ワ', romaji: 'wa', type: 'katakana', row: 'w', strokeCount: 2, mnemonic: 'Cangkir piala anggur (wine).', example: { word: 'ワイン', reading: 'wain', meaning: 'Anggur / Wine' } },
  { id: 'k_wo', character: 'ヲ', romaji: 'wo', type: 'katakana', row: 'w', strokeCount: 3, mnemonic: 'Bentuk kait kail pancing.', example: { word: 'ヲタク', reading: 'wotaku', meaning: 'Otaku' } },
  { id: 'k_n', character: 'ン', romaji: 'n', type: 'katakana', row: 'n', strokeCount: 2, mnemonic: 'Mata tersenyum ke samping (mirip シ tapi garis dari bawah).', example: { word: 'パン', reading: 'pan', meaning: 'Roti' } },
];

export const TOTAL_KANA_COUNT = HIRAGANA_DATA.length + KATAKANA_DATA.length;

