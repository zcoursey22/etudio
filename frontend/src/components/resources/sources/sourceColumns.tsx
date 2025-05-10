import { Source } from "../../../models";
import { getSourceDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ResourceFrom } from "../shared";

export const sourceColumns: ColumnMap<Source> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getSourceDetailPath(id)}>{name}</NavLink>
    ),
  },
  parent: {
    header: "Source",
    render: ({ parent }) => <ResourceFrom source={parent} emptySpanText="-" />,
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
};
