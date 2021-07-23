import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import { AppContext } from './context/AppContext';
import { HOURLY_RATE } from './shared/EHourlyRate';
import { ITaskCard } from './shared/ITaskCard';
import { TASK_STATUS } from './shared/ITaskStatus';

export function App() {
  const { taskList, setTaskList } = React.useContext(AppContext);
  const [todoTasks, setTodoTasks] = useState<ITaskCard[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITaskCard[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITaskCard[]>([]);

  const filterTaskByStatus = (status: TASK_STATUS) => {
    return taskList.filter((task) => {
      return task.status === status;
    });
  };

  useEffect(() => {
    setTodoTasks(filterTaskByStatus(TASK_STATUS.TODO));
    setInProgressTasks(filterTaskByStatus(TASK_STATUS.INPROGRESS));
    setDoneTasks(filterTaskByStatus(TASK_STATUS.DONE));
  }, [taskList]);

  const onButtonClicked = (id: string, status: string) => {
    switch (status) {
      case TASK_STATUS.TODO:
        {
          const clicked: ITaskCard | any = taskList.find(
            (task: ITaskCard) => task.id === id
          );
          clicked.startTime = dayjs().add(0, 'hour');
          clicked.status = TASK_STATUS.INPROGRESS;
          setTaskList(
            taskList.map((task: ITaskCard) =>
              task.id === id ? { ...task, clicked } : task
            )
          );
        }
        break;
        case TASK_STATUS.INPROGRESS:
        {
          const clicked: ITaskCard | any = taskList.find(
            (task: ITaskCard) => task.id === id
          );
          clicked.endTime = dayjs().add(0,'h');
          clicked.status = TASK_STATUS.DONE;
          console.log(dayjs(clicked.startTime))
          console.log(dayjs(clicked.endTime))
          const totalElapsedTime = Number(dayjs(clicked.endTime).subtract(clicked.startTime).hour());
          console.log({totalElapsedTime})
          clicked.totalCost = HOURLY_RATE.DEFAULT * totalElapsedTime
          setTaskList(
            taskList.map((task: ITaskCard) =>
              task.id === id ? { ...task, clicked } : task
            )
          );
        }
        break;
      case TASK_STATUS.DONE:
        break;
    }
  };

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
                    return (
                      <TaskCard
                        onButtonClicked={onButtonClicked}
                        cardList={todoTask}
                      />
                    );
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
                  inProgressTasks.map((inProgressTaskList) => {
                    return (
                      <TaskCard
                        onButtonClicked={onButtonClicked}
                        cardList={inProgressTaskList}
                      />
                    );
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
                  doneTasks.map((doneTaskList) => {
                    return (
                      <TaskCard
                        onButtonClicked={onButtonClicked}
                        cardList={doneTaskList}
                      />
                    );
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
