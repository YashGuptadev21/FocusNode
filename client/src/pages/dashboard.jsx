import React, { useEffect } from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
// import { summary } from "../assets/data";
import clsx from "clsx";
import Chart from "../components/Chart";
import { BGS, PRIORITYSTYLES, TASK_TYPE } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    normal: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Teams</th>
        <th className="py-2 hidden md:block">Created At</th>
      </tr>
    </thead>
  );
  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2 ">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          ></div>
          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span
            className={clsx(
              "text-lg",
              PRIORITYSTYLES[task.priority] 
            )}
          >
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1"
              ,BGS[index % BGS.length])}
            >
               <UserInfo user={m}/>
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 hidden md:block ">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full md:w-3/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const DashBoard = () => {
  const {data,isLoading,error} = useGetDashboardStatsQuery()

  if(isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    )
  }
  const totals = data?.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals?.["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals?.["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals?.["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" ,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className=" text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
          >
          {icon}
          </div>
      </div>
    );
  };
  return (
    <div>
      <div className="h-full py-4 pr-8 pl-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>
        <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
          <h4 className="text-xl text-gray-600 font-semibold">
            Chart By Priority
          </h4>
          <Chart data={data?.graphData}/>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
          <TaskTable tasks={data?.last10Task} />

        </div>
      </div>
    </div>
  );
};

export default DashBoard;
