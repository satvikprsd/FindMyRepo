import { Badge } from './ui/badge';
import { Star, Clock, ExternalLink, GitBranch, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export interface RepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  lastCommit: string;
  tags: string[];
  url: string;
  issues?: number;
  owner?: string;
}

interface RepoCardProps {
  repo: RepoData;
  isHighlight?: boolean;
  whyRecommended?: string;
}

// Language color mapping
const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    'JavaScript': 'bg-yellow-500',
    'TypeScript': 'bg-blue-500',
    'Python': 'bg-green-500',
    'HTML': 'bg-orange-500',
    'CSS': 'bg-blue-400',
    'Java': 'bg-red-500',
    'C++': 'bg-blue-600',
    'Go': 'bg-cyan-500',
    'Rust': 'bg-orange-600',
    'PHP': 'bg-purple-500',
    'Ruby': 'bg-red-400',
    'Swift': 'bg-orange-400',
    'Kotlin': 'bg-purple-600',
    'Dart': 'bg-blue-500',
    'C#': 'bg-purple-700',
    'Scala': 'bg-red-600',
    'Shell': 'bg-gray-600',
    'PowerShell': 'bg-blue-700',
    'Vue': 'bg-green-400',
    'React': 'bg-cyan-400',
    'Angular': 'bg-red-500',
    'Svelte': 'bg-orange-500',
    'Markdown': 'bg-gray-500',
    'Dockerfile': 'bg-blue-500',
    'YAML': 'bg-red-500',
    'JSON': 'bg-yellow-600',
    'XML': 'bg-orange-600',
    'SQL': 'bg-blue-600',
    'R': 'bg-blue-400',
    'MATLAB': 'bg-orange-500',
    'Perl': 'bg-purple-500',
    'Haskell': 'bg-purple-600',
    'Clojure': 'bg-green-600',
    'Erlang': 'bg-red-500',
    'Elixir': 'bg-purple-500',
    'F#': 'bg-blue-500',
    'OCaml': 'bg-orange-500',
    'Reason': 'bg-red-500',
    'Nim': 'bg-yellow-500',
    'Crystal': 'bg-gray-600',
    'Julia': 'bg-purple-500',
    'Lua': 'bg-blue-400',
    'Pascal': 'bg-blue-600',
    'Ada': 'bg-blue-500',
    'Fortran': 'bg-green-600',
    'COBOL': 'bg-blue-700',
    'Assembly': 'bg-gray-600',
    'Vim script': 'bg-green-500',
    'Emacs Lisp': 'bg-purple-500',
    'TeX': 'bg-gray-600',
    'Jupyter Notebook': 'bg-orange-500',
    'Makefile': 'bg-gray-600',
    'CMake': 'bg-blue-600',
    'Groovy': 'bg-blue-500',
    'Objective-C': 'bg-blue-600',
    'Objective-C++': 'bg-blue-700',
    'CoffeeScript': 'bg-yellow-600',
    'LiveScript': 'bg-blue-500',
    'D': 'bg-red-500',
    'Vala': 'bg-purple-500',
    'Racket': 'bg-blue-500',
    'Scheme': 'bg-red-500',
    'Common Lisp': 'bg-purple-600',
    'AutoHotkey': 'bg-green-500',
    'AutoIt': 'bg-green-600',
    'Batchfile': 'bg-gray-600',
    'Dockerfile': 'bg-blue-500',
    'VimL': 'bg-green-500',
    'Zig': 'bg-orange-500',
    'Nix': 'bg-blue-500',
    'Solidity': 'bg-gray-600',
    'WebAssembly': 'bg-purple-500',
    'GraphQL': 'bg-pink-500',
    'Handlebars': 'bg-orange-500',
    'Mustache': 'bg-gray-600',
    'Twig': 'bg-green-500',
    'Jinja': 'bg-red-500',
    'Pug': 'bg-green-600',
    'Stylus': 'bg-yellow-500',
    'Sass': 'bg-pink-500',
    'SCSS': 'bg-pink-500',
    'Less': 'bg-blue-500',
    'PostCSS': 'bg-purple-500',
  };
  
  return colors[language] || 'bg-gray-500';
};

const RepoCard = ({ repo, isHighlight = false, whyRecommended }: RepoCardProps) => {
  return (
    <article className={`group bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200 ${isHighlight ? 'border-primary/40 bg-primary/5' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {repo.owner ? `${repo.owner}/${repo.name}` : repo.name}
            </h3>
            <Button 
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-primary flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => window.open(repo.url, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {repo.description}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-4">
          <Button 
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs border-border bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground"
          >
            <Star className="h-3 w-3 mr-1" />
            Star
          </Button>
          {repo.issues && repo.issues > 0 && (
            <Button 
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-pink-500/50 bg-transparent hover:bg-pink-500/10 text-pink-400 hover:text-pink-300"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              Sponsor
            </Button>
          )}
        </div>
      </div>
      
      {/* Recommendation reason */}
      {whyRecommended && (
        <div className="bg-primary/5 border border-primary/20 p-3 rounded-md mb-3">
          <p className="text-sm text-foreground font-medium">💡 Why recommended:</p>
          <p className="text-sm text-muted-foreground mt-1">{whyRecommended}</p>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {repo.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-2 py-1">
            {tag}
          </Badge>
        ))}
      </div>
      
      {/* Footer stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" />
          <span>{repo.stars.toLocaleString()}</span>
        </div>
        {repo.issues !== undefined && (
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{repo.issues}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <Clock className="h-3.5 w-3.5" />
          <span>Updated {repo.lastCommit}</span>
        </div>
      </div>
    </article>
  );
};

export default RepoCard;
