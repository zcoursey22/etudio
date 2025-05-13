import { Box, Span, Stack, Text } from "@chakra-ui/react";
import { useArrangement } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import {
  getArtistDetailPath,
  getCompositionDetailPath,
  ROUTE_SEGMENTS,
} from "../routes";
import { DetailPage, DetailViewContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import { ResourceFrom } from "../components/resources/shared";

export const ArrangementDetail = () => {
  const { id } = useParams();
  const detailState = useArrangement(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(arrangement) => {
        const { name, artist, composition } = arrangement;
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
            mainContent={
              <Stack>
                <Box>
                  <Text>
                    <NavLink to={getCompositionDetailPath(composition.id)}>
                      {composition.name}
                    </NavLink>
                    <Span fontSize={"xs"}>
                      {<ResourceFrom {...composition} prefixPadding="1" />}
                    </Span>
                  </Text>
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
          />
        );
      }}
    </DetailViewContainer>
  );
};
