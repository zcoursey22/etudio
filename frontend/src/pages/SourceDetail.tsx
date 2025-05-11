import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { DetailViewContainer } from "../components/detail/DetailViewContainer";
import { ListViewContainer } from "../components/list";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import {
  sourceColumns,
  SourceListGridItemContents,
} from "../components/resources/sources";
import { ResourceFrom } from "../components/resources/shared";

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
                  <ResourceFrom source={parentSource} prefixPadding="1" />
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
