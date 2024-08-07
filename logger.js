export default function Logger(reducer) {
    return (prevState, action, args) => {
        console.group(action);
        console.log(prevState);
        console.log(action);
        const state = reducer(prevState, action, args);
        console.log(state);
        console.groupEnd();
        return state;
    }
}