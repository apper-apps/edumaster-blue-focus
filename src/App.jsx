import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import MembershipPage from "@/components/pages/MembershipPage";
import MasterPage from "@/components/pages/MasterPage";
import InsightsPage from "@/components/pages/InsightsPage";
import TestimonialsPage from "@/components/pages/TestimonialsPage";
import VideoPlayerPage from "@/components/pages/VideoPlayerPage";
import BlogPostPage from "@/components/pages/BlogPostPage";
import AdminPage from "@/components/pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="membership" element={<MembershipPage />} />
            <Route path="master" element={<MasterPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;