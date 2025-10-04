import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import RepoCard, { RepoData } from '@/components/RepoCard';

// Mock data - in production, this would come from your API
const mockSearchResults: RepoData[] = [
  {
    name: 'pandas',
    description: 'Flexible and powerful data analysis / manipulation library for Python',
    language: 'Python',
    stars: 39000,
    lastCommit: '3 hours ago',
    tags: ['good first issue', 'documentation', 'python'],
    url: 'https://github.com/pandas-dev/pandas',
  },
  {
    name: 'fastapi',
    description: 'FastAPI framework, high performance, easy to learn, fast to code',
    language: 'Python',
    stars: 67000,
    lastCommit: '1 day ago',
    tags: ['good first issue', 'web', 'api'],
    url: 'https://github.com/tiangolo/fastapi',
  },
  {
    name: 'requests',
    description: 'A simple, yet elegant HTTP library',
    language: 'Python',
    stars: 51000,
    lastCommit: '2 weeks ago',
    tags: ['good first issue', 'documentation'],
    url: 'https://github.com/psf/requests',
  },
];

const highlightRepo: RepoData & { whyRecommended: string } = {
  name: 'pandas',
  description: 'Flexible and powerful data analysis / manipulation library for Python',
  language: 'Python',
  stars: 39000,
  lastCommit: '3 hours ago',
  tags: ['good first issue', 'documentation', 'python'],
  url: 'https://github.com/pandas-dev/pandas',
  whyRecommended: 'Perfect match for beginners! Has extensive documentation needs, active maintainers who are welcoming to new contributors, and plenty of "good first issue" tags.',
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || '';

  const handleSearch = (newQuery: string) => {
    navigate('/search', { state: { query: newQuery } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={query || "Search for repositories..."} 
          />
        </div>

        {/* AI Highlight */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-2">Best Match</h2>
            <p className="text-muted-foreground">AI-curated recommendation based on your search</p>
          </div>
          <RepoCard 
            repo={highlightRepo} 
            isHighlight={true} 
            whyRecommended={highlightRepo.whyRecommended}
          />
        </section>

        {/* Results List */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">More Results</h2>
            <p className="text-muted-foreground">
              Found {mockSearchResults.length} repositories matching "{query}"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSearchResults.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchResults;
