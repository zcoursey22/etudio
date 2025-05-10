import { Box, Heading, Span, Text } from "@chakra-ui/react";
import { useArrangements, useComposition } from "../hooks";
import { CompositionFrom } from "../components/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath } from "../routes";
import { ListViewContainer } from "../components/list";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { useParams } from "react-router-dom";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/arrangements";

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
          <>
            <Box color={"fg.muted"}>
              <Span>
                <Heading display="inline-block" color={"fg"}>
                  {name}
                </Heading>
                <Span fontSize={"xs"}>
                  <CompositionFrom {...composition} prefixSpanText=" from " />
                </Span>
              </Span>
              <Text fontSize={"sm"}>
                by{" "}
                <NavLink to={getArtistDetailPath(artist.id)}>
                  {artist.name}
                </NavLink>
              </Text>
            </Box>
            <br />
            <ListViewContainer
              title={"Scores"}
              useResourcesState={arrangementsListState}
              columnMap={arrangementColumns}
              columnOverrides={{ composition: { visible: false } }}
              renderGridItemContents={(arrangement) => (
                <ArrangementListGridItemContents arrangement={arrangement} />
              )}
            />
          </>
        );
      }}
    </DetailViewContainer>
  );
};
