
import { useState, useEffect, useMemo } from 'react';
import { SearchIcon, X, Filter } from 'lucide-react';
import { VMPricing } from '@/data/vmData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion';

interface TableFiltersProps {
  onFilterChange: (filters: {
    search: string;
    provider: string | null;
    minCPU: number | null;
    maxRAM: number | null;
    maxPrice: number | null;
    processor: string | null;
    resources: string | null;
  }) => void;
  data: VMPricing[];
}

const TableFilters: React.FC<TableFiltersProps> = ({ onFilterChange, data }) => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [minCPU, setMinCPU] = useState<number | null>(null);
  const [maxRAM, setMaxRAM] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [processor, setProcessor] = useState<string | null>(null);
  const [resources, setResources] = useState<string | null>(null);

  // Extract unique values from data for filters
  const filterData = useMemo(() => {
    if (!data.length) return {
      providers: [],
      processors: [],
      resourcesTypes: [],
      maxCPUValue: 0,
      maxRAMValue: 0,
      maxPriceValue: 0
    };

    const uniqueProviders = Array.from(new Set(data.map(vm => vm.provider)));
    const uniqueProcessors = Array.from(new Set(data.map(vm => vm.processor)));
    const uniqueResources = Array.from(new Set(data.map(vm => vm.resources)));
    
    const maxCPUValue = Math.max(...data.map(vm => vm.cpu));
    const maxRAMValue = Math.max(...data.map(vm => vm.ram));
    const maxPriceValue = Math.max(...data.map(vm => vm.priceeur));

    return {
      providers: uniqueProviders.filter(Boolean).sort(),
      processors: uniqueProcessors.filter(Boolean).sort(),
      resourcesTypes: uniqueResources.filter(Boolean).sort(),
      maxCPUValue: Math.ceil(maxCPUValue),
      maxRAMValue: Math.ceil(maxRAMValue),
      maxPriceValue: Math.ceil(maxPriceValue)
    };
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ 
      search: value, 
      provider, 
      minCPU, 
      maxRAM, 
      maxPrice, 
      processor, 
      resources 
    });
  };

  const handleProviderChange = (value: string | null) => {
    setProvider(value);
    onFilterChange({ 
      search, 
      provider: value, 
      minCPU, 
      maxRAM, 
      maxPrice, 
      processor, 
      resources 
    });
  };

  const handleProcessorChange = (value: string | null) => {
    setProcessor(value);
    onFilterChange({ 
      search, 
      provider, 
      minCPU, 
      maxRAM, 
      maxPrice, 
      processor: value, 
      resources 
    });
  };

  const handleResourcesChange = (value: string | null) => {
    setResources(value);
    onFilterChange({ 
      search, 
      provider, 
      minCPU, 
      maxRAM, 
      maxPrice, 
      processor, 
      resources: value 
    });
  };

  const handleMinCPUChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMinCPU(value);
    onFilterChange({ 
      search, 
      provider, 
      minCPU: value, 
      maxRAM, 
      maxPrice, 
      processor, 
      resources 
    });
  };

  const handleMaxRAMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMaxRAM(value);
    onFilterChange({ 
      search, 
      provider, 
      minCPU, 
      maxRAM: value, 
      maxPrice, 
      processor, 
      resources 
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMaxPrice(value);
    onFilterChange({ 
      search, 
      provider, 
      minCPU, 
      maxRAM, 
      maxPrice: value, 
      processor, 
      resources 
    });
  };

  const resetFilters = () => {
    setSearch("");
    setProvider(null);
    setMinCPU(null);
    setMaxRAM(null);
    setMaxPrice(null);
    setProcessor(null);
    setResources(null);
    onFilterChange({ 
      search: "", 
      provider: null, 
      minCPU: null, 
      maxRAM: null, 
      maxPrice: null, 
      processor: null, 
      resources: null 
    });
  };

  useEffect(() => {
    onFilterChange({
      search,
      provider: provider === '' ? null : provider,
      minCPU: minCPU === null ? null : Number(minCPU),
      maxRAM: maxRAM === null ? null : Number(maxRAM),
      maxPrice: maxPrice === null ? null : Number(maxPrice),
      processor: processor === '' ? null : processor,
      resources: resources === '' ? null : resources,
    });
  }, [search, provider, minCPU, maxRAM, maxPrice, processor, resources, onFilterChange]);

  const hasActiveFilters = search || provider || minCPU || maxRAM || maxPrice || processor || resources;

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
                onFilterChange({ 
                  search: "", 
                  provider, 
                  minCPU, 
                  maxRAM, 
                  maxPrice, 
                  processor, 
                  resources 
                });
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
          <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
        </Button>
        
        {hasActiveFilters && (
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
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Provider
                  </Label>
                  <select
                    value={provider || ""}
                    onChange={(e) => handleProviderChange(e.target.value || null)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  >
                    <option value="">All Providers</option>
                    {filterData.providers.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Processor
                  </Label>
                  <select
                    value={processor || ""}
                    onChange={(e) => handleProcessorChange(e.target.value || null)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  >
                    <option value="">All Processors</option>
                    {filterData.processors.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Resources
                  </Label>
                  <select
                    value={resources || ""}
                    onChange={(e) => handleResourcesChange(e.target.value || null)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  >
                    <option value="">All Resource Types</option>
                    {filterData.resourcesTypes.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Min CPU Cores: {minCPU ?? 'Any'}
                  </Label>
                  <Input
                    type="number"
                    placeholder="Min CPU"
                    value={minCPU ?? ""}
                    onChange={handleMinCPUChange}
                    min={0}
                    step={0.25}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Max RAM (GB): {maxRAM ?? 'Any'}
                  </Label>
                  <Input
                    type="number"
                    placeholder="Max RAM"
                    value={maxRAM ?? ""}
                    onChange={handleMaxRAMChange}
                    min={0}
                    step={1}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price (€): {maxPrice ?? 'Any'}
                  </Label>
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice ?? ""}
                    onChange={handleMaxPriceChange}
                    min={0}
                    step={1}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableFilters;
