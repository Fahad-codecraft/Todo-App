import { Typography } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";


const TodoWidget = ({
	text,
}) => {
	return (
		<WidgetWrapper>
			<Typography
				fontWeight="400" fontSize="18px" sx={{ color: "#ffffff", cursor: "pointer" }}
			>
				{text}
			</Typography>
		</WidgetWrapper>
	)
}

export default TodoWidget