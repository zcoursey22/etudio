import { Composition } from "../../../models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { ResourceFrom } from "../../resources/shared";

export const compositionColumns: ColumnMap<Composition> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getCompositionDetailPath(id)}>{name}</NavLink>
    ),
  },
  from: {
    header: "From",
    render: (composition) => (
      <ResourceFrom {...composition} emptySpanText="-" />
    ),
  },
  composer: {
    header: "Composer",
    render: ({ artist }) => (
      <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
    ),
  },
  lastModified: {
    header: "Last modified",
    render: ({ lastModified }) => <>{formatDate(lastModified)}</>,
    textAlign: "right",
  },
};
