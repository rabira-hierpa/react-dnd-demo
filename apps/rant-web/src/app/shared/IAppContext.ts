import { ITaskCard } from "./ITaskCard";

interface AppContextProps {
	taskList: ITaskCard[];
	setTaskList: (taskList: ITaskCard[]) => void;
}

export default AppContextProps