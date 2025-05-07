
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Intentionally vulnerable - passing raw query to URL
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 rounded bg-muted text-foreground border border-border focus:border-primary focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
      </div>
      {/* Hidden comment with a flag - visible in page source */}
      {/* CTF{1nsp3ct_3l3m3nt_w1n} */}
    </form>
  );
};

export default SearchBar;
