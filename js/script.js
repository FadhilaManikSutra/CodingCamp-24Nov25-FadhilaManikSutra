// ====== ELEMENTS ======
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterSelect = document.getElementById("filterSelect");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoList = document.getElementById("todoList");

let todos = [];

// ====== RENDER TABLE ======
function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
        return;
    }

    todos.forEach((todo, index) => {
        const row = `
            <tr>
                <td>${todo.text}</td>
                <td>${todo.date}</td>

                <td>
                    <span class="status-badge ${todo.completed ? 'completed' : 'pending'}">
                        ${todo.completed ? 'Completed' : 'Pending'}
                    </span>
                </td>

                <td>
                    <button class="action-btn complete-btn" onclick="toggleStatus(${index})">✓</button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${index})">✕</button>
                </td>
            </tr>
        `;
        todoList.innerHTML += row;
    });
}

// ====== ADD TODO ======
addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }
    if (date === "") {
        alert("Please select a date!");
        return;
    }

    todos.push({
        text,
        date,
        completed: false
    });

    todoInput.value = "";
    dateInput.value = "";

    applyFilter();
});

// ====== DELETE SINGLE ======
function deleteTodo(index) {
    todos.splice(index, 1);
    applyFilter();
}

// ====== TOGGLE COMPLETE ======
function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    applyFilter();
}

// ====== DELETE ALL ======
deleteAllBtn.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
        todos = [];
        renderTodos();
    }
});

// ====== FILTER ======
filterSelect.addEventListener("change", applyFilter);

function applyFilter() {
    let filter = filterSelect.value;

    if (filter === "all") {
        renderTodos();
        return;
    }

    let filtered = todos.filter(todo =>
        filter === "completed" ? todo.completed : !todo.completed
    );

    todoList.innerHTML = "";

    if (filtered.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
        return;
    }

    filtered.forEach((todo, index) => {
        const row = `
            <tr>
                <td>${todo.text}</td>
                <td>${todo.date}</td>
                <td>
                    <span class="status-badge ${todo.completed ? 'completed' : 'pending'}">
                        ${todo.completed ? 'Completed' : 'Pending'}
                    </span>
                </td>
                <td>
                    <button class="action-btn complete-btn" onclick="toggleStatus(${index})">✓</button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${index})">✕</button>
                </td>
            </tr>
        `;
        todoList.innerHTML += row;
    });
}
