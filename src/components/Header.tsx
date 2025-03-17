
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="py-8 md:py-12 mb-6 md:mb-10 w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-3">
              Cloud Computing
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Virtual Machine Pricing
          </motion.h1>
          
          <motion.p 
            className="mx-auto max-w-[700px] text-gray-500 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Compare specifications and pricing across different cloud providers to find the best option for your needs.
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
