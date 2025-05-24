import { List, ListPage } from "../components/list";
import { GoalListGridItemContents } from "../components/resources/goals";
import { getGoalColumns, useGoalActions } from "../components/resources/goals";
import { useGoals } from "../hooks";

export const GoalList = () => {
  return (
    <ListPage title={"Goals"}>
      <List
        title="Goals"
        {...useGoals()}
        columnMap={getGoalColumns(useGoalActions())}
        renderGridItemContents={(goal) => (
          <GoalListGridItemContents goal={goal} />
        )}
      />
    </ListPage>
  );
};
