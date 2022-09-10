'use strict'

// Находим элементы на странице 

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


let tasks = [];

if(localStorage.getItem('tasks')) {

    tasks = JSON.parse(localStorage.getItem('tasks'))

}

tasks.forEach(function(task) {

    
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    //Формируем разметку для новой задачи
    
    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
`
 // Добавляем задачу на страницу 

    tasksList.insertAdjacentHTML('beforeend', taskHTML)


})

form.addEventListener('submit', addTask)

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)





function addTask(event) {
    event.preventDefault();
    
    // Достаем текст из данного инпута
    const taskText = taskInput.value
    
    //Описываем задачу ввиде объекта

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)


    saveToLocalStorage();

    //Формируем cssClass

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

    //Формируем разметку для новой задачи
    
    const taskHTML = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
`
 // Добавляем задачу на страницу 

    tasksList.insertAdjacentHTML('beforeend', taskHTML)

    // Очистить поле ввода

    taskInput.value = ""
    taskInput.focus()

    // Скрыть список задач если в нем больше 1ого элемента

    if(tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }


}

function deleteTask(event) {
    
    if(event.target.dataset.action === 'delete') {
        
       const parenNode = event.target.closest('.list-group-item');

       //Определяем ID задачи

       const id = parenNode.id
       
       //Находим индекс задачи в массиве и удаляем его

       const index = tasks.findIndex( function(task) {
            if(task.id == id) {
                return true
            }
       })


       tasks.splice(index, 1)

       saveToLocalStorage();

       parenNode.remove()
    }

        // Скрыть список задач если в нем больше 1ого элемента

        if(tasksList.children.length === 1) {
            emptyList.classList.remove('none')
        }
    

}

function doneTask(event) {


    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');
    
    const id = parentNode.id

    const task = tasks.find(function (task) {
        if (task.id == id) {
            return true
        }
    })

    task.done = !task.done

    saveToLocalStorage();
 
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')

}

function saveToLocalStorage() {

    localStorage.setItem('tasks', JSON.stringify(tasks))
}