import { Box, Flex, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { useArrangements, useComposition } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath } from "../routes";
import { ListViewContainer } from "../components/list";
import { BackButton, DetailViewContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/resources/arrangements";
import { ResourceFrom } from "../components/resources/shared";

export const CompositionDetail = () => {
  const { id } = useParams();
  const detailState = useComposition(id);
  const arrangementsListState = useArrangements({
    compositionId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(composition) => {
        const { name, artist } = composition;
        return (
          <Stack>
            <Flex gap={"0.5em"} align={"center"}>
              <BackButton />
              <Box>
                <Flex gap={"0.5em"} align={"center"} color={"fg.muted"}>
                  <Span fontSize={"xs"} color={"fg.muted"}>
                    <ResourceFrom {...composition} prefixSpanText="" />
                  </Span>
                </Flex>
                <Box color={"fg.muted"}>
                  <Text>
                    <Heading display="inline-block" color={"fg"}>
                      {name}
                    </Heading>
                  </Text>
                  <Text fontSize={"sm"}>
                    by{" "}
                    <NavLink to={getArtistDetailPath(artist.id)}>
                      {artist.name}
                    </NavLink>
                  </Text>
                </Box>
              </Box>
            </Flex>
            <ListViewContainer
              title={"Scores"}
              useResourcesState={arrangementsListState}
              columnMap={arrangementColumns}
              columnOverrides={{ composition: { visible: false } }}
              renderGridItemContents={(arrangement) => (
                <ArrangementListGridItemContents arrangement={arrangement} />
              )}
            />
          </Stack>
        );
      }}
    </DetailViewContainer>
  );
};
