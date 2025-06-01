import { List, ListContainer, ListPage } from "../components/list";
import { CreateGoalForm } from "../components/resources/goals";
import { ResourceModal } from "../components/resources/shared";
import { ResourceType } from "../constants";
import { ResourceProvider } from "../providers";

export const GoalList = () => {
  return (
    <ResourceProvider type={ResourceType.GOAL}>
      <ListPage
        title={"Goals"}
        subtitle={"What do you want to accomplish?"}
        renderCreateModal={(isOpen, handleClose) => (
          <ResourceModal
            title="Create new goal"
            handleClose={handleClose}
            isOpen={isOpen}
          >
            <CreateGoalForm handleClose={handleClose} />
          </ResourceModal>
        )}
      >
        <ListContainer>
          {({ listState }) => <List listState={listState} />}
        </ListContainer>
      </ListPage>
    </ResourceProvider>
  );
};
