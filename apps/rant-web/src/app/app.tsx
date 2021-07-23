import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import { ITaskCard } from './shared/ITaskCard';
import { TASK_STATUS } from './shared/ITaskStatus';


const taskList = [
  {
    title: 'Task 1',
    status: TASK_STATUS.TODO,
    startTime: null,
    endTime: null,
  },
  {
    title: 'Task 2',
    status: TASK_STATUS.TODO,
    startTime: null,
    endTime: null,
  },
  {
    title: 'Task 3',
    status: TASK_STATUS.TODO,
    startTime: null,
    endTime: null,
  },
  {
    title: 'Task 4',
    status: TASK_STATUS.INPROGRESS,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
  },
  {
    title: 'Task 5',
    status: TASK_STATUS.INPROGRESS,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
  },
  {
    title: 'Task 6',
    status: TASK_STATUS.INPROGRESS,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
  },
  {
    title: 'Task 7',
    status: TASK_STATUS.DONE,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
    totalCost: 10,
  },
  {
    title: 'Task 8',
    status: TASK_STATUS.DONE,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
    totalCost: 10,
  },
  {
    title: 'Task 9',
    status: TASK_STATUS.DONE,
    startTime: dayjs(),
    endTime: dayjs().add(1, 'day'),
    totalCost: 10,
  },
];

export function App() {
  const [cardStatus, setCardStatus] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [cardList, setCardList] = useState<ITaskCard[]>([]);
  const [todoTasks, setTodoTasks] = useState<ITaskCard[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITaskCard[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITaskCard[]>([]);

  const filterTaskByStatus = (status: TASK_STATUS) => {
    return taskList.filter((task) => {
      return task.status === status;
    });
  };

  useEffect(() => {
    setCardList(taskList);
    setTodoTasks(filterTaskByStatus(TASK_STATUS.TODO));
    setInProgressTasks(filterTaskByStatus(TASK_STATUS.INPROGRESS));
    setDoneTasks(filterTaskByStatus(TASK_STATUS.DONE));
  }, []);

  return (
    <div className="p-10">
      <div className="min-h-screen">
        <h1 className="text-3xl text-center font-bold py-5 text-blue-600">
          Pixelsoft Developer Exercise
        </h1>
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-3 space-x-4">
            <div className="col-span-1 h-screen bg-gray-200">
              <h3 className="py-10 text-2xl font-bold text-gray-600">Todo</h3>
              <div className="p-2">
                {todoTasks.length ? (
                  todoTasks.map((todoTask) => {
                    return <TaskCard {...todoTask} />;
                  })
                ) : (
                  <span></span>
                )}
              </div>
            </div>
            <div className="col-span-1 h-screen bg-gray-400">
              <h3 className="py-10 text-2xl font-bold text-yellow-300">
                In Progress
              </h3>
              <div className="p-2">
                {inProgressTasks.length ? (
                  inProgressTasks.map((todoTask) => {
                    return <TaskCard {...todoTask} />;
                  })
                ) : (
                  <span></span>
                )}
              </div>
            </div>
            <div className="col-span-1 h-screen bg-gray-500">
              <h3 className="py-10 text-2xl font-bold text-green-300">Done</h3>
              <div className="p-2">
                {doneTasks.length ? (
                  doneTasks.map((todoTask) => {
                    return <TaskCard {...todoTask} />;
                  })
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-10">
        Copyright @{dayjs().format('YYYY')}
      </div>
    </div>
  );
}

export default App;
