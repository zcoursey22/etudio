import { Flex } from "@chakra-ui/react";
import { Supplementary } from "../../../models";
import { getSupplementaryDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav/NavLink";
import { PreviewPDF } from "../shared";
import { ActionMenu } from "../shared/ActionMenu";
import { supplementaryActions } from "./supplementaryActions";

export const supplementaryColumns: ColumnMap<Supplementary> = {
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <Flex align={"center"} gap={"0.5em"}>
        <NavLink to={getSupplementaryDetailPath(id)}>{name}</NavLink>
        <PreviewPDF pdf={null} />
      </Flex>
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
      <ActionMenu resource={resource} actionMap={supplementaryActions} />
    ),
  },
};
