import { Box, Flex, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { useArrangement } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { BackButton, DetailViewContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import { ResourceFrom } from "../components/resources/shared";

export const ArrangementDetail = () => {
  const { id } = useParams();
  const detailState = useArrangement(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name, artist, composition }) => (
        <Stack>
          <Flex gap={"0.5em"} align={"center"}>
            <BackButton />
            <Box color={"fg.muted"}>
              <Text fontSize={"xs"}>
                <ResourceFrom {...composition} prefixSpanText="" />
              </Text>
              <Box>
                <Text>
                  <Heading display="inline-block" color={"fg"}>
                    <NavLink to={getCompositionDetailPath(composition.id)}>
                      {composition.name}
                    </NavLink>
                  </Heading>
                  <Span fontSize={"xs"}>
                    {" by "}
                    <NavLink to={getArtistDetailPath(composition.artist.id)}>
                      {composition.artist.name}
                    </NavLink>
                  </Span>
                </Text>
                <Text fontSize={"sm"}>
                  arranged by{" "}
                  <NavLink to={getArtistDetailPath(artist.id)}>
                    {artist.name}
                  </NavLink>
                </Text>
              </Box>
            </Box>
          </Flex>
          <Heading>{name}</Heading>
        </Stack>
      )}
    </DetailViewContainer>
  );
};
