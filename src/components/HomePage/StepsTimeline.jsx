import { motion } from 'framer-motion';

const StepsTimeline = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Steps data
  const steps = [
    {
      number: '01',
      title: '註冊帳號',
      description: '創建個人帳號，填寫基本資料，開始您的學習之旅',
      icon: '👤'
    },
    {
      number: '02',
      title: '探索計劃',
      description: '瀏覽豐富的學習計劃，根據科目、難度等條件篩選適合您的資源',
      icon: '🔍'
    },
    {
      number: '03',
      title: '創建計劃',
      description: '使用我們的工具創建個人化學習計劃，設定目標與時間安排',
      icon: '📝'
    },
    {
      number: '04',
      title: '執行計劃',
      description: '按照計劃進行學習，記錄學習過程，享受高效學習的樂趣',
      icon: '🚀'
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
            <span className="gradient-text">使用步驟</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            四個簡單步驟，開啟高效學習模式
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 md:-translate-x-px top-0 h-full w-0.5 bg-apple-blue/30"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 mb-12 md:mb-20 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 top-5 w-6 h-6 rounded-full bg-apple-blue -ml-3 md:-ml-3 md:-translate-x-px z-10"></div>
              
              {/* Content */}
              <div className={`flex-1 md:pr-12 md:pl-0 pl-12 ${index % 2 === 0 ? 'md:text-right md:pl-12 md:pr-0' : ''}`}>
                <div className="card p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{step.icon}</span>
                    <div>
                      <span className="text-sm text-apple-blue font-semibold">步驟 {step.number}</span>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              
              {/* Empty space for opposite side */}
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StepsTimeline;
