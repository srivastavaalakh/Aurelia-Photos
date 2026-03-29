import { Routes, Route } from 'react-router-dom';
import Gallary from './pages/Gallary';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicFeed from './pages/PublicFeed';
import IntroPage from './pages/IntroPage';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main className="container mx-auto pt-16"> {/* Add padding top to avoid overlap with fixed navbar */}
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/feed" element={<PublicFeed />} />
          <Route path="/gallary" element={<ProtectedRoute><Gallary /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;