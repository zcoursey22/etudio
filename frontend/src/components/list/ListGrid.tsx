import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ListViewProps } from "./ListViewContainer";
import { ListGridItem } from "./ListGridItem";
import { ReactNode } from "react";
import { Resource } from "../../models";

export interface ListGridViewProps<T> extends ListViewProps<T> {
  renderGridItemContents: (item: T) => ReactNode;
}

export const ListGrid = <T extends Resource>({
  items,
  renderGridItemContents,
}: ListGridViewProps<T>) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
      gap={"1em"}
      pt={"1em"}
    >
      {items.map((item) => (
        <Flex key={item.id} aspectRatio={"1"}>
          <ListGridItem content={renderGridItemContents(item)} />
        </Flex>
      ))}
    </SimpleGrid>
  );
};
