import { InputBase, Button, Snackbar, Alert } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import { TodoContext } from "../../context/TodoContext";
import { useContext } from "react";
import { motion } from "framer-motion";

const AddTaskWidget = () => {
	const [text, setText] = useState("");
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token); // eslint-disable-next-line
	const [todos, setTodos] = useState([]);
	const { toggleRefresh } = useContext(TodoContext);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("")

	const handleTodo = async () => {
		const data = {
			userId: _id,
			text: text,
		};
		setSnackbarSeverity("info");
		setSnackbarMessage("Adding...");
		setSnackbarOpen(true);

		const response = await fetch(
			"https://todo-app-backend-rho.vercel.app/create/todo",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}
		);
		const todos = await response.json();
		setTodos({ todos });
		toggleRefresh();
		setSnackbarSeverity("success");
		showSnackbar("Todo Added successfully");
		setText("");
	};

	const showSnackbar = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	};

	const closeSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleTodo();
		}
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<WidgetWrapper margin="1rem" width="50%">
					<FlexBetween gap="1.5rem" flexDirection="column" alignItems="center">
						<InputBase
							type="text"
							placeholder="Add Todo"
							onChange={(e) => setText(e.target.value)}
							value={text}
							onKeyDown={handleKeyDown}
							sx={{
								width: "80%",
								backgroundColor: "#36363a",
								borderRadius: "2rem",
								padding: "1rem 2rem",
								"& input": {
									color: "white",
								},
							}}
						/>

						<motion.div whileHover={{ scale: 1.1 }}>
							<Button
								disabled={!text}
								onClick={handleTodo}
								sx={{
									color: "white",
									backgroundColor: "purple",
									borderRadius: "3rem",
									cursor: "pointer",
								}}
							>
								ADD
							</Button>
						</motion.div>
					</FlexBetween>
				</WidgetWrapper>
			</div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={closeSnackbar}
				message={snackbarMessage}
				sx={{ width: "100%" }}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert severity={snackbarSeverity} variant="filled">{snackbarMessage}</Alert>
			</Snackbar>
		</>
	);
};

export default AddTaskWidget;
