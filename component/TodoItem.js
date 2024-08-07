import html from "../core.js";

function TodoItem({ todo, index, editIndex }) {
    return html`
        <li class="${todo.completed && 'completed'} ${editIndex === index && 'editing'}">
            <div class="view">
                <input
                    class="toggle"
                    type="checkbox"
                    ${todo.completed && 'checked'}
                    onchange="dispatch('toggle', ${index})"
                >
                <label ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
                <button 
                    class="destroy"
                    onclick="dispatch('delete', ${index})"
                >
                </button>
            </div>
            <input 
                onkeyup="event.keyCode === 13 && dispatch('saveTodo', ${index}, this.value.trim())" 
                onblur="dispatch('saveTodo', ${index}, this.value.trim())"
                class="edit" 
                value="${todo.title}">
        </li>
    `
}

export default TodoItem