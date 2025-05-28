import { GoalStatus } from "../../../models";

const statusLabelMap: Record<GoalStatus, string> = {
  [GoalStatus.NOT_STARTED]: "Not started",
  [GoalStatus.IN_PROGRESS]: "In progress",
  [GoalStatus.PAUSED]: "On hold",
  [GoalStatus.DONE]: "Done",
};

export const getStatusLabel = (status: GoalStatus) => {
  return statusLabelMap[status];
};
