import { IssueItem, ServiceItem, MediaItem, QuizQuestion } from '../types';

export const SITE_CONFIG = {
  name: "Bio Enerji",
  practitioner: "Osman Özden",
  title: "Holistik Olumlama & Bioenerji Uygulayıcısı",
  tagline: "Enerjinin Aktığı Yerde Şifa Büyür. İçindeki Işık Bedeni ve Şifacıyı Uyandır.",
  phone: "0 533 814 24 94",
  whatsappNumber: "905338142494",
  instagram: "@hayatbensendendahaguzelim",
  instagramUrl: "https://www.instagram.com/hayatbensendendahaguzelim/",
  location: "Ankara & Online Seanslar",
  freeFirstSessionText: "İlk Ön Görüşme Yüz Yüze / Online Olarak Yapılır ve ÜCRETSİZDİR.",
};

export const THREE_CORE_ISSUES: IssueItem[] = [
  {
    id: 1,
    title: "Sana Ait Olmayan Duygular",
    subtitle: "Çevresel Duygu ve Yük Transferi",
    description: "Bazı insanların veya ortamların yanında aniden enerjinizin düştüğünü, sebepsiz bir ağırlık ve hüzün çöktüğünü hissediyorsanız; bu bir tesadüf değil, çevrenin negatif duygusal yükünü üzerinize çekmenizdir.",
    icon: "ShieldAlert",
    actionText: "Aura Kalkanını Güçlendir",
    quote: "Kimse bunu açık açık söylemiyor ama enerji düşüklüğünün en büyük sebebi sana ait olmayan duygulardır."
  },
  {
    id: 2,
    title: "Bitmemiş Bağlar ve Geçmişin Yükü",
    subtitle: "Görünmez Enerji Kordonları",
    description: "Unuttuğunuzu sandığınız kişiler, eski kırgınlıklar veya çözülmemiş bağlar enerji alanınızda hâlâ yer kaplıyor olabilir. Bu durum yeni kısmetlerin, huzurun ve canlılığın önünde görünmez bir set oluşturur.",
    icon: "Link2Off",
    actionText: "Bağları Arındır & Serbest Bırak",
    quote: "Hayatında sürekli aynı şeyleri yaşıyorsan bu tesadüf değil, enerji alanındaki tekrar eden bir döngüdür."
  },
  {
    id: 3,
    title: "Aura Tıkanıklıkları & Kronik Yorgunluk",
    subtitle: "Sebepsiz Ağırlaşma ve Dinlenememe",
    description: "10 saat uyusanız bile yorgun uyanıyor, karar vermekte zorlanıyor ve sebepsiz kaygı hissediyorsanız; çakra merkezlerindeki ve meridyenlerdeki yaşam enerjisi (Chi / Ki / Prana) akışı tıkanmış demektir.",
    icon: "BatteryLow",
    actionText: "Doğal Enerji Akışını Yenile",
    quote: "Çoğu insan bu ağırlığı 'normal' sanıyor. Değil! Doğal frekansınıza dönmek mümkün."
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    id: "holos",
    title: "Holistik Bakış (Holos - Bütünlük)",
    subtitle: "Zihin, Beden ve Ruhun Senfonisi",
    content: "Holistik kelimesi Yunanca 'holos' (tam, bütün) kökünden gelir. İnsanı parçalara bölmeden; zihinsel düşüncelerini, bedensel hislerini ve ruhsal frekansını bir bütün olarak ele alma sanatıdır.",
    icon: "Sparkles",
    image: "/assets/foto_x/foto_3.jpg"
  },
  {
    id: "affirmation",
    title: "Olumlama: İç Potansiyelin Uyanışı",
    subtitle: "Dış Müdahale Değil, İçsel Hatırlama",
    content: "Holistik olumlama, dışarıdan size yapılan yapay bir müdahale değildir. Kişinin kendi iç bilgeliğiyle, öz potansiyeliyle yeniden temas kurması ve kendi kendini dengeleme yeteneğini aktive etmesidir.",
    icon: "HeartPulse",
    image: "/assets/foto_x/foto_5.jpg"
  },
  {
    id: "lightbody",
    title: "Işık Beden (Evrensel Enerji Alanı)",
    subtitle: "Fiziksel Bedenin Ötesindeki Alan",
    content: "Kadim öğretilere göre evrenin özü ışıktır. İnsan yalnızca et ve kemikten ibaret değildir; etrafında titreşen enerji bedenleri bulunur. En yüksek katman ise arındırılmış Işık Beden'dir.",
    icon: "Sun",
    image: "/assets/foto_x/foto_1.jpg"
  },
  {
    id: "destiny",
    title: "Zaman ve İlahi Akış",
    subtitle: "Doğum Bile 9 Ay Sürer ve Sancısız Olmaz",
    content: "Her şey bir anda sihirli bir değnekle değişmez. Hayatın yenilenmesi bir süreçtir. Ben sadece bu yolu seninle sırtlanıp yükünü hafifleterek kolaylaştırmak için bir rehberim.",
    icon: "Clock",
    image: "/assets/foto_x/foto_7.jpg"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "cakra-bioenerji",
    title: "Bioenerji & Çakra Dengeleme",
    badge: "En Çok Tercih Edilen",
    summary: "7 ana çakra merkezindeki blokajların tespiti, temizlenmesi ve yaşam enerjisi (Prana/Ki) akışının yeniden dengelenmesi.",
    details: [
      "Kök çakradan Taç çakraya kadar frekans uyumlaması",
      "Aura alanındaki negatif titreşimlerin arındırılması",
      "Bölgesel enerji sıkışmalarının serbest bırakılması"
    ],
    benefits: ["Derin rahatlama", "Canlılık ve zindelik", "Konsantrasyon artışı"],
    sessionDuration: "45 - 60 Dakika",
    glowColor: "from-purple-500/20 to-indigo-500/20",
    image: "/assets/foto_x/foto_4.jpg"
  },
  {
    id: "holistik-olumlama",
    title: "Holistik Olumlama & Bilinçaltı Dönüşüm",
    badge: "Bütünsel Seans",
    summary: "Geçmişten gelen duygusal travmaların, döngülerin ve sınırlayıcı inançların sevgi ve yüksek frekansla dönüştürülmesi.",
    details: [
      "Bilinçdışı negatif inanç kalıplarının tespiti",
      "Kişiye özel rezonans ve olumlama haritası",
      "Ruhsal ve zihinsel sakinleşme protokolü"
    ],
    benefits: ["İçsel huzur", "Karar verme netliği", "Duygusal yüklerden kurtulma"],
    sessionDuration: "60 Dakika",
    glowColor: "from-amber-500/20 to-purple-500/20",
    image: "/assets/foto_x/foto_5.jpg"
  },
  {
    id: "bag-kesme-arindirma",
    title: "Bitmemiş Bağları Arındırma & Aura Kalkanı",
    badge: "Özel Seans",
    summary: "Eski ilişkilerden, toksik ortamlardan veya negatif tesirlerden kalan enerjisel bağların şifalandırılarak serbest bırakılması.",
    details: [
      "Enerji kordonlarının tespiti ve sevgiyle nötrlenmesi",
      "Aura alanının güçlendirilmesi ve kalkan oluşturulması",
      "Bağımlılık hissi veren enerjisel bağların temizlenmesi"
    ],
    benefits: ["Özgürleşme hissi", "Kendi enerjisine sahip çıkma", "Geleceğe güvenle bakma"],
    sessionDuration: "50 Dakika",
    glowColor: "from-cyan-500/20 to-blue-500/20",
    image: "/assets/foto_x/foto_6.jpg"
  },
  {
    id: "mekan-alan-temizligi",
    title: "Mekan & Yaşam Alanı Enerji Arındırma",
    badge: "Mekan Seansı",
    summary: "Ev, ofis veya çalışma alanlarında biriken ağırlaşmış, durağan veya çatışmalı enerjilerin kadim tekniklerle dengelenmesi.",
    details: [
      "Mekanın jeopatik ve duygusal hafızasının arındırılması",
      "Daha huzurlu ve bereketli bir frekans alanı oluşturulması",
      "Antika ve taşınmış eşyaların enerji temizliği"
    ],
    benefits: ["Evde huzur", "Verimli uyku ve çalışma ortamı", "Ferah atmosfer"],
    sessionDuration: "Ön İncelemeye Göre",
    glowColor: "from-emerald-500/20 to-teal-500/20",
    image: "/assets/foto_x/foto_10.jpg"
  }
];

export const HEALER_MANIFESTO = {
  intro: "Ben Rabbimin ve Evrenin bana bahşettiği pozitif bir enerji akışıyla, insanların kendi iç şifacılarıyla buluşmasına vesile oluyorum.",
  quotes: [
    "Bazı mekanlar vardır içine girdiğinizde sesiniz kısılır; bazı insanlar vardır yanına gittiğinizde kalbinizin ritmi değişir, huzura kavuşursunuz.",
    "Doğum bile 9 ay sürer ve sancısız olmaz. Hayatınızdaki dönüşüm de bir süreçtir; ben bu yükü sizinle birlikte sırtlanıp hafifletmek için buradayım.",
    "Hocam en sevdiğiniz yer neresi? dediklerinde derim ki: 'En sevdiğim yer, en sevdiğim insanlarla birlikte olduğum andır.'"
  ],
  acceptanceConditions: [
    "Ön görüşme yapmadan, karşılıklı enerjimizi hissetmeden hiçbir seansa başlamıyorum.",
    "Sadece şifalanmaya, sorumluluk almaya ve kendi içsel dönüşümüne hazır danışanlarla çalışıyorum.",
    "Sayılar, şifreler veya hazır kalıplar değil; her bireyin kendi ruhsal ihtiyacına göre tamamen kişiye özel çalışma yürütüyorum.",
    "İlk ön görüşme hem yüz yüze hem de online olarak tamamen ÜCRETSİZDİR."
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Sabahları uyandığınızda veya gün içinde en çok hangisini deneyimliyorsunuz?",
    options: [
      { label: "A", text: "10 saat uyusam bile geçmeyen ağır bir yorgunluk ve bitkinlik", chakraHint: "Kök ve Sakral Çakra Dengesizliği" },
      { label: "B", text: "Sürekli geçmişteki insanları veya olayları düşünüp iç huzursuzluk yaşama", chakraHint: "Kalp Çakrası & Enerjisel Bağ Yükü" },
      { label: "C", text: "Zihnimde durmayan düşünce fırtınası, odaklanamama ve kafa karışıklığı", chakraHint: "Üçüncü Göz ve Taç Çakra Aşırı Yüklenmesi" },
      { label: "D", text: "İçimde adını koyamadığım bir kaygı, sebepsiz öfke veya daralma", chakraHint: "Solar Pleksus ve Aura Tıkanıklığı" }
    ]
  },
  {
    id: 2,
    question: "Kalabalık ortamlara veya belirli kişilerin yanına girdiğinizde ne hissediyorsunuz?",
    options: [
      { label: "A", text: "Aniden enerjim çekiliyor, omzumda ve ensemde ağırlık başlıyor", chakraHint: "Aura Kalkanı Geçirgenliği" },
      { label: "B", text: "Karşımdakinin tüm negatif derdini ve acısını kendi üstüme alıyorum", chakraHint: "Empat Yük Transferi" },
      { label: "C", text: "Hızlıca o ortamdan kaçma ve yalnız kalma isteği duyuyorum", chakraHint: "Topraklanma İhtiyacı" },
      { label: "D", text: "Genelde nötr kalabiliyorum ama eve gelince tükenmiş hissediyorum", chakraHint: "Enerji Boşalması" }
    ]
  },
  {
    id: 3,
    question: "Hayatınızda tekrar eden durumlar fark ediyor musunuz?",
    options: [
      { label: "A", text: "Evet, sürekli benzer tipte beni kıran veya tüketen insanlarla karşılaşıyorum", chakraHint: "Döngüsel Rezonans Blokajı" },
      { label: "B", text: "İşler tam yoluna girecekken hep son anda bir aksilik veya tıkanıklık çıkıyor", chakraHint: "Bilinçaltı Başarı/Kısmet Engeli" },
      { label: "C", text: "Kendimi sürekli değersiz ve yetersiz hissettiren döngülerdeyim", chakraHint: "Öz Saygı & Holistik Olumlama Gereksinimi" },
      { label: "D", text: "Hayatımda genel bir tıkanma var, ne yöne gideceğimi bilemiyorum", chakraHint: "Yaşam Amacı & Enerji Yönlendirmesi" }
    ]
  }
];

// FOTO_X Klasöründeki 17 Standart (600x900) Özgün Fotoğraf Arşivi
export const GALLERY_ITEMS: MediaItem[] = [
  {
    id: "f1",
    type: "image",
    title: "Osman Özden - Işık Beden & Aura Rezonansı",
    subtitle: "Holistik Olumlama & Yaşam Enerjisi Rehberi",
    url: "/assets/foto_x/foto_1.jpg",
    category: "aura"
  },
  {
    id: "f2",
    type: "image",
    title: "Birebir Bioenerji & Seans Çalışması",
    subtitle: "Çakra merkezlerinin arındırılması ve frekans uyumu",
    url: "/assets/foto_x/foto_2.jpg",
    category: "seans"
  },
  {
    id: "f3",
    type: "image",
    title: "Işık Beden Katmanları & Kozmik Şifa",
    subtitle: "Ruh, Zihin ve Bedenin Bütüncül Dengesi",
    url: "/assets/foto_x/foto_3.jpg",
    category: "aura"
  },
  {
    id: "f4",
    type: "image",
    title: "Çakra Dengeleme & Enerji Uyumlaması",
    subtitle: "7 Ana Çakra hattında blokaj temizliği",
    url: "/assets/foto_x/foto_4.jpg",
    category: "seans"
  },
  {
    id: "f5",
    type: "image",
    title: "İçindeki Şifacıyı Uyandır",
    subtitle: "Öz potansiyel ve bilinçaltı dönüşümü",
    url: "/assets/foto_x/foto_5.jpg",
    category: "kadim"
  },
  {
    id: "f6",
    type: "image",
    title: "Bitmemiş Bağları Arındırma Protokolü",
    subtitle: "Görünmez enerji kordonlarının sevgiyle serbest kalması",
    url: "/assets/foto_x/foto_6.jpg",
    category: "seans"
  },
  {
    id: "f7",
    type: "image",
    title: "Doğal Enerji Akışı ve Topraklanma",
    subtitle: "Doğa ile tam uyum ve dinginlik",
    url: "/assets/foto_x/foto_7.jpg",
    category: "nature"
  },
  {
    id: "f8",
    type: "image",
    title: "Blokaj Tespiti ve Holistik Teşhis",
    subtitle: "Kişiye özel rezonans değerlendirmesi",
    url: "/assets/foto_x/foto_8.jpg",
    category: "seans"
  },
  {
    id: "f9",
    type: "image",
    title: "İçsel Farkındalık ve Meditasyon",
    subtitle: "Zihinsel sessizlik ve arınma yolculuğu",
    url: "/assets/foto_x/foto_9.jpg",
    category: "aura"
  },
  {
    id: "f10",
    type: "image",
    title: "Mekan ve Yaşam Alanı Temizliği",
    subtitle: "Ev ve ofislerde durağan enerjilerin dağıtılması",
    url: "/assets/foto_x/foto_10.jpg",
    category: "kadim"
  },
  {
    id: "f11",
    type: "image",
    title: "Kadim Bilgelik ve Seans Odaklanması",
    subtitle: "Sezgisel ve doğal enerji aktarımı",
    url: "/assets/foto_x/foto_11.jpg",
    category: "kadim"
  },
  {
    id: "f12",
    type: "image",
    title: "Ruhsal Dengeleme & İçsel Huzur",
    subtitle: "Kaygı ve stresin yerini alan dinginlik",
    url: "/assets/foto_x/foto_12.jpg",
    category: "aura"
  },
  {
    id: "f13",
    type: "image",
    title: "Aura Kalkanı ve Enerji Koruması",
    subtitle: "Çevresel negatif enerjilere karşı güçlü kalkan",
    url: "/assets/foto_x/foto_13.jpg",
    category: "aura"
  },
  {
    id: "f14",
    type: "image",
    title: "Holistik Şifa ve Yaşam Dönüşümü",
    subtitle: "Tekrarlayan kader döngülerini dönüştürme",
    url: "/assets/foto_x/foto_14.jpg",
    category: "seans"
  },
  {
    id: "f15",
    type: "image",
    title: "Derin Meditatif Gevşeme",
    subtitle: "Teta frekansında hücresel yenilenme",
    url: "/assets/foto_x/foto_15.jpg",
    category: "nature"
  },
  {
    id: "f16",
    type: "image",
    title: "Öz Potansiyelin Hatırlanması",
    subtitle: "Dış müdahale değil, içsel uyanış",
    url: "/assets/foto_x/foto_16.jpg",
    category: "kadim"
  },
  {
    id: "f17",
    type: "image",
    title: "Yaşam Enerjisi (Prana / Ki) Akışı",
    subtitle: "Canlılık, zindelik ve berrak zihin",
    url: "/assets/foto_x/foto_17.jpg",
    category: "aura"
  }
];

export const VIDEO_SHOWCASE = {
  title: "Osman Özden ile Bioenerji ve Seans Deneyimi",
  subtitle: "Enerji Alanında Bir Yolculuk (Özel Video Kesiti)",
  videoUrl: "/assets/IMG_8377.MP4",
  poster: "/assets/foto_x/foto_1.jpg"
};

export const FAQ_ITEMS = [
  {
    question: "İlk ön görüşme neden ücretsizdir?",
    answer: "Çünkü her uygulayıcı her danışanla frekans uyumu yakalayamayabilir. Biz öncelikle sizin ihtiyacınızı, enerjinizi dinler; birlikte yol alıp alamayacağımıza karşılıklı karar veririz. Bu süreç tamamen samimi ve ücretsizdir."
  },
  {
    question: "Bioenerji seansları tıp tedavisinin yerine geçer mi?",
    answer: "Kesinlikle hayır. Çalışmalarımız herhangi bir tıbbi teşhis, tedavi veya terapi içermez. Tamamlayıcı, holistik bir kişisel gelişim ve yaşam enerjisi dengeleme sürecidir. Fiziksel rahatsızlıklarınızda mutlaka hekiminize danışınız."
  },
  {
    question: "Online seanslar da yüz yüze seanslar kadar etkili midir?",
    answer: "Kuantum fiziği ve kadim enerji öğretilerine göre bilinç ve kuantum alanında zaman ve mekan kısıtlaması yoktur. Doğru odaklanma ve rezonans ile online seanslar da birebir seanslar kadar güçlü etki sağlar."
  },
  {
    question: "Kaç seans almam gerekir?",
    answer: "Kişinin yaşadığı blokajın derinliğine, döngünün geçmişine ve enerjisel alıcılığına göre değişir. Çoğu danışanımızda 1 ile 3 seans arasında belirgin ferahlama ve dönüşüm gözlemlenmektedir."
  }
];

export const LEGAL_DISCLAIMER = `YASAL UYARI VE ETİK BİLGİLENDİRME:
Web sitemizde ve Osman Özden tarafından sunulan seanslarda yer alan tüm paylaşımlar bilgilendirme ve kişisel gelişim amaçlıdır. Çalışmalarımız TIBBİ TEDAVİ, TEŞHİS, PSİKOTERAPİ veya İLAÇ önerisi İÇERMEZ. 1219 sayılı Tababet ve Şuabatı San'atlarının Tarzı İcrasına Dair Kanun kapsamında yetkili sağlık kuruluşlarının görev alanına giren tıbbi bir müdahale niteliğinde değildir. Herhangi bir fiziksel veya psikolojik rahatsızlığınız için öncelikle uzman bir tıp doktoruna başvurunuz.`;
