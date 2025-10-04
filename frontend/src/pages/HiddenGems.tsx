import Navbar from '@/components/Navbar';
import RepoCard, { RepoData } from '@/components/RepoCard';
import { Sparkles } from 'lucide-react';

const hiddenGemsRepos: RepoData[] = [
  {
    name: 'zola',
    description: 'A fast static site generator in a single binary with everything built-in',
    language: 'Rust',
    stars: 900,
    lastCommit: '2 days ago',
    tags: ['good first issue', 'documentation', 'rust'],
    url: 'https://github.com/getzola/zola',
  },
  {
    name: 'actix-web',
    description: 'Actix Web is a powerful, pragmatic, and extremely fast web framework for Rust',
    language: 'Rust',
    stars: 850,
    lastCommit: '1 week ago',
    tags: ['good first issue', 'web', 'framework'],
    url: 'https://github.com/actix/actix-web',
  },
  {
    name: 'tokio-console',
    description: 'A debugger for async rust programs',
    language: 'Rust',
    stars: 750,
    lastCommit: '3 days ago',
    tags: ['good first issue', 'tooling', 'debugging'],
    url: 'https://github.com/tokio-rs/console',
  },
  {
    name: 'nushell',
    description: 'A new type of shell',
    language: 'Rust',
    stars: 950,
    lastCommit: '1 day ago',
    tags: ['good first issue', 'cli', 'shell'],
    url: 'https://github.com/nushell/nushell',
  },
];

const HiddenGems = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Hidden Gems</h1>
              <p className="text-muted-foreground">
                Discover active, quality projects with fewer than 1,000 stars
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            These repositories might not have massive star counts, but they're actively maintained, 
            well-documented, and welcoming to new contributors. Perfect for making a real impact!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hiddenGemsRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiddenGems;
