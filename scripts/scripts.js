let taskList = []
let my_li = (newLi = null);



const updateStore = (text) => {
    if (localStorage.getItem('taskListStore'))
        taskList = JSON.parse(localStorage.getItem('taskListStore'));

    let addRow = [text, false, false]
    taskList.push(addRow);
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
}

const reloadStore = () => {
    if (localStorage.getItem('taskListStore'))
        taskList = JSON.parse(localStorage.getItem('taskListStore'));
    updateTask()
}

const removeStore = (text, inputId, id) => {
    let value = document.getElementById(inputId);
    console.log(value.value)
    let message = value.value
    if (localStorage.getItem('taskListStore'))
        taskList = JSON.parse(localStorage.getItem('taskListStore'));

    let addRow = [message, false, false]
    taskList[id] = (addRow);
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
}

const updateTask = () => {
    let ul = document.getElementById('task_list');
    ul.innerHTML = '';
    refreshTaskList()
}

const addTask = (value) => {
    updateStore(value)
    updateTask()
}

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let createButtonRemove = (id, newLi) => {
    let buttonRemove = document.createElement('button');
    buttonRemove.type = 'buttonRemove';
    buttonRemove.classList.add('delete_btn');
    buttonRemove.id = id;
    buttonRemove.textContent = 'Изменить';
    buttonRemove.onclick = function () { removeTask(id) }
    newLi.append(buttonRemove);
}

const createButtonDelete = (id, newLi) => {
    let buttonDelete = document.createElement('button');
    buttonDelete.type = 'buttonDelete';
    buttonDelete.classList.add('delete_btn');
    buttonDelete.id = id;
    buttonDelete.textContent = 'Удалить';
    buttonDelete.onclick = function () { deleteTask(id) }
    newLi.append(buttonDelete);
}
const createButtonComplite = (id, newLi) => {
    let buttonComplite = document.createElement('button');
    buttonComplite.type = 'buttonComplite';
    buttonComplite.classList.add('delete_btn');
    buttonComplite.id = id;
    buttonComplite.textContent = 'Завершить';
    buttonComplite.onclick = function () { compliteTask(id) }
    newLi.append(buttonComplite);
}
const createButtonSave = (id, newLi, inputId) => {
    let buttonSave = document.createElement('button');
    buttonSave.type = 'buttonSave';
    buttonSave.classList.add('delete_btn');
    buttonSave.id = id;
    buttonSave.textContent = 'Сохранить';
    buttonSave.onclick = function () {
        removeStore(inputId.value, inputId, id)
        saveTask(id)
        // updateTask()
    }
    newLi.append(buttonSave);
}

// let createButton = (type, id, newLi, onclick) => {
//     let button = document.createElement('button');
//     type.type = 'buttonRemove';
//     type.classList.add('delete_btn');
//     type.id = id;
//     type.textContent = 'Изменить';
//     type.onclick = function () { onclick(i) }
//     newLi.append(button);
// }


const refreshTaskList = () => {

    for (let i = 0; i < taskList.length; i++) {
        let ul = document.querySelector('#task_list');
        let newLi = document.createElement(`li`)
        newLi.classList.add('task_item');
        newLi.id = i;
        if (!taskList[i][1]) {
            let newSpan = document.createElement(`span`)
            if (taskList[i][2]) {
                newSpan.classList.add('complite');
            } else {
                newSpan.classList.add('text');
            }
            newSpan.id = i;
            newSpan.innerHTML = `${taskList[i][0]}`
            newLi.append(newSpan);
        }
        if (taskList[i][1]) {
            let newInput = document.createElement(`input`)
            newInput.type = 'input';
            newInput.id = `input_${i}`;
            newInput.placeholder = taskList[i][0]
            newLi.append(newInput);
        }

        // createButton(buttonDelete, i, newLi, deleteTask)
        if (taskList[i][2]) {
            createButtonDelete(i, newLi)
        }
        if (taskList[i][1]) {
            let inputId = `input_${i}`
            createButtonSave(i, newLi, inputId)
            createButtonDelete(i, newLi)
        }

        if (!taskList[i][1] && !taskList[i][2]) {
            createButtonDelete(i, newLi)
            createButtonRemove(i, newLi)
            createButtonComplite(i, newLi)
        }

        ul.appendChild(newLi);
    }
}

const deleteTask = (id) => {
    taskList.splice(id, 1);
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
    updateTask()
}

const compliteTask = (id) => {
    taskList[id][2] = true;
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
    updateTask()
}

const removeTask = (id) => {
    taskList[id][1] = true;
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
    updateTask()
}
const saveTask = (id) => {
    taskList[id][1] = false;
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
    updateTask()
}

document.addEventListener('DOMContentLoaded', () => updateTask());
window.onload = () => updateTask();
window.addEventListener('load', () => {
    updateTask();
});
