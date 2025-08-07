// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
  }

  // Create the addTask Function
  function addTask(taskText, save = true) {
    // If called from event listeners (button/keypress), get text from input
    if (typeof taskText !== 'string') {
      taskText = taskInput.value.trim();
    }

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Task Creation and Removal
    // Create a new li element and set its textContent
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a new button element for removing the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';
    
    // Assign onclick event to remove button
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    // Append remove button to li element, then append li to taskList
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    
    // Clear the task input field (only for new tasks, not loaded ones)
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

  // Attach Event Listeners
  // Add event listener to addButton for click events
  addButton.addEventListener('click', addTask);

  // Add event listener to taskInput for keypress events (Enter key)
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
