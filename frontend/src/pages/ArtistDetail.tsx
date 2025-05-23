import { useParams } from "react-router-dom";
import { useArrangements, useArtist, useCompositions } from "../hooks";
import { DetailPage, DetailPageContainer } from "../components/detail";
import {
  getArrangementColumns,
  ArrangementListGridItemContents,
  useArrangementActions,
} from "../components/resources/arrangements";
import {
  getCompositionColumns,
  CompositionListGridItemContents,
  useCompositionActions,
} from "../components/resources/compositions";
import { ROUTE_SEGMENTS } from "../routes";
import { LuBookOpenText, LuMusic } from "react-icons/lu";
import { useArtistActions } from "../components/resources/artists";

export const ArtistDetail = () => {
  const { id } = useParams();
  const detailState = useArtist(id!);
  const artistId = detailState?.resource?.id;
  const actions = useArtistActions();

  const compositionsListState = useCompositions({ artistId });
  const compositionActions = useCompositionActions();

  const arrangementsListState = useArrangements({ artistId });
  const arrangementActions = useArrangementActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(artist) => {
        const { name } = artist;
        return (
          <DetailPage
            resource={artist}
            title={name}
            subtitle={"artist"}
            actions={actions}
            subresourceConfigs={[
              {
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                useResourcesState: compositionsListState,
                columnMap: getCompositionColumns(compositionActions),
                columnOverrides: {
                  composer: { visible: false },
                },
                renderGridItemContents: (c) => (
                  <CompositionListGridItemContents composition={c} />
                ),
              },
              {
                route: ROUTE_SEGMENTS.ARRANGEMENTS,
                title: "Scores",
                icon: <LuBookOpenText />,
                useResourcesState: arrangementsListState,
                columnMap: getArrangementColumns(arrangementActions),
                columnOverrides: { arranger: { visible: false } },
                renderGridItemContents: (a) => (
                  <ArrangementListGridItemContents arrangement={a} />
                ),
              },
            ]}
          />
        );
      }}
    </DetailPageContainer>
  );
};
