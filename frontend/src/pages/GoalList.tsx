import { List, ListPage } from "../components/list";
import { GoalListGridItemContents } from "../components/resources/goals";
import { getGoalColumns, useGoalActions } from "../components/resources/goals";
import { ListId } from "../constants";
import { useGoals } from "../hooks";

export const GoalList = () => {
  return (
    <ListPage
      title={"Goals"}
      subtitle={"What do you want to accomplish?"}
      id={ListId.GOALS}
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
