import Todo from "../models/Todo.js";

/*Create Todo*/
export const createTodo = async (req, res) => {
  try {
    const { text } = req.body
    const createdTodo = await Todo.create({
      userId: req.user.id,
      text
    })
    res.status(201).json(createdTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/*Get Todos*/
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*Get Todo*/
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




/*Delete Todo*/
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Todos");
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/*Complete Todo*/
export const completeTodo = async(req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}


/*Edit todo*/
export const editTodo = async(req, res)=> {
  try {
    const {text } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User doesn't have permission to update Todos");
    }

    todo.text = text;
    await todo.save()
    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
}

