document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
  }

  // Function to add task with optional save parameter
  function addTask(taskText, save = true) {
    // If called from input, get the text from input field
    if (typeof taskText !== 'string') {
      taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    
    // Only clear input if this is a new task being added (not loaded from storage)
    if (save) {
      taskInput.value = '';
      saveTaskToStorage(taskText);
    }
  }

  // Function to save task to Local Storage
  function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Function to remove task from Local Storage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Load existing tasks when page loads
  loadTasks();

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
