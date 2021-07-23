import { Button, Form, Input } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import { AppContext } from './context/AppContext';
import { HOURLY_RATE } from './shared/EHourlyRate';
import { ITaskCard } from './shared/ITaskCard';
import { TASK_STATUS } from './shared/ITaskStatus';

export function App() {
	const [newTaskForm] = Form.useForm();
	const { taskList, setTaskList } = React.useContext(AppContext);
	const [todoTasks, setTodoTasks] = useState<ITaskCard[]>([]);
	const [inProgressTasks, setInProgressTasks] = useState<ITaskCard[]>([]);
	const [doneTasks, setDoneTasks] = useState<ITaskCard[]>([]);
	const [showNewTaskButton, setShowNewTaskButton] = useState<boolean>(true);
	const [showAddNewTaskForm, setShowAddNewTaskForm] = useState<boolean>(
		false
	);

	const { validateFields } = newTaskForm;
	const handleNewTask = async (values: any) => {
		await validateFields()
			.then((_newTaskForm) => {
				try {
					console.log({ _newTaskForm });
					setShowAddNewTaskForm(false);
					setShowNewTaskButton(true);
					newTaskForm.resetFields();
					const _newTask: ITaskCard = {
						id: String(taskList.length + 1),
						title: _newTaskForm.title,
						status: TASK_STATUS.TODO,
						startTime: null,
						endTime: null,
						totalCost: 0,
					};
					setTaskList([...taskList, _newTask]);
				} catch (error) {
					console.error(error);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleShowNewTask = () => {
		setShowAddNewTaskForm(true);
		setShowNewTaskButton(false);
	};

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
					clicked.endTime = dayjs().add(0, 'h');
					clicked.status = TASK_STATUS.DONE;
					const totalElapsedTime = Number(
						dayjs(clicked.endTime)
							.subtract(clicked.startTime)
							.hour()
					);
					clicked.totalCost = HOURLY_RATE.DEFAULT * totalElapsedTime;
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
							<h3 className="py-10 text-2xl font-bold text-gray-600">
								Todo
							</h3>
							<div className="p-2">
								{todoTasks.length ? (
									todoTasks.map((todoTask, idx) => {
										return (
											<TaskCard
												key={idx}
												onButtonClicked={
													onButtonClicked
												}
												cardList={todoTask}
											/>
										);
									})
								) : (
									<span></span>
								)}
								{showNewTaskButton ? (
									<Button className="m-5" type="primary" onClick={handleShowNewTask}>
										New Task
									</Button>
								) : null}
								<div className="p-2">
									{showAddNewTaskForm ? (
										<Form
											name="taskForm"
											form={newTaskForm}
											onFinish={handleNewTask}
										>
											<Form.Item label="">
												<Form.Item
													name="title"
													rules={[
														{
															required: true,
															message:
																'Please enter a title',
														},
													]}
												>
													<Input placeholder="Add New Task" />
												</Form.Item>
											</Form.Item>
										</Form>
									) : null}
								</div>
							</div>
						</div>
						<div className="col-span-1 h-screen bg-gray-400">
							<h3 className="py-10 text-2xl font-bold text-yellow-300">
								In Progress
							</h3>
							<div className="p-2">
								{inProgressTasks.length ? (
									inProgressTasks.map(
										(inProgressTaskList, idx) => {
											return (
												<TaskCard
													key={idx}
													onButtonClicked={
														onButtonClicked
													}
													cardList={
														inProgressTaskList
													}
												/>
											);
										}
									)
								) : (
									<span></span>
								)}
							</div>
						</div>
						<div className="col-span-1 h-screen bg-gray-500">
							<h3 className="py-10 text-2xl font-bold text-green-300">
								Done
							</h3>
							<div className="p-2">
								{doneTasks.length ? (
									doneTasks.map((doneTaskList, idx) => {
										return (
											<TaskCard
												key={idx}
												onButtonClicked={
													onButtonClicked
												}
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
