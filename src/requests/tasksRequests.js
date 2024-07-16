const tasks = [
  {
    id: 1, 
    startDate: "2024.05.13", 
    finishDate: "2024.08.05", 
    comments: ["important"], 
    description: "study js react course", 
    participants: ["myself"],
    status: "not finished"
  },
  {
    id: 2, 
    startDate: "2024.04.27", 
    finishDate: "2024.05.13", 
    comments: ["not important"], 
    description: "enjoy vacation", 
    participants: ["myself"],
    status: "finished"
  },
  {
    id: 3, 
    startDate: "2024.05.20", 
    finishDate: "2024.05.24", 
    comments: ["important"], 
    description: "do some work tasks", 
    participants: ["myself", "my colleguaes"],
    status: "finished"
  },
  {
    id: 4, 
    startDate: "2024.05.20", 
    finishDate: "2024.05.20", 
    comments: ["important"], 
    description: "go to see a doctor", 
    participants: ["myself"],
    status: "not finished"
  },
  {
    id: 5, 
    startDate: "2024.01.01", 
    finishDate: "2024.12.31", 
    comments: ["important"], 
    description: "improve web dev skills", 
    participants: ["myself"],
    status: "not finished"
  },
  {
    id: 6, 
    startDate: "2024.03.01", 
    finishDate: "2024.08.31", 
    comments: ["not important", "long-term"], 
    description: "read 'Sapiens' book", 
    participants: ["myself"],
    status: "not finished"
  }
]


function getTasks() {
  let arr = JSON.parse(window.localStorage.getItem("tasks"));
  if (!arr) {
    arr = tasks;
  }
  return arr;
}


export function getTasksFromLs() {
  let tmpTasks = getTasks();

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(tmpTasks), 1000);
  });
}


export function getTasksByCategory(category) {
  let tasksByCategory = [];
  let tmpTasks = getTasks();

  switch(category) {
    case "/opened": {
      tasksByCategory = tmpTasks.filter(task => task.status === "not finished");
      break;
    }
    case "/closed": {
      tasksByCategory = tmpTasks.filter(task => task.status === "finished");
      break;
    }
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(tasksByCategory), 1000);
  })
}


export function getTasksByTimeStatus(timeStatus) {
  let tmpTasks = getTasks();
  let tasksByTimeStatus = [];
  let date = new Date();
  date = date.toISOString().slice(0, 10).replaceAll("-", ".");

  switch (timeStatus) {
    case "running": {
      tasksByTimeStatus = tmpTasks.filter(
        task => (task.status === "not finished" && task.finishDate >= date));
      break;
    }
    case "expired": {
      tasksByTimeStatus = tmpTasks.filter(
        task => (task.status === "not finished" && task.finishDate < date));
      break;
    }
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(tasksByTimeStatus), 1000);
  })
}


export function getTasksByTitle(filterText) {
  let tmpTasks = getTasks();

  if (!filterText) return new Promise(function (resolve, reject) {
    resolve(tmpTasks);
  });

  const tasksByTitle = tmpTasks.filter(
    task => task.description.toLowerCase().includes(filterText.toLowerCase()));

  return new Promise(function (resolve, reject) {
    resolve(tasksByTitle);
  });
}


export function getTaskById(id) {
  const task = JSON.parse(window.localStorage.getItem("tasks")).find(
    task => task.id === +id);

  return new Promise(function (resolve, reject) {
    resolve(task);
  });
}


export function getTasksId() {
  let tmpTasks = getTasks();

  const ids = tmpTasks.map(task => task.id);
  return new Promise(function (resolve, reject) {
    resolve(ids);
  });
}


export async function publishTask(task) {
  delete task.intent;

  let tmpTasks = getTasks();

  tmpTasks.push(await task);
  window.localStorage.setItem("tasks", JSON.stringify(tmpTasks));

  return new Promise(function(resolve, reject) {
    resolve(task);
  });
}


export async function updateTask(task, id) {
  delete tasks.intent;

  let tmpTasks = getTasks();
  let ind = tmpTasks.findIndex(task => +task.id === +id);

  if (task.intent === "submit") {
    tmpTasks[ind] = task;
  } else {
    tmpTasks.splice(ind, 1);
  }

  window.localStorage.setItem("tasks", JSON.stringify(tmpTasks));
  
  return new Promise(function(resolve, reject) {
    resolve(task);
  });
}


export async function completeTask(id) {
  let tmpTasks = getTasks();
  let ind = tmpTasks.findIndex(task => +task.id === +id);

  tmpTasks[ind].status = "finished";
  window.localStorage.setItem("tasks", JSON.stringify(tmpTasks));

  return new Promise(function(resolve, reject) {
    resolve(tmpTasks);
  });
}