import { Composition } from "../../../resources/models";
import {
  getArtistDetailPath,
  getCompositionDetailPath,
  ROUTE_SEGMENTS,
} from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ActionConfig, ResourceFrom } from "../../resources/shared";
import { ActionMenu } from "../shared/ActionMenu";

export const getCompositionColumns = (
  actions: ActionConfig<Composition>[]
): ColumnMap<Composition> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={`${getCompositionDetailPath(id)}`}>{name}</NavLink>
    ),
  },
  from: {
    header: "From",
    render: (composition) => (
      <ResourceFrom
        {...composition}
        emptySpanText="-"
        prefixSpanText=""
        prefixPadding="1"
      />
    ),
  },
  composer: {
    header: "Composer",
    render: ({ artist }) => (
      <NavLink
        to={`${getArtistDetailPath(artist.id)}/${ROUTE_SEGMENTS.COMPOSITIONS}`}
      >
        {artist.name}
      </NavLink>
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
