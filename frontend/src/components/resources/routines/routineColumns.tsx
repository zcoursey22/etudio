import { Routine } from "../../../models";
import { getRoutineDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";

export const routineColumns: ColumnMap<Routine> = {
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
};
