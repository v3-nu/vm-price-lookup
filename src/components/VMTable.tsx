
import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { VMPricing } from '@/data/vmData';
import PriceTag from './PriceTag';

interface VMTableProps {
  data: VMPricing[];
}

type SortKey = keyof VMPricing;
type SortOrder = 'asc' | 'desc';

const VMTable: React.FC<VMTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

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

  return (
    <div className="w-full overflow-x-auto">
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
            {sortedData.map((vm) => (
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
      
      <div className="text-center mt-4 text-sm text-gray-500">
        Showing {sortedData.length} virtual machines
      </div>
    </div>
  );
};

export default VMTable;
