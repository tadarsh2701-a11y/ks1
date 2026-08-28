import { TopicItem } from '../types/topics';
import { LanguageCode } from '../types/language';

export function getTopicIntroduction(topic: TopicItem, lang?: LanguageCode): string {
  if (topic.introduction && topic.introduction.trim().length > 0) {
    return topic.introduction;
  }

  const titleLower = topic.title.toLowerCase();
  const cat = (topic.categoryId || '').toLowerCase();

  // Hindi
  if (lang === 'hi') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `आधुनिक सजग अंतरंगता में स्पष्ट और पारदर्शी संवाद को सबसे गहरा आकर्षण माना जाता है। संवेदनशील बातचीत को असहज मानने के बजाय, आधुनिक संबंध मनोविज्ञान यह साबित करता है कि इच्छाओं को साझा करने और भावनात्मक सुरक्षा स्थापित करने से ऑक्सीटोसिन निकलता है, जो सच्ची आत्मीयता की नींव है।`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `धीमी कामुकता (Slow Sex) के सिद्धांतों पर आधारित यह अभ्यास फोरप्ले को एक जल्दबाजी भरे उपक्रम के बजाय अपने आप में एक संपूर्ण पावन कला बनाता है। प्रदर्शन के दबाव को छोड़कर वर्तमान में उपस्थित रहने से दोनों साथी गहरी शारीरिक व ऊर्जावान तरंगे महसूस कर पाते हैं।`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `शारीरिक और हस्त स्पर्श को जब शारीरिक ज्ञान और सचेत आदर के साथ किया जाता है, तो यह स्पर्श कला का शिखर बन जाता है। यांत्रिक आदतों से परे, यह अभ्यास दोनों प्रेमियों को धीमी लय, सूक्ष्म प्रतिक्रियाओं को सुनने और गहरे समर्पण का अवसर देता है।`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `अंतरंग मुद्राओं का चयन केवल शारीरिक स्थिति नहीं है—यह एक ऊर्जावान मुद्रा (आसन) है जो आंखों के संपर्क, श्वास तालमेल और भावनात्मक गहराई को तय करती है। सही शारीरिक कोण और भावनात्मक इरादे का संगम मिलन को एक ध्यानमयी अनुभव में बदल देता है।`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `अंतरंग साधन और सुगंधित तेल आनंद के नए आयाम खोलने वाले साधन हैं। उत्साह और जिज्ञासा के साथ नए संवेदी साधनों को अपनाना साथी के साथ बिना किसी झिझक के नई खुशियां तलाशने का सुंदर अवसर देता है।`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `उन्नत एवं तांत्रिक अंतरंगता पवित्र सीमाओं, श्वास समन्वय और जीवन-ऊर्जा के प्रवाह पर केंद्रित है। जब इसे पूर्ण सहमति और शारीरिक सजगता के साथ किया जाता है, तो यह गहरे भावनात्मक जुड़ाव और आपसी सशक्तिकरण का मार्ग खोलता है।`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `सत्र समाप्त होने के बाद का समय उत्तेजना जितना ही महत्वपूर्ण है। सचेत आलिंगन और स्नेह नर्वस सिस्टम को शांत करते हैं, प्रेम के हार्मोन्स को स्थिर करते हैं और सुनिश्चित करते हैं कि दोनों साथी सुरक्षित, सम्मानित और प्रेम से भरे महसूस करें।`;
    }
    return `आधुनिक काम-विज्ञान और संवेदनशील संबंध शिक्षा पर आधारित यह मार्गदर्शिका आपके शारीरिक और भावनात्मक संबंध को गहरा करने के व्यावहारिक साधन प्रदान करती है।`;
  }

  // Marathi
  if (lang === 'mr') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `आधुनिक सजग जवळीकतेमध्ये पारदर्शक संवाद हे सर्वात मोठे आकर्षण मानले जाते. नात्यात भीती न बाळगता आपल्या इच्छा व्यक्त करणे आणि भावनिक सुरक्षितता निर्माण करणे यामुळे विश्वास आणि प्रेम वृद्धिंगत होते.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `सावकाश स्पर्श आणि शांत लयीवर आधारित हा सराव फोरप्लेला घाईगडबडीतून मुक्त करून एक परिपूर्ण कला बनवतो. कोणत्याही दबावाशिवाय केवळ स्पर्शाचा आनंद घेणे ही खरी जवळीक आहे.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `योग्य शारीरिक ज्ञान आणि आदराने केलेला स्पर्श कामुक आनंदाची नवी क्षितिजे उघडतो. यांत्रिक हालचालींपेक्षा जोडीदाराच्या श्वासाची आणि लयीची जाणीव ठेवणे अधिक महत्त्वाचे आहे.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `शारीरिक मुद्रा केवळ हालचाल नसून ती दोन आत्म्यांचे संरेखन असते. योग्य कोन आणि नजरेची भेट यामुळे मिलन एक ध्यानासारखा अनुभव बनतो.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `सुगंधी तेले आणि संवेदी साधने नात्यात नवीन रंग आणि उत्साह भरतात. मोकळेपणाने नवीन प्रयोग करणे हे प्रेमसंबंधांना ताजेतवाने ठेवते.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `तांत्रिक आणि प्रगत जवळीक श्वास समन्वय आणि ऊर्जा प्रवाहावर भर देते. पूर्ण संमती आणि सुरक्षिततेने केलेला हा सराव नात्याला नवीन उंचीवर नेतो.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `सत्रानंतरचे आलिंगन आणि शांत बसणे हे शरीराला पूर्ण विश्रांती देते आणि जोडीदाराला प्रेमाची व सुरक्षिततेची खात्री देते.`;
    }
    return `आधुनिक शरीरशास्त्र आणि संवेदनशील संबंध ज्ञानावर आधारित ही मार्गदर्शिका तुमच्या नात्याला दृढ करण्यासाठी उपयुक्त ठरते.`;
  }

  // Bengali
  if (lang === 'bn') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `আধুনিক সচেতন সম্পর্কের ক্ষেত্রে উন্মুক্ত যোগাযোগই সবচেয়ে বড় আকর্ষণ। দ্বিধাহীনভাবে ইচ্ছা প্রকাশ করা এবং মানসিক নিরাপত্তা গড়ে তোলা প্রেমের ভিত্তি সুদৃঢ় করে।`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `ধীর স্পর্শ এবং উপস্থিতির ওপর ভিত্তি করে এই অভ্যাস ফোরপয়েন্টকে এক অনন্য শিল্পে পরিণত করে। কোনো তাড়াহুড়ো ছাড়াই একে অপরের সান্নিধ্য উপভোগ করাই হলো আসল সুখ।`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `শারীরবৃত্তীয় জ্ঞান এবং আন্তরিক শ্রদ্ধার সাথে স্পর্শ করলে সম্পর্কের মাধুর্য বহু গুণ বেড়ে যায়। সংবেদনশীল অনুভূতির প্রতি মনোযোগী হওয়া অত্যন্ত জরুরি।`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `শারীরিক অবস্থান কেবল বাহ্যিক বিষয় নয়, এটি চোখের যোগাযোগ ও শ্বাস-প্রশ্বাসের ছন্দ মেলানোর একটি গভীর মাধ্যম।`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `সুগন্ধি তেল ও সংবেদনশীল উপকরণ সম্পর্কের ঘনিষ্ঠতায় নতুন মাত্রা যোগ করে। দ্বিধাহীন কৌতূহল আনন্দকে আরও সমৃদ্ধ করে।`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `তান্ত্রিক ও গভীর ঘনিষ্ঠতা শ্বাস-প্রশ্বাসের সামঞ্জস্য ও শক্তির প্রবাহের ওপর গুরুত্ব দেয়। সম্পূর্ণ সম্মতির সাথে এটি মন ও শরীরের মেলবন্ধন ঘটায়।`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `সঙ্গমের পরবর্তী আলিঙ্গন এবং মানসিক সান্নিধ্য শরীরকে শান্ত করে এবং ভালোবাসার বন্ধনকে স্থায়ী রূপ দেয়।`;
    }
    return `আধুনিক সম্পর্ক বিজ্ঞান এবং শারীরিক জ্ঞানের সমন্বয়ে তৈরি এই গাইড আপনার ঘনিষ্ঠতাকে আরও প্রাণবন্ত করবে।`;
  }

  // Telugu
  if (lang === 'te') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `ఆధునిక సాన్నిహిత్యంలో స్పష్టమైన సంభాషణే నిజమైన ఆకర్షణ. భయం లేకుండా కోరికలను వ్యక్తపరచడం మరియు భావోద్వేగ రక్షణ కల్పించడం ప్రేమను మరింత బలోపేతం చేస్తుంది.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `నెమ్మదైన స్పర్శ మరియు ఏకాగ్రతతో కూడిన ఈ సాధన ఫోర్‌ప్లేని ఒక పవిత్రమైన కళగా మారుస్తుంది. ఎటువంటి ఒత్తిడి లేకుండా క్షణాలను ఆస్వాదించడమే నిజమైన అనుభూతి.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `శరీర శాస్త్ర అవగాహన మరియు గౌరవంతో కూడిన స్పర్శ శృంగార అనుభవాన్ని ఉన్నత స్థాయికి తీసుకువెళ్తుంది.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `భంగిమలు కేవలం శారీరక స్థితి మాత్రమే కాదు, కంటి చూపుల కలయిక మరియు శ్వాస లయల సమన్వయం.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `సుగంధ తైలాలు మరియు స్పర్శ పరికరాలు సాన్నిహిత్యంలో సరికొత్త ఉత్సాహాన్ని నింపుతాయి.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `తాంత్రిక సాన్నిహిత్యం శ్వాస సమన్వయం మరియు శక్తి ప్రవాహంపై దృష్టి పెడుతుంది. పూర్తి సమ్మతితో ఇది ఆత్మీయ అనుబంధాన్ని పెంచుతుంది.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `సాన్నిహిత్యం ముగిసిన తర్వాత కౌగిలింత మరియు శాంతమైన సంభాషణ మనస్సును ప్రశాంతపరుస్తాయి.`;
    }
    return `ఆధునిక శరీర విజ్ఞానం మరియు సంబంధాల అవగాహనతో రూపొందించబడిన ఈ గైడ్ మీ బంధాన్ని మరింత దృఢపరుస్తుంది.`;
  }

  // Tamil
  if (lang === 'ta') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `நவீன அந்தரங்கத்தில் வெளிப்படையான உரையாடலே மிகச்சிறந்த ஈர்ப்பு. தயக்கமின்றி விருப்பங்களைப் பகிர்வதும் மன ரீதியான பாதுகாப்பும் உறவை பலப்படுத்துகிறது.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `மெதுவான தீண்டல் மற்றும் கவனத்துடன் கூடிய இந்த பயிற்சி முன்விளையாட்டை ஒரு தெய்வீகக் கலையாக மாற்றுகிறது. அவசரமின்றி தருணங்களை ரசிப்பதே உண்மையான இன்பம்.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `உடற்கூறியல் அறிவு மற்றும் மரியாதையுடன் கூடிய தொடுதல் தாம்பத்திய அனுபவத்தை மேம்படுத்துகிறது.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `நிலைகள் என்பது வெறும் உடலசைவு மட்டுமல்ல, பார்வை பரிமாற்றம் மற்றும் சுவாச லயங்களின் சங்கமம்.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `நறுமண எண்ணெய்கள் மற்றும் தொடு கருவிகள் தாம்பத்தியத்தில் புத்துணர்ச்சியூட்டும் புதிய அனுபவங்களைத் தருகின்றன.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `தாந்திரீக அந்தரங்கம் சுவாச ஒத்திசைவு மற்றும் ஆற்றல் ஓட்டத்தில் கவனம் செலுத்துகிறது. முழுமையான ஒப்புதலுடன் இது மன பிணைப்பை உருவாக்குகிறது.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `தாம்பத்தியத்திற்குப் பிந்தைய அணைப்பும் அமைதியான உரையாடலும் மனதை அமைதிப்படுத்தி அன்பை ஆழமாக்குகிறது.`;
    }
    return `நவீன உடலியல் மற்றும் உறவு அறிவியல் அடிப்படையில் உருவாக்கப்பட்ட இந்த வழிகாட்டி உங்கள் பிணைப்பை மேலும் வலுப்படுத்தும்.`;
  }

  // Default English
  if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
    return `In modern conscious intimacy frameworks—exemplified by platforms like Beducated and Passion and Presence—transparent communication is recognized as the ultimate aphrodisiac. Rather than treating intimate conversations as clinical or uncomfortable, contemporary relationship psychology demonstrates that sharing desires and establishing clear nervous-system safety creates the baseline oxytocin release necessary for authentic erotic arousal and emotional depth.`;
  }

  if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
    return `Drawing from the 'Slow Sex' teachings of Diana Richardson (Love for Couples) and the polarity practices of John Wineland, this topic reframes foreplay from a hurried prelude into a self-contained sacred art. By relinquishing goal-oriented performance pressure and tuning into somatic presence, partners learn to expand their nervous system's capacity for sustained pleasure and electrical connection.`;
  }

  if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
    return `As taught in expert-led programs at Beducated and The Sensual Arts School, oral and manual touch are elevated when approached with anatomical mastery and mindful reverence. Moving beyond mechanical routines, this practice invites lovers into a sensory dialogue of gradual build-up, attentive listening to micro-responses, and deep physical devotion.`;
  }

  if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
    return `Rooted in body-based intimacy work like the Yoga of Intimacy (Justin Patrick Pierce & Londin Angel Winters), physical positioning during lovemaking is far more than geometry—it is an energetic posture that dictates emotional eye contact, breath synchronization, and depth of polarity. Aligning physical vectors with emotional intention transforms physical connection into a transformative meditation.`;
  }

  if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
    return `Educators at Lit Up Love and modern sexologists view intimacy tools and enhancements not as crutches, but as creative amplifiers of human pleasure. Introducing sensory tools with enthusiasm and curiosity allows partners to explore uncharted neural pathways of delight while keeping communication playful and judgment-free.`;
  }

  if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
    return `In alignment with trainings at ISTA (International School of Temple Arts) and the School of Erotic Mysteries, advanced exploratory intimacy integrates sacred container-building, boundary mastery, and life-force energy movement. When approached with radical consent and somatic awareness, non-ordinary states of intimacy offer profound catharsis and mutual empowerment.`;
  }

  if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
    return `Highlighted by Sacred Sex Coaches and mindfulness educators, the integration period after intimate practice is as essential as the arousal phase itself. Dedicated aftercare stabilizes the autonomic nervous system, locks in emotional bonding hormones, and ensures both partners feel deeply cherished, safe, and seen.`;
  }

  return `Grounded in modern somatic sexology and conscious relationship education, this guide offers practical tools and embodied wisdom to deepen your physical and emotional connection. By combining nervous-system awareness with shame-free curiosity, you can cultivate an enduring, vibrant intimate life with your partner.`;
}

export function getTopicHistory(topic: TopicItem, lang?: LanguageCode): string {
  if (topic.history && topic.history.trim().length > 0) {
    return topic.history;
  }

  const titleLower = topic.title.toLowerCase();
  const cat = (topic.categoryId || '').toLowerCase();

  // Hindi
  if (lang === 'hi') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `ऐतिहासिक रूप से कामुक इच्छाओं पर चर्चा सामाजिक वर्जनाओं और संकोच से बंधी रही है। 20वीं सदी के मध्य में मानवीय मनोविज्ञान और सहमति के पहिए (Wheel of Consent) के विकास ने संवाद में क्रांति ला दी। आज सजग अंतरंगता में पारदर्शी संवाद को वासना की बाधा नहीं, बल्कि आत्मा के सच्चे प्रकटीकरण का सुरक्षित आधार माना जाता है।`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `लक्ष्य-मुक्त कामुकता का इतिहास हजारों साल पुराना है जो शास्त्रीय तांत्रिक ग्रंथों और प्राचीन आरोग्य संहिताओं में मिलता है। प्राचीन मनीषी जानते थे कि जल्दबाजी जीवन ऊर्जा को क्षीण करती है, जबकि धीमी और सचेत ऊर्जा संचरण से दीर्घायु, भावनात्मक सामंजस्य और आध्यात्मिक शांति मिलती है।`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `प्राचीन भारतीय कामशास्त्र और पवित्र मंदिर परंपराओं में योनि (पवित्र स्थान) और लिंगम (प्रकाश स्तंभ) की वंदना को उपचार और भक्ति की पावन कला माना जाता था। आधुनिक काम-विज्ञान ने इन प्राचीन परंपराओं को पुनर्जीवित कर सम्मानपूर्ण व ध्यानमयी स्पर्श का रूप दिया है।`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `कामुक आसनों का अध्ययन वात्स्यायन के कामसूत्र से लेकर मध्यकालीन ग्रंथों तक विस्तृत है। तांत्रिक परंपराओं में अंतरंग मुद्राओं को 'आसन' माना गया है—शरीर की ऐसी मुद्राएं जो प्राण ऊर्जा (नाड़ियों) को संतुलित करती हैं और शिव-शक्ति के मिलन का प्रतीक हैं।`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `प्राचीन काल से ही रेशमी वस्त्रों, वनस्पतियों के सुगंधित तेलों और पत्थरों के स्पर्श उपकरणों का उपयोग होता आया है। आधुनिक युग में इन उपकरणों को व्यक्तिगत आनंद और युगल सशक्तिकरण के वैज्ञानिक साधन के रूप में मान्यता मिली है।`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `संवेदी नियंत्रण और भावातीत अवस्थाओं की जड़ें प्राचीन रहस्य संप्रदायों और तांत्रिक दीक्षाओं में हैं। आधुनिक चेतना इन प्राचीन परंपराओं को मनोवैज्ञानिक सुरक्षा और आघात-मुक्त सहमति के साथ प्रस्तुत करती है।`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `प्राचीन आयुर्वेद में मिलन के बाद के विश्राम, हर्बल पेय और स्नेहपूर्ण आलिंगन को ऊर्जा संरक्षण के लिए अनिवार्य माना गया था। आधुनिक न्यूरोसाइंस भी सिद्ध करती है कि चरमोत्कर्ष के बाद का समय भावनात्मक जुड़ाव और ऑक्सीटोसिन अवशोषण के लिए सबसे अनुकूल होता है।`;
    }
    return `यह अभ्यास प्राचीन प्राच्य ऊर्जा परंपराओं और आधुनिक पाश्चात्य न्यूरोसाइंस का एक समृद्ध सेतु है, जो प्रेम को एक पावन साधना बनाता है।`;
  }

  // Marathi
  if (lang === 'mr') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `ऐतिहासिकदृष्ट्या लैंगिक इच्छांवर बोलणे सामाजिक बंधनांमुळे कठीण होते. विसाव्या शतकातील मानसोपचार आणि संमतीच्या सिद्धांतांनी या संवादात क्रांती आणली. आज पारदर्शक संवादाला प्रेमाचे सुरक्षित अधिष्ठान मानले जाते.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `सावकाश कामुकतेचा इतिहास हजारो वर्षे जुना असून तो प्राचीन तांत्रिक ग्रंथ आणि आरोग्यशास्त्रात आढळतो. घाई करण्यापेक्षा संथ लयीत ऊर्जा संचरित केल्याने दीर्घायुष्य आणि मनःशांती मिळते.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `प्राचीन कामशास्त्रात शरीराचा सन्मान ही एक भक्ती मानली गेली आहे. आधुनिक विज्ञानाने या प्राचीन ज्ञानाला आदरातिथ्य आणि ध्यानाची जोड दिली आहे.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `कामुक आसनांचा अभ्यास कामसूत्रापासून सुरू होतो. ऐतिहासिक तांत्रिक परंपरेत मुद्रांना ऊर्जेचे संतुलन साधणारे शारीरिक आसन मानले गेले आहे.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `प्राचीन काळापासून सुगंधी तेले आणि रेशमी वस्त्रांचा वापर केला जात आहे. आजच्या काळात हे साधने नात्यातील आनंद वाढवण्यासाठी शास्त्रशुद्ध पद्धतीने वापरले जातात.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `संवेदी खेळांची मुळे प्राचीन तांत्रिक दीक्षेत आहेत. आजच्या युगात हे सर्व पूर्ण संमती आणि सुरक्षिततेने केले जाते.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `आयुर्वेदात समाधानानंतरचे आलिंगन आणि शांततेला अत्यंत महत्त्व दिले गेले आहे, ज्यामुळे ऊर्जा टिकून राहते आणि नाते घट्ट होते.`;
    }
    return `हा सराव प्राचीन शहाणपण आणि आधुनिक विज्ञान यांचा एक सुंदर मेळ आहे.`;
  }

  // Bengali
  if (lang === 'bn') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `ঐতিহাসিকভাবে যৌন ইচ্ছা নিয়ে খোলামেলা আলোচনা সামাজিক সংস্কারের কারণে বাধাগ্রস্ত ছিল। বিংশ শতাব্দীর মনস্তত্ত্ব এবং আধুনিক সম্মতি কাঠামো প্রেমীদের কথোপকথনে বিপ্লব এনেছে।`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `লক্ষ্যহীন ধীর কামোত্তেজনার ইতিহাস হাজার বছরের প্রাচীন তান্ত্রিক ঐতিহ্যে খুঁজে পাওয়া যায়। প্রাচীন সাধকরা জানতেন যে ধীর শক্তি সঞ্চালন দীর্ঘায়ু ও মানসিক প্রশান্তি আনে।`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `শাস্ত্রীয় ভারতীয় কামশাস্ত্রে স্পর্শকে এক অনন্য ভক্তিমূলক শিল্প হিসেবে গণ্য করা হতো। আধুনিক বিজ্ঞান এই প্রাচীন শ্রদ্ধাবোধকে আবার ফিরিয়ে এনেছে।`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `আসন সংক্রান্ত অধ্যয়ন কামসূত্র থেকে শুরু করে মধ্যযুগীয় গ্রন্থে পাওয়া যায়। তান্ত্রিক ঐতিহ্যে শারীরিক অবস্থানকে শক্তি ভারসাম্যের মাধ্যম মনে করা হতো।`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `প্রাচীনকাল থেকেই সুগন্ধি তেল এবং রেশমি কাপড়ের ব্যবহার হয়ে আসছে। আধুনিক যুগে এগুলো আনন্দের বৈজ্ঞানিক মাধ্যম হিসেবে স্বীকৃত।`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `সংবেদনশীল নিয়ন্ত্রণ এবং গভীর অনুভূতির শিকড় প্রাচীন তান্ত্রিক দীক্ষায় প্রোথিত। এটি পূর্ণ সম্মতির মাধ্যমে সম্পন্ন হয়।`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `আয়ুর্বেদে মিলন পরবর্তী বিশ্রাম ও উষ্ণ আলিঙ্গনকে শক্তি সংরক্ষণের জন্য অত্যন্ত জরুরি বলা হয়েছে। আধুনিক স্নায়ুবিজ্ঞানও এর সত্যতা প্রমাণ করে।`;
    }
    return `এই চর্চাটি প্রাচীন ঐতিহ্য এবং আধুনিক বিজ্ঞানের এক মেলবন্ধন।`;
  }

  // Telugu
  if (lang === 'te') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `చారిత్రకంగా కోరికలను వ్యక్తపరచడం సంకోచాలతో కూడుకుని ఉండేది. ఆధునిక మనస్తత్వ శాస్త్రం మరియు సమ్మతి సూత్రాలు సంభాషణలో విప్లవాన్ని తెచ్చాయి.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `నెమ్మదైన శృంగార కళ వేల సంవత్సరాల పురాతన తాంత్రిక గ్రంథాలలో వివరించబడింది. ఆత్రుత లేకుండా శక్తిని ప్రవహింపజేయడం దీర్ఘాయువుని, ప్రశాంతతను ఇస్తుంది.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `ప్రాచీన కామశాస్త్రంలో శరీర స్పర్శను ఒక పవిత్రమైన పూజగా భావించేవారు. ఆధునిక విజ్ఞానం ఈ పద్ధతులను తిరిగి నిలబెట్టింది.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `భంగిమల అధ్యయనం కామసూత్రం నాటి నుండి ఉంది. తాంత్రిక సంప్రదాయంలో వీటిని శారీరక శక్తిని సమతుల్యం చేసే ఆసనాలుగా చూస్తారు.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `పురాతన కాలం నుండే సుగంధ తైలాలు మరియు పట్టు వస్త్రాల వాడకం ఉంది. నేడు ఇవి ఆనందాన్ని పెంచే సాధనాలుగా ఉపయోగపడుతున్నాయి.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `తాంత్రిక పద్ధతులు లోతైన మానసిక మార్పులను కలిగిస్తాయి. పూర్తి సమ్మతితో చేసే ఈ సాధన బంధాన్ని పటిష్టం చేస్తుంది.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `ఆయుర్వేదంలో సాన్నిహిత్యం తర్వాత విశ్రాంతికి మరియు కౌగిలింతకు ఎంతో ప్రాముఖ్యత ఉంది. ఇది శక్తిని కాపాడుతుంది.`;
    }
    return `ఈ సాధన ప్రాచీన విజ్ఞానం మరియు ఆధునిక శాస్త్రాల అద్భుత కలయిక.`;
  }

  // Tamil
  if (lang === 'ta') {
    if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
      return `வரலாற்று ரீதியாக தாம்பத்திய விருப்பங்களைப் பேசுவது தயக்கத்திற்குரியதாக இருந்தது. நவீன உளவியல் மற்றும் ஒப்புதல் நெறிமுறைகள் உரையாடலில் புதிய மாற்றத்தைக் கொண்டு வந்துள்ளன.`;
    }
    if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
      return `மெதுவான தாம்பத்தியத்தின் வரலாறு பல்லாயிரம் ஆண்டுகள் பழமையான தாந்திரீக நூல்களில் காணப்படுகிறது. பதற்றமின்றி ஆற்றலை ஓடச் செய்வது அமைதியையும் ஆரோக்கியத்தையும் தருகிறது.`;
    }
    if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
      return `பண்டைய காம சாஸ்திரங்களில் உடலின் தீண்டல் ஒரு புனிதமான கலையாகக் கருதப்பட்டது. நவீன அறிவியல் இந்த மரியாதையை மீட்டெடுத்துள்ளது.`;
    }
    if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
      return `நிலைகள் பற்றிய ஆய்வு காமசூத்திரம் முதற்கொண்டு நீள்கிறது. தாந்திரீக மரபில் நிலைகள் ஆற்றலை சமநிலைப்படுத்தும் யோகாசனங்களாகப் பார்க்கப்பட்டன.`;
    }
    if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
      return `பண்டைய காலம் முதலே நறுமண எண்ணெய்களும் பட்டுத் துணிகளும் பயன்படுத்தப்பட்டு வருகின்றன. இன்று அவை இன்பத்தை அதிகரிக்கும் கருவிகளாக உள்ளன.`;
    }
    if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
      return `உணர்வுபூர்வ பயிற்சிகள் பண்டைய மரபுகளில் ஆழமாக வேரூன்றியுள்ளன. முழு ஒப்புதலுடன் இது மன பிணைப்பை ஏற்படுத்துகிறது.`;
    }
    if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
      return `ஆயுர்வேதத்தில் தாம்பத்தியத்திற்குப் பிந்தைய ஓய்வு மற்றும் அணைப்புக்கு அதிக முக்கியத்துவம் தரப்பட்டது. இது அன்பை நிலைநிறுத்துகிறது.`;
    }
    return `இந்த பயிற்சி பண்டைய ஞானம் மற்றும் நவீன அறிவியலின் சிறந்த பாலமாகும்.`;
  }

  // Default English
  if (cat.includes('communication') || titleLower.includes('listen') || titleLower.includes('desire') || titleLower.includes('consent')) {
    return `Historically, open dialogue surrounding sexual desires was often constrained by societal taboos and shame. The evolution of humanistic psychology in the mid-20th century, combined with modern somatic boundary work (such as ISTA's Wheel of Consent and non-violent communication traditions), revolutionized how lovers converse. Today, sacred intimacy traditions view clear communication not as a barrier to passion, but as the ancient art of creating a safe sanctuary for the soul to express its deepest truths.`;
  }

  if (cat.includes('foreplay') || cat.includes('arousal') || titleLower.includes('slow') || titleLower.includes('touch')) {
    return `The practice of non-goal-oriented arousal traces back thousands of years to Classical Tantric texts and Taoist sexual longevity manuals (such as the Su Nu Ching). Ancient practitioners understood that rushing toward climax depletes vital energy (Jing), whereas slow, mindful energy circulation cultivates longevity, emotional harmony, and heightened spiritual awareness. Modern pioneers like Diana Richardson have translated these ancient secrets into accessible contemporary practices.`;
  }

  if (cat.includes('oral') || cat.includes('manual') || titleLower.includes('clitoris') || titleLower.includes('massage')) {
    return `Honoring the genitals through ritualized touch has a rich heritage in ancient civilizations. In classical Indian Kamashastra texts and sacred temple traditions, Yoni (sacred space) and Lingam (column of light) worship were regarded as devotional arts of healing and veneration. Modern embodiment schools have reclaimed these ancient practices, stripping away modern pornography's rushed stereotypes in favor of meditative, respectful touch.`;
  }

  if (cat.includes('position') || cat.includes('penetration') || titleLower.includes('pose') || titleLower.includes('rhythm')) {
    return `The study of erotic postures dates back to 4th-century Sanskrit treatises like Vatsyayana's Kama Sutra and medieval European manuals of courtly love. Far from mere physical mechanics, historical Tantric traditions viewed intimate postures as 'Asanas'—bodily configurations designed to direct subtle energy channels (Nadis) and harmonize the polarities of masculine (Shiva) and feminine (Shakti) energies.`;
  }

  if (cat.includes('toy') || cat.includes('enhancement') || titleLower.includes('lube') || titleLower.includes('sensation')) {
    return `Erotic enhancements have been utilized since antiquity, with archaeological evidence of silk wraps, botanical oils, and polished stone instruments dating back to ancient Greece, Rome, and Han Dynasty China. In the 20th century, the medicalization and subsequent liberation of pleasure devices transformed these tools into mainstream, high-tech instruments of personal and relational empowerment.`;
  }

  if (cat.includes('advanced') || cat.includes('exploratory') || titleLower.includes('kink') || titleLower.includes('tantra')) {
    return `Ritualized power dynamics, sensory deprivation, and ecstatic trance states have deep roots in ancient mystery schools, shamanic initiation rites, and esoteric Tantric practices. Ancient temple arts utilized intentional containers to transcend everyday ego identity. Contemporary conscious kink and sacred mystery schools synthesize these ancient cathartic traditions with modern psychological safety and trauma-informed consent protocols.`;
  }

  if (cat.includes('aftercare') || cat.includes('health') || titleLower.includes('longevity') || titleLower.includes('cuddle')) {
    return `Ancient Taoist physicians and Ayurvedic practitioners placed immense emphasis on post-intimacy recovery, prescribing herbal teas, warm oil massages, and quiet stillness to prevent energy depletion. Modern neuroscience validates this ancient wisdom, showing that the post-climax 'neuro-chemical window' is when brain neuroplasticity and oxytocin absorption are at their peak, making aftercare the ultimate ritual for long-term relational bonding.`;
  }

  return `This practice inherits a rich historical continuum bridging ancient Eastern energy traditions with modern Western somatic neuroscience. By honoring the wisdom of ancient lineage alongside contemporary evidence-based relationship science, lovers can experience intimacy as both an enduring art and a transformative practice.`;
}
