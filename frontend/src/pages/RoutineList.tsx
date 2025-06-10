import { List, ListContainer, ListPage } from "../components/list";
import { CreateRoutineForm } from "../components/resources/routines/CreateRoutineForm";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const RoutineList = () => {
  return (
    <ResourceProvider type={ResourceType.ROUTINE}>
      <ListPage
        title={"Routines"}
        subtitle={"Streamlined practice sessions"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Create new routine"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateRoutineForm handleClose={handleClose} />
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
