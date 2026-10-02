const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

let todos = [
    {
        id: 1,
        title: "ทำ Mini Project",
        category: "Study",
        done: false
    },
    {
        id: 2,
        title: "ส่งงานอาจารย์",
        category: "Study",
        done: false
    }
];

// GET: ดูรายการทั้งหมด + filter
app.get("/api/todos", (req, res) => {
    let result = [...todos];

    if (req.query.done !== undefined) {
        const done = req.query.done === "true";
        result = result.filter(todo => todo.done === done);
    }

    if (req.query.category) {
        result = result.filter(
            todo => todo.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    res.json(result);
});

// GET: ดูรายการตาม ID
app.get("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.json(todo);
});

// POST: เพิ่มรายการ
app.post("/api/todos", (req, res) => {
    const { title, category } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            message: "title and category are required"
        });
    }

    const newTodo = {
        id: todos.length > 0
            ? Math.max(...todos.map(todo => todo.id)) + 1
            : 1,
        title: title,
        category: category,
        done: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// PATCH: แก้ไขรายการ
app.patch("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (req.body.title !== undefined) {
        todo.title = req.body.title;
    }

    if (req.body.category !== undefined) {
        todo.category = req.body.category;
    }

    if (req.body.done !== undefined) {
        todo.done = req.body.done;
    }

    res.json(todo);
});

// DELETE: ลบรายการ
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(index, 1);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});