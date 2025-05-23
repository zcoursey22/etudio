import { ListViewContent } from "../components/list";
import { GoalListGridItemContents } from "../components/resources/goals";
import { getGoalColumns, useGoalActions } from "../components/resources/goals";
import { useGoals } from "../hooks";
import { getTitle } from "../utils";

export const GoalList = () => {
  const listState = useGoals();
  const actions = useGoalActions();

  return (
    <>
      <title>{getTitle("Goals")}</title>
      <ListViewContent
        title="Goals"
        useResourcesState={listState}
        columnMap={getGoalColumns(actions)}
        renderGridItemContents={(goal) => (
          <GoalListGridItemContents goal={goal} />
        )}
      />
    </>
  );
};
