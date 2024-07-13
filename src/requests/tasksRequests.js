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

export function getTasks() {
  return new Promise(function(resolve, reject) {
      setTimeout(() => resolve(tasks), 1000);
  });
}


export function getTasksFromLs() {
  let wTasks = JSON.parse(window.localStorage.getItem("tasks"));
  console.log("wtasks");
  console.log(wTasks);
  if (!wTasks) {
    wTasks = tasks;
  }
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(wTasks), 1000);
  });
}


export function getImportantOpenedTasksFromLs() {
  let wTasks = JSON.parse(window.localStorage.getItem("tasks"));
  if (!wTasks) {
    wTasks = tasks;
  }
  const openedImpTasks = tasks.filter(task => task.comments.includes("important") && task.status === "not finished");
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(openedImpTasks), 1000);
  });
}


export function getTasksByCategory(category) {
  let tasksByCategory = [];

  switch(category) {
    case "/opened": {
      tasksByCategory = tasks.filter(task => task.status === "not finished");
      break;
    }
    case "/closed": {
      tasksByCategory = tasks.filter(task => task.status === "finished");
      break;
    }
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(tasksByCategory), 1000);
  })
}

export function getTasksByTimeStatus(timeStatus) {
  let tasksByTimeStatus = [];
  let date = new Date();
  date = date.toISOString().slice(0, 10).replaceAll("-", ".");


  switch (timeStatus) {
    case "running": {
      tasksByTimeStatus = tasks.filter(task => (task.status === "not finished" && task.finishDate >= date));
      break;
    }
    case "expired": {
      tasksByTimeStatus = tasks.filter(task => (task.status === "not finished" && task.finishDate < date));
      break;
    }
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(tasksByTimeStatus), 1000);
  })
}


export function getTasksByTitle(filterText) {
  if (!filterText) return new Promise(function (resolve, reject) {
    resolve(tasks);
  });

  const tasksByTitle = tasks.filter(task => 
    task.description.toLowerCase().includes(filterText.toLowerCase()));

  return new Promise(function (resolve, reject) {
    resolve(tasksByTitle);
  });
}


export function getTaskById(id) {
  console.log(id);

  //const task = tasks.find(task => task.id === +id);
  
  //const tasks2 = JSON.parse(window.localStorage.getItem("tasks"));
  //console.log(tasks2);
  //tasks2.forEach(task => console.log(task.id));

  const task = JSON.parse(window.localStorage.getItem("tasks")).find(task => task.id === +id);

  console.log(task);

  return new Promise(function (resolve, reject) {
    resolve(task);
  });
}


export function getTasksId() {
  let wTasks = JSON.parse(window.localStorage.getItem("tasks"));
  console.log("wtasks");
  console.log(wTasks);
  if (!wTasks) {
    wTasks = tasks;
  }


  const ids = wTasks.map(task => task.id);
  console.log({ids});
  return new Promise(function (resolve, reject) {
    resolve(ids);
  });
}


export async function publishTask(task) {
  console.log(tasks);
  console.log(await task);


  let wTasks = JSON.parse(window.localStorage.getItem("tasks"));
  console.log("wtasks");
  console.log(wTasks);
  if (!wTasks) {
    wTasks = tasks;
  }


  let t2 = await task;

  wTasks.push(t2);
  console.log("new:");
  console.log(wTasks);
  window.localStorage.setItem("tasks", JSON.stringify(wTasks));

  return new Promise(function(resolve, reject) {
    resolve(task);
  });
}


export async function updateTask(task, id) {
  console.log(task, id);

  console.log(tasks);

  let wTasks = JSON.parse(window.localStorage.getItem("tasks"));
  console.log("wtasks");
  console.log(wTasks);
  if (!wTasks) {
    wTasks = tasks;
  }

  let ind = wTasks.findIndex(task => +task.id === +id);

  wTasks[ind] = task;

  console.log(tasks);


  window.localStorage.setItem("tasks", JSON.stringify(wTasks));

  return new Promise(function(resolve, reject) {
    resolve(task);
  });

}