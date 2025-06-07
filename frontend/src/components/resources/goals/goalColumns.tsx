import { Goal } from "../../../resources/models";
import { getGoalDetailPath } from "../../../routes";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, ActionMenu } from "../shared";
import { GoalStatusBadge } from "./GoalStatusBadge";

export const getGoalColumns = (
  actions: ActionConfig<Goal>[]
): ColumnMap<Goal> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getGoalDetailPath(id)}>{name}</NavLink>
    ),
  },
  status: {
    header: "Status",
    render: ({ id, status }) => <GoalStatusBadge id={id} status={status} />,
    // textAlign: "right",
  },
  actions: {
    width: "1",
    render: (resource) => {
      return <ActionMenu resource={resource} actions={actions} />;
    },
  },
});
