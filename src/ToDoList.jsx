import { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskTime, setTaskTime] = useState("");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log(storedTasks)
    if (storedTasks && JSON.parse(storedTasks).length > 0) {
      setTasks(JSON.parse(storedTasks));
    }
    requestNotificationPermission();
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  const handleTimeChange = (event) => {
    setTaskTime(event.target.value);
  }

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  const scheduleNotification = (task) => {
    if (!task.time) return;

    const now = new Date().getTime();
    const taskTime = new Date(task.time).getTime();
    const delay = taskTime - now;

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification("To-Do Reminder", {
            body: task.text,
          });
        }
      }, delay);
    }
  };

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObject = { text: newTask, time: taskTime || null };
      setTasks((t) => [...t, newTaskObject]);
      setNewTask("");
      setTaskTime("");
      scheduleNotification(newTaskObject);
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className='to-do-list'>
        <h1>To-Do-List</h1>
        <div className='bars'>
          <input
            className='inputText'
            type='text'
            placeholder='Enter a task'
            value={newTask}
            onChange={handleInputChange}
          />
          <input
            className='time'
            type='datetime-local'
            value={taskTime}
            onChange={handleTimeChange}
          />
          <button
            className='add-button'
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className='text'>{task.text}</span>
              <span className='time'>{formatTime(task.time)}</span>
              <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
              <button className='move-button' onClick={() => moveTaskUp(index)}>👆</button>
              <button className='move-button' onClick={() => moveTaskDown(index)}>👇</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default TodoList;
