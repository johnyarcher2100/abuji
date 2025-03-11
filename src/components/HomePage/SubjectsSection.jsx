import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SubjectsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Subject data
  const subjects = [
    {
      name: '國文',
      icon: '📚',
      color: 'from-blue-400 to-indigo-600',
      description: '從古典文學到現代應用，全面提升語文能力',
      count: '1,280+'
    },
    {
      name: '英文',
      icon: '🌎',
      color: 'from-green-400 to-teal-500',
      description: '打造國際視野，提升英語溝通與應用能力',
      count: '1,150+'
    },
    {
      name: '數學',
      icon: '🔢',
      color: 'from-red-400 to-rose-600',
      description: '培養邏輯思維，掌握數學核心概念與解題技巧',
      count: '1,430+'
    },
    {
      name: '自然',
      icon: '🔬',
      color: 'from-amber-400 to-orange-500',
      description: '探索自然奧秘，理解物理、化學、生物基本原理',
      count: '1,320+'
    },
    {
      name: '社會',
      icon: '🌏',
      color: 'from-purple-400 to-fuchsia-500',
      description: '了解人文歷史，培養公民素養與社會關懷',
      count: '1,180+'
    },
    {
      name: '藝能',
      icon: '🎨',
      color: 'from-pink-400 to-rose-500',
      description: '發展多元智能，培養藝術鑑賞與表達能力',
      count: '960+'
    }
  ];

  return (
    <section className="section bg-apple-gray">
      <div className="container">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">學科資源</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            涵蓋國中各學科，提供豐富多元的學習資源與計劃
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {subjects.map((subject, index) => (
            <motion.div 
              key={index}
              className="card overflow-hidden"
              variants={itemVariants}
            >
              <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold">{subject.name}</h3>
                  <span className="text-4xl">{subject.icon}</span>
                </div>
                <p className="opacity-90">{subject.description}</p>
              </div>
              <div className="p-5 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{subject.count} 份學習計劃</span>
                  <Link 
                    to={`/plans?subject=${subject.name}`} 
                    className="text-apple-blue font-medium hover:underline"
                  >
                    查看計劃 →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectsSection;
