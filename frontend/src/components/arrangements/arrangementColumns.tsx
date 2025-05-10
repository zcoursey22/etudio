import { Arrangement } from "../../models";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../routes";
import { formatDate } from "../../utils";
import { CompositionFrom } from "../compositions";
import { ColumnMap } from "../list/table/columns";
import { NavLink } from "../nav/NavLink";

export const arrangementColumns: ColumnMap<Arrangement> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getArrangementDetailPath(id)}>{name}</NavLink>
    ),
  },
  composition: {
    header: "Composition",
    render: ({ composition }) => (
      <>
        <NavLink to={getCompositionDetailPath(composition.id)}>
          {composition.name}
        </NavLink>
        <CompositionFrom {...composition} prefixSpanText=" from " />
      </>
    ),
  },
  arranger: {
    header: "Arranger",
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
