import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({label,className}) => {
  return (
    <div className="w-full h-10 md:h-12 px-2 md:px-4 bg-white rounded flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <div className={clsx("w-4 h-4 rounded-full ", className)} />
        <p className="text-sm md:text-base">{label}</p>
      </div>

      <button>
        <IoMdAdd className="text-lg text-black" />
      </button>
    </div>
  );
};

export default TaskTitle;
