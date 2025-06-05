import { Box, Flex, Span, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "../components/nav";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { Difficulty, ResourceFrom } from "../components/resources/shared";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";
import { ResourceProvider } from "../providers";
import { Arrangement } from "../resources/models";
import { getFormattedDescription } from "../utils";
import { getNotationTypeLabel } from "../components/resources/arrangements/arrangementUtils";

export const ArrangementDetail = () => {
  return (
    <ResourceProvider type={ResourceType.ARRANGEMENT}>
      <DetailPageContainer>
        {(arrangement: Arrangement) => {
          const {
            id,
            name,
            artist,
            composition,
            difficulty,
            description,
            notationType,
          } = arrangement;
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
              rightOfTitle={
                <Span ml={"0.5em"} fontSize={"sm"}>
                  {getNotationTypeLabel(notationType)}
                </Span>
              }
              belowHeader={
                <Flex gap={"0.5em"}>
                  <Difficulty id={Number(id!)} oneToFive={difficulty} />
                </Flex>
              }
              mainContent={
                <Stack gap={"1em"}>
                  <Box>
                    {description && getFormattedDescription(description)}
                  </Box>
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
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
