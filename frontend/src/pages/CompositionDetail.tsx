import { Box, Heading, Span, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions } from "../hooks";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";
import { CompositionFrom } from "../components/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArrangementDetailPath, getArtistDetailPath } from "../routes";
import { EmptyMessage } from "../components/EmptyMessage";
import { ListViewContainer } from "../components/list";
import { Arrangement } from "../models";
import { formatDate } from "../utils";

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

  const { name, artist, arrangements } = composition;
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
          <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
        </Text>
      </Box>
      <br />
      <ListViewContainer
        title={"Scores"}
        items={arrangements || []}
        loading={false}
        error={null}
        renderHeaderRowContents={() => (
          <>
            <td>Name</td>
            <td>Arranger</td>
            <td align="right">Last modified</td>
          </>
        )}
        renderRowContents={(arrangement: Arrangement) => (
          <>
            <td>
              <NavLink to={getArrangementDetailPath(arrangement.id)}>
                {arrangement.name}
              </NavLink>
            </td>
            <td>?</td>
            <td align="right">{formatDate(arrangement.lastModified)}</td>
          </>
        )}
        renderGridItemContents={(arrangement: Arrangement) => (
          <Text>
            <NavLink to={getArrangementDetailPath(arrangement.id)}>
              {arrangement.name}
            </NavLink>{" "}
            by ?
          </Text>
        )}
      />
    </>
  );
};
