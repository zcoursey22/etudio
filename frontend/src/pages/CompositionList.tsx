import { List, ListContainer, ListPage } from "../components/list";
import { CreateCompositionForm } from "../components/resources/compositions";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const CompositionList = () => {
  return (
    <ResourceProvider type={ResourceType.COMPOSITION}>
      <ListPage
        title={"Compositions"}
        subtitle={"Works of music"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Add new composition"
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
              listState={listState}
              actionOverrides={{ create: { visible: false } }}
            />
          )}
        </ListContainer>
      </ListPage>
    </ResourceProvider>
  );
};
