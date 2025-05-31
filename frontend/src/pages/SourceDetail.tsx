import { useParams } from "react-router-dom";
import { useCompositions, useSource } from "../hooks";
import { DetailPage, DetailPageContainer } from "../components/detail";
import {
  getCompositionColumns,
  CompositionListGridItemContents,
  useCompositionActions,
} from "../components/resources/compositions";
import {
  getSourceColumns,
  SourceListGridItemContents,
  useSourceActions,
} from "../components/resources/sources";
import { ResourceFrom } from "../components/resources/shared";
import { LuFolder, LuMusic } from "react-icons/lu";
import { ListId, ROUTE_SEGMENTS } from "../constants";

export const SourceDetail = () => {
  const { id } = useParams();
  const detailState = useSource(id!);
  const parentSource = detailState?.resource?.parent;
  const childSources = detailState?.resource?.children;
  const actions = useSourceActions();

  const compositionsListState = useCompositions({
    sourceId: detailState?.resource?.id,
  });
  const compositionActions = useCompositionActions({
    create: { visible: false },
  });

  const childSourcesListState = {
    resources: childSources || [],
    loading: false,
    error: null,
  };
  const childSourceActions = useSourceActions({
    create: { visible: false },
  });

  return (
    <DetailPageContainer useResourceState={detailState}>
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
            actions={actions}
            subresourceConfigs={[
              {
                id: ListId.COMPOSITIONS,
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                ...compositionsListState,
                columnMap: getCompositionColumns(compositionActions),
                columnOverrides: {
                  from: { visible: false },
                },
                renderGridItemContents: (c) => (
                  <CompositionListGridItemContents composition={c} />
                ),
              },
              {
                id: ListId.SOURCES,
                route: ROUTE_SEGMENTS.SOURCES,
                title: "Sources",
                icon: <LuFolder />,
                ...childSourcesListState,
                columnMap: getSourceColumns(childSourceActions),
                columnOverrides: { parent: { visible: false } },
                renderGridItemContents: (s) => (
                  <SourceListGridItemContents source={s} />
                ),
              },
            ]}
          />
        );
      }}
    </DetailPageContainer>
  );
};
