import { useState, useEffect, useMemo } from 'react';
import { SearchIcon, X, Filter } from 'lucide-react';
import { VMPricing } from '@/data/vmData';

interface TableFiltersProps {
  onFilterChange: (filters: {
    search: string;
    provider: string | null;
    minCPU: number | null;
    maxPrice: number | null;
  }) => void;
  data: VMPricing[];
}

const TableFilters: React.FC<TableFiltersProps> = ({ onFilterChange, data }) => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [minCPU, setMinCPU] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Extract all unique providers from data
  const providers = useMemo(() => {
    if (!data.length) return [];
    const uniqueProviders = Array.from(new Set(data.map(vm => vm.provider)));
    return uniqueProviders.filter(Boolean).sort();
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, provider, minCPU, maxPrice });
  };

  const handleProviderChange = (value: string | null) => {
    setProvider(value);
    onFilterChange({ search, provider: value, minCPU, maxPrice });
  };

  const handleMinCPUChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMinCPU(value);
    onFilterChange({ search, provider, minCPU: value, maxPrice });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMaxPrice(value);
    onFilterChange({ search, provider, minCPU, maxPrice: value });
  };

  const resetFilters = () => {
    setSearch("");
    setProvider(null);
    setMinCPU(null);
    setMaxPrice(null);
    onFilterChange({ search: "", provider: null, minCPU: null, maxPrice: null });
  };

  useEffect(() => {
    onFilterChange({
      search,
      provider: provider === '' ? null : provider,
      minCPU: minCPU === '' ? null : Number(minCPU),
      maxPrice: maxPrice === '' ? null : Number(maxPrice),
    });
  }, [search, provider, minCPU, maxPrice, onFilterChange]);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Search VM instances..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 h-10 w-full border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
          />
          <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                onFilterChange({ search: "", provider, minCPU, maxPrice });
              }}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button
          variant="outline"
          className="h-10 px-4 flex items-center space-x-2 text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        
        {(search || provider || minCPU || maxPrice) && (
          <Button
            variant="ghost"
            className="h-10 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  value={provider || ""}
                  onChange={(e) => handleProviderChange(e.target.value || null)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                >
                  <option value="">All Providers</option>
                  {providers.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min CPU Cores
                </label>
                <Input
                  type="number"
                  placeholder="Min CPU"
                  value={minCPU || ""}
                  onChange={handleMinCPUChange}
                  min={0}
                  step={0.25}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (€)
                </label>
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice || ""}
                  onChange={handleMaxPriceChange}
                  min={0}
                  step={1}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableFilters;
