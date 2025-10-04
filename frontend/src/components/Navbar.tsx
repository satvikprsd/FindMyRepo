import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/hidden-gems', label: 'Hidden Gems' },
    { path: '/personalized', label: 'Personalized' },
    { path: '/hacktoberfest', label: 'Hacktoberfest' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container-modern">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Leftmost */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
              OSS Discovery
            </span>
          </Link>
          
          {/* Navigation Links - Right */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label }) => (
              <Link 
                key={path}
                to={path} 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  isActive(path)
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Rightmost */}
          <div className="md:hidden">
            <button 
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-label="Open mobile menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
