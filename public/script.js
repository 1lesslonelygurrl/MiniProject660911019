const todoList = document.getElementById("todoList");
const titleInput = document.getElementById("titleInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");


// โหลดรายการ Todo
async function loadTodos(done = null) {

    let url = "/api/todos";

    if (done !== null) {
        url += `?done=${done}`;
    }

    const response = await fetch(url);
    const todos = await response.json();

    displayTodos(todos);
}


// แสดง Todo บนหน้าเว็บ
function displayTodos(todos) {

    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty">
                No tasks found
            </div>
        `;
        return;
    }

    todos.forEach(todo => {

        const item = document.createElement("div");

        item.className = `todo-item ${todo.done ? "completed" : ""}`;

        item.innerHTML = `
            <div class="todo-info">
                <h3>${todo.title}</h3>
                <p>Category: ${todo.category}</p>
            </div>

            <div class="actions">

                <button
                    class="done-btn"
                    onclick="toggleTodo(${todo.id}, ${todo.done})"
                >
                    ${todo.done ? "Undo" : "Done"}
                </button>

                <button
                    class="edit-btn"
                    onclick="editTodo(${todo.id}, '${todo.title}', '${todo.category}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})"
                >
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(item);
    });
}


// เพิ่ม Todo
addBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();

    if (!title || !category) {
        alert("Please enter task and category");
        return;
    }

    await fetch("/api/todos", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            category: category
        })
    });

    titleInput.value = "";
    categoryInput.value = "";

    loadTodos();
});


// เปลี่ยนสถานะ Todo
async function toggleTodo(id, currentStatus) {

    await fetch(`/api/todos/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            done: !currentStatus
        })
    });

    loadTodos();
}


// แก้ไข Todo
async function editTodo(id, oldTitle, oldCategory) {

    const newTitle = prompt("Enter new task:", oldTitle);

    if (newTitle === null) {
        return;
    }

    const newCategory = prompt("Enter new category:", oldCategory);

    if (newCategory === null) {
        return;
    }

    await fetch(`/api/todos/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: newTitle,
            category: newCategory
        })
    });

    loadTodos();
}


// ลบ Todo
async function deleteTodo(id) {

    const confirmDelete = confirm("Delete this task?");

    if (!confirmDelete) {
        return;
    }

    await fetch(`/api/todos/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}


// โหลดข้อมูลตอนเปิดหน้า
loadTodos();