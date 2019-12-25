var taskInput = document.getElementById("task-input");
var taskList = document.getElementsByTagName("ol")[0];
var todoList = document.getElementsByClassName("todo-list")[0];
var taskStatus = "all";
taskInput.addEventListener("keydown", function(event) {
	if (13 === event.keyCode) {
		addStorage();
	}
});

window.addEventListener("load", clear);

todoList.addEventListener("click", function(event) {
	var eventTarget = event.target;

	switch (eventTarget.name) {
		case "add-btn":
			addStorage();
			break;
		case "hasDone":
			changeStatus(eventTarget);
			break;
		case "all":
			taskStatus = "all";
			showTask(taskStatus);
			break;
		case "to-do":
			taskStatus = "todo";
			showTask(taskStatus);
			break;
		case "done":
			taskStatus = "done";
			showTask(taskStatus);
			break;
		default:
			break;
	}
});

function addStorage() {
	var task = taskInput.value.trim();
	if (task === "") {
		return;
	}
	if (!localStorage.getItem(task)) {
		var localValue = [localStorage.length, task, ""];
		localStorage.setItem(task, JSON.stringify(localValue));
		if (taskStatus !== "done") {
			addTask(task);
		}
	}
	taskInput.value = "";
}

function addTask(item) {
	var task = JSON.parse(localStorage.getItem(item));
	var hasChecked = task[2];
	taskList.innerHTML += `<li><input type="checkbox" name="hasDone" ${hasChecked}/>
  <span>${task[1]}</span></li>`;
}

function changeStatus(item) {
	var status = item.checked;
	var content = item.parentNode.innerText;
	var index = JSON.parse(localStorage.getItem(content));
	var localTask = [index, item.parentNode.innerText, status, true];
	localStorage.setItem(content, JSON.stringify(localTask));
	changeStyle(item);
}

function changeStyle(item) {
	if (item.checked) {
		item.parentNode.style.color = "#999999";
		item.parentNode.style.textDecorationLine = "line-through";
	} else {
		item.parentNode.style.color = "black";
		item.parentNode.style.textDecorationLine = "";
	}
}

function showTask(status) {
	var taskItem = document.getElementsByTagName("li");
	for (var li of taskItem) {
		switch (status) {
			case "all":
				li.hidden = false;
				break;
			case "todo":
				li.hidden = li.firstChild.checked;
				break;
			case "done":
				li.hidden = !li.firstChild.checked;
				break;
			default:
				break;
		}
	}
}

function clear() {
	localStorage.clear();
}


