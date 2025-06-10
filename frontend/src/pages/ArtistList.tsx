import { List, ListContainer, ListPage } from "../components/list";
import { CreateArtistForm } from "../components/resources/artists/CreateArtistForm";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const ArtistList = () => {
  return (
    <ResourceProvider type={ResourceType.ARTIST}>
      <ListPage
        title={"Artists"}
        subtitle={"Composers and arrangers"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Add new artist"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateArtistForm handleClose={handleClose} />
          </ResourceModal>
        )}
      >
        <ListContainer>
          {({ listState }) => (
            <List
              listState={listState}
              actionOverrides={{ create: { visible: false } }}
            />
          )}
        </ListContainer>
      </ListPage>
    </ResourceProvider>
  );
};
