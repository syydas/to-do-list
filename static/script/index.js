var addBtn = document.getElementsByClassName("add-btn")[0];
var taskInput = document.getElementById("task-input");
var taskList = document.getElementsByTagName("ol")[0];

addBtn.onclick = function() {
	var task = taskInput.value.trim();
	if (task === "") {
		return;
	}
	taskInput.value = "";
	addTask(task);
};

function addTask(item) {
	var taskItem = document.createElement("li");
	taskItem.innerHTML = `<input type = "checkbox" name = "complete-task" />
  <span>${item}</span>`;
	taskList.appendChild(taskItem);
}
