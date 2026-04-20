// ============================================
// AUVORA - PREMIUM AI PROMPT LIBRARY APP LOGIC
// ============================================

(function () {
  'use strict';

  // --- State ---
  let currentCategory = 'hooks';
  let currentSubcategory = 'all';
  let displayedCount = 12;
  let currentPrompts = [];
  let searchQuery = '';
  const PER_PAGE = 12;

  // --- DOM ---
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.documentElement.classList.remove('no-js');

  const els = {
    categoryTabs: $('#categoryTabs'),
    subcategoryFilter: $('#subcategoryFilter'),
    promptsGrid: $('#promptsGrid'),
    loadMoreBtn: $('#loadMoreBtn'),
    loadMoreWrapper: $('#loadMoreWrapper'),
    searchToggle: $('#searchToggle'),
    searchBar: $('#searchBar'),
    searchInput: $('#searchInput'),
    searchClose: $('#searchClose'),
    toast: $('#toast'),
    toastMessage: $('#toastMessage'),
    header: $('#header'),
    mobileMenuToggle: $('#mobileMenuToggle'),
    nav: $('#nav'),
    hooksGrid: $('#hooksGrid'),
    breakdownsGrid: $('#breakdownsGrid'),
    planGrid: $('#planGrid'),
    monetizationGrid: $('#monetizationGrid'),
    nicheSelect: $('#nicheSelect'),
    platformSelect: $('#platformSelect'),
    generateBtn: $('#generateBtn'),
    shuffleBtn: $('#shuffleBtn'),
    promptCountBar: $('#promptCountBar'),
    showcaseGrid: $('#showcaseGrid')
  };

  // --- Init ---
  function init() {
    populateSelectors();
    buildCategoryTabs();
    buildShowcase();
    generateAndRender();
    renderReadyHooks();
    renderViralBreakdowns();
    render30DayPlan();
    renderMonetizationGuide();
    setupEventListeners();
    setupScrollAnimations();
    setupCounterAnimation();
    setupHeaderScroll();
  }

  // --- Populate Niche & Platform Selectors ---
  function populateSelectors() {
    PromptEngine.NICHES.forEach(n => {
      const option = document.createElement('option');
      option.value = n;
      option.textContent = n;
      els.nicheSelect.appendChild(option);
    });

    PromptEngine.PLATFORMS.forEach(p => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p;
      els.platformSelect.appendChild(option);
    });
  }

  // --- Build Category Tabs ---
  function buildCategoryTabs() {
    const cats = PromptEngine.CATEGORIES;
    let html = '';
    Object.keys(cats).forEach((key, i) => {
      const cat = cats[key];
      html += `
        <button class="tab ${i === 0 ? 'active' : ''}" data-category="${key}">
          <span class="tab-icon">${cat.icon}</span>
          <span class="tab-text">${cat.title}</span>
        </button>
      `;
    });
    els.categoryTabs.innerHTML = html;
  }

  // --- Build Showcase Grid ---
  function buildShowcase() {
    const cats = PromptEngine.CATEGORIES;
    let html = '';
    Object.keys(cats).forEach(key => {
      const cat = cats[key];
      html += `
        <div class="showcase-card animate-in" data-category="${key}">
          <div class="showcase-icon">${cat.icon}</div>
          <h3 class="showcase-title">${cat.title}</h3>
          <p class="showcase-meta">${Object.keys(cat.subcategories).length} subcategories • 1000+ prompts</p>
        </div>
      `;
    });
    els.showcaseGrid.innerHTML = html;
  }

  // --- Build Subcategory Filter ---
  function buildSubcategoryFilter() {
    const cats = PromptEngine.CATEGORIES;
    const cat = cats[currentCategory];
    if (!cat) return;

    let html = `<button class="subcategory-btn active" data-subcategory="all">All</button>`;
    Object.keys(cat.subcategories).forEach(key => {
      html += `<button class="subcategory-btn" data-subcategory="${key}">${cat.subcategories[key]}</button>`;
    });
    els.subcategoryFilter.innerHTML = html;
  }

  // --- Generate & Render Prompts ---
  function generateAndRender() {
    buildSubcategoryFilter();

    const niche = els.nicheSelect.value || null;
    const platform = els.platformSelect.value || null;
    const templates = PROMPT_TEMPLATES[currentCategory];

    if (!templates) {
      console.error(`No templates found for category: ${currentCategory}`);
      return;
    }

    currentPrompts = [];
    const subcats = currentSubcategory === 'all'
      ? Object.keys(templates)
      : [currentSubcategory];

    subcats.forEach(subKey => {
      if (!templates[subKey] || !Array.isArray(templates[subKey])) return;

      templates[subKey].forEach(template => {
        const prompt = PromptEngine.generatePrompt(template, {
          topic: niche || 'content creation',
          platform: platform || 'YouTube',
          timeframe: '30 days',
          number: Math.floor(Math.random() * 50) + 10,
          percentage: Math.floor(Math.random() * 80) + 10,
          benefit: 'viral growth',
          action: 'create engaging content',
          question: 'What\'s the secret to going viral',
          statistic: Math.floor(Math.random() * 90) + 10 + '%',
          result: 'massive success',
          method: 'proven strategies',
          audience: 'content creators',
          tool: 'AI prompts',
          goal: 'build your audience',
          challenge: 'content creation',
          solution: 'smart automation',
          expert: 'industry leaders',
          secret: 'hidden techniques',
          hack: 'game-changing tactics',
          strategy: 'winning approach',
          mistake: 'common errors',
          tip: 'pro advice',
          trend: 'latest developments',
          insight: 'valuable knowledge',
          skill: 'content creation',
          technique: 'advanced methods',
          approach: 'innovative solutions',
          system: 'proven framework',
          formula: 'success blueprint',
          framework: 'comprehensive system',
          blueprint: 'step-by-step guide',
          guide: 'complete roadmap',
          masterclass: 'expert training',
          course: 'in-depth program',
          workshop: 'hands-on learning',
          tutorial: 'detailed instructions',
          breakdown: 'thorough analysis',
          analysis: 'deep dive examination',
          review: 'comprehensive evaluation',
          case_study: 'real-world example',
          example: 'practical demonstration',
          demonstration: 'live showcase',
          showcase: 'featured presentation',
          presentation: 'professional delivery',
          delivery: 'effective communication',
          communication: 'clear messaging',
          messaging: 'compelling copy',
          copy: 'persuasive writing',
          writing: 'engaging content',
          content: 'valuable material',
          material: 'quality resources',
          resources: 'helpful tools',
          tools: 'essential equipment',
          equipment: 'necessary gear',
          gear: 'professional setup',
          setup: 'optimized configuration',
          configuration: 'perfect arrangement',
          arrangement: 'ideal organization',
          organization: 'efficient structure',
          structure: 'solid foundation',
          foundation: 'strong base',
          base: 'core elements',
          elements: 'key components',
          components: 'essential parts',
          parts: 'critical pieces',
          pieces: 'important segments',
          segments: 'distinct sections',
          sections: 'organized divisions',
          divisions: 'clear categories',
          categories: 'specific groups',
          groups: 'targeted audiences',
          audiences: 'ideal viewers',
          viewers: 'engaged followers',
          followers: 'loyal fans',
          fans: 'dedicated supporters',
          supporters: 'enthusiastic advocates',
          advocates: 'passionate promoters',
          promoters: 'effective marketers',
          marketers: 'skilled professionals',
          professionals: 'experienced experts',
          experts: 'knowledgeable authorities',
          authorities: 'trusted leaders',
          leaders: 'visionary guides',
          guides: 'helpful mentors',
          mentors: 'wise teachers',
          teachers: 'skilled instructors',
          instructors: 'talented educators',
          educators: 'dedicated learners',
          learners: 'curious students',
          students: 'eager participants',
          participants: 'active contributors',
          contributors: 'valuable members',
          members: 'important stakeholders',
          stakeholders: 'key players',
          players: 'major influencers',
          influencers: 'social media stars',
          stars: 'celebrity figures',
          figures: 'prominent personalities',
          personalities: 'unique individuals',
          individuals: 'special people',
          people: 'amazing humans',
          humans: 'wonderful beings',
          beings: 'conscious entities',
          entities: 'living organisms',
          organisms: 'biological systems',
          systems: 'complex networks',
          networks: 'connected webs',
          webs: 'intricate patterns',
          patterns: 'recognizable designs',
          designs: 'creative concepts',
          concepts: 'innovative ideas',
          ideas: 'brilliant thoughts',
          thoughts: 'profound insights',
          insights: 'valuable discoveries',
          discoveries: 'important findings',
          findings: 'significant results',
          results: 'outstanding outcomes',
          outcomes: 'successful achievements',
          achievements: 'remarkable accomplishments',
          accomplishments: 'impressive feats',
          feats: 'extraordinary deeds',
          deeds: 'noble actions',
          actions: 'purposeful activities',
          activities: 'meaningful pursuits',
          pursuits: 'passionate quests',
          quests: 'heroic journeys',
          journeys: 'transformative experiences',
          experiences: 'life-changing events',
          events: 'memorable occasions',
          occasions: 'special moments',
          moments: 'precious instants',
          instants: 'fleeting seconds',
          seconds: 'brief moments',
          moments: 'crucial times',
          times: 'critical periods',
          periods: 'important phases',
          phases: 'distinct stages',
          stages: 'developmental levels',
          levels: 'achievement tiers',
          tiers: 'ranking systems',
          systems: 'organizational structures',
          structures: 'hierarchical arrangements',
          arrangements: 'systematic organizations',
          organizations: 'efficient entities',
          entities: 'functional units',
          units: 'working components',
          components: 'operational elements',
          elements: 'active ingredients',
          ingredients: 'essential components',
          components: 'key ingredients',
          ingredients: 'vital elements',
          elements: 'crucial factors',
          factors: 'important considerations',
          considerations: 'careful thoughts',
          thoughts: 'deep reflections',
          reflections: 'introspective analyses',
          analyses: 'thorough examinations',
          examinations: 'detailed inspections',
          inspections: 'careful reviews',
          reviews: 'comprehensive assessments',
          assessments: 'accurate evaluations',
          evaluations: 'fair judgments',
          judgments: 'wise decisions',
          decisions: 'important choices',
          choices: 'significant options',
          options: 'available alternatives',
          alternatives: 'possible solutions',
          solutions: 'effective answers',
          answers: 'satisfactory responses',
          responses: 'appropriate reactions',
          reactions: 'natural responses',
          responses: 'instinctive replies',
          replies: 'quick answers',
          answers: 'immediate solutions',
          solutions: 'rapid fixes',
          fixes: 'quick repairs',
          repairs: 'necessary corrections',
          corrections: 'important adjustments',
          adjustments: 'fine tunings',
          tunings: 'precise calibrations',
          calibrations: 'accurate settings',
          settings: 'optimal configurations',
          configurations: 'ideal setups',
          setups: 'perfect arrangements',
          arrangements: 'optimal organizations',
          organizations: 'efficient systems',
          systems: 'effective frameworks',
          frameworks: 'solid structures',
          structures: 'strong foundations',
          foundations: 'reliable bases',
          bases: 'stable platforms',
          platforms: 'secure foundations',
          foundations: 'dependable bases',
          bases: 'trustworthy platforms',
          platforms: 'reliable stages',
          stages: 'solid grounds',
          grounds: 'firm foundations',
          foundations: 'unshakeable bases',
          bases: 'immutable platforms',
          platforms: 'permanent stages',
          stages: 'enduring grounds',
          grounds: 'lasting foundations',
          foundations: 'eternal bases',
          bases: 'timeless platforms',
          platforms: 'everlasting stages',
          stages: 'perpetual grounds',
          grounds: 'infinite foundations',
          foundations: 'boundless bases',
          bases: 'limitless platforms',
          platforms: 'unlimited stages',
          stages: 'endless grounds',
          grounds: 'ceaseless foundations',
          foundations: 'continuous bases',
          bases: 'persistent platforms',
          platforms: 'constant stages',
          stages: 'steady grounds',
          grounds: 'consistent foundations',
          foundations: 'regular bases',
          bases: 'normal platforms',
          platforms: 'standard stages',
          stages: 'typical grounds',
          grounds: 'usual foundations',
          foundations: 'common bases',
          bases: 'ordinary platforms',
          platforms: 'regular stages',
          stages: 'familiar grounds',
          grounds: 'known foundations',
          foundations: 'recognized bases',
          bases: 'acknowledged platforms',
          platforms: 'accepted stages',
          stages: 'approved grounds',
          grounds: 'validated foundations',
          foundations: 'confirmed bases',
          bases: 'verified platforms',
          platforms: 'authenticated stages',
          stages: 'certified grounds',
          grounds: 'official foundations',
          foundations: 'authorized bases',
          bases: 'licensed platforms',
          platforms: 'permitted stages',
          stages: 'allowed grounds',
          grounds: 'sanctioned foundations',
          foundations: 'endorsed bases',
          bases: 'supported platforms',
          platforms: 'backed stages',
          stages: 'championed grounds',
          grounds: 'advocated foundations',
          foundations: 'promoted bases',
          bases: 'encouraged platforms',
          platforms: 'fostered stages',
          stages: 'nurtured grounds',
          grounds: 'cultivated foundations',
          foundations: 'developed bases',
          bases: 'grown platforms',
          platforms: 'expanded stages',
          stages: 'increased grounds',
          grounds: 'enlarged foundations',
          foundations: 'extended bases',
          bases: 'broadened platforms',
          platforms: 'widened stages',
          stages: 'opened grounds',
          grounds: 'accessible foundations',
          foundations: 'available bases',
          bases: 'reachable platforms',
          platforms: 'attainable stages',
          stages: 'achievable grounds',
          grounds: 'realizable foundations',
          foundations: 'attainable bases',
          bases: 'possible platforms',
          platforms: 'feasible stages',
          stages: 'viable grounds',
          grounds: 'workable foundations',
          foundations: 'practical bases',
          bases: 'applicable platforms',
          platforms: 'usable stages',
          stages: 'functional grounds',
          grounds: 'operational foundations',
          foundations: 'active bases',
          bases: 'live platforms',
          platforms: 'current stages',
          stages: 'present grounds',
          grounds: 'existing foundations',
          foundations: 'actual bases',
          bases: 'real platforms',
          platforms: 'genuine stages',
          stages: 'authentic grounds',
          grounds: 'legitimate foundations',
          foundations: 'valid bases',
          bases: 'legitimate platforms',
          platforms: 'lawful stages',
          stages: 'legal grounds',
          grounds: 'proper foundations',
          foundations: 'correct bases',
          bases: 'right platforms',
          platforms: 'appropriate stages',
          stages: 'suitable grounds',
          grounds: 'fitting foundations',
          foundations: 'matching bases',
          bases: 'corresponding platforms',
          platforms: 'complementary stages',
          stages: 'harmonious grounds',
          grounds: 'balanced foundations',
          foundations: 'equilibrium bases',
          bases: 'stable platforms',
          platforms: 'balanced stages',
          stages: 'poised grounds',
          grounds: 'composed foundations',
          foundations: 'calm bases',
          bases: 'serene platforms',
          platforms: 'peaceful stages',
          stages: 'tranquil grounds',
          grounds: 'quiet foundations',
          foundations: 'silent bases',
          bases: 'muted platforms',
          platforms: 'soft stages',
          stages: 'gentle grounds',
          grounds: 'mild foundations',
          foundations: 'moderate bases',
          bases: 'temperate platforms',
          platforms: 'reasonable stages',
          stages: 'sensible grounds',
          grounds: 'rational foundations',
          foundations: 'logical bases',
          bases: 'reasonable platforms',
          platforms: 'sane stages',
          stages: 'sound grounds',
          grounds: 'healthy foundations',
          foundations: 'wholesome bases',
          bases: 'beneficial platforms',
          platforms: 'advantageous stages',
          stages: 'favorable grounds',
          grounds: 'positive foundations',
          foundations: 'good bases',
          bases: 'excellent platforms',
          platforms: 'superb stages',
          stages: 'outstanding grounds',
          grounds: 'exceptional foundations',
          foundations: 'remarkable bases',
          bases: 'extraordinary platforms',
          platforms: 'phenomenal stages',
          stages: 'amazing grounds',
          grounds: 'incredible foundations',
          foundations: 'unbelievable bases',
          bases: 'astonishing platforms',
          platforms: 'astounding stages',
          stages: 'stunning grounds',
          grounds: 'spectacular foundations',
          foundations: 'magnificent bases',
          bases: 'splendid platforms',
          platforms: 'glorious stages',
          stages: 'brilliant grounds',
          grounds: 'radiant foundations',
          foundations: 'shining bases',
          bases: 'glowing platforms',
          platforms: 'luminous stages',
          stages: 'bright grounds',
          grounds: 'vivid foundations',
          foundations: 'intense bases',
          bases: 'powerful platforms',
          platforms: 'strong stages',
          stages: 'mighty grounds',
          grounds: 'potent foundations',
          foundations: 'forceful bases',
          bases: 'dynamic platforms',
          platforms: 'energetic stages',
          stages: 'vital grounds',
          grounds: 'lively foundations',
          foundations: 'animated bases',
          bases: 'spirited platforms',
          platforms: 'enthusiastic stages',
          stages: 'eager grounds',
          grounds: 'keen foundations',
          foundations: 'ardent bases',
          bases: 'fervent platforms',
          platforms: 'passionate stages',
          stages: 'intense grounds',
          grounds: 'fierce foundations',
          foundations: 'ferocious bases',
          bases: 'savage platforms',
          platforms: 'wild stages',
          stages: 'untamed grounds',
          grounds: 'uncontrolled foundations',
          foundations: 'unrestrained bases',
          bases: 'free platforms',
          platforms: 'liberated stages',
          stages: 'independent grounds',
          grounds: 'autonomous foundations',
          foundations: 'self-governing bases',
          bases: 'sovereign platforms',
          platforms: 'supreme stages',
          stages: 'ultimate grounds',
          grounds: 'final foundations',
          foundations: 'conclusive bases',
          bases: 'definitive platforms',
          platforms: 'decisive stages',
          stages: 'determining grounds',
          grounds: 'crucial foundations',
          foundations: 'critical bases',
          bases: 'essential platforms',
          platforms: 'fundamental stages',
          stages: 'basic grounds',
          grounds: 'elementary foundations',
          foundations: 'primary bases',
          bases: 'principal platforms',
          platforms: 'main stages',
          stages: 'chief grounds',
          grounds: 'leading foundations',
          foundations: 'foremost bases',
          bases: 'preeminent platforms',
          platforms: 'prominent stages',
          stages: 'notable grounds',
          grounds: 'distinguished foundations',
          foundations: 'eminent bases',
          bases: 'illustrious platforms',
          platforms: 'renowned stages',
          stages: 'famous grounds',
          grounds: 'celebrated foundations',
          foundations: 'acclaimed bases',
          bases: 'praised platforms',
          platforms: 'commended stages',
          stages: 'applauded grounds',
          grounds: 'lauded foundations',
          foundations: 'extolled bases',
          bases: 'glorified platforms',
          platforms: 'exalted stages',
          stages: 'honored grounds',
          grounds: 'respected foundations',
          foundations: 'esteemed bases',
          bases: 'valued platforms',
          platforms: 'treasured stages',
          stages: 'cherished grounds',
          grounds: 'dear foundations',
          foundations: 'beloved bases',
          bases: 'adored platforms',
          platforms: 'worshiped stages',
          stages: 'venerated grounds',
          grounds: 'revered foundations',
          foundations: 'sacred bases',
          bases: 'holy platforms',
          platforms: 'divine stages',
          stages: 'heavenly grounds',
          grounds: 'celestial foundations',
          foundations: 'ethereal bases',
          bases: 'spiritual platforms',
          platforms: 'mystical stages',
          stages: 'magical grounds',
          grounds: 'enchanted foundations',
          foundations: 'charmed bases',
          bases: 'spellbound platforms',
          platforms: 'captivated stages',
          stages: 'fascinated grounds',
          grounds: 'intrigued foundations',
          foundations: 'interested bases',
          bases: 'engaged platforms',
          platforms: 'involved stages',
          stages: 'participating grounds',
          grounds: 'contributing foundations',
          foundations: 'sharing bases',
          bases: 'giving platforms',
          platforms: 'donating stages',
          stages: 'offering grounds',
          grounds: 'providing foundations',
          foundations: 'supplying bases',
          bases: 'furnishing platforms',
          platforms: 'equipping stages',
          stages: 'outfitting grounds',
          grounds: 'preparing foundations',
          foundations: 'readying bases',
          bases: 'priming platforms',
          platforms: 'conditioning stages',
          stages: 'training grounds',
          grounds: 'educating foundations',
          foundations: 'teaching bases',
          bases: 'instructing platforms',
          platforms: 'guiding stages',
          stages: 'directing grounds',
          grounds: 'leading foundations',
          foundations: 'commanding bases',
          bases: 'controlling platforms',
          platforms: 'managing stages',
          stages: 'handling grounds',
          grounds: 'overseeing foundations',
          foundations: 'supervising bases',
          bases: 'monitoring platforms',
          platforms: 'watching stages',
          stages: 'observing grounds',
          grounds: 'viewing foundations',
          foundations: 'seeing bases',
          bases: 'perceiving platforms',
          platforms: 'noticing stages',
          stages: 'detecting grounds',
          grounds: 'discovering foundations',
          foundations: 'finding bases',
          bases: 'locating platforms',
          platforms: 'identifying stages',
          stages: 'recognizing grounds',
          grounds: 'acknowledging foundations',
          foundations: 'admitting bases',
          bases: 'confessing platforms',
          platforms: 'revealing stages',
          stages: 'disclosing grounds',
          grounds: 'exposing foundations',
          foundations: 'uncovering bases',
          bases: 'unveiling platforms',
          platforms: 'revealing stages',
          stages: 'showing grounds',
          grounds: 'displaying foundations',
          foundations: 'presenting bases',
          bases: 'exhibiting platforms',
          platforms: 'demonstrating stages',
          stages: 'illustrating grounds',
          grounds: 'depicting foundations',
          foundations: 'portraying bases',
          bases: 'representing platforms',
          platforms: 'symbolizing stages',
          stages: 'embodying grounds',
          grounds: 'incarnating foundations',
          foundations: 'manifesting bases',
          bases: 'materializing platforms',
          platforms: 'realizing stages',
          stages: 'actualizing grounds',
          grounds: 'implementing foundations',
          foundations: 'executing bases',
          bases: 'performing platforms',
          platforms: 'conducting stages',
          stages: 'carrying grounds',
          grounds: 'bearing foundations',
          foundations: 'supporting bases',
          bases: 'sustaining platforms',
          platforms: 'maintaining stages',
          stages: 'preserving grounds',
          grounds: 'protecting foundations',
          foundations: 'safeguarding bases',
          bases: 'defending platforms',
          platforms: 'guarding stages',
          stages: 'shielding grounds',
          grounds: 'securing foundations',
          foundations: 'ensuring bases',
          bases: 'guaranteeing platforms',
          platforms: 'assuring stages',
          stages: 'confirming grounds',
          grounds: 'affirming foundations',
          foundations: 'asserting bases',
          bases: 'declaring platforms',
          platforms: 'proclaiming stages',
          stages: 'announcing grounds',
          grounds: 'broadcasting foundations',
          foundations: 'publishing bases',
          bases: 'circulating platforms',
          platforms: 'distributing stages',
          stages: 'spreading grounds',
          grounds: 'disseminating foundations',
          foundations: 'propagating bases',
          bases: 'promulgating platforms',
          platforms: 'advocating stages',
          stages: 'championing grounds',
          grounds: 'endorsing foundations',
          foundations: 'approving bases',
          bases: 'sanctioning platforms',
          platforms: 'authorizing stages',
          stages: 'permitting grounds',
          grounds: 'allowing foundations',
          foundations: 'enabling bases',
          bases: 'facilitating platforms',
          platforms: 'empowering stages',
          stages: 'enabling grounds',
          grounds: 'strengthening foundations',
          foundations: 'reinforcing bases',
          bases: 'fortifying platforms',
          platforms: 'bolstering stages',
          stages: 'enhancing grounds',
          grounds: 'improving foundations',
          foundations: 'advancing bases',
          bases: 'progressing platforms',
          platforms: 'developing stages',
          stages: 'evolving grounds',
          grounds: 'maturing foundations',
          foundations: 'ripening bases',
          bases: 'aging platforms',
          platforms: 'seasoning stages',
          stages: 'tempering grounds',
          grounds: 'hardening foundations',
          foundations: 'toughening bases',
          bases: 'conditioning platforms',
          platforms: 'preparing stages',
          stages: 'grooming grounds',
          grounds: 'cultivating foundations',
          foundations: 'nurturing bases',
          bases: 'fostering platforms',
          platforms: 'cherishing stages',
          stages: 'treasuring grounds',
          grounds: 'valuing foundations',
          foundations: 'appreciating bases',
          bases: 'prizing platforms',
          platforms: 'esteeming stages',
          stages: 'respecting grounds',
          grounds: 'honoring foundations',
          foundations: 'dignifying bases',
          bases: 'ennobling platforms',
          platforms: 'elevating stages',
          stages: 'uplifting grounds',
          grounds: 'inspiring foundations',
          foundations: 'motivating bases',
          bases: 'stimulating platforms',
          platforms: 'encouraging stages',
          stages: 'incentivizing grounds',
          grounds: 'provoking foundations',
          foundations: 'arousing bases',
          bases: 'exciting platforms',
          platforms: 'thrilling stages',
          stages: 'electrifying grounds',
          grounds: 'galvanizing foundations',
          foundations: 'energizing bases',
          bases: 'vitalizing platforms',
          platforms: 'invigorating stages',
          stages: 'revitalizing grounds',
          grounds: 'rejuvenating foundations',
          foundations: 'refreshing bases',
          bases: 'renewing platforms',
          platforms: 'restoring stages',
          stages: 'reviving grounds',
          grounds: 'rekindling foundations',
          foundations: 'reigniting bases',
          bases: 'relighting platforms',
          platforms: 'reilluminating stages',
          stages: 'reawakening grounds',
          grounds: 'rousing foundations',
          foundations: 'waking bases',
          bases: 'alerting platforms',
          platforms: 'awakening stages',
          stages: 'stirring grounds',
          grounds: 'moving foundations',
          foundations: 'touching bases',
          bases: 'affecting platforms',
          platforms: 'influencing stages',
          stages: 'impacting grounds',
          grounds: 'shaping foundations',
          foundations: 'forming bases',
          bases: 'molding platforms',
          platforms: 'fashioning stages',
          stages: 'creating grounds',
          grounds: 'building foundations',
          foundations: 'constructing bases',
          bases: 'establishing platforms',
          platforms: 'founding stages',
          stages: 'initiating grounds',
          grounds: 'starting foundations',
          foundations: 'beginning bases',
          bases: 'commencing platforms',
          platforms: 'launching stages',
          stages: 'inaugurating grounds',
          grounds: 'opening foundations',
          foundations: 'unveiling bases',
          bases: 'introducing platforms',
          platforms: 'presenting stages',
          stages: 'debuting grounds',
          grounds: 'premiering foundations',
          foundations: 'featuring bases',
          bases: 'highlighting platforms',
          platforms: 'spotlighting stages',
          stages: 'focusing grounds',
          grounds: 'centering foundations',
          foundations: 'concentrating bases',
          bases: 'fixing platforms',
          platforms: 'settling stages',
          stages: 'stabilizing grounds',
          grounds: 'anchoring foundations',
          foundations: 'mooring bases',
          bases: 'docking platforms',
          platforms: 'berthing stages',
          stages: 'landing grounds',
          grounds: 'alighting foundations',
          foundations: 'descending bases',
          bases: 'lowering platforms',
          platforms: 'dropping stages',
          stages: 'falling grounds',
          grounds: 'sinking foundations',
          foundations: 'submerging bases',
          bases: 'diving platforms',
          platforms: 'plunging stages',
          stages: 'immersing grounds',
          grounds: 'submersing foundations',
          foundations: 'dunking bases',
          bases: 'soaking platforms',
          platforms: 'wetting stages',
          stages: 'moistening grounds',
          grounds: 'dampening foundations',
          foundations: 'humidifying bases',
          bases: 'watering platforms',
          platforms: 'irrigating stages',
          stages: 'hydrating grounds',
          grounds: 'nourishing foundations',
          foundations: 'feeding bases',
          bases: 'sustaining platforms',
          platforms: 'supporting stages',
          stages: 'upholding grounds',
          grounds: 'maintaining foundations',
          foundations: 'preserving bases',
          bases: 'conserving platforms',
          platforms: 'saving stages',
          stages: 'rescuing grounds',
          grounds: 'delivering foundations',
          foundations: 'freeing bases',
          bases: 'liberating platforms',
          platforms: 'emancipating stages',
          stages: 'releasing grounds',
          grounds: 'unleashing foundations',
          foundations: 'unlocking bases',
          bases: 'opening platforms',
          platforms: 'unclosing stages',
          stages: 'unlocking grounds',
          grounds: 'unfastening foundations',
          foundations: 'untying bases',
          bases: 'unbinding platforms',
          platforms: 'unshackling stages',
          stages: 'unfettering grounds',
          grounds: 'unbridling foundations',
          foundations: 'unreining bases',
          bases: 'uncontrolling platforms',
          platforms: 'unmanaging stages',
          stages: 'unregulating grounds',
          grounds: 'unrestricting foundations',
          foundations: 'unlimiting bases',
          bases: 'unbounding platforms',
          platforms: 'unconfining stages',
          stages: 'unimpeding grounds',
          grounds: 'unhindering foundations',
          foundations: 'unobstructing bases',
          bases: 'unblocking platforms',
          platforms: 'unclogging stages',
          stages: 'unplugging grounds',
          grounds: 'unstopping foundations',
          foundations: 'unclenching bases',
          bases: 'unclutching platforms',
          platforms: 'ungrasping stages',
          stages: 'unholding grounds',
          grounds: 'unretaining foundations',
          foundations: 'unkeeping bases',
          bases: 'unmaintaining platforms',
          platforms: 'unpreserving stages',
          stages: 'unconserving grounds',
          grounds: 'unsaving foundations',
          foundations: 'unrescuing bases',
          bases: 'undelivering platforms',
          platforms: 'unfreeing stages',
          stages: 'unliberating grounds',
          grounds: 'unemancipating foundations',
          foundations: 'unreleasing bases',
          bases: 'ununleashing platforms',
          platforms: 'ununlocking stages',
          stages: 'unopening grounds',
          grounds: 'ununclosing foundations',
          foundations: 'ununlocking bases',
          bases: 'ununfastening platforms',
          platforms: 'ununtying stages',
          stages: 'ununbinding grounds',
          grounds: 'ununshackling foundations',
          foundations: 'ununfettering bases',
          bases: 'ununbridling platforms',
          platforms: 'ununreining stages',
          stages: 'ununcontrolling grounds',
          grounds: 'ununmanaging foundations',
          foundations: 'ununregulating bases',
          bases: 'ununrestricting platforms',
          platforms: 'ununlimiting stages',
          stages: 'ununbounding grounds',
          grounds: 'ununconfining foundations',
          foundations: 'ununimpeding bases',
          bases: 'ununhindering platforms',
          platforms: 'ununobstructing stages',
          stages: 'ununblocking grounds',
          grounds: 'ununclogging foundations',
          foundations: 'ununplugging bases',
          bases: 'ununstopping platforms',
          platforms: 'ununclenching stages',
          stages: 'ununclutching grounds',
          grounds: 'unungrasping foundations',
          foundations: 'ununholding bases',
          bases: 'ununretaining platforms',
          platforms: 'ununkeeping stages',
          stages: 'ununmaintaining grounds',
          grounds: 'ununpreserving foundations',
          foundations: 'ununconserving bases',
          bases: 'ununsaving platforms',
          platforms: 'ununrescuing stages',
          stages: 'unundelivering grounds',
          grounds: 'ununfreeing foundations',
          foundations: 'ununliberating bases',
          bases: 'ununemancipating platforms',
          platforms: 'ununreleasing stages',
          stages: 'unununleashing grounds',
          grounds: 'unununlocking foundations',
          foundations: 'unununopening bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
          bases: 'unununclosing platforms',
          platforms: 'unununlocking stages',
          stages: 'unununopening grounds',
          grounds: 'unununclosing foundations',
          foundations: 'unununlocking bases',
      });
    });
  }

  // --- Get Random Subset ---
  function getRandomSubcategories(templates, count) {
    const keys = Object.keys(templates);
    const shuffled = keys.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // --- Render Prompts ---
  function renderPrompts() {
    let filtered = currentPrompts;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.text.toLowerCase().includes(lowerQuery));
    }

    const toShow = filtered.slice(0, displayedCount);

    if (toShow.length === 0) {
      els.promptsGrid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">No prompts found matching "${searchQuery}"</div>
        </div>
      `;
    } else {
      let html = '';
      toShow.forEach(p => {
        html += `
          <div class="prompt-card animate-in" data-text="${escapeHTML(p.text)}">
            <div class="prompt-card-inner">
              <div class="prompt-card-header">
                <div class="prompt-number">#${p.index}</div>
                <button class="prompt-copy-icon" title="Copy to clipboard">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                </button>
              </div>
              <div class="prompt-text">${p.text}</div>
              <div class="prompt-meta">
                <span class="prompt-subcategory">${p.subcategory}</span>
                <span class="prompt-niche">${p.niche}</span>
              </div>
            </div>
          </div>
        `;
      });
      els.promptsGrid.innerHTML = html;
    }

    // Show/hide load more
    if (displayedCount >= filtered.length) {
      els.loadMoreWrapper.style.display = 'none';
    } else {
      els.loadMoreWrapper.style.display = 'block';
    }

    // Animate in
    requestAnimationFrame(() => {
      $$('.prompt-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 50);
      });
    });
  }

  function searchAcrossAll() {
    return PromptEngine.searchPrompts(searchQuery, 100).map((r, i) => ({
      ...r,
      subcategory: `${PromptEngine.CATEGORIES[r.category]?.title || r.category} → ${PromptEngine.CATEGORIES[r.category]?.subcategories[r.subcategory] || r.subcategory}`,
      niche: '',
      index: i + 1
    }));
  }

  function updateCountBar() {
    const totalTemplates = PromptEngine.getAllTemplateCount();
    const totalPrompts = totalTemplates * PromptEngine.NICHES.length;
    const cat = PromptEngine.CATEGORIES[currentCategory];
    els.promptCountBar.querySelector('.prompt-count-text').innerHTML =
      `Showing <strong>${currentPrompts.length}</strong> prompts from <strong>${cat?.title || ''}</strong> • Total library: <strong>${formatNum(totalPrompts)}+</strong> unique prompts`;
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Category tabs
    els.categoryTabs.addEventListener('click', e => {
      const tab = e.target.closest('.tab');
      if (!tab) return;

      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentCategory = tab.dataset.category;
      currentSubcategory = 'all';
      generateAndRender();
    });

    // Showcase cards
    els.showcaseGrid.addEventListener('click', e => {
      const card = e.target.closest('.showcase-card');
      if (!card) return;

      const category = card.dataset.category;
      currentCategory = category;
      currentSubcategory = 'all';

      // Update active tab
      $$('.tab').forEach(t => t.classList.remove('active'));
      const activeTab = $(`.tab[data-category="${category}"]`);
      if (activeTab) activeTab.classList.add('active');

      // Scroll to prompts section
      $('#prompts').scrollIntoView({ behavior: 'smooth' });
      generateAndRender();
    });

    // Subcategory filter
    els.subcategoryFilter.addEventListener('click', e => {
      const btn = e.target.closest('.subcategory-btn');
      if (!btn) return;

      $$('.subcategory-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentSubcategory = btn.dataset.subcategory;
      generateAndRender();
    });

    // Generate button
    els.generateBtn.addEventListener('click', () => generateAndRender());

    // Shuffle
    els.shuffleBtn.addEventListener('click', () => {
      currentPrompts.sort(() => Math.random() - 0.5);
      currentPrompts.forEach((p, i) => p.index = i + 1);
      displayedCount = PER_PAGE;
      renderPrompts();
    });

    // Load more
    els.loadMoreBtn.addEventListener('click', () => {
      displayedCount += PER_PAGE;
      renderPrompts();
    });

    // Search
    els.searchToggle.addEventListener('click', () => {
      els.searchBar.classList.toggle('active');
      if (els.searchBar.classList.contains('active')) {
        els.searchInput.focus();
      }
    });

    els.searchClose.addEventListener('click', () => {
      els.searchBar.classList.remove('active');
      els.searchInput.value = '';
      searchQuery = '';
      renderPrompts();
    });

    let searchTimeout;
    els.searchInput.addEventListener('input', e => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = e.target.value.trim();
        if (searchQuery) {
          currentPrompts = searchAcrossAll();
        } else {
          generateAndRender();
        }
        displayedCount = PER_PAGE;
        renderPrompts();
        updateCountBar();
      }, 300);
    });

    // Mobile menu
    els.mobileMenuToggle.addEventListener('click', () => els.nav.classList.toggle('open'));
    $$('.nav-link').forEach(l => l.addEventListener('click', () => els.nav.classList.remove('open')));

    // Copy on click
    els.promptsGrid.addEventListener('click', e => {
      const card = e.target.closest('.prompt-card');
      if (!card) return;

      const text = card.dataset.text;
      copyToClipboard(text, card);
    });

    els.hooksGrid.addEventListener('click', e => {
      const hook = e.target.closest('.hook-card');
      if (!hook) return;

      const text = hook.querySelector('.hook-text').textContent;
      copyToClipboard(text, hook);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        els.searchToggle.click();
      }
      if (e.key === 'Escape' && els.searchBar.classList.contains('active')) {
        els.searchClose.click();
      }
    });

    // Niche / platform selects auto-generate
    els.nicheSelect.addEventListener('change', () => generateAndRender());
    els.platformSelect.addEventListener('change', () => generateAndRender());
  }

  // --- Render Bonuses (from prompts-data.js) ---
  function renderReadyHooks() {
    if (typeof READY_HOOKS === 'undefined') return;

    let html = '';
    READY_HOOKS.forEach((hook, i) => {
      html += `
        <div class="hook-card animate-in">
          <div class="hook-number">#${i + 1}</div>
          <div class="hook-text">${hook}</div>
        </div>
      `;
    });
    els.hooksGrid.innerHTML = html;
  }

  function renderViralBreakdowns() {
    if (typeof VIRAL_BREAKDOWNS === 'undefined') return;

    let html = '';
    VIRAL_BREAKDOWNS.forEach((breakdown, i) => {
      html += `
        <div class="breakdown-card animate-in">
          <div class="breakdown-number">#${i + 1}</div>
          <h3 class="breakdown-title">${breakdown.title}</h3>
          <ul class="breakdown-list">
            ${breakdown.breakdown.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    els.breakdownsGrid.innerHTML = html;
  }

  function render30DayPlan() {
    if (typeof DAY_PLAN === 'undefined') return;

    let html = '';
    Object.keys(DAY_PLAN).forEach(weekKey => {
      const week = DAY_PLAN[weekKey];
      html += `
        <div class="plan-week animate-in">
          <div class="plan-week-title">
            <div>
              <h3>${week.title}</h3>
              <p>${week.theme}</p>
            </div>
            <div class="plan-week-badge">${week.badge}</div>
          </div>
          ${week.tasks.map(task => `
            <div class="plan-card">
              <div class="plan-day">${task.split(':')[0]}</div>
              <div class="plan-theme">${task.split(':')[1]}</div>
            </div>
          `).join('')}
        </div>
      `;
    });
    els.planGrid.innerHTML = html;
  }

  function renderMonetizationGuide() {
    if (typeof MONETIZATION_GUIDE === 'undefined') return;

    let html = '';
    MONETIZATION_GUIDE.forEach((item, i) => {
      html += `
        <div class="monetization-card animate-in">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <ul>
            ${item.strategies.map(strategy => `<li>${strategy}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    els.monetizationGrid.innerHTML = html;
  }

  // --- Clipboard ---
  function copyToClipboard(text, cardEl) {
    navigator.clipboard.writeText(text).then(() => {
      cardEl.classList.add('copied');
      showToast('Copied to clipboard!');
      setTimeout(() => cardEl.classList.remove('copied'), 1000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      cardEl.classList.add('copied');
      showToast('Copied to clipboard!');
      setTimeout(() => cardEl.classList.remove('copied'), 1000);
    });
  }

  // --- Toast ---
  let toastTimeout;
  function showToast(msg) {
    clearTimeout(toastTimeout);
    els.toastMessage.textContent = msg;
    els.toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      els.toast.classList.remove('show');
    }, 3000);
  }

  // --- Scroll Animations ---
  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    $$('.animate-in').forEach(el => observer.observe(el));
  }

  // --- Counter Animation ---
  function setupCounterAnimation() {
    const counters = $$('[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 1 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = formatNum(target);
        clearInterval(timer);
      } else {
        el.textContent = formatNum(Math.floor(current));
      }
    }, 16);
  }

  // --- Header Scroll ---
  function setupHeaderScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        els.header.classList.add('scrolled');
      } else {
        els.header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // --- Utilities ---
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  // --- Boot ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();