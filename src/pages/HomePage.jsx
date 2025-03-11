import { motion } from 'framer-motion';
import HeroSection from '../components/HomePage/HeroSection';
import FeaturesSection from '../components/HomePage/FeaturesSection';
import SubjectsSection from '../components/HomePage/SubjectsSection';
import StepsTimeline from '../components/HomePage/StepsTimeline';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection />
      <StepsTimeline />
      
      {/* Call to action section */}
      <section className="section bg-apple-gray">
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto py-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              準備好開始您的學習旅程了嗎？
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              立即加入阿布吉，探索豐富的學習資源，創建專屬學習計劃
            </p>
            <Link 
              to="/plans" 
              className="btn btn-primary text-lg px-8 py-4"
            >
              立即開始
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
