var taskInput = document.getElementById("task-input");
var taskList = document.getElementsByTagName("ol")[0];
var todoList = document.getElementsByClassName("todo-list")[0];

taskInput.addEventListener("keydown", function(event) {
	if (event.keyCode === 13) {
		addStorage();
	}
});

todoList.addEventListener("click", function(event) {
	var eventTarget = event.target;
	switch (eventTarget.className) {
		case "add-btn":
			addStorage();
			break;
		case "hasDone":
			changeStyle(eventTarget);
			break;
		default:
			break;
	}
});

function addStorage() {
	var task = taskInput.value;
	if (task === "") {
		return;
	}
	if (!localStorage.getItem(task)) {
		var localTask = [localStorage.length, task, "", true];
		localStorage.setItem(task, JSON.stringify(localTask));
		addTask(task);
	}
	taskInput.value = "";
}

function addTask(item) {
	taskList.innerHTML += `<li><input class="hasDone" type="checkbox" name="complete-task" />
  <span>${item}</span></li>`;
}

function changeStyle(item) {
	item.parentNode.style.color = "#999999";
	item.parentNode.style.textDecorationLine = "line-through";
}
