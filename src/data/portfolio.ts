export type ServiceId =
  | 'Graphic Designing'
  | 'Video Editing'
  | 'Image Editing'
  | 'AI Video Creation'
  | 'AI Image Creation'
  | 'Branding'
  | 'Social Media Management'
  | 'Content Writing'
  | 'Other';

export interface ServiceItem {
  number: string;
  title: string;
  formServiceValue: ServiceId;
  summary: string;
  deliverables: string[];
  iconName:
    | 'PenTool'
    | 'Film'
    | 'SlidersHorizontal'
    | 'Clapperboard'
    | 'Wand2'
    | 'Layers'
    | 'Share2'
    | 'Feather';
  featured?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Graphic Designing',
    formServiceValue: 'Graphic Designing',
    summary:
      'Clean, scroll-stopping visual layouts designed to communicate your brand message clearly across digital and print.',
    deliverables: [
      'Social media creatives',
      'Posters and banners',
      'Promotional graphics',
      'Marketing materials',
    ],
    iconName: 'PenTool',
    featured: true,
  },
  {
    number: '02',
    title: 'Video Editing',
    formServiceValue: 'Video Editing',
    summary:
      'Paced, rhythmic edits engineered for modern short-form retention, crisp storytelling, and visual flow.',
    deliverables: [
      'Instagram Reels',
      'YouTube Shorts',
      'Promotional videos',
      'Short-form video editing',
    ],
    iconName: 'Film',
    featured: true,
  },
  {
    number: '03',
    title: 'Image Editing',
    formServiceValue: 'Image Editing',
    summary:
      'Precision retouching, color harmony, and product polish that elevate everyday photos into campaign-ready visuals.',
    deliverables: [
      'Photo enhancement',
      'Background removal',
      'Creative image manipulation',
      'Product image editing',
    ],
    iconName: 'SlidersHorizontal',
  },
  {
    number: '04',
    title: 'AI Video Creation',
    formServiceValue: 'AI Video Creation',
    summary:
      'Next-generation visual storytelling blending creative direction with AI motion tools for memorable brand films.',
    deliverables: [
      'AI-generated promotional videos',
      'Creative storytelling videos',
      'AI-assisted video content',
      'Visual concept videos',
    ],
    iconName: 'Clapperboard',
  },
  {
    number: '05',
    title: 'AI Image Creation',
    formServiceValue: 'AI Image Creation',
    summary:
      'Art-directed custom imagery, bespoke product worlds, and imaginative campaign concepts without studio limits.',
    deliverables: [
      'AI-generated artwork',
      'Product visuals',
      'Creative advertisements',
      'Custom visual concepts',
    ],
    iconName: 'Wand2',
  },
  {
    number: '06',
    title: 'Branding & Brand Identity',
    formServiceValue: 'Branding',
    summary:
      'Cohesive visual systems—from signature logos to color palettes and packaging—that make businesses unmistakable.',
    deliverables: [
      'Logo design',
      'Brand colours and typography',
      'Brand identity concepts',
      'Visual consistency',
    ],
    iconName: 'Layers',
    featured: true,
  },
  {
    number: '07',
    title: 'Social Media & Channel Management',
    formServiceValue: 'Social Media Management',
    summary:
      'End-to-end visual direction, publishing rhythm, and feed aesthetics for growing Instagram and YouTube channels.',
    deliverables: [
      'Instagram account handling',
      'YouTube channel management',
      'Content planning & publishing',
      'Creative strategy',
    ],
    iconName: 'Share2',
  },
  {
    number: '08',
    title: 'Content Writing',
    formServiceValue: 'Content Writing',
    summary:
      'Sharp captions, short-form scripts, and clear promotional copy crafted to pair naturally with visual design.',
    deliverables: [
      'Social media captions',
      'Promotional copy',
      'Video scripts',
      'Creative content ideas',
    ],
    iconName: 'Feather',
  },
];

export const SERVICE_FORM_OPTIONS: ServiceId[] = [
  'Graphic Designing',
  'Video Editing',
  'Image Editing',
  'AI Video Creation',
  'AI Image Creation',
  'Branding',
  'Social Media Management',
  'Content Writing',
  'Other',
];

export const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹35,000',
  '₹35,000+',
  'Flexible / Let’s Discuss',
] as const;

export type PortfolioCategory =
  | 'All'
  | 'Branding & Graphic Design'
  | 'Social Media & Content'
  | 'Video & AI Creation'
  | 'YouTube & Channels'
  | 'AI Imagery & Editing';

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategory; label: string }[] = [
  { id: 'All', label: 'All Work' },
  { id: 'Branding & Graphic Design', label: 'Branding & Graphic Design' },
  { id: 'Social Media & Content', label: 'Social Media & Content' },
  { id: 'Video & AI Creation', label: 'Video & AI Creation' },
  { id: 'YouTube & Channels', label: 'YouTube & Channels' },
  { id: 'AI Imagery & Editing', label: 'AI Imagery & Editing' },
];

export interface PortfolioImage {
  src: string;
  alt: string;
  caption: string;
  bgTone?: 'cream' | 'dark' | 'light';
}

export interface PortfolioProject {
  id: string;
  title: string;
  shortDescription: string;
  category: Exclude<PortfolioCategory, 'All'>;
  secondaryCategories?: Exclude<PortfolioCategory, 'All'>[];
  provenanceLabel: 'Original Work' | 'Concept Project' | 'Sample Work' | 'Creative Practice';
  isConcept: boolean;
  role: string;
  relatedService: ServiceId;
  featuredSize: 'wide' | 'tall' | 'standard';
  coverImage: string;
  coverAlt: string;
  coverFit?: 'cover' | 'contain';
  coverBg?: string;
  gallery: PortfolioImage[];
  overview: string;
  highlights: string[];
  deliverables: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'monikas-magic-branding',
    title: "Monika's Magic — Food Brand Identity",
    shortDescription:
      'Complete visual branding, custom emblem logo, packaging stickers, and warm homemade food identity.',
    category: 'Branding & Graphic Design',
    provenanceLabel: 'Original Work',
    isConcept: false,
    role: 'Branding & Graphic Design',
    relatedService: 'Branding',
    featuredSize: 'wide',
    coverImage: '/assets/work/monikas-magic-logo.png',
    coverAlt: "Monika's Magic custom food brand logo and packaging emblem designed by Priyal Gandhi",
    coverFit: 'contain',
    coverBg: '#FCE8A6',
    gallery: [
      {
        src: '/assets/work/monikas-magic-logo.png',
        alt: "Monika's Magic brand emblem and packaging badge",
        caption: 'Primary brand emblem designed for instant homemade premixes and packaging labels.',
        bgTone: 'cream',
      },
      {
        src: '/assets/work/monikas-magik-menu.png',
        alt: "Monika's Magik pasta menu and promotional poster",
        caption: 'Coordinated menu board and promotional food layout built in the same visual family.',
        bgTone: 'cream',
      },
    ],
    overview:
      "Worked on the visual branding and design elements for Monika's Magic, a homemade food products brand. Focused on building an appetizing, trustworthy visual identity across brand styling, product stickers, labels, menu layouts, and promotional materials.",
    highlights: [
      'Expressive script wordmark paired with culinary illustration icons for breakfast, sweets, Indian gravies, Chinese, and desserts.',
      'Warm golden-amber palette crafted to stand out cleanly on physical jars, pouches, and stickers.',
      'Consistent visual hierarchy engineered for both print packaging and WhatsApp/Instagram promotions.',
    ],
    deliverables: ['Brand Styling', 'Logo Emblem', 'Product Stickers & Labels', 'Menu Design'],
  },
  {
    id: 'magic-lens-youtube',
    title: 'Magic Lens — YouTube Channel & Shorts Studio',
    shortDescription:
      'Original YouTube Shorts creation, AI-assisted visual concepts, channel management, and audience retention insights.',
    category: 'YouTube & Channels',
    secondaryCategories: ['Video & AI Creation'],
    provenanceLabel: 'Original Work',
    isConcept: false,
    role: 'Digital Content Creator & Channel Manager',
    relatedService: 'Social Media Management',
    featuredSize: 'standard',
    coverImage: '/assets/work/youtube-channel-showcase.png',
    coverAlt: 'Magic Lens YouTube Studio Shorts library and video insights dashboard',
    coverFit: 'contain',
    coverBg: '#FFF8EF',
    gallery: [
      {
        src: '/assets/work/youtube-channel-showcase.png',
        alt: 'Magic Lens YouTube Studio content overview and analytics',
        caption: 'YouTube Studio channel organization, Shorts catalog, and real engagement metrics.',
        bgTone: 'cream',
      },
      {
        src: '/assets/work/youtube-studio-shorts.png',
        alt: 'Magic Lens YouTube Shorts catalog thumbnails',
        caption: 'Visual Short-form concepts featuring miniature culinary scenes and AI-styled storytelling.',
        bgTone: 'dark',
      },
      {
        src: '/assets/work/youtube-video-insights.png',
        alt: 'YouTube Video Insights retention and reach view',
        caption: 'Individual Short insights tracking views, reach, and viewer retention.',
        bgTone: 'dark',
      },
    ],
    overview:
      'Created and managed engaging short-form visual content for my personal YouTube channel, Magic Lens. Handled creative concept development, AI-generated visuals, short-form editing, publishing structure, and YouTube Studio analytics review.',
    highlights: [
      'End-to-end Shorts pipeline: ideation, visual generation, rhythmic editing, and packaging.',
      'Real studio engagement tracking including 45.3% stayed-to-watch audience retention and 1.2K views/likes snapshots.',
      'Consistent visual hooks crafted specifically for vertical mobile discovery feeds.',
    ],
    deliverables: ['Creative Concept Development', 'AI Visuals', 'YouTube Shorts Editing', 'Channel Management'],
  },
  {
    id: 'magic-lens-instagram',
    title: 'Magic Lens — Instagram Content Grid & Miniature Reels',
    shortDescription:
      'Curated Instagram feed aesthetics, miniature-style visual storytelling, Reels covers, and profile presentation.',
    category: 'Social Media & Content',
    secondaryCategories: ['Video & AI Creation', 'AI Imagery & Editing'],
    provenanceLabel: 'Original Work',
    isConcept: false,
    role: 'Social Media Content Creator',
    relatedService: 'Social Media Management',
    featuredSize: 'standard',
    coverImage: '/assets/work/instagram-content-grid.png',
    coverAlt: 'Magic Lens Instagram grid showcasing miniature cooking and creative visual Reels',
    coverFit: 'cover',
    coverBg: '#171717',
    gallery: [
      {
        src: '/assets/work/instagram-content-grid.png',
        alt: 'Instagram Reels and visual content grid for Magic Lens',
        caption: 'Visual feed featuring miniature baking, miniature brick architecture, and playful AI visual concepts.',
        bgTone: 'dark',
      },
      {
        src: '/assets/work/instagram-profile-magic-lens.png',
        alt: 'Magic Lens Instagram profile bio and brand avatar setup',
        caption: 'Profile identity, avatar design, and clear bio positioning for Magic Lens.',
        bgTone: 'dark',
      },
    ],
    overview:
      'Designed and curated creative visual content for the Magic Lens Instagram presence, combining miniature-style short-form video frames, playful AI-assisted art, clean profile positioning, and an inviting visual grid.',
    highlights: [
      'Distinctive miniature cooking, tiny architectural builds, and imaginative animated characters.',
      'Cohesive grid pacing with warm cinematic lighting and high visual curiosity in the first frame.',
      'Complete profile presentation including avatar design, bio copywriting, and content structure.',
    ],
    deliverables: ['Instagram Post Design', 'Miniature Video Concepts', 'Profile Presentation', 'Content Creation'],
  },
  {
    id: 'monikas-magik-menu',
    title: "Monika's Magik — Promotional Menu & Poster Design",
    shortDescription:
      'High-impact crimson and golden menu graphic built for quick readability and strong appetite appeal.',
    category: 'Branding & Graphic Design',
    secondaryCategories: ['Social Media & Content'],
    provenanceLabel: 'Original Work',
    isConcept: false,
    role: 'Graphic Designer',
    relatedService: 'Graphic Designing',
    featuredSize: 'standard',
    coverImage: '/assets/work/monikas-magik-menu.png',
    coverAlt: "Monika's Magik promotional pasta menu poster design",
    coverFit: 'contain',
    coverBg: '#9B0A12',
    gallery: [
      {
        src: '/assets/work/monikas-magik-menu.png',
        alt: "Monika's Magik pasta menu layout",
        caption: 'Structured six-dish promotional menu featuring price badges and rich culinary photography.',
        bgTone: 'cream',
      },
    ],
    overview:
      "Designed a vibrant, easy-to-scan food menu and promotional poster for Monika's Magik highlighting homemade pasta offerings with clear pricing badges and festive brand framing.",
    highlights: [
      'High-contrast crimson and warm butter-yellow palette engineered for instant hunger appeal.',
      'Clean card grid pairing dish names, vivid food visuals, and clear ₹55/- price tags.',
      'Ready for both print display and WhatsApp/Instagram catalog sharing.',
    ],
    deliverables: ['Menu Layout', 'Promotional Poster', 'Brand Typography', 'Food Visual Framing'],
  },
  {
    id: 'concept-skincare-branding',
    title: 'Aethel Botanical — Luxury Skincare Branding',
    shortDescription:
      'Editorial brand identity, embossed packaging, amber serum bottles, and minimalist product presentation.',
    category: 'Branding & Graphic Design',
    secondaryCategories: ['AI Imagery & Editing'],
    provenanceLabel: 'Concept Project',
    isConcept: true,
    role: 'Brand Identity & Packaging Direction',
    relatedService: 'Branding',
    featuredSize: 'wide',
    coverImage: '/src/assets/images/concept_skincare_branding_1795259322711.jpg',
    coverAlt: 'Concept project for Aethel Botanical luxury skincare packaging on travertine stone',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_skincare_branding_1795259322711.jpg',
        alt: 'Aethel Botanical luxury serum dropper, nourishing cream jar, and embossed box',
        caption: 'Concept packaging system pairing frosted amber glass, brushed brass caps, and blind-embossed serif typography.',
        bgTone: 'cream',
      },
      {
        src: '/src/assets/images/concept_social_campaign_1795259335717.jpg',
        alt: 'Matching Instagram social campaign slides for luxury skincare',
        caption: 'Companion social media carousel layouts extending the packaging aesthetic to Instagram.',
        bgTone: 'cream',
      },
    ],
    overview:
      'A self-initiated luxury skincare concept exploring calm editorial typography, tactile packaging materials, and sunlit natural product visuals designed for modern D2C beauty brands.',
    highlights: [
      'Refined serif wordmark paired with delicate botanical line illustrations.',
      'Cohesive packaging hierarchy across serum dropper bottles, cream jars, and outer cartons.',
      'Warm travertine art direction demonstrating high-perceived value for beauty launches.',
    ],
    deliverables: ['Logo Concept', 'Packaging Mockups', 'Product Ad Visuals', 'Instagram Launch Assets'],
  },
  {
    id: 'concept-ai-cinematic-ad',
    title: 'Aurora — AI Cinematic Product Advertisement',
    shortDescription:
      'AI-directed luxury fragrance commercial concept combining moody obsidian reflections and volumetric lighting.',
    category: 'Video & AI Creation',
    secondaryCategories: ['AI Imagery & Editing'],
    provenanceLabel: 'Creative Practice',
    isConcept: true,
    role: 'AI Visual Direction & Video Concept',
    relatedService: 'AI Video Creation',
    featuredSize: 'wide',
    coverImage: '/src/assets/images/concept_ai_cinematic_ad_1795259381356.jpg',
    coverAlt: 'AI cinematic commercial concept frame of a sculptural crystal perfume bottle over dark rippled water',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_ai_cinematic_ad_1795259381356.jpg',
        alt: 'Aurora AI-generated commercial film still',
        caption: 'Keyframe art direction for a 15-second AI-assisted commercial spot with suspended light particles.',
        bgTone: 'dark',
      },
    ],
    overview:
      'A creative practice showcase demonstrating how AI image generation and AI video workflows can deliver cinema-grade luxury product commercials at a fraction of traditional studio production timelines.',
    highlights: [
      'Anamorphic depth-of-field styling with golden volumetric backlight and obsidian water reflections.',
      'Storyboarding and visual continuity designed for 9:16 Reels ads and 16:9 brand films.',
      'Ideal workflow for D2C perfumes, beverages, cosmetics, and product launches.',
    ],
    deliverables: ['AI Product Visuals', 'Cinematic Ad Concept', 'Lighting Art Direction', 'Short-Form Storyboard'],
  },
  {
    id: 'concept-cafe-branding',
    title: 'Luna Coffee Roasters — Modern Cafe Identity',
    shortDescription:
      'Artisanal cafe logo emblem, linen-textured menu layout, takeaway cup branding, and pastry box packaging.',
    category: 'Branding & Graphic Design',
    provenanceLabel: 'Concept Project',
    isConcept: true,
    role: 'Branding & Print Design Concept',
    relatedService: 'Branding',
    featuredSize: 'standard',
    coverImage: '/src/assets/images/concept_cafe_branding_1795259312910.jpg',
    coverAlt: 'Modern specialty cafe branding concept featuring Luna menu, coffee cup, and pastry box',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_cafe_branding_1795259312910.jpg',
        alt: 'Luna Specialty Coffee menu design and branded packaging mockup',
        caption: 'Warm tactile menu card paired with geometric monogram takeaway cup and bakery seal.',
        bgTone: 'cream',
      },
    ],
    overview:
      'A branding concept created for specialty coffee shops, bakeries, and modern cafes seeking warm hospitality paired with crisp minimalist print and social graphics.',
    highlights: [
      'Clean geometric emblem that stamps effortlessly onto kraft cups, sleeves, and pastry seals.',
      'Structured typographic menu layout prioritizing effortless readability and generous whitespace.',
      'Ready to extend into food promotional posters and cozy Instagram content grids.',
    ],
    deliverables: ['Cafe Logo System', 'Print Menu Design', 'Packaging Concept', 'Promotional Graphics'],
  },
  {
    id: 'concept-fashion-campaign',
    title: 'Aura Atelier — Fashion Social Media Campaign',
    shortDescription:
      'High-fashion ivory and cobalt lookbook styling, tactile editorial cards, and promotional social creatives.',
    category: 'Social Media & Content',
    secondaryCategories: ['AI Imagery & Editing'],
    provenanceLabel: 'Sample Work',
    isConcept: true,
    role: 'Art Direction & Social Campaign Design',
    relatedService: 'Graphic Designing',
    featuredSize: 'tall',
    coverImage: '/src/assets/images/concept_fashion_campaign_1795259312196.jpg',
    coverAlt: 'Editorial fashion social campaign sample featuring ivory linen and cobalt blue lookbook frames',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_fashion_campaign_1795259312196.jpg',
        alt: 'Aura Atelier lookbook and framed editorial social media campaign visuals',
        caption: 'Minimalist architectural presentation uniting editorial lookbook spreads with campaign creatives.',
        bgTone: 'cream',
      },
    ],
    overview:
      'A fashion campaign sample exploring crisp daylight shadows, ivory linen tones, and electric cobalt accents tailored for contemporary clothing labels and boutique launches.',
    highlights: [
      'High-contrast editorial framing that lets garment silhouettes and focal accent colors breathe.',
      'Cohesive multi-format assets suitable for Instagram posts, story drops, and lookbook PDFs.',
      'Elevated typography combining understated serif headings with clean collection metadata.',
    ],
    deliverables: ['Campaign Direction', 'Instagram Lookbook Frames', 'Promotional Creatives', 'Ad Concepts'],
  },
  {
    id: 'concept-youtube-creator',
    title: 'Studio Luna — YouTube Creator Branding Kit',
    shortDescription:
      'Cohesive YouTube channel banner, high-CTR thumbnail templates, and vertical Shorts cover system.',
    category: 'YouTube & Channels',
    secondaryCategories: ['Branding & Graphic Design'],
    provenanceLabel: 'Concept Project',
    isConcept: true,
    role: 'Channel Identity & Thumbnail System',
    relatedService: 'Social Media Management',
    featuredSize: 'standard',
    coverImage: '/src/assets/images/concept_youtube_creator_1795259316103.jpg',
    coverAlt: 'Studio Luna YouTube creator branding mockup showing channel header, thumbnails, and Shorts covers',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_youtube_creator_1795259316103.jpg',
        alt: 'YouTube creator desktop brand kit showcase',
        caption: 'Unified channel banner, high-contrast long-form thumbnails, and bold Shorts cover templates.',
        bgTone: 'dark',
      },
    ],
    overview:
      'A complete YouTube creator brand identity concept designed to help educators, filmmakers, and personal brands build instant visual recognition across desktop and mobile feeds.',
    highlights: [
      'High-legibility thumbnail hierarchy designed to read clearly even at small mobile feed sizes.',
      'Consistent color coding separating tutorials, gear guides, behind-the-scenes, and Shorts.',
      'Repeatable template structure that accelerates weekly creator publishing workflows.',
    ],
    deliverables: ['YouTube Channel Banner', 'Thumbnail Templates', 'Shorts Identity', 'Creator Style Guide'],
  },
  {
    id: 'concept-social-campaign',
    title: 'Aura Collective — Editorial Carousel & Reels Suite',
    shortDescription:
      'Five-slide Instagram carousel storytelling, Reels cover design, and cohesive visual rhythm.',
    category: 'AI Imagery & Editing',
    secondaryCategories: ['Social Media & Content'],
    provenanceLabel: 'Sample Work',
    isConcept: true,
    role: 'Social Visual Design & Image Styling',
    relatedService: 'AI Image Creation',
    featuredSize: 'standard',
    coverImage: '/src/assets/images/concept_social_campaign_1795259335717.jpg',
    coverAlt: 'Five-slide Instagram carousel and Reels cover campaign sample in warm cream and electric blue',
    coverFit: 'cover',
    gallery: [
      {
        src: '/src/assets/images/concept_social_campaign_1795259335717.jpg',
        alt: 'Five editorial social media carousel cards',
        caption: 'Structured narrative carousel built to drive saves, swipes, and brand recall on Instagram.',
        bgTone: 'cream',
      },
    ],
    overview:
      'A sample social media campaign showing how clean editorial typography, consistent product lighting, and disciplined color accents transform educational posts into save-worthy brand assets.',
    highlights: [
      'Seamless five-panel storytelling cadence from hook headline to final call-to-action.',
      'Balanced warm cream canvas paired with electric cobalt blue focal emphasis.',
      'Adaptable grid structure for product launches, skincare routines, or brand storytelling.',
    ],
    deliverables: ['Instagram Carousels', 'Reels Covers', 'Image Styling & Retouching', 'Campaign Templates'],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: "Understanding the client's requirements, ideas and goals.",
    detail: 'Clarifying your audience, brand tone, deliverables, and timeline before a single pixel is placed.',
  },
  {
    number: '02',
    title: 'Explore',
    description: 'Researching references, exploring styles and developing creative concepts.',
    detail: 'Curating moodboards, typography pairings, visual hooks, and AI/design directions tailored to your niche.',
  },
  {
    number: '03',
    title: 'Create',
    description: 'Designing, editing and producing the required creative content.',
    detail: 'Crafting polished graphics, brand identities, Reels, Shorts, and visual assets with close attention to detail.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Sharing polished final work and making revisions based on feedback.',
    detail: 'Handing over export-ready files formatted cleanly for print, Instagram, YouTube, and digital campaigns.',
  },
];

export interface WhyWorkItem {
  number: string;
  title: string;
  description: string;
}

export const WHY_WORK_ITEMS: WhyWorkItem[] = [
  {
    number: '01',
    title: 'Creative and Fresh Ideas',
    description:
      'Every project starts with thoughtful concepts tailored to your brand personality instead of recycled templates.',
  },
  {
    number: '02',
    title: 'Attention to Visual Details',
    description:
      'From kerning and color harmony to pacing and framing, small visual refinements create a lasting premium impression.',
  },
  {
    number: '03',
    title: 'Multiple Creative Services in One Place',
    description:
      'Keep your branding, social creatives, video editing, and content writing visually aligned with a single creative partner.',
  },
  {
    number: '04',
    title: 'AI-Powered Creative Possibilities',
    description:
      'Blending human taste with modern AI image and video workflows opens up imaginative concepts previously out of reach.',
  },
  {
    number: '05',
    title: 'Focus on Engaging Content',
    description:
      'Visuals designed with real platform behavior in mind—crafted to capture attention cleanly on Instagram and YouTube.',
  },
  {
    number: '06',
    title: 'Open Communication and Collaboration',
    description:
      'Clear updates, responsive WhatsApp collaboration, and collaborative revisions so the final output feels genuinely yours.',
  },
];

export const ABOUT_HIGHLIGHTS = [
  {
    label: 'Creative Focus',
    value: 'Branding, Design & Motion',
  },
  {
    label: 'Modern Workflow',
    value: 'AI Visuals & Short-Form Video',
  },
  {
    label: 'Based In',
    value: 'Bhopal, Madhya Pradesh',
  },
  {
    label: 'Collaboration',
    value: 'Remote & Freelance Friendly',
  },
] as const;
