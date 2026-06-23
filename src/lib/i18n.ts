export type Lang = "id" | "en" | "zh";

export const LANGS: { code: Lang; label: string; sub: string }[] = [
  { code: "id", label: "Indonesia", sub: "Bahasa Indonesia" },
  { code: "en", label: "English", sub: "English" },
  { code: "zh", label: "中文", sub: "Chinese" },
];

export type Dict = {
  chooseLang: string;
  enter: string;
  openInvitation: string;
  tapToOpen: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  detailTitle: string;
  detailIntro: string;
  date: string;
  time: string;
  venue: string;
  rsvpShort: string;
  dateValue: string;
  timeValue: string;
  venueName: string;
  venueAddr: string;
  rsvpPhone: string;
  galleryTitle: string;
  galleryIntro: string;
  rsvpTitle: string;
  rsvpIntro: string;
  fieldName: string;
  namePlaceholder: string;
  attendance: string;
  attend: string;
  cannotAttend: string;
  numGuests: string;
  message: string;
  messagePlaceholder: string;
  confirmBtn: string;
  footerText: string;
  footerSig: string;
  waMessage: (n: string, a: string, g: string, m: string) => string;
  musicOn: string;
  musicOff: string;
  replayInvitation: string;
  scrollHint: string;
  // countdown
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  countdownDone: string;
  // calendar + share
  addToCalendar: string;
  share: string;
  shareTitle: string;
  shareText: string;
  linkCopied: string;
  copyLink: string;
  // language switcher
  switchLang: string;
  // gallery
  galleryCaption1: string;
  galleryCaption2: string;
  galleryCaption3: string;
  galleryCaption4: string;
  galleryCaption5: string;
  galleryCaption6: string;
  // attire
  attireLabel: string;
  attireValue: string;
  // section nav labels
  navHero: string;
  // guestbook
  guestbookTitle: string;
  guestbookIntro: string;
  wishName: string;
  wishNamePlaceholder: string;
  wishMessage: string;
  wishMessagePlaceholder: string;
  wishSubmit: string;
  wishEmpty: string;
  wishFrom: string;
  guestbookCount: (n: number) => string;
  backToTop: string;
  print: string;
};

const en: Dict = {
  chooseLang: "Please select your language",
  enter: "Enter",
  openInvitation: "Open Invitation",
  tapToOpen: "Tap to open",
  heroEyebrow: "We warmly invite you to celebrate our",
  heroTitleLine1: "1st Anniversary",
  heroTitleLine2: "Bali Office",
  heroSubtitle: "A year of gratitude, care, and togetherness",
  detailTitle: "Event Detail",
  detailIntro: "We look forward to welcoming you to an elegant afternoon of celebration.",
  date: "Date",
  time: "Time",
  venue: "Venue",
  rsvpShort: "RSVP",
  dateValue: "Tuesday, July 28, 2026",
  timeValue: "10 AM",
  venueName: "Golden Tulip Jineng Resort",
  venueAddr: "Jl. Sunset Road No.98, Kuta, Kec. Kuta, Kabupaten Badung, Bali",
  rsvpPhone: "0857 1055 8888 · Marlyne",
  galleryTitle: "Moments of Togetherness",
  galleryIntro: "A glimpse of the warmth and care we share with our community.",
  rsvpTitle: "RSVP Confirmation",
  rsvpIntro: "Kindly confirm your attendance so we may welcome you beautifully.",
  fieldName: "Name",
  namePlaceholder: "Your full name",
  attendance: "Attendance",
  attend: "Will attend",
  cannotAttend: "Cannot attend",
  numGuests: "Number of guests",
  message: "Message",
  messagePlaceholder: "A warm message (optional)",
  confirmBtn: "Confirm via WhatsApp",
  footerText: "Your presence will mean a lot to us.",
  footerSig: "Modern Cancer Hospital Guangzhou · St. Stamford International Medical",
  waMessage: (n, a, g, m) =>
    `Hello Marlyne, I would like to confirm my attendance for the 1st Anniversary Bali Office event.\n\nName: ${n}\nAttendance: ${a}\nNumber of guests: ${g}\nMessage: ${m}\n\nThank you.`,
  musicOn: "Music on",
  musicOff: "Music off",
  replayInvitation: "Replay invitation",
  scrollHint: "Scroll to explore",
  countdownTitle: "Counting down to our celebration",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  countdownDone: "Today is the day",
  addToCalendar: "Add to Calendar",
  share: "Share",
  shareTitle: "1st Anniversary · Bali Office",
  shareText: "You are warmly invited to the 1st Anniversary of the Bali Office — Modern Cancer Hospital Guangzhou.",
  linkCopied: "Link copied",
  copyLink: "Copy link",
  switchLang: "Language",
  galleryCaption1: "Celebration",
  galleryCaption2: "Care & Community",
  galleryCaption3: "Our Team",
  galleryCaption4: "Venue",
  galleryCaption5: "Anniversary",
  galleryCaption6: "Gratitude",
  attireLabel: "Attire",
  attireValue: "Formal · Batik welcome",
  navHero: "Invitation",
  guestbookTitle: "Wishes & Greetings",
  guestbookIntro: "Leave a warm wish for our first anniversary.",
  wishName: "Name",
  wishNamePlaceholder: "Your name",
  wishMessage: "Your wish",
  wishMessagePlaceholder: "Share a heartfelt message…",
  wishSubmit: "Send wish",
  wishEmpty: "No wishes yet. Be the first to leave one.",
  wishFrom: "— from",
  guestbookCount: (n) => `${n} wish${n === 1 ? "" : "es"}`,
  backToTop: "Back to top",
  print: "Print invitation",
};

const id: Dict = {
  chooseLang: "Silakan pilih bahasa Anda",
  enter: "Masuk",
  openInvitation: "Buka Undangan",
  tapToOpen: "Ketuk untuk membuka",
  heroEyebrow: "Dengan hangat kami mengundang Anda untuk merayakan",
  heroTitleLine1: "Ulang Tahun Pertama",
  heroTitleLine2: "Kantor Bali",
  heroSubtitle: "Satu tahun penuh rasa syukur, kepedulian, dan kebersamaan",
  detailTitle: "Detail Acara",
  detailIntro: "Kami menantikan kehadiran Anda dalam perayaan yang penuh kehangatan.",
  date: "Tanggal",
  time: "Waktu",
  venue: "Lokasi",
  rsvpShort: "RSVP",
  dateValue: "Selasa, 28 Juli 2026",
  timeValue: "Pukul 10.00",
  venueName: "Golden Tulip Jineng Resort",
  venueAddr: "Jl. Sunset Road No.98, Kuta, Kec. Kuta, Kabupaten Badung, Bali",
  rsvpPhone: "0857 1055 8888 · Marlyne",
  galleryTitle: "Momen Kebersamaan",
  galleryIntro: "Sekilas kehangatan dan kepedulian yang kami bagikan bersama komunitas.",
  rsvpTitle: "Konfirmasi Kehadiran",
  rsvpIntro: "Mohon konfirmasi kehadiran Anda agar kami dapat menyambut dengan baik.",
  fieldName: "Nama",
  namePlaceholder: "Nama lengkap Anda",
  attendance: "Kehadiran",
  attend: "Akan hadir",
  cannotAttend: "Tidak dapat hadir",
  numGuests: "Jumlah tamu",
  message: "Pesan",
  messagePlaceholder: "Pesan hangat (opsional)",
  confirmBtn: "Konfirmasi via WhatsApp",
  footerText: "Kehadiran Anda akan sangat berarti bagi kami.",
  footerSig: "Modern Cancer Hospital Guangzhou · St. Stamford International Medical",
  waMessage: (n, a, g, m) =>
    `Halo Marlyne, saya ingin mengonfirmasi kehadiran untuk acara Ulang Tahun Pertama Kantor Bali.\n\nNama: ${n}\nKehadiran: ${a}\nJumlah tamu: ${g}\nPesan: ${m}\n\nTerima kasih.`,
  musicOn: "Musik aktif",
  musicOff: "Musik mati",
  replayInvitation: "Putar ulang undangan",
  scrollHint: "Gulir untuk menjelajah",
  countdownTitle: "Menghitung hari menuju perayaan kami",
  days: "Hari",
  hours: "Jam",
  minutes: "Menit",
  seconds: "Detik",
  countdownDone: "Hari ini adalah harinya",
  addToCalendar: "Tambah ke Kalender",
  share: "Bagikan",
  shareTitle: "Ulang Tahun Pertama · Kantor Bali",
  shareText: "Anda diundang hangat ke perayaan Ulang Tahun Pertama Kantor Bali — Modern Cancer Hospital Guangzhou.",
  linkCopied: "Tautan disalin",
  copyLink: "Salin tautan",
  switchLang: "Bahasa",
  galleryCaption1: "Perayaan",
  galleryCaption2: "Kepedulian & Komunitas",
  galleryCaption3: "Tim Kami",
  galleryCaption4: "Lokasi Acara",
  galleryCaption5: "Ulang Tahun",
  galleryCaption6: "Rasa Syukur",
  attireLabel: "Busana",
  attireValue: "Formal · Batik diterima",
  navHero: "Undangan",
  guestbookTitle: "Ucapan & Doa",
  guestbookIntro: "Tinggalkan ucapan hangat untuk ulang tahun pertama kami.",
  wishName: "Nama",
  wishNamePlaceholder: "Nama Anda",
  wishMessage: "Ucapan Anda",
  wishMessagePlaceholder: "Bagikan pesan tulus…",
  wishSubmit: "Kirim ucapan",
  wishEmpty: "Belum ada ucapan. Jadilah yang pertama.",
  wishFrom: "— dari",
  guestbookCount: (n) => `${n} ucapan`,
  backToTop: "Kembali ke atas",
  print: "Cetak undangan",
};

const zh: Dict = {
  chooseLang: "请选择您的语言",
  enter: "进入",
  openInvitation: "开启邀请函",
  tapToOpen: "点击开启",
  heroEyebrow: "诚挚邀请您一同庆祝",
  heroTitleLine1: "一周年纪念",
  heroTitleLine2: "巴厘岛办事处",
  heroSubtitle: "感恩、关怀与同行的一年",
  detailTitle: "活动详情",
  detailIntro: "期待在雅致的庆典中迎接您的到来。",
  date: "日期",
  time: "时间",
  venue: "地点",
  rsvpShort: "回执",
  dateValue: "2026年7月28日 星期二",
  timeValue: "上午10点",
  venueName: "Golden Tulip Jineng Resort",
  venueAddr: "Jl. Sunset Road No.98, Kuta, Kec. Kuta, Kabupaten Badung, Bali",
  rsvpPhone: "0857 1055 8888 · Marlyne",
  galleryTitle: "温暖时刻",
  galleryIntro: "一窥我们与社区分享的温暖与关怀。",
  rsvpTitle: "出席确认",
  rsvpIntro: "敬请确认您的出席，以便我们妥善接待。",
  fieldName: "姓名",
  namePlaceholder: "您的全名",
  attendance: "出席情况",
  attend: "将出席",
  cannotAttend: "无法出席",
  numGuests: "出席人数",
  message: "留言",
  messagePlaceholder: "温馨留言（可选）",
  confirmBtn: "通过 WhatsApp 确认",
  footerText: "您的到来对我们意义非凡。",
  footerSig: "广州现代肿瘤医院 · St. Stamford International Medical",
  waMessage: (n, a, g, m) =>
    `您好 Marlyne，我想确认出席巴厘岛办事处一周年纪念活动。\n\n姓名：${n}\n出席情况：${a}\n出席人数：${g}\n留言：${m}\n\n谢谢。`,
  musicOn: "音乐开启",
  musicOff: "音乐关闭",
  replayInvitation: "重播邀请函",
  scrollHint: "滚动浏览",
  countdownTitle: "距离庆典还有",
  days: "天",
  hours: "时",
  minutes: "分",
  seconds: "秒",
  countdownDone: "就是今天",
  addToCalendar: "添加到日历",
  share: "分享",
  shareTitle: "一周年纪念 · 巴厘岛办事处",
  shareText: "诚挚邀请您出席巴厘岛办事处一周年纪念庆典 — 广州现代肿瘤医院。",
  linkCopied: "链接已复制",
  copyLink: "复制链接",
  switchLang: "语言",
  galleryCaption1: "庆典",
  galleryCaption2: "关怀与社区",
  galleryCaption3: "我们的团队",
  galleryCaption4: "会场",
  galleryCaption5: "周年纪念",
  galleryCaption6: "感恩",
  attireLabel: "着装",
  attireValue: "正装 · 欢迎穿着巴迪克",
  navHero: "邀请函",
  guestbookTitle: "祝福与寄语",
  guestbookIntro: "为我们的一周年纪念留下温暖的祝福。",
  wishName: "姓名",
  wishNamePlaceholder: "您的姓名",
  wishMessage: "您的祝福",
  wishMessagePlaceholder: "分享一段真挚的话…",
  wishSubmit: "发送祝福",
  wishEmpty: "还没有祝福。成为第一个留言的人。",
  wishFrom: "—来自",
  guestbookCount: (n) => `${n} 条祝福`,
  backToTop: "回到顶部",
  print: "打印邀请函",
};

export const DICT: Record<Lang, Dict> = { id, en, zh };

export function cardFor(lang: Lang): string {
  if (lang === "zh") return "/invitation/card-zh.png";
  return "/invitation/card-en.png";
}
