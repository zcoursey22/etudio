import { Source } from "../../../models";
import { getSourceDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ActionConfig, ResourceFrom } from "../shared";
import { ActionMenu } from "../shared/ActionMenu";

export const getSourceColumns = (
  actions: ActionConfig<Source>[]
): ColumnMap<Source> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getSourceDetailPath(id)}>{name}</NavLink>
    ),
  },
  parent: {
    header: "Source",
    render: ({ parent }) => (
      <ResourceFrom
        source={parent}
        emptySpanText="-"
        prefixSpanText=""
        prefixPadding="1"
      />
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
