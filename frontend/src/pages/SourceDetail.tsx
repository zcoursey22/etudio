import { Box, Flex, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { BackButton, DetailViewContainer } from "../components/detail";
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
          <Stack color={"fg.muted"}>
            <Flex gap={"0.5em"}>
              <BackButton />
              <Box>
                <Text>
                  <Heading display="inline-block" color={"fg"}>
                    {name}
                  </Heading>
                  <Span fontSize={"xs"}>
                    <ResourceFrom
                      source={parentSource}
                      prefixPadding="1"
                      emptySpanText=""
                    />
                  </Span>
                </Text>
                <Text fontSize={"sm"}>source</Text>
              </Box>
            </Flex>
            {!!compositionsListState?.resources?.length && (
              <ListViewContainer
                title={"Compositions"}
                useResourcesState={compositionsListState}
                columnMap={compositionColumns}
                columnOverrides={{ from: { visible: false } }}
                renderGridItemContents={(composition) => (
                  <CompositionListGridItemContents composition={composition} />
                )}
              />
            )}
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
