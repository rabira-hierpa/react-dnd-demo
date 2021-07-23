import React from 'react';
import { Button } from "antd";
import dayjs from "dayjs";
import { ITaskCard } from "../shared/ITaskCard";
import { TASK_STATUS } from "../shared/ITaskStatus";
interface ITaskCardProps{
  cardList: ITaskCard;
  onButtonClicked: (id:string,status: string) => void
}
const TaskCard = (props: ITaskCardProps) => {
  const {cardList,onButtonClicked} = props

  return (
    <div className="text-left font-bold bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
      {cardList.title}
      <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
        <span className="text-xs flex items-center">
          {!cardList.startTime && cardList.status === TASK_STATUS.TODO ? (
            <Button onClick={()=> onButtonClicked(cardList.id, cardList.status)}>Start</Button>
          ) : cardList.status !== TASK_STATUS.TODO ? (
            'Time Elapsed: ' + dayjs(cardList.startTime).format('HH:mm:ss')
          ) : null}
        </span>
        <span className="text-xs flex items-center">
          {cardList.startTime && cardList.status === TASK_STATUS.INPROGRESS ? (
            <Button onClick={()=>{onButtonClicked(cardList.id,cardList.status)}}>Resolve</Button>
          ) : null}
        </span>
        <span className="text-xs flex items-center">
          {cardList.totalCost && cardList.status === TASK_STATUS.DONE
            ? 'Total Coast: $' + cardList.totalCost
            : null}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;