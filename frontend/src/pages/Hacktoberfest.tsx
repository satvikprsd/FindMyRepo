import Navbar from '@/components/Navbar';
import RepoCard, { RepoData } from '@/components/RepoCard';
import { GitPullRequest } from 'lucide-react';

const hacktoberfestRepos: RepoData[] = [
  {
    name: 'first-contributions',
    description: 'Help beginners make their first open source contribution',
    language: 'JavaScript',
    stars: 42000,
    lastCommit: '2 days ago',
    tags: ['hacktoberfest', 'good first issue', 'documentation'],
    url: 'https://github.com/firstcontributions/first-contributions',
  },
  {
    name: 'public-apis',
    description: 'A collective list of free APIs for use in software and web development',
    language: 'Python',
    stars: 280000,
    lastCommit: '1 day ago',
    tags: ['hacktoberfest', 'documentation', 'api'],
    url: 'https://github.com/public-apis/public-apis',
  },
  {
    name: 'freeCodeCamp',
    description: "freeCodeCamp.org's open-source codebase and curriculum",
    language: 'JavaScript',
    stars: 390000,
    lastCommit: '5 hours ago',
    tags: ['hacktoberfest', 'good first issue', 'education'],
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
  },
  {
    name: 'awesome-for-beginners',
    description: 'A list of awesome beginners-friendly projects',
    language: 'Markdown',
    stars: 38000,
    lastCommit: '1 week ago',
    tags: ['hacktoberfest', 'good first issue', 'curated-list'],
    url: 'https://github.com/MunGell/awesome-for-beginners',
  },
];

const Hacktoberfest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <GitPullRequest className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Hacktoberfest</h1>
              <p className="text-muted-foreground">
                Repositories participating in Hacktoberfest
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Join the annual celebration of open source! These repositories are actively participating 
            in Hacktoberfest and are ready to review your pull requests. Perfect for earning your 
            Hacktoberfest swag while contributing to meaningful projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hacktoberfestRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hacktoberfest;
