/** @format */

import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    console.log("Selected Value:", value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full backdrop-blur-lg  border border-white/15 rounded-2xl shadow-lg p-5">
      {/* Title */}
      <h1 className="font-bold text-xl text-gray-900">Filter Jobs</h1>
      <hr className="mt-3 border-gray-300/50" />

      {/* Filter Options */}
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="mt-4 space-y-4"
      >
        {fitlerData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h2 className="font-semibold text-lg text-gray-800">
              {data.fitlerType}
            </h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-white/40 transition"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label
                    htmlFor={itemId}
                    className="cursor-pointer text-gray-900 hover:text-gray-900"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
