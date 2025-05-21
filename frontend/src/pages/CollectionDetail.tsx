import { useParams } from "react-router-dom";
import { useCollection, useCompositions } from "../hooks";
import { DetailPage, DetailViewContainer } from "../components/detail";
import {
  compositionColumns,
  CompositionListGridItemContents,
} from "../components/resources/compositions";
import { NavLink } from "../components/nav/NavLink";
import { getArtistDetailPath, ROUTE_SEGMENTS } from "../routes";
import { LuMusic } from "react-icons/lu";
import { collectionActions } from "../components/resources/collections";

export const CollectionDetail = () => {
  const { id } = useParams();
  const detailState = useCollection(id!);
  const compositionsListState = useCompositions({
    collectionId: detailState?.resource?.id,
  });

  return (
    <DetailViewContainer useResourceState={detailState}>
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
            actionMap={collectionActions}
            subresourceConfigs={[
              {
                route: ROUTE_SEGMENTS.COMPOSITIONS,
                title: "Compositions",
                icon: <LuMusic />,
                useResourcesState: compositionsListState,
                columnMap: compositionColumns,
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
    </DetailViewContainer>
  );
};
