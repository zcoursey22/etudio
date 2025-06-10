import { DetailPage, DetailPageContainer } from "../components/detail";
import { ResourceType } from "../constants";
import { getFormattedDescription } from "../utils";
import { ResourceProvider } from "../providers";
import { Artist } from "../resources/models";

export const ArtistDetail = () => {
  return (
    <ResourceProvider type={ResourceType.ARTIST}>
      <DetailPageContainer>
        {(artist: Artist) => {
          const { name, description } = artist;
          return (
            <DetailPage
              resource={artist}
              title={name}
              subtitle={"artist"}
              mainContent={description && getFormattedDescription(description)}
            />
          );
        }}
      </DetailPageContainer>
    </ResourceProvider>
  );
};
