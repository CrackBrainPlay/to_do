let taskList = []
let my_li = (newLi = null);

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

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

const removeStore = (inputId, id) => {
    let value = document.getElementById(inputId);
    console.log(value)
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

let createButton = (type, id, textContent, newLi, foo) => {
    let button = document.createElement('button');
    button.type = type;
    button.classList.add('delete_btn');
    button.id = id;
    button.textContent = textContent;
    button.onclick = function () { foo(id) }
    newLi.append(button);
}

let createButtonRemove = (id, newLi) => {
    createButton('buttonRemove', id, 'Изменить', newLi, removeTask)
}

const createButtonDelete = (id, newLi) => {
    createButton('buttonDelete', id, 'Удалить', newLi, deleteTask)
}
const createButtonComplite = (id, newLi) => {
    createButton('buttonComplite', id, 'Завершить', newLi, compliteTask)
}

const createButtonSave = (id, newLi, inputId) => {
    let buttonSave = document.createElement('button');
    buttonSave.type = 'buttonSave';
    buttonSave.classList.add('delete_btn');
    buttonSave.id = id;
    buttonSave.textContent = 'Сохранить';
    buttonSave.onclick = function () {
        removeStore(inputId, id)
        saveTask(id)
    }
    newLi.append(buttonSave);
}

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
