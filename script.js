function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digital-clock').innerText = `${hours}:${minutes}:${seconds}`;
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('todo-items');
        const newTask = document.createElement('li');
        newTask.innerText = taskText;
        newTask.onclick = function() {
            taskList.removeChild(newTask);
        };
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

function toggleWidgets() {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        widget.classList.toggle('hidden');
    });
}

function changeCenterWidget() {
    const centerWidget = document.querySelector('.center-widget');
    const selector = document.getElementById('center-widget-selector').value;

    // Clear current center widget
    if (centerWidget) {
        centerWidget.remove();
    }

    // Add selected widget to center
    const container = document.querySelector('.container');
    if (selector) {
        const newWidget = document.createElement('div');
        newWidget.className = 'center-widget';
        newWidget.id = `${selector}-widget`;
        newWidget.innerHTML = `<p>${selector.charAt(0).toUpperCase() + selector.slice(1)} Widget</p>`;
        container.appendChild(newWidget);
    }
}

// Initial clock update
setInterval(updateClock, 1000);
