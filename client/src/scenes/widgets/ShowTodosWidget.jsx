import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoWidget from "./ShowTodoWidget";
import FlexBetween from "../../components/FlexBetween";
import TodosWrapper from "../../components/TodosWrapper";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { DeleteOutlineOutlined, CheckBoxOutlineBlank, CheckBox, EditOutlined } from '@mui/icons-material';
import { TodoContext } from "../../context/TodoContext";
import { useContext } from "react";
import { motion } from 'framer-motion'

const TodosWidget = ({ searchQuery, handleSearch }) => {
  const token = useSelector((state) => state.token);
  const [todos, setTodos] = useState([]);
  const { refresh } = useContext(TodoContext);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [filter, setFilter] = useState("all");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("")

  const getTodos = async () => {
    const response = await fetch("https://todo-app-backend-rho.vercel.app/todos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTodos(data.reverse());
  };

  useEffect(() => {
    getTodos();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps


  const deleteTodo = async (_id) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Deleting...");
    setSnackbarOpen(true);

    setTodos(todos.filter((todo) => todo._id !== _id));

    await fetch(`https://todo-app-backend-rho.vercel.app/delete/todo/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnackbarSeverity("error");
    showSnackbar("Todo deleted successfully");
  };

 const completeTodo = async (_id) => {
  const completedTodos = todos.map((todo) => {
    if (todo._id === _id) {
      return { ...todo, complete: !todo.complete };
    }
    return todo;
  });

  setTodos(completedTodos);

  await fetch(`https://todo-app-backend-rho.vercel.app/todo/${_id}/complete`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};


  const updateTodo = async (_id, newText) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Editing...");
    setSnackbarOpen(true);

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === _id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );

    await fetch(`https://todo-app-backend-rho.vercel.app/todo/${_id}/edit`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    setSnackbarSeverity("success");
    showSnackbar("Todo updated successfully");
  };

  const startEditing = (_id, text) => {
    setEditingTodoId(_id);
    setEditedText(text);
  };

  const filteredTodos = todos.filter((todo) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase()
    return (
      todo.text.toLowerCase().includes(lowerCaseSearchQuery)
    )
  });

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "completed":
        return filteredTodos.filter((todo) => todo.complete);
      case "uncompleted":
        return filteredTodos.filter((todo) => !todo.complete);
      default:
        return filteredTodos;
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box mb="0.5rem" display="flex" justifyContent="center">
        <Button
         color="success"
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => handleFilter("all")}
          sx={{ marginRight: "0.5rem", borderRadius: "15px" }}
        >
          All: {filteredTodos.length}
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          onClick={() => handleFilter("completed")}
          sx={{ marginRight: "0.5rem", borderRadius: "15px" }}
        >
          Completed: {filteredTodos.filter((todo) => todo.complete).length} 
        </Button>
        <Button
        color="error"
          variant={filter === "uncompleted" ? "contained" : "outlined"}
          onClick={() => handleFilter("uncompleted")}
          sx={{ marginRight: "0.5rem", borderRadius: "15px" }}
        >
          Uncompleted: {filteredTodos.filter((todo) => !todo.complete).length}
        </Button>
        <TextField
          // label="Search Tasks"
          type="text"
          placeholder="Search Tasks"
          onChange={handleSearch}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
              borderWidth: "2.5px",
              borderRadius: "15px"
            },
            "& input": {
              color: "white",
              height: "10px"
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
            "& label":{
              color:"white"
            },
          }}
        />
      </Box>
      {getFilteredTodos().map(({ _id, text, complete }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={_id}
        >
          <TodosWrapper>
            <FlexBetween>
              <Box display="flex" alignItems="center">
                {complete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, color: "greenyellow" }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <CheckBox
                      fontSize="large"
                      onClick={() => completeTodo(_id)}
                      sx={{ color: "greenYellow", mr: "1rem", cursor: "pointer" }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 0.8, color: "red" }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CheckBoxOutlineBlank
                      fontSize="large"
                      onClick={() => completeTodo(_id)}
                      sx={{ color: "red", mr: "1rem", cursor: "pointer" }}
                    />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {editingTodoId === _id ? (
                    <TextField
                      label="Edit"
                      sx={{
                        width: "200%",
                        borderRadius: "0.5rem",
                        fontSize: "18px",
                        "& input": {
                          color: "white",
                        },
                      }}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateTodo(_id, editedText);
                          setEditingTodoId(null);
                        }
                      }}
                    />
                  ) : (
                    <TodoWidget text={text} />
                  )}
                </motion.div>
              </Box>
              <div style={{ display: "flex" }}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => startEditing(_id, text)}
                >
                  <EditOutlined
                    fontSize="large"
                    sx={{ margin: "1rem", cursor: "pointer", color: "white" }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <DeleteOutlineOutlined
                    fontSize="large"
                    sx={{ margin: "1rem", cursor: "pointer", color: "white" }}
                    onClick={() => deleteTodo(_id)}
                  />
                </motion.div>
              </div>
            </FlexBetween>
          </TodosWrapper>
        </div>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbarMessage}
        sx={{ width: '100%' }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        
      >
        <Alert severity={snackbarSeverity} variant="filled">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default TodosWidget;
