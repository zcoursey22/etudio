import { Flex } from "@chakra-ui/react";
import { Arrangement } from "../../../resources/models";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import {
  ActionConfig,
  Difficulty,
  PreviewPDF,
  ResourceFrom,
  ActionMenu,
} from "../../resources/shared";
import { ROUTE_SEGMENTS } from "../../../constants";
import { getNotationTypeLabel } from "./arrangementUtils";

export const getArrangementColumns = (
  actions: ActionConfig<Arrangement>[]
): ColumnMap<Arrangement> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <Flex align={"center"} gap={"0.5em"}>
        <NavLink to={getArrangementDetailPath(id)}>{name}</NavLink>
        <PreviewPDF pdf={null} />
      </Flex>
    ),
  },
  composition: {
    header: "Composition",
    render: ({ composition }) => (
      <>
        <NavLink to={getCompositionDetailPath(composition.id)}>
          {composition.name}
        </NavLink>
        <ResourceFrom {...composition} prefixPadding="1" />
      </>
    ),
  },
  notationType: {
    header: "Notation",
    render: ({ notationType }) => <>{getNotationTypeLabel(notationType)}</>,
  },
  arranger: {
    header: "Arranger",
    render: ({ artist }) => (
      <NavLink to={getArtistDetailPath(artist.id, ROUTE_SEGMENTS.ARRANGEMENTS)}>
        {artist.name}
      </NavLink>
    ),
  },
  difficulty: {
    header: "Difficulty",
    render: ({ id, difficulty }) => (
      <Difficulty id={id} oneToFive={difficulty} />
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
