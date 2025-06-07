import { ROUTE_SEGMENTS } from "../../../constants";
import { Source } from "../../../resources/models";
import { getArtistDetailPath, getSourceDetailPath } from "../../../routes";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, ResourceFrom, ActionMenu } from "../shared";

export const getSourceColumns = (
  actions: ActionConfig<Source>[]
): ColumnMap<Source> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <>
        <NavLink to={getSourceDetailPath(id)}>{name}</NavLink>
      </>
      // <ResourceFrom
      //   source={source}
      //   emptySpanText="-"
      //   prefixSpanText=""
      //   prefixPadding="1"
      // />
    ),
  },
  type: {
    header: "Category",
    render: ({ type }) => <>{type}</>,
  },
  from: {
    header: "From",
    render: ({ parent, artist }) =>
      artist ? (
        <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
      ) : (
        <ResourceFrom
          source={parent}
          emptySpanText="-"
          prefixSpanText=""
          prefixPadding="1"
          sourceSubresourceRouteSegment={ROUTE_SEGMENTS.SOURCES}
        />
      ),
  },
  actions: {
    width: "1",
    render: (resource) => <ActionMenu resource={resource} actions={actions} />,
  },
});
