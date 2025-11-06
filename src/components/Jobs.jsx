/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilteredJobs(filteredJobs);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="relative min-h-screen">
      {/* Full Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-gradient">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Navbar (transparent) */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar transparent />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-28 px-4"> {/* pt-20 = navbar height */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-[20%]">
            <div className="backdrop-blur-lg border border-white/30 rounded-2xl shadow-md p-4">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <div className="flex-1 text-center text-gray-700 mt-20 font-medium">
              No jobs available
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.3 }}
                    className="backdrop-blur-lg  border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition p-4"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
