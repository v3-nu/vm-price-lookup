
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import VMTable from '../components/VMTable';
import TableFilters from '../components/TableFilters';
import { vmData } from '../data/vmData';

const Index = () => {
  const [filters, setFilters] = useState({
    search: '',
    provider: null as string | null,
    minCPU: null as number | null,
    maxPrice: null as number | null,
  });

  const filteredData = useMemo(() => {
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
  }, [filters]);

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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
