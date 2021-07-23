import dayjs from 'dayjs';
import React, { createContext, useState } from 'react';
import AppContextProps from '../shared/IAppContext';
import { ITaskCard } from '../shared/ITaskCard';
import { TASK_STATUS } from '../shared/ITaskStatus';

const _taskList: ITaskCard[] = [
	{
		id: '1',
		title: 'Task 1',
		status: TASK_STATUS.TODO,
		startTime: null,
		endTime: null,
	},
	{
		id: '2',
		title: 'Task 2',
		status: TASK_STATUS.TODO,
		startTime: null,
		endTime: null,
	},
	{
		id: '3',
		title: 'Task 3',
		status: TASK_STATUS.TODO,
		startTime: null,
		endTime: null,
	},
	{
		id: '4',
		title: 'Task 4',
		status: TASK_STATUS.INPROGRESS,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
	},
	{
		id: '5',
		title: 'Task 5',
		status: TASK_STATUS.INPROGRESS,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
	},
	{
		id: '6',
		title: 'Task 6',
		status: TASK_STATUS.INPROGRESS,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
	},
	{
		id: '7',
		title: 'Task 7',
		status: TASK_STATUS.DONE,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
		totalCost: 10,
	},
	{
		id: '8',
		title: 'Task 8',
		status: TASK_STATUS.DONE,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
		totalCost: 10,
	},
	{
		id: '9',
		title: 'Task 9',
		status: TASK_STATUS.DONE,
		startTime: dayjs(),
		endTime: dayjs().add(1, 'day'),
		totalCost: 10,
	},
];

const AppContext = createContext<AppContextProps>({
	taskList: _taskList,
	setTaskList: (tasklist: ITaskCard[]) => tasklist,
});

const { Provider } = AppContext;

interface ChildProps {
	children: JSX.Element[] | JSX.Element;
}

const AppProvider = ({ children }) => {
	const [taskList, setTaskList] = useState<ITaskCard[]>(_taskList);

	return (
		<Provider
			value={{
				taskList,
				setTaskList,
			}}
		>
			{children}
		</Provider>
	);
};

export { AppContext, AppProvider };
