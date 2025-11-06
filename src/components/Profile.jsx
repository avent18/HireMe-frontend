/** @format */

import React from "react";
import Navbar from "../components/shared/Navbar";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import ApplicationTable from "./ApplicationTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";


  const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
   const [open, setOpen] = useState(false);
   const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={`${user?.profile?.profilePhoto}`}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mt-4">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => console.log("Update Profile") || setOpen(true)} className="text-right" variant="outline" >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {
            user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => {
                const hue = (index * 40) % 360; // spread hue around the color wheel
                const bgColor = `hsl(${hue}, 80%, 90%)`;
                const textColor = `hsl(${hue}, 60%, 30%)`;

                return (
                  <Badge
                    key={index}
                    style={{ backgroundColor: bgColor, color: textColor }}
                    className="px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </Badge>
                );
              })
            ) : (
              <p>No skills found.</p>
            )
            }
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Update Resume</span>
          )}
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          {/* Application Table */}
          <h1 className='font-bold text-lg my-5'>Job Management</h1>
          <ApplicationTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
