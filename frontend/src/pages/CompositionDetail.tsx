import { Box, Flex, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { useArrangements, useComposition, useCompositions } from "../hooks";
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
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";

export const CompositionDetail = () => {
  const { id } = useParams();
  const detailState = useComposition(id);
  const arrangementsListState = useArrangements({
    compositionId: detailState?.resource?.id,
  });
  const childCompositionsListState = useCompositions({
    partOfCompositionId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(composition) => {
        const { name, artist } = composition;
        return (
          <Stack color={"fg.muted"}>
            <Flex gap={"0.5em"}>
              <BackButton />
              <Box color={"fg.muted"}>
                <Text>
                  <Heading display="inline-block" color={"fg"}>
                    {name}
                  </Heading>
                  <Span fontSize={"xs"}>
                    <ResourceFrom
                      {...composition}
                      prefixPadding="1"
                      emptySpanText=""
                    />
                  </Span>
                </Text>
                <Text fontSize={"sm"}>
                  by{" "}
                  <NavLink to={getArtistDetailPath(artist.id)}>
                    {artist.name}
                  </NavLink>
                </Text>
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
            {!!childCompositionsListState?.resources?.length && (
              <ListViewContainer
                title={"Compositions"}
                useResourcesState={childCompositionsListState}
                columnMap={compositionColumns}
                columnOverrides={{
                  from: { visible: false },
                  composer: { visible: false },
                }}
                renderGridItemContents={(composition) => (
                  <CompositionListGridItemContents composition={composition} />
                )}
              />
            )}
          </Stack>
        );
      }}
    </DetailViewContainer>
  );
};
