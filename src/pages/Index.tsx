
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import VMTable from '../components/VMTable';
import TableFilters from '../components/TableFilters';
import { supabase } from '../integrations/supabase/client';
import { SupabaseVMPricing, convertToVMPricing } from '../types/supabase';
import { VMPricing } from '../data/vmData';
import { toast } from 'sonner';

import Papa from 'papaparse';

const fetchVMData = async (): Promise<VMPricing[]> => {
  try {
    const csvdata = await fetch('/EuropeanCloud.csv').then(res => res.text());
    
    const parsed = Papa.parse(csvdata, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      transform: (value) => value.trim(),
    });

   
    const pricingData = parsed.data as VMPricing[];

    console.log(pricingData);

    return pricingData;
  } catch (error) {
    console.error('Error fetching VM data:', error);
    console.log('Falling back to sample data due to error');
    // On any error, fall back to sample data
    return import('../data/vmData').then(module => module.vmData);
  }
};

const Index = () => {
  const [filters, setFilters] = useState({
    search: '',
    provider: null as string | null,
    minCPU: null as number | null,
    maxRAM: null as number | null,
    maxPrice: null as number | null,
    processor: null as string | null,
    resources: null as string | null,
  });

  const { data: vmData = [], isLoading, error } = useQuery({
    queryKey: ['vmPricing'],
    queryFn: fetchVMData,
  });

  // Show error toast if there's an error fetching data
  useEffect(() => {
    if (error) {
      toast.error('Failed to load VM pricing data. Please try again later.');
    }
  }, [error]);

  const filteredData = useMemo(() => {
    if (!vmData.length) return [];
    
    return vmData.filter((vm) => {
      // Search filter (case insensitive)
      if (filters.search && !Object.values(vm).some(val => 
        typeof val === 'string' && val.toLowerCase().includes(filters.search.toLowerCase())
      )) {
        return false;
      }

      // Provider filter
      if (filters.provider && vm.provider !== filters.provider) {
        return false;
      }

      // CPU filter
      if (filters.minCPU !== null && vm.cpu < filters.minCPU) {
        return false;
      }
      
      // RAM filter
      if (filters.maxRAM !== null && vm.ram > filters.maxRAM) {
        return false;
      }

      // Price filter (in EUR)
      if (filters.maxPrice !== null && vm.priceeur > filters.maxPrice) {
        return false;
      }
      
      // Processor filter
      if (filters.processor && vm.processor !== filters.processor) {
        return false;
      }
      
      // Resources filter
      if (filters.resources && vm.resources !== filters.resources) {
        return false;
      }

      return true;
    });
  }, [vmData, filters]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 pb-16">
        <Header />
        
        <motion.div
          className="max-w-[1200px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <TableFilters 
                onFilterChange={setFilters} 
                data={vmData} 
              />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`table-${filters.search}-${filters.provider}-${filters.minCPU}-${filters.maxPrice}-${filters.processor}-${filters.resources}-${filters.maxRAM}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <VMTable data={filteredData} />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
