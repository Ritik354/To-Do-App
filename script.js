let add = document.querySelector("#add");

let tasks = [];

/* add task */
const addTask = () => {
    let input = document.querySelector("#task");
    let text = input.value.trim();
    if(text){
        tasks.push({text: text,completed: false});
        updateTaskList();
        input.value="";
        updateStats();
    }
    
    
}
/* task delete */
const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
}
/* edit task */
const editTask = (index)=>{
    let input = document.querySelector("#task");
    input.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
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

}
const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
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