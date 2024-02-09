let submit = document.querySelector('.add');
let input = document.querySelector(".task");
let list = document.querySelector(".tasks");

let tasks = [];

if (localStorage.getItem("tasks")){
    let localTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = localTasks;
}
else {
    tasks = [];
}

view();

submit.addEventListener("click", function() {
    if (input.value !== "") {
        addTasks(input.value);
        input.value = "";
    }
});

function addTasks(taskTitle) {
    const task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
    }
    tasks.push(task);
    addToPage(tasks);
    store(tasks);
}

function addToPage(tasks){
    list.innerHTML = '';
    tasks.forEach(task => {
        let div = document.createElement("div");
        let button = document.createElement("button");

        button.setAttribute("type", "submit");
        button.setAttribute("class", "remove");
        div.setAttribute("class", "item");
        div.setAttribute("taskId", task.id);

        if (task.completed){
            div.className = "item checked";
        }

        let iconClass = task.completed ? "fa-solid fa-square-check" : "fa-regular fa-square-check";
        div.innerHTML = `<i class="${iconClass}" style="color: #B197FC;"></i> ${task.title}`;
        div.appendChild(button);
        button.innerHTML = '<i class="fa-solid fa-trash" style="color: #ff3838;"></i>';
        list.appendChild(div);
        
        div.addEventListener('click', function(){
            this.classList.toggle("checked");
            task.completed = !task.completed;
            let icon = this.querySelector('i');
            icon.className = task.completed ? "fa-solid fa-square-check" : "fa-regular fa-square-check";
            store(tasks);
        });
        button.addEventListener("click", function() {
            let id = this.parentElement.getAttribute("taskId");
            wipe(id);
            this.parentElement.remove();
        });
    });
}

function store(tasks){
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function view(){
    let data = localStorage.getItem("tasks");
    if (data){
        let missions = JSON.parse(data);
        addToPage(missions);
    }
}

function wipe(taskId) {
    tasks = tasks.filter((task) => task.id != taskId);
    store(tasks);
    addToPage(tasks);
}
