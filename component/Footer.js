import html from "../core.js";
import { connect } from "../store.js";

function Footer({todos, filter, filters}) {
    let numberTodoActive = todos.filter(filters.active).length;
    let numberTodoCompleted = todos.filter(filters.completed).length;
    return html`
        <footer class="footer">
            <span class="todo-count"><strong>${numberTodoActive}</strong> item left</span>
            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li>
                        <a class="${filter === type && 'selected'}" href="#" onclick="dispatch('switchFilter', '${type}')">
                            ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            <button class="clear-completed ${numberTodoCompleted === 0 && 'hidden'}" onclick="dispatch('deleteAll')">Clear completed</button>
        </footer>
    `
}

export default connect()(Footer)