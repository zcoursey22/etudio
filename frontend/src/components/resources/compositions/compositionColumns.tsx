import { Flex, Span } from "@chakra-ui/react";
import { ROUTE_SEGMENTS } from "../../../constants";
import { Composition } from "../../../resources/models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, ResourceFrom, ActionMenu } from "../../resources/shared";
import { CompositionCatalogEntriesDisplay } from "./CompositionCatalogEntriesDisplay";

export const getCompositionColumns = (
  actions: ActionConfig<Composition>[]
): ColumnMap<Composition> => ({
  name: {
    header: "Name",
    render: ({ id, name, catalogEntries }) => (
      <>
        <NavLink to={`${getCompositionDetailPath(id)}`}>{name}</NavLink>
        {catalogEntries && (
          <CompositionCatalogEntriesDisplay
            entries={catalogEntries}
            prefixSpanText=", "
          />
        )}
      </>
    ),
  },
  type: {
    header: "Type",
    render: ({ type, partOf, source }) => (
      <Flex align={"center"} gap={"1"}>
        <Span>{partOf || source ? `${type},` : type}</Span>
        <ResourceFrom partOf={partOf} source={source} prefixSpanText="" />
      </Flex>
    ),
  },
  from: {
    header: "From",
    render: ({ partOf, source }) => (
      <ResourceFrom
        partOf={partOf}
        source={source}
        prefixSpanText=""
        emptySpanText="-"
      />
    ),
    visible: false,
  },
  form: {
    header: "Form",
    render: ({ type }) => <>{type}</>,
    visible: false,
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
