import storage from "./ulti/storage.js";

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

var actions = {
    'ADD': (state, args) => {
        if (args) {
            state.todos.push({title: args, completed: false});
            storage.set(state.todos)
        }
    },
    'toggle': (state, index) => {
        state.todos[index].completed = !state.todos[index].completed
        storage.set(state.todos)
    },
    'toggleAll': (state, complete) => {
        state.todos.forEach(todo => {todo.completed = complete});
        storage.set(state.todos);
    },
    'delete': ({ todos }, indexD) => {
        if (!Array.isArray(indexD))
            indexD = [indexD];
        
        console.log(indexD);

        indexD.forEach(index => todos.splice(index, 1))
        
        storage.set(todos)
    },
    'switchFilter': (state, filter) => {
        state.filter = filter
    },
    'deleteAll': (state) => {
        state.todos = state.todos.filter(state.filters.active);
        
        storage.set(state.todos)
    }, 
    'startEdit': (state, index) => {
        state.editIndex = index;
    },
    'saveTodo': (state, index, value) => {
        state.todos[index].title = value;
        
        state.editIndex = null;

        storage.set(state.todos)
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);
    return state;
}