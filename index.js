let tasks = [];
let tasksHTML = '';

function addTasksHTML(task){
    tasksHTML += `
        <div class="task">
            <div class="task-label">
                ${task}
            </div>
            <button class="task-delete-button">
                Delete
            </button>
        </div>
    `;
    document.querySelector('.task-list').innerHTML = tasksHTML; 
}

function renderTasks(){
    tasksHTML = '';
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTasksHTML(task);
    });
    let buttons = document.querySelectorAll('.task-delete-button');
    buttons.forEach((btn, i) =>{
        btn.addEventListener('click', () =>{
            deleteTask(i);
        });
    })
}

function addClick(){
    let taskBox = document.querySelector('.task-bar');
    let newTask = taskBox.value.trim(); // Trim any extra spaces
    if (newTask !== '') { // Ensure no empty tasks are added
        tasks.push(newTask);
        addTasksHTML(newTask);
        saveToStorage();
        taskBox.value = ''; // Clear input after adding task
    }
}

function saveToStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(i){
    tasks.splice(i, 1);
    saveToStorage();
    renderTasks();
}


document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('.add-button');
    button.addEventListener("click", addClick);  
    renderTasks(); // Load tasks from localStorage when the page loads  

    console.log('js loaded');
});
