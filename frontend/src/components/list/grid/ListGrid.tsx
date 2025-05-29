import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Resource } from "../../../resources/models";
import { ListGridItem } from "./ListGridItem";
import { LoadingMessage } from "../../LoadingMessage";
import { ErrorMessage } from "../../ErrorMessage";
import { ListProps } from "../List";
import { useResourceContext } from "../../../hooks";
import { ResourceListState } from "../../../hooks/types";

export const ListGrid = <T extends Resource>({
  resources,
  loading,
  error,
  loadingText,
  errorText,
  emptyText,
}: ListProps<T> & ResourceListState<T>) => {
  const { renderGridItemContents } = useResourceContext();

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
      pt={"0.5em"}
    >
      {resources.map((resource) => (
        <Flex key={resource.id} aspectRatio={"1"}>
          <ListGridItem content={renderGridItemContents(resource)} />
        </Flex>
      ))}
    </SimpleGrid>
  );
};
