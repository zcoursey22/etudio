import { Flex, Icon } from "@chakra-ui/react";
import { Supplementary } from "../../models";
import { getSupplementaryDetailPath } from "../../routes";
import { formatDate } from "../../utils";
import { ColumnMap } from "../list/table/columns";
import { NavLink } from "../nav/NavLink";
import { LuDownload, LuExpand } from "react-icons/lu";

export const supplementaryColumns: ColumnMap<Supplementary> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <Flex align={"center"} gap={"0.5em"}>
        <NavLink to={getSupplementaryDetailPath(id)}>{name}</NavLink>
        <Icon size={"sm"} color="fg">
          <LuExpand />
        </Icon>
      </Flex>
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
