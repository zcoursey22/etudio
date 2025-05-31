import { Box, Span, Stack, Text } from "@chakra-ui/react";
import { useArrangement } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import { Difficulty, ResourceFrom } from "../components/resources/shared";
import { useArrangementActions } from "../components/resources/arrangements";
import { ROUTE_SEGMENTS } from "../constants";

export const ArrangementDetail = () => {
  const { id } = useParams();
  const detailState = useArrangement(id!);
  const actions = useArrangementActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(arrangement) => {
        const { name, artist, composition, difficulty } = arrangement;
        return (
          <DetailPage
            resource={arrangement}
            title={name}
            subtitle={
              <>
                {"arranged by "}
                <NavLink
                  to={getArtistDetailPath(
                    artist.id,
                    ROUTE_SEGMENTS.ARRANGEMENTS
                  )}
                >
                  {artist.name}
                </NavLink>
              </>
            }
            belowHeader={<Difficulty id={Number(id!)} oneToFive={difficulty} />}
            mainContent={
              <Stack>
                <Box>
                  <Box>
                    <NavLink to={getCompositionDetailPath(composition.id)}>
                      {composition.name}
                    </NavLink>
                    <Span fontSize={"xs"}>
                      {<ResourceFrom {...composition} prefixPadding="1" />}
                    </Span>
                  </Box>
                  <Text fontSize={"sm"}>
                    {"composed by "}
                    <NavLink
                      to={getArtistDetailPath(
                        composition.artist.id,
                        ROUTE_SEGMENTS.COMPOSITIONS
                      )}
                    >
                      {composition.artist.name}
                    </NavLink>
                  </Text>
                </Box>
              </Stack>
            }
            actions={actions}
          />
        );
      }}
    </DetailPageContainer>
  );
};
