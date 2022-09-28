let todoState = {
  todoList: [],
};
let store = Redux.createStore(reducer);
console.log(store);

let ul = document.querySelector("ul");
let input = document.querySelector(".input");
let button = document.querySelector(".button");

function reducer(state = todoState, action) {
  switch (action.type) {
    case "add-todo":
      state.todoList.push(action.payload);
      return { ...state };

      break;
    case "delete-todo":
      state.todoList.splice(action.payload.index, 1);
      return { ...state };
      break;
    case "is-done":
      state.todoList[action.payload.index].isDone =
        !state.todoList[action.payload.index].isDone;
      return { ...state };
      break;
    default:
      return { ...state };
  }
}
button.addEventListener("click", (e) => {
  store.dispatch({
    type: "add-todo",
    payload: {
      name: input.value,
      isDone: false,
    },
  });
  input.value = "";
});

function handleDelete(index) {
  store.dispatch({
    type: "delete-todo",
    payload: {
      index: index,
    },
  });
}

function handleCheck(index) {
  store.dispatch({
    type: "is-done",
    payload: {
      index: index,
    },
  });
}

function displayTodos() {
  console.log("hello");
  ul.innerHTML = "";
  store.getState().todoList.forEach((todo, index) => {
    console.log(todo);
    let li = document.createElement("li");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todo.isDone;
    check.addEventListener("click", () => handleCheck(index));
    let p = document.createElement("p");
    p.innerText = todo.name;
    let btn = document.createElement("span");
    btn.innerText = "Delete";
    btn.addEventListener("click", () => {
      handleDelete(index);
    });
    li.append(check, p, btn);
    ul.append(li);
  });
  input.innerText = "";
}

store.subscribe(displayTodos);
