import { Composition } from "../../../models";
import {
  getArtistDetailPath,
  getCompositionDetailPath,
  ROUTE_SEGMENTS,
} from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ResourceFrom } from "../../resources/shared";
import { ActionMenu } from "../shared/ActionMenu";
import { compositionActions } from "./compositionActions";

export const compositionColumns: ColumnMap<Composition> = {
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
    render: (resource) => (
      <ActionMenu resource={resource} actionMap={compositionActions} />
    ),
  },
};
