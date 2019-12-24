var taskInput = document.getElementById("task-input");
var taskList = document.getElementsByTagName("ol")[0];
var todoList = document.getElementsByClassName("todo-list")[0];

taskInput.addEventListener("keydown", function(event) {
	if (event.keyCode === 13) {
		toAddTask();
	}
});

todoList.addEventListener("click", function(event) {
	var eventTarget = event.target;
	switch (eventTarget.className) {
		case "add-btn":
			toAddTask();
			break;
		case "hasDone":
      changeStyle(eventTarget);
      break;
		default:
			break;
	}
});

function toAddTask() {
	var task = taskInput.value.trim();
	if (task === "") {
		return;
	}
	taskInput.value = "";
	addTask(task);
}

function addTask(item) {
	taskList.innerHTML += `<li><input class="hasDone" type="checkbox" name="complete-task" />
  <span>${item}</span></li>`;
}

function changeStyle(item) {
	item.parentNode.style.color = "#999999";
	item.parentNode.style.textDecorationLine = "line-through";
}
