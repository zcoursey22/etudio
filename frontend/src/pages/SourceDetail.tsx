import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { getSourceDetailPath } from "../routes";
import { NavLink } from "../components/nav/NavLink";
import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import {
  sourceColumns,
  SourceListGridItemContents,
} from "../components/resources/sources";

export const SourceDetail = () => {
  const { id } = useParams();
  const detailState = useSource(id!);
  const parentSource = detailState?.resource?.parent;
  const childSources = detailState?.resource?.children;
  const compositionsListState = useCompositions({
    sourceId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => {
        return (
          <Stack gap={"2em"}>
            <Box color={"fg.muted"}>
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
              columnOverrides={{ from: { visible: false } }}
              renderGridItemContents={(composition) => (
                <CompositionListGridItemContents composition={composition} />
              )}
            />
            {!!childSources?.length && (
              <ListViewContainer
                title={"Sources"}
                useResourcesState={{
                  resources: childSources,
                  loading: false,
                  error: null,
                }}
                columnMap={sourceColumns}
                columnOverrides={{ parent: { visible: false } }}
                renderGridItemContents={(source) => (
                  <SourceListGridItemContents source={source} />
                )}
              />
            )}
          </Stack>
        );
      }}
    </DetailViewContainer>
  );
};
