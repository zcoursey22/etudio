import { DetailPage, DetailPageContainer } from "../components/detail";
import { GoalStatusBadge, useGoalActions } from "../components/resources/goals";
import { useGoal, useUpdateGoal } from "../hooks";
import { useParams } from "react-router-dom";

export const GoalDetail = () => {
  const { id } = useParams();
  const detailState = useGoal(id!);
  const actions = useGoalActions();
  const { updateResource } = useUpdateGoal();

  return (
    <DetailPageContainer useResourceState={detailState}>
      {(goal) => {
        const { name, description, status } = goal;
        return (
          <DetailPage
            resource={goal}
            title={name}
            subtitle={<GoalStatusBadge status={status} />}
            actions={actions}
            mainContent={description}
            favoriteToggleHandler={() =>
              updateResource({
                id: goal.id,
                payload: { isFavorite: !goal.isFavorite },
              })
            }
          />
        );
      }}
    </DetailPageContainer>
  );
};
