import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { getSourceDetailPath } from "../routes";
import { NavLink } from "../components/nav/NavLink";
import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/compositions";

export const SourceDetail = () => {
  const { id } = useParams();
  const detailState = useSource(id!);
  const parentSourceDetailState = useSource(detailState?.resource?.sourceId);
  const parentSource = parentSourceDetailState?.resource;
  const compositionsListState = useCompositions({
    sourceId: detailState?.resource?.sourceId,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => {
        return (
          <>
            <Box color={"fg.muted"} mb={"1.5em"}>
              <Heading color={"fg"}>{name}</Heading>
              {parentSource && (
                <Text fontSize={"sm"}>
                  from{" "}
                  <NavLink to={getSourceDetailPath(parentSource?.id)}>
                    {parentSource?.name}
                  </NavLink>
                </Text>
              )}
            </Box>
            <ListViewContainer
              title={"Compositions"}
              useResourcesState={compositionsListState}
              columnMap={compositionColumns}
              renderGridItemContents={(composition) => (
                <CompositionListGridItemContents composition={composition} />
              )}
            />
          </>
        );
      }}
    </DetailViewContainer>
  );
};
