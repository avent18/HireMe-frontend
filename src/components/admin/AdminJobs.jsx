import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable.jsx'
import { setSearchJobByText } from '@/redux/jobSlice'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div
      className="min-h-screen text-white 
        bg-gradient-to-br from-[#b34CFF] via-[#8732ff] to-[#6a2ed4]"
    >
      {/* Navbar stays transparent + shiny */}
      <Navbar className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.3)]" />

      {/* Prevent overlap with transparent navbar */}
      <div className="pt-28 max-w-6xl mx-auto px-4">

        {/* Search + Button container */}
        <div
          className="flex items-center justify-between my-10 
            bg-white/10 backdrop-blur-xl 
            p-5 rounded-2xl border border-white/20
            shadow-[0_0_25px_rgba(255,255,255,0.25)]
            animate-softGlow"
        >
          <Input
            className="w-80 bg-white/10 text-white placeholder-purple-200 
              border border-white/30 rounded-xl
              focus:ring-2 focus:ring-pink-300 focus:border-pink-300
              shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            className="bg-gradient-to-r from-orange-400 to-orange-500 
              text-white font-semibold rounded-xl px-6 py-2
              shadow-[0_0_20px_rgba(255,165,0,0.5)]
              hover:shadow-[0_0_35px_rgba(255,165,0,0.8)]
              transition-all duration-300"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>

        {/* Table wrapper */}
        <div
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 
            border border-white/20
            shadow-[0_0_30px_rgba(255,255,255,0.3)]
            animate-softGlowSlow"
        >
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
