import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs' // Custom hook to fetch all jobs
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // For navigation

const Home = () => { // Assuming this hook fetches and sets all jobs in the Redux store
  useGetAllJobs();
  // Redirect recruiters to companies page
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-sm"></div>

      {/* Page content */}
      <Navbar />
      <div className="pt-24">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
    </div>
    </>
  )
}

export default Home;