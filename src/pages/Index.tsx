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

const fetchVMData = async (): Promise<VMPricing[]> => {
  try {
    console.log('Fetching data from Supabase...');
    
    // Attempt to fetch from PricingList table
    const { data: pricingData, error: pricingError } = await supabase
      .from('PricingList')
      .select('*');

    if (pricingError) {
      console.error('Error fetching from PricingList:', pricingError);
      throw new Error('Failed to fetch data from PricingList table');
    }
    
    console.log('Data from PricingList:', pricingData);
    
    // If we get an empty array but no error, use sample data
    if (!pricingData || pricingData.length === 0) {
      console.log('No data found in PricingList, using sample data');
      // If no data is found in Supabase, use sample data from vmData.ts
      return import('../data/vmData').then(module => module.vmData);
    }
    
    // Convert the data to our app's format - use type assertion with unknown first
    return ((pricingData as unknown) as SupabaseVMPricing[]).map(convertToVMPricing);
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
    maxPrice: null as number | null,
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

      // Price filter (in EUR)
      if (filters.maxPrice !== null && vm.priceEUR > filters.maxPrice) {
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
                  key={`table-${filters.search}-${filters.provider}-${filters.minCPU}-${filters.maxPrice}`}
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
