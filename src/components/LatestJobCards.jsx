/** @format */

import React, {useState} from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
    const [seeMore, setSeeMore] = useState(false);
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/description/${job._id}`)}} className="p-5 rounded-xl shadow-lg border border-white/30 
                 bg-white/20 backdrop-blur-xl cursor-pointer 
                 transition-transform hover:scale-[1.02] hover:shadow-2xl">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="ttext-sm text-amber-200 font-medium">India</p>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-black">{job?.title}</h1>
        <p className="text-gray-100 text-sm leading-relaxed">
          {seeMore
            ? job?.description
            : job?.description?.length > 100
            ? `${job?.description.slice(0, 100)}...`
            : job?.description}
        </p>
        {job?.description?.length > 100 && (
          <button
            className="text-blue-600 text-xs mt-1"
            onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "See less" : "See more"}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
