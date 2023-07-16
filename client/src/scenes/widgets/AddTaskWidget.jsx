import {
	InputBase,
	Button
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import { useState } from "react"
import { useSelector } from "react-redux"
import WidgetWrapper from "../../components/WidgetWrapper"
import { TodoContext } from "../../context/TodoContext"
import { useContext } from "react"
import {motion} from "framer-motion"

const AddTaskWidget = () => {
	const [text, setText] = useState("")
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token); // eslint-disable-next-line
	const [todos, setTodos] = useState([])
	const { toggleRefresh } = useContext(TodoContext);


	const handleTodo = async () => {
		const data = {
			userId: _id,
			text: text
		};
		const response = await fetch("http://localhost:5001/create/todo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		const todos = await response.json()
		setTodos({ todos })
		toggleRefresh();
		setText("")
	};

	const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTodo();
    }
  };
	return (
		<div
			style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
		>
			<WidgetWrapper margin="1rem" width="50%"
			>
				<FlexBetween gap="1.5rem" flexDirection="column"
					alignItems="center">
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

					<motion.div
					whileHover={{ scale: 1.1 }}
					>
					<Button
						disabled={!text}
						onClick={handleTodo}
						sx={{
							color: "white",
							backgroundColor: "purple",
							borderRadius: "3rem",
							cursor: "pointer"
						}}
					>
						ADD
					</Button>
					</motion.div>
				</FlexBetween>
			</WidgetWrapper>
		</div>
	)
}

export default AddTaskWidget;

