import { Routine } from "../../../resources/models";
import { getRoutineDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, ActionMenu } from "../shared";

export const getRoutineColumns = (
  actions: ActionConfig<Routine>[]
): ColumnMap<Routine> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getRoutineDetailPath(id)}>{name}</NavLink>
    ),
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
  actions: {
    width: "1",
    render: (resource) => <ActionMenu resource={resource} actions={actions} />,
  },
});
