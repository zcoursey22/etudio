import { Box, Heading, Span, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions } from "../hooks";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";
import { CompositionFrom } from "../components/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath } from "../routes";
import { EmptyMessage } from "../components/EmptyMessage";

export const CompositionDetail = () => {
  const { id } = useParams();
  const { compositions, loading, error } = useCompositions();
  const composition = compositions.find((c) => c.id === Number(id));
  console.log(composition);

  if (loading) {
    return <LoadingMessage />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  } else if (!composition) {
    return <EmptyMessage message={`Composition ${id} does not exist`} />;
  }

  const { name, artist } = composition;
  return (
    <Box color={"fg.muted"}>
      <Text>
        <Heading display="inline-block" color={"fg"}>
          {name}
        </Heading>
        <Span fontSize={"xs"}>
          <CompositionFrom {...composition} prefixSpanText=" from " />
        </Span>
      </Text>
      <Text fontSize={"sm"}>
        by <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
      </Text>
    </Box>
  );
};
