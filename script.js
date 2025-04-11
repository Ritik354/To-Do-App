/* particles */
const particle = ()=> {const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
let add = document.querySelector("#add");

let tasks = [];

/* retrieval of tasks */

document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateStats();
        updateTaskList();
    }
})
/* save task to local storage */
const saveTasks =()=> {
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
};
/* add task */
const addTask = () => {
    let input = document.querySelector("#task");
    let text = input.value.trim();
    if(text){
        tasks.push({text: text,completed: false});
        updateTaskList();
        input.value="";
        updateStats();
        saveTasks();
    }
    
    
}
/* task delete */
const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}
/* edit task */
const editTask = (index)=>{
    let input = document.querySelector("#task");
    input.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}
/* update stats */
const updateStats = () =>{
    const completedTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length
    const progress = (completedTasks/totalTasks) * 100
    const progressBar = document.querySelector(".progress");
    progressBar.style.width =  `${progress}%`;

    /* update stats */
    const stats = document.getElementById(number);
    number.innerHTML =`${completedTasks }/${ totalTasks}`
    /* particle */
    if(tasks.length && totalTasks === completedTasks){
        particle();
    }

}
const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
    
}
/* update task list */
let updateTaskList = (index) =>{
    
    
    let taskList = document.querySelector(".task-list");
    taskList.innerHTML ='';

    tasks.forEach((task,index) =>{
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? 'completed':''}">
                    <input type ="checkbox" class="checkbox" ${task.completed ? 'checked':''}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./icons/edit.png" alt="edit" onClick = "editTask(${index})">
                    <img src="./icons/delete.png" alt="delete" onClick = "deleteTask(${index})">
                </div>
        </div>
        `;
        listItem.addEventListener('change',()=> toggleTaskComplete(index));
        taskList.append(listItem);
    })
}

/* button click  */
add.addEventListener("click",(e)=>{
    /* prevents reload of page */
    e.preventDefault();

    /* call add task fn */
    addTask();
});