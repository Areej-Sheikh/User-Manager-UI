import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Analytics from "./components/Analytics";
import NotificationForm from "./components/NotificationForm";

import Lenis from "@studio-freight/lenis";

const App = () => {
  const lenisRef = useRef(null);
console.log("Loaded API URL:", import.meta.env.VITE_API_URL);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2, 
      easing: (t) => t,
      smooth: true, 
    });


    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/notifications" element={<NotificationForm />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
