import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiEdit, FiUploadCloud, FiBarChart2 } from 'react-icons/fi';

const FeaturesSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Feature items data
  const features = [
    {
      icon: <FiUsers className="w-10 h-10 text-apple-blue" />,
      title: '用戶註冊與登錄',
      description: '建立專屬個人帳戶，保存您的學習歷程和計劃，隨時隨地登錄訪問。'
    },
    {
      icon: <FiSearch className="w-10 h-10 text-apple-blue" />,
      title: '學習計劃瀏覽與篩選',
      description: '探索豐富多樣的學習計劃庫，使用多維度篩選工具，輕鬆找到最適合您的學習方案。'
    },
    {
      icon: <FiEdit className="w-10 h-10 text-apple-blue" />,
      title: '創建個人學習計劃',
      description: '使用直觀的計劃創建工具，設計符合個人需求的學習路徑，定制專屬學習方案。'
    },
    {
      icon: <FiUploadCloud className="w-10 h-10 text-apple-blue" />,
      title: '上傳學習計劃',
      description: '分享您的學習經驗和資源，上傳個人學習計劃，與更多同學交流學習心得。'
    },
    {
      icon: <FiBarChart2 className="w-10 h-10 text-apple-blue" />,
      title: '進度追蹤',
      description: '實時監控學習進度，查看完成情況，科學分析學習效果，持續優化學習方法。'
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">核心功能</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            阿布吉為國中生提供全方位的學習支持，讓自主學習變得簡單高效
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="card p-8 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-apple-gray p-5 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
