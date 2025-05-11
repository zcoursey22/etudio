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
        <Stack color={"fg.muted"}>
          <Flex gap={"0.5em"}>
            <BackButton />
            <Box>
              <Text>
                <Heading display="inline-block" color={"fg"}>
                  {name}
                </Heading>
                <Span fontSize={"xs"}>
                  <ResourceFrom {...composition} prefixPadding="1" />
                </Span>
              </Text>
              <Text fontSize={"sm"}>
                {"by "}
                <NavLink to={getArtistDetailPath(artist.id)}>
                  {artist.name}
                </NavLink>
              </Text>
            </Box>
          </Flex>
          <Text fontSize={"sm"}>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
            {" by "}
            <NavLink to={getArtistDetailPath(composition.artist.id)}>
              {composition.artist.name}
            </NavLink>
          </Text>
        </Stack>
      )}
    </DetailViewContainer>
  );
};
