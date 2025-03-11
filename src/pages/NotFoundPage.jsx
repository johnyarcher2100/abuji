import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <span className="text-9xl font-bold text-apple-gray">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">找不到頁面</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          很抱歉，您嘗試訪問的頁面不存在或已被移除。
        </p>
        <Link to="/" className="btn btn-primary px-8 py-3">
          返回首頁
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
