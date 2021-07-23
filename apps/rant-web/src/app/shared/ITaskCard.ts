import { Dayjs } from "dayjs";

export interface ITaskCard {
  id: string;
  title: string;
  status: string;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  totalCost?: number;
}