import React from 'react';
import { Button } from "antd";
import dayjs from "dayjs";
import { ITaskCard } from "../shared/ITaskCard";
import { TASK_STATUS } from "../shared/ITaskStatus";

const TaskCard = (props: ITaskCard) => {
  return (
    <div className="text-left font-bold bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
      {props.title}
      <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
        <span className="text-xs flex items-center">
          {!props.startTime && props.status === TASK_STATUS.TODO ? (
            <Button>Start</Button>
          ) : props.status !== TASK_STATUS.TODO ? (
            'Time Elapsed: ' + dayjs(props.startTime).format('HH:mm:ss')
          ) : null}
        </span>
        <span className="text-xs flex items-center">
          {props.startTime && props.status === TASK_STATUS.INPROGRESS ? (
            <Button>Resolve</Button>
          ) : null}
        </span>
        <span className="text-xs flex items-center">
          {props.totalCost && props.status === TASK_STATUS.DONE
            ? 'Total Coast: $' + props.totalCost
            : null}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;