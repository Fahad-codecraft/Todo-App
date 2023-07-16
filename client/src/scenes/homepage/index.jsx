import { Box } from "@mui/material"
import Navbar from "../navbar"
import AddTaskWidget from "../widgets/AddTaskWidget"
import { useState } from "react"
import TodosWidget from "../widgets/ShowTodosWidget"



const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
  return (
    <Box>
      <Navbar />
      <AddTaskWidget/>
      <TodosWidget searchQuery={searchQuery} handleSearch={handleSearch}/>
    </Box>


  )
}

export default HomePage