import { List, ListContainer, ListPage } from "../components/list";
import { ResourceModal } from "../components/resources/shared";
import { CreateSourceForm } from "../components/resources/sources/CreateSourceForm";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const SourceList = () => {
  return (
    <ResourceProvider type={ResourceType.SOURCE}>
      <ListPage
        title={"Sources"}
        subtitle={"Albums and multimedia where music may originate"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Create new source"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateSourceForm handleClose={handleClose} />
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
