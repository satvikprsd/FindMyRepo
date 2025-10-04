import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RepoCard, { RepoData } from '@/components/RepoCard';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const personalizedRepos: RepoData[] = [
  {
    name: 'material-ui',
    description: 'Ready-to-use foundational React components, free forever',
    language: 'TypeScript',
    stars: 92000,
    lastCommit: '1 hour ago',
    tags: ['good first issue', 'documentation', 'react'],
    url: 'https://github.com/mui/material-ui',
  },
  {
    name: 'storybook',
    description: 'The UI component explorer. Develop, document, & test React, Vue, Angular, & more!',
    language: 'TypeScript',
    stars: 83000,
    lastCommit: '5 hours ago',
    tags: ['good first issue', 'documentation', 'tooling'],
    url: 'https://github.com/storybookjs/storybook',
  },
  {
    name: 'react-hook-form',
    description: 'React Hooks for form state management and validation',
    language: 'TypeScript',
    stars: 40000,
    lastCommit: '2 days ago',
    tags: ['good first issue', 'react', 'forms'],
    url: 'https://github.com/react-hook-form/react-hook-form',
  },
];

const Personalized = () => {
  const navigate = useNavigate();
  const { hasCompletedOnboarding, preferences } = usePreferences();

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mb-8">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Target className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Complete Onboarding First
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              To get personalized repository recommendations, we need to learn about your 
              preferences, skills, and interests.
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/onboarding')}>
              Start Onboarding
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Personalized Issues</h1>
              <p className="text-muted-foreground">
                Curated issues based on your preferences
              </p>
            </div>
          </div>
          
          {preferences && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">Your Preferences</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {preferences.skillLevel}
                </span>
                {preferences.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
                    {lang}
                  </span>
                ))}
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {preferences.contributionIntent}
                </span>
              </div>
            </div>
          )}
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            These repositories match your skill level, preferred languages, and contribution style. 
            Each has been selected to help you grow while making meaningful contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalizedRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personalized;
