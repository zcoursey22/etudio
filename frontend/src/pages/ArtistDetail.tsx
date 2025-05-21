import { useParams } from "react-router-dom";
import { useArrangements, useArtist, useCompositions } from "../hooks";
import { DetailPage, DetailViewContainer } from "../components/detail";
import {
  arrangementColumns,
  ArrangementListGridItemContents,
} from "../components/resources/arrangements";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import { ROUTE_SEGMENTS } from "../routes";
import { LuBookOpenText, LuMusic } from "react-icons/lu";
import { artistActions } from "../components/resources/artists";

export const ArtistDetail = () => {
  const { id } = useParams();
  const detailState = useArtist(id!);
  const artistId = detailState?.resource?.id;
  const compositionsListState = useCompositions({ artistId });
  const arrangementsListState = useArrangements({ artistId });

  return (
    <DetailViewContainer useResourceState={detailState}>
      {(artist) => {
        const { name } = artist;
        return (
          <DetailPage
            resource={artist}
            title={name}
            subtitle={"artist"}
            actionMap={artistActions}
            subresourceConfigs={[
              {
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                useResourcesState: compositionsListState,
                columnMap: compositionColumns,
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
                columnMap: arrangementColumns,
                columnOverrides: { arranger: { visible: false } },
                renderGridItemContents: (a) => (
                  <ArrangementListGridItemContents arrangement={a} />
                ),
              },
            ]}
          />
        );
      }}
    </DetailViewContainer>
  );
};
