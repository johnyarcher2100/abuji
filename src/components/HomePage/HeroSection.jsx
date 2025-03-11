import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-apple-gray to-white overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            讓學習更<span className="gradient-text">高效</span>，
            <br />讓知識更<span className="gradient-text">有序</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10"
            variants={itemVariants}
          >
            阿布吉專為國中生打造的自主學習平台，
            <br className="hidden md:block" />
            幫助你規劃學習目標、追蹤學習進度。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link 
              to="/plans" 
              className="btn btn-primary text-lg px-8 py-4"
            >
              瀏覽學習計劃
            </Link>
            <Link 
              to="/create" 
              className="btn btn-secondary text-lg px-8 py-4"
            >
              創建我的計劃
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex justify-center gap-12 text-center"
            variants={itemVariants}
          >
            <div>
              <p className="text-apple-blue text-4xl font-bold mb-2">5000+</p>
              <p className="text-gray-600">學習計劃</p>
            </div>
            <div>
              <p className="text-apple-blue text-4xl font-bold mb-2">10000+</p>
              <p className="text-gray-600">註冊用戶</p>
            </div>
            <div>
              <p className="text-apple-blue text-4xl font-bold mb-2">98%</p>
              <p className="text-gray-600">用戶滿意度</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-apple-blue opacity-5"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-apple-blue opacity-5"></div>
    </section>
  );
};

export default HeroSection;
