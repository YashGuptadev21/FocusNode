import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, formatDate, PRIORITYSTYLES, TASK_TYPE } from "../../utils/index";
import clsx from "clsx";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import Button from "../Button";
import UserInfo from "../UserInfo";
import ConfirmationDialog from "../Dialogs";
import { toast } from "sonner";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [trashtask] = useTrashTaskMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await trashtask({
        id: selected,
        isTrash: "trash",
      }).unwrap();
      window.location.reload()
      toast.success(result?.data?.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  const TableHeader = ({ task }) => {
    return (
      <thead className="w-full border-b border-gray-300 dark:border-gray-600">
        <tr className="w-full text-left text-gray-600 text-sm sm:text-base">
          <th className="py-2 sm:px-2">Task Title</th>
          <th className="py-2 sm:px-2">Priority</th>
          <th className="py-2 sm:px-2 line-clamp-1">Created At</th>
          <th className="py-2 sm:px-2 hidden md:table-cell">Assets</th>
          <th className="py-2 sm:px-2 hidden lg:table-cell">Team</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({ task }) => {
    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2 px-1 sm:px-2">
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <p className="w-full line-clamp-2 text-sm sm:text-base text-black">
              {task?.title}
            </p>
          </div>
        </td>

        <td className="py-2 px-1 sm:px-2">
          <div className={"flex gap-1 items-center"}>
            <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
              {ICONS[task?.priority]}
            </span>
            <span className="capitalize line-clamp-1 text-sm sm:text-base">
              {task?.priority} Priority
            </span>
          </div>
        </td>

        <td className="py-2 px-1 sm:px-2">
          <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.date))}
          </span>
        </td>

        <td className="py-2 px-1 sm:px-2 hidden md:table-cell">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            {/* <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div> */}
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>
        </td>
        <td className="py-2 px-1 sm:px-2 hidden md:table-cell">
          <div className="flex">
            {task?.team?.map((m, index) => (
              <div
                key={m._id}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length],
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </td>

        {user.isAdmin && (
          <td className="py-2 flex gap-2 md:gap-4 justify-end">
            <Button
              className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
              label="Edit"
              type="button"
              onClick={() => editTaskHandler()}
              // disabled={user.isAdmin ? false : true}
            />
            <Button
              className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
              label="Delete"
              type="button"
              onClick={() => deleteClicks(task._id)}
              // disabled={user.isAdmin ? false : true}
            />
          </td>
        )}
      </tr>
    );
  };
  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <TableHeader />
            <tbody>
              {tasks?.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
