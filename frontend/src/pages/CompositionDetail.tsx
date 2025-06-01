import { NavLink } from "../components/nav";
import { getArtistDetailPath } from "../routes";
import { DetailPage, DetailPageContainer } from "../components/detail";
import { ResourceFrom } from "../components/resources/shared";
import { ResourceProvider } from "../providers";
import { Composition } from "../resources/models";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";

export const CompositionDetail = () => {
  return (
    <ResourceProvider type={ResourceType.COMPOSITION}>
      <DetailPageContainer>
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
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
