import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { VMPricing } from '@/data/vmData';
import PriceTag from './PriceTag';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface VMTableProps {
  data: VMPricing[];
}

type SortKey = keyof VMPricing;
type SortOrder = 'asc' | 'desc';

const VMTable: React.FC<VMTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }

      return sortOrder === 'asc' 
        ? Number(valueA) - Number(valueB) 
        : Number(valueB) - Number(valueA);
    });
  }, [data, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    
    return sortOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const generatePagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      if (startPage > 2) {
        pages.push('ellipsis');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full overflow-x-auto">
      {data.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">No virtual machines found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full vm-table">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="cursor-pointer" onClick={() => handleSort('provider')}>
                    <div className="flex items-center">
                      Provider
                      {renderSortIcon('provider')}
                    </div>
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort('processor')}>
                    <div className="flex items-center">
                      Processor
                      {renderSortIcon('processor')}
                    </div>
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort('resources')}>
                    <div className="flex items-center">
                      Resources
                      {renderSortIcon('resources')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('cpu')}>
                    <div className="flex items-center justify-end">
                      CPU
                      {renderSortIcon('cpu')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('ram')}>
                    <div className="flex items-center justify-end">
                      RAM (GB)
                      {renderSortIcon('ram')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('disk')}>
                    <div className="flex items-center justify-end">
                      Disk (GB)
                      {renderSortIcon('disk')}
                    </div>
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort('bandwidth')}>
                    <div className="flex items-center">
                      Bandwidth
                      {renderSortIcon('bandwidth')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('speed')}>
                    <div className="flex items-center justify-end">
                      Speed (GHz)
                      {renderSortIcon('speed')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('price')}>
                    <div className="flex items-center justify-end">
                      Price
                      {renderSortIcon('price')}
                    </div>
                  </th>
                  <th className="cursor-pointer text-right" onClick={() => handleSort('priceEUR')}>
                    <div className="flex items-center justify-end">
                      Price (€)
                      {renderSortIcon('priceEUR')}
                    </div>
                  </th>
                </tr>
              </thead>
              
              <motion.tbody 
                variants={container}
                initial="hidden"
                animate="show"
              >
                {paginatedData.map((vm) => (
                  <motion.tr 
                    key={vm.id} 
                    variants={item}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="font-medium">{vm.provider}</td>
                    <td>{vm.processor}</td>
                    <td>{vm.resources}</td>
                    <td className="text-right">{vm.cpu}</td>
                    <td className="text-right">{vm.ram}</td>
                    <td className="text-right">{vm.disk}</td>
                    <td>{vm.bandwidth}</td>
                    <td className="text-right">{vm.speed}</td>
                    <td className="text-right">
                      <PriceTag price={vm.price} currency={vm.currency} />
                    </td>
                    <td className="text-right">
                      <PriceTag price={vm.priceEUR} currency="€" />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} virtual machines
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
                  Show
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="h-8 pl-2 pr-8 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {generatePagination().map((page, index) => (
                      page === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <span className="flex h-9 w-9 items-center justify-center">...</span>
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={`page-${page}`}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => handlePageChange(page as number)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VMTable;
