import { List, ListContainer, ListPage } from "../components/list";
import { CreateGoalForm } from "../components/resources/goals";
import { ResourceModal } from "../components/resources/shared";
import { ListId } from "../constants";
import { ResourceProvider } from "../providers";

export const GoalList = () => {
  return (
    <ResourceProvider type={"goal"}>
      <ListPage
        title={"Goals"}
        subtitle={"What do you want to accomplish?"}
        id={ListId.GOALS}
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
          {({ listState }) => <List id={ListId.GOALS} listState={listState} />}
        </ListContainer>
      </ListPage>
    </ResourceProvider>
  );
};
