import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        text: {
            type:String,
            required: true
        },
        complete:{
            type: Boolean,
            default : false
        },
    }, 
    {timestamps: true}
)

const Todo = mongoose.model("Todo", TodoSchema)
export default Todo;