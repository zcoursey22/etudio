import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { DetailPage, DetailViewContainer } from "../components/detail";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import {
  sourceColumns,
  SourceListGridItemContents,
} from "../components/resources/sources";
import { ResourceFrom } from "../components/resources/shared";
import { LuFolder, LuMusic } from "react-icons/lu";
import { ROUTE_SEGMENTS } from "../routes";

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
      {(source) => {
        const { name } = source;
        return (
          <DetailPage
            resource={source}
            title={name}
            rightOfTitle={
              <ResourceFrom
                source={parentSource}
                sourceSubresourceRouteSegment={ROUTE_SEGMENTS.SOURCES}
                prefixPadding="1"
              />
            }
            subtitle={"source"}
            subresourceConfigs={[
              {
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                useResourcesState: compositionsListState,
                columnMap: compositionColumns,
                columnOverrides: {
                  from: { visible: false },
                },
                renderGridItemContents: (c) => (
                  <CompositionListGridItemContents composition={c} />
                ),
              },
              {
                route: ROUTE_SEGMENTS.SOURCES,
                title: "Sources",
                icon: <LuFolder />,
                useResourcesState: {
                  resources: childSources || [],
                  loading: false,
                  error: null,
                },
                columnMap: sourceColumns,
                columnOverrides: { parent: { visible: false } },
                renderGridItemContents: (s) => (
                  <SourceListGridItemContents source={s} />
                ),
              },
            ]}
          />
        );
      }}
    </DetailViewContainer>
  );
};
