import { NavLink } from "../components/nav";
import { getArtistDetailPath } from "../routes";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { ResourceFrom } from "../components/resources/shared";
import { ResourceProvider } from "../providers";
import { Composition } from "../resources/models";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";
import { CompositionCatalogEntriesDisplay } from "../components/resources/compositions/CompositionCatalogEntriesDisplay";

export const CompositionDetail = () => {
  return (
    <ResourceProvider type={ResourceType.COMPOSITION}>
      <DetailPageContainer>
        {(composition: Composition) => {
          const { name, artist, type, catalogEntries } = composition;
          return (
            <DetailPage
              resource={composition}
              title={name}
              subtitle={
                <>
                  {type}
                  <ResourceFrom
                    {...composition}
                    prefixPadding="1"
                    emptySpanText=""
                  />
                  {" by "}
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
                catalogEntries && (
                  <CompositionCatalogEntriesDisplay
                    entries={catalogEntries}
                    prefixSpanText=", "
                  />
                )
              }
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
