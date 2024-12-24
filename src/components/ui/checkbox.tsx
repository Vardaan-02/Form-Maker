"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface CheckBoxProps {
  label: string;
  isChecked: boolean;
  setIsChecked: () => void;
}

export const Checkbox = ({ isChecked, setIsChecked, label }: CheckBoxProps) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <motion.div
          className={`w-6 h-6 border-2 rounded-md ${
            isChecked ? "border-green-500 bg-green-500" : "border-gray-400"
          }`}
          animate={isChecked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            className="w-4 h-4 text-white absolute inset-0 m-auto"
            viewBox="0 0 20 20"
            initial={false}
            animate={
              isChecked
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 0.2 }}
          >
            <motion.path
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              d="M4 10l4 4L16 6"
            />
          </motion.svg>
        </motion.div>
        <input
          type="checkbox"
          className="absolute opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={() => setIsChecked()}
        />
      </div>
      <span className="text-gray-700 font-medium">{label}</span>
    </label>
  );
};
