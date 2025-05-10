import { Source } from "../../models";
import { getSourceDetailPath } from "../../routes";
import { formatDate } from "../../utils";
import { CompositionFrom } from "../compositions";
import { ColumnMap } from "../list/table/columns";
import { NavLink } from "../nav/NavLink";

export const sourceColumns: ColumnMap<Source> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getSourceDetailPath(id)}>{name}</NavLink>
    ),
  },
  parent: {
    header: "Source",
    render: ({ parent }) => (
      <CompositionFrom source={parent} emptySpanText="-" />
    ),
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
};
