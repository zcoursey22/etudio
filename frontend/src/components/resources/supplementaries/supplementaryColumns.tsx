import { Flex } from "@chakra-ui/react";
import { Supplementary } from "../../../resources/models";
import { getSupplementaryDetailPath } from "../../../routes";
import { formatDate } from "../../../utils";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, PreviewPDF, ActionMenu } from "../shared";

export const getSupplementaryColumns = (
  actions: ActionConfig<Supplementary>[]
): ColumnMap<Supplementary> => ({
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
    render: (resource) => <ActionMenu resource={resource} actions={actions} />,
  },
});
