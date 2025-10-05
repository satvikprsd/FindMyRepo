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
  {
    name: 'hacktoberfest-projects',
    description: 'A curated list of Hacktoberfest projects for beginners to contribute to open source.',
    languages: ['Markdown', 'JavaScript', 'Python'],
    stars: 1500,
    lastActivity: '5 days ago',
    issues: 23,
    charging: 'active',
    url: 'https://github.com/hacktoberfest/hacktoberfest-projects',
    owner: 'hacktoberfest',
  },
  {
    name: 'GSOC-Contributors',
    description: 'Google Summer of Code contributors and their projects. Find amazing open source projects to contribute to.',
    languages: ['Python', 'JavaScript', 'Java'],
    stars: 850,
    lastActivity: '1 week ago',
    issues: 15,
    charging: 'medium',
    url: 'https://github.com/gsoc/GSOC-Contributors',
    owner: 'gsoc',
  },
  {
    name: 'hacktoberfest-swag',
    description: 'List of companies giving out swag for Hacktoberfest participation.',
    languages: ['Markdown'],
    stars: 3200,
    lastActivity: '3 days ago',
    issues: 45,
    charging: 'active',
    url: 'https://github.com/crweiner/hacktoberfest-swag',
    owner: 'crweiner',
  },
  {
    name: 'gsoc-proposals',
    description: 'Google Summer of Code project proposals and ideas for students.',
    languages: ['Markdown', 'Python', 'C++'],
    stars: 1200,
    lastActivity: '2 weeks ago',
    issues: 8,
    charging: 'medium',
    url: 'https://github.com/gsoc/gsoc-proposals',
    owner: 'gsoc',
  },
];

const AllRepos = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('stars');

  // Filter and sort repositories
  const filteredRepos = useMemo(() => {
    let filtered = allRepos.filter(repo => {
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.some(difficulty => {
        if (difficulty === 'beginner') {
          return repo.stars < 5000 || repo.name.toLowerCase().includes('beginner') || 
                 repo.description.toLowerCase().includes('beginner');
        }
        if (difficulty === 'intermediate') {
          return repo.stars >= 5000 && repo.stars < 50000;
        }
        if (difficulty === 'advanced') {
          return repo.stars >= 50000 || repo.charging === 'active';
        }
        return false;
      });
      
      // Language filter
      const hasSelectedLanguage = selectedLanguages.length === 0 || repo.languages.some(lang => selectedLanguages.includes(lang));
      
      // Program filter
      const hasSelectedProgram = selectedPrograms.length === 0 || selectedPrograms.some(program => {
        if (program === 'Hacktoberfest') {
          return repo.name.toLowerCase().includes('hacktoberfest') || 
                 repo.description.toLowerCase().includes('hacktoberfest');
        }
        if (program === 'GSOC') {
          return repo.name.toLowerCase().includes('gsoc') || 
                 repo.description.toLowerCase().includes('google summer of code') ||
                 repo.description.toLowerCase().includes('gsoc');
        }
        return false;
      });
      
      // Activity filter (by last commit timeframe)
      const matchesActivity = selectedActivity === 'all' || (() => {
        // Parse relative time strings like "2 hours ago", "1 week ago", "3 months ago"
        const parseRelativeTime = (timeString: string): number => {
          const cleanString = timeString.toLowerCase().replace(' ago', '').trim();
          const parts = cleanString.split(' ');
          
          if (parts.length !== 2) return 0;
          
          const value = parseInt(parts[0]);
          const unit = parts[1];
          
          if (isNaN(value)) return 0;
          
          switch (unit) {
            case 'minute':
            case 'minutes':
              return value * 60 * 1000;
            case 'hour':
            case 'hours':
              return value * 60 * 60 * 1000;
            case 'day':
            case 'days':
              return value * 24 * 60 * 60 * 1000;
            case 'week':
            case 'weeks':
              return value * 7 * 24 * 60 * 60 * 1000;
            case 'month':
            case 'months':
              return value * 30 * 24 * 60 * 60 * 1000; // Approximate month as 30 days
            case 'year':
            case 'years':
              return value * 365 * 24 * 60 * 60 * 1000; // Approximate year as 365 days
            default:
              return 0;
          }
        };
        
        const timeAgo = parseRelativeTime(repo.lastActivity);
        const now = new Date().getTime();
        const repoTime = now - timeAgo;
        
        switch (selectedActivity) {
          case '1-month':
            return timeAgo <= 30 * 24 * 60 * 60 * 1000;
          case '3-months':
            return timeAgo <= 90 * 24 * 60 * 60 * 1000;
          case '6-months':
            return timeAgo <= 180 * 24 * 60 * 60 * 1000;
          case '6-months+':
            return timeAgo > 180 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      })();
      
      // Tags filter (simulated based on repo characteristics)
      const hasSelectedTag = selectedTags.length === 0 || selectedTags.some(tag => {
        if (tag === 'good first issue') {
          return repo.stars < 10000 || repo.description.toLowerCase().includes('beginner');
        }
        if (tag === 'help wanted') {
          return repo.issues > 10;
        }
        if (tag === 'documentation') {
          return repo.languages.includes('Markdown') || repo.description.toLowerCase().includes('docs');
        }
        if (tag === 'hacktoberfest') {
          return repo.name.toLowerCase().includes('hacktoberfest');
        }
        if (tag === 'UI/UX') {
          return repo.languages.some(lang => ['HTML', 'CSS', 'JavaScript'].includes(lang));
        }
        if (tag === 'testing') {
          return repo.description.toLowerCase().includes('test') || repo.languages.includes('JavaScript');
        }
        return false;
      });
      
      // Tech Stack filter (simulated based on languages)
      const hasSelectedTechStack = selectedTechStack.length === 0 || selectedTechStack.some(tech => {
        if (tech === 'React') {
          return repo.languages.includes('JavaScript') && repo.description.toLowerCase().includes('react');
        }
        if (tech === 'Node.js') {
          return repo.languages.includes('JavaScript') && repo.description.toLowerCase().includes('node');
        }
        if (tech === 'Flask') {
          return repo.languages.includes('Python') && repo.description.toLowerCase().includes('flask');
        }
        if (tech === 'Django') {
          return repo.languages.includes('Python') && repo.description.toLowerCase().includes('django');
        }
        if (tech === 'Next.js') {
          return repo.languages.includes('TypeScript') && repo.description.toLowerCase().includes('next');
        }
        if (tech === 'TensorFlow') {
          return repo.languages.includes('Python') && repo.description.toLowerCase().includes('tensorflow');
        }
        if (tech === 'PyTorch') {
          return repo.languages.includes('Python') && repo.description.toLowerCase().includes('pytorch');
        }
        return false;
      });
      
      return matchesDifficulty && hasSelectedLanguage && hasSelectedProgram && matchesActivity && hasSelectedTag && hasSelectedTechStack;
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
  }, [selectedDifficulty, selectedLanguages, selectedPrograms, selectedActivity, selectedTags, selectedTechStack, sortBy]);

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty(prev => [...prev, difficulty]);
    } else {
      setSelectedDifficulty(prev => prev.filter(diff => diff !== difficulty));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages(prev => [...prev, language]);
    } else {
      setSelectedLanguages(prev => prev.filter(lang => lang !== language));
    }
  };

  const handleProgramChange = (program: string, checked: boolean) => {
    if (checked) {
      setSelectedPrograms(prev => [...prev, program]);
    } else {
      setSelectedPrograms(prev => prev.filter(prog => prog !== program));
    }
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tag]);
    } else {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    }
  };

  const handleTechStackChange = (tech: string, checked: boolean) => {
    if (checked) {
      setSelectedTechStack(prev => [...prev, tech]);
    } else {
      setSelectedTechStack(prev => prev.filter(t => t !== tech));
    }
  };

  const clearFilters = () => {
    setSelectedDifficulty([]);
    setSelectedLanguages([]);
    setSelectedPrograms([]);
    setSelectedActivity('all');
    setSelectedTags([]);
    setSelectedTechStack([]);
    setSortBy('stars');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 pb-12">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Repositories</h1>
          <p className="text-muted-foreground">
            Explore all available repositories across different categories
          </p>
        </div>

        {/* Main Content - 30-70 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Filters Section - 30% */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide hover:scrollbar-show transition-all duration-300">
              <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Difficulty</h4>
                <div className="space-y-2">
                  {[
                    { key: 'beginner', label: 'Beginner-friendly' },
                    { key: 'intermediate', label: 'Intermediate' },
                    { key: 'advanced', label: 'Advanced' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="rounded border-border" 
                        checked={selectedDifficulty.includes(key)}
                        onChange={(e) => handleDifficultyChange(key, e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Programming Language Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Programming Language</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'HTML/CSS'].map((lang) => (
                    <label key={lang} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
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

              {/* Programs Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Programs</h4>
                <div className="space-y-2">
                  {['Hacktoberfest', 'GSOC'].map((program) => (
                    <label key={program} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="rounded border-border" 
                        checked={selectedPrograms.includes(program)}
                        onChange={(e) => handleProgramChange(program, e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">{program}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activity Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Activity</h4>
                <div className="space-y-2">
                  {[
                    { key: 'all', label: 'All' },
                    { key: '1-month', label: 'Within 1 month' },
                    { key: '3-months', label: 'Within 3 months' },
                    { key: '6-months', label: 'Within 6 months' },
                    { key: '6-months+', label: 'More than 6 months ago' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <input 
                        type="radio" 
                        name="activity" 
                        className="border-border" 
                        checked={selectedActivity === key}
                        onChange={() => setSelectedActivity(key)}
                      />
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags / Contribution Type Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Tags / Contribution Type</h4>
                <div className="grid grid-cols-1 gap-2">
                  {['good first issue', 'help wanted', 'documentation', 'hacktoberfest', 'UI/UX', 'testing'].map((tag) => (
                    <label key={tag} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="rounded border-border" 
                        checked={selectedTags.includes(tag)}
                        onChange={(e) => handleTagChange(tag, e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground capitalize">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tech Stack / Framework Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">By Tech Stack / Framework</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['React', 'Next.js', 'Flask', 'Django', 'Node.js', 'TensorFlow', 'PyTorch'].map((tech) => (
                    <label key={tech} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="rounded border-border" 
                        checked={selectedTechStack.includes(tech)}
                        onChange={(e) => handleTechStackChange(tech, e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
              </div>
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
