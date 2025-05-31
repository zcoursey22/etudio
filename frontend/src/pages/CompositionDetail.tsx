import { useArrangements, useComposition, useCompositions } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, ROUTE_SEGMENTS } from "../routes";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import {
  getArrangementColumns,
  ArrangementListGridItemContents,
  useArrangementActions,
} from "../components/resources/arrangements";
import { ActionConfig, ResourceFrom } from "../components/resources/shared";
import {
  getCompositionColumns,
  CompositionListGridItemContents,
  useCompositionActions,
} from "../components/resources/compositions";
import { LuBookOpenText, LuMusic } from "react-icons/lu";
import { ListId } from "../constants";
import { ResourceProvider } from "../providers";
import { Arrangement, Composition } from "../resources/models";

export const CompositionDetail = () => {
  const { id } = useParams();
  const detailState = useComposition(id);
  const actions = useCompositionActions();

  const arrangementsListState = useArrangements({
    compositionId: detailState?.resource?.id,
  });
  const arrangementActions = useArrangementActions({
    create: { visible: false },
  });

  const childCompositionsListState = useCompositions({
    partOfCompositionId: detailState?.resource?.id,
  });
  const childCompositionActions = useCompositionActions({
    create: { visible: false },
  });

  return (
    <ResourceProvider type={"composition"}>
      <DetailPageContainer id={Number(id)}>
        {(composition: Composition) => {
          const { name, artist } = composition;
          return (
            <DetailPage
              resource={composition}
              title={name}
              subtitle={
                <>
                  by{" "}
                  <NavLink
                    to={getArtistDetailPath(
                      artist.id,
                      ROUTE_SEGMENTS.COMPOSITIONS
                    )}
                  >
                    {artist.name}
                  </NavLink>
                </>
              }
              rightOfTitle={
                <ResourceFrom
                  {...composition}
                  prefixPadding="1"
                  emptySpanText=""
                />
              }
              actions={actions}
              subresourceConfigs={[
                {
                  id: ListId.ARRANGEMENTS,
                  route: ROUTE_SEGMENTS.ARRANGEMENTS,
                  title: "Scores",
                  icon: <LuBookOpenText />,
                  ...arrangementsListState,
                  columnMap: getArrangementColumns(arrangementActions),
                  columnOverrides: { composition: { visible: false } },
                  renderGridItemContents: (
                    a: Arrangement,
                    aa: ActionConfig<Arrangement>[]
                  ) => (
                    <ArrangementListGridItemContents
                      arrangement={a}
                      actions={aa}
                    />
                  ),
                },
                {
                  id: ListId.COMPOSITIONS,
                  route: ROUTE_SEGMENTS.COMPOSITIONS,
                  title: "Compositions",
                  icon: <LuMusic />,
                  ...childCompositionsListState,
                  columnMap: getCompositionColumns(childCompositionActions),
                  columnOverrides: {
                    from: { visible: false },
                    composer: { visible: false },
                  },
                  renderGridItemContents: (
                    c: Composition,
                    ca: ActionConfig<Composition>[]
                  ) => (
                    <CompositionListGridItemContents
                      composition={c}
                      actions={ca}
                    />
                  ),
                },
              ]}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
