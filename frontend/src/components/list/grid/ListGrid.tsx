import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Resource } from "../../../resources/models";
import { ListGridItem } from "./ListGridItem";
import { LoadingMessage } from "../../LoadingMessage";
import { ErrorMessage } from "../../ErrorMessage";
import { ListProps } from "../List";
import { useResourceContext } from "../../../hooks";

export const ListGrid = <T extends Resource>({
  listState,
  loadingText,
  errorText,
  emptyText,
  actionOverrides,
}: ListProps<T>) => {
  const { renderGridItemContents, useActions } = useResourceContext();
  const { actions, modal } = useActions(actionOverrides);

  const { resources, loading, error } = listState;

  return error || loading || !resources?.length ? (
    loading ? (
      <LoadingMessage message={loadingText} />
    ) : error ? (
      <ErrorMessage error={error} message={errorText} />
    ) : (
      <Text textAlign={"center"}>{emptyText}</Text>
    )
  ) : (
    <>
      {modal}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        gap={"1em"}
        pt={"0.5em"}
      >
        {resources.map((resource) => (
          <Flex key={resource.id} aspectRatio={"1"}>
            <ListGridItem content={renderGridItemContents(resource, actions)} />
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
};
