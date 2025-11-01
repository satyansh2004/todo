let btn = document.getElementById("btn")
let completed = document.getElementById("completed")
let clearAll = document.getElementById("clear")
let pending = document.getElementById("pending")
let all = document.getElementById("all")
let display = document.getElementById("display")
let task = document.getElementById("task")


let taskArray = JSON.parse(localStorage.getItem("Task")) || [];
let doneArray = JSON.parse(localStorage.getItem("Done")) || [];
let allArray = JSON.parse(localStorage.getItem("All")) || [];

const render = () => {
    let saved = JSON.parse(localStorage.getItem("Task")) || [];
    let element = "";
    for (let i = 0; i <= saved.length - 1; i++) {
        element += `<li><span>${saved[i]}</span><span class="done">Done</span></li>`;
    }

    display.innerHTML = element;
}

const main = () => {
    taskArray.push(task.value);
    allArray.push(task.value);

    if (task.value != "") {
        localStorage.setItem(`All`, JSON.stringify(allArray))
        localStorage.setItem(`Task`, JSON.stringify(taskArray))
    }
    render()
}

btn.addEventListener("click", () => {
    main()
})

window.addEventListener("load", render);

display.addEventListener("click", (e) => {
    let done = e.target.parentNode.children[0].innerHTML;

    let taskArray = JSON.parse(localStorage.getItem("Task")) || [];
    let doneArray = JSON.parse(localStorage.getItem("Done")) || [];


    if (e.target.classList.contains("done")) {
        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i] == done) {

                doneArray.push(taskArray[i]);

                taskArray.splice(i, 1);

                localStorage.setItem("Task", JSON.stringify(taskArray));
                localStorage.setItem("Done", JSON.stringify(doneArray));

                e.target.parentNode.remove()
                break;
            }
        }
    }
    if (e.target.classList.contains("remove")) {
        for (let i = 0; i < doneArray.length; i++) {
            if (doneArray[i] == done) {
                console.log(1)
                doneArray.splice(i, 1);

                localStorage.setItem("Done", JSON.stringify(doneArray));

                e.target.parentNode.remove();
                break;
            }
        }
    }
})

completed.addEventListener("click", () => {
    let completedTasks = JSON.parse(localStorage.getItem("Done")) || [];
    let element = "";
    for (let i = 0; i <= completedTasks.length - 1; i++) {
        element += `<li><span>${completedTasks[i]}</span><span class="remove">Remove</span></li>`;
    }

    display.innerHTML = element;
})

all.addEventListener("click", () => {
    let saved = JSON.parse(localStorage.getItem("All")) || [];
    let element = "";
    for (let i = 0; i <= saved.length - 1; i++) {
        element += `<li><span>${saved[i]}</span></li>`;
    }

    display.innerHTML = element;
})

pending.addEventListener("click", render);

clearAll.addEventListener("click", () => {
    localStorage.setItem("Task", JSON.stringify(taskArray));
    localStorage.setItem("Done", JSON.stringify(doneArray));
    localStorage.setItem(`All`, JSON.stringify(taskArray));

    localStorage.clear();
    display.innerHTML = "";
});