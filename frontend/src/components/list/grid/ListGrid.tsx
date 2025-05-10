import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ListViewProps } from "../ListViewContainer";
import { ReactNode } from "react";
import { Resource } from "../../../models";
import { ListGridItem } from "./ListGridItem";

export interface ListGridViewProps<T extends Resource>
  extends ListViewProps<T> {
  renderGridItemContents: (resource: T) => ReactNode;
}

export const ListGrid = <T extends Resource>({
  resources,
  renderGridItemContents,
}: ListGridViewProps<T>) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
      gap={"1em"}
      pt={"1em"}
    >
      {resources.map((resource) => (
        <Flex key={resource.id} aspectRatio={"1"}>
          <ListGridItem content={renderGridItemContents(resource)} />
        </Flex>
      ))}
    </SimpleGrid>
  );
};
