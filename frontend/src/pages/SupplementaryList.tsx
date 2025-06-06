import { List, ListContainer, ListPage } from "../components/list";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const SupplementaryList = () => {
  return (
    <ResourceProvider type={ResourceType.SUPPLEMENTARY}>
      <ListPage
        title={"Supplementaries"}
        subtitle={"Additional materials"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Add new supplementary"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <></>
            {/* <CreateSupplementaryForm handleClose={handleClose} /> */}
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
