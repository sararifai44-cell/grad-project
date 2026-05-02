// src/lib/galleryData.js

export const galleryData = [
  {
    id: "alhambra",
    name: "قصر الحمراء",
    theme: { primary: "#4A1C1C", secondary: "#C1A881", accent: "#FDF8F0" },
    title: "غرناطة - درة بني نصر",
    year: "١٣٧٠ م",
    style: "عصر نصري",
    description:
      "آخر معاقل المسلمين، يشتهر ببهو السباع ونقوش الجبس المعقدة التي تترجم عبقرية الهندسة النصّرية.",
    coverImage: "assets/download (24).jpg",
    mainView: {
      id: "main",
      title: "الإطلالة الشاملة",
      img: "/StreetView3360.jpg",
    },

    // 🔴 تم إلغاء الأقسام، الصور توضع هنا مباشرة
    views: [
      {
        id: "p1",
        title: "فناء الريحان",
        img: "/assets/alhambra/myrtles-courtyard.jpg",
      },
      {
        id: "p2",
        title: "قاعة السفراء",
        img: "/assets/alhambra/ambassadors.jpg",
      },
      {
        id: "p3",
        title: "نافورة السباع",
        img: "/assets/alhambra/lions-court.jpg",
      },
      {
        id: "p4",
        title: "قاعة الأختين",
        img: "/assets/alhambra/two-sisters.jpg",
      },
      {
        id: "g1",
        title: "فناء الساقية",
        img: "/assets/alhambra/water-patio.jpg",
      },
      {
        id: "g2",
        title: "الحدائق العليا",
        img: "/assets/alhambra/upper-gardens.jpg",
      },
      {
        id: "a1",
        title: "ساحة الأسلحة",
        img: "/assets/alhambra/plaza-armas.jpg",
      },
      {
        id: "c1",
        title: "الفناء الدائري",
        img: "/assets/alhambra/circular-patio.jpg",
      },
    ],
  },

  // ---------------- باقي المعالم ----------------

  {
    id: "cordoba",
    name: "جامع قرطبة",
    theme: { primary: "#3E2723", secondary: "#C1A881", accent: "#FDF8F0" },
    title: "قرطبة - جوهرة الأمويين",
    year: "٩٦١ م",
    style: "عصر أموي",
    description:
      "غابة من الأعمدة الرخامية والأقواس المزدوجة، يضم أجمل محراب في تاريخ العمارة الإسلامية.",
    coverImage: "assets/Córdoba.jfif",
    mainView: { id: "main", title: "غابة الأعمدة", img: "/StreetView3360.jpg" },
    views: [
      { id: "co1", title: "المحراب الأوسط", img: "/StreetView3360.jpg" },
      { id: "co2", title: "غابة الأعمدة", img: "/StreetView3360.jpg" },
      { id: "co3", title: "صحن النارنج", img: "/StreetView3360.jpg" },
    ],
  },

  {
    id: "azahara",
    name: "مدينة الزهراء",
    theme: { primary: "#3B4235", secondary: "#C1A881", accent: "#F4F1EA" },
    title: "قرطبة - عاصمة الخلافة",
    year: "٩٣٦ م",
    style: "عصر أموي",
    description:
      "المدينة الملكية التي بناها الناصر، تُمثل قمة الترف والتقدم المعماري في عصر الخلافة الأموية.",
    coverImage: "assets/Medina Azahara I (1).jfif",
    mainView: {
      id: "main",
      title: "الإطلالة الشاملة",
      img: "/StreetView3360.jpg",
    },
    views: [
      { id: "az1", title: "الصالة الغنية", img: "/StreetView3360.jpg" },
      { id: "az2", title: "أقواس الوزراء", img: "/StreetView3360.jpg" },
    ],
  },

  {
    id: "aljaferia",
    name: "قصر الجعفرية",
    theme: { primary: "#5C452D", secondary: "#C1A881", accent: "#FDF8F0" },
    title: "سرقسطة - فن الطوائف",
    year: "١٠٦٥ م",
    style: "عصر طوائف",
    description:
      "أهم معلم معماري من عصر ملوك الطوائف، يتميز بأقواسه متعددة الفصوص التي تعكس ثراء الفن في سرقسطة.",
    coverImage: "public/Testero_norte_4.jpg",
    mainView: {
      id: "main",
      title: "الواجهة الرئيسية",
      img: "/StreetView3360.jpg",
    },
    views: [
      { id: "al1", title: "مسجد القصر", img: "/StreetView3360.jpg" },
      { id: "al2", title: "الفناء الذهبي", img: "/StreetView3360.jpg" },
    ],
  },

  {
    id: "oro-tower",
    name: "برج الذهب",
    theme: { primary: "#634832", secondary: "#D4AF37", accent: "#FAF9F6" },
    title: "إشبيلية - حارس الوادي",
    year: "١٢٢٠ م",
    style: "عصر موحدي",
    description:
      "برج مراقبة عسكري بني لحماية إشبيلية، يطل على نهر الوادي الكبير ويعتبر رمزاً للهندسة العسكرية الأندلسية.",
    coverImage: "assets/shutterstock_234794842.jpg",
    mainView: { id: "main", title: "مطل النهر", img: "/StreetView3360.jpg" },
    views: [
      { id: "or1", title: "المتحف البحري", img: "/StreetView3360.jpg" },
      { id: "or2", title: "شرفة المراقبة", img: "/StreetView3360.jpg" },
    ],
  },

  {
    id: "alcazar-seville",
    name: "قصر المورق",
    theme: { primary: "#2D4A3E", secondary: "#C5A059", accent: "#FDF8F0" },
    title: "إشبيلية - فن المداجن",
    year: "١٣٦٤ م",
    style: "عصر نصري",
    description:
      "مجموعة من القصور الملكية التي تدمج الفن النصري مع العمارة المسيحية، مشكلةً ما يعرف بالفن 'المدجن'.",
    coverImage: "assets/Patio_de_las_doncellas.jpg",
    mainView: {
      id: "main",
      title: "الإطلالة الشاملة",
      img: "/StreetView3360.jpg",
    },
    views: [
      { id: "se1", title: "قاعة السفراء", img: "/StreetView3360.jpg" },
      { id: "se2", title: "فناء العذارى", img: "/StreetView3360.jpg" },
    ],
  },

  {
    id: "malaga-alcazaba",
    name: "قصبة مالقة",
    theme: { primary: "#5C3A21", secondary: "#B8860B", accent: "#F5F5DC" },
    title: "مالقة - الحصن المنيع",
    year: "١٠٥٧ م",
    style: "عصر طوائف",
    description:
      "تعتبر من أفضل القصبات المحفوظة في إسبانيا، تجمع بين التحصين العسكري وجمال القصور بحدائقها المطلة على البحر.",
    coverImage: "assets/WEB_B0005411.jpg_1759664593.jpg",
    mainView: {
      id: "main",
      title: "الإطلالة الشاملة",
      img: "/StreetView3360.jpg",
    },
    views: [
      { id: "ma1", title: "أقواس القصبة", img: "/StreetView3360.jpg" },
      { id: "ma2", title: "قصر الحمراء المصغر", img: "/StreetView3360.jpg" },
    ],
  },
];
