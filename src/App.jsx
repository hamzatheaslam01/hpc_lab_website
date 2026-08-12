import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Publications from "./pages/Publications";
import People from "./pages/People";
import Contact from "./pages/Contact";
import Videos from "./pages/Videos";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPublications from "./pages/admin/AdminPublications";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminPeople from "./pages/admin/AdminPeople";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminNews from "./pages/admin/AdminNews";


import { useEffect } from "react";
import { testSupabase } from "./lib/testSupabase";


export default function App() {
  useEffect(() => {
    testSupabase();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/people" element={<People />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/publications" element={<AdminPublications />} />
      <Route path="/admin/projects" element={<AdminProjects />} />
      <Route path="/admin/people" element={<AdminPeople />} />
      <Route path="/admin/videos" element={<AdminVideos />} />
      <Route path="/admin/news" element={<AdminNews />} />
    </Routes>
  );
}