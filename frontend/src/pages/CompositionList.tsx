import { List, ListContainer, ListPage } from "../components/list";
import { CreateCompositionForm } from "../components/resources/compositions/CreateCompositionForm";
import { ResourceModal } from "../components/resources/shared";
import { ListId } from "../constants";
import { ResourceProvider } from "../providers";

export const CompositionList = () => {
  return (
    <ResourceProvider type={"composition"}>
      <ListPage
        title={"Compositions"}
        subtitle={"Works of music"}
        id={ListId.COMPOSITIONS}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Create new composition"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateCompositionForm handleClose={handleClose} />
          </ResourceModal>
        )}
      >
        <ListContainer>
          {({ listState }) => (
            <List
              id={ListId.COMPOSITIONS}
              listState={listState}
              actionOverrides={{ create: { visible: false } }}
            />
          )}
        </ListContainer>
      </ListPage>
    </ResourceProvider>
  );
};
