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
import { LuBookOpenText, LuMusic } from "react-icons/lu";
import { useArtistActions } from "../components/resources/artists";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";
import { getFormattedDescription } from "../utils";

export const ArtistDetail = () => {
  const { id } = useParams();
  const detailState = useArtist(id!);
  const artistId = detailState?.resource?.id;
  const actions = useArtistActions();

  const compositionsListState = useCompositions({ artistId });
  const compositionActions = useCompositionActions({
    create: { visible: false },
  });

  const arrangementsListState = useArrangements({ artistId });
  const arrangementActions = useArrangementActions({
    create: { visible: false },
  });

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(artist) => {
        const { name, description } = artist;
        return (
          <DetailPage
            resource={artist}
            title={name}
            subtitle={"artist"}
            actions={actions}
            mainContent={description && getFormattedDescription(description)}
            subresourceConfigs={[
              {
                id: ResourceType.COMPOSITION,
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                ...compositionsListState,
                columnMap: getCompositionColumns(compositionActions),
                columnOverrides: {
                  composer: { visible: false },
                },
                renderGridItemContents: (c) => (
                  <CompositionListGridItemContents composition={c} />
                ),
              },
              {
                id: ResourceType.ARRANGEMENT,
                route: ROUTE_SEGMENTS.ARRANGEMENTS,
                title: "Scores",
                icon: <LuBookOpenText />,
                ...arrangementsListState,
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
