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
		case "has-done":
			changeStyle(eventTarget);
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
		case "delete-btn":
			deleteTask(eventTarget);
			break;
		default:
			break;
	}
});

function addStorage() {
	var task = taskInput.value.trim();
	var index = localStorage.length;
	if (task === "") {
		return;
	}
	if (!localStorage.getItem(task)) {
		if (taskStatus !== "done") {
			var localTask = [index, task, ""];
			localStorage.setItem(task, JSON.stringify(localTask));
			addTask(task);
		}
	}
	taskInput.value = "";
}

function addTask(item) {
	var task = JSON.parse(localStorage.getItem(item));
	var hasChecked = task[2];
	taskList.innerHTML += `<li><input type="checkbox" name="has-done" ${hasChecked}/>
  <span>${task[1]}</span>
  <button class="delete-btn" name="delete-btn">×</button></li>`;
}

function changeStatus(item) {
	var task = item.parentNode.innerText;
	var status = item.checked;
	var index = JSON.parse(localStorage.getItem(task));
	var localTask = [index, task, status];
	localStorage.setItem(task, JSON.stringify(localTask));
}

function changeStyle(item) {
	var taskChange = item.parentNode;
	taskChange.setAttribute("class", item.checked ? "has-done" : "");
}

function showTask(status) {
	var taskItem = document.getElementsByTagName("li");
	for (var li of taskItem) {
		switch (status) {
			case "all":
				li.hidden = false;
				break;
			case "todo":
				li.hidden = li.className==="has-done";
				break;
			case "done":
				li.hidden = li.className==="";
				break;
			default:
				break;
		}
	}
}

function deleteTask(item) {
	if (confirm("是否删除该TODO")) {
		var taskDelete = item.parentNode;
		taskList.removeChild(taskDelete);
	}
}

function clear() {
	localStorage.clear();
}
