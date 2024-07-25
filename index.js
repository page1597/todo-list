const baseUrl = "http://localhost:3000/todos";
const baseHeader = {
  "Content-type": "application/json",
};
const $input = document.querySelector("input");
const $ul = document.querySelector("ul");
const $form = document.querySelector("form");
const $addBtn = document.querySelector("#add");
$addBtn.addEventListener("click", async () => {
  const newTodoText = $input.value;
  await addTodo(newTodoText);
  $input.value = "";
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
});

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
      renderTodo(todo);
    });
  } catch (e) {
    console.error("투두리스트 렌더링 실패", e);
    alert("투두리스트를 불러오지 못했습니다.");
  }
};
renderTodoList();

// 하나의 todo 항목 ui 구현
const renderTodo = (todo) => {
  // 새로 추가된 투두 그리기
  const $li = document.createElement("li");
  $li.id = todo.id;

  const $checkboxTodoContainer = document.createElement("span");

  // 체크 박스
  const $checkbox = document.createElement("input");
  $checkbox.type = "checkbox";
  $checkboxTodoContainer.appendChild($checkbox);

  const $textNode = document.createElement("span");
  $textNode.textContent = todo.todo;
  $checkboxTodoContainer.appendChild($textNode);

  $li.appendChild($checkboxTodoContainer);

  const $buttonContainer = document.createElement("span");
  // 수정 버튼
  const $editBtn = document.createElement("button");
  $editBtn.textContent = "✏️";
  $editBtn.id = "edit";

  // 삭제 버튼
  const $delBtn = document.createElement("button");
  $delBtn.textContent = "🗑️";
  $delBtn.id = "delete";

  $buttonContainer.append($editBtn, $delBtn);
  $li.append($buttonContainer);
  $ul.appendChild($li);
};

// 리스트에 새로운 todo 추가하기
const addTodo = async (newTodoText) => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: baseHeader,
      body: JSON.stringify({ todo: newTodoText, done: false }),
    });
    const resTodo = await res.json();
    renderTodo(resTodo);
  } catch (e) {
    console.log("error", e);
    console.error("데이터 추가 실패", e);
    alert("새로운 할일을 생성하지 못했습니다.", e);
  }
};
