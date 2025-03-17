
import { motion } from "framer-motion";

interface PriceTagProps {
  price: number;
  currency: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, currency }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <motion.div 
      className="font-medium"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="text-gray-900">{currency} {formatPrice(price)}</span>
    </motion.div>
  );
};

export default PriceTag;
