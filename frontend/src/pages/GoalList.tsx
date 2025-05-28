import { List, ListPage } from "../components/list";
import {
  CreateGoalForm,
  GoalListGridItemContents,
  getGoalColumns,
  useGoalActions,
} from "../components/resources/goals";
import { ResourceModal } from "../components/resources/shared";
import { ListId } from "../constants";
import { useGoals } from "../hooks";

export const GoalList = () => {
  return (
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
      <List
        {...useGoals()}
        columnMap={getGoalColumns(useGoalActions())}
        renderGridItemContents={(goal) => (
          <GoalListGridItemContents goal={goal} />
        )}
      />
    </ListPage>
  );
};
