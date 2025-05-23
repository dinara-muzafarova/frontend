import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HistoryPage from './pages/HistoryPage';
import AchievementsPage from './pages/AchievementsPage';
import AlumniReviewsPage from './pages/AlumniReviewsPage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import PartnersPage from './pages/PartnersPage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import EditReviewPage from './pages/EditReviewPage';

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);
  

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/reviews" element={<AlumniReviewsPage />} />
          <Route path="/media" element={<MediaGalleryPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/submit-review" element={<SubmitReviewPage authToken={authToken} />} />
          <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
          <Route path="/register" element={<RegisterPage setAuthToken={setAuthToken} />} />
          <Route path="/account" element={<AccountPage authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/edit-review/:id" element={<EditReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
