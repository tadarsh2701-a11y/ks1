import { LanguageCode } from '../types/language';

export interface Pathway {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  topicIds: number[];
  color: string;
  duration: string;
}

export const curatedPathways: Pathway[] = [
  {
    id: 'deep-emotional-intimacy',
    title: 'Foundations of Connection & Communication',
    subtitle: 'From active listening to radical vulnerability and aftercare',
    description: 'A 7-topic journey to dismantle performance anxiety, establish safe emotional containers, and talk about desires with zero pressure.',
    icon: 'HeartHandshake',
    topicIds: [1, 2, 3, 4, 7, 10, 12],
    color: 'from-rose-500/20 to-pink-500/10 border-rose-200 dark:border-rose-900/50',
    duration: '1–2 Weeks'
  },
  {
    id: 'sensory-awakening',
    title: 'The Sensory Awakening & Slow Sex Path',
    subtitle: 'Awaken non-genital erogenous zones, breath sync, and thermal contrasts',
    description: 'Transform foreplay into an intoxicating multi-sensory landscape using massage, breath entrainment, temperature play, and blindfolds.',
    icon: 'Sparkles',
    topicIds: [16, 17, 26, 29, 34, 35, 70, 72],
    color: 'from-amber-500/20 to-orange-500/10 border-amber-200 dark:border-amber-900/50',
    duration: '2 Weeks'
  },
  {
    id: 'mastering-oral-manual',
    title: 'The Art of Oral & Manual Pleasure',
    subtitle: 'Comprehensive anatomical mastery for cunnilingus, fellatio, and G-spot/P-spot play',
    description: 'Master anatomical mapping, rhythm modulation, lubrication mastery, and the Kivin method for reliable, effortless climaxes.',
    icon: 'Flame',
    topicIds: [24, 25, 39, 40, 41, 42, 43, 44],
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-200 dark:border-purple-900/50',
    duration: '2–3 Weeks'
  },
  {
    id: 'ergonomics-positions',
    title: 'Positions, Angles & Ergonomic Mastery',
    subtitle: 'Unlock clitoral alignment, comfortable depth, and pillow hacks',
    description: 'Discover how the Coital Alignment Technique (CAT), slow pelvic grinding, and simple wedge pillows transform classic positions into toe-curling shared bliss.',
    icon: 'Compass',
    topicIds: [49, 50, 51, 52, 55, 60, 61, 62],
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-200 dark:border-emerald-900/50',
    duration: '2 Weeks'
  },
  {
    id: 'kink-power-adventure',
    title: 'Gentle Kink, Surrender & Power Dynamics',
    subtitle: 'Consensual dominance/submission, impact play, dirty talk, and blindfolds',
    description: 'Explore the intoxicating thrill of gentle power exchange, safe restraints, praise kinks, and dirty talk with ironclad safety rules and aftercare.',
    icon: 'ShieldCheck',
    topicIds: [70, 71, 76, 77, 78, 80, 81, 89],
    color: 'from-violet-500/20 to-purple-500/10 border-violet-200 dark:border-violet-900/50',
    duration: '3 Weeks'
  },
  {
    id: 'lifelong-vitality',
    title: 'Longevity, Pelvic Health & The Erotic Spark',
    subtitle: 'Sustain electric desire across decades, parenthood, and life transitions',
    description: 'Keep long-term passion ablaze using Esther Perel insights, pelvic floor mastery (Kegels & Reverse Kegels), scheduled intimacy, and evolving consent.',
    icon: 'Infinity',
    topicIds: [91, 92, 96, 97, 98, 99, 100, 101],
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-200 dark:border-blue-900/50',
    duration: 'Lifelong'
  }
];

const pathwayTranslations: Partial<Record<LanguageCode, Record<string, Partial<Pathway>>>> = {
  hi: {
    'deep-emotional-intimacy': {
      title: 'गहरे संबंध और संवाद की नींव',
      subtitle: 'सक्रिय सुनने से लेकर भावनात्मक खुलापन और सत्रोपरांत देखभाल तक',
      description: 'तनाव दूर करने, सुरक्षित संवाद स्थापित करने और बिना किसी दबाव के इच्छाएं साझा करने की 7 विषयों की यात्रा।',
      duration: '1–2 सप्ताह'
    },
    'sensory-awakening': {
      title: 'संवेदना जागृति और धीमी कामुकता का मार्ग',
      subtitle: 'गैर-जननांग संवेदनशील क्षेत्र, श्वास तालमेल और तापमान का अनुभव',
      description: 'मालिश, श्वास समन्वय और विभिन्न स्पर्शों के माध्यम से कामोत्तेजना को एक बहु-संवेदी अनुभव में बदलें।',
      duration: '2 सप्ताह'
    },
    'mastering-oral-manual': {
      title: 'मौखिक और हस्त स्पर्श की कला में महारत',
      subtitle: 'सुखद स्पर्श, लय और प्रमुख संवेदना केंद्रों की शारीरिक समझ',
      description: 'स्पर्श मानचित्रण, लय मॉड्यूलेशन और आनंददायक चरम सुख के लिए सहज तकनीकें।',
      duration: '2–3 सप्ताह'
    },
    'ergonomics-positions': {
      title: 'मुद्राएं, कोण और शारीरिक तालमेल',
      subtitle: 'सटीक कोण, आरामदायक गहराई और तकियों का उपयोग',
      description: 'कैट (CAT) तकनीक, धीमी लय और तकियों के उपयोग से मुद्राओं को साझा आनंद में बदलें।',
      duration: '2 सप्ताह'
    },
    'kink-power-adventure': {
      title: 'कोमल रोमांच और नई कल्पनाओं की खोज',
      subtitle: 'सहमति आधारित नेतृत्व, मीठी बातें और संवेदी खेल',
      description: 'सुरक्षित सीमाओं और पूर्ण सहमति के साथ अंतरंगता में नए रोमांच और कल्पनाओं का अनुभव।',
      duration: '3 सप्ताह'
    },
    'lifelong-vitality': {
      title: 'दीर्घकालिक आकर्षण और स्वास्थ्य',
      subtitle: 'दशकों तक, जीवन के हर पड़ाव में आकर्षण को जीवंत रखें',
      description: 'पेल्विक स्वास्थ्य, समयबद्ध अंतरंगता और बदलती इच्छाओं के साथ दीर्घकालिक प्रेम को बनाए रखें।',
      duration: 'जीवनपर्यंत'
    }
  },
  mr: {
    'deep-emotional-intimacy': {
      title: 'संवाद आणि भावनिक जवळीक पाया',
      subtitle: 'सक्रिय श्रवणापासून ते मोकळेपणा आणि काळजी घेण्यापर्यंत',
      description: 'तणाव कमी करण्यासाठी आणि कोणतीही भीती न बाळगता संवाद साधण्यासाठी ७ विषयांचा प्रवास.',
      duration: '१–२ आठवडे'
    },
    'sensory-awakening': {
      title: 'संवेदना जागृती व सावकाश प्रेम प्रवास',
      subtitle: 'संपूर्ण शरीराचा स्पर्श, श्वास समन्वय आणि संवेदी अनुभव',
      description: 'मालिश, श्वास आणि विविध स्पर्शांच्या माध्यमातून जवळीक वाढवण्याचा मार्ग.',
      duration: '२ आठवडे'
    },
    'mastering-oral-manual': {
      title: 'मौखिक आणि हस्त स्पर्श कला प्रभुत्व',
      subtitle: 'योग्य लय, कोमल दाब आणि शरीर रचना समजून घेणे',
      description: 'स्पर्श नकाशे आणि आनंददायी अनुभवांसाठी सहज व सुंदर तंत्रे.',
      duration: '२–३ आठवडे'
    },
    'ergonomics-positions': {
      title: 'मुद्रा, कोन आणि शारीरिक सुसंगती',
      subtitle: 'योग्य कोन, आरामदायी खोली आणि उशांचा वापर',
      description: 'कॅट (CAT) तंत्र आणि योग्य कोनांच्या मदतीने शारीरिक जवळीक वाढवा.',
      duration: '२ आठवडे'
    },
    'kink-power-adventure': {
      title: 'संमतीयुक्त थरार आणि नवीन कल्पना',
      subtitle: 'नेतृत्व, गोड संवाद आणि संवेदी खेळ',
      description: 'सुरक्षित सीमा आणि पूर्ण संमतीने नात्यात नवीन रंग भरा.',
      duration: '३ आठवडे'
    },
    'lifelong-vitality': {
      title: 'दीर्घकालीन प्रेम आणि आरोग्य',
      subtitle: 'आयुष्याच्या प्रत्येक टप्प्यावर आकर्षण टिकवून ठेवणे',
      description: 'आरोग्य, वेळेचे नियोजन आणि बदलत्या इच्छेनुसार नात्याचे नूतनीकरण.',
      duration: 'जीवनभर'
    }
  },
  bn: {
    'deep-emotional-intimacy': {
      title: 'গভীর মানসিক ঘনিষ্ঠতার ভিত্তি',
      subtitle: 'সক্রিয় শ্রবণ থেকে খোলামেলা আলোচনা ও পরবর্তী যত্ন',
      description: 'মানসিক চাপ দূর করে নিরাপদ যোগাযোগের মাধ্যমে ইচ্ছা প্রকাশের ৭টি বিষয়ের যাত্রা।',
      duration: '১–২ সপ্তাহ'
    },
    'sensory-awakening': {
      title: 'সংবেদনশীল জাগরণ ও ধীর প্রেমের পথ',
      subtitle: 'সম্পূর্ণ শরীরের স্পর্শ, শ্বাস তালমেল ও অনুভূতির খেলা',
      description: 'ম্যাসাজ ও মৃদু স্পর্শের মাধ্যমে উত্তেজনাকে বহুমাত্রিক অভিজ্ঞতায় রূপান্তর করুন।',
      duration: '২ সপ্তাহ'
    },
    'mastering-oral-manual': {
      title: 'হস্ত ও মৌখিক স্পর্শের দক্ষতা',
      subtitle: 'ছন্দ, মৃদু চাপ এবং সংবেদনশীল কেন্দ্রের শরীরতাত্ত্বিক জ্ঞান',
      description: 'স্পর্শের শিল্প এবং চরম আনন্দের জন্য সহজ-সুন্দর কৌশল।',
      duration: '২–৩ সপ্তাহ'
    },
    'ergonomics-positions': {
      title: 'আসন, কোণ এবং শারীরিক ছন্দ',
      subtitle: 'সঠিক কোণ, আরামদায়ক গভীরতা এবং কুশন ব্যবহার',
      description: 'ক্যাট (CAT) কৌশল ও কুশনের সাহায্যে আনন্দময় সঙ্গম উপভোগ করুন।',
      duration: '২ সপ্তাহ'
    },
    'kink-power-adventure': {
      title: 'সম্মতিপূর্ণ রোমাঞ্চ ও নতুন আবিষ্কার',
      subtitle: 'নেতৃত্ব, মিষ্টি কথা ও সংবেদনশীল খেলা',
      description: 'নিরাপদ সীমারেখা ও পূর্ণ সম্মতির সাথে সম্পর্কে নতুন রোমাঞ্চ যোগ করুন।',
      duration: '৩ সপ্তাহ'
    },
    'lifelong-vitality': {
      title: 'দীর্ঘমেয়াদী আকর্ষণ ও সুস্বাস্থ্য',
      subtitle: 'জীবনের প্রতিটি পর্যায়ে আকর্ষণ ও ভালোবাসা সজীব রাখা',
      description: 'পেলভিক স্বাস্থ্য ও পরিবর্তনের সাথে সাথে গভীর প্রেম বজায় রাখুন।',
      duration: 'আজীবন'
    }
  },
  te: {
    'deep-emotional-intimacy': {
      title: 'గాఢమైన భావోద్వేగ సాన్నిహిత్య పునాది',
      subtitle: 'శ్రద్ధగా వినడం నుండి మనసు విప్పి మాట్లాడటం మరియు సంరక్షణ వరకు',
      description: 'ఒత్తిడిని దూరం చేసి, భయం లేకుండా కోరికలను పంచుకోవడానికి 7 అంశాల ప్రయాణం.',
      duration: '1–2 వారాలు'
    },
    'sensory-awakening': {
      title: 'స్పర్శ జాగృతి మరియు నెమ్మదైన శృంగార మార్గం',
      subtitle: 'శరీర స్పర్శ, శ్వాస సమన్వయం మరియు ఉద్వేగాల అనుభూతి',
      description: 'మసాజ్ మరియు సున్నితమైన స్పర్శలతో ఉద్వేగాన్ని బహుళ అనుభూతిగా మార్చుకోండి.',
      duration: '2 వారాలు'
    },
    'mastering-oral-manual': {
      title: 'స్పర్శ మరియు నైపుణ్య కళలో ప్రావీణ్యం',
      subtitle: 'లయబద్ధమైన స్పర్శ, మృదువైన ఒత్తిడి మరియు శరీర కేంద్రాల జ్ఞానం',
      description: 'అద్భుతమైన ఆనందం కోసం సున్నితమైన స్పర్శా పద్ధతులు.',
      duration: '2–3 వారాలు'
    },
    'ergonomics-positions': {
      title: 'భంగిమలు, కోణాలు మరియు శారీరక సమన్వయం',
      subtitle: 'ఖచ్చితమైన కోణాలు, సౌకర్యవంతమైన లోతు మరియు దిండ్ల వాడకం',
      description: 'క్యాట్ (CAT) పద్ధతి మరియు దిండ్ల సహాయంతో సులభమైన శృంగార అనుభూతి.',
      duration: '2 వారాలు'
    },
    'kink-power-adventure': {
      title: 'సమ్మతితో కూడిన సాహసం మరియు కొత్త అనుభవాలు',
      subtitle: 'నాయకత్వం, మధురమైన సంభాషణలు మరియు స్పర్శ ఆటలు',
      description: 'సురక్షితమైన పరిమితులతో జీవితంలో కొత్త ఉత్సాహాన్ని నింపండి.',
      duration: '3 వారాలు'
    },
    'lifelong-vitality': {
      title: 'శాశ్వత ఆకర్షణ మరియు పరిపూర్ణ ఆరోగ్యం',
      subtitle: 'వయసుతో సంబంధం లేకుండా బంధంలో ప్రేమను నిరంతరం నిలుపుకోవడం',
      description: 'ఆరోగ్యం మరియు శారీరక దృఢత్వంతో కలకాలం నిలిచే అనుబంధం.',
      duration: 'జీవితాంతం'
    }
  },
  ta: {
    'deep-emotional-intimacy': {
      title: 'ஆழமான உணர்வுபூர்வ நெருக்கத்தின் அடித்தளம்',
      subtitle: 'கவனித்துக் கேட்பது முதல் மனந்திறந்து பேசுவது மற்றும் கவனிப்பு வரை',
      description: 'பயமின்றி ஆசைகளைப் பகிர்ந்துகொள்ளவும் பாதுகாப்பான பிணைப்பை உருவாக்கவும் 7 தலைப்புகள் கொண்ட பயணம்.',
      duration: '1–2 வாரங்கள்'
    },
    'sensory-awakening': {
      title: 'உணர்ச்சி விழிப்புணர்வு மற்றும் மெதுவான காதல் பாதை',
      subtitle: 'முழு உடல் தீண்டல், சுவாச ஒத்திசைவு மற்றும் உணர்வு விளையாட்டு',
      description: 'மசாஜ் மற்றும் மென்மையான தீண்டல் மூலம் காதலை பல பரிமாண அனுபவமாக மாற்றுங்கள்.',
      duration: '2 வாரங்கள்'
    },
    'mastering-oral-manual': {
      title: 'தீண்டல் மற்றும் தொடு உணர்வில் தேர்ச்சி',
      subtitle: 'சீரான லயம், மெல்லிய அழுத்தம் மற்றும் உடல் நுட்பங்களின் அறிவு',
      description: 'ஆழ்ந்த இன்பத்திற்கான எளிமையான மற்றும் நேர்த்தியான நுட்பங்கள்.',
      duration: '2–3 வாரங்கள்'
    },
    'ergonomics-positions': {
      title: 'நிலைகள், கோணங்கள் மற்றும் உடல் பொருத்தம்',
      subtitle: 'துல்லியமான கோணங்கள், சௌகரியமான ஆழம் மற்றும் தலையணைகளின் பயன்பாடு',
      description: 'கேட் (CAT) நுட்பம் மற்றும் தலையணைகள் மூலம் சௌகரியமான இணைவு.',
      duration: '2 வாரங்கள்'
    },
    'kink-power-adventure': {
      title: 'ஒப்புதலுடன் கூடிய புதிய சாகசங்கள்',
      subtitle: 'வழிநடத்துதல், இனிமையான உரையாடல் மற்றும் உணர்வுபூர்வ விளையாட்டு',
      description: 'பாதுகாப்பான எல்லைகளுடன் தாம்பத்தியத்தில் புதிய சுவாரஸ்யத்தை உருவாக்குங்கள்.',
      duration: '3 வாரங்கள்'
    },
    'lifelong-vitality': {
      title: 'நீடித்த ஈர்ப்பு மற்றும் ஆரோக்கியம்',
      subtitle: 'வாழ்வின் அனைத்து கட்டங்களிலும் காதலை உயிர்ப்புடன் வைத்திருத்தல்',
      description: 'உடல் நலம் மற்றும் மாற்றங்களுக்கு ஏற்ப காதலை நிலைநிறுத்துங்கள்.',
      duration: 'வாழ்நாள் முழுவதும்'
    }
  }
};

export function getLocalizedPathway(pathway: Pathway, lang: LanguageCode): Pathway {
  const langSpecific = pathwayTranslations[lang]?.[pathway.id];
  if (langSpecific) {
    return {
      ...pathway,
      ...langSpecific
    };
  }
  return pathway;
}

