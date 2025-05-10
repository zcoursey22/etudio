import { Flex, Icon } from "@chakra-ui/react";
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
import { LuDownload, LuExpand } from "react-icons/lu";

export const arrangementColumns: ColumnMap<Arrangement> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <Flex align={"center"} gap={"0.5em"}>
        <NavLink to={getArrangementDetailPath(id)}>{name}</NavLink>
        <Icon size={"sm"} color="fg">
          <LuExpand />
        </Icon>
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
  actions: {
    header: "",
    width: "1",
    render: () => (
      <Flex align={"center"}>
        <Icon size={"sm"} color="fg">
          <LuDownload />
        </Icon>
      </Flex>
    ),
  },
};
