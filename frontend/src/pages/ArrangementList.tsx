import { ListPage, List, ListContainer } from "../components/list";
import { CreateArrangementForm } from "../components/resources/arrangements";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const ArrangementList = () => {
  return (
    <ResourceProvider type={ResourceType.ARRANGEMENT}>
      <ListPage
        title={"Scores"}
        subtitle={"Arrangements or the original composition of works of music"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Create new arrangement"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateArrangementForm handleClose={handleClose} />
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
