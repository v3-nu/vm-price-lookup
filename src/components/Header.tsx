
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
            Compare pricing and specifications across different eu-based (or non-eu based with datacenters in the EU) cloud providers. Feel free to open pull requests on the Github repo to add providers, correct inaccuracies or write a frontend that isn't AI-generated - I'm more of a data person than a frontend person (obviously).<br/>
            A note regarding the data - It is likely not 100% accurate, but it is a good starting point. I will add some more data in the coming days, among others the datacenter locations for each provider.<br/>
            Github repo: <a href="https://github.com/johan-gustafsson/eu-cloud-pricing" target="_blank" rel="noopener noreferrer">https://github.com/v3-nu/vm-price-lookup</a>
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
