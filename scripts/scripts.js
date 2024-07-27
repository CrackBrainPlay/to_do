let taskList = [
    // 'Задача 1',
    // 'Задача 2',
    // 'Задача 3',
]

let my_li = (newLi = null);

// localStorage.setItem('taskListStore', JSON.stringify(['Задача 1', 'Задача 2', 'Задача 3']));

// let taskList = JSON.parse(localStorage.getItem('taskListStore'));

const updateStore = (text) => {
    if (localStorage.getItem('taskListStore'))
        taskList = JSON.parse(localStorage.getItem('taskListStore'));
    // let addRow = { index: text }
    let addRow = text
    taskList.push(addRow);
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
}

const updateTask = () => {
    let ul = document.getElementById('task_list');
    ul.innerHTML = '';
    // localStorage.setItem('taskListStore', JSON.stringify(taskList));
    refreshTaskList()
}

const addTask = (value) => {
    // taskList.push(value)
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
    // button.onclick = function () { removeTask(i) }
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
        let newSpan = document.createElement(`span`)
        newSpan.classList.add('text');
        newSpan.id = i;
        newSpan.innerHTML = `${taskList[i]}`
        newLi.append(newSpan);
        // createButton(buttonDelete, i, newLi, deleteTask)
        createButtonDelete(i, newLi)
        createButtonRemove(i, newLi)
        createButtonComplite(i, newLi)
        ul.appendChild(newLi);
    }
}

const deleteTask = (id) => {
    taskList.splice(id, 1);
    localStorage.setItem('taskListStore', JSON.stringify(taskList));
    updateTask()
}


// const compliteTask = (id) => {

// }

// const removeTask = (id) => {

// }

