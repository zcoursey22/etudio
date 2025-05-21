import { Goal } from "../../../models";
import { getGoalDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ActionMenu } from "../shared/ActionMenu";
import { goalActions } from "./goalActions";

export const goalColumns: ColumnMap<Goal> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getGoalDetailPath(id)}>{name}</NavLink>
    ),
  },
  description: {
    header: "Description",
    render: ({ description }) => <>{description}</>,
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
  actions: {
    width: "1",
    render: (resource) => (
      <ActionMenu resource={resource} actionMap={goalActions} />
    ),
  },
};
