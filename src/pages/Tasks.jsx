import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView } from 'react-icons/md'
import { useParams } from "react-router-dom"
import Loading from '../components/Loader'

const TABS = [
  { title : "Board View" , icon : <MdGridView/>},
  { title : "List View" , icon : <FaList/>}
] 

const TASK_TYPE= {
  todo : "bg-blue-600",
  inprogress : "bg-yellow-600",
  completed : "bg-green-600"
}

const Tasks = () => {
  const params = useParams()

  const [selected,setSelected] = useState(0)
  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : <div></div>
}

export default Tasks