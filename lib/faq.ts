// Single source for FAQ copy. The visible FAQ sections and their FAQPage
// JSON-LD are both generated from these lists, so they always match.

export type FaqPart = string | { text: string; href: string };

export type FaqItem = {
  question: string;
  // Paragraphs; each paragraph is text and inline links.
  answer: FaqPart[][];
};

// /faq — Private Tantra Massage Sessions
export const sessionFaqs: FaqItem[] = [
  {
    question: "What is Tantra Massage?",
    answer: [
      ["Tantra Massage is a deeply healing and sensual full-body experience that combines breathwork, ritual, and conscious touch. It invites you to reconnect with your natural vitality and the unconditioned self beneath layers of tension or shame. Each session honours your boundaries and invites presence, trust, and self-awareness."],
    ],
  },
  {
    question: "Who is Tantra Massage for?",
    answer: [
      ["Tantra Massage is open to all adults, singles and couples. It can help you reconnect with your sensuality, especially if you’ve felt disconnected through stress, responsibility, or relationship patterns. It’s equally valuable if you already feel attuned and wish to explore intimacy more deeply."],
    ],
  },
  {
    question: "What should I expect from my first session?",
    answer: [
      ["Your session begins with a short conversation to revisit your intentions, boundaries, and any concerns we’ve discussed beforehand. The space is prepared with warmth, soft light, and calming music. We begin clothed in a lunghi (sarong), allowing time to settle and relax. As the session unfolds, touch becomes slower and more intimate, always guided by consent."],
    ],
  },
  {
    question: "I have suffered sexual abuse in the past. Can Tantra Massage help me?",
    answer: [
      ["Tantra Massage can be part of a healing journey for those rebuilding trust and connection with their bodies. It’s not a replacement for therapy, but many find it supportive alongside professional guidance. You will always set the pace, and nothing happens without your explicit consent."],
    ],
  },
  {
    question: "How should I prepare for my first treatment?",
    answer: [
      ["Eat something light an hour or more before your session. Take a shower at home so you feel fresh and relaxed. Wear comfortable clothing, and please arrive on time. The session lasts around two hours, so plan a little quiet time afterwards to integrate."],
    ],
  },
  {
    question: "Is the goal of Tantra Massage to have an orgasm?",
    answer: [
      ["No. The focus is on presence and awareness — awakening energy and pleasure throughout the body without seeking a specific outcome. Orgasms may happen, but they are neither expected nor required. The true aim is to feel more alive and at peace in your body."],
    ],
  },
  {
    question: "Will I be naked during the massage? Will you be naked?",
    answer: [
      ["Yes. Tantra Massage embraces the natural human form as part of its philosophy of acceptance and equality. Both giver and receiver begin covered in a lunghi and may gradually undress as trust and comfort deepen. Nudity is never sexualised and never forced."],
    ],
  },
  {
    question: "How do I book a session or workshop?",
    answer: [
      ["You can book via the ", { text: "contact form", href: "/contact" }, " or explore dates on the ", { text: "Workshops", href: "/offerings/workshops" }, " page. Once you reach out, you’ll receive confirmation and preparation details by email."],
    ],
  },
  {
    question: "Is Tantra Massage safe?",
    answer: [
      ["Absolutely. Sessions are guided by clear boundaries, active consent, and confidentiality. You are always in control, and nothing happens without your agreement."],
    ],
  },
  {
    question: "Where do sessions take place?",
    answer: [
      ["Sessions are held in a calm, private space in Stroud, Gloucestershire — designed to feel safe, warm, and grounding."],
    ],
  },
];

// /faq — Tantra Massage Workshops
export const workshopFaqs: FaqItem[] = [
  {
    question: "What happens during a workshop?",
    answer: [
      ["Each workshop blends theory, demonstration, and paired practice. You’ll learn principles of conscious touch, communication, and presence. Sessions include grounding, movement, and breathwork to cultivate trust and sensitivity."],
    ],
  },
  {
    question: "Can I participate in a seminar alone?",
    answer: [
      ["Yes — you don’t need a partner to attend. Many participants come on their own, and it’s easy to connect with others once you’re there."],
    ],
  },
  {
    question: "Can singles and couples participate?",
    answer: [
      ["Yes, both are equally welcome. If you’re attending as a couple, you can decide together how you’d like to approach the practice sessions — practising together, with other participants, or focusing on your own experience within the group."],
    ],
  },
  {
    question: "Can I participate without a partner?",
    answer: [
      ["Yes. Pairing for practice sessions happens organically among participants rather than being assigned — it isn’t something Wesley gets involved in unless an issue comes up. You’re welcome to wait and see who approaches you, or to take the initiative yourself; either is completely fine."],
    ],
  },
  {
    question: "Can I choose the shared-occupancy rate even if I’m attending as a solo individual?",
    answer: [
      ["Yes. If you’d prefer the shared rate rather than paying for a single room, we’ll pair you with another solo attendee of the same sex to share a room with. Just let us know when you register."],
    ],
  },
  {
    question: "What should I bring?",
    answer: [
      ["Bring a sarong, water bottle, notebook, and loose clothing. Everything else — mats, towels, oils — is provided. Accommodation and meals vary by event; see each listing for details."],
    ],
  },
  {
    question: "Is nudity part of the workshops?",
    answer: [
      ["When we learn and practise the Tantra Massage sequences, you’ll be wearing loose fabric coverings like sarongs. For certain stages of the massage, both the giver and receiver may be fully nude — but you’ll always have choice and sovereignty over your body."],
      ["We don’t treat nudity as something remarkable or performative. When it’s part of a seminar, it’s as ordinary as walking barefoot on grass or swimming in open water — unstaged, without expectation, and always held with real respect for each person’s own boundaries."],
      ["For many of us, it’s unfamiliar to experience our own body without the judgments and expectations we usually carry. A mindfully held space can make room for more ease, self-acceptance, and freedom in how you relate to your body."],
      ["Where an exercise involves nudity, whether to take part is always your choice. No one is asked or pressured to undress."],
      ["Nudity isn’t a goal here, and it isn’t a requirement for anything — it’s simply natural. What matters, always, is consent, mutual respect, and care for everyone’s personal boundaries."],
    ],
  },
  {
    question: "How do I book a place on a workshop or retreat?",
    answer: [
      ["Submitting the registration form on the workshop or retreat page is a binding request for a place, but it isn’t confirmed until we’ve reviewed it. We aim to get back to you within 48 hours. Once confirmed, we’ll ask for a deposit of £200 per person by bank transfer within 7 days."],
    ],
  },
  {
    question: "Is there a minimum age?",
    answer: [
      ["Yes, you must be 18 or over to attend."],
    ],
  },
  {
    question: "What happens after I submit my registration?",
    answer: [
      ["We review every registration individually, partly to keep the group balanced. Once confirmed, you’ll be asked for a £200 per person deposit by bank transfer within 7 days of confirmation. The balance is due by bank transfer three weeks before the event — we’ll email a packing list and directions to the venue at that point."],
    ],
  },
  {
    question: "What’s your cancellation policy?",
    answer: [
      ["If you cancel 70 or more days before the event starts, a £100 per person administration fee will be deducted from the deposit. Between 30 and 69 days before, 50% of your total cost. With less than 30 days’ notice, 90% of your total cost."],
    ],
  },
  {
    question: "Is my health information kept private?",
    answer: [
      ["Yes. Any health information you share is seen only by Wesley, used to help keep everyone safe during practice sessions. If your registration isn’t taken forward, that data is deleted on request and, in any case, within 90 days."],
    ],
  },
  {
    question: "Is travel to the venue included?",
    answer: [
      ["No, travel is for you to arrange. If you’re travelling from a similar area to other participants, let us know and we may be able to put you in touch with each other."],
    ],
  },
  {
    question: "What’s the difference between a tantra seminar and a tantra massage seminar?",
    answer: [
      ["Other tantra seminars, from other providers, may have different focuses — depending on the event, that might be body awareness, conscious touch, meditation, encounter, sensuality, an open heart, healing from trauma, or personal development. Our Tantra Massage Seminar places a special emphasis on learning and practising Tantra massage specifically. You’ll study touch, presence, body awareness, and the full structure of a Tantra massage in depth, including Lingam and Yoni massage as components of the ritual."],
    ],
  },
  {
    question: "Are your tantra seminars about sex?",
    answer: [
      ["No. This isn’t a course in sensual massage, and it isn’t a space for seeking sexual contact. Sensuality and the body are part of what we work with, but the aim is presence, not performance — touch as a way of accepting yourself and others more fully, not an end in itself."],
    ],
  },
  {
    question: "How are Lingam and Yoni massage integrated into the seminar?",
    answer: [
      ["They’re taught as part of the full Tantra massage ritual. In our mixed four-day format, women learn to give the Lingam massage and men learn to give the Yoni massage — this split lets us teach both massage forms thoroughly within a balanced, mixed group."],
    ],
  },
  {
    question: "Will I receive a certificate for the massage training?",
    answer: [
      ["Yes — you’ll receive a certificate of completion after the seminar, along with a written summary of what was covered, so you can keep practising what you’ve learned."],
    ],
  },
];

// /offerings/tantra — Tantra Massage FAQs section
export const tantraPageFaqs: FaqItem[] = [
  {
    question: "Will I be naked during the massage?",
    answer: [
      ["The session begins with both of us covered in a lunghi (sarong). As the massage progresses, clothing may be removed — always at your pace, and always with equal states of dress. You will never be pushed beyond what feels right for you."],
    ],
  },
  {
    question: "Is orgasm the goal of Tantra Massage?",
    answer: [
      ["No. The focus is on presence, connection, and awakening the body’s natural flow of energy. Orgasms may happen, but they are not expected or required. What matters is how you feel in your body — relaxed, alive, and more connected to yourself."],
    ],
  },
  {
    question: "What if I feel uncomfortable at any point?",
    answer: [
      ["You are always in charge of the session. You can pause, adjust, or stop at any time. Consent and clear communication are the foundation of Tantra Massage, so your boundaries are fully respected."],
    ],
  },
  {
    question: "Can Tantra Massage help if I’ve experienced trauma?",
    answer: [
      ["Tantra Massage can be a gentle support for reconnecting with your body and rebuilding trust in intimacy. While it is not a substitute for therapy, many people find it helps them soften protective tension and rediscover the pleasure of being touched in a safe, honouring way."],
    ],
  },
];

const SITE_URL = "https://theartofsensuality.com";

// Plain-text answer for JSON-LD: link text kept, paragraphs separated by a blank line.
export function faqAnswerText(item: FaqItem): string {
  return item.answer
    .map((paragraph) =>
      paragraph.map((part) => (typeof part === "string" ? part : part.text)).join("")
    )
    .join("\n\n");
}

export function faqPageJsonLd(path: string, items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    url: `${SITE_URL}${path}`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerText(item),
      },
    })),
  };
}

// /offerings/workshops — Tantra massage training FAQ (no FAQPage schema)
export const trainingFaqs: FaqItem[] = [
  {
    question: "Do I need any experience?",
    answer: [["No. The training starts from the beginning. You need openness, respect, and to be comfortable on the floor."]],
  },
  {
    question: "Can I come on my own?",
    answer: [["Yes. Many people do. You choose who you practise with, session by session."]],
  },
  {
    question: "We’re a couple. Do we have to work with other people?",
    answer: [["No. You can stay together for the whole workshop, or explore working with others. It’s your choice, every session, and either is completely fine."]],
  },
  {
    question: "Will I receive a certificate?",
    answer: [["Yes. A TAOS certificate of attendance and completion of basic training in Tantra Massage, plus a printed step-by-step manual of the full routine and ritual."]],
  },
  {
    question: "Can I use this training to work professionally?",
    answer: [["The foundation training gives you the complete ritual and a solid base. If you want to practise professionally, ongoing mentoring is available. You’ll also need your own insurance and to meet any requirements where you work. The TAOS certificate isn’t an external accreditation."]],
  },
  {
    question: "Is nudity part of the training?",
    answer: [["During massage practice, yes, with loose coverings. Full nudity is optional. It’s always consensual and never sexualised."]],
  },
  {
    question: "Is this about sex?",
    answer: [["No. The focus is presence, acceptance and conscious touch, not performance or sexual contact."]],
  },
  {
    question: "How are yoni and lingam massage taught?",
    answer: [["As part of the complete ritual sequence, through demonstration and guided practice. In the 4-day format, women learn lingam massage and men learn yoni massage, practising in woman–man pairs for these sections."]],
  },
  {
    question: "Can I learn yoni massage as a woman, or lingam massage as a man?",
    answer: [["The yoni and lingam sections are structured for woman–man pairs, so the group stays balanced and both techniques can be taught properly. If you have a different interest, get in touch before booking, and we’ll talk through what’s possible."]],
  },
  {
    question: "Can I pair with someone of the same sex?",
    answer: [["Yes, for most of the ritual, such as the back, arms, face and full-body work. Only the yoni and lingam sections follow the woman–man structure."]],
  },
  {
    question: "Is the group balanced?",
    answer: [["We aim for a balanced number of women and men in each workshop, for an even group energy and so everyone has a partner."]],
  },
  {
    question: "Can I come back after the foundation?",
    answer: [["Yes. Returners can attend future workshops at a reduced rate. Returner rates are available on request."]],
  },
  {
    question: "Is there a minimum age?",
    answer: [["Yes, 18."]],
  },
  {
    question: "How do I book?",
    answer: [["Choose a date and submit the registration form on the event page. Registrations are reviewed within 48 hours. A £200 per person deposit secures your place once confirmed, payable by bank transfer within 7 days."]],
  },
];

// /offerings/couples-tantra-massage-training — Couples training FAQ (no FAQPage schema)
export const couplesTrainingFaqs: FaqItem[] = [
  {
    question: "Do we need any experience?",
    answer: [["No. We start from the beginning."]],
  },
  {
    question: "Will anyone else be there?",
    answer: [["No. It’s just the two of you and Wesley."]],
  },
  {
    question: "Is it sexual?",
    answer: [["No. The ritual includes intimate touch, but the focus is presence and connection, not sex or performance."]],
  },
  {
    question: "What if one of us is more nervous than the other?",
    answer: [["That’s common, and the pace adapts to it. Nothing happens without both of you agreeing."]],
  },
  {
    question: "Do we need to be undressed?",
    answer: [["Parts of the practice involve undressing, with coverings. Everything is agreed in advance and can change at any time."]],
  },
  {
    question: "Can we spread the sessions out?",
    answer: [["Yes. The schedule is agreed with you."]],
  },
  {
    question: "Can we pay in instalments?",
    answer: [["Yes. The balance can be paid in instalments by arrangement after the £350 deposit."]],
  },
  {
    question: "Is this therapy or counselling?",
    answer: [["No. It’s practical teaching. If you’re working through specific difficulties, intimacy coaching may suit you better."]],
  },
];
