import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  return (
    <div className="w-full py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:gap-10 gap-4">
      {
      tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};

export default BoardView;
