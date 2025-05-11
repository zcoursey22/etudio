import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollection, useCompositions } from "../hooks";
import { BackButton, DetailViewContainer } from "../components/detail";
import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath } from "../routes";

export const CollectionDetail = () => {
  const { id } = useParams();
  const detailState = useCollection(id!);
  const compositionsListState = useCompositions({
    collectionId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name, artist }) => {
        return (
          <Stack color={"fg.muted"}>
            <Flex gap={"0.5em"}>
              <BackButton />
              <Box>
                <Heading color={"fg"}>{name}</Heading>
                <Text fontSize={"sm"}>
                  {artist ? (
                    <>
                      collection by{" "}
                      <NavLink to={getArtistDetailPath(artist.id)}>
                        {artist.name}
                      </NavLink>
                    </>
                  ) : (
                    "collection"
                  )}
                </Text>
              </Box>
            </Flex>
            <ListViewContainer
              title={"Compositions"}
              useResourcesState={compositionsListState}
              columnMap={compositionColumns}
              columnOverrides={{
                from: { visible: false },
                composer: {
                  visible: !compositionsListState?.resources?.every(
                    (composition) => composition.artist.id === artist.id
                  ),
                },
              }}
              renderGridItemContents={(composition) => (
                <CompositionListGridItemContents composition={composition} />
              )}
            />
          </Stack>
        );
      }}
    </DetailViewContainer>
  );
};
