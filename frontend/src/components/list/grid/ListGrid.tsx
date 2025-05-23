import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Resource } from "../../../models";
import { ListGridItem } from "./ListGridItem";
import { LoadingMessage } from "../../LoadingMessage";
import { ErrorMessage } from "../../ErrorMessage";
import { ListProps } from "../List";

export interface ListGridProps<T extends Resource> extends ListProps<T> {
  renderGridItemContents: (resource: T) => ReactNode;
}

export const ListGrid = <T extends Resource>({
  resources,
  loading,
  error,
  loadingText,
  errorText,
  emptyText,
  renderGridItemContents,
}: ListGridProps<T>) => {
  return error || loading || !resources?.length ? (
    loading ? (
      <LoadingMessage message={loadingText} />
    ) : error ? (
      <ErrorMessage error={error} message={errorText} />
    ) : (
      <Text textAlign={"center"}>{emptyText}</Text>
    )
  ) : (
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
