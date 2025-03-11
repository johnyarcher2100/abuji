import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiTrash2, FiCheckCircle, FiTag, FiX } from 'react-icons/fi';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const fileInputRef = useRef(null);
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        id: crypto.randomUUID(),
        preview: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        file,
        id: crypto.randomUUID(),
        preview: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Remove file from list
  const removeFile = (id) => {
    setFiles(prev => {
      const filtered = prev.filter(file => file.id !== id);
      return filtered;
    });
  };
  
  // Add tag
  const addTag = () => {
    if (inputTag.trim() !== '' && !tags.includes(inputTag.trim())) {
      setTags(prev => [...prev, inputTag.trim()]);
      setInputTag('');
    }
  };
  
  // Handle tag input keydown
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputTag === '' && tags.length > 0) {
      setTags(prev => prev.slice(0, -1));
    }
  };
  
  // Remove tag
  const removeTag = (index) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };
  
  // Submit upload
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
      
      // Clean up file previews
      files.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
      
      // Reset form after delay
      setTimeout(() => {
        setFiles([]);
        setTags([]);
        setUploadComplete(false);
      }, 3000);
    }, 2000);
  };
  
  // Get file icon
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <span className="text-red-500">PDF</span>;
      case 'doc':
      case 'docx':
        return <span className="text-blue-500">DOC</span>;
      case 'xls':
      case 'xlsx':
        return <span className="text-green-500">XLS</span>;
      case 'ppt':
      case 'pptx':
        return <span className="text-orange-500">PPT</span>;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <span className="text-purple-500">IMG</span>;
      default:
        return <span className="text-gray-500">FILE</span>;
    }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">上傳學習計劃</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            分享您的學習計劃與資源，幫助其他學生提升學習效率。支持多種文件格式，包括PDF、Word、Excel、PowerPoint等。
          </p>
        </motion.div>
        
        {/* Upload Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-apple shadow-apple p-6 md:p-8"
        >
          {uploadComplete ? (
            // Success Message
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-3">上傳成功！</h2>
              <p className="text-gray-600 mb-6">
                感謝您分享學習資源，我們將審核您的內容並盡快發布。
              </p>
              <button 
                onClick={() => setUploadComplete(false)}
                className="btn btn-primary"
              >
                繼續上傳
              </button>
            </motion.div>
          ) : (
            // Upload Form
            <form onSubmit={handleSubmit}>
              {/* Drag & Drop Area */}
              <div 
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
                  ${dragActive ? 'border-apple-blue bg-apple-blue/5' : 'border-gray-300 hover:border-apple-blue/50 hover:bg-gray-50'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-apple-blue/10 flex items-center justify-center mb-4">
                    <FiUploadCloud className="w-8 h-8 text-apple-blue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">拖放文件或點擊上傳</h3>
                  <p className="text-gray-500 mb-4">
                    支持 PDF、Word、Excel、PowerPoint、圖片等格式
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary px-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                  >
                    瀏覽文件
                  </button>
                </div>
              </div>
              
              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">已選擇的文件</h3>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                            <FiFile className="text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{file.file.name}</div>
                            <div className="text-sm text-gray-500">
                              {getFileIcon(file.file.name)} • {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500"
                          aria-label="移除文件"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags Input */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">添加標籤</h3>
                <div className="flex flex-wrap items-center p-3 border border-gray-300 rounded-md focus-within:border-apple-blue focus-within:ring-2 focus-within:ring-apple-blue/30">
                  <FiTag className="text-gray-400 mr-2" />
                  
                  {/* Tags */}
                  {tags.map((tag, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-apple-blue/10 text-apple-blue px-2 py-1 rounded-full text-sm m-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 text-apple-blue/70 hover:text-apple-blue"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Input */}
                  <input
                    type="text"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={tags.length === 0 ? "輸入標籤，按Enter添加" : ""}
                    className="flex-grow outline-none py-1 px-2 min-w-[120px]"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  添加相關標籤，以幫助其他用戶更容易找到您的資源
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={files.length === 0 || uploading}
                  className={`
                    w-full btn btn-primary flex items-center justify-center gap-2
                    ${(files.length === 0 || uploading) ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      上傳中...
                    </>
                  ) : (
                    <>
                      <FiUploadCloud /> 上傳文件
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
        
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 p-6 bg-apple-gray rounded-apple"
        >
          <h3 className="text-lg font-semibold mb-4">上傳提示</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 確保您上傳的內容不侵犯他人著作權</li>
            <li>• 請不要上傳包含個人敏感信息的文件</li>
            <li>• 添加描述性標籤，以便其他用戶更容易找到您的資源</li>
            <li>• 上傳的文件大小上限為20MB</li>
            <li>• 支持的文件格式包括：PDF、DOC、DOCX、XLS、XLSX、PPT、PPTX、JPG、PNG</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
