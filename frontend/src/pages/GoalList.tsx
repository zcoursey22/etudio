import { ListViewContainer } from "../components/list";
import { GoalListGridItemContents } from "../components/resources/goals";
import { goalColumns } from "../components/resources/goals";
import { useGoals } from "../hooks";

export const GoalList = () => {
  const listState = useGoals();
  return (
    <ListViewContainer
      title="Goals"
      useResourcesState={listState}
      columnMap={goalColumns}
      renderGridItemContents={(goal) => (
        <GoalListGridItemContents goal={goal} />
      )}
    />
  );
};
