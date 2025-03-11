import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiChevronLeft, FiCheck, FiCalendar, FiBookOpen, FiClock, FiTarget } from 'react-icons/fi';

const CreatePlanPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    level: '',
    duration: '',
    objectives: [''],
    resources: [''],
    schedule: [''],
    notes: ''
  });
  const [previewMode, setPreviewMode] = useState(false);

  // Total number of steps in the form
  const totalSteps = 4;

  // Handle input change for single fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle array field changes (objectives, resources, schedule)
  const handleArrayChange = (name, index, value) => {
    const newArray = [...formData[name]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [name]: newArray
    });
  };

  // Add new item to array fields
  const addItem = (name) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], '']
    });
  };

  // Remove item from array fields
  const removeItem = (name, index) => {
    const newArray = [...formData[name]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [name]: newArray.length > 0 ? newArray : ['']
    });
  };

  // Navigation functions
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setPreviewMode(true);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Check if current step is valid to proceed
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.subject && formData.level && formData.duration;
      case 2:
        return formData.objectives.every(item => item.trim() !== '');
      case 3:
        return formData.resources.every(item => item.trim() !== '');
      case 4:
        return formData.schedule.every(item => item.trim() !== '');
      default:
        return true;
    }
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    alert('學習計劃創建成功！');
    // Reset form
    setFormData({
      title: '',
      subject: '',
      level: '',
      duration: '',
      objectives: [''],
      resources: [''],
      schedule: [''],
      notes: ''
    });
    setStep(1);
    setPreviewMode(false);
  };

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">創建學習計劃</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            設計您的個性化學習計劃，定義學習目標、資源和時間表，打造專屬學習路徑。
          </p>
        </motion.div>

        {/* Steps Progress */}
        {!previewMode && (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center flex-1"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                      ${index + 1 === step 
                        ? 'bg-apple-blue text-white' 
                        : index + 1 < step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'}`}
                  >
                    {index + 1 < step ? <FiCheck /> : index + 1}
                  </div>
                  <span className={`text-sm hidden md:block ${index + 1 === step ? 'text-apple-blue font-medium' : 'text-gray-500'}`}>
                    {index === 0 ? '基本信息' : 
                     index === 1 ? '學習目標' : 
                     index === 2 ? '學習資源' : '學習計劃'}
                  </span>
                  {index < totalSteps - 1 && (
                    <div className="w-full h-1 bg-gray-200 mt-4 hidden md:block">
                      <div 
                        className={`h-full bg-apple-blue transition-all duration-300`}
                        style={{width: index + 1 < step ? '100%' : index + 1 === step ? '50%' : '0%'}}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <motion.div
          key={`${step}-${previewMode}`}
          initial={{ opacity: 0, x: previewMode ? 20 : step > 1 ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-apple shadow-apple p-6 md:p-8"
        >
          {previewMode ? (
            // Preview Mode
            <div>
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b">學習計劃預覽</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FiBookOpen className="text-apple-blue" /> 基本信息
                  </h3>
                  <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">標題</p>
                      <p className="font-medium">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">學科</p>
                      <p className="font-medium">{formData.subject}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">難度</p>
                      <p className="font-medium">{formData.level}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">時長</p>
                      <p className="font-medium">{formData.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FiTarget className="text-apple-blue" /> 學習目標
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    {formData.objectives.map((objective, index) => (
                      objective && <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FiBookOpen className="text-apple-blue" /> 學習資源
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    {formData.resources.map((resource, index) => (
                      resource && <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FiCalendar className="text-apple-blue" /> 學習計劃
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    {formData.schedule.map((item, index) => (
                      item && <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                {formData.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">備註</h3>
                    <p className="ml-6 text-gray-600">{formData.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={togglePreview}
                  className="btn btn-secondary flex-1"
                >
                  返回編輯
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary flex-1"
                >
                  確認創建
                </button>
              </div>
            </div>
          ) : (
            // Form Steps
            <form>
              {step === 1 && (
                // Step 1: Basic Information
                <div>
                  <h2 className="text-2xl font-bold mb-6">基本信息</h2>
                  
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">計劃標題</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="例如：國中數學三角函數精通計劃"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="mb-5">
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">學科</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                        required
                      >
                        <option value="">選擇學科</option>
                        <option value="數學">數學</option>
                        <option value="國文">國文</option>
                        <option value="英文">英文</option>
                        <option value="自然">自然</option>
                        <option value="社會">社會</option>
                        <option value="藝能">藝能</option>
                      </select>
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="level" className="block text-gray-700 font-medium mb-2">難度</label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                        required
                      >
                        <option value="">選擇難度</option>
                        <option value="基礎">基礎</option>
                        <option value="中級">中級</option>
                        <option value="進階">進階</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">計劃時長</label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      required
                    >
                      <option value="">選擇時長</option>
                      <option value="1週">1週</option>
                      <option value="2週">2週</option>
                      <option value="4週">4週</option>
                      <option value="6週">6週</option>
                      <option value="8週">8週</option>
                      <option value="12週">12週</option>
                    </select>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                // Step 2: Learning Objectives
                <div>
                  <h2 className="text-2xl font-bold mb-6">學習目標</h2>
                  <p className="text-gray-600 mb-6">
                    定義您希望通過此學習計劃達成的目標，建議為每個目標使用明確、可衡量的描述。
                  </p>
                  
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                        placeholder={`目標 ${index + 1}`}
                        className="flex-grow border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem('objectives', index)}
                        disabled={formData.objectives.length <= 1}
                        className={`px-3 py-2 rounded-md border ${
                          formData.objectives.length <= 1 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-red-300 text-red-500 hover:bg-red-50'
                        }`}
                        aria-label="移除目標"
                      >
                        –
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addItem('objectives')}
                    className="text-apple-blue font-medium flex items-center gap-1 hover:underline mb-4"
                  >
                    + 添加另一個目標
                  </button>
                </div>
              )}
              
              {step === 3 && (
                // Step 3: Learning Resources
                <div>
                  <h2 className="text-2xl font-bold mb-6">學習資源</h2>
                  <p className="text-gray-600 mb-6">
                    列出您計劃使用的學習資源，可以包括書籍、網站、視頻課程等。
                  </p>
                  
                  {formData.resources.map((resource, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <input
                        type="text"
                        value={resource}
                        onChange={(e) => handleArrayChange('resources', index, e.target.value)}
                        placeholder={`資源 ${index + 1}`}
                        className="flex-grow border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem('resources', index)}
                        disabled={formData.resources.length <= 1}
                        className={`px-3 py-2 rounded-md border ${
                          formData.resources.length <= 1 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-red-300 text-red-500 hover:bg-red-50'
                        }`}
                        aria-label="移除資源"
                      >
                        –
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addItem('resources')}
                    className="text-apple-blue font-medium flex items-center gap-1 hover:underline mb-4"
                  >
                    + 添加另一個資源
                  </button>
                </div>
              )}
              
              {step === 4 && (
                // Step 4: Learning Schedule
                <div>
                  <h2 className="text-2xl font-bold mb-6">學習計劃</h2>
                  <p className="text-gray-600 mb-6">
                    設定您的學習時間表，可以按照週或天來安排具體的學習內容和任務。
                  </p>
                  
                  {formData.schedule.map((item, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('schedule', index, e.target.value)}
                        placeholder={`第 ${index + 1} 週/天計劃`}
                        className="flex-grow border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem('schedule', index)}
                        disabled={formData.schedule.length <= 1}
                        className={`px-3 py-2 rounded-md border ${
                          formData.schedule.length <= 1 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-red-300 text-red-500 hover:bg-red-50'
                        }`}
                        aria-label="移除計劃項"
                      >
                        –
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addItem('schedule')}
                    className="text-apple-blue font-medium flex items-center gap-1 hover:underline mb-4"
                  >
                    + 添加另一個計劃項
                  </button>
                  
                  <div className="mt-6">
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">備註（可選）</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="添加任何額外的備註或說明"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent h-32"
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`btn ${step === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-secondary'} sm:w-32 flex items-center justify-center gap-1`}
                >
                  <FiChevronLeft /> 上一步
                </button>
                
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`btn ${!isStepValid() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-primary'} sm:w-32 flex items-center justify-center gap-1`}
                >
                  {step === totalSteps ? '預覽' : '下一步'} {step < totalSteps && <FiChevronRight />}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePlanPage;
