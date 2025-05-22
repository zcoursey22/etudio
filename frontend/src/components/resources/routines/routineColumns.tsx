import { Routine } from "../../../models";
import { getRoutineDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ActionConfig } from "../shared";
import { ActionMenu } from "../shared/ActionMenu";

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
