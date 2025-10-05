import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import RepoCard, { RepoData } from '@/components/RepoCard';

// Combined repository data from all pages
const allRepos: RepoData[] = [
  // From Home page
  {
    name: 'first-contributions',
    description: 'Help beginners make their first open source contribution. This repository is perfect for newcomers to open source.',
    languages: ['JavaScript', 'HTML', 'CSS'],
    stars: 42000,
    lastActivity: '2 days ago',
    issues: 12,
    charging: 'active',
    url: 'https://github.com/firstcontributions/first-contributions',
    owner: 'firstcontributions',
  },
  {
    name: 'awesome-for-beginners',
    description: 'A list of awesome beginners-friendly projects. Curated list of projects that welcome new contributors.',
    languages: ['Markdown', 'JavaScript'],
    stars: 38000,
    lastActivity: '2 months ago',
    issues: 73,
    charging: 'medium',
    url: 'https://github.com/MunGell/awesome-for-beginners',
    owner: 'MunGell',
  },
  {
    name: 'scikit-learn',
    description: 'Machine learning in Python. Simple and efficient tools for predictive data analysis.',
    languages: ['Python', 'Cython', 'C++'],
    stars: 59000,
    lastActivity: '1 day ago',
    issues: 89,
    charging: 'active',
    url: 'https://github.com/scikit-learn/scikit-learn',
    owner: 'scikit-learn',
  },
  {
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    languages: ['JavaScript', 'TypeScript', 'HTML'],
    stars: 220000,
    lastActivity: '3 hours ago',
    issues: 1247,
    charging: 'active',
    url: 'https://github.com/facebook/react',
    owner: 'facebook',
  },
  {
    name: 'tensorflow',
    description: 'An Open Source Machine Learning Framework for Everyone.',
    languages: ['Python', 'C++', 'JavaScript'],
    stars: 180000,
    lastActivity: '5 hours ago',
    issues: 892,
    charging: 'active',
    url: 'https://github.com/tensorflow/tensorflow',
    owner: 'tensorflow',
  },
  {
    name: 'vue',
    description: 'This is the repo for Vue 3. Vue 3 is the latest version of Vue.js.',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    stars: 41000,
    lastActivity: '1 day ago',
    issues: 456,
    charging: 'active',
    url: 'https://github.com/vuejs/vue',
    owner: 'vuejs',
  },
  {
    name: 'django',
    description: 'The Web framework for perfectionists with deadlines.',
    languages: ['Python', 'HTML', 'CSS'],
    stars: 75000,
    lastActivity: '2 days ago',
    issues: 234,
    charging: 'active',
    url: 'https://github.com/django/django',
    owner: 'django',
  },
  {
    name: 'express',
    description: 'Fast, unopinionated, minimalist web framework for node.',
    languages: ['JavaScript', 'HTML', 'CSS'],
    stars: 63000,
    lastActivity: '1 week ago',
    issues: 189,
    charging: 'medium',
    url: 'https://github.com/expressjs/express',
    owner: 'expressjs',
  },
  {
    name: 'pytorch',
    description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration.',
    languages: ['Python', 'C++', 'CUDA'],
    stars: 75000,
    lastActivity: '4 hours ago',
    issues: 567,
    charging: 'active',
    url: 'https://github.com/pytorch/pytorch',
    owner: 'pytorch',
  },
  {
    name: 'next.js',
    description: 'The React Framework for Production.',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    stars: 120000,
    lastActivity: '6 hours ago',
    issues: 789,
    charging: 'active',
    url: 'https://github.com/vercel/next.js',
    owner: 'vercel',
  },
  {
    name: 'fastapi',
    description: 'FastAPI framework, high performance, easy to learn, fast to code, ready for production.',
    languages: ['Python', 'JavaScript', 'HTML'],
    stars: 68000,
    lastActivity: '1 day ago',
    issues: 123,
    charging: 'active',
    url: 'https://github.com/tiangolo/fastapi',
    owner: 'tiangolo',
  },
  
  // From Personalized page
  {
    name: 'material-ui',
    description: 'Ready-to-use foundational React components, free forever',
    languages: ['TypeScript', 'JavaScript'],
    stars: 92000,
    lastActivity: '1 hour ago',
    issues: 45,
    charging: 'active',
    owner: 'mui',
    url: 'https://github.com/mui/material-ui',
  },
  {
    name: 'storybook',
    description: 'The UI component explorer. Develop, document, & test React, Vue, Angular, & more!',
    languages: ['TypeScript', 'JavaScript'],
    stars: 83000,
    lastActivity: '5 hours ago',
    issues: 67,
    charging: 'active',
    owner: 'storybookjs',
    url: 'https://github.com/storybookjs/storybook',
  },
  {
    name: 'react-hook-form',
    description: 'React Hooks for form state management and validation',
    languages: ['TypeScript', 'JavaScript'],
    stars: 40000,
    lastActivity: '2 days ago',
    issues: 23,
    charging: 'active',
    owner: 'react-hook-form',
    url: 'https://github.com/react-hook-form/react-hook-form',
  },

  // From Hacktoberfest page
  {
    name: 'public-apis',
    description: 'A collective list of free APIs for use in software and web development',
    languages: ['Python'],
    stars: 280000,
    lastActivity: '1 day ago',
    issues: 156,
    charging: 'active',
    owner: 'public-apis',
    url: 'https://github.com/public-apis/public-apis',
  },
  {
    name: 'freeCodeCamp',
    description: "freeCodeCamp.org's open-source codebase and curriculum",
    languages: ['JavaScript', 'CSS'],
    stars: 390000,
    lastActivity: '5 hours ago',
    issues: 234,
    charging: 'active',
    owner: 'freeCodeCamp',
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
  },
];

const AllRepos = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go']);
  const [starRange, setStarRange] = useState<string>('all');
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['active', 'medium']);
  const [sortBy, setSortBy] = useState<string>('stars');

  // Filter and sort repositories
  const filteredRepos = useMemo(() => {
    let filtered = allRepos.filter(repo => {
      // Language filter
      const hasSelectedLanguage = repo.languages.some(lang => selectedLanguages.includes(lang));
      
      // Star range filter
      let matchesStarRange = true;
      if (starRange === 'less-1k') {
        matchesStarRange = repo.stars < 1000;
      } else if (starRange === '1k-10k') {
        matchesStarRange = repo.stars >= 1000 && repo.stars < 10000;
      } else if (starRange === '10k-50k') {
        matchesStarRange = repo.stars >= 10000 && repo.stars < 50000;
      } else if (starRange === '50k+') {
        matchesStarRange = repo.stars >= 50000;
      }
      
      // Activity filter
      const matchesActivity = selectedActivities.includes(repo.charging);
      
      return hasSelectedLanguage && matchesStarRange && matchesActivity;
    });

    // Sort repositories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars;
        case 'recent':
          const activityOrder = { active: 3, medium: 2, inactive: 1 };
          return activityOrder[b.charging] - activityOrder[a.charging];
        case 'issues':
          return b.issues - a.issues;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedLanguages, starRange, selectedActivities, sortBy]);

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages(prev => [...prev, language]);
    } else {
      setSelectedLanguages(prev => prev.filter(lang => lang !== language));
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities(prev => [...prev, activity]);
    } else {
      setSelectedActivities(prev => prev.filter(act => act !== activity));
    }
  };

  const clearFilters = () => {
    setSelectedLanguages(['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go']);
    setStarRange('all');
    setSelectedActivities(['active', 'medium']);
    setSortBy('stars');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 pb-12">
        {/* Header */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Repositories</h1>
          <p className="text-muted-foreground text-lg">
            Explore all available repositories across different categories
          </p>
        </div>

        {/* Main Content - 30-70 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Filters Section - 30% */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
              
              {/* Language Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Languages</h4>
                <div className="space-y-2">
                  {['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'HTML', 'CSS', 'C++', 'CUDA', 'Cython', 'Markdown'].map((lang) => (
                    <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-border" 
                        checked={selectedLanguages.includes(lang)}
                        onChange={(e) => handleLanguageChange(lang, e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stars Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Star Count</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stars" 
                      className="border-border" 
                      value="all"
                      checked={starRange === 'all'}
                      onChange={(e) => setStarRange(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">All</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stars" 
                      className="border-border" 
                      value="less-1k"
                      checked={starRange === 'less-1k'}
                      onChange={(e) => setStarRange(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">Less than 1K</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stars" 
                      className="border-border" 
                      value="1k-10k"
                      checked={starRange === '1k-10k'}
                      onChange={(e) => setStarRange(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">1K - 10K</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stars" 
                      className="border-border" 
                      value="10k-50k"
                      checked={starRange === '10k-50k'}
                      onChange={(e) => setStarRange(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">10K - 50K</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stars" 
                      className="border-border" 
                      value="50k+"
                      checked={starRange === '50k+'}
                      onChange={(e) => setStarRange(e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">50K+</span>
                  </label>
                </div>
              </div>

              {/* Activity Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Activity</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border" 
                      checked={selectedActivities.includes('active')}
                      onChange={(e) => handleActivityChange('active', e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">Active (recent commits)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border" 
                      checked={selectedActivities.includes('medium')}
                      onChange={(e) => handleActivityChange('medium', e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">Medium activity</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border" 
                      checked={selectedActivities.includes('inactive')}
                      onChange={(e) => handleActivityChange('inactive', e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">Low activity</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters Button */}
              <button 
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Repositories Section - 70% */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {filteredRepos.length} repositories found
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1 text-sm"
                  aria-label="Sort repositories"
                >
                  <option value="stars">Most Stars</option>
                  <option value="recent">Recently Updated</option>
                  <option value="issues">Most Issues</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-12 max-w-4xl mx-auto">
              {filteredRepos.map((repo, index) => (
                <div 
                  key={repo.name} 
                  className={`transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 animate-slide-up cursor-pointer ${
                    index === 1 ? 'animate-delay-150ms' : '' 
                  } ${index === 2 ? 'animate-delay-300ms' : ''}`}
                >
                  <RepoCard 
                    repo={repo} 
                    isHighlight={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRepos;
