import { Box, Heading, Span, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useArrangements } from "../hooks";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";
import { CompositionFrom } from "../components/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, getCompositionDetailPath } from "../routes";
import { EmptyMessage } from "../components/EmptyMessage";

export const ArrangementDetail = () => {
  const { id } = useParams();
  const { arrangements, loading, error } = useArrangements();
  const arrangement = arrangements.find((a) => a.id === Number(id));
  console.log(arrangement);

  if (loading) {
    return <LoadingMessage />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  } else if (!arrangement) {
    return <EmptyMessage message={`Arrangement ${id} does not exist`} />;
  }

  const { name, artist, composition } = arrangement;
  return (
    <Box color={"fg.muted"}>
      <Heading color={"fg"}>{name}</Heading>
      <Span fontSize={"xs"}>
        <NavLink to={getCompositionDetailPath(composition.id)}>
          {composition.name}
        </NavLink>
        <CompositionFrom {...composition} prefixSpanText=" from " />
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
  );
};
