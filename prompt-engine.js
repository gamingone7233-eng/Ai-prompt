// ============================================
// PROMPT ENGINE — CORE LOGIC
// ============================================

(function() {
  'use strict';

  window.PromptEngine = {
    CATEGORIES: {
      hooks: {
        title: 'Hooks',
        icon: '🎣',
        subcategories: {
          curiosity: 'Curiosity Gaps',
          question: 'Question Hooks',
          story: 'Story Hooks',
          statistic: 'Statistic Hooks',
          controversy: 'Controversy Hooks',
          promise: 'Promise Hooks'
        }
      },
      scripts: {
        title: 'Scripts',
        icon: '📝',
        subcategories: {
          explainer: 'Explainer Videos',
          review: 'Product Reviews',
          tutorial: 'Tutorials',
          storytime: 'Storytime',
          challenge: 'Challenges',
          reaction: 'Reactions'
        }
      },
      ideas: {
        title: 'Content Ideas',
        icon: '💡',
        subcategories: {
          trending: 'Trending Topics',
          evergreen: 'Evergreen Content',
          seasonal: 'Seasonal Ideas',
          niche: 'Niche-Specific',
          educational: 'Educational',
          entertaining: 'Entertainment'
        }
      },
      captions: {
        title: 'Captions',
        icon: '📱',
        subcategories: {
          instagram: 'Instagram',
          tiktok: 'TikTok',
          youtube: 'YouTube',
          twitter: 'Twitter/X',
          linkedin: 'LinkedIn',
          facebook: 'Facebook'
        }
      },
      copywriting: {
        title: 'Copywriting',
        icon: '✍️',
        subcategories: {
          headlines: 'Headlines',
          descriptions: 'Descriptions',
          ads: 'Ad Copy',
          emails: 'Email Marketing',
          landing: 'Landing Pages',
          social: 'Social Media'
        }
      },
      email: {
        title: 'Email Marketing',
        icon: '📧',
        subcategories: {
          newsletter: 'Newsletters',
          promotional: 'Promotional',
          welcome: 'Welcome Series',
          reengagement: 'Re-engagement',
          educational: 'Educational',
          transactional: 'Transactional'
        }
      },
      seo: {
        title: 'SEO Content',
        icon: '🔍',
        subcategories: {
          blog: 'Blog Posts',
          articles: 'Articles',
          guides: 'Guides',
          keywords: 'Keyword Research',
          meta: 'Meta Descriptions',
          titles: 'SEO Titles'
        }
      },
      branding: {
        title: 'Branding',
        icon: '🎨',
        subcategories: {
          identity: 'Brand Identity',
          voice: 'Brand Voice',
          messaging: 'Key Messages',
          story: 'Brand Story',
          guidelines: 'Style Guide',
          positioning: 'Market Positioning'
        }
      },
      strategy: {
        title: 'Strategy',
        icon: '🎯',
        subcategories: {
          content: 'Content Strategy',
          marketing: 'Marketing Plan',
          growth: 'Growth Hacking',
          analytics: 'Analytics Setup',
          competitors: 'Competitor Analysis',
          roadmap: 'Content Roadmap'
        }
      },
      video: {
        title: 'Video Content',
        icon: '🎥',
        subcategories: {
          shorts: 'Short-Form',
          longform: 'Long-Form',
          series: 'Video Series',
          live: 'Live Streaming',
          ads: 'Video Ads',
          thumbnails: 'Thumbnails'
        }
      }
    },

    NICHES: [
      'Fitness & Health',
      'Technology & Gadgets',
      'Cooking & Recipes',
      'Travel & Adventure',
      'Business & Finance',
      'Education & Learning',
      'Gaming & Entertainment',
      'Fashion & Beauty',
      'Home & Garden',
      'Pets & Animals',
      'Art & Creativity',
      'Science & Nature',
      'Sports & Athletics',
      'Music & Audio',
      'Photography & Video',
      'Writing & Literature',
      'Parenting & Family',
      'Relationships & Dating',
      'Mental Health & Wellness',
      'Environment & Sustainability',
      'Politics & Current Events',
      'History & Culture',
      'Comedy & Humor',
      'Motivation & Self-Improvement',
      'Spirituality & Religion',
      'Automotive & Transportation',
      'Real Estate & Housing',
      'Legal & Law',
      'Medical & Healthcare',
      'Non-Profit & Charity',
      'Retail & E-commerce',
      'Manufacturing & Industry',
      'Agriculture & Farming',
      'Construction & Architecture',
      'Energy & Utilities',
      'Telecommunications',
      'Aerospace & Defense',
      'Pharmaceuticals',
      'Biotechnology',
      'Financial Services',
      'Insurance',
      'Consulting',
      'Marketing & Advertising',
      'Public Relations',
      'Human Resources',
      'Supply Chain & Logistics',
      'Quality Assurance',
      'Research & Development',
      'Customer Service',
      'Sales',
      'Product Management',
      'Project Management',
      'Data Science & Analytics',
      'Cybersecurity',
      'Cloud Computing',
      'Artificial Intelligence',
      'Machine Learning',
      'Blockchain & Crypto',
      'Internet of Things',
      'Virtual Reality',
      'Augmented Reality',
      'Mobile Development',
      'Web Development',
      'Game Development',
      'DevOps',
      'Database Administration',
      'Network Administration',
      'System Administration',
      'UI/UX Design',
      'Graphic Design',
      'Animation',
      'Video Production',
      'Audio Production',
      'Journalism',
      'Broadcasting',
      'Publishing',
      'Librarian',
      'Teaching',
      'Tutoring',
      'Coaching',
      'Counseling',
      'Therapy',
      'Nursing',
      'Pharmacy',
      'Dentistry',
      'Veterinary',
      'Emergency Services',
      'Law Enforcement',
      'Military',
      'Firefighting',
      'Search & Rescue',
      'Social Work',
      'Community Service',
      'Event Planning',
      'Hospitality',
      'Tourism',
      'Restaurant Management',
      'Hotel Management',
      'Cruise Line',
      'Airline',
      'Railway',
      'Bus Service',
      'Taxi & Rideshare',
      'Delivery Services',
      'Warehousing',
      'Distribution',
      'Import/Export',
      'Customs & Border Protection',
      'Shipping & Freight',
      'Trucking',
      'Maritime',
      'Aviation',
      'Space Exploration',
      'Astronomy',
      'Geology',
      'Meteorology',
      'Oceanography',
      'Environmental Science',
      'Ecology',
      'Conservation',
      'Wildlife Biology',
      'Botany',
      'Zoology',
      'Microbiology',
      'Genetics',
      'Neuroscience',
      'Psychology',
      'Sociology',
      'Anthropology',
      'Archaeology',
      'Linguistics',
      'Philosophy',
      'Theology',
      'Ethics',
      'Political Science',
      'International Relations',
      'Economics',
      'Statistics',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Information Technology',
      'Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biomedical Engineering',
      'Aerospace Engineering',
      'Nuclear Engineering',
      'Petroleum Engineering',
      'Mining Engineering',
      'Materials Science',
      'Nanotechnology'
    ],

    PLATFORMS: [
      'YouTube',
      'TikTok',
      'Instagram',
      'Facebook',
      'Twitter/X',
      'LinkedIn',
      'Pinterest',
      'Reddit',
      'Twitch',
      'Discord',
      'Clubhouse',
      'Spotify',
      'Apple Podcasts'
    ],

    getAllTemplateCount: function() {
      let total = 0;
      Object.keys(this.CATEGORIES).forEach(cat => {
        const templates = window[`PROMPT_TEMPLATES_${cat.toUpperCase()}`] || window.PROMPT_TEMPLATES;
        if (templates) {
          Object.keys(templates).forEach(sub => {
            if (templates[sub] && Array.isArray(templates[sub])) {
              total += templates[sub].length;
            }
          });
        }
      });
      return total;
    },

    generatePrompt: function(template, variables) {
      let prompt = template;
      Object.keys(variables).forEach(key => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        prompt = prompt.replace(regex, variables[key]);
      });
      return prompt;
    },

    searchPrompts: function(query, limit = 50) {
      const results = [];
      const lowerQuery = query.toLowerCase();

      Object.keys(this.CATEGORIES).forEach(catKey => {
        const category = this.CATEGORIES[catKey];
        const templates = window[`PROMPT_TEMPLATES_${catKey.toUpperCase()}`] || window.PROMPT_TEMPLATES;

        if (!templates) return;

        Object.keys(templates).forEach(subKey => {
          if (!templates[subKey] || !Array.isArray(templates[subKey])) return;

          templates[subKey].forEach(template => {
            if (template.toLowerCase().includes(lowerQuery)) {
              results.push({
                category: catKey,
                subcategory: subKey,
                template: template,
                score: this._calculateRelevance(template, query)
              });
            }
          });
        });
      });

      return results
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    },

    _calculateRelevance: function(text, query) {
      const lowerText = text.toLowerCase();
      const lowerQuery = query.toLowerCase();
      let score = 0;

      // Exact matches get highest score
      if (lowerText.includes(lowerQuery)) {
        score += 10;
      }

      // Word matches
      const queryWords = lowerQuery.split(' ');
      queryWords.forEach(word => {
        if (lowerText.includes(word)) {
          score += 5;
        }
      });

      return score;
    }
  };
})();