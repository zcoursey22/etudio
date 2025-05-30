import { Goal } from "../../../resources/models";
import { getGoalDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ActionConfig } from "../shared";
import { ActionMenu } from "../shared/ActionMenu";
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
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
  actions: {
    width: "1",
    render: (resource) => {
      return <ActionMenu resource={resource} actions={actions} />;
    },
  },
});
