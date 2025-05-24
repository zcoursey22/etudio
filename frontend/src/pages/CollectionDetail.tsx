import { useParams } from "react-router-dom";
import { useCollection, useCompositions } from "../hooks";
import { DetailPage, DetailPageContainer } from "../components/detail";
import {
  getCompositionColumns,
  CompositionListGridItemContents,
  useCompositionActions,
} from "../components/resources/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, ROUTE_SEGMENTS } from "../routes";
import { LuMusic } from "react-icons/lu";
import { useCollectionActions } from "../components/resources/collections";
import { ListId } from "../constants";

export const CollectionDetail = () => {
  const { id } = useParams();
  const detailState = useCollection(id!);
  const actions = useCollectionActions();

  const compositionsListState = useCompositions({
    collectionId: detailState?.resource?.id,
  });
  const compositionActions = useCompositionActions();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(collection) => {
        const { name, artist } = collection;
        return (
          <DetailPage
            resource={collection}
            title={name}
            subtitle={
              artist ? (
                <>
                  by{" "}
                  <NavLink to={getArtistDetailPath(artist.id)}>
                    {artist.name}
                  </NavLink>
                </>
              ) : (
                "collection"
              )
            }
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
                  composer: {
                    visible: !compositionsListState?.resources?.every(
                      (c) => c.artist.id === artist.id
                    ),
                  },
                },
                renderGridItemContents: (c) => (
                  <CompositionListGridItemContents composition={c} />
                ),
              },
            ]}
          />
        );
      }}
    </DetailPageContainer>
  );
};
