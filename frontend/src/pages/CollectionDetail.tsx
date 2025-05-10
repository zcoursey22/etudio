import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollection, useCompositions } from "../hooks";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/compositions";
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
          <>
            <Box color={"fg.muted"} mb={"1.5em"}>
              <Heading color={"fg"}>{name}</Heading>
              {artist && (
                <Text fontSize={"sm"}>
                  by{" "}
                  <NavLink to={getArtistDetailPath(artist.id)}>
                    {artist.name}
                  </NavLink>
                </Text>
              )}
            </Box>
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
          </>
        );
      }}
    </DetailViewContainer>
  );
};
