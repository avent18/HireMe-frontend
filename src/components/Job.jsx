/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      {/* Top Row: Posted time + Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/90">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-lg border-gray/50  hover:bg-white/10"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Company Logo */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
      </div>

      {/* Company Name */}
      <div className="mb-2">
        <h2 className="text-white font-semibold text-lg">
          {job?.company?.name}
        </h2>
        <p className="text-white/80 font-medium text-sm mt-1">
          {job?.location}
        </p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="text-xl font-bold text-white">{job?.title}</h1>
        <p className="text-white/80 text-sm mt-1">
          {seeMore
            ? job?.description
            : job?.description?.length > 100
            ? `${job?.description.slice(0, 100)}...`
            : job?.description}
        </p>
        {job?.description?.length > 100 && (
          <button
            className="text-amber-400 text-xs mt-1 hover:underline"
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-200 font-bold bg-blue-500/20 backdrop-blur-md">
          {job.position} positions
        </Badge>
        <Badge className="text-red-200 font-bold bg-red-500/20 backdrop-blur-md">
          {job.jobType}
        </Badge>
        <Badge className="text-purple-200 font-bold bg-purple-500/20 backdrop-blur-md">
          {job.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="destructive"
        >
          Details
        </Button>
        <Button variant="secondary">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
