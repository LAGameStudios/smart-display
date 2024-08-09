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

    // Remove the current center widget if it exists
    if (centerWidget) {
        centerWidget.remove();
    }

    // Add the selected widget to the center
    const container = document.querySelector('.container');
    if (selector) {
        const newWidget = document.createElement('div');
        newWidget.className = 'center-widget';
        newWidget.id = `${selector}-widget`;
        
        switch (selector) {
            case 'spotify':
                newWidget.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/33pt9HBdGlAbRGBHQgsZsU?utm_source=generator" width="100%" height="280" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                break;
            case 'youtube':
                newWidget.innerHTML = `<p>YouTube widget content here.</p>`; // Replace with desired content
                break;
            case 'todo':
                newWidget.innerHTML = document.getElementById('todo-list').innerHTML;
                break;
            default:
                newWidget.innerHTML = `<p>Blank space</p>`;
                break;
        }
        container.appendChild(newWidget);
    }
}

// Initial clock update
setInterval(updateClock, 1000);
