import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiInfo, FiBookmark, FiUser, FiClock, FiStar } from 'react-icons/fi';

const LearningPlansPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filters, setFilters] = useState({
    subject: searchParams.get('subject') || '',
    level: '',
    duration: '',
    sort: 'popular'
  });

  // Mock data for learning plans
  const learningPlans = [
    {
      id: 1,
      title: '國中數學代數基礎與應用',
      subject: '數學',
      level: '基礎',
      duration: '4週',
      author: '陳老師',
      rating: 4.8,
      reviews: 128,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '本計劃專為國中生設計，涵蓋代數基礎概念、一元一次方程式、二元一次方程組等內容，通過系統化的學習路徑，幫助學生建立扎實的代數基礎。',
    },
    {
      id: 2,
      title: '國文文言文閱讀理解進階',
      subject: '國文',
      level: '進階',
      duration: '6週',
      author: '林老師',
      rating: 4.9,
      reviews: 156,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '針對國中生常見的文言文閱讀困難，本計劃提供系統性的閱讀策略和理解方法，包含常見文言虛詞、古今詞義差異、句式特點等內容，提升文言文閱讀能力。',
    },
    {
      id: 3,
      title: '英語聽說能力強化計劃',
      subject: '英文',
      level: '中級',
      duration: '8週',
      author: '王老師',
      rating: 4.7,
      reviews: 93,
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '專注於提升英語聽力與口說能力的綜合計劃，通過日常對話、情境模擬、聽力練習等多種形式，培養學生的英語交流自信與能力。',
    },
    {
      id: 4,
      title: '自然科學實驗探究',
      subject: '自然',
      level: '中級',
      duration: '5週',
      author: '張老師',
      rating: 4.6,
      reviews: 87,
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '結合理論與實踐的自然科學學習計劃，通過家庭可實施的小型實驗，培養學生的科學探究能力與科學思維，涵蓋物理、化學、生物等多個領域的基礎實驗。',
    },
    {
      id: 5,
      title: '歷史文化深度探索',
      subject: '社會',
      level: '進階',
      duration: '6週',
      author: '李老師',
      rating: 4.9,
      reviews: 112,
      thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '深入探討中國與世界歷史中的重要事件、人物與文化現象，培養學生的歷史思維與文化理解能力，通過多元化的學習資源，帶領學生體驗歷史的豐富性。',
    },
    {
      id: 6,
      title: '幾何證明與空間思維',
      subject: '數學',
      level: '進階',
      duration: '7週',
      author: '吳老師',
      rating: 4.8,
      reviews: 78,
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: '系統性學習平面幾何與空間幾何的基本概念、性質與證明方法，培養邏輯推理與空間思維能力，為高中數學學習奠定基礎。',
    },
  ];

  // Apply filters to learning plans
  const filteredPlans = learningPlans.filter(plan => {
    let match = true;
    
    if (filters.subject && filters.subject !== plan.subject) match = false;
    if (filters.level && filters.level !== plan.level) match = false;
    if (filters.duration && filters.duration !== plan.duration) match = false;
    
    return match;
  });

  // Sort filtered plans
  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (filters.sort) {
      case 'popular':
        return b.reviews - a.reviews;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Update URL params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.subject) newParams.set('subject', filters.subject);
    if (filters.level) newParams.set('level', filters.level);
    if (filters.duration) newParams.set('duration', filters.duration);
    if (filters.sort) newParams.set('sort', filters.sort);
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      subject: '',
      level: '',
      duration: '',
      sort: 'popular'
    });
  };

  // Open plan detail modal
  const openPlanDetail = (plan) => {
    setSelectedPlan(plan);
  };

  // Close plan detail modal
  const closePlanDetail = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">學習計劃庫</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            探索各學科豐富的學習計劃，找到最適合您的學習路徑。您可以按照學科、難度等條件篩選，也可以創建屬於自己的學習計劃。
          </p>
        </motion.div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="md:hidden mb-5">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full btn bg-apple-gray text-apple-dark hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            <FiFilter /> 篩選計劃
          </button>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Filters Sidebar */}
          <motion.aside 
            className={`
              fixed md:relative inset-0 z-40 bg-white md:bg-transparent p-5 md:p-0 md:w-64 flex-shrink-0
              ${isFilterOpen ? 'flex flex-col' : 'hidden md:block'}
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-5 md:hidden">
              <h3 className="text-xl font-semibold">篩選條件</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800"
              >
                <FiX />
              </button>
            </div>

            <div className="bg-white rounded-apple shadow-apple p-5 mb-auto">
              <h3 className="text-lg font-medium mb-4">篩選條件</h3>
              
              {/* Subject Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">學科</label>
                <select
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                >
                  <option value="">全部學科</option>
                  <option value="數學">數學</option>
                  <option value="國文">國文</option>
                  <option value="英文">英文</option>
                  <option value="自然">自然</option>
                  <option value="社會">社會</option>
                  <option value="藝能">藝能</option>
                </select>
              </div>
              
              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">難度</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                >
                  <option value="">全部難度</option>
                  <option value="基礎">基礎</option>
                  <option value="中級">中級</option>
                  <option value="進階">進階</option>
                </select>
              </div>
              
              {/* Duration Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">時長</label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                >
                  <option value="">全部時長</option>
                  <option value="4週">4週</option>
                  <option value="5週">5週</option>
                  <option value="6週">6週</option>
                  <option value="7週">7週</option>
                  <option value="8週">8週以上</option>
                </select>
              </div>
              
              {/* Sort Order */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">排序方式</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                >
                  <option value="popular">最熱門</option>
                  <option value="rating">評分最高</option>
                  <option value="newest">最新發布</option>
                </select>
              </div>
              
              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full btn btn-secondary"
              >
                重置篩選條件
              </button>
            </div>
            
            {/* Close button for mobile */}
            <div className="mt-5 md:hidden">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full btn btn-primary"
              >
                套用篩選條件
              </button>
            </div>
          </motion.aside>

          {/* Results Area */}
          <motion.div 
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Results Count & Sort (Desktop) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 mb-3 sm:mb-0">
                找到 <span className="font-semibold">{sortedPlans.length}</span> 份學習計劃
              </p>
              <div className="hidden sm:block">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                >
                  <option value="popular">最熱門</option>
                  <option value="rating">評分最高</option>
                  <option value="newest">最新發布</option>
                </select>
              </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPlans.length > 0 ? (
                sortedPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    className="card overflow-hidden cursor-pointer hover:shadow-apple-hover transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => openPlanDetail(plan)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={plan.thumbnail} 
                        alt={plan.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                        {plan.subject}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{plan.title}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{plan.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FiUser className="text-gray-400" />
                          <span>{plan.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiClock className="text-gray-400" />
                          <span>{plan.duration}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-500" />
                          <span className="font-medium">{plan.rating}</span>
                          <span className="text-gray-500 text-sm">({plan.reviews})</span>
                        </div>
                        <span className="text-apple-blue font-medium text-sm">查看詳情</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">未找到符合條件的計劃</h3>
                  <p className="text-gray-600">請嘗試調整篩選條件，或者創建一個新的學習計劃</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div 
            className="bg-white rounded-apple max-w-3xl w-full max-h-[90vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={selectedPlan.thumbnail} 
                alt={selectedPlan.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={closePlanDetail}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-apple-blue/10 text-apple-blue rounded-full px-3 py-1 text-sm font-medium">
                  {selectedPlan.subject}
                </span>
                <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {selectedPlan.level}
                </span>
                <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {selectedPlan.duration}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{selectedPlan.title}</h2>
              <div className="flex items-center gap-6 mb-5 text-sm">
                <div className="flex items-center gap-1">
                  <FiUser className="text-gray-400" />
                  <span>{selectedPlan.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-500" />
                  <span className="font-medium">{selectedPlan.rating}</span>
                  <span className="text-gray-500">({selectedPlan.reviews})</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">計劃介紹</h3>
                <p className="text-gray-600">{selectedPlan.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">學習內容</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>掌握核心概念和原理</li>
                  <li>學習實際應用和解題技巧</li>
                  <li>通過練習鞏固所學知識</li>
                  <li>進行自我評估與反思</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">適合對象</h3>
                <p className="text-gray-600">
                  國中生、有學習需求的學生、需要系統性學習的自學者
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <FiBookmark /> 加入我的計劃
                </button>
                <button className="btn btn-secondary flex-1 flex items-center justify-center gap-2">
                  <FiInfo /> 了解更多
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dark overlay for mobile filters */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LearningPlansPage;
