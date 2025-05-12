import { useArrangements, useComposition, useCompositions } from "../hooks";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath } from "../routes";
import { DetailPage, DetailViewContainer } from "../components/detail";
import { useParams } from "react-router-dom";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/resources/arrangements";
import { ResourceFrom } from "../components/resources/shared";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";

export const CompositionDetail = () => {
  const { id } = useParams();
  const detailState = useComposition(id);
  const arrangementsListState = useArrangements({
    compositionId: detailState?.resource?.id,
  });
  const childCompositionsListState = useCompositions({
    partOfCompositionId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(composition) => {
        const { name, artist } = composition;
        return (
          <>
            <DetailPage
              resource={composition}
              title={name}
              subtitle={
                <>
                  by{" "}
                  <NavLink to={getArtistDetailPath(artist.id)}>
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
              subresourceConfigs={[
                {
                  route: "arrangements",
                  title: "Scores",
                  useResourcesState: arrangementsListState,
                  columnMap: arrangementColumns,
                  columnOverrides: { composition: { visible: false } },
                  renderGridItemContents: (arrangement) => (
                    <ArrangementListGridItemContents
                      arrangement={arrangement}
                    />
                  ),
                },
                {
                  route: "compositions",
                  title: "Compositions",
                  useResourcesState: childCompositionsListState,
                  columnMap: compositionColumns,
                  columnOverrides: {
                    from: { visible: false },
                    composer: { visible: false },
                  },
                  renderGridItemContents: (composition) => (
                    <CompositionListGridItemContents
                      composition={composition}
                    />
                  ),
                },
              ]}
            />
          </>
        );
      }}
    </DetailViewContainer>
  );
};
