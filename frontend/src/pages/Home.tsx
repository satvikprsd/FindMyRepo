import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import RepoCard, { RepoData } from '@/components/RepoCard';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import ParticleHero from '@/components/ParticleHero';
import AccentLines from '@/components/AccentLines';

// Mock recommended repos - in production, these would come from an API
const mockRecommendedRepos: RepoData[] = [
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
    lastActivity: '1 week ago',
    issues: 5,
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
];

const Home = () => {
  const navigate = useNavigate();
  const { preferences, hasCompletedOnboarding } = usePreferences();
  const [query, setQuery] = useState('');

  const placeholders = [
    "Find beginner-friendly Python repos with good first issues",
    "Search for JavaScript projects with documentation needs",
    "Discover Ruby repositories accepting new contributors",
    "Look for React projects with Hacktoberfest tags",
    "Find machine learning repos for beginners",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/search', { state: { query } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        
        {/* Particle Effect */}
        <ParticleHero />
        
        {/* Accent Lines */}
        <AccentLines />
        
        <div className="container-modern relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Kicker */}
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 animate-fade-in">
              Introducing
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight animate-fade-in">
              Find repositories that
              <span className="block">match your passion</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Discover the perfect open source projects to contribute to based on your skills, interests, and availability
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
              <div className="relative">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
                {/* Search glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* CTA */}
            {!hasCompletedOnboarding && (
              <div className="animate-slide-up">
                <Button
                  onClick={() => navigate('/onboarding')}
                  className="h-9 px-4 bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors duration-300"
                >
                  Get Personalized Recommendations
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Featured Section */}
      <section className="section-spacing relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-primary/3"></div>
        
        <div className="container-modern relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Featured</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {hasCompletedOnboarding ? 'Recommended For You' : 'Popular Repositories'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {hasCompletedOnboarding 
                  ? 'Curated based on your preferences and skill level'
                  : 'Start your open source journey with these trusted projects'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {mockRecommendedRepos.map((repo, index) => (
              <div 
                key={repo.name} 
                className={`transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-up ${
                  index === 0 ? 'lg:col-span-2' : ''
                } ${index === 1 ? 'animate-delay-150ms' : ''} ${index === 2 ? 'animate-delay-300ms' : ''}`}
              >
                <RepoCard 
                  repo={repo} 
                  isHighlight={index === 0}
                  whyRecommended={hasCompletedOnboarding ? `Matches your ${preferences?.languages?.[0] || 'JavaScript'} skills and ${preferences?.interestAreas?.[0] || 'web development'} interests` : undefined}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="btn-secondary group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                View More Repositories
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
