const baseUrl = "http://localhost:3000/todos";
const baseHeader = {
  "Content-type": "application/json",
};
const $input = document.querySelector("input");
const $ul = document.querySelector("ul");
const $form = document.querySelector("form");
const $addBtn = document.querySelector("#add");

// 서버의 todo 데이터들을 가져옴
const fetchTodoList = async () => {
  try {
    const res = await fetch(baseUrl);
    const todoList = await res.json();
    return todoList;
  } catch (e) {
    console.error("데이터 가져오기 실패", e);
    return [];
  }
};

// 가져온 todo 데이터들을 화면에 그려줌
const renderTodoList = async () => {
  try {
    const todoList = await fetchTodoList();
    console.log(todoList);

    $ul.innerHTML = "";
    todoList.forEach((todo) => {
      const $todoElement = document.createElement("li");
      $todoElement.textContent = todo.todo;
      $ul.appendChild($todoElement);
    });
  } catch (e) {
    console.error("데이터 렌더링 실패", e);
  }
};
renderTodoList();
