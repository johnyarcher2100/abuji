import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import LearningPlansPage from './pages/LearningPlansPage'
import CreatePlanPage from './pages/CreatePlanPage'
import UploadPage from './pages/UploadPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="plans" element={<LearningPlansPage />} />
        <Route path="create" element={<CreatePlanPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
