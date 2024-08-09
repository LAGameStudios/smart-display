// Update the clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digital-clock').innerText = `${hours}:${minutes}:${seconds}`;
    
    const centerClock = document.querySelector('#center-clock');
    if (centerClock) {
        centerClock.innerText = `${hours}:${minutes}:${seconds}`;
    }
}

// Add a task to the list
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('todo-items');
        const newTask = document.createElement('li');
        newTask.innerText = taskText;
        newTask.onclick = function() {
            taskList.removeChild(newTask);
            saveTasks();
        };
        taskList.appendChild(newTask);
        taskInput.value = '';
        saveTasks();
        // Remove the following line to prevent auto-updating the center widget
        // updateCenterWidget('todo');
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#todo-items li')).map(task => task.innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('todo-items');
    taskList.innerHTML = '';
    tasks.forEach(taskText => {
        const task = document.createElement('li');
        task.innerText = taskText;
        task.onclick = function() {
            taskList.removeChild(task);
            saveTasks();
        };
        taskList.appendChild(task);
    });
}

// Add a link
function addLink() {
    const linkText = document.getElementById('new-link-text').value.trim();
    const linkHref = document.getElementById('new-link-href').value.trim();
    if (linkText && linkHref) {
        const linkList = document.getElementById('link-items');
        const linkItem = document.createElement('li');
        linkItem.innerHTML = `
            <a href="${linkHref}" target="_blank">${linkText}</a>
            <button onclick="removeLink(this)">Remove</button>
        `;
        linkList.appendChild(linkItem);
        saveLinks();
        updateCenterWidget('links');
    }
}

// Remove a link
function removeLink(button) {
    const linkItem = button.parentElement;
    linkItem.parentElement.removeChild(linkItem);
    saveLinks();
}

// Save links to localStorage
function saveLinks() {
    const links = Array.from(document.querySelectorAll('#link-items li')).map(linkItem => {
        const link = linkItem.querySelector('a');
        return { text: link.innerText, href: link.href };
    });
    localStorage.setItem('links', JSON.stringify(links));
}

// Load links from localStorage
function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const linkList = document.getElementById('link-items');
    linkList.innerHTML = '';
    links.forEach(linkObj => {
        const linkItem = document.createElement('li');
        linkItem.innerHTML = `
            <a href="${linkObj.href}" target="_blank">${linkObj.text}</a>
            <button onclick="removeLink(this)">Remove</button>
        `;
        linkList.appendChild(linkItem);
    });
}

// Toggle visibility of widgets
function toggleWidgets() {
    document.querySelectorAll('.widget').forEach(widget => {
        widget.classList.toggle('hidden');
    });
}

// Change the center widget
function changeCenterWidget() {
    const centerWidget = document.querySelector('.center-widget');
    if (centerWidget) centerWidget.remove();

    const selector = document.getElementById('center-widget-selector').value;
    const container = document.querySelector('.container');
    const newWidget = document.createElement('div');
    newWidget.className = 'center-widget';

    if (selector === 'links') {
        newWidget.innerHTML = `
            <h3>Links</h3>
            <ul id="link-items"></ul>
            <input type="text" id="new-link-text" placeholder="Link text">
            <input type="text" id="new-link-href" placeholder="Link URL">
            <button onclick="addLink()">Add Link</button>
        `;
        container.appendChild(newWidget);
        loadLinks();
    } else if (selector === 'spotify') {
        newWidget.innerHTML = `
            <iframe src="https://open.spotify.com/embed/album/33pt9HBdGlAbRGBHQgsZsU?utm_source=generator" width="100%" height="100%" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        `;
        container.appendChild(newWidget);
    } else if (selector === 'todo') {
        newWidget.innerHTML = `
            <h3>To-Do List</h3>
            <ul id="todo-items"></ul>
            <input type="text" id="new-task" placeholder="New task">
            <button onclick="addTask()">Add Task</button>
        `;
        container.appendChild(newWidget);
        loadTasks();
    } else if (selector === 'clock') {
        newWidget.innerHTML = `<div id="center-clock"></div>`;
        container.appendChild(newWidget);
        setInterval(updateClock, 1000);
    }
}

// Initialize
window.onload = function() {
    loadTasks();
    loadLinks();
    setInterval(updateClock, 1000);
};
