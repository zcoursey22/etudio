import { Box, Heading, Span, Text } from "@chakra-ui/react";
import { useArrangement } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { useParams } from "react-router-dom";
import { ResourceFrom } from "../components/resources/shared";

export const ArrangementDetail = () => {
  const { id } = useParams();
  const detailState = useArrangement(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name, artist, composition }) => (
        <Box color={"fg.muted"}>
          <Heading color={"fg"}>{name}</Heading>
          <Span fontSize={"xs"}>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
            <ResourceFrom {...composition} prefixSpanText=" from " />
          </Span>
          <Text fontSize={"2xs"}>
            composed by{" "}
            <NavLink to={getArtistDetailPath(composition.artist.id)}>
              {composition.artist.name}
            </NavLink>
          </Text>
          <Text fontSize={"sm"}>
            arranged by{" "}
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Text>
        </Box>
      )}
    </DetailViewContainer>
  );
};
