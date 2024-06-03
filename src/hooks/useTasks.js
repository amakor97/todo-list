export default function useTasks() {
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
      status: "not finished"
    },
    {
      id: 4, 
      startDate: "2024.05.20", 
      finishDate: "2024.05.20", 
      comments: ["important"], 
      description: "go to see a doctor", 
      participants: ["myself"],
      status: "finished"
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
  ];

  const filterText = "New tasks";
  const error = undefined;

  return {
    error,
    filterText,
    tasks
  }
}