import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-red-600",
  inprogress: "bg-yellow-600",
  Completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";
  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="w-full pr-8 pl-6">
      <div className="flex items-center justify-between mb-2">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>
      
        <Tabs tabs={TABS} setSelected={setSelected}>
          <div>
          {!status && (
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To-Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In-Progress" className={TASK_TYPE.inprogress} />
              <TaskTitle label="Completed" className={TASK_TYPE.Completed} />
            </div>
          )}
            <BoardView tasks={tasks} />
            </div>
         
            <div className="w-full">
              <Table tasks={tasks} />
            </div>
        
        </Tabs>
    </div>
  );
};

export default Tasks;
