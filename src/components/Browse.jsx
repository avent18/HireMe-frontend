/** @format */

import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Full Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-gradient">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Navbar (floating) */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar transparent />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-20 px-4">
        <h1 className="font-bold text-2xl mb-6 text-gray-900">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <div className="text-center text-gray-700 mt-20 font-medium">
            No jobs available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <div
                key={job._id}
                className="backdrop-blur-lg  border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition p-4"
              >
                <Job job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
